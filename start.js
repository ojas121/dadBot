var forever = require('forever-monitor');

var child = new (forever.Monitor)('./bot.js', {
    max: 5,
    silent: false,
    args: []
});

child.on('exit', function () {
    console.log('bot.js has exited after 5 restarts');
});

child.start();