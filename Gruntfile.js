module.exports = function(grunt) {

    grunt.initConfig({
        "jade": {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    "build/index.html": ["src/index.jade"],
                    "build/ceni.html": ["src/ceni.jade"],
                    "build/stroitelstvo.html": ["src/stroitelstvo.jade"],
                    "build/obustroistvo.html": ["src/obustroistvo.jade"],
                    "build/garantii.html": ["src/garantii.jade"],
                    "build/chavo.html": ["src/chavo.jade"],
                    "build/kontakti.html": ["src/kontakti.jade"]
                }
            }
        },
        "http-server": {
            "dev": {
                // the server root directory 
                root: "build",
                host: "0.0.0.0",     
                // the server port 
                // can also be written as a function, e.g. 
                // port: function() { return 8282; } 
                port: 8989,

                showDir : true,
                autoIndex: true,
     
                // server default file extension 
                //ext: "html",
     
                // run in parallel with other tasks 
                runInBackground: true,

                // Tell grunt task to open the browser 
                //openBrowser : true
            }
        },
        "copy": {
            main: {
                files: [
                    {
                      flatten: true,
                        expand: true,
                        src: ['src/js/*.js'],
                        dest: 'build/js'
                    },
                    {
                      flatten: true,
                        expand: true,
                        src: ['src/css/*.css'],
                        dest: 'build/css'
                    },
                ]
            }
        },
        "ftp-deploy": {
            build: {
                auth: {
                    host: "ftp.avers.esy.es",
                    port: 21,
                    authKey: "avers",
                    authPath: "./.ftppass"
                },
                src: "build",
                dest: "/public_html"
            }
        },
        "watch": {
            files: [
                "src/*.jade",
                "src/js/*.js",
                "src/css/*.css",
            ],
            options: {
                livereload: true
            },
            tasks: ["jade", "copy"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ftp-deploy");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-http-server");

    grunt.registerTask("default", ["jade", "copy", "http-server", "watch"]);
    grunt.registerTask("full", ["jade", "copy", "ftp-deploy"]);

};
