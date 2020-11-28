const fs = require('fs')


module.exports = {
    name : "convo",
    description : "gives a random question",
    execute(message, args){
        randomLine("./data/convo.txt", message);
    }
}

function randomLine(filename, message){
    fs.readFile(filename, "utf8", (err,data) => {
        if(err) throw err;
        var lines = data.split('\n');
        message.channel.send(`${message.author} ${lines[Math.floor(Math.random()*lines.length)]}`);
    })
}