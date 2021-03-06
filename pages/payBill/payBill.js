const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payType: [
      {
        icon: 'icon-weixin',
        text: '微信支付'
      }, {
        icon: 'icon-yue',
        text: '余额支付'
      }
    ],
    payIndex: 0,
    canPay: true,
    orderId: '',
    money: ''
  },
  /**
   * 用户方法--选择支付类型
   */
  changePay(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      payIndex: index
    });
  },
  /**
   * 用户方法--检测是否能支付
   */
  isCanPay(e) {
    let val = e.detail.value;
    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

    let result = false;
    if(reg.test(val)) {
      result = true;
    }
    
    this.setData({
      canPay: result
    });
  },

  /**
   * 用户方法--支付
   */
  pay(e) {
    wx.showLoading({
      title: '支付中...'
    });

    let money = e.detail.value.money; 
    console.log(money);
    let orderId = this.data.orderId;
    let data = {
      orderId: orderId,
      status: 1
    }
    if (orderId) {
      wx.request({
        url: app.globalData.serverTarget + '/SetOrder',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: 'data=' + JSON.stringify(data),
        success(res) {
          wx.hideLoading();
          if(res.data == 200) {
            wx.navigateTo({
              url: '../msg/success',
            })
          } else {
            wx.showToast({
              title: '服务器有点忙，请稍后重试 ~',
              icon: 'none'
            });
          }
        },
        fail() {
          wx.hideLoading();
          wx.showToast({
            title: '服务器有点忙，请稍后重试 ~',
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
      orderId: options.id,
      money: options.total
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