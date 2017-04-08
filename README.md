# Discord Sound Bot

## Discription

This is a discord I programmed in Node.js to act as a soundboard with some extra commands.

Instructions in this README is going to be aimed at Windows user.

## Prerequisites

* [Install Node.js](https://nodejs.org/en/download/)
  * In the installation options, make sure to option to add node.js to the `%PATH%` variable
* [Install FFmpeg](http://adaptivesamples.com/how-to-install-ffmpeg-on-windows/)
  * You will need to manually extract the files, and add the bin folder to your `%PATH%` variable
* **RECOMMENDED**
  * [Windows Build Tools](https://www.npmjs.com/package/windows-build-tools) in a great module for Node.js to can allow you to compile Node modules (install via Powershell with Admin rights)
* `npm install discord.js node-opus bufferutil sodium hammerandchisel/erlpack --save`

## Notes

### Audio Engines

Discord.js uses Opus for audio streams when a bot is in a voice chat. The preffered audio engin is node-opus, which normally involves in compiling (Hence why I added the Windows Build Tool in the Prerequsites). 

Opusscript is less of a hassle for installing, but I have experienced ***crackling*** when playing audio.

## Configurations

The `config.json` file is where all the main settings are needed.

### bot_token

This is the Token you would use from you bot account. (https://discordapp.com/developers/applications/me)

### admin_role

The bot is designed where people with a specific role may access certain commands. Example would be the clear command, so everyone cant delete a chate history

### prefix_text and prefix_music

This is the prefix character needed in order to do text commands. These are sperate so incase you have a sound file called ***d20***, it will not interfere with the dice rolling command. So if the music prefix was `?` and the text prefix was `!`, then you can play the sound file `?d20`, and you can roll a 20 sided die with `!d20`

### magic_word

this is a voice command to stop playing any file from the music bot. This is to prevent spammers from playing an ear-rape sound, and it's used to prevent overwriting the stop command with a file name.

Example: 

if I have the magic_word as `help`, then `?help` would stop playing anything, and any file name `help.mp3` or what not will never be loaded.

### sound_dir

This is the directory in which you load your sound files. In the .json file, make sure to use `/`'s for directories instead of the Windows `\`

## Text Commands

All examples will assume the text prefix is `!`

* `!hello`
  * Prints the bot "Hello Banner" which can be edited in the config.json file
* `!clear [number from 2-0]`
  * The role in the admin_role config will be able to delete messages in the text channel
* `!list`
  * The bot will DM you the list of voice commands you can use
* `!insult [option to @ a user]`
  * you can send a random insult in the channel, or directly to another user. Insults are configured in the insults.json file
* `!joke`
  * similar to insult, but you dont have the option to mention someone, jokes are loaded in the jokes.json file
* `![1-9]+d[1-9][0-9]?`
  * This is the dice rolling command, so you can do simple rolls. Example: `!3d20` will roll 3 20-sided dice. You cannot roll 0d20, you also cannot roll `d0` or `d1` as they all would assume the same results.