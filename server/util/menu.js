const publicMenu = [
    {
        path: 'index',
        title: '首页',
        name: 'icon-home-filling'
    },
    {
        path: 'usercenter',
        title: '个人中心',
        name: 'icon-user'
    },
    {
        path: 'new',
        title: '新闻管理',
        name: 'icon-work',
        children: [
            {
                path: 'addnew',
                title: '添加新闻',
                child: 'news'
            },
            {
                path: 'newlist',
                title: '新闻列表',
                child: 'news'
            },
            {
                path: 'newedit',
                title: '编辑新闻',
                child: 'news',
                params: 'nid'
            }
        ],
    },
    {
        path: 'product',
        title: "产品管理",
        name: 'icon-folder-close',
        children: [
            {
                path: 'addproduct',
                title: '添加产品',
                child: 'product'
            },
            {
                path: 'productlist',
                title: '产品列表',
                child: 'product'
            },
            {
                path: 'productedit',
                title: '编辑产品',
                child: 'product',
                params: 'pid'
            }
        ]
    }
]

const adminMenu = [
    {
        path: 'user',
        title: '用户管理',
        name: 'icon-icon-test1',
        children: [
            {
                path: 'adduser',
                title: '添加用户',
                child: 'user'
            },
            {
                path: 'userlist',
                title: '用户列表',
                child: 'user'
            },
        ]
    }
]


module.exports = { publicMenu, adminMenu }