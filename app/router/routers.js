var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var Index = require('./index')
var Movie = require('./movies')
var User = require('./user')
var Download = require('./download')

// var Movie = require('../models/movie');
var _ = require('underscore');

module.exports = function (app) {

    // pre handle user
    app.use(function(req, res, next) {

        var _user = req.session.user
        
        if (_user) {
            app.locals.user = _user
        }

        return next()
    })

    // -------------  API  --------------------

    // movie addMovie
    app.post('/v1/movies/addMovie', Movie.preSave, Movie.addMovie);

    // movie addd & update 
    app.post('/v1/movies/updateMovie',multipartMiddleware , Movie.preSave, Movie.updateMovie);

    // movie delete 
    app.delete('/v1/movies/deletMovie', Movie.deletMovie)

    // user signIn
    app.post('/v1/user/signIn', User.signIn)

    // user logout
    app.get('/logout', function (req, res) {
        User.logout(req, res, app)
    })

    // ---------  user view page   --------------------

    // //index page
    app.get('/', Index.index);

    // movies list
    app.get('/moviesList', Movie.movieListPage)

    // movie detail page
    app.get('/movie/:id', Movie.movieDetailPage)

    // ----------- admin manage page ------------------

    // movie admin index page
    app.get('/admin/addMovie', User.signInRequired, User.adminRequired, Movie.addMoviePage);

    // movie admin update movie page
    app.get('/admin/updateMovie/:id', User.signInRequired, User.adminRequired, Movie.updateMoviePage);

    // user signUp page
    app.get('/user/signUp', User.signUp)

    // movie admin list page
    app.get('/admin/moviesList', User.signInRequired, User.adminRequired, Movie.adminMovieList)

    // -----------  superAdmin manage page  --------------
    app.get('/admin/userList', User.signInRequired, User.adminRequired, User.getUserList)

    // uesr regist 
    app.post('/user/regist', User.regist)

    // ----------- function ---------------
    app.get('/download', Download.download)
        
}