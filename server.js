var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// default route 
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Test Student Web API' })
});
// connection configurations 
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab_connect_mysql'
});

// connect to database dbconn.connect();
dbConn.connect();

app.get('/allstd', function (req, res) {
    dbConn.query('SELECT * FROM student', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);

    });
});


app.post('/std', function (req, res) {
    var std = req.body
    if (!std) {
        return res.status(400).send({ error: true, messge: 'Please provide student ' });
    }
    dbConn.query("INSERT INTO student SET ?", emp, function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/std/:id', function (req, res) {
    var std_id = req.params.id;
    if (!std_id) {
        return res.status(400).send({ error: true, message: 'please provide student id'});
    }
    dbConn.query('SELECT * FROM student WHERE std_id = ?',std_id,function (error,results,fields){
        if (error) throw error;
        if(results[0]) {
            return res.send(results[0]);
        } else {
            return res.status(400).send({error: true, message: 'student id not found!!'});
        }
    });
});

app.put('/std/:id', function (req, res) {
    var std_id = req.params.id;
    var std = req.body
    if (!std_id || !std) {
        return res.status(400).send({ error: true, message: 'please provide student id and student data'});
    }
    dbConn.query('UPDATE student SET ? WHERE std_id = ?',[std, std_id],function (error,results,fields){
        if (error) throw error;
        
        return res.send({error: false, message: 'student has been updated successfully'});
        
    });
});

app.delete('/std/:id', function (req, res) {
    var std_id = req.params.id;
    if (!std_id) {
        return res.status(400).send({ error: true, message: 'please provide student id'});
    }
    dbConn.query('DELETE FROM student WHERE std_id = ?',std_id,function (error,results,fields){
        if (error) throw error;
            return res.send({error : false, message: 'student has been deleted successfully'})
    });
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');

});
module.exports = app;