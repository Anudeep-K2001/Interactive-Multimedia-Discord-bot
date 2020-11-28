const fs = require('fs');


module.exports = {
    name : "tod",
    description : "A game of truth or dare.",
    execute(message, args){
        if(!args.length){
            const choice = Math.round(Math.random());
            if(choice === 0){
                message.channel.send("You recieved Truth");
                randomLine('./data/tod/truth.txt', message);
                return;
            } else {
                message.channel.send("You recieved Dare");
                randomLine('./data/tod/dare.txt', message);
                return;
            }
        }

        if(args[0] === '-t'){
            randomLine('./data/tod/truth.txt', message);
            return;
        }

        if(args[0] === '-d'){
            randomLine('./data/tod/dare.txt', message);
        }

    }
}


function randomLine(filename, message){
    fs.readFile(filename, "utf8", (err,data) => {
        if(err) throw err;
        var lines = data.split('\n');
        message.channel.send(`${message.author} ${lines[Math.floor(Math.random()*lines.length)]}`);
    })
}