var Base64 = require('js-base64').Base64;

var Movie = require('../models/movie');

exports.index = function (req, res) {
    console.log('user in session: ')
    console.log(req.session.user)

    Movie.fetch(function (err, movies) {
        // console.log(movies)
        if (err) {
            console.error(err)
        } else {
            // movies.forEach(function (item) {
            //     item.video = 'thunder://' + Base64.encode('AA' + item.video + 'ZZ')
            // })
            res.render('index', {
                title: 'xingkong 首页',
                movies: movies
            })
        }
    });
}