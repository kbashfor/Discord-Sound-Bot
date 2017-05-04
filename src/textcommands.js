const permissions = require('./permissions');
const config = require('../config/config.json');
const sound = require('./soundboard.js');
const insults = require('../config/insults.json');
const jokes = require('../config/jokes.json');

function textCommand(msg) {
    var command = msg.content.slice(1).toLowerCase();
   switch(command) {
        case "hello":
            msg.delete();
            msg.reply(config.hello_banner);
            break;
        case (command.match(/^clear [1-9][0-9]?$|^100$/) || {}).input:
            // recommend to do a check if user has a specific role
            // console.log(permissions.hasRole(msg.member, "Admin"));
            msg.delete();
            if(permissions.hasRole(msg.member, config.admin_role)) {
                if (command.match(/[1-9][0-9]?$|^100$/) >=2 && command.match(/[1-9][0-9]?$|^100$/) <= 100) {
                    msg.channel.fetchMessages({limit: command.match(/[1-9][0-9]?$|^100$/)}).then(messages => msg.channel.bulkDelete(messages)).catch(console.error);
                } else {
                    msg.reply("limit of message deletion is from 2 and 100"); 
                }
            }
            break;
        case "list":
            msg.author.dmChannel.sendMessage(sound.listSounds());
            msg.delete();
            break;
        //http://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript
        case (command.match(/^insult <@[0-9]+>$/)  || {}).input:
            msg.reply(insults[Math.floor(Math.random() * insults.length)]);
            msg.delete();
            break;
        case "insult":
            msg.channel.sendMessage(insults[Math.floor(Math.random() * insults.length)]);
            msg.delete();
            break;
        case "joke":
            msg.channel.sendMessage(jokes[Math.floor(Math.random() * jokes.length)]);
            msg.delete();
            break;
        case (command.match(/^d[0-9]+$/) || {}).input:
            // you can't roll a d0 or a d1
            var sides = command.match(/[0-9]+$/)[0];
            if (sides != 1 && sides != 0 && sides < Number.MAX_SAFE_INTEGER) {
                var diceroll = Math.floor(Math.random() * sides) + 1;
                msg.reply((sides == 20 && diceroll == 20) ? " rolled a NAT 20, I SHIT YOU NOT!" : " rolled a d" + sides + " and rolled a total of " + diceroll);    
            }
            msg.delete();
            break;
        case (command.match(/^[0-9]+d[0-9]+$/) || {}).input:
            var rolls = command.match(/^[0-9]+/)[0];
            var sides = command.match(/[0-9]+$/)[0];
            var total = 0;
            if (sides != 1 && sides != 0 && rolls != 0 && sides < Number.MAX_SAFE_INTEGER && rolls < Number.MAX_SAFE_INTEGER) {
                for (var i = 0; i < rolls; i++) {
                   total += Math.floor(Math.random() * sides) + 1;
                }
                msg.reply(" rolled " + rolls + "d" + sides + " and rolled a total of " + total); 
            }
            msg.delete();
            break;
        default:
            msg.reply("I do not know the command: " + msg.content);
   }
}

module.exports = {textCommand}