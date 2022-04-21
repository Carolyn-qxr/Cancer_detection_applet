var app = getApp()
const db = wx.cloud.database()
const cancer_list = db.collection('cancer_list')
import * as paddlejs from '@paddlejs/paddlejs-core';
import '@paddlejs/paddlejs-backend-webgl';
const plugin = requirePlugin("paddlejs-plugin");
plugin.register(paddlejs, wx);



export const PaddleJS = new paddlejs.Runner({
  modelPath: 'http://192.168.43.120/',
  feedShape:{
      fc:3,
      fw:224,
      fh:224,

  },
  fill: "#fff",
  fileCount:26,
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
        imageUrl:'',
        canvasWidth:400,
        canvasHeight:375,
        username:'',
        userID:'',
        userTel:'',
        flag: false,//标记是否已上传图片并且信息填写完整
        modalHidden:false,
        index:-1,
        data:'',
        width:'',
        height:'',
        text:'hello',
        result: '',
        success:false,
        homeSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/home.png?sign=ac5d28511e40e6f47a47eae4d19969e2&t=1650432147",
        doctorSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E5%81%A5%E5%BA%B7.png?sign=b9f4e339c6677cf8186df1d46f5e54dc&t=1650432698",
        nameSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E7%94%A8%E6%88%B7.png?sign=002f3b6ad231322620384f332edc3478&t=1650432863",
        IDSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E8%BA%AB%E4%BB%BD%E8%AF%81%20(3).png?sign=2341eee9ecd6e365dd9e9b02585c6a2e&t=1650432895",
        telSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E7%94%B5%E8%AF%9D%20(3).png?sign=2267ea3b13842a46303ca57bcab6a4fd&t=1650432925"

    
    },
    //绑定数据
    addName(event){
        this.setData({
           username:event.detail.value,
        })
    },
    addID(event){
        this.setData({
            userID:event.detail.value,
        })
    },
    addTel(event){
        this.setData({
            userTel:event.detail.value,
        })
    },
   
  
    //上传图片并绑定url
    upload(){
        console.log("已点击")
        let that = this
        //先选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album'],
            success:res => {
              console.log(res)
              this.uploadImg(res.tempFilePaths[0])
              wx.getImageInfo({
                src: res.tempFilePaths[0],
                success: res=> {
                  let {width, height, path} = res;
                  const ctx = wx.createCanvasContext("myCanvas")
                  ctx.drawImage(path, 0, 0, width, height);
                  ctx.draw(false, () => {
                      wx.canvasGetImageData({
                      canvasId: "myCanvas",
                      height: height,
                      width: width,
                      x: 0,
                      y: 0,
                      success: res => {
                        this.data.data = res.data
                        this.data.width = width
                        this.data.height = height
                        this.data.flag = true//标记已上传图片
                        console.log(res.data)
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
    //predict方法
    predict(data,width,height){
        let that  = this
        PaddleJS.predict({
            data:data,
            width:width,
            height:height
          },(res)=>{
             console.log("检测成功");
             const max = Math.max.apply(null, res);
             var temp = res.indexOf(max);
             console.log(temp)
        
             db.collection('cancer_list').where({
                ID:temp
            }).field({
                name:true
            }).get({
                success:function(res){
                    console.log(res.data[0].name)
                    app.globalData.result = res.data[0].name
                    console.log("存储成功",app.globalData.result)
                    wx.navigateTo({
                        url: '/pages/report/report',
                        success: function(){
                            console.log("跳转->报告页面")
                        }
                      })
                },
                
            })
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
    //提交检测
    submit(){
        //身份信息填写正确并且已上传图片
        var namelength = this.data.username.length
        var IDlength = this.data.userID.length
        var tel_length=this.data.userTel.length

        if(namelength<=0 || IDlength<18 ||tel_length<11){
            console.log("error")
            wx.showToast({
                title: '信息填写错误',
                icon:"error",
                duration:6000
              })
        }
        if(this.data.flag==false){
            wx.showToast({
                title: '你还未上传图片',
                icon:"error",
                duration:6000
            })
        }
        if(namelength>0 && IDlength==18 && tel_length==11 && this.data.flag==true){
            wx.showToast({
                title: '检测中',
                icon:"loading",
                duration:8000
            })
            app.globalData.list.push({
                username:this.data.username,
                userID:this.data.userID,
                userTel:this.data.userTel,
                imgUrl:this.data.imageUrl
            })
            this.predict(this.data.data,this.data.width,this.data.height)
   
        } 
    },
    //上传图片到云存储
    uploadImg(imgUrl){
        wx.cloud.uploadFile({
            cloudPath:new Date().getTime+'.png',
            filePath:imgUrl,
            success:res=>{
                console.log("上传成功",res)
                //获取图片的http路径
                this.addImagePath(res.fileID)

            },
            fail:console.error
        })

    },
    //获取图片http地址
    addImagePath(fileId){
        console.log("图片云地址",fileId)
        wx.cloud.getTempFileURL({
            fileList: [fileId],
            success: res=>{
                //console.log("获取url地址:",res.fileList[0].tempFileURL)
                this.setData({
                    imageUrl:res.fileList[0].tempFileURL,
                })
                console.log("图片http地址",this.data.imageUrl)
            },
            fail: console.error
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showToast({
            title: '模型准备中',
            icon:"loading",
            duration:12000
        })
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