'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
var merge = require('webpack-merge');

build.typescript.enabled = false;

build.sass.setConfig({
    sassMatch: []
});

build.configureWebpack.setConfig({
    additionalConfiguration: function (config) {

        /* TODO: hard-coded value */
        config.entry['to-do.bundle'] = config.entry['to-do.bundle'].replace('ToDoWebPart.js', 'ToDoWebPart.ts');

        var vueConfig = {
            /* TODO: test devtoolModuleFilenameTemplate & devtoolFallbackModuleFilenameTemplate more, not sure if approach below is correct*/
            /*output: {
                devtoolModuleFilenameTemplate: function (info) {
                    if (info.resource.match(/\.vue$/)) {
                        return info.allLoaders.match(/type=script/) ? info.resourcePath : info.resourcePath + '?ts' + info.hash;
                    } else {
                        return info.resourcePath;
                    }
                }
            },*/
            resolve: {
                extensions: ['.ts', '.js', '.vue'],
                alias: {
                    'vue$': 'vue/dist/vue.runtime.esm.js'
                }
            },
            module: {
                rules: [{
                    test: /\.vue$/,
                    use: [{
                        loader: 'vue-loader',
                        options: {
                            esModule: true
                        }
                    }]
                }, {
                    test: /\.ts$/,
                    exclude: [/node_modules|vue\/src/],
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }]

                }]
            }
        };

        return merge(config, vueConfig);
    }
});

build.copyStaticAssets.setConfig({
    includeExtensions: ['vue', 'scss', 'ts', 'js']
});

build.initialize(gulp);
