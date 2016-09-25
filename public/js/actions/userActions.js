/// <reference path="../../../jquery.d.ts"/>
import 'jquery'
import { templateGetter } from 'getTemplates'
import {Data} from 'data'

const content = $('#content');

class UserAction {
    home(context) {
        templateGetter.get('home')
            .then(function(template) {
                content.html(template)
            })
    }

    register(context) {
        templateGetter.get('register')
            .then(function(template) {
                content.html(template);
            })
            .then(function () {
                $('#btn-signup').on('click',function () {
                    let username = $('#reg-username').val();
                    let password = $('#reg-password').val();
                    let email = $('reg-email').val();

                    let newUser = {username, password, email};
                    
                    Data.register(newUser)
                    .then(function (res) {
                        context.redirect('#/login')
                    }).catch(function (err) {
                        alert(JSON.stringify(err))
                    })

                })
            })
    }

    login(context) {
        templateGetter.get('login')
            .then(function(template) {
                content.html(template)
            })
    }
}
let userAction = new UserAction();
export { userAction };