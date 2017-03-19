var express = require('express');
var moment = require('moment');

var app = express();

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
    res.sendFile('/home/andrei/fcc/timestampMicroservice/index.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!')
});
