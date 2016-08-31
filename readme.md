# 安装
node>5.x
```
git clone https://github.com/Relsoul/dilidiliNode.git

npm install
```

# 运行
```
node app.js
```

# 访问
```
参考routeList.js文件
```

### 获取新番列表
`/getTab`

### 获取番剧专题页
`/list/anime/caonliqmnxpm/`
其中list/后面的路径为嘀哩嘀哩中对应的专题页
比如`http://dilidili.com/anime/caonliqmnxpm/`
那么专题页路径就是`anime/caonliqmnxpm/`

### 获取番剧视频
- 方式1

    `/video/http://dilidili.com/watch3/44513/`

- 方式2

    `/video/watch3/44513/`

# 说明
此项目爬了[嘀哩嘀哩](http://www.dilidili.com/)的某些数据,如有问题..请不要来查我水表..