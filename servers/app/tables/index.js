var shortid = require('shortid')
var tableConfig = {
	dfTable: {
		_id: {
		  type: String,
		  unique: true,
		  default: shortid.generate
		},
		type:String
	}
	// addCode
			// mongoData Start
			, mongoData: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    orderNum: Number, // 排序
    isShow: Boolean, // 是否显示
    type: String, // 分类
    params: Object, // 参数
    name: String, // 名称
    pathDir: String, // 目录
    downNum: Number, // 下载次数
    downUrl: String // 下载地址

}
			// mongoData end
			
			
			
		
			
		
			
		
			
			// system Start
		, system: {
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String,
    createTime: {
        type: Date,
        default: new Date()
    },
    updateTime: {
        type: Date,
        default: new Date()
    },
    status: String, // 状态
    name: String, // 是否初始化
    type: String, // 类型
    content: String, // 要设置的内容
    remark: String // 备注

}
		// system end
			
			// logininfor Start
		, logininfor: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    infoId: String, // 编号
    userName: String, // 用户名
    status: String, // 状态
    ipaddr: String, // 登录ip地址
    loginLocation: String, // 登录地区
    browser: String, // 浏览器内核 
    os: String, // 操作系统
    msg: String, // 消息
    loginTime: { // 登录时间
        type: Date,
        default: new Date()
    }

}
		// logininfor end
			
			// post Start
		, post: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    postId: String, // 岗位id
    postCode: String, // 岗位编码
    postName: String, // 岗位名称
    postSort: Number, // 岗位排序
    status: String, // 状态
    flag: { // flag
        type: Boolean,
        default: false
    }

}
		// post end
			
			// dept Start
		, dept: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    deptId: String, // 部门id
    parentId: String, // 父级id
    ancestors: String, // 
    deptName: String, // 部门名称
    orderNum: Number, // 排序id
    leader: String, // 领导
    phone: String, // 电话
    email: String, // 邮箱
    status: String, // 状态
    delFlag: String, // 
    parentName: String, // 父节点名称
    children: Array // 子节点

}
		// dept end
			
			// role Start
		, role: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    roleId: Number, // 校色id
    roleName: String, // 校色名称
    roleKey: String, // 权限字符
    roleSort: Number, // 排序
    dataScope: String, // 数据
    menuCheckStrictly: { // 
        type: Boolean,
        default: true
    },
    deptCheckStrictly: { // 
        type: Boolean,
        default: true
    },
    status: String, // 状态
    delFlag: String, // 
    flag: Boolean, // 
    menuIds: Array, // 所选菜单id
    deptIds: { // 
        type: Array,
        default: []
    },
    admin: { // 管理员
        type: Boolean,
        default: false
    }

}
		// role end
			
			// dictData Start
		, dictData: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    dictCode: Number, // 编码
    dictSort: Number, // 排序
    dictLabel: String, // 名称
    dictValue: String, // 索引值
    dictType: String, // 类型
    cssClass: String, // 样式
    listClass: String, // 列表样式
    isDefault: String, // 是否默认
    status: String, // 状态
    default: { // 默认
        type: Boolean,
        default: true
    }

}
		// dictData end
			
			// dict Start
		, dict: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    searchValue: String, // 搜索关键字
    dictId: Number, // 字典id
    dictName: String, // 字典名称
    dictType: String, // 字典类型
    status: String // 状态

}
		// dict end
			
			// menu Start
		, menu: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    menuId: String, // 菜单id
    menuName: String, // 菜单名称
    parentName: String, // 父级菜单名称
    parentId: String, // 父级菜单id
    orderNum: Number, // 订单数
    path: String, // 页面地址
    component: String, // 组件
    query: String, // 查询
    isFrame: { // 是否是架构
        type: String,
        default: '1'
    },
    isCache: { // 是否缓存
        type: String,
        default: '0'
    },
    menuType: String, // 菜单类型
    visible: { // 是否显示
        type: String,
        default: '0'
    },
    status: { // 状态
        type: String,
        default: '0'
    },
    perms: String, // 权限标识
    icon: { // 图标
        type: String,
        default: 'system'
    },
    children: { // 子菜单
        type: Array,
        default: []
    }

}
		// menu end
			
			// routers Start
		, routers: {
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String,
    createTime: {
        type: Date,
        default: new Date()
    },
    updateTime: {
        type: Date,
        default: new Date()
    },
    name: String, // 页面名称
    path: String, // 页面地址
    hidden: { // 是否隐藏
        type: Boolean,
        default: false
    },
    redirect: { // 重定向
        type: String,
        default: 'noRedirect'
    },
    component: { // 组件名称
        type: String,
        default: 'Layout'
    },
    alwaysShow: { // 显示回答
        type: Boolean,
        default: true
    },
    meta: { // 其他设置
        type: Object,
        default: {
            "title": "系统管理",
            "icon": "system",
            "noCache": false,
            "link": null
        }
    },
    children: { // 子路由
        type: Array,
        default: []
    }

}
		// routers end
			
			// install Start
		,install:{
        _id: {
          type: String,
          unique: true,
          default: shortid.generate
        },
        userId: String,
        createTime: {
          type: Date,
          default: new Date()
        },
        updateTime: {
          type: Date,
          default: new Date()
        },
          dbName:String, // 数据库名称
          username:String, // 账号
          password:String, // 密码
          host:{ // 连接地址
            type:String,
            default:'localhost'
            },
          port:{ // 端口
            type:String,
            default:'27017'
            },
          jwtCode:String // 校验码
          
        }
		// install end
			
		
	
			// user Start
		, user: {
    _id: { // 系统id
        type: String,
        unique: true,
        default: shortid.generate
    },
    userId: String, //创建人
    createTime: { // 创建时间
        type: Date,
        default: new Date()
    },
    updateTime: { // 更新时间
        type: Date,
        default: new Date()
    },
    searchValue: String, // 关键字搜索
    createBy: String, // 创建人
    updateBy: String, // 更新人
    remark: String, // 备注
    params: Object, // 参数
    deptId: String, // 部门id
    username: String, // 用户名
    nickName: { // 用户显示名称
        type: String,
        default: '匿名用户'
    },
    email: String, // 邮箱
    phonenumber: String, // 电话号码
    sex: String, // 性别
    avatar: String, // 头像
    status: { // 状态
        type: String,
        default: '0'
    },
    delFlag: String, // 
    loginIp: String, // 登录地址
    loginDate: String, // 登录日期
    dept: Object, // 所属部门信息
    roles: Array, // 所有权限信息
    roleIds: Array, // 权限id
    postIds: { // 所属部门id
        type: Array,
        default: []
    },
    roleId: String, // 
    admin: { // admin用户
        type: Boolean,
        default: false
    },
    password: String // 密码

}
		// user end
			
}

module.exports =  tableConfig