<template>
    <div id="app" v-bind:class="{'is-login':isLogin}">
        <global-header></global-header>
        <menu-a></menu-a>
        <div class="content-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import menuA from './shared/components/menus.vue';
    import globalHeader from './shared/components/global-header.vue';
    export default {
        name:'app',
        computed:{
            isLogin: function () {
                return this.$store.state.isLogin
            }
        },
        components:{
            menuA:menuA,
            globalHeader:globalHeader
        }
    }
</script>

<style lang="scss">
    .content-view{
        transition: all 0.2s linear;
        position: absolute;
        top:70px;
        left: 200px;
        background: #f0f3f6;
        right: 0;
        bottom: 0;
        overflow: auto;
        padding:10px 20px;
    }
    .is-login{
        .global-header{
            margin-top:-70px;
        }
        .side-menu-container{
            margin-left:-200px;
        }
        .content-view{
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
        }
    }
</style>