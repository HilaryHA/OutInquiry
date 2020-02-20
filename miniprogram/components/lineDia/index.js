// components/LineDia/linedia.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 即Page页面引入时，没有设置此属性时，显示的默认数据
    // 使用时,需要在对应 Page 下的 json 文件中引入, 如 
    // "component-tag-name": "../../components/lineDia",
    innerText: {
      type: String,
      value: '测试默认数据'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期
   */
  lifetimes: {
    created: function() {
      // 
      console.log(this)
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // console.log(this)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log(this)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { 
      console.log('----自定义方法-----')
    }
  }
})
