module.exports = {
    name : 'help',
    description : 'Shows the user with helpful commands',
    execute(message, args){
        message.channel.send(".ping\n .tod *-t *-d");
    }
}