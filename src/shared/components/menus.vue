<template id="menu">
    <div class="side-menu-container">
        <!--<el-menu default-active="2"-->
                 <!--mode="vertical"-->
                 <!--class="el-menu-vertical-demo"-->
                 <!--:unique-opened="opened"-->
                 <!--@open="handleOpen"-->
                 <!--@close="handleClose"-->
                 <!--:default-openeds="openeds">-->
            <!--<template v-for="(menu,index) in menus">-->
                <!--<el-submenu  :index="index + 1 +''">-->
                    <!--<template slot="title"><i :class="menu.icon"></i>{{menu.name}}</template>-->
                    <!--<template v-for="(td,itemIndex) in menu.drop">-->
                        <!--<el-menu-item-group>-->
                            <!--<el-menu-item :index="(index+1)+'-'+(itemIndex+1) +''"-->
                                          <!--@click="jumpPage(td.url)"   >{{td.name}}</el-menu-item>-->
                        <!--</el-menu-item-group>-->
                    <!--</template>-->
                <!--</el-submenu>-->
            <!--</template>-->
        <!--</el-menu>-->
        <ul>
            <li v-for="menu in menus">
                <div class="menu-item-title"
                     @click="active(menu)">
                    <i :class="menu.icon"></i>{{menu.name}}
                    <span class="glyphicon"
                          :class="{'glyphicon-menu-down':activeTitle != menu.name,'glyphicon-menu-up':activeTitle == menu.name}"></span>
                </div>
                <transition name="fade">
                    <ul v-if="activeTitle == menu.name">
                        <li v-for="(td,itemIndex) in menu.drop"
                            class="drop-meun-item"
                            :class="{active:activeUrl == td.url}"
                            @click="jumpPage(td.url)">
                            <span :class="td.icon"></span><span >{{td.name}}</span>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>

    </div>
</template>
<script type="text/ecmascript-6">
    import storage from '../services/storageService.js';
    export default {
        name:'menuA',
        data() {
            return {
                activeTitle:'',
                activeUrl:''
            }
        },
        methods:{
            active(menu){
                if(this.activeTitle == menu.name){
                    this.activeTitle = ''
                }else {
                    this.activeTitle = menu.name
                }
            },
            jumpPage (url) {
                this.$router.push({ path:url});
            }
        },
        watch:{
            path(newVal,oldVal){
                if(!this.setPath){
                    return
                }
               this.setPath()
            }
        },
        computed:{
            menus(){
                return this.$store.state.menus
            },
            path(){
                return this.$route.fullPath
            },
            setPath(){
                var path = this.$route.fullPath;
                if(!path){
                    return
                }
                this.menus.forEach((val1,key1)=>{
                    val1.drop.forEach((val2,key2)=>{
                        if(val2.url == path){
                            this.activeTitle = val1.name;
                            this.activeUrl = val2.url
                            return
                        }
                    })
                })
            }
        },
        beforeMount(){
           if(!this.setPath){
               return
           }
            this.setPath()
        }
    }
</script>
<style lang="scss">
    .fade-enter-active,.fade-leave-active {
        transition: all .3s linear;
        transform-origin:center top;
        transform:scale(1,1);
        overflow: hidden;
    }
    .fade-enter,.fade-leave{
        transform-origin:center top;
        transform:scale(1,0);
        overflow: hidden;
    }
    .side-menu-container{
        transition: all 0.2s linear;
        position: absolute;
        top:70px;
        left: 0;
        bottom: 0;
        width: 200px;
        font-size: 17px;
        background: #2D3343;
        .el-menu{
            background: #2D3343;
        }
        .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
            background:#293140;
        }
        .el-submenu .el-menu{
            background: #2D3343;

        }
        .el-menu-item, .el-submenu__title{
            color: #979aa1;
            font-size: 15px;
        }
        .menu-item-title{
            padding-left: 20px;
            color: #fff;
            font-size: 15px;
            line-height: 50px;
            height: 50px;
            cursor: pointer;
            i{
                margin-right: 10px;
            }
            span{
                float: right;
                margin-right: 40px;
                line-height: 50px;
            }
        }
        .drop-meun-item{
            padding-left: 50px;
            color: #fff;
            font-size: 15px;
            line-height: 50px;
            height: 50px;
            cursor: pointer;
            &:hover{
                 background: #0080cc;
             }
             span{
                 margin-right: 10px;
             }
        }
    .active{
        background: #0080cc;
    }
    }
</style>