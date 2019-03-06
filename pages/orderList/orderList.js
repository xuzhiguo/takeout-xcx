// pages/orderList/orderList.js
const sliderWidth = 80; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "待付款", "待评价"],
    activeIndex: 0, 
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0,
    hideHeader: true,
    refreshTime: '',
    orderList: []
  },

  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  setSlider() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          sliderWidth: sliderWidth
        });
      }
    });
  },

  getOrderList() {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: app.globalData.serverTarget + '/GetOrderList',
      method: 'post',
      // data: 'userId=' + app.globalData.userInfo.id,
      data: 'userId=oSsnw0Dx9I7I1dMbpG-tpbjii4Zc',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        wx.hideLoading();
        console.log(res);
        if(res.data) {
          res.data = res.data.map((item)=>{
            item.detail = item.detail!=''?JSON.parse(item.detail):[];
            return item;
          });
          _this.setData({
            orderList: res.data
          });
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器有点忙，请退出后重试 ~',
          icon: 'none'
        });
      }
    })
  },

  init() {
    this.getOrderList();
    this.setSlider();
  },

  refresh(e) {
    let date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString(),
      hideHeader: false
    })
  },

  goDetail(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.orderList[index];

    console.log(data);
    wx.navigateTo({
      url: '../orderDetail/orderDetail?data=' + JSON.stringify(data)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
    wx.reLaunch({
      url: '../index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();

    setTimeout(function() {
      wx.hideNavigationBarLoading();
    },1000);
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