<template>
    <div>
        <div class="view-header">
            用户 > 用户列表
        </div>
        <div class="search-list">
            <button class="btn-add btn btn-comm"
                    @click="addUser">
                <i class="el-icon-plus"></i> 添 加
            </button>
            <button class="btn-delete btn-comm btn"
                    @click="deleteUser">
                <i class="el-icon-delete"></i> 删 除
            </button>
            <div class="search-right">
                <div class="adderss-c">
                    <address-selector v-model="search.area"></address-selector>
                </div>
                <div class="search-key-world">
                    <input type="text" class="form-control"  v-model="search.keyWord" placeholder="关键字">
                </div>
                <button class="btn-search btn " @click="searchUser"><i class="el-icon-search"></i> 查 询</button>
            </div>
        </div>
        <table-view :rowDatas='transformedRowData'
                    :tableHeader='tableHeaders'
                    :loaded='loaded'
                    :searched='searched'
                    :rowSelection="rowSelection"
                    :pager='pager'
                    @pageIndexChange='pageIndexChange'>

        </table-view>

        <el-dialog :title="modalTitle"
                   v-if="showOperateManifest"
                   size="tiny"
                   v-model="showOperateManifest">
            <vue-form :state="formstate" >
                <form-field-validate :messages="{required:'不能为空',pattern:'6到9位的大写小写数字'}"
                                     :name="'loginName'"
                                     :label="'登录名'">
                    <input v-model="edit.loginName"
                           class="el-input__inner"
                           required
                           name="loginName"
                           pattern="\w{6,9}"/>
                </form-field-validate>

                <form-field-validate :messages="{required:'不能为空',pattern:'1到13位的汉字数字大写小写字母'}"
                                     :name="'userName'"
                                     :label="'用户名'">
                    <input v-model="edit.userName" class="el-input__inner" required name="userName" pattern="[\u4e00-\u9fa5a-zA-Z0-9]{1,13}"/>
                </form-field-validate>

                <form-field-validate :messages="{required:'不能为空',pattern:'1到7位的汉字数字大写小写字母'}"
                                     :name="'xname'"
                                     :label="'姓名'">
                    <input v-model="edit.xname" class="el-input__inner" required name="xname" pattern="[\u4e00-\u9fa5a-zA-Z0-9]{1,7}"/>
                </form-field-validate>

                <form-field-validate :messages="{required:'不能为空',pattern:'11位电话号码'}"
                                     :name="'mobile'"
                                     :label="'电话'">
                    <input v-model="edit.mobile" class="el-input__inner" required name="mobile" pattern="1[34578]\d{9}"/>
                </form-field-validate>

                <form-field-validate :messages="{required:'不能为空',pattern:'3到6位数字'}"
                                     :name="'area'"
                                     :label="'地区'">
                    <address-selector v-model="edit.area" name="area"></address-selector>
                </form-field-validate>

                <form-field-validate :messages="{required:'不能为空'}"
                                     :name="'remarks'"
                                     :label="'备注'">
                    <input v-model="edit.remarks" class="el-input__inner" required name="remarks" />
                </form-field-validate>

            </vue-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showOperateManifest = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import focus from '../../shared/directives/focusDirective.js';
    import addressSelector from '../../shared/components/addressSelector.vue';
    import modal from '../../shared/services/modalservice.js';
    import request from '../../shared/request/asyncRequest';
    import tabelViewServices from '../../shared/services/tableViewService';
    import _ from 'lodash';
    import tableView from '../../shared/components/tableView.vue';
    import formFieldValidate from '../../shared/components/formFieldValidate.vue';
    import formatQueryParams from '../../shared/services/formatQueryParamsService';
    import $ from 'jquery';

    var tableList = {
        登录名: 'loginName',
        用户名: 'userName',
        姓名: 'xname',
        联系方式: 'mobile',
        省份: 'province',
        地市: 'city',
        区县: 'area',
        备注: 'remarks',
        操作: function (item, vue) {
            return {
                controls: [
                    {
                        'text': "编辑用户",
                        'onClick': function () {
                            vue.edit = item
                            vue.showOperateManifest = true;
                            vue.modalTitle = '编辑用户';
                            vue.isAdd = false;
                        }
                    },
                    {
                        'text': "重置密码",
                        'onClick': function () {
                            console.log(item)
                        }
                    }
                ]
            }
        }
    };

    export default {
        name: "user",
        data: function () {
            return {
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
                },
                loaded: false,
                searched: true,
                showOperateManifest:false,
                modalTitle:'添加用户',
                isAdd:false,
                search: {
                    area: {},
                    keyWord: ''
                },
                formstate: {},
                rowSelection: true,
                transformedRowData: '',
                tableHeaders: _.keys(tableList),
                pager: {
                    total: 0,
                    currentPage: 1,
                    sizeChange: 0,
                    itemsPerPage: 10,
                    pageIndex: 10
                },
                edit:{
                    loginName:'',
                    userName:'',
                    xname:'',
                    mobile:'',
                    area:{},
                    remarks:''
                }
            }
        },
        directives: {
            focus: focus
        },
        components: {
            addressSelector: addressSelector,
            tableView: tableView,
            formFieldValidate:formFieldValidate
        },
        methods: {
            deleteUser(){
               var eles = $('.table-view-container tbody input:checked');
               if(eles.length == 0){
                   this.$message({
                       showClose: true,
                       message:'删除列表不能为空',
                       type: 'warning'
                   });
                   return
               }
               var deleteList = [];
               for(let ele of eles){
                   deleteList.push($(ele).val())
               }
                deleteList = deleteList.join(',');
                request.user.deleteUser(deleteList).then(data =>{
                    this.getUsers();
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                }).catch(err =>{
                    this.$message({
                        showClose: true,
                        message:err.message || '服务器错误!请稍后再试...',
                        type: 'error'
                    });
                })
            },
            addUser(){
                this.showOperateManifest = true;
                this.isAdd = true;
                this.modalTitle ='添加用户';
                this.edit = {
                    loginName:'',
                    userName:'',
                    xname:'',
                    mobile:'',
                    area:{},
                    remarks:''
                }
            },

            ok(){
                if(!this.edit.area.area){
                    this.$message({
                        message: '请选择地区',
                        type: 'warning'
                    });
                    return;
                }
                if(this.formstate.$invalid) {
                    this.$message({
                        message: '信息输入错误!请重新输入...',
                        type: 'warning'
                    });
                    return;
                }
                var port = this.isAdd?'addUser':'editUser';
                request.user[port](this.edit).then(data =>{
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.showOperateManifest = false;
                    this.getUsers();
                })
            },

            pageIndexChange(page){
                this.getUsers();
            },

            searchUser(){
                this.pager.currentPage = 1;
                this.getUsers();
            },

            getUsers(){
                var search = formatQueryParams.format(this.search,this.pager.currentPage,this.pager.itemsPerPage);
                this.loaded = false;
                this.searched = true;
                this.transformedRowData = [];
                request.user.getUser({}).then((data) => {
                    this.loaded = true;
                    this.searched = false;
                    this.pager.total = data.total;
                    this.transformedRowData = tabelViewServices.transformToRowData(data.rows, tableList, this);
                }).catch((err) =>{
                    this.loaded = true;
                    this.searched = false;
                    this.$message({
                        showClose: true,
                        message:err.message || '服务器错误!请稍后再试...',
                        type: 'error'
                    });
                })
            }
        },
        mounted(){

            this.getUsers()
        }
    }
</script>
<style type="text/scss">
    .search-key-world{
        float: left;
        margin-right: 10px;
    }
    .search-right{
        float: right;
        &:after{
            content: '';
            display: block;
            clear: both;
         }
    }
    .extranple {
        width: 50px;
        height: 50px;
        background: #ffff4f;
        transition: all 0.4s linear;
    }
    .el-dialog--tiny{
        width: 600px;
    }
    .activeClass {
        width: 200px;
        height: 200px;
        background: #f00;
    }

    .p-content {
        transition: all .5s;
        background: #f00;
        width: 200px;
        height: 200px;
    }

    .f-content {
        width: 200px;
        height: 200px;
    }

    .tans-demo {
        transition: all 0.4s linear;
    }

    .fade-enter-active, .fade-leave {
        width: 200px;
        height: 200px;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
        width: 0px;
        height: 0px;
    }

    .before-class {
        width: 20px;
        height: 20px;
        background: #ff0000;
    }

    .end-class {
        width: 100px;
        height: 100px;
        background: #ff0000;
    }
</style>