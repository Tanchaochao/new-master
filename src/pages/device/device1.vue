<template>
    <div>
        <div class="view-header">
            设备 > 设备列表
        </div>

    </div>
</template>
<style>
    .divs{
        width: 50px;
        height: 50px;
        background: #f00;
        transform:scaleY(0);
    }
</style>
<script>

    export default {
        name:"device1",
        data: function () {
            return{
                demo:{name:'this is dashboard page',page:'/dashbord'}
            }
        }
    }
</script>