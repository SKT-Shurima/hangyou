// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../elm/index.html'),
        assetsRoot: path.resolve(__dirname, '../elm'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8028,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxypath: 'http://hengyou.zertone1.com/app',
        context:['/hengyou'],
        // proxyTable: {
        //     '/hengyou': {
        //         target: 'http://hengyou.zertone1.com/app',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/hengyou': ''
        //         }
        //     }
        // },
        cssSourceMap: false
    }
}
