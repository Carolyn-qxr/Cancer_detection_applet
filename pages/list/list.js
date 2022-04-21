// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text:"疫情期间，请做好个人防护，勤洗手，多消毒,保护好您和家人的健康",
        marqueePace: 1,//滚动速度
        marqueeDistance:0,//初始滚动距离
        marquee_margin:30,
        size:14,
        interval1:30,//顶部文字时间间隔
        interval:6000,//底部轮播图时间间隔
        current:0,//当前所在页面的index
        indicatorDots: true,//是否显示面板指示点
        autoplay:true,//是否自动切换
        duration:800,//滑动动画时长
        circular:true,//是否采用衔接滑动
        imgUrls:[
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/1.webp?sign=9137413445eed8daddab3a74ccdf6700&t=1650374544',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/2.webp?sign=3dc53c33785cff75b97b49ccf0a1c683&t=1650374600',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/3.webp?sign=7b48367163a25b109294cc097221d6f8&t=1650374632',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/4.webp?sign=ffd42a6fc0f71ee9f48883a4fc020a5b&t=1650374661',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/5.webp?sign=f7e8ae1b8920eadeee38803630ec5f43&t=1650374686',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/6.webp?sign=8e0b0335a80c8dd330781afdc2d81be8&t=1650374716',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/7.webp?sign=266312efa78b6e2617efc2f26ce68161&t=1650374744',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/9.webp?sign=03f6f9d0b07c88a80cbbb80d9018608c&t=1650374766',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/10.webp?sign=95734f01a55118c42a092205bb7b0932&t=1650374800'

            

        ],
        HomeIndex:0

    },
    onShow: function () {
        var that = this;
        var length=that.data.text.length*that.data.size;//文字长度；
        var windowWidth=wx.getSystemInfoSync().windowWidth;//屏幕宽度
        that.setData({
            length:length,
            windowWidth:windowWidth
        });
        that.scrolltxt();//第一个字消失后立即从右边出现

    },

    jump: function(){
        wx.navigateTo({
            url: '/pages/cancer_check/cancerCheck',
            success: function(){
                console.log("跳转成功")
            }
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    
    scrolltxt: function () {
        var that = this;
        var length = that.data.length;//滚动文字的宽度
        var windowWidth = that.data.windowWidth;//屏幕宽度
        if (length > windowWidth){
         var interval1 = setInterval(function () {
         var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
         var crentleft = that.data.marqueeDistance;
         if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
            that.setData({
                marqueeDistance: crentleft + that.data.marqueePace
            })
         }
         else {
          //console.log("替换");
            that.setData({
                marqueeDistance: 0 // 直接重新滚动
            });
            clearInterval(interval1);
            that.scrolltxt();
         }
         }, that.data.interval1);
        }
        else{
         that.setData({ marquee_margin:"1000"});//只显示一条不滚动右边间距加大，防止重复显示
        } 
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