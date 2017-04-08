// constants
const Discord = require('discord.js');
const opus = require('node-opus');
//const opus = require('opusscript');
const bot = new Discord.Client();
const config = require('../config/config.json');
const textcom = require('./textcommands');
const voice = require('./soundboard');

// scan all sounds
voice.scanSounds();

// bot ready
bot.on('ready', () => {
    console.log('The bot is online');
});

// listener
bot.on('message', (message) => {
    if(message.content.startsWith(config.prefix_music)) {
        voice.voiceCommand(message, bot);
    }

    if(message.content.startsWith(config.prefix_text)){
        textcom.textCommand(message);
    }
});

// log the bot into the channel
bot.login(config.bot_token);