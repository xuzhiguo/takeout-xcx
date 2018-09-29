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
    canPay: false
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
  pay() {
    wx.showLoading({
      title: '支付中...'
    });

    setTimeout(function () {
      wx.hideLoading();
      wx.navigateTo({
        url: '../msg/success',
      })
    }, 2000);
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