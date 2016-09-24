/// <reference path="../../jquery.d.ts"/>
import Sammy from 'sammy'
import 'jquery';
import {templateGetter} from './utils/getTemplates';
import {userAction} from './actions/userActions';

const content = '#content';

var sammyApp = new Sammy(content, function () {
    
    this.get('#/', userAction.home)

})


sammyApp.run('#/')
$(function () {
    sammyApp.run('#/')
})