// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text:"疫情期间，请做好个人防护，勤洗手，多消毒lalallalalallalallaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        marqueePace: 1,//滚动速度
        marqueeDistance:0,//初始滚动距离
        marquee_margin:30,
        size:14,
        interval_top:30,//顶部文字时间间隔
        interval:6000,//底部轮播图时间间隔
        current:0,//当前所在页面的index
        indicatorDots: true,//是否显示面板指示点
        autoplay:true,//是否自动切换
        duration:800,//滑动动画时长
        circular:true,//是否采用衔接滑动
        imgUrls:[
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/slide-1.webp?sign=615ed5c72d6ccf1b68c558a9b0def39f&t=1649674328',
            'https://6361-cancer-dr-4g6jr373fb3798e0-1310829361.tcb.qcloud.la/slide-2.webp?sign=f60525355a82768437055295e78b39b8&t=1649674397'

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
         var interval = setInterval(function () {
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
            clearInterval(interval_top);
            that.scrolltxt();
         }
         }, that.data.interval_top);
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