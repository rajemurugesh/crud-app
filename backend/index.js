const express=require('express');
const mysql =require('mysql2');
const cors =require('cors');
const bodyParser =require('body-parser') ;
const port = 8000;

const app = express();
//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));


//configurations for creating mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Raje@1992_mysql',
    database: 'mydb'
});

connection.connect(function(err) {
    if (err) {
        return console.log('error ' + err.message);
    }
    console.log('connected to the database')
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO users (name, email, age) VALUES ('john', 'john@gmail.com', '23')";
    connection.query(sqlInsert, (err, result)=> {
        console.log("error", err);
        console.log("result", result);
        res.send("Hello from node");
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})