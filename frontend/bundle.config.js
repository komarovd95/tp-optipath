module.exports = {
    bundle: {
        vendor: {
            scripts: [
                {
                    src: './bower_components/jquery/dist/jquery.js',
                    minSrc: './bower_components/jquery/dist/jquery.min.js'
                },
                {
                    src: './bower_components/bootstrap/dist/js/bootstrap.js',
                    minSrc: './bower_components/bootstrap/dist/js/bootstrap.min.js'
                }
            ],
            styles: [
                {
                    src: './bower_components/bootstrap/dist/css/bootstrap.css',
                    minSrc: './bower_components/bootstrap/dist/css/bootstrap.min.css'
                },
                {
                    src: './node_modules/vis/dist/vis.css',
                    minSrc: './node_modules/vis/dist/vis.min.css'
                }
            ],
            options: {
                uglify: false,
                minCss: false,
                rev: false,
                useMin: ['production'],
                maps: false,
                watch: {
                    scripts: false,
                    styles: false
                }
            }
        },
        main: {

        }
    },
    copy: [{
        src: './node_modules/vis/dist/img/network/*.*',
        base: './node_modules/vis/dist/',
        watch: false
    }]
};