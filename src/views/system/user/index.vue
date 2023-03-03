<template>
    <!--YongHuGuanLihtmlStart-->

    <div id="defaultId1">
        <div id="idikoqCc" class="app-container ">
            <el-row id="idmKVEpe" :gutter="20">
                <!-- 部门数据 -->
                <el-col id="idrOwVU3" :span="4" :xs="24">
                    <div id="idzJnIbv" class="head-container ">
                        <el-input id="idSXCmiN" v-model="deptName" placeholder="请输入部门名称" clearable prefix-icon="Search">
                        </el-input>
                    </div>
                    <div id="idN22N7U" class="head-container ">
                        <el-tree id="idcgvEWv" :data="deptOptions" :props="{ label: 'deptName', children: 'children' }" :expand-on-click-node="false" :filter-node-method="filterNode" ref="deptTreeRef" highlight-current default-expand-all @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-col>
                <!-- 用户数据 -->
                <el-col id="idsQMujs" :span="20" :xs="24">
                    <el-form id="idt5FhGl" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
                        <el-form-item id="idVcDCzQ" label="用户名称" prop="username">
                            <el-input id="idbGoVdA" v-model="queryParams.username" placeholder="请输入用户名称" clearable @keyup.enter="handleQuery">
                            </el-input>
                        </el-form-item>
                        <el-form-item id="idUVA8zv" label="手机号码" prop="phonenumber">
                            <el-input id="idUn8fd5" v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable @keyup.enter="handleQuery">
                            </el-input>
                        </el-form-item>
                        <el-form-item id="idZ28JLh" label="状态" prop="status">
                            <el-select id="idKQQFgD" v-model="queryParams.status" placeholder="用户状态" clearable>
                                <el-option id="idJUWvaT" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item id="idoXbNBT" label="创建时间">
                            <el-date-picker id="idg1J8Hx" v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item id="idrvNGqN">
                            <el-button id="idlTK4xI" @click="handleQuery" type="primary" icon="Search">
                                搜索

                            </el-button>
                            <el-button id="idEKKCvx" @click="resetQuery" icon="Refresh">
                                重置

                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-row id="idESVCpR" class="mb8 " :gutter="10">
                        <el-col id="idQxh8nv" :span="1.5">
                            <el-button id="idIBsEvf" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:user:add']">
                                新增

                            </el-button>
                        </el-col>
                        <el-col id="idPDXtUC" :span="1.5">
                            <el-button id="idNgQv2C" @click="handleUpdate" type="success" plain icon="Edit" :disabled="single" v-hasPermi="['system:user:edit']">
                                修改

                            </el-button>
                        </el-col>
                        <el-col id="idossIEI" :span="1.5">
                            <el-button id="id85P32P" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:user:remove']">
                                删除

                            </el-button>
                        </el-col>
                        <el-col id="idxZz7L6" v-show="false" :span="1.5">
                            <el-button id="idWb7nFq" @click="handleImport" type="info" plain icon="Upload" v-hasPermi="['system:user:import']">
                                导入

                            </el-button>
                        </el-col>
                        <el-col id="idHRqxX3" v-show="false" :span="1.5">
                            <el-button id="idTdrujk" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:user:export']">
                                导出

                            </el-button>
                        </el-col>
                        <right-toolbar id="id8OAIwV" v-model:showsearch="showSearch" @queryTable="getList" :columns="columns">
                        </right-toolbar>
                    </el-row>
                    <el-table id="id36bxms" v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
                        <el-table-column id="idosaOpw" type="selection" width="50" align="center" iddd="zzz">
                        </el-table-column>
                        <el-table-column id="id3kkwgt" label="用户名称" align="center" key="username" prop="username" v-if="columns[1].visible" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column id="idZccwCI" label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column id="idf8nkfg" label="部门" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column id="idSR8Bv4" label="手机号码" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120">
                        </el-table-column>
                        <el-table-column id="id2H6ISK" label="状态" align="center" key="status" v-if="columns[5].visible">
                            <template id="idd4JvTE" #default="scope">
                                <el-switch id="idrvEgtO" v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column id="idTUv2v9" label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
                            <template id="idznqNVE" #default="scope">
                                <span id="idXaW6V1">
                                    {{ parseTime(scope.row.createTime) }}

                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column id="idpN9sht" label="操作" align="center" width="150" class-name="small-padding fixed-width">
                            <template id="ideZnTXD" #default="scope">
                                <el-tooltip id="idmRMfk1" content="修改" placement="top" v-if="scope.row.userId !== 1">
                                    <el-button id="iduSFVjr" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:user:edit']">
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip id="id2FVsTR" content="删除" placement="top" v-if="scope.row.userId !== 1">
                                    <el-button id="id7rb8dn" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:user:remove']">
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip id="idvUMzaC" content="重置密码" placement="top" v-if="scope.row.userId !== 1">
                                    <el-button id="idhKwRux" @click="handleResetPwd(scope.row)" type="text" icon="Key" v-hasPermi="['system:user:resetPwd']">
                                    </el-button>
                                </el-tooltip>
                                <el-tooltip id="id169ahw" content="分配角色" placement="top" v-if="scope.row.userId !== 1">
                                    <el-button id="idsrzg6F" @click="handleAuthRole(scope.row)" v-show="false" type="text" icon="CircleCheck" v-hasPermi="['system:user:edit']">
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination id="idbJqXDi" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
                    </pagination>
                </el-col>
            </el-row>
            <!-- 添加或修改用户配置对话框 -->
            <el-dialog id="idgg288S" v-model="open" :title="title" width="600px" append-to-body>
                <el-form id="idp3BbMi" :model="form" :rules="rules" ref="userRef" label-width="80px">
                    <el-row id="idRZAqq5">
                        <el-col id="idOf4LgC" :span="12">
                            <el-form-item id="id4nf9bE" label="用户昵称" prop="nickName">
                                <el-input id="idrzD2VU" v-model="form.nickName" placeholder="请输入用户昵称" maxlength="30">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idkrJOTE" :span="12">
                            <el-form-item id="idDcpuR3" label="归属部门" prop="deptId">
                                <el-tree-select id="id67FTp3" v-model="form.deptId" :data="deptOptions" :props="{ value: '_id', label: 'deptName', children: 'children' }" value-key="_id" placeholder="请选择归属部门" check-strictly>
                                </el-tree-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row id="idQZobsN">
                        <el-col id="iddUJzeO" :span="12">
                            <el-form-item id="id9QwFWs" label="手机号码" prop="phonenumber">
                                <el-input id="idDofHV9" v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idX7wLap" :span="12">
                            <el-form-item id="id8qctlC" label="邮箱" prop="email">
                                <el-input id="idvFz1wt" v-model="form.email" placeholder="请输入邮箱" maxlength="50">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row id="idZQd6VO">
                        <el-col id="idW2MIbX" :span="12">
                            <el-form-item id="idvIaoXd" v-if="form.userId == undefined" label="用户名称" prop="username">
                                <el-input id="ideEQ6MK" v-model="form.username" placeholder="请输入用户名称" maxlength="30">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idEcWCiB" :span="12">
                            <el-form-item id="idJvJJEG" v-if="form.userId == undefined" label="用户密码" prop="password">
                                <el-input id="idGPHrmn" v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="200" show-password>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row id="idVeUebr">
                        <el-col id="idcf7XlB" :span="12">
                            <el-form-item id="idqvVMHs" label="用户性别">
                                <el-select id="id62DNdn" v-model="form.sex" placeholder="请选择">
                                    <el-option id="idmS4zdM" v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col id="idmD1t18" :span="12">
                            <el-form-item id="idPJv6vs" label="状态">
                                <el-radio-group id="idkCBoXp" v-model="form.status">
                                    <el-radio id="idVF2HtP" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                                        {{ dict.label }}

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row id="idUUe98M">
                        <el-col id="id7rNzl2" :span="12">
                            <el-form-item id="iddVdIxJ" label="岗位">
                                <el-select id="idViWOuL" v-model="form.postIds" multiple placeholder="请选择">
                                    <el-option id="idggCSPM" v-for="item in postOptions" :key="item._id" :label="item.postName" :value="item._id" :disabled="item.status == 1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col id="idrCqe3A" :span="12">
                            <el-form-item id="idrRJe4z" label="角色">
                                <el-select id="id6ldRTw" v-model="form.roleIds" multiple placeholder="请选择">
                                    <el-option id="idaTNeNb" v-for="item in roleOptions" :key="item._id" :label="item.roleName" :value="item._id" :disabled="item.status == 1">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row id="idOvE53c">
                        <el-col id="idD4sAVj" :span="24">
                            <el-form-item id="id9IpNAP" label="备注">
                                <wangeditor id="c7b72e" v-model="form.remark" class="  u5ae3a" ref="wangEditor" :uploadUrl="wangEditorUploadUrl" :showUrl="wangEditorShowUrl" :uploadImgHeaders="wangEditorHeader" width="100%" height="100%">
                                </wangeditor>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template id="id58W4Us" #footer>
                    <div id="idaoVIZn" class="dialog-footer ">
                        <el-button id="idLg22bS" @click="submitForm" type="primary">
                            确 定

                        </el-button>
                        <el-button id="id6v6acM" @click="cancel">
                            取 消

                        </el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 用户导入对话框 -->
            <el-dialog id="idhnsxif" v-model="upload.open" :title="upload.title" width="400px" append-to-body>
                <el-upload id="iddHnLHX" ref="uploadRef" :limit="1" accept=".xlsx, .xls" :headers="upload.headers" :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
                    <el-icon id="idAz6O11" class="el-icon--upload ">
                        <upload-filled id="idcG6oKx">
                        </upload-filled>
                    </el-icon>
                    <div id="idofJVhF" class="el-upload__text ">
                        <em id="idVrQW25">
                            点击上传

                        </em>
                        将文件拖到此处，或

                    </div>
                    <template id="idXsPHeK" #tip>
                        <div id="idO3JDAF" class="el-upload__tip text-center ">
                            <div id="idLF44na" class="el-upload__tip ">
                                <el-checkbox id="idgJrbpI" v-model="upload.updateSupport">
                                </el-checkbox>
                                是否更新已经存在的用户数据

                            </div>
                            <span id="idoVR5Sx">
                                仅允许导入xls、xlsx格式文件。

                            </span>
                            <el-link id="idVBjcxj" @click="importTemplate" type="primary" :underline="false">
                                下载模板

                            </el-link>
                        </div>
                    </template>
                </el-upload>
                <template id="idj4VnkI" #footer>
                    <div id="idBpcPrF" class="dialog-footer ">
                        <el-button id="idVOmicS" @click="submitFileForm" type="primary">
                            确 定

                        </el-button>
                        <el-button id="idsbiGCs" @click="upload.open = false">
                            取 消

                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
    <!--YongHuGuanLihtmlEnd-->

</template>

<script setup name="User">
    import {
        getToken
    } from "@/utils/auth";

    const router = useRouter();
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable,
        sys_user_sex
    } = proxy.useDict("sys_normal_disable", "sys_user_sex");

    import {
        setPassword
    } from '../../../utils/password'














    /*** 用户导入参数 */

    // 列显隐信息





    /** 通过条件过滤节点  */
    const filterNode = (value, data) => {
        if (!value) return true;
        return data.deptName.indexOf(value) !== -1;
    };
    /** 根据名称筛选部门树 */

    /** 查询部门下拉树结构 */
    ;
    /** 查询用户列表 */
    ;
    /** 节点单击事件 */
    ;
    /** 搜索按钮操作 */
    ;
    /** 重置按钮操作 */
    ;
    /** 删除按钮操作 */
    ;
    /** 导出按钮操作 */
    ;
    /** 用户状态修改  */
    ;
    /** 更多操作 */
    ;
    /** 跳转角色分配 */
    ;
    /** 重置密码按钮操作 */
    ;
    /** 选择条数  */
    ;
    /** 导入按钮操作 */
    ;
    /** 下载模板操作 */
    ;
    /**文件上传中处理 */
    const handleFileUploadProgress = (event, file, fileList) => {
        upload.isUploading = true;
    };
    /** 文件上传成功处理 */
    const handleFileSuccess = (response, file, fileList) => {
        upload.open = false;
        upload.isUploading = false;
        proxy.$refs["uploadRef"].handleRemove(file);
        proxy.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", {
            dangerouslyUseHTMLString: true
        });
        getList();
    };
    /** 提交上传文件 */
    ;
    /** 初始化部门数据 */
    ;
    /** 重置操作表单 */
    ;
    /** 取消按钮 */
    ;
    /** 新增按钮操作 */
    ;
    /** 修改按钮操作 */
    ;
    /** 提交按钮 */
    ;



    // interfaceCode
    import wangeditor from '../../../components/wangeditor/index.vue'
    import {
        findWherePost
    } from '../../../api/post.js'
    import {
        findWhereRole
    } from '../../../api/role.js'
    import {
        findWhereUser,
        findOneUser,
        updateUser,
        saveUser,
        removeUser
    } from '../../../api/user.js'
    import {
        findWhereDept
    } from '../../../api/dept.js'

    // insertMethod
    // YongHuGuanLiMethodStart
    // getTreeselect
    function getTreeselect() {

        findWhereDept({
            start: 0, // 分页起始位置
            limit: 1000
        }).then(response => {
            deptOptions.value = proxy.handleTree(response.data.list, "deptId");
            // deptOptions.value = response.data;
        });

    }
    // handleCommand
    function handleCommand(command, row) {

        switch (command) {
            case "handleResetPwd":
                handleResetPwd(row);
                break;
            case "handleAuthRole":
                handleAuthRole(row);
                break;
            default:
                break;
        }

    }
    // initTreeData
    function initTreeData() {

        // 判断部门的数据是否存在，存在不获取，不存在则获取
        if (deptOptions.value === undefined) {
            treeselect().then(response => {
                deptOptions.value = response.data;
            });
        }

    }
    // handleNodeClick
    function handleNodeClick(data) {

        queryParams.value.deptId = data._id;
        handleQuery();

    }
    // handleQuery
    function handleQuery() {

        queryParams.value.pageNum = 1;
        getList();

    }
    // resetQuery
    function resetQuery() {

        dateRange.value = [];
        proxy.resetForm("queryRef");
        handleQuery();

    }
    // reset
    function reset() {

        form.value = {
            userId: undefined,
            deptId: undefined,
            username: undefined,
            nickName: undefined,
            password: undefined,
            phonenumber: undefined,
            email: undefined,
            sex: undefined,
            status: "0",
            remark: undefined,
            postIds: [],
            roleIds: []
        };
        proxy.resetForm("userRef");

    }
    // handleAdd
    async function handleAdd() {
        reset();
        initTreeData();
        if (!roleOptions.value) {
            let data = await findWhereRole({
                start: 0, // 分页起始位置
                limit: 200
            })
            if (data) {
                roleOptions.value = data.data.list
            } else {

            }
        }

        open.value = true;
        title.value = "添加用户";
        form.value.password = initPassword.value;
        return
        getUser().then(async response => {
            // postOptions.value = response.posts;

        });
    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        initTreeData();
        const userId = row._id || ids.value;

        findOneUser({
            _id: userId // 数据唯一id
        }).then(async response => {
            form.value = response.data;
            //postOptions.value = response.posts;
            // roleOptions.value = response.roles;
            //form.value.postIds = response.postIds;


            let roleData = await findWhereRole({
                start: 0, // 分页起始位置
                limit: 2000
            })
            if (data) {
                roleOptions.value = roleData.data.list
                form.value.roleIds = response.data.roleIds;
            } else {

            }


            let postData = await findWherePost({
                start: 0, // 分页起始位置
                limit: 1000, // 分页显示条数

            })
            if (postData) {
                postOptions.value = postData.data.list
                form.value.postIds = response.data.postIds;
            } else {

            }

            open.value = true;
            title.value = "修改用户";
            form.password = "";
        });
    }
    // handleDelete
    function handleDelete(row) {
        const userIds = row._id || ids.value;
        proxy.$modal.confirm('是否确认删除"' + (row.username || '所选') + '"的数据项？').then(function() {

            return removeUser({
                _id: userIds // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // handleImport
    function handleImport() {

        upload.title = "用户导入";
        upload.open = true;

    }
    // handleExport
    function handleExport() {

        proxy.download("system/user/export", {
            ...queryParams.value,
        }, `user_${new Date().getTime()}.xlsx`);

    }
    // getList
    function getList() {

        loading.value = true;
        let params = {
            ...proxy.addDateRange(queryParams.value, dateRange.value)
        }
        params.start = (params.pageNum - 1) * params.pageSize
        params.limit = params.pageSize
        findWhereUser(params).then(res => {
            loading.value = false;
            userList.value = res.data.list;
            total.value = res.data.total;
        });

    }
    // handleSelectionChange
    function handleSelectionChange(selection) {

        ids.value = selection.map(item => item._id);
        single.value = selection.length != 1;
        multiple.value = !selection.length;

    }
    // handleStatusChange
    function handleStatusChange(row) {

        let text = row.status === "0" ? "启用" : "停用";
        proxy.$modal.confirm('确认要"' + text + '""' + row.username + '"用户吗?').then(function() {
            return changeUserStatus(row.userId, row.status);
        }).then(() => {
            proxy.$modal.msgSuccess(text + "成功");
        }).catch(function() {
            row.status = row.status === "0" ? "1" : "0";
        });

    }
    // handleResetPwd
    function handleResetPwd(row) {

        proxy.$prompt('请输入"' + row.username + '"的新密码', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            inputPattern: /^.{5,200}$/,
            inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
        }).then(({
            value
        }) => {


            let params = {
                ...row
            }
            params.password = setPassword(value)
            updateUser(params).then(response => {
                proxy.$modal.msgSuccess("修改成功，新密码是：" + value);
            });
        }).catch(() => {});

    }
    // handleAuthRole
    function handleAuthRole(row) {

        const userId = row.userId;
        router.push("/system/user-auth/role/" + userId);

    }
    // 获取纯文本内容
    async function getWangEditorContent() {
        proxy.$message({
            message: proxy.$refs.wangEditor.getContent(),
            type: 'success'
        });
        return proxy.$refs.wangEditor.getContent()
    }
    // 追加数据
    async function appendWangEditor(str) {
        proxy.$refs.wangEditor.append(str)
    }
    // 清空富文本框内容
    async function clearWangEditor() {
        proxy.$refs.wangEditor.clear()
    }
    // 获取富文本框html代码
    async function getWangEditorHtml() {
        proxy.$message({
            message: proxy.$refs.wangEditor.getHtml(),
            type: 'success'
        });
        return proxy.$refs.wangEditor.getHtml()
    }
    // 设置文本框内容
    async function setWangEditorContent(str) {
        proxy.$refs.wangEditor.setHtml(str)
    }
    // submitForm
    function submitForm() {

        proxy.$refs["userRef"].validate(valid => {
            if (valid) {
                if (form.value._id != undefined) {

                    updateUser(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {


                    saveUser(form.value).then(response => {
                        proxy.$modal.msgSuccess("新增成功");
                        open.value = false;
                        getList();
                    });
                }
            }
        });

    }
    // cancel
    function cancel() {

        open.value = false;
        reset();

    }
    // importTemplate
    function importTemplate() {

        proxy.download("system/user/importTemplate", {}, `user_template_${new Date().getTime()}.xlsx`);

    }
    // submitFileForm
    function submitFileForm() {

        proxy.$refs["uploadRef"].submit();

    }

    // YongHuGuanLiMethodEnd

    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    // insertData
    // YongHuGuanLiDataStart

    // ids
    var ids = ref([])
    // initPassword
    const initPassword = ref(undefined)
    // data
    var data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            username: undefined,
            phonenumber: undefined,
            status: undefined,
            deptId: undefined
        },
        rules: {
            username: [{
                required: true,
                message: "用户名称不能为空",
                trigger: "blur"
            }, {
                min: 2,
                max: 20,
                message: "用户名称长度必须介于 2 和 20 之间",
                trigger: "blur"
            }],
            nickName: [{
                required: true,
                message: "用户昵称不能为空",
                trigger: "blur"
            }],
            password: [{
                required: true,
                message: "用户密码不能为空",
                trigger: "blur"
            }, {
                min: 5,
                max: 200,
                message: "用户密码长度必须介于 5 和 20 之间",
                trigger: "blur"
            }],
            email: [{
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"]
            }],
            phonenumber: [{
                pattern: reg,
                message: "请输入正确的手机号码",
                trigger: "blur"
            }]
        }
    })
    // deptName
    const deptName = ref('')
    // deptOptions
    const deptOptions = ref(undefined)
    // showSearch
    const showSearch = ref(true)
    // dateRange
    var dateRange = ref([])
    // single
    const single = ref(true)
    // multiple
    const multiple = ref(true)
    // columns
    var columns = ref([{
            key: 0,
            label: `用户编号`,
            visible: true
        },
        {
            key: 1,
            label: `用户名称`,
            visible: true
        },
        {
            key: 2,
            label: `用户昵称`,
            visible: true
        },
        {
            key: 3,
            label: `部门`,
            visible: true
        },
        {
            key: 4,
            label: `手机号码`,
            visible: true
        },
        {
            key: 5,
            label: `状态`,
            visible: true
        },
        {
            key: 6,
            label: `创建时间`,
            visible: true
        }
    ])
    // loading
    const loading = ref(true)
    // userList
    var userList = ref([])
    // total
    const total = ref(0)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // postOptions
    var postOptions = ref([])
    // roleOptions
    var roleOptions = ref([])
    // 显示地址
    const wangEditorShowUrl = ref(import.meta.env.VITE_HOST_URL)
    // 上传地址
    const wangEditorUploadUrl = ref(import.meta.env.VITE_HOST_URL + '/upload')
    // 上传图片头部设置
    const wangEditorHeader = ref({
        Authorization: proxy.getToken()
    })
    // upload
    const upload = ref(reactive({
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {
            Authorization: "Bearer " + getToken()
        },
        // 上传的地址
        url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
    }))
    // YongHuGuanLiDataEnd

    const {
        queryParams,
        form,
        rules
    } = toRefs(data);
    watch(deptName, val => {
        proxy.$refs["deptTreeRef"].filter(val);
    });

    // defaultLoad
    // YongHuGuanLiMountedStart
    getTreeselect();
    getList();

    // YongHuGuanLiMountedEnd
</script>
<style>
    .YongHuGuanLicssStart {}

    .u5ae3a {
        width: 800px;
    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .YongHuGuanLicssEnd {}
</style>