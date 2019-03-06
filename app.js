//app.js
App({
  onLaunch: function () {
    let _this = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if(res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx43ad467f6347c463&secret=5751941cd529102a06c6fff977841c0c&js_code=' + res.code+'&grant_type=authorization_code',
            success(res) {
              console.log(res);
              wx.request({
                url: _this.globalData.serverTarget + '/GetUser',
                method: 'post',
                data: 'openId=' + res.data.openid,
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                success(res1) {
                  console.log(res1);
                  if (res1.data == '200') {
                    _this.globalData.userInfo.id = res.data.openid;
                  } else {
                    _this.globalData.userInfo = res1.data[0];
                  }
                }
              })
            }
          });
        }
      }
    });
  },
  updateUserInfo(data) {
    let _this = this;
    _this.globalData.userInfo = Object.assign(_this.globalData.userInfo, data);
    wx.request({
      url: _this.globalData.serverTarget + '/SetUser',
      method: 'post',
      data: 'json=' + JSON.stringify(_this.globalData.userInfo),
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
  },
  globalData: {
    userInfo: {},
    serverTarget: 'http://192.168.43.131:8099/api.asmx',
    shopInfo: {}
  }
})