module.exports = function(grunt) {

    grunt.initConfig({
        "pug": {
            debug: {
              options: {
                pretty: true,
                data: {
                    debug: true
                }
              },
              files: {
                "build/index.html": ["src/index.pug"],
                "build/ceni.html": ["src/ceni.pug"],
                "build/stroitelstvo.html": ["src/stroitelstvo.pug"],
                "build/obustroistvo.html": ["src/obustroistvo.pug"],
                "build/garantii.html": ["src/garantii.pug"],
                "build/chavo.html": ["src/chavo.pug"],
                "build/kontakti.html": ["src/kontakti.pug"]
              }
            },
            release: {
              options: {
                pretty: false,
                data: {
                    debug: false
                }
              },
              files: {
                "pre-build/index.html": ["src/index.pug"],
                "pre-build/ceni.html": ["src/ceni.pug"],
                "pre-build/stroitelstvo.html": ["src/stroitelstvo.pug"],
                "pre-build/obustroistvo.html": ["src/obustroistvo.pug"],
                "pre-build/garantii.html": ["src/garantii.pug"],
                "pre-build/chavo.html": ["src/chavo.pug"],
                "pre-build/kontakti.html": ["src/kontakti.pug"]
              }
            }
        },
        "sass": { // Task
          dist: { // Target
            options: { // Target options
                style: "expanded"
            },
            files: {
                "build/css/custom.css": "src/css/custom.scss"
            }
          },
          debug: {
            options: { // Target options
                style: "expanded"
            },
            files: {
                "build/css/custom.css": "src/css/custom.scss"
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

            showDir: true,
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
            files: [{
              flatten: true,
              expand: true,
              src: ["src/js/*.js"],
              dest: "build/js"
            }]
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
                "src/*.pug",
                "src/js/*.js",
                "src/css/*.scss",
            ],
            options: {
                livereload: true
            },
            tasks: ["pug", "sass", "copy"]
        },
        minifyHtml: {
          options: {
              cdata: true
          },
          dist: {
            files: {
              "build/index.html": "pre-build/index.html",
              "build/ceni.html": "pre-build/ceni.html",
              "build/stroitelstvo.html": "pre-build/stroitelstvo.html",
              "build/obustroistvo.html": "pre-build/obustroistvo.html",
              "build/garantii.html": "pre-build/garantii.html",
              "build/chavo.html": "pre-build/chavo.html",
              "build/kontakti.html": "pre-build/kontakti.html"
            }
          }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ftp-deploy");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-http-server");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-minify-html");

    grunt.registerTask("default", ["pug:debug", "sass:debug", "copy", "http-server", "watch"]);
    grunt.registerTask("build",   ["pug:release", "minifyHtml", "sass:dist", "copy"]);
    grunt.registerTask("deploy",  ["pug:release", "sass:dist", "copy", "ftp-deploy"]);

};
