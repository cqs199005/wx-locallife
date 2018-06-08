// pages/list/list.js
//引入工具
const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //代表页面分类
    category:{},
    shops:[],
    page:0,
    pageSize:20,
    isMore:true
  },
  //封装加载更多函数
  getMore(){
    //判断如果已经加载完,就不在加载
    if(!this.data.isMore) return
    //解构赋值
    var {page,pageSize} = this.data;
    var data = {_page:++page,_limit:pageSize}
   return fetch(`categories/${this.data.category.id}/shops`,data)
    .then(res=>{
      const shops = this.data.shops.concat(res.data)
      //判断是否读取完
      //通过res.header可以获取响应头里的数据,有总条数
      var total = res.header['X-Total-Count'];
      var isMore = page*pageSize < total
      this.setData({shops,page,isMore})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //根据获取的参数发起请求,获取分类类型
    fetch(`categories/${options.cat}`).then(res=>{
      this.setData({category:res.data})
      wx.setNavigationBarTitle({title:res.data.name})

      //当请求成功后,再去请求详细信息,并return出去,Pomise特性
      this.getMore();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const name = this.data.category.name
    if (name) {
      wx.setNavigationBarTitle({ title: name })
    }
  },
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //下拉刷新,把数据重置
    this.setData({ shops:[],page:0, isMore:true})
    //调用获取数据方法,由于这方法把Promise对象return 出来了,所以可以直接调用then方法
    this.getMore().then(()=>{
      //调用停止下拉刷新框的API
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})