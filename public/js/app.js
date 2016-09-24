/// <reference path="../../jquery.d.ts"/>
import Sammy from 'sammy'
import 'jquery';

const content = '#content';

var sammyApp = new Sammy(content, function () {


})

(function () {
    sammyApp.run('#/')
}());