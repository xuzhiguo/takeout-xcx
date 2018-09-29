//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shopInfo: [
      {
        title: '南宁店',
        icon: 'icon-home',
        text: ''
      },
      {
        title: '广东省广州市越秀区广州大道北193号',
        icon: 'icon-local',
        text: ''
      },
      {
        title: '电话：',
        icon: 'icon-phone',
        text: '18947892435'
      },
      {
        title: '营业时间：',
        icon: 'icon-clock',
        text: '店内 9:00-21:00； 外卖 9:00-20:00'
      },
    ],
    shopLocation: {
      address: '广东省广州市越秀区广州大道北193号',
      latitude: 23.14031,
      longitude: 113.31428
    },
    shopPhotoList: ['../../image/shop1.jpg', '../../image/shop2.jpg', '../../image/shop3.jpg', '../../image/shop1.jpg', '../../image/shop2.jpg'],
    bigImageSrc: '',
    isShowBig: false
  },
  //事件处理函数
  onLoad: function() {
    wx.setStorage({
      key: "shopLocation",
      data: this.data.shopLocation
    });
  },
  showBigImg: function(event) {
    console.log(event);
    var data = this.data;
    console.log(data);
    var index = event.currentTarget.dataset.index;
    this.setData({
      bigImageSrc: data.shopPhotoList[index],
      isShowBig: true
    });
  },
  shopConditionImg: function() {
    this.setData({
      bigImageSrc: '../../image/shop.jpg',
      isShowBig: true
    });
  },
  hideBigImg: function() {
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
