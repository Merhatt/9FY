/// <reference path="../../../jquery.d.ts"/>
import 'jquery'
import { templateGetter } from 'getTemplates'
import { Data } from 'data';
import toastr from 'toastr';
import { FreeMusicArchive } from 'FreeMusicArchive';

const content = $('#content');
const userDropdown = $('#user-dropdown')
class UserAction {
    home(context) {
        if (Data.getCurrentUser()) {
            templateGetter.get('loggedUser')
                .then(function(template) {
                    userDropdown.html(template(localStorage))
                })
        } else {
            templateGetter.get('loggedOut')
                .then(function(template) {
                    userDropdown.html(template)
                })
        }

        var news;
        var temp;
        Data.getNews()
            .then(function(res) {
                news = res.response;
                //console.log(news.response)
            })
            .then(function() {
                return templateGetter.get('home')

            }).then(function(template) {
                content.html(template(news))
            })
    }

    register(context) {
        templateGetter.get('register')
            .then(function(template) {
                content.html(template);
            })
            .then(function() {
                $('#btn-signup').on('click', function() {
                    let username = $('#reg-username').val();
                    let password = $('#reg-password').val();
                    let email = $('#reg-email').val();
                    let favs = [];

                    let newUser = { username, password, email, favs };

                    Data.register(newUser)
                        .then(function(res) {
                            toastr.success('Succesfully registered')
                            context.redirect('#/login')
                        }).catch(function(err) {
                            var error = JSON.parse(err.responseText)
                            toastr.error(error.description)
                        })

                })
            })
    }

    login(context) {
        if (Data.getCurrentUser()) {
            context.redirect('#/fresh');
            return;
        }

        templateGetter.get('login')
            .then(function(template) {
                content.html(template);
            })
            .then(function() {
                $('#btn-login').on('click', function() {
                    let username = $('#login-username').val();
                    let password = $('#login-password').val();
                    let logUser = { username: username, password: password };

                    Data.login(logUser)
                        .then(function(success) {
                            console.log(success)
                            localStorage.setItem('username', success.username);
                            localStorage.setItem('userId', success._id);
                            localStorage.setItem('authKey', success._kmd.authtoken);
                        })
                        .then(function() {
                            toastr.success('Welcome, ' + localStorage.getItem('username') + '!')
                            context.redirect('#/')
                                //  console.log(localStorage)
                        })
                        .catch(function(err) {
                            var error = JSON.parse(err.responseText)
                            toastr.error(error.description)
                        })

                })
            })
    }



    logout(context) {
        var promise = new Promise((resolve, reject) => {
            localStorage.removeItem('authKey');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            console.log(localStorage)
            toastr.success('Succesfully logged out')
            context.redirect('#/');

            resolve();
        });
        return promise;
    }

    fresh() {
        templateGetter.get('musicPage')
            .then((template) => {
                FreeMusicArchive.getFresh()
                    .then((data) => {
                        content.html(template(data));
                        $('.song').on('click', (ev) => {
                            let target = $(ev.target);
                            let section = 'fresh';
                            while (!target.attr('data-id')) {
                                target = target.parent();
                            }
                            window.location = window.location.origin + '/#/' + section + '/' + target.attr('data-id');
                        });
                    });
            });
    }

    trending() {
        templateGetter.get('musicPage')
            .then((template) => {
                FreeMusicArchive.getTrending()
                    .then((data) => {
                        content.html(template(data));
                        $('.song').on('click', (ev) => {
                            let target = $(ev.target);
                            let section = 'trending';
                            while (!target.attr('data-id')) {
                                target = target.parent();
                            }
                            window.location = window.location.origin + '/#/' + section + '/' + target.attr('data-id');
                        });
                    });
            });
    }

    song(id, section) {
        if (section === 'fresh') {
            FreeMusicArchive.getFresh()
                .then(x => displayImg(x.songs[+id]));
        } else {
            FreeMusicArchive.getTrending()
                .then(x => displayImg(x.songs[+id]));
        }
    }
}

function displayImg(img) {
    templateGetter.get('songPage')
        .then(template => {
            content.html(template(img));
        });
}

let userAction = new UserAction();

export { userAction };