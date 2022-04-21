// app.js

App({
    globalData:{
        list:[],
        index:-1,//存储癌症检测结果的序列号
        result:""//存储癌症检测结果
    },
   onLaunch() {
    //云开发环境初始化
    wx.cloud.init({
      env:"cancer-dr-4g6jr373fb3798e0",
    })
    wx.request({
        url: '192.168.0.104',
      })
  } ,
 
})

