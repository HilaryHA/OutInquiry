# OutInquiry
>This is about the 2019 new coronavirus pneumonia small program, because of the current political information, the small program official website does not allow individuals to release the official version, so you can preview or upload their own local test experience.     
  这是关于2019新型冠状病毒肺炎的小程序，由于涉及时政信息，小程序官网不允许个人发布正式版，所以可以自己本地预览或上传测试体验。        

****
	
|Author|窩窩头:panda_face:|
|---|---
|E-mail|hilaryha@qq.com

****
## 目录
* [项目环境](#项目环境)
* [版本说明](#版本说明)
* [文件及运行说明](#文件及运行说明)
* [备注说明](#备注说明)
* [项目展示图](#项目展示图)

*****
### 项目环境
-----
1. 项目架构：由 `小程序 + 云开发 + Vant Weapp + Echarts` 等组成，开发小程序所有步骤参考[这里](https://blog.csdn.net/weixin_42512937/article/details/102818614 "微信小程序Demo之电影评分功能")  
  【前端】   使用 微信官方[组件](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html) 和 [`Vant Weapp` UI组件库](https://youzan.github.io/vant-weapp/#/intro)进行页面的展示，图形绘制使用中间件[`Echarts`](https://www.echartsjs.com/examples/zh/index.html#chart-type-map)    
  【后端】   通过云函数调用第三方接口，获取当天所有疫情数据，本项目请求的 `api` 参考[这里](https://www.tianqiapi.com/api?version=epidemic&appid=wx3b328666f611d3d7&appsecret=8YvlPNrz)，注意，开发时使用此 `api` 时，需要修改对应的 `appid` 为自己开发小程序账号下的 `APPID`   

2. 项目说明  
  此项目是关于2019新型冠状病毒肺炎的小程序，具有的主要功能如下：  
  - [ ] 实时疫情页面（ 包含了全国当前所有确诊等数据，并与昨日作对比；当前确诊人数以中国地图，地区渐变色来区分每个省份数据的不同；累计确诊/疑似和累计治愈/死亡的数据，以折线图的形式展示；下方还有具体到各个省份、市区的具体信息，以类似表格的形式展示 ）      
  - [ ] 疫情防护页面（主要提示用户如何保护自己及他人）   


*****
### 版本说明
-----  
1. `request` == 2.88.0  
2. `request-promise` == 4.2.5  
3. `@vant/weapp` == ^1.0.5  
4. `wx-server-sdk` == latest  
5. 微信开发者工具 ==  v1.02.1911180  


*****
### 文件及运行说明
------
1. **主要文件说明**   
    1. `OutInquiry\cloudfunctions\` 目录  
        * 存储了一个云函数   
        * ```javascript
            
            oblist 云函数，通过中间件 `request` 实现请求第三方接口；
            
            注意： 
                需要在此云函数中初始化 `npm init`；
                并且安装对应的中间件，此函数需要安装 `request` 和 `request-promise`;
                执行命令 `npm install --save request` 和 `npm install --save request-promise` 即可；

          ```      

    2. `OutInquiry\miniprogram\app.json` 文件   
        * 全局 json 文件，底部 bar 在此声明  
        * 属性 "enablePullDownRefresh" 表示可以下拉刷新  
        * ```javascript
            
            "backgroundTextStyle": "dark" 表示下拉时，显示刷新的三个点是偏黑色系；
            
            修改在对应页面（此项目在 `home` 页面中执行过）生命周期 `onPullDownRefresh`，重新加载页面:
              /**
              * 页面相关事件处理函数--监听用户下拉动作
              */
              onPullDownRefresh: function () {
                this.onLoad() // 重新加载
              }
            
            修改在对应页面生命周期 `onLoad`，关闭刷新效果:
            /**
            * 生命周期函数--监听页面加载
            */
            onLoad: function (options) {
              wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
              ...  页面中需要执行的代码  ...
            }


          ```

    3. `OutInquiry\miniprogram\style\guide.wxss` 文件  
        * 全局 wxss 文件，即样式文件   

    4. `OutInquiry\miniprogram\pages` 目录   
        * 存放的两个页面所需的文件
            * `js` 文件处理逻辑业务代码，定义变量、生命周期函数、自定义函数等， 对应 js文件
            * `json` 按需引入对应的 `Vant Weapp` UI组件模块、定义该页面标题、样式等
            * `wxml` 处理 DOM 元素的布局， 对应 html文件
            * `wxss` 处理元素的样式， 对应 css 文件    
    
    5. `OutInquiry\.gitignore` 文件  
        * 使用 `git` 命令提交时，定义需要忽略的文件、目录等  
        * 可以添加自定义需要忽略的文件或目录  
    
    6. `OutInquiry\ec-canvas` 目录  
        * 使用中间件 `Echarts` 需要的目录  
        * 在需要的页面 `.json` 文件中引入，具体可参考[这里](https://blog.csdn.net/weixin_42512937/article/details/104318195,"微信小程序+Echarts实现中国地图")  
        * ```javascript
            {
              "usingComponents": {
                "ec-canvas": "../../ec-canvas/ec-canvas"
              }
            }
          ```
   


2. **运行说明**
    1. 微信开发者工具打开即可运行
        *  需要`npm install`的目录有：
            *  `OutInquiry\cloudfunctions\oblist`;
            *   `OutInquiry\miniprogram`


    2. 一般开发者工具顶部菜单选项为： 小程序模式、普通编译   
        * 点击普通编译，可自定义当前编译的页面，即每次修改代码，刷新页面时，保持当前页面    

    3. 当接口不能使用时，可以使用本地测试数据查看效果      
        * 打开注释 `87-101`行 ,注释 `109-138` 行即可


*****
### 备注说明
-----
1. **微信小程序使用 `Echarts` 的方法**  
    1. 参考[这里](https://blog.csdn.net/weixin_42512937/article/details/104318195, "微信小程序+Echarts实现中国地图")  

2. **`ECharts` 地图实现文字居中的方法**  
    1. 参考[这里](https://blog.csdn.net/weixin_42512937/article/details/104325959, "ECharts 地图实现文字居中，即省份在对应地图的中心位置")    

3. **`Echarts` 地图隐藏右下角 “南海诸岛” 的方法**  
    1. 参考[这里](https://blog.csdn.net/weixin_42512937/article/details/104342040)   

4. **`Echarts` 设置 `visualMap.inRange` 后，解决地图颜色显示不全的问题**  
    1. 参考[这里](https://blog.csdn.net/weixin_42512937/article/details/104390901)    

5. **引入 `Vant Weapp` 组件 `Toast` 轻提示，区别于一般组件**
    1. 需要在 `app.json` 或页面下的 .json 文件中引入  
       * ```javascript
            
            {
            "usingComponents": {
              "van-toast": "@vant/weapp/toast"
            }

          }
         ```   
   
    2. 对应页面下的 .wxml 文件中定义以下占位符      
       * ```javascript
            
            <!-- 错误提示框，此占位符必须存在 -->
            <van-toast id="van-toast" />

          }
         ```  
   
    3. 对应页面下的 .js 文件中，再次引入 `Toast` 对象，才能使用       
       * ```javascript
            
            import Toast from '@vant/weapp/toast/toast';
            ...
            Toast.fail({
              message: '请求错误啦', // 提示内容
              duration: 3500 // 展示时长(ms)
            });
            ...

          }
         ```  


6. **云开发的快速启动指引，其中如何上手使用云开发的三大基础能力如下**  
    1. 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
    
    2. 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

    3. 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

7. **参考文档**  
    1. [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

    2. [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

    3. [微信社区交流](https://developers.weixin.qq.com/community/develop/mixflow) （有问题时可以在此网站搜索一哈） 

    4. [小程序账号登录](https://mp.weixin.qq.com/)  

    5. [VantWeapp组件库官网](https://youzan.github.io/vant-weapp/#/intro)  

    6. [Echarts官网](https://www.echartsjs.com/zh/index.html)


*****
### 项目展示图
-----

|展示图|
|---
|![image](https://github.com/HilaryHA/OutInquiry/blob/master/static/1_realTimeOutbreaks.gif)
|![image](https://github.com/HilaryHA/OutInquiry/blob/master/static/2_outbreakProtection.gif)




******

