//index.js
//获取应用实例
const app = getApp()
const order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      {src: '../../imags/swiper/index.jpg',toPath: '../index/index',},
      {src: '../../imags/swiper/about.jpg',toPath: '../about/about',},
      {src: '../../imags/swiper/imags.jpg',toPath: '../imags/imags',},
      {src: '../../imags/swiper/game.jpg',toPath: '../game/game',},
      {src: '../../imags/swiper/shijianzhou.jpg',toPath: '../time/time',},
    ],
    //是否显示画板指示点  
    indicatorDots: true,
    //是否采用衔接滑动  
    circular: true,
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //自动切换的间隔
    interval: 2500,
    //滑动动画时长毫秒  
    duration: 100,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    toView: 'red',
    scrollTop: 100,
    musics:[
      {
        bg: "bg_green",
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000xi6Di2bWYtY.jpg?max_age=2592000',
        name: '好想你',
        author: '朱主爱',
        src: 'https://api.bzqll.com/music/tencent/url?id=002sPvGb1kLrAr&key=579621905',
      },
      {
        bg: "bg_gray",
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002ehQzg1eyV8W.jpg?max_age=2592000',
        name: "It's My Life",
        author: 'Bon Jovi',
        src: 'https://api.bzqll.com/music/tencent/url?id=003kYZy52gTya4&key=579621905',
      },
      {
        bg: "bg_red",
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001V8pbb0WMT1S.jpg?max_age=2592000',
        name: 'Butter-Fly',
        author: '和田光司',
        src: 'https://api.bzqll.com/music/tencent/url?id=002vDYSb1tFzKN&key=579621905',
      },
      {
        bg: "bg_blue",
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000031crrc2uiT7T.jpg?max_age=2592000',
        name: 'Rise(登峰造极境)',
        author: 'Jonas Blue/Jack & Jack',
        src: 'https://api.bzqll.com/music/tencent/url?id=002QOrWQ4SsMB7&key=579621905',
      },
      {
        bg: "bg_yellow",
        poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Kr4LQ3oLypE.jpg?max_age=2592000',
        name: '往事只能回味',
        author: '好妹妹',
        src: 'https://api.bzqll.com/music/tencent/url?id=000wttSW1R6rZA&key=579621905',
      },
      
    ],
    musicPlay:false,
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  //事件处理函数
  goToAbout: function() {
    wx.switchTab({
      url: '../about/about',
    })
  },
  //图片跳转
  goToPath:function(e){
    wx.switchTab({
      url: this.data.imgUrls[e.target.dataset.id].toPath,
    })
  },
  //扫码
  scanCode(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取用户头像
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //播放音频
  funplay: function (e) {
    this.audioCtx = wx.createAudioContext(e.target.id)
    if(this.data.musicPlay == false){
      this.setData({musicPlay:true})
      this.audioCtx.play()
    }else{
      this.setData({ musicPlay: false })
      this.audioCtx.pause()
    }
  },
})
