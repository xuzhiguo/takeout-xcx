Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    locationObj: {
      address: '请选择收货地址'
    },
    addressVerify: false
  },

  /**
   * 获取位置
   */
  getLocaltion() {
    let vm = this;
    wx.chooseLocation({
      success: function(res) {
        if(res.address) {
          vm.setData({
            locationObj: res,
            addressVerify: true
          });
        }
        console.log(res);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 保存收货地址
   */
  saveAddress(e) {
    console.log(e);
    let data = e.detail.value;
    let isPass = this.verifyData(data);
    
    if(isPass) {
      let userAddress = {
        name: data.name,
        phone: data.phone,
        address: this.data.locationObj.address,
        latitude: this.data.locationObj.latitude,
        longitude: this.data.locationObj.longitude
      };

      console.log(userAddress);

      wx.setStorageSync('userAddress', userAddress);
      wx.navigateTo({
        url: '../confirmPay/confirmPay'
      });
    }
  },

  /**
   * 验证数据
   */
  verifyData({name, phone}) {
    console.log(name, phone);

    if (!/^[\u4e00-\u9fa5]+$/g.test(name)) {
      wx.showToast({
        title: '姓名格式错误',
        icon: 'none'
      });
      return false;
    }

    if (!/^1[0-9]{10}$/g.test(phone)) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      });
      return false;
    }

    if (!this.data.addressVerify) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  /**
   * 返回上页
   */
  back() {
    wx.navigateBack();
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