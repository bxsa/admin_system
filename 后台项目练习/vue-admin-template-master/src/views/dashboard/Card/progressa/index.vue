<template>
     <div class="charts" ref="progressa">

     </div>
</template>
<script>
import * as echarts  from 'echarts';
export default {
    name:"progressa",
    mounted(){
        let progressa=echarts.init(this.$refs.progressa)
        progressa.setOption({
            xAxis:{
                show:false,
                min:0,
                max:100,
            
            },
            yAxis:{
                show:false,
                type:'category',
            },
            series:[
                {
                    type:'bar',
                    data:[78],
                    color:"green",
                    //设置柱状图的宽度
                    barWidth:10,
                    color:'yellowgreen',
                    //背景颜色设置
                    showBackground:true,
                    backgroundStyle:{
                        color:"#eee",
                    },
                    //文本
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right',

                    }
                }
            ]
        })
    },
}
</script>
<style scoped>
.charts{
    width:100%;
    height:100%;
}
</style>
