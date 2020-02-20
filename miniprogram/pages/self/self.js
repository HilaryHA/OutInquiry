// miniprogram/pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,    // 是否显示面板指示点
    autoplay: false,        // 自动播放
    duration: 500,          // 滑动动画时长
    indicatorColor: '#d8d8d8',       // 指示点颜色
    indicatorActiveColor: '#005dff', // 当前选中的指示点颜色
    circular: true,                  // 是否采用衔接滑动
    previousNextMargin: '70rpx',     // 前后边距，露出一小部分
    easingFunction: 'linear',         // 切换缓动动画类型
    protectList: [
      {
        cellTitle: '保护自己和他人不生病',
        cellIcon: 'smile-o',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '加强免疫',
        picObj: [
          '/images/protect/protect_1.png',
          '/images/protect/protect_2.png',
          '/images/protect/protect_3.png',
          '/images/protect/protect_4.png',
          '/images/protect/protect_5.png'
        ]
      },
      {
        cellTitle: '确保食品安全',
        cellIcon: 'goods-collect-o',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '健康采购',
        picObj: [
          '/images/safety/safety_1.png',
          '/images/safety/safety_2.png',
          '/images/safety/safety_3.png',
          '/images/safety/safety_4.png',
          '/images/safety/safety_5.png'
        ]
      },
      {
        cellTitle: '旅行时保持健康',
        cellIcon: 'logistics',
        cellVal: '疫情防护',
        cellLable: '图片来源：世界卫生组织官网',
        btnTip: '安全出行',
        picObj: [
          '/images/ingy/ingy_1.png',
          '/images/ingy/ingy_2.png',
          '/images/ingy/ingy_3.png',
          '/images/ingy/ingy_4.png',
          '/images/ingy/ingy_5.png'
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 参考地址 https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
    wx.showLoading({
      title: '正加载喔...'
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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