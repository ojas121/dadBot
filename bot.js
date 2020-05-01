var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('error', console.error);

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.includes("I'm") || message.includes("Im") || message.includes("i'm") || message.includes("im") || message.includes("I am") || message.includes("i am")) {
        const strings = ["I'm", "Im", "i'm", "im", "I am", "i am"]
        const indices = []

        strings.forEach(string => {
            indices.push(message.indexOf(string))
        })

        var thisindex = 0
        var whichIntro = 0
        for (var i = 1; i < indices.length; i++) {
            if (indices[i] > thisindex) {
                whichIntro = i;
                thisindex = indices[i];
            }
        }

        const lengthOfIntro = strings[whichIntro].length

        const whoAmI = message.substring(thisindex + lengthOfIntro)

        const messageToSend = "Hi " + whoAmI + ", this is dad."

        bot.sendMessage({
            to: channelID,
            message: messageToSend,
        });
    }
});
