/// <reference path="../../jquery.d.ts"/>
import Sammy from 'sammy';
import 'jquery';
import { userAction } from 'userActions';

const content = '#content';

var sammyApp = new Sammy(content, function() {

    this.get('#/', userAction.home);
    this.get('#/register', userAction.register);
    this.get('#/login', userAction.login);
    this.get('#/logout', userAction.logout)
});


$(function() {
    sammyApp.run('#/');
});