import * as echarts from '../../ec-canvas/echarts.js';
import geoJson from './mapData.js';
import diagJson from './mock.js';
import Toast from '@vant/weapp/toast/toast';

// 定义全局图像实例名
let chart = null
let chartTwo = null
let myMap = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ec: {
    //   onInit: initChart
    // },
    // ecTwo: {
    //   onInit: initChartTwo
    // },
    ecMap: {
      onInit: initChartMap
    },
    tabIndex: 0, // 折线图标签角标
    myHistory: null, // 获取此时接口返回的history数据
    myList: null,
    myArea: null,
    newData: null,
    activeNames: ['0'], 
    allList: {
      diagnosed: 0,
      suspect: 0,
      death: 0,
      cured: 0,
      date: '2020-02-16 16:09:13'
    },  // 所有疫情数据
    updateMinutes: 0, // 数据更新于几分钟之前
    // indicatorDots: true,    // 是否显示面板指示点
    autoplay: true,        // 自动播放
    duration: 500,          // 滑动动画时长
    // indicatorColor: '#d8d8d8',       // 指示点颜色
    // indicatorActiveColor: '#005dff', // 当前选中的指示点颜色
    circular: true,                  // 是否采用衔接滑动
    easingFunction: 'linear',         // 切换缓动动画类型
    vertical: false,                   // 滑动方向是否为纵向
    current: '0',                     // 当前所在滑块的 index
    lineList:[                        // 折线图
      {
        id: 'mychart-dom-bar',
        canvasId: 'mychart-line',
        ec: {
          onInit: initChart
        }
      },
      {
        id: 'mychart-dom-bar-two',
        canvasId: 'mychart-line-two',
        ec: {
          onInit: initChartTwo
        }
      }
    ]
  },

  /**
   * 改变 swiper 滑块
   */
  swiperChange: function(event) {
    // console.log(event);
    // // this.setData({
    // //   current: event.detail.current
    // // })
  },

  /**
   * 自定义函数--获取所有疫情数据
   */
  getOutList: function () {
    wx.showLoading({
      title: '正加载喔...'
    })
    /**
     * 本地测试折线图
     */
    console.log('diagJson------', diagJson)
    // allList = { ...diagJson.data }
    this.setData({
      allList: diagJson.data
    },() => {
      // 回调函数      
      this.setData({
        updateMinutes: changeMiu(this.data.allList.date) // 更新时间
      })
      // 设置折线图数据
      changeLine(this.data.allList.history)      
      // 设置地图数据
      changeMap(this.data.allList.area)
      wx.hideLoading()
    })
    

  /**
   * 调用云函数
   * name：表示调用云函数名'movielist'
   * data: 表示对应云函数的参数
   */
    // wx.cloud.callFunction({
    //   name: 'oblist'
    // }).then(res => {
    //   if (res.result && (res.result['errcode'] == 0)) {
    //     let data = { ...res.result.data }
    //     this.setData({
    //       allList: data
    //     }, () => {
    //       // 回调函数      
    //       this.setData({
    //         updateMinutes: changeMiu(this.data.allList.date) // 更新时间
    //       })
    //       // 设置折线图数据
    //       changeLine(this.data.allList.history)
    //       // 设置地图数据
    //       changeMap(this.data.allList.area)
    //       wx.hideLoading()
    //     })
    //   } else {
    //     wx.hideLoading()
    //     Toast.fail({
    //       message: res.result.errmsg, // 提示内容
    //       duration: 3500 // 展示时长(ms)
    //     });
    //   }
    //   wx.hideLoading()
    // }).catch(err => {
    //   console.error(err)
    //   wx.hideLoading()
    // })
  },

  /**
   * 显示每个省份确诊数
   */
  collChange: function (event) {
    this.setData({
      activeNames: event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    setTimeout(() => {
      this.getOutList();
    }, 2000)
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
    this.onLoad() // 重新加载
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

/**
 * 修改地图数据，重绘地图
 */
function changeMap(area) {
  let tempMap = []
  area.length && area.forEach(item => {
    let obj = {}
    obj.name = item.provinceName
    obj.value = item.confirmedCount
    tempMap.push(obj)
  })
  myMap.setOption({
    series: [{
      data: tempMap
    }]
  })
}

/**
 * 修改距离此时的时间（分钟）
 */
function changeMiu(date) {
  let tempMinu = 0
  let oldDate = new Date(date);
  let nowDate = new Date();
  tempMinu = Math.round((nowDate.getTime() - oldDate.getTime()) / (1000 * 60))
  return tempMinu
}

/**
 * 修改折线图数据，重绘折线图
 */
function changeLine(history) {
  let tempDa = [...history]
  if (chart !== null) {
    chart.setOption(formatterOption(tempDa, 'confirmedNum', 'suspectedNum'))
  }
  if (chartTwo !== null) {
    chartTwo.setOption(formatterOption(tempDa, 'curesNum', 'deathsNum'))
  }
}

/**
 * 获取最近的日期数组，元素格式为'月-日'
 * [num] Number 表示最近的几天
 */
function getRecentDate(num) {
  num = Number(num);
  let date = new Date();
  let result = [], monDa = '';
  for (let i = 0; i < num; i++) {
    let mon = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    monDa = `${mon}-${day}`;
    result.unshift(monDa);
    date = new Date(date.getTime() - 24 * 60 * 60 * 1000)
  }
  return result;
}

/**
 * 获取num个0作为元素的数组
 * [num] Number
 */
function getZeroArr(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(0);
  }
  return arr;
}

/**
 * 设置失败时折线图的数据
 */
// function errorOption() {
//   let xDa = [], yDa = [], yDa2 = [];
//   xDa = getRecentDate(7);
//   yDa = getZeroArr(7);
//   yDa2 = getZeroArr(7);
//   if (chart != null) {
//     chart.setOption({
//       xAxis: {
//         data: xDa
//       },
//       series: [{
//         data: yDa
//       }, {
//         data: yDa2
//       }]
//     })
//   }
//   if (chartTwo != null) {
//     chartTwo.setOption({
//       xAxis: {
//         data: xDa
//       },
//       series: [{
//         data: yDa
//       }, {
//         data: yDa2
//       }]
//     })
//   }
// }


/**
 * 格式化接口返回的option
 * 默认两条数据线
 * [tempDa] 需要格式化的数据
 * [yName]  第一条线对应的数据名
 * [yName2] 第二条线对应的数据名
 */
function formatterOption(tempDa, yName, yName2) {
  let xDa = [], yDa = [], yDa2 = []
  tempDa.forEach(item => {
    xDa.unshift(item.date)
    yDa.unshift(item[yName])
    yDa2.unshift(item[yName2])
  })
  let newOption = {
    xAxis: {
      data: xDa,
      axisLabel: {
        formatter: function (value, index) {
          let date = new Date(value);
          let texts = [(date.getMonth() + 1), date.getDate()];
          if (index === 0) {
            texts.unshift(date.getFullYear());
          }
          return texts.join('-')
        }
      }
    },
    series: [{
      data: yDa
    }, {
      data: yDa2
    }]
  }
  return newOption
}

/**
 * [numFormat 在数字中加入千分位分隔符，如：234,234]
 * @param {num} [需要转换格式的数字，此处用于格式化提示框组件中 y 轴数据格式]
 * @return {num}
 */
function numFormat(num) {
  let tmp = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(?=(\B\d{3})+$)/g, ',')
  })
  return tmp
}

/**
 * 返回Option数据
 * [objLine] 包含 图形标题 线条标题 线条颜色
 */
function getOption(objLine) {
  let obj = Object.assign({}, objLine)
  let option = {
    title: {
      text: obj.yTitle,
      textStyle: {
        color: '#222',
        fontSize: 14,
        fontWeight: 'bold'
      },
      left: 10
    },
    color: [obj.yColor, obj.yColor2], // 右上角的颜色
    // tooltip: {
    //   trigger: 'axis',
    //   backgroundColor: '#FFF',
    //   padding: 5,
    //   extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
    //   textStyle: {
    //     fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
    //     color: '#005dff',
    //     fontSize: 12,
    //   },
    //   formatter: function (params) {
    //     // 格式化提示框数据，定义提示框样式  
    //     let xTemp = `  ${params[0].name} \n `
    //     let yTemp = `${params[0].seriesName}：${numFormat(params[0].value)}`
    //     if (params.length == 2) {
    //       yTemp += ` \n  ${params[1].seriesName}: ${numFormat(params[1].value)}`;
    //     }
    //     return `${xTemp} ${yTemp}`
    //   }
    // },
    // axisPointer: { // 坐标指示器样式
    //   snap: true,
    //   lineStyle: {
    //     color: '#dadada',
    //     width: 1
    //   },
    //   handle: {
    //     show: true,
    //     color: '#005dff',
    //     size: 30,
    //     margin: 35
    //   }
    // },
    legend: { // 右上角图例
      data: [{
        name: obj.yName, 
        icon: 'roundRect' // 加边角的长方形
      },{
        name: obj.yName2,
        icon: 'roundRect'
      }],
      itemWidth: 12,
      itemHeight: 12,
      right: 20,
      textStyle: {
        fontSize: 8
      },
      itemGap: 6 // 图例每项之间的间隔
    },
    grid: { // 图形距离四周的距离
      left: '16%',
      right: '6%',
      bottom: 30,
      top: 42
    },
    xAxis: {
      type: 'category',
      data: getRecentDate(7),
      axisTick: {
        show: false // 标签刻度
      },
      axisLabel: {
        color: '#999' // 文字颜色
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false // 坐标轴线
      },
      axisLabel: {
        color: '#595757'
      },
      axisPointer: {
        show: false
      }
    },
    series: [{
      name: obj.yName,
      data: getZeroArr(7),
      type: 'line',
      lineStyle: {
        color: obj.yColor,
        width: 3 // 线宽
      },
      symbolSize: 6 // 拐点圆圈大小
    }, {
      name: obj.yName2,
      data: getZeroArr(7),
      type: 'line',
      lineStyle: {
        color: obj.yColor2,
        width: 3 // 线宽
      },
      symbolSize: 6 // 拐点圆圈大小
    }]
  };
  return option;
}

/**
  * 初始化确诊、疑似折线图，参数可不传
  * 若需修改图形数据，直接赋值对应data，使用chart.setOption修改即可，具体参考上方实例
  */
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  let param = {
    yTitle: '全国累计确诊/疑似趋势（人）',
    yName: '累计确诊',
    yName2: '累计疑似',
    yColor: '#e65561',
    yColor2: '#ffd661'
  }
  let option = getOption(param);
  chart.setOption(option);
  return chart;
}

/**
 * 治愈、死亡折线图
 */
function initChartTwo(canvas, width, height) {
  chartTwo = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartTwo);
  let param = {
    yTitle: '全国累计治愈/死亡趋势（人）',
    yName: '累计治愈',
    yName2: '累计死亡',
    yColor: '#65b379',
    yColor2: '#87878b'
  }
  let option = getOption(param);
  chartTwo.setOption(option);
  return chartTwo;
}

/**
 * 生成1000以内的随机数
 */
function randomData() {
  return Math.round(Math.random() * 1000);
}

/**
 * 全国疫情分布地图
 */
function initChartMap(canvas, width, height) {
  myMap = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(myMap);
  echarts.registerMap('china', geoJson); // 绘制中国地图
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: "#FFF",
      padding: [
        10,  // 上
        15,  // 右
        8,   // 下
        15,  // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
      textStyle: {
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff',
        fontSize: 12,
      },
      formatter: `{b} :  {c}确诊`
    },
    visualMap: {
      // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
      type: 'piecewise', // 类型为分段型
      top: "bottom",
      right: 10,
      splitNumber: 6,
      seriesIndex: [0],
      itemWidth: 20, // 每个图元的宽度
      itemGap: 2,    // 每两个图元之间的间隔距离，单位为px
      pieces: [      // 自定义每一段的范围，以及每一段的文字
        { gte: 10000, label: '10000人以上', color: '#035cf5' }, // 不指定 max，表示 max 为无限大（Infinity）。
        { gte: 1000, lte: 9999, label: '1000-9999人', color: '#3375e4' },
        { gte: 500, lte: 999, label: '500-999人', color: '#6797ef' },
        { gte: 100, lte: 499, label: '100-499人', color: '#96b5ef' },
        { gte: 10, lte: 99, label: '10-99人', color: '#bacae8' },
        { lte: 9, label: '1-9人', color: '#d1d4da' }          // 不指定 min，表示 min 为无限大（-Infinity）。
      ],
      // inRange: {
      //   // 渐变颜色，从小到大（会出现显示不完全的情况！！！即出现白块，而且此处并没有设置白色）
      //   color: ['#d1d4da', '#bacae8', '#96b5ef', '#6797ef', '#3375e4', '#035cf5']
      // },
      textStyle: {
        color: '#737373'
      }
    },
    geo: [
      {
        // 地理坐标系组件
        map: "china",
        roam: false,      // 可以缩放和平移
        aspectScale: 0.8, // 比例
        layoutCenter: ["50%", "38%"], // position位置
        layoutSize: 360,              // 地图大小，保证了不超过 360x360 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0, 0, 0, 0.9)",
              fontSize: '8'
            }
          },
          emphasis: { // 高亮时样式
            color: "#333"
          }
        },
        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              // 隐藏地图
              normal: {
                opacity: 0, // 为 0 时不绘制该图形
              }
            },
            label: {
              show: false // 隐藏文字
            }
          }
        ],
        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "rgba(0,0,0,0.2)",
            areaColor: "#005dff"
          },
          emphasis: {
            // 高亮时
            areaColor: "#99CC33",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10,
            borderWidth: 0,
            shadowColor: "rgba(0, 93, 255, 0.2)"
          }
        }
      }
    ],
    series: [
      {
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        roam: false, // 鼠标是否可以缩放
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { name: '北京', value: randomData() },
          { name: '天津', value: randomData() },
          { name: '上海', value: randomData() },
          { name: '重庆', value: randomData() },
          { name: '河北', value: randomData() },
          { name: '河南', value: randomData() },
          { name: '云南', value: randomData() },
          { name: '辽宁', value: randomData() },
          { name: '黑龙江', value: randomData() },
          { name: '湖南', value: randomData() },
          { name: '安徽', value: randomData() },
          { name: '山东', value: randomData() },
          { name: '新疆', value: randomData() },
          { name: '江苏', value: randomData() },
          { name: '浙江', value: randomData() },
          { name: '江西', value: randomData() },
          { name: '湖北', value: randomData() },
          { name: '广西', value: randomData() },
          { name: '甘肃', value: randomData() },
          { name: '山西', value: randomData() },
          { name: '内蒙古', value: randomData() },
          { name: '陕西', value: randomData() },
          { name: '吉林', value: randomData() },
          { name: '福建', value: randomData() },
          { name: '贵州', value: randomData() },
          { name: '广东', value: randomData() },
          { name: '青海', value: randomData() },
          { name: '西藏', value: randomData() },
          { name: '四川', value: randomData() },
          { name: '宁夏', value: randomData() },
          { name: '海南', value: randomData() },
          { name: '台湾', value: randomData() },
          { name: '香港', value: randomData() },
          { name: '澳门', value: randomData() }
        ]
      }]
  };

  myMap.setOption(option);
  return myMap
}