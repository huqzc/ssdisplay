
$(function () {
    var d =new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var hour =d.getHours();
    var date = year + '' + (month < 10 ? ('0' + '' +month) : month) + '' + (day < 10 ? ('0' + '' +day) : day);
    var num = 0;

    data_callback('province', map)
    data_callback('hour', echarts_3);
    data_callback('ua', echarts_4);
    data_callback('version', echarts_5);
    data_callback('path', echarts_6);
    data_num(num)


    function map(data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));

        var nameColor = " rgb(55, 75, 113)"
        var name_fontFamily = '宋体'
        var name_fontSize = 35
        var mapName = 'china'
        var data_ = []

        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            var value = 0;
            for (let i of data) {
                if (i.name.indexOf(name) >= 0) {
                    value = i.value
                    break
                }
            }
            num += value;
            // 地区经纬度
            // geoCoordMap[name] = v.properties.cp;
            data_.push({
                name: name,
                value: value
            })
        });
        console.log(data_);

        option = {
            tooltip: {
                formatter:function(params,ticket, callback){
                    if (params.value) return params.seriesName+'<br />'+params.name+'：'+params.value;
                    else return params.seriesName+'<br />'+params.name+'：'+ '0';
                }
            },
            visualMap: {
                min: 0,
                max: 6000,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],
                inRange: {
                    // color: ['#7db9b9', '#22e5e8', '#376d94', '#4660c3'] // 蓝绿
                    color: ['#44AFF0', '#E1F71F', '#FF5302'] // 蓝绿
                },
                show:true
            },
            geo: {
                show: true,
                map: mapName,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#44AFF0',
                        borderColor: '#3b3838'
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                }
            },
            series : [
                {
                    name: '数据量',
                    type: 'map',
                    geoIndex: 0,
                    data: data_
                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_3(data) {
        // 24hour
        var value = new Array(hour).fill(0);
        for (let item of data) {
            value[item['name']] = item['value']
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_3'));

        option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                orient: 'vertical',
                data:['简易程序案件数']
            },
            grid: {
                left: '3%',
                right: '3%',
                top:'8%',
                bottom: '5%',
                containLabel: true
            },
            color:['#a4d8cc','#25f3e6'],
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },

            calculable : true,
            xAxis : [
                {
                    type : 'category',

                    axisTick:{show:false},

                    boundaryGap : false,
                    axisLabel: {
                        textStyle:{
                            color: '#ccc',
                            fontSize:'12'
                        },
                        lineStyle:{
                            color:'#2c3459',
                        },
                        interval: {default: 0},
                        rotate:50,
                        formatter : function(params){
                            var newParamsName = "";// 最终拼接成的字符串
                            var paramsNameNumber = params.length;// 实际标签的个数
                            var provideNumber = 4;// 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                var tempStr = "";
                                tempStr=params.substring(0,4);
                                newParamsName = tempStr+"...";// 最终拼成的字符串
                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }

                    },
                    data: ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时'
                        ,'18时','19时','20时','21时','22时','23时']
                }
            ],
            yAxis : {

                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#ccc',
                        fontSize:'12',
                    }
                },
                axisLine: {
                    lineStyle:{
                        color:'rgba(160,160,160,0.3)',
                    }
                },
                splitLine: {
                    lineStyle:{
                        color:'rgba(160,160,160,0.3)',
                    }
                },

            }
            ,
            series : [
                {
                    // name:'简易程序案件数',
                    type:'line',
                    areaStyle: {

                        normal: {type: 'default',
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [{
                                offset: 0,
                                color: '#25f3e6'
                            }, {
                                offset: 1,
                                color: '#0089ff'
                            }], false)
                        }
                    },
                    smooth:true,
                    itemStyle: {
                        normal: {areaStyle: {type: 'default'}}
                    },
                    data: value
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_4(data) {
        // 客户端统计情况
        // var tag = []
        // for (let item of data) {
        //     tag.push(item['name'])
        // }

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_4'));

        option = {

            tooltip : {
                trigger: 'item',
                formatter: "{b}: <br/>  {c} ({d}%)"
            },

            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [

                {
                    name:'排名',
                    type:'pie',
                    color: ['#af89d6', '#f5c847', '#ff999a', '#0089ff','#25f3e6'],
                    radius : [20, 100],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    data: data
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_5(data) {
        // 版本控制
        var color = ['#f845f1', '#ad46f3', '#5045f6', '#4777f5', '#44aff0']
        var tag = []
        for (let item of data) {
            tag.push(item['name'])
            item.itemStyle = {
                normal: {
                    color: color[data.indexOf(item)]
                }
            }
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_5'));

        option = {
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                trigger: 'item',
                formatter: "{b}  <br/>{c}"
            },
            legend: {
                x: 'center',
                y: '2%',
                data: tag,
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                }
            },
            calculable: true,
            series: [{
                name: '车型',
                type: 'pie',
                //起始角度，支持范围[0, 360]
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [41, 110],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['50%', '20%'],
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: data
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
    function echarts_6(data) {
        var name = [];
        var value = [];
        for (let item of data) {
            name.push(item['name'])
            value.push(item['value'])
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts_6'));


        option = {
            // 工具箱
            // toolbox: {
            //   show: true,
            //   feature:{
            //     saveAsImage:{
            //       show:true
            //     }
            //   }
            // },
            tooltip:{
                trigger:'axis',
            },
            // 图例
            legend: {
                orient: 'vertical',
                left: 'left',
                data: name
            },

            // x轴
            xAxis: {
                data: name,
                axisLabel: {
                    textStyle: {
                        color: '#1BACBF'
                    }
                }
            },
            yAxis: {},
            // 数据
            series: [{
                name: '数据量',
                type: 'bar',
                data: value,
                itemStyle: {
                    normal: {
                        color: '#44aff0'
                    }
                }
            }
            ]
        }


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function data_callback(type, func) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${location.origin}/smdisplay/data/${date}/${type}.json`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && this.status === 200) {
                func(JSON.parse(xhr.response))
            }
        }
        xhr.send()
    }
    function data_num(data) {
        var numDiv = document.getElementsByClassName('num')[0]
        var num_list = []
        var html = '';
        while (data > 0) {
            num_list.push(data%10)
            data = Math.floor(data/10)
        }
        for (let i=num_list.length-1;i>-1;i++) {
            if (i % 3 === 0) html += `<span>,</span>`
            html += `<span>${num_list[i]}</span>`
        }
        numDiv.innerHTML = html;
    }
})

