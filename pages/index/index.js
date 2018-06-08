//导入请求数据的方法
const fetch = require('../../utils/fetch.js')

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunboImg:[],
    categories:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求轮播图数据
    fetch('slides').then((res)=>{
      this.setData({lunboImg:res.data})
    })

    //九宫格导航请求
    fetch('categories').then((res)=>{
      this.setData({categories:res.data})
    })
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