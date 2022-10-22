const fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js')),
    images = fs.readdirSync('./images/');

//prepare Twit package
const bot = new Twit(config);

function tweet() {
    //select random image
    var random_image = images[Math.floor(Math.random() * images.length)];

    //prepare image data for twitter
    var image_data = fs.readFileSync('./images/' + random_image, { encoding: 'base64'});

    //upload image
    bot.post('media/upload', { media_data: image_data }, function (err, data, response) {
        if (err) {
            console.log('error uploading: ', err);
        }
        else {
            //post tweet
            bot.post('statuses/update', { media_ids: data.media_id_string });
            console.log('successfully tweeted!');
        }
    });
}

//24 hours in ms
var delay = 24 * 60 * 60 * 1000; 

//tweet every 24 hours
setInterval(function() { tweet(); }, delay);