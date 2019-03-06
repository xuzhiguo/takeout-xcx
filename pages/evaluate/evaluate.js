const app = getApp();
let submitFlag = 0;

// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    canSubmit: false,
    evaluate: '',
    orderId: ''
  },

  setScore(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      score: index+1
    });
  },

  verify(e) {
    let isPass = false;
    let data = this.data;
    !e.detail.x && this.setData({
      evaluate: e.detail.value
    });

    if(e.detail.value) {
      if (e.detail.value != '' && data.score > 0) {
        isPass = true;
      }
    } else {
      if (data.evaluate != '' && data.score > 0) {
        isPass = true;
      }
    }

    this.setData({
      canSubmit: isPass
    });
  },

  submit() {
    if(submitFlag == 0) {
      submitFlag = 1;
      let data = this.data;
      let params = {
        id: (new Date()).getTime(),
        details: data.evaluate,
        score: data.score,
        customerId: app.globalData.userInfo.id,
        orderId: data.orderId,
        customerName: app.globalData.userInfo.name
      }

      wx.request({
        url: app.globalData.serverTarget + '/SetEvaluate',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: 'evaluateItem=' + JSON.stringify(params),
        success(res) {
          submitFlag = 0;
          wx.hideLoading();
          if (res.data == 200) {
            wx.navigateTo({
              url: '../orderList/orderList',
            });
          } else {
            wx.showToast({
              title: '服务器有点忙，请退出后重试 ~',
              icon: 'none'
            });
          }
        },
        fail() {
          submitFlag = 0;
          wx.hideLoading();
          wx.showToast({
            title: '服务器有点忙，请退出后重试 ~',
            icon: 'none'
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      orderId: options.id
    });
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