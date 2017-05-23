module.exports = {
    url: '/rsms_2.0/user/menus',
    data:{
        resultCode:'0000',
        message:'token已过期!',
        menus:[{
            name:'首页',
            icon:'el-icon-menu',
            drop:[
                {
                    name:'地图',
                    icon:'glyphicon glyphicon-globe',
                    url:'/map'
                },
                {
                    name:'echars',
                    icon:'glyphicon glyphicon-stats',
                    url:'/dashboard2'
                },
                {
                    name:'首页3',
                    icon:'glyphicon glyphicon-tasks',
                    url:'/dashboard3'
                }
            ]},
            {
                name:'用户',
                icon:'el-icon-message',
                drop:[
                    {
                        name:'用户列表',
                        icon:'glyphicon glyphicon-menu-hamburger',
                        url:'/user'
                    },
                    {
                        name:'用户2',
                        icon:'glyphicon glyphicon-credit-card',
                        url:'/user2'
                    },
                    {
                        name:'用户3',
                        icon:'glyphicon glyphicon-cd',
                        url:'/user3'
                    }
                ]},
            {
                name:'设备',
                icon:'el-icon-setting',
                drop:[
                    {
                        name:'设备列表',
                        icon:'glyphicon glyphicon-tower',
                        url:'/device'
                    },
                    {
                        name:'添加设备',
                        icon:'glyphicon glyphicon-credit-card',
                        url:'/device1'
                    },
                    {
                        name:'设备3',
                        icon:'glyphicon glyphicon-compressed',
                        url:'/device2'
                    }
                ]}]
    }
};