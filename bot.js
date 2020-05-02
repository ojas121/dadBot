var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var giveMeAJoke = require('give-me-a-joke');
var messages = 0
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
    messages++;
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    try {
        if (checkMessage(message)) {
            let serverId = bot.channels[channelID].guild_id
            console.log(serverId)
            const strings = ["I'm", "Im", "i'm", "im", "I am", "i am"]
            const indices = []

            strings.forEach(string => {
                indices.push(message.indexOf(string))
            })
            console.log(indices)
            var thisindex = Math.max(...indices);
            console.log(thisindex)
            var whichIntro = 0
            for (var i = 0; i < indices.length; i++) {
                if (indices[i] === thisindex) {
                    whichIntro = i;
                }
            }
            console.log(whichIntro)

            const lengthOfIntro = strings[whichIntro].length

            const whoAmI = message.substring(thisindex + lengthOfIntro + 1)

            const messageToSend = "Hi " + whoAmI + ", this is dad."

            bot.sendMessage({
                to: channelID,
                message: messageToSend,
            });

            console.log(channelID)
            bot.editNickname({
                serverID: serverId,
                userID: userID,
                nick: whoAmI,
            }, response => {console.log(response)});
        } else if (messages >= 20) {
            //send a joke
            let joke = giveMeAJoke.getRandomDadJoke(joke => {
                bot.sendMessage({
                    to: channelID,
                    message: joke,
                });
            })

            messages = 0
        }
    } catch (e) {
        console.log(e)
    }
});


function checkMessage(message) {
    if (message.includes(" I'm ") || message.includes(" Im ") || message.includes(" i'm ") || message.includes(" im ") || message.includes(" I am ") || message.includes(" i am ")) {
        return true
    } else {
        message = " " + message
        return message.includes(" I'm ") || message.includes(" Im ") || message.includes(" i'm ") || message.includes(" im ") || message.includes(" I am ") || message.includes(" i am ");
    }
}