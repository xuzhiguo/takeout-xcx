const util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressObj: {},
    showAddress: false,
    billList: [],
    transCost: 0,
    goodsCost: 0,
    totalPrice: 0,
    canTake: true
  },
  /**
   * 跳转到选择地址页面
   */
  goChooseAddress() {
    wx.navigateTo({
      url: '../chooseAddress/chooseAddress'
    });
  },
  /**
   * 获取地址
   */
  getAddress() {
    let vm = this;

    // 获取地址
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
    });
  },

  /**
   * 获取账单
   */
  getBill() {
    let vm = this;
    wx.getStorage({
      key: "bill",
      success: function(res) {
        console.log(res);

        vm.setData({
          billList: res.data.list,
          goodsCost: res.data.total
        });

        // 计算总价
        vm.setTotalPrice();
      }
    });
  },

  /**
   * 获取距离
   */
  getDistance({latitude, longitude}) {
    let distance = parseInt(util.getDistance(latitude, longitude, 23.13844, 113.31538));
      let cost;
      let canTake = true;
      switch (true) {
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
      console.log(canTake);

      this.setData({
        transCost: cost,
        canTake: canTake
      });

      console.log(distance);
  },

  /**
   * 统计总价
   */
  setTotalPrice() {
    let data = this.data;
    // 总价 = 配送费 + 餐费 + 餐盒费(固定 1元)
    let total = data.transCost + data.goodsCost + 1;

    this.setData({
      totalPrice: total
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
    this.getBill();
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