SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './public/bower_components/jquery/dist/jquery.js',
        'sammy': './public/bower_components/sammy/lib/sammy.js',
        'handlebars': './public/bower_components/handlebars/handlebars.js',
        
       
    }
});
