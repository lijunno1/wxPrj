// channel/channel_check/channel_check.js
var meafe = require('../../utils/util_meafe.js');
var sms = require('../../utils/sms.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyData: {},
    node1: '',
    node2: '',
    node3: '',
    hidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var sqlstr = "select a.id,apply_tp,apply_act,apply_user,apply_text,state,isnull(check_user,'领导') check_user,isnull(opt_user,'管理员') opt_user,b.mobile_phone apply_phone from channel_list a left join 广告位登记人员表 b on a.apply_user = b.person_name where a.id =" + options.id;
    meafe.SQLQuery(sqlstr,
      function (obj) {
        _this.setData({
          applyData: obj[0],
          hidden: true,
          node1: '发起申请',
        });
        if (_this.data.applyData.state == 1)
          _this.setData({ node2: '待审核' });
        else if (_this.data.applyData.state == 2)
          _this.setData({ node2: '退回' });
        else
          _this.setData({ node2: '审核通过' });
        if (_this.data.applyData.state == 3)
          _this.setData({ node3: '待审核' });
        else if (_this.data.applyData.state == 4)
          _this.setData({ node3: '退回' });
        else
          _this.setData({ node3: '审核通过' });
      }, function (res) {
        wx.showModal({
          title: "数据请求失败",
          content: "请重新进入本页面",
          showCancel: false,
          success: function (res) {
            wx.navigateBack({ delta: 1 });
          }
        })
      });
  },

  agree: function () {
    var _this = this;
    if (_this.data.applyData.state == 1) {
      var sqlstr = "update channel_list set state=3,check_user='" + app.globalData.ggwUserInfo.person_name + "',check_dt=GetDate() where id=" + _this.data.applyData.id;
      meafe.SQLEdit(sqlstr, function (obj) {
        sms.sendSMS({
          nbr: _this.data.applyData.apply_phone,
          cnt: "你的申请已通过" + app.globalData.ggwUserInfo.person_name + "审批",
          pri: "1",
          from_sys: "小程序",
          create_person: app.globalData.ggwUserInfo.person_name,
        });
        sms.sendSMS({
          nbr: "18006226337",
          cnt: "有一个" + _this.data.applyData.apply_user + "发起的新申请待审批",
          pri: "1",
          from_sys: "小程序",
          create_person: app.globalData.ggwUserInfo.person_name,
        });
        wx.showModal({
          title: "操作完成",
          content: "审核通过",
          showCancel: false,
          success: function (res) {
            wx.navigateBack({ delta: 2 })
          }
        });
      });
    }
    else if (_this.data.applyData.state == 3) {
      var sqlstr = "update channel_list set state=5,opt_user='" + app.globalData.ggwUserInfo.person_name + "',opt_dt=GetDate() where id=" + _this.data.applyData.id;
      meafe.SQLEdit(sqlstr, function (obj) {
        sms.sendSMS({
          nbr: _this.data.applyData.apply_phone,
          cnt: "你的申请已通过管理员审批",
          pri: "1",
          from_sys: "小程序",
          create_person: app.globalData.ggwUserInfo.person_name,
        });
        wx.showModal({
          title: "操作完成",
          content: "审核通过",
          showCancel: false,
          success: function (res) {
            wx.navigateBack({ delta: 2 })
          }
        });
      });
    }
  },

  disagree: function () {
    var _this = this;
    if (_this.data.applyData.state == 1) {
      var sqlstr = "update channel_list set state=2,check_user='" + app.globalData.ggwUserInfo.person_name + "',check_dt=GetDate() where id=" + _this.data.applyData.id;
      meafe.SQLEdit(sqlstr, function (obj) {
        sms.sendSMS({
          nbr: _this.data.applyData.apply_phone,
          cnt: "你的申请被" + app.globalData.ggwUserInfo.person_name + "退回",
          pri: "1",
          from_sys: "小程序",
          create_person: app.globalData.ggwUserInfo.person_name,
        });
        wx.showModal({
          title: "操作完成",
          content: "申请退回",
          showCancel: false,
          success: function (res) {
            wx.navigateBack({ delta: 2 })
          }
        });
      });
    }
    else if (_this.data.applyData.state == 3) {
      var sqlstr = "update channel_list set state=4,opt_user='" + app.globalData.ggwUserInfo.person_name + "',opt_dt=GetDate() where id=" + _this.data.applyData.id;
      meafe.SQLEdit(sqlstr, function (obj) {
        sms.sendSMS({
          nbr: _this.data.applyData.apply_phone,
          cnt: "你的申请被管理员退回",
          pri: "1",
          from_sys: "小程序",
          create_person: app.globalData.ggwUserInfo.person_name,
        });
        wx.showModal({
          title: "操作完成",
          content: "申请退回",
          showCancel: false,
          success: function (res) {
            wx.navigateBack({ delta: 2 })
          }
        });
      });
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})