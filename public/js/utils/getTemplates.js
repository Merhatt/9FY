/// <reference path="../../../jquery.d.ts"/>
import handlebars from 'handlebars'
import 'jquery';

function getTemplate(templateName) {
    let url = `../../../templates/${templateName}.handlebars`;

    var promise = new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            success: function (data) {
                let template = handlebars.compile(data);
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