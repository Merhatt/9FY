/// <reference path="../../../jquery.d.ts"/>
import hadlebars from 'hadlebars'
import 'jquery';

function getTemplate(templateName) {
    let url = `../../../templates/${templateName}.hadlebars`;

    var promise = new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            success: function (data) {
                let template = hadlebars.compile(data);
                resolve(template);
            },
            error: function (err) {
                reject(err);
            }
        })
    })

    return promise;
}

class TemplateGetter{
    get(templateName){
        return getTemplate(templateName);
    }
}

var templateGetter = new TemplateGetter();

export {templateGetter};