const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const emojiList = require('./data/emojiList.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

var command, args, temp;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	if (message.content.startsWith('..')) {
		args = message.content.trim().split(/ +/);
		temp = args.shift().toLowerCase();
		if (temp == '..') {}
		else {args.unshift(temp.slice(2));}
		command = '.';

		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).execute(message, args, emojiList);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}

		return;

	}

	else {

	args = message.content.slice(prefix.length).trim().split(/ +/);
	command = args.shift().toLowerCase();

	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



client.login(token);