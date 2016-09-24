/// <reference path="../../jquery.d.ts"/>
import Sammy from 'sammy'
import 'jquery';
import {templateGetter} from 'getTemplates';
import {userAction} from 'userActions';

const content = '#content';

var sammyApp = new Sammy(content, function () {
    
    this.get('#/', userAction.home)

})


$(function () {
    console.log('daiba')
    sammyApp.run('#/')
})