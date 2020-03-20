function renderFiles(api, opts) {

  const fs = require('fs')
  const path = require('path')
  api.onCreateComplete(() => {
    let file0 = fs.openSync(`${api.resolve('src')}/../.editorconfig`, 'w');
    fs.writeSync(file0,  fs.readFileSync(__dirname+'/templates/base/.editorconfig','utf-8'));
    fs.closeSync(file0);

    let file1 = fs.openSync(`${api.resolve('src')}/../.env.dev`, 'w');
    fs.writeSync(file1,  fs.readFileSync(__dirname+'/templates/base/.env.dev','utf-8'));
    fs.closeSync(file1);

    let file2 = fs.openSync(`${api.resolve('src')}/../.env.prod`, 'w');
    fs.writeSync(file2,  fs.readFileSync(__dirname+'/templates/base/.env.prod','utf-8'));
    fs.closeSync(file2);

    let file3 = fs.openSync(`${api.resolve('src')}/../.env.test`, 'w');
    fs.writeSync(file3,  fs.readFileSync(__dirname+'/templates/base/.env.test','utf-8'));
    fs.closeSync(file3);

    let file4 = fs.openSync(`${api.resolve('src')}/../.eslintrc.js`, 'w');
    fs.writeSync(file4,  fs.readFileSync(__dirname+'/templates/base/.eslintrc.js','utf-8'));
    fs.closeSync(file4);

    let file5 = fs.openSync(`${api.resolve('src')}/../.gitignore`, 'w');
    fs.writeSync(file5,  fs.readFileSync(__dirname+'/templates/base/.gitignore','utf-8'));
    fs.closeSync(file5);

    let file6 = fs.openSync(`${api.resolve('src')}/../.browserslistrc`, 'w');
    fs.writeSync(file6,  fs.readFileSync(__dirname+'/templates/base/.browserslistrc','utf-8'));
    fs.closeSync(file6);


  })

  const filesToDelete = [
    'src/assets/logo.png',
    'src/views/About.vue',
    'src/views/Home.vue',
    'src/components/HelloWorld.vue',
  ]

  // console.log('\n[custom-tpl plugin tips]\n \t GeneratorAPI options:', opts)

  if (opts.replaceTemplates) {
    // https://github.com/vuejs/vue-cli/issues/2470
    api.render(files => {
      Object.keys(files)
        .filter(name => filesToDelete.indexOf(name) > -1)
        .forEach(name => delete files[name])
    })
    api.render('./templates/base')
  }
}

function addDependencies(api,projectName) {
  api.extendPackage({
    scripts: {
      "serve": "vue-cli-service serve --mode dev --dest=dist-dev",
      "build": "vue-cli-service build --mode prod --dest=dist-prod",
      "build-test": "vue-cli-service build --mode test --dest=dist-test",
      "build-prod": "vue-cli-service build --mode prod --dest=dist-prod",
      "build-docker": "vue-cli-service build --mode prod --dest=dist-prod && docker build . -t "+projectName+" && docker save > "+projectName+".img "+projectName+":latest",
      "lint": "vue-cli-service lint"
    },
    dependencies: {
      "axios": "^0.19.2",
      "core-js": "^3.6.4",
      "cropperjs": "^1.5.1",
      "vconsole": "^3.3.0",
      "vue": "^2.6.11",
      "vue-router": "^3.1.5",
      "vue-scroller": "^2.2.4",
      "vuex": "^3.1.2"
    },
    devDependencies: {
      "@babel/polyfill": "^7.6.0",
      "filemanager-webpack-plugin": "^2.0.5",
      "stylus": "^0.54.5",
      "stylus-loader": "^3.0.2",
      "squirrelzoo-build-plugin": "^1.0.1",
      "babel-plugin-transform-remove-console": "^6.9.4",
      "@vue/cli-plugin-babel": "^4.2.0",
      "@vue/cli-plugin-eslint": "^4.2.0",
      "@vue/cli-plugin-router": "^4.2.0",
      "@vue/cli-plugin-vuex": "^4.2.0",
      "@vue/cli-service": "^4.2.0",
      "@vue/eslint-config-prettier": "^6.0.0",
      "babel-eslint": "^10.0.3",
      "eslint": "^6.7.2",
      "eslint-plugin-prettier": "^3.1.1",
      "eslint-plugin-vue": "^6.1.2",
      "prettier": "^1.19.1",
      "vue-template-compiler": "^2.6.11"
    }
  })
}

module.exports = (api, options, rootOpts) => {
  options.BASE_URL = '<%= BASE_URL %>'
  options.VUE_APP_BUILD_TIME = '<%= VUE_APP_BUILD_TIME %>'
  options.VUE_APP_BUILD_VER = '<%= VUE_APP_BUILD_VER %>'
  options.VUE_APP_BUILD_REPO_VER = '<%= VUE_APP_BUILD_REPO_VER %>'
  options.projectName = api.generator.originalPkg.name


  addDependencies(api,api.generator.originalPkg.name)
  renderFiles(api, options)
}
