var express = require('express');
var moment = require('moment');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(__dirname ));
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.use('/:str', (req,res)=>{

    var formatedDate = {
            unix: null,
            natural: null
    };
    var date;
    if(!isNaN(req.params.str)){
        console.log("unix");
        date = moment.unix(req.params.str);
    }else {
        console.log("natural");
        date = moment(new Date(req.params.str));
    }

    if(date.isValid()){
        console.log("is valid");
        formatedDate = {
            unix: date.format('X'),
            natural:date.format('MMMM DD YYYY')
        };
    }
    res.send('<p style="color:#365d9b; margin-left:40px"><b>' + JSON.stringify(formatedDate) + '</b></p>');

});

app.use('/', (req,res) =>{
    res.sendFile('index.html');
});

app.listen(app.get('port'), () => {
    console.log('App is running on port', app.get('port'))
});
