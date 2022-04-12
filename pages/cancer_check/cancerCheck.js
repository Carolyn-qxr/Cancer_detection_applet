var app = getApp()
// pages/cancer_check/cancerCheck.js
import * as paddlejs from '@paddlejs/paddlejs-core';
import '@paddlejs/paddlejs-backend-webgl';
const plugin = requirePlugin("paddlejs-plugin");
plugin.register(paddlejs, wx);

export const PaddleJS = new paddlejs.Runner({
  modelPath: 'http://127.0.0.1/model.json',
  feedShape:{
      fc:3,
      fw:224,
      fh:224,

  },
  fill: "#fff",
  
  fileCount:1,
  mean: [0.485, 0.456, 0.406],
  std:  [0.229, 0.224, 0.225],
  needPreheat: true,
  webglFeedProcess: true,
  targetSize:{
    width:500,
    height:375
  },
  inputType: 'image'

});
async function loadModel(){
  await this.globalData.PaddleJS.loadModel()
  this.globalData.ready = true
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //存储图片的http路径
        imageSrc:"",
        canvasWidth:500,
        canvasHeight:375,
      

    },
    
    //上传图片并绑定url
    upload(){
        let that = this
        //先选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album'],
            success:res => {
              console.log(res)
              this.setData({
                imageSrc: res.tempFilePaths[0]      
              })
      
              wx.getImageInfo({
                src: res.tempFilePaths[0],
                success: res=> {
      
                 let {width, height, path} = res;
            
                  const ctx = wx.createCanvasContext("myCanvas")
                  console.log("ctx"+ctx)
                  ctx.drawImage(path, 0, 0, width, height);
                  ctx.draw(false, () => {
      
                    wx.canvasGetImageData({
                      canvasId: "myCanvas",
                      height: height,
                      width: width,
                      x: 0,
                      y: 0,
                      success: res => {
                        console.log(res.data)
                        PaddleJS.predict({
                          data:res.data,
                          width:width,
                          height:height
                        },(res)=>{
                           PaddleJS.predict(res).then(res =>{
                           console.log("检测成功");
                           console.log("predict"+res.data)
                           const max = Math.max.apply(null, res);
                           console.log(max)
                           const index = res.indexOf(max);
                           console.log(index)
                        
                                                     

                        })
      
                       
                        })
                      },
                      fail: res => {
                        console.log(res)
                      }
        
                    },)
      
                  })
      
                }
              })
      
            }
          })
      
          
        },

    //返回主界面
    toHome: function(){
        wx.navigateTo({
            url: '/pages/list/list',
            success: function(){
                console.log("跳转成功")
            }
          })
    },
    //上传图片
    uploadImg(imgUrl){
        wx.cloud.uploadFile({
            cloudPath:new Date().getTime+'.png',
            filePath:imgUrl,
            success:res=>{
                //console.log("上传成功",res)
                //获取图片的http路径
                this.addImagePath(res.fileID)

            },
            fail:console.error
        })

    },
    addImagePath(fileId){
        //console.log(fileId)
        wx.cloud.getTempFileURL({
            fileList: [fileId],
            success: res=>{
                //console.log("获取url地址:",res.fileList[0].tempFileURL)
                this.setData({
                    imgUrl:res.fileList[0].tempFileURL,
                })
            },
            fail: console.error
        })
    },
    //进行癌症检测
    submit(){
        console.log("癌症检测函数")
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
      wx.getSystemInfo({
        success: (result) => {
          console.log(result.windowWidth)
          this.setData({
            canvasWidth:result.windowWidth
          })
        },
      })
      PaddleJS.init().then(res=>{
        console.log("准备完成")
      })
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})