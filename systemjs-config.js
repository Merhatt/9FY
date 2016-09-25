SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': '/node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': '/public/bower_components/jquery/dist/jquery.js',
        'sammy': '/public/bower_components/sammy/lib/sammy.js',
        'handlebars': '/public/bower_components/handlebars/handlebars.js',
        'main': '/public/js/app.js',
        'getTemplates': '/public/js/utils/getTemplates.js',
        'userActions': '/public/js/actions/userActions.js',
        'spotifyApi': './public/js/spotify-api/spotify-api.js',
        'requester': '/public/js/utils/requester.js',
        'constants': '/constants.js',
        'data': '/public/js/data.js'
    }
});

System.import('main');