const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["店内", "评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    menuList: [],
    evaluate: {},
    total: 0,
    menuIndex: 0,
    toView: ''
  },
  /**
   * 用户方法 -- 切换左侧菜单
   */
  changeMenu(e) {
    let index = e.target.dataset.index;
    this.setData({
      menuIndex: index
    });
    this.scrollTop();
  },
  /**
   * 用户方法 -- 切换头部导航
   */
  tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    if (e.currentTarget.id == 1 && !this.data.evaluate.list) {
      this.getEvaluateList();
    }
  },

  /**
   * 用户方法 -- 右边菜单滚动条滚回顶部
   */
  scrollTop() {
    // let titleDom = wx.createSelectorQuery().select('#contantTitle');
    // console.log(titleDom);
    // titleDom.boundingClientRect((rect) => {
    //   console.log(rect);
    // }).exec();

    this.setData({
      toView: 'contantTitle'
    });
  },

  /**
   * 用户方法 -- 计算购物车数量
   */
  countNum(e) {
    let count = e.target.dataset.count;
    let type = e.target.dataset.type;
    if ((count >= 99 && type === 'add') || (count <= 0 && type === 'del')) {
      return;
    }

    let price = e.target.dataset.price;
    let index = e.target.dataset.index;
    let data = this.data;
    let currentFoodStr = 'menuList[' + data.menuIndex + '].foodList[' + index + '].count';
    let currentMenuStr = 'menuList[' + data.menuIndex + '].count';
    let menuCount = data.menuList[data.menuIndex].count;
    console.log(currentFoodStr);
    if (type === 'del') {    // 删除
      count--;
      data.total -= price;
      menuCount--;
    } else {
      count++;
      data.total += price;
      menuCount++;
    }

    this.setData({
      [currentFoodStr]: count,
      [currentMenuStr]: menuCount,
      total: data.total
    });
  },

  /**
   * 用户方法 -- 设置Slider的位移
   */
  setSlider() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  
  /**
   * 获取菜单
   */
  getOrderMenu() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: app.globalData.serverTarget + '/GetFoodMenu',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(success_data) {
        console.log(success_data);
        wx.hideLoading();
        let data = [];
        if (success_data.data && success_data.data.length > 0) {
          data = success_data.data.map((item) => {
            item.count = 0;
            item.foodList = item.foodList.map((item) => {
              item.count = 0;
              return item;
            });
            return item;
          });
        }
        that.setData({
          menuList: data
        });
      },
      fail(fail_data) {
        wx.hideLoading();
        console.log(fail_data);
      }
    });
  },

  getEvaluateList() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: app.globalData.serverTarget + '/GetEvaluate',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (success_data) {
        wx.hideLoading();
        if (success_data.statusCode == 200 && success_data.data) {
          success_data.data.list = JSON.parse(success_data.data.list);
          that.setData({
            evaluate: success_data.data
          });
        }
      },
      fail: function (fail_data) {
        wx.hideLoading();
        wx.showToast({
          title: '服务器有点忙，请退出后重试 ~',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setSlider();
    this.getOrderMenu();

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