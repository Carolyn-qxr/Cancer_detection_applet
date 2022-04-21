// pages/report.js
var app = getApp()
const db = wx.cloud.database()
const cancer_list = db.collection('cancer_list')
let result=""
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: '111',
        index:-1,
        username: '',
        userID:'',
        userTel:'',
        imgUrl:'',
        backSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E8%BF%94%E5%9B%9E%20(1).png?sign=770dc1f5df66064a8f23485a40f28ede&t=1650434880",
        doctorSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E5%81%A5%E5%BA%B7.png?sign=b9f4e339c6677cf8186df1d46f5e54dc&t=1650432698",
        authorSrc:"https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/%E7%BC%96%E8%BE%91.png?sign=7a1493a72b7d8921d508fe647061f7fc&t=1650376376",
    },

    before(){
        wx.navigateBack({
        delta: 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            result:app.globalData.result
        })
        this.setData({
            username:app.globalData.list[0].username
        })
        this.setData({
            userID:app.globalData.list[0].userID    
        })
        this.setData({
            userTel: app.globalData.list[0].userTel
        })
        this.setData({
            imgUrl:app.globalData.list[0].imgUrl
        })
       
       
        
       
        

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})