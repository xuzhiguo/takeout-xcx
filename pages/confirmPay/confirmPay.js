const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressObj: {},
    showAddress: false,
    transCost: 0,
    canTake: true
  },
  /**
   * 跳转到选择地址页面
   */
  goChooseAddress() {
    wx.navigateTo({
      url: '../chooseAddress/chooseAddress'
    })
  },
  /**
   * 获取地址
   */
  getAddress() {
    let vm = this;

    wx.getStorage({
      key: 'userAddress',
      success: function (res) {
        console.log(res.data);
        vm.setData({
          addressObj: res.data,
          showAddress: true
        });

        vm.getDistance(res.data);
      }
    })
  },

  getDistance({latitude, longitude}) {
    let distance = util.getDistance(latitude, longitude, 23.13844, 113.31538);
      let cost;
      let canTake = true;
      switch (distance) {
        case distance < 2000 :
          cost = 0;
          break;
        case distance > 2000 && distance < 5000:
          cost = 10;
          break;
        case distance > 5000:
          cost = 0;
          canTake = false;
          break;
        default:
          cost = 0;
      }
      console.log(cost);

      this.setData({
        transCost: cost,
        canTake: canTake
      });

      console.log(distance);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
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