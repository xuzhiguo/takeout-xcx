//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopInfo: {},
    bigImageSrc: '',
    isShowBig: false
  },
  //事件处理函数
  onLoad: function() {
    this.init();
  },
  init() {
    // wx.getUserInfo({
    //   success(res) {
    //     console.log(res);
    //   }
    // })
    this.getShopInfo();
  },
  getShopInfo() {
    let _this = this;
    wx.request({
      url: app.globalData.serverTarget + '/GetShopInfo',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res);
        if (res.data) {
          res.data.image = JSON.parse(res.data.image);
          console.log(res.data.dOpen.substring(0, 5))
          _this.setData({
            shopInfo: res.data
          });
          app.globalData.shopInfo = res.data;
        }
      },
      fail(res) {
        wx.showToast({
          title: '服务器有点忙，请退出后重试 ~',
          icon: 'none'
        });
      }
    })
  },
  showBigImg(event) {
    console.log(event);
    var data = this.data;
    console.log(data);
    var index = event.currentTarget.dataset.index;
    this.setData({
      bigImageSrc: data.shopInfo.image[index],
      isShowBig: true
    });
  },
  shopConditionImg() {
    this.setData({
      bigImageSrc: this.data.shopInfo.license,
      isShowBig: true
    });
  },
  hideBigImg() {
    this.setData({
      isShowBig: false
    });
  },
  goOrderMenu() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    });
    // wx.navigateTo({
    //   url: '../orderMenu/orderMenu'
    // });
  },
  goOrderList() {
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  goTakeOut() {
    wx.navigateTo({
      url: '../takeOut/takeOut'
    });
  },
  goPayBill() {
    wx.navigateTo({
      url: '../payBill/payBill'
    });
  }
})
