const Discord = require('discord.js');

const client = new Discord.Client();



client.on('ready', () => {

  console.log('I am ready!');

});



client.on('message', message => {
  let status = "i do not know";
  if (message.content === 'status') {
    fetch('https://minecraft.scotty.dance/minecraft/state')
      .then(response => response.json())
      .then(data => console.log(data))
      .then(status = data.state);

    message.reply(status);

  }

});



// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
