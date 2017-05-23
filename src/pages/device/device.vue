<template>
    <div>
        <div class="view-header">
            设备 > 设备列表
        </div>
        <span class="glyphicon glyphicon-list-alt"></span>
        <el-date-picker
                v-model="startTime"
                align="right"
                type="date"
                placeholder="开始日期"
                :picker-options="startPickerOptions"
                :editable="false"
                @change="startTimeChange">
        </el-date-picker>
        <el-date-picker
                v-model="endTime"
                align="right"
                type="date"
                placeholder="结束日期"
                @change = 'endTimeChange'
                :editable="false"
                :picker-options="endPickerOptions">
        </el-date-picker>
    </div>
</template>
<script>

    export default {
        name:"device",
        data: function () {
            return{
                startTime:'',
                endTime:'',
                startPickerOptions:{
                    disabledDate(time){
                        return time.getTime() > Date.now();

                    }
                },
                endPickerOptions:{
                    disabledDate(time){
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods:{
            startTimeChange(){
                var startTime = this.startTime;
                this.endPickerOptions = {
                    disabledDate(time){
                        return startTime?time.getTime() > Date.now() || time.getTime() < startTime.getTime():time.getTime() > Date.now();
                    }
                }
            },
            endTimeChange(){
                var endTime = this.endTime;
                this.startPickerOptions = {
                    disabledDate(time){
                        return endTime?time.getTime() > endTime.getTime():time.getTime() > Date.now();
                    }
                }
            }
        }
    }
</script>