const util = require('../../utils/util.js');
const app = getApp();
let submitFlag = 0;

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
    canTake: false
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
    let userInfo = app.globalData.userInfo;
    console.log(userInfo);
    if(userInfo.latitude && userInfo.longitude) {
      this.setData({
        addressObj: userInfo,
        showAddress: true
      });

      this.getDistance(userInfo);
    } 
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
    let shopInfo = app.globalData.shopInfo;
    console.log(latitude, longitude, shopInfo.latitude, shopInfo.longitude);
    let distance = parseInt(util.getDistance(latitude, longitude, shopInfo.latitude, shopInfo.longitude));
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
      console.log(canTake, distance);

      this.setData({
        transCost: cost,
        canTake: canTake
      });
  },

  /**
   * 统计总价
   */
  setTotalPrice() {
    let data = this.data;
    // 总价 = 配送费 + 餐费
    let total = data.transCost + data.goodsCost;

    this.setData({
      totalPrice: total
    });
  },

  /**
   * 提交订单
   */
  submit() {
    if (submitFlag == 0) {
      submitFlag = 1;
      let billList = this.data.billList;
      let userInfo = app.globalData.userInfo;
      let data = {};
      data.orderId = (new Date()).getTime();
      data.userId = userInfo.id;
      data.status = 0;
      data.foodList = [];
      data.total = this.data.totalPrice;
      data.transCost = this.data.transCost;
      data.address = this.data.addressObj.address;
      data.customerName = this.data.addressObj.name;
      data.phone = this.data.addressObj.phone;
      data.type = 0;  // 0为外卖，1为堂食
      console.log(billList);

      for (let i = 0; i < billList.length; i++) {
        for (let j = 0; j < billList[i].list.length; j++) {
          let obj = {
            parentId: billList[i].id,
            parentName: billList[i].name,
            id: billList[i].list[j].id,
            name: billList[i].list[j].name,
            price: billList[i].list[j].price,
            count: billList[i].list[j].count
          }
          data.foodList.push(obj);
        }
      }

      wx.request({
        url: app.globalData.serverTarget + '/SetOrder',
        method: 'post',
        data: 'data=' + JSON.stringify(data),
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success(res) {
          console.log(res);
          submitFlag = 0;
          if (res.data != '' && res.statusCode == 200) {
            wx.navigateTo({
              url: '../payBill/payBill?id=' + res.data + "&total=" + data.total,
            });
          }
        },
        fail(res) {
          submitFlag = 0;
          wx.showToast({
            title: '服务器有点忙，请稍后重试 ~',
            icon: 'none'
          });
        }
      });
    }
  },

  init() {
    this.getAddress();
    this.getBill();
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