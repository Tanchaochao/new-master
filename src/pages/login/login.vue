<template>
    <div class="login-container">
        <div class="login-header">
           登陆
        </div>
        <div class="user-name">
            <label>
                <div class="input-title">用户名:</div>
                <el-input
                        type="text"
                        v-model="loginName"
                        placeholder="请输入用户名"
                        name="loginName"/>
            </label>
        </div>
        <div class="pass-world">
            <label>
                <div class="input-title">密码:</div>
                <el-input
                        type="text"
                        v-model="passWord"
                        placeholder="请输入密码"
                        name="passWord"/>
            </label>
        </div>
        <div class="login-btn">
            <el-button
                    type="primary"
                    @click="login"

                    :disabled="!loginName || !passWord">登 陆</el-button>
        </div>
    </div>
</template>
<style lang="scss">
    .login-container{
        width: 400px;
        position: absolute;
        top:27%;
        left: 50%;
        margin-left:-200px;
        padding:40px 30px 50px;
        border: 1px solid #999999;
        border-radius: 10px;
        .input-title{
            padding-bottom: 10px;
            font-size: 16px;
        }
        .login-header{
            font-size: 20px;
            text-align: center;
            font-weight: 600;
        }
        .user-name{

        }
        .pass-world{
            margin-top: 20px;
        }
        .login-btn{
            margin-top: 20px;
            button{
                width: 100%;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import storage from '../../shared/services/storageService.js';
    import request from '../../shared/request/asyncRequest.js'
    export default {
        data(){
            return {
                loginName:'',
                passWord:''
            }
        },
        methods:{
            login(){
                request.user.login({
                    loginName:this.loginName,
                    passWord:this.passWord
                }).then(data => {
                    var user = data.data
                    storage.set('user',user)
                    request.user.menu({}).then(data =>{
                        user.menus = data.menus;
                        storage.set('user',user);
                        console.log(this)
                        this.$store.state.menus = data.menus;
                        this.$router.push({ path:'/dashboard'});
                    }).catch(err =>{
                        this.$message({
                            showClose: true,
                            message: err.message || '服务器错误！',
                            type: 'warning'
                        });
                    })
                }).catch( err => {
                    this.$message({
                        showClose: true,
                        message: err.message || '服务器错误！',
                        type: 'warning'
                    });
                })
            }
        }
    }
</script>