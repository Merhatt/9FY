/// <reference path="../../../jquery.d.ts"/>
import 'jquery'
import { templateGetter } from 'getTemplates'
import {Data} from 'data'

const content = $('#content');
const userDropdown = $('#user-dropdown')
class UserAction {
    home(context) {

        if (Data.getCurrentUser()) {
            templateGetter.get('loggedUser')
                .then(function (template) {
                    userDropdown.html(template(localStorage))
                })
        }else{
            templateGetter.get('loggedOut')
            .then(function (template){
                userDropdown.html(template)
            })
        }

        //implement the userdropdown shit
        templateGetter.get('home')
            .then(function (template) {
                content.html(template)
            })
    }

    register(context) {
        templateGetter.get('register')
            .then(function (template) {
                content.html(template);
            })
            .then(function () {
                $('#btn-signup').on('click', function () {
                    let username = $('#reg-username').val();
                    let password = $('#reg-password').val();
                    let email = $('reg-email').val();

                    let newUser = { username, password, email };

                    Data.register(newUser)
                        .then(function (res) {
                            context.redirect('#/login')
                        }).catch(function (err) {
                            var error = JSON.parse(err.responseText)
                            alert(error.description)
                        })

                })
            })
    }

    login(context) {
        if (Data.getCurrentUser()) {
            context.redirect('#/fresh')
            return;
        }

        templateGetter.get('login')
            .then(function (template) {
                content.html(template)
            })
            .then(function () {
                $('#btn-login').on('click', function () {
                    let username = $('#login-username').val();
                    let password = $('#login-password').val();
                    let logUser = { username: username, password: password };

                    Data.login(logUser)
                        .then(function (success) {
                            localStorage.setItem('username', success.username);
                            localStorage.setItem('userId', success._id);
                            localStorage.setItem('authKey', success._kmd.authtoken);
                        })
                        .then(function () {
                            context.redirect('#/')
                            console.log(localStorage)
                        })
                        .catch(function (err) {
                            var error = JSON.parse(err.responseText)
                            alert(error.description)
                        })

                })
            })
    }

    logout(context) {
       
        localStorage.clear();
        context.redirect('#/')

    }
}
let userAction = new UserAction();
export { userAction };