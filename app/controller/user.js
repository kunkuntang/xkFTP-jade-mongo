var User = require('../models/user')

// ---------  Page   --------------------

// user regist page
exports.regist = function(req, res) {
    res.render('regist')
}

// -----------  superAdmin manage page  --------------
exports.getUserList = function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err)
        } else {
            res.render('userList', {
                title: 'user list page',
                users: users
            })
        }
    })
}

// -------------  API  --------------------

exports.signUp = function(req, res) {
    var _user = req.body.user
    console.log(_user)

    User.find({name: _user.name}, function(err, user) {
        if (err) {
            console.log(err)
        }
        console.log(user)
        if (user.length) {
            res.redirect('/user/signUp')
        } else {
            var user = new User(_user)
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/userList')
            })
        }
    })
}

// signIn
exports.signIn = function(req, res) {
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name: name}, function(err, user) {
        if (err) {
            console.log(err)
        }

        if (!user) {
            return res.redirect('/')
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err)
            }

            if (isMatch) {
                console.log('password is matched')
                req.session.user = user
                return res.redirect('/')
            } else {
                console.log('password is not matched')
            }
        })
    })
}

exports.logout = function(req, res, app) {
    delete req.session.user
    delete app.locals.user

    res.redirect('/')
}

exports.signInRequired = function(req, res, next) {
    var user = req.session.user

    if (!user) {
        return res.redirect('/')
    }

    next()
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user

    if (user.role < 10 ) {
        return res.redirect('/')
    }

    next()
}