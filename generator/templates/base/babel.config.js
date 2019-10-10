const plugins = ["@vue/babel-plugin-transform-vue-jsx"]
// 生产环境移除console
if(process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console")
}
module.exports = {
  plugins: plugins,
  presets: [
    [
      '@vue/app', {
      modules: false,
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ],
      useBuiltIns: 'entry',
    }
    ]
  ]
}
// module.exports = {
//   presets: [
//     [
//       '@vue/app',
//       {
//         polyfills: [
//           'es6.promise',
//           'es6.symbol'
//         ],
//         useBuiltIns: 'entry'
//       }
//     ]
//   ]
// }
