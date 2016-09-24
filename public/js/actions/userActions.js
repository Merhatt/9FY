/// <reference path="../../../jquery.d.ts"/>
import 'jquery'
import {templateGetter} from '../utils/getTemplates'

const content = $('#content');

class UserAction{
    home(context){
        templateGetter.get('home')
        .then(function (template) {
            content.html(template)
        })
    }
}
let userAction = new UserAction()
export{userAction};