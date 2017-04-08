const Discord = require('discord.js');
const config = require('../config/config.json');
const fs = require('fs');
const soundDir = (config.sound_dir.slice(-1) != "/") ? config.sound_dir + "/" : config.sound_dir;
var dispatcher = null;
var sounds = [];

function scanSounds() {
var scannedFiles = fs.readdirSync(soundDir);
    console.log("\n===== Scanning for sounds in " + soundDir + " =====");
    scannedFiles.forEach(function(file) {
        var command = file.replace(/\.[^/.]+$/, "").toLocaleLowerCase();
        if (command != config.magic_word) {
            console.log("Adding sound: " + file);
            sounds.push({command: command, file: file});
        }
    });
    console.log("===== Ending sound scan =====\n");
}

function listSounds() {
    var temp = "```\nHere is the list of sounds available\n\n";
    sounds.forEach(function(entry) {
        temp += entry.command + "\n";
    });
    temp += "```";
    return temp;
}

function voiceCommand(msg, bot) {
    var command = msg.content.slice(1).toLowerCase();
    var vchannel = msg.member.voiceChannel;
    // regardless, delete the message unless it's only a ?
    if(command) { msg.delete(); }
    
    if(vchannel && command) {
         vchannel.join()
        .then(connection => {
            // console.log(bot);
            if (command == config.magic_word && dispatcher) {
                dispatcher.end()
            } else {
                var com = sounds.find(c => c.command === command);
                // if the file was scanned
                if (com) {
                    dispatcher = connection.playFile(soundDir + com.file);
                }
            }      
        }).catch(console.error);  
    }
}

module.exports = {scanSounds, voiceCommand, listSounds}