const fs = require('fs');

module.exports = {
    name : "suggest",
    description : "Suggest ideas, questions and other stuff into their respective database",
    execute(message, args){
        if(args[0] === '-tod'){
            if(args[1] === '-t'){
                fs.appendFile('./suggestions/truth.txt', `${args.slice(2,args.length).join(' ')+'\n'}`, err => {
                    if(err){
                        message.channel.send("unexpected error");
                        return;
                    };
                });
                message.channel.send('successfully updated');
                return;
            } if(args[1] === '-d'){
                fs.appendFile('./suggestions/dare.txt', `${args.slice(2,args.length).join(' ')+'\n'}`, err => {
                    if(err){
                        message.channel.send("unexpected error");
                        return;
                    };
                });
                message.channel.send('successfully updated');
                return;
        }}

        const filesList = ['-server','-convo','-bot'];

        if(filesList.includes(args[0])){

            fs.appendFile(`./suggestions/${args[0].slice(1,args[0].length)}.txt`, `${args.slice(1,args.length).join(' ')+'\n'}`, err => {
                if(err){
                    message.channel.send("unexpected error");
                    return;
                };
            });
            message.channel.send('successfully updated');
            return;
            
        }













        
    }
}