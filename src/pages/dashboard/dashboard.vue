<template>
    <div>
        <baidu-map :centerPoint="point">

        </baidu-map>
    </div>
</template>
<style lang="scss">
    #map{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        .BMap_cpyCtrl,.anchorBL{
            display: none;
        }
    }
    .change-center{
        position: absolute;
        top:20px;
        left: 20px;
        z-index: 5;
    }
    .cl{
        position: absolute;
        top:50px;
        left: 200px;
    }
</style>
<script type="text/ecmascript-6">
    import baiduMap from '../../shared/components/baiduMap.vue';
    import re from '../../shared/request/asyncRequest.js';
    export default {
        name:"dashboard",
        data: function () {
            return{
                centerPoint:{
                    c:104.06,
                    p:30.67
                }
            }
        },
        computed:{
            point(){
                return this.centerPoint
            }
        },
        components:{
            baiduMap:baiduMap
        },
        methods:{
            changeCenter(){
                this.centerPoint = {
                    c:102.06,
                    p:26.67
                };
            }
        }
    }
</script>