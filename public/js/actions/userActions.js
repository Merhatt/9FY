/// <reference path="../../../jquery.d.ts"/>
import 'jquery'
import { templateGetter } from 'getTemplates'

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