/// <reference path="../../jquery.d.ts"/>
import Sammy from 'sammy';
import 'jquery';
import { userAction } from 'userActions';

const content = '#content';

var sammyApp = new Sammy(content, function() {
    this.get('#/', userAction.home);
    this.get('#/register', userAction.register);
    this.get('#/login', userAction.login);
    this.get('#/logout', userAction.logout);
    this.get('#/fresh', userAction.fresh);
    this.get('#/fresh/:id', function() {
        userAction.song(this.params.id, 'fresh');
    });
    this.get('#/trending', userAction.trending);
    this.get('#/trending/:id', function() {
        userAction.song(this.params.id, 'trending');
    });
    this.get('#/hot', userAction.hot);
    this.get('#/hot/:id', function() {
        userAction.song(this.params.id, 'hot');
    });
    this.get('#/favorite', userAction.favorites);
    this.get('#/search/:content', userAction.search);
    this.get('#/search/:content/:id', function() {
        userAction.song(this.params.id, 'search', this.params.content);
    });
});


$(function() {
    sammyApp.run('#/');
});