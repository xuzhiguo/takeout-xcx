const sliderWidth = 120; // 需要设置slider的宽度，用于计算中间位置

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["外卖", "评价"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0,
    menuList: [
      {
        id: 0,
        text: '烧腊套餐',
        count: 0,
        foodList:[
          {
            text: '深井烧鹅饭',
            price: 18,
            count: 0
          }, {
            text: '烧鸭饭',
            price: 14,
            count: 0
          }, {
            text: '烧排骨饭',
            price: 18,
            count: 0
          }, {
            text: '叉烧饭',
            price: 16,
            count: 0
          }, {
            text: '四宝饭',
            price: 27,
            count: 0
          }, {
            text: '三宝饭',
            price: 24,
            count: 0
          }, {
            text: '白切鸡肶饭',
            price: 17,
            count: 0
          }, {
            text: '烧鸭肶饭',
            price: 15,
            count: 0
          }, {
            text: '白切鸡饭',
            price: 18,
            count: 0
          }, {
            text: '豆豉鸡饭',
            price: 15,
            count: 0
          }
        ]
      }, {
        id: 1,
        text: '滋补炖汤',
        count: 0,
        foodList: [
          {
            text: '沙参玉竹炖老鸭',
            price: 13,
            count: 0
          }, {
            text: '鸡骨草炖龙骨',
            price: 12,
            count: 0
          }, {
            text: '菜干炖猪肺',
            price: 10,
            count: 0
          }, {
            text: '雪梨炖猪脤',
            price: 11,
            count: 0
          }, {
            text: '凉瓜炖排骨',
            price: 11,
            count: 0
          }, {
            text: '花旗参炖竹丝鸡',
            price: 15,
            count: 0
          }, {
            text: '茶树菇炖老鸡',
            price: 14,
            count: 0
          }, {
            text: '生熟地炖龙骨',
            price: 13,
            count: 0
          }, {
            text: '黑豆炖猪尾',
            price: 15,
            count: 0
          }, {
            text: '虫草花炖水鸭',
            price: 13,
            count: 0
          }, {
            text: '功夫汤',
            price: 16,
            count: 0
          }, {
            text: '天麻炖猪脑',
            price: 17,
            count: 0
          }
        ]
      }, {
        id: 2,
        text: '烧味系列',
        count: 0,
        foodList: [
          {
            text: '豉油皇鸡（半只）',
            price: 36,
            count: 0
          }, {
            text: '客家盐鸡（半只）',
            price: 36,
            count: 0
          }, {
            text: '白切鸡（半只）',
            price: 36,
            count: 0
          }, {
            text: '蜜汁烧排骨（斤）',
            price: 45,
            count: 0
          }, {
            text: '蜜汁叉烧（斤）',
            price: 40,
            count: 0
          }, {
            text: '脆皮烧鸭（斤）',
            price: 22,
            count: 0
          }, {
            text: '化皮烧肉（斤）',
            price: 38,
            count: 0
          }
        ]
      }, {
        id: 3,
        text: '粥粉面饭',
        count: 0,
        foodList: [
          {
            text: '切鸡汤粉(河粉)',
            price: 11,
            count: 0
          }, {
            text: '切鸡汤粉(米粉)',
            price: 11,
            count: 0
          }, {
            text: '三丝炒面',
            price: 13,
            count: 0
          }, {
            text: '咸鱼鸡粒炒饭',
            price: 13,
            count: 0
          }, {
            text: '扬州炒饭',
            price: 13,
            count: 0
          }, {
            text: '三丝炒米粉',
            price: 13,
            count: 0
          }, {
            text: '干炒牛河',
            price: 13,
            count: 0
          }, {
            text: '芥菜牛肉粥',
            price: 9,
            count: 0
          }, {
            text: '皮蛋瘦肉粥',
            price: 9,
            count: 0
          }, {
            text: '明火白粥',
            price: 2,
            count: 0
          }, {
            text: '烧鸭汤粉',
            price: 10,
            count: 0
          }, {
            text: '油鸡汤粉',
            price: 11,
            count: 0
          }, {
            text: '叉烧汤粉',
            price: 11,
            count: 0
          }, {
            text: '三鲜汤粉',
            price: 12,
            count: 0
          }, {
            text: '牛腩汤粉',
            price: 13,
            count: 0
          }, {
            text: '烧鹅汤粉',
            price: 16,
            count: 0
          }
        ]
      }, {
        id: 4,
        text: '加菜类',
        count: 0,
        foodList: [
          {
            text: '米饭',
            price: 2,
            count: 0
          }, {
            text: '客家盐鸡（份）',
            price: 10,
            count: 0
          }, {
            text: '脆皮烧鸭（份）',
            price: 10,
            count: 0
          }, {
            text: '豉油皇鸡（份）',
            price: 10,
            count: 0
          }, {
            text: '白切鸡（份）',
            price: 10,
            count: 0
          }, {
            text: '化皮烧肉（份）',
            price: 10,
            count: 0
          }, {
            text: '蜜汁叉烧（份）',
            price: 10,
            count: 0
          }
        ]
      }, {
        id: 5,
        text: '素食青菜类',
        count: 0,
        foodList: [
          {
            text: '大白菜（份）',
            price: 12,
            count: 0
          }, {
            text: '菜心（份）',
            price: 12,
            count: 0
          }, {
            text: '包菜（份）',
            price: 12,
            count: 0
          }, {
            text: '红薯苗（份）',
            price: 12,
            count: 0
          }, {
            text: '空心菜（份）',
            price: 12,
            count: 0
          }, {
            text: '芥菜（份）',
            price: 12,
            count: 0
          }, {
            text: '生菜（份）',
            price: 12,
            count: 0
          }, {
            text: '油麦菜（份）',
            price: 12,
            count: 0
          }
        ]
      }, {
        id: 6,
        text: '各式饮品',
        count: 0,
        foodList: [
          {
            text: '漓泉啤酒1998',
            price: 8,
            count:0
          }, {
            text: '怡宝',
            price: 5,
            count: 0
          }, {
            text: '果粒奶优',
            price: 5,
            count: 0
          }, {
            text: '雪碧',
            price: 3,
            count: 0
          }, {
            text: '可乐',
            price: 3,
            count: 0
          }
        ]
      }, {
        id: 7,
        text: '新推套餐',
        count: 0,
        foodList: [
          {
            text: '酸菜大肠饭',
            price: 18,
            count: 0
          }, {
            text: '土豆排骨饭',
            price: 18,
            count: 0
          }, {
            text: '五香带鱼饭',
            price: 16,
            count: 0
          }, {
            text: '面豉蒸排骨饭',
            price: 18,
            count: 0
          }
        ]
      }, {
        id: 8,
        text: '中式快餐',
        count: 0,
        foodList: [
          {
            text: '茶树菇牛柳饭',
            price: 18,
            count: 0
          }, {
            text: '凉瓜炒蛋饭',
            price: 13,
            count: 0
          }, {
            text: '榨菜肉丝饭',
            price: 13,
            count: 0
          }, {
            text: '鱼香茄子饭',
            price: 13,
            count: 0
          }, {
            text: '番茄炒蛋饭',
            price: 12,
            count: 0
          }, {
            text: '土豆肉丝饭',
            price: 13,
            count: 0
          }, {
            text: '红烧豆腐饭',
            price: 13,
            count: 0
          }, {
            text: '香干肉丝饭',
            price: 14,
            count: 0
          }, {
            text: '萝卜牛腩饭',
            price: 18,
            count: 0
          }, {
            text: '凉瓜牛肉饭',
            price: 18,
            count: 0
          }, {
            text: '尖椒牛肉饭',
            price: 18,
            count: 0
          }, {
            text: '梅菜扣肉饭',
            price: 18,
            count: 0
          }, {
            text: '红焖排骨饭',
            price: 18,
            count: 0
          }, {
            text: '冬菇焖家鸡饭',
            price: 15,
            count: 0
          }, {
            text: '客家焖猪肉饭',
            price: 17,
            count: 0
          }, {
            text: '红焖排骨饭',
            price: 18,
            count: 0
          }
        ]
      }, {
        id: 9,
        text: '精美小炒',
        count: 0,
        foodList: [
          {
            text: '菜心炒鸡杂',
            price: 22,
            count: 0
          }, {
            text: '麻婆豆腐',
            price: 16,
            count: 0
          }, {
            text: '干煸四季豆',
            price: 18,
            count: 0
          }, {
            text: '菜脯煎蛋',
            price: 18,
            count: 0
          }, {
            text: '番茄炒蛋',
            price: 18,
            count: 0
          }, {
            text: '茶树菇炒牛柳',
            price: 35,
            count: 0
          }, {
            text: '红焖排骨',
            price: 35,
            count: 0
          }, {
            text: '老姜焖鸭',
            price: 30,
            count: 0
          }, {
            text: '客家焖猪肉',
            price: 33,
            count: 0
          }, {
            text: '杂菜粉丝煲',
            price: 18,
            count: 0
          }, {
            text: '鱼香茄子煲',
            price: 22,
            count: 0
          }, {
            text: '萝卜焖牛腩煲',
            price: 36,
            count: 0
          }, {
            text: '凉瓜炒牛肉',
            price: 35,
            count: 0
          }, {
            text: '梅菜扣肉煲',
            price: 33,
            count: 0
          }
        ]
      }, {
        id: 10,
        text: '铁板类',
        count: 0,
        foodList: [
          {
            text: '铁板烧汁鱼头',
            price: 33,
            count: 0
          }, {
            text: '铁板姜葱鱼头',
            price: 33,
            count: 0
          }, {
            text: '铁板日本豆腐',
            price: 22,
            count: 0
          }, {
            text: '铁板烧汁茄子',
            price: 32,
            count: 0
          }, {
            text: '铁板猪杂',
            price: 32,
            count: 0
          }, {
            text: '铁板姜葱牛肉',
            price: 38,
            count: 0
          }
        ]
      }, {
        id: 11,
        text: '川湘类',
        count: 0,
        foodList: [
          {
            text: '野山椒炒牛肉',
            price: 35,
            count: 0
          }, {
            text: '酸辣鸡杂',
            price: 28,
            count: 0
          }, {
            text: '水煮牛肉',
            price: 38,
            count: 0
          }, {
            text: '川味回锅肉',
            price: 25,
            count: 0
          }, {
            text: '农家小炒肉',
            price: 25,
            count: 0
          }
        ]
      }, {
        id: 12,
        text: '汤羹类',
        count: 0,
        foodList: [
          {
            text: '紫菜蛋花汤',
            price: 16,
            count: 0
          }, {
            text: '番茄蛋花羹',
            price: 16,
            count: 0
          }, {
            text: '西湖牛肉羹',
            price: 26,
            count: 0
          }, {
            text: '鸡蓉粟米羹',
            price: 20,
            count: 0
          }, {
            text: '鱼头豆腐汤',
            price: 28,
            count: 0
          }
        ]
      }
    ],
    evaluate:{
      totalPoints: 43,
      totalNum: 10,
      list: [
        {
          username: '不愿意透露姓名的老王',
          score: 5,
          text: '挺好，很满意',
          time: '20180721'
        }, {
          username: '匿名用户',
          score: 4,
          text: '下次还会再来',
          time: '20180720'
        }, {
          username: '村里一枝花',
          score: 5,
          text: '很好吃，速度也快',
          time: '20180719'
        }, {
          username: '剑客567',
          score: 4,
          text: '价钱偏贵，不过味道很正',
          time: '20180718'
        }, {
          username: '老王',
          score: 5,
          text: '挺好，很满意',
          time: '20180718'
        }, {
          username: '不愿意',
          score: 5,
          text: '挺好，很满意',
          time: '20180718'
        }, {
          username: '张仨',
          score: 5,
          text: '你未按时',
          time: '20180718'
        }, {
          username: '你未按时',
          score: 5,
          text: '好评',
          time: '20180718'
        }, {
          username: '匿名用户',
          score: 1,
          text: '吃到蟑螂，不会再来',
          time: '20180716'
        }, {
          username: '不愿意透露姓名的老王',
          score: 4,
          text: '挺好，很满意',
          time: '20180715'
        }
      ]
    },
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
    if ((count >= 99 && type==='add') || (count <=0 && type==='del')) {
      return;
    }

    let price = e.target.dataset.price;
    let index = e.target.dataset.index;
    let data = this.data;
    let currentFoodStr = 'menuList['+data.menuIndex+'].foodList['+index+'].count';
    let currentMenuStr = 'menuList[' + data.menuIndex + '].count';
    let menuCount = data.menuList[data.menuIndex].count;
    console.log(currentFoodStr);
    if(type==='del') {    // 删除
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
        console.log(res.windowWidth / that.data.tabs.length)

        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          sliderWidth: sliderWidth
        });
      }
    });
  },

  /**
   * 用户方法 -- 创建订单
   */
  createBill(e) {
    console.log(this.data.total);
    if (this.data.total == 0) {
      return;
    }
    
    let bill = {
      list: [],
      total: this.data.total
    };
    console.log(this.data);
    
    // 遍历找出选择的菜
    this.data.menuList.forEach((item) => {
      if(item.count > 0) {
        let obj = {
          id: item.id,
          text: item.text
        };

        let list = item.foodList.filter((i) => {
          return i.count > 0;
        });

        obj.list = list;
        bill.list.push(obj);
      }
    });

    console.log(bill);

    // 设置存储
    wx.setStorage({
      key: "bill",
      data: bill,
      success: function() {
        wx.navigateTo({
          url: '../confirmPay/confirmPay'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setSlider();
    let total = 0;
    let l = this.data.evaluate.list.length;
    this.data.evaluate.list.forEach((item) => {
      total += item.score;
    });

    console.log(total,l);
    
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