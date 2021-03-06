/// <reference path="../../../jquery.d.ts"/>
import 'jquery';
import { templateGetter } from 'getTemplates';
import { Data } from 'data';
import toastr from 'toastr';
import { FreeMusicArchive } from 'FreeMusicArchive';
import { Validator } from 'validator';
import { Cleaner } from 'cleaner';

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

            });


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
                    let repPassowrd = $('#repeat-password').val();
                    let email = $('#reg-email').val();
                    let favs = [];


                    if (!Validator.validateUser(username)) {
                        toastr.error('Username is not in the correct format!');
                        Cleaner.cleanInputs($('#reg-username'))
                        return;
                    }

                    if (!Validator.validatePassword(password)) {
                        toastr.error('Password is not in the correct format!');
                        Cleaner.cleanInputs($('#reg-password'), $('#repeat-password'))
                        return;
                    }

                    if (!Validator.validateEmail(email)) {
                        toastr.error('E-mail is not valid!');
                        Cleaner.cleanInputs($('#reg-email'))
                        return;
                    }


                    if (password != repPassowrd) {
                        toastr.error('Passowords do not match');
                        Cleaner.cleanInputs($('#reg-password'), $('#repeat-password'))
                        return;
                    }



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
        Data.logout().then(x=> {
       
            localStorage.removeItem('authKey');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            console.log(localStorage)
            toastr.success('Succesfully logged out')
            context.redirect('#/');

            resolve();
        });
       
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


    hot() {
        templateGetter.get('musicPage')
            .then((template) => {
                FreeMusicArchive.getHot()
                    .then((data) => {
                        content.html(template(data));
                        $('.song').on('click', (ev) => {
                            let target = $(ev.target);
                            let section = 'hot';
                            while (!target.attr('data-id')) {
                                target = target.parent();
                            }
                            window.location = window.location.origin + '/#/' + section + '/' + target.attr('data-id');
                        });
                    });
            });
    }


    song(id, section, content) {
        if (section === 'fresh') {
            FreeMusicArchive.getFresh()
                .then(x => {
                    displayImg(x.songs[+id]);
                });

        } else if (section === 'trending') {
            FreeMusicArchive.getTrending()
                .then(x => {
                    displayImg(x.songs[+id]);

                });
        } else if (section === 'hot') {
            FreeMusicArchive.getHot()
                .then(x => {
                    displayImg(x.songs[+id]);
                });
        } else if (section === 'search') {
            FreeMusicArchive.search(content, 10)
                .then(x => {
                    displayImg(x.songs[+id]);
                });
        }
    }

    favorites() {
        Data.getUserData()
            .then(res => {
                templateGetter.get('favorites')
                    .then((template) => {

                        content.html(template(res.favs));

                        $('#btn-remove').on('click', function(ev) {

                            var title = ev.target.getAttribute('data-track');
                            var favs;

                            Data.getUserData()
                                .then(res => {
                                    var elementToRemove = res.favs.find(x => x.track_title === title);
                                    var index = res.favs.indexOf(elementToRemove);
                                    res.favs.splice(index, 1);
                                    favs = JSON.parse(JSON.stringify(res.favs))
                                    Data.addFavorites(favs).then(x => toastr.success('Song removed from favorites!'))

                                });

                            $(ev.target).parents('.song-page')[0].remove();
                        })
                    });
            });
    }

    search() {
        let searchItem = this.params.content;
        templateGetter.get('musicPage')
            .then((template) => {
                FreeMusicArchive.search(searchItem, 10)
                    .then((data) => {
                        console.log(data);
                        content.html(template(data));
                        $('.song').on('click', (ev) => {
                            let target = $(ev.target);
                            let section = 'search';
                            while (!target.attr('data-id')) {
                                target = target.parent();
                            }

                            window.location = window.location.origin + '/#/' + section + '/' + searchItem + '/' + target.attr('data-id');
                        });
                    });
            });
    }
}

function displayImg(img) {
    templateGetter.get('songPage')
        .then(template => {
            content.html(template(img));

            $('#btn-like').on('click', function() {

                if (!Data.getCurrentUser()) {
                    toastr.error('You have to be logged in to like a song!');
                    window.location = window.location.origin + '#/login';
                    return;
                }


                let favSongs = [];
                let alreadyAdded = false;
                Data.getUserData()
                    .then(res => {
                        (res.favs).forEach(function(song) {
                            if (img.track_title === song.track_title) {
                                alreadyAdded = true
                                return
                            }

                            favSongs.push(song);
                        });

                        if (alreadyAdded) {
                            toastr.error('Song already added!')
                        } else {
                            favSongs.push(img);
                            Data.addFavorites(favSongs).then(x => toastr.success('Song added to favorites!'))
                        }

                    });
            });
        });
}

let userAction = new UserAction();

export { userAction };