module.exports = {
    name : 'notify',
    description : 'Used to set reminder.',
    execute(message, args){
        if(!args.length){
            var timeInterval, time, unit, reason, person, inMs;
            const acceptableUnits = ['sec','s','min','m','hr','hrs','hour','hours','h'];


            let filter1 = m => m.author.id === message.author.id;
            message.channel.send(`time`).then(() => {
                message.channel.awaitMessages(filter1,{
                    max : 1,
                    time : 30000,
                    errors : ['time']
                }).then(message => {
                    message = message.first();
                    if (!message.content.length) {
                        message.channel.send('check corretly');
                        throw new Error('error');}
                        
                    timeInterval = message.content.split(/ +/);
                    //console.log(timeInterval);
                    time = timeInterval.shift();
                    //console.log(time);
                    unit = timeInterval[0].toLowerCase();
                    //console.log(unit);
                    

                    

                    if(!parseInt(time)){
                        message.channel.send('give in proper format');
                        throw new Error('error');
                    }
                    if(!acceptableUnits.includes(unit)){
                        message.channel.send('wrong unit');
                        throw new Error('error');
                    }                    

                })
                
                
                .then(() => {
                    let filter2 = m => m.author.id === message.author.id;
                message.channel.send(`reason`).then(() => {
                    message.channel.awaitMessages(filter2,{
                        max : 1,
                        time : 30000,
                        errors : ['time']
                    }).then(message => {
                        message = message.first()
                        if (!message.content.length) {
                            message.channel.send('u didnt enter anything')
                            throw new Error('error');}
                            reason = message.content.toLowerCase()
                    }).catch(() => {})
                    
                    
                    .then(() => {
                        let filter3 = m => m.author.id === message.author.id;
                    message.channel.send(`who`).then(() => {
                        message.channel.awaitMessages(filter3,{
                            max : 1,
                            time : 30000,
                            errors : ['time']
                        }).then(message => {
                            message = message.first()
                            if (!message.content.length) {
                                message.channel.send('u didnt enter anything')
                                throw new Error('error');}
                            if (message.content.toLowerCase() === 'me'){
                                person = message.author;
                            } else {person = message.content};
                        })
                        
                        .then(() => {
                            //console.log(timeInterval);
                        message.channel.send(`will remind you in ${time} ${unit}`);
            
            
            
            
                        if(unit === 'hr' || unit === 'hrs' || unit === 'hour' || unit === 'hours'){
                            inMs = 60 * 60 * 1000;
                        } else if(unit === 'min' || unit === 'm'){
                            inMs = 60 * 1000;
                        } else if (unit === 'sec' || unit === 's'){
                            inMs = 1000;
                        }
            
            
                        setTimeout(() => {
                            message.channel.send(`${person} it's time to ${reason}`);
                        }, time * inMs);
                        
                    })
            
                        
            
            
                        
                        
                    }).catch((error) => {
                        console.log(error.message);
                    })
        
                    })
                })
                })
            })




        





        return;



        }

        person = args[0];
        reason = args.slice(2,args.length-3).join(' ');
        time = args[args.length-2];
        unit = args[args.length-1];



        if(person === 'me'){
            person = message.author
        }


        if(unit === 'hr' || unit === 'hrs' || unit === 'hour' || unit === 'hours' || unit === 'h'){
            inMs = 60 * 60 * 1000;
        } else if(unit === 'min' || unit === 'm'){
            inMs = 60 * 1000;
        } else if (unit === 'sec' || unit === 's'){
            inMs = 1000;
        } else{
            message.channel.send("invalid unit. use hrs or min or sec");
            return;
        }

        
        let filter = m => m.author.id === message.author.id;
        message.channel.send(`so you want me to set reminder in ${time} ${unit}?\ntype yes/y or no/n`).then(() => {
            message.channel.awaitMessages(filter, {
                max : 1,
                time : 30000,
                errors : ['time']
            }).then(message => {
                message = message.first()
                if(message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'y') {
                    message.channel.send(`will notify you after ${time} ${unit}`);
                    setTimeout(() => {
                        message.channel.send(`${person} it's time to ${reason}`);
                        }, time * inMs);
                        return;
                } else if(message.content.toLowerCase() === 'no' || message.content.toLowerCase() === 'n'){
                    message.channel.send('cancelled');
                    return;
                } else 
                {
                    message.channel.send('failed. check units and spaces');
                    return;
            }
            })
        })


    }
}