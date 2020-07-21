const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();

client.on('message', message => {

    if (message.content === 'status') {
	fetch('https://api.scotty.dance/minecraft/state')
	    .catch(err => console.error(err))
	    .then(res => res.json())
	    .then(json => {
	    	console.log(json);
		if (json.state == 'stopped') {
	    	    message.reply('The server is off, but I can \`start\` it.');
		} else if (json.state == "running" && !json.players) {
		    message.reply('The server should be booting up...');
		} else if (json.players && json.players.includes("There are 0")) {
		    message.reply('Server is on but will shutdown soon.');
		} else if (json.players) {
		    let players = json.players.split(":")[4];
		    message.reply(`**Online**:\n\t${players}`);
		}

	    });

    } else if (message.content === 'start') {
	fetch('https://api.scotty.dance/minecraft/start', {method: 'POST'})
	    .catch(err => console.error(err))
	    .then(res => res.json())
	    .then(json => {
	    	console.log(json);
	    	message.reply('Started the server, go play.');
	    });

    }

});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
