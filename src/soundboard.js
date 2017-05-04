const Discord = require('discord.js');
const config = require('../config/config.json');
const fs = require('fs');
const chokidar = require('chokidar');
const soundDir = (config.sound_dir.slice(-1) != "/") ? config.sound_dir + "/" : config.sound_dir;
const maxMessageLength = 2000;
var dispatcher = null;
var sounds = [];
var watcher = chokidar.watch(soundDir, {ignored: /^\./, persistent: true});

watcher
    .on('add', function(path) {sounds = []; scanSounds()})
    .on('unlink', function(path) {sounds = []; scanSounds()})
    .on('error', function(error) {console.error('Error happened', error);})
    
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

function listSounds(msg) {
    var header = "```\nHere is the list of sounds available\n\n";
    var tail = "```";
    var msgBody = "";
    for(var i = 0; i < sounds.length; i++) {
        var temp = sounds[i].command + "\n";
        if((header.length + tail.length + temp.length + msgBody.length) < maxMessageLength && i == sounds.length - 1) {
            msgBody += temp;
            msg.author.dmChannel.send(header + msgBody + tail);
        } else if((header.length + tail.length + temp.length + msgBody.length) < maxMessageLength){
            msgBody += temp;
        } else {
            msg.author.dmChannel.send(header + msgBody + tail);
            msgBody = ""
        }
    }
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