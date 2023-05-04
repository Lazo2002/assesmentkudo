const { Client } = require('pg');

const client = new Client({
    host:"arjuna.db.elephantsql.com (arjuna-01)",
    user:"dwaymqzv",
    password:"awpV6YMmkViF0n3adq-12EYONnH0uJRE",
    database:"dwaymqzv",
    connectionString: "postgres://dwaymqzv:awpV6YMmkViF0n3adq-12EYONnH0uJRE@arjuna.db.elephantsql.com/dwaymqzv",
});


module.exports=client;


