# vue-cli-plugin-pumelo-tea
pumelotea的项目创建插件，适用于vue-cli3脚手架。

### 引导
1. 该预设模板会只适用于创建新项目，请勿在已有项目中添加该插件，因为该插件会删除并替换一些文件
2. 确保你的开发环境中已经安装git，该模板会自动创建git版本库，而且该模板在构建的时候会自动把版本信息插入构建结果中

### 使用preset创建项目
```
vue create --preset pumelotea/vue-cli-plugin-pumelo-tea my-app
```

### 不使用preset创建项目
```
vue create my-app //进入手动模式，不需要选择任何配置
vue add pumelo-tea //该插件会替换掉并注入文件
```

### 特性
1. 生产环境自动移除console
2. 构建信息（版本号，git hash等）自动编入构建结果,插入`index.html`
3. 构建后自动打包为zip
4. 预设编译命令`build-prod`,`build-test`
5. 预设docker配置
6. 预设drone配置


### 常见问题

#### 如何扩展自定义构建命令
以下以alpha版本作为例子
在package.json中添加
```
"build-alpha": "vue-cli-service build --mode alpha --dest=dist-alpha"
```
在项目根目录下新建一个
`.env.alpha`,内容如下：  
```
NODE_ENV = 'alpha'
```
还可以编写其他的变量，请查看文档。




### 联系我&关注我

https://www.squirrelzoo.com/archives/1283

### NPM统计结果

https://npm-stat.com/charts.html?package=vue-cli-plugin-pumelo-tea&from=2019-05-01&to=2019-10-31
