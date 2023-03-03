<template>
    <!--JiaoSeGuanLihtmlStart-->

    <div id="defaultId1">
        <div id="idVUqJns" class="app-container ">
            <el-form id="iduB8JaJ" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true">
                <el-form-item id="idA6A1Xf" label="角色名称" prop="roleName">
                    <el-input id="idvPDPZa" v-model="queryParams.roleName" placeholder="请输入角色名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idFNMxfv" label="权限字符" prop="roleKey">
                    <el-input id="idCuRlo5" v-model="queryParams.roleKey" placeholder="请输入权限字符" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idSrfwZg" label="状态" prop="status">
                    <el-select id="idwBitT3" v-model="queryParams.status" placeholder="角色状态" clearable>
                        <el-option id="iddWP1kV" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="id8amRcz" label="创建时间">
                    <el-date-picker id="idZ4Gke3" v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item id="idjeZKZM">
                    <el-button id="idzr57Wg" @click="handleQuery" type="primary" icon="Search">
                        <span id="idoeUPVm">搜索
                        </span>
                    </el-button>
                    <el-button id="idbVV8e8" @click="resetQuery" icon="Refresh">
                        <span id="idh1dUF8">重置
                        </span>
                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idAXZO3t" class="mb8 " :gutter="10">
                <el-col id="idd1H5BG" :span="1.5">
                    <el-button id="idntNIbW" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:role:add']">
                        <span id="idqgg31u">新增
                        </span>
                    </el-button>
                </el-col>
                <el-col id="idnQniaK" :span="1.5">
                    <el-button id="id8cqzGd" @click="handleUpdate" type="success" plain icon="Edit" :disabled="single" v-hasPermi="['system:role:edit']">
                        <span id="idFZhjwq">修改
                        </span>
                    </el-button>
                </el-col>
                <el-col id="idrj64XF" :span="1.5">
                    <el-button id="iddEJVbx" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:role:remove']">
                        <span id="idIjvn6L">删除
                        </span>
                    </el-button>
                </el-col>
                <el-col id="iduNVCrE" v-show="false" :span="1.5">
                    <el-button id="idZf3wV6" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:role:export']">
                        <span id="idjAVzkT">导出
                        </span>
                    </el-button>
                </el-col>
                <right-toolbar id="id6U4HpD" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <!-- 表格数据 -->
            <el-table id="idSWjBIr" v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
                <el-table-column id="idcNcouF" type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column id="idIHhkVr" label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150">
                </el-table-column>
                <el-table-column id="idomQKRt" label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150">
                </el-table-column>
                <el-table-column id="idJ2XwCW" label="显示顺序" prop="roleSort" width="100">
                </el-table-column>
                <el-table-column id="idvFtfVI" label="状态" align="center" width="100">
                    <template id="idLNSjUR" #default="scope">
                        <el-switch id="ide8IElb" v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column id="idGIhRn3" label="创建时间" align="center" prop="createTime">
                    <template id="idE2voqv" #default="scope">
                        <span id="idwQ26IH">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="idazWlIb" label="操作" align="center" class-name="small-padding fixed-width">
                    <template id="idvIVloK" #default="scope">
                        <el-tooltip id="idzEtGoX" content="修改" placement="top" v-if="scope.row.roleId !== 1">
                            <el-button id="idmEe56p" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:role:edit']">
                            </el-button>
                        </el-tooltip>
                        <el-tooltip id="idKdfEb4" content="删除" placement="top" v-if="scope.row.roleId !== 1">
                            <el-button id="idOVuVJW" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:role:remove']">
                            </el-button>
                        </el-tooltip>
                        <div id="gdf4fa" v-show="false">
                            <el-tooltip id="idFWa2uq" content="分配用户" placement="top" v-if="scope.row.roleId !== 1">
                                <el-button id="idvmCrJa" @click="handleAuthUser(scope.row)" type="text" icon="User" v-hasPermi="['system:role:edit']">
                                </el-button>
                            </el-tooltip>
                            <el-tooltip id="id6Lq4kN" content="数据权限" placement="top" v-if="scope.row.roleId !== 1">
                                <el-button id="id5T38nc" @click="handleDataScope(scope.row)" type="text" icon="CircleCheck" v-hasPermi="['system:role:edit']">
                                </el-button>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination id="id4jisWJ" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
                <!-- 添加或修改角色配置对话框
                     -->
                <!-- 分配角色数据权限对话框
                        -->
            </pagination>
        </div>
        <el-dialog id="idHwSjhI" v-model="open" :title="title" width="500px" append-to-body>
            <el-form id="idvXh1jP" ref="roleRef" :model="form" :rules="rules" label-width="100px">
                <el-form-item id="ido98ih3" label="角色名称" prop="roleName">
                    <el-input id="idALHI4d" v-model="form.roleName" placeholder="请输入角色名称">
                    </el-input>
                </el-form-item>
                <el-form-item id="idsaiMpB" prop="roleKey">
                    <template id="idSdrgoF" #label>
                        <span id="idtfHEZK">
                            <el-tooltip id="idewuHmX" content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                                <el-icon id="idzKanr1">
                                    <question-filled id="idvNr6Up">
                                    </question-filled>
                                </el-icon>
                                <question-filled id="idlrBXld">
                                </question-filled>
                            </el-tooltip>
                            权限字符

                        </span>
                    </template>
                    <el-input id="id41xXDw" v-model="form.roleKey" placeholder="请输入权限字符">
                    </el-input>
                </el-form-item>
                <el-form-item id="idH84vr4" label="角色顺序" prop="roleSort">
                    <el-input-number id="idvvu8Ej" v-model="form.roleSort" controls-position="right" :min="0">
                    </el-input-number>
                </el-form-item>
                <el-form-item id="idHXUu8N" label="状态">
                    <el-radio-group id="idISGavM" v-model="form.status">
                        <el-radio id="idWblOzv" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                            {{ dict.label }}

                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item id="idv9qQBR" label="菜单权限">
                    <el-checkbox id="idnX9VBb" v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">
                        展开/折叠

                    </el-checkbox>
                    <el-checkbox id="idED5KXS" v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">
                        全选/全不选

                    </el-checkbox>
                    <el-checkbox id="id4Vejvl" v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">
                        父子联动

                    </el-checkbox>
                    <el-tree id="id4S247x" class="tree-border " :data="menuOptions" show-checkbox ref="menuRef" node-key="_id" :check-strictly="!form.menuCheckStrictly" empty-text="加载中，请稍候" :props="{ label: 'menuName', children: 'children' }">
                    </el-tree>
                </el-form-item>
                <el-form-item id="idvK1ttU" label="备注">
                    <el-input id="idLn7jXd" v-model="form.remark" type="textarea" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>
            <template id="idM5kb8p" #footer>
                <div id="id67K2vJ" class="dialog-footer ">
                    <el-button id="idFDEQbj" @click="submitForm" type="primary">
                        <span id="idgHOTnL">确 定
                        </span>
                    </el-button>
                    <el-button id="idTpwbPn" @click="cancel">
                        <span id="idSHwoMV">取 消
                        </span>
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog id="idM9i94K" v-model="openDataScope" :title="title" width="500px" append-to-body>
            <el-form id="idSoOvw4" :model="form" label-width="80px">
                <el-form-item id="idugvvIW" label="角色名称">
                    <el-input id="id4e8eRQ" v-model="form.roleName" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item id="idWO3cxl" label="权限字符">
                    <el-input id="id3BNb15" v-model="form.roleKey" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item id="id8dnNbt" label="权限范围">
                    <el-select id="idC6DakE" v-model="form.dataScope" @change="dataScopeSelectChange">
                        <el-option id="idxlLZVK" v-for="item in dataScopeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idnun2Vi" v-show="form.dataScope == 2" label="数据权限">
                    <el-checkbox id="idFgbpx4" v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">
                        <span id="idllQqT1">展开/折叠
                        </span>
                    </el-checkbox>
                    <el-checkbox id="idEshLXQ" v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">
                        <span id="idwzQ85D">全选/全不选
                        </span>
                    </el-checkbox>
                    <el-checkbox id="idOVZMoV" v-model="form.deptCheckStrictly" @change="handleCheckedTreeConnect($event, 'dept')">
                        <span id="idSJfB9S">父子联动
                        </span>
                    </el-checkbox>
                    <el-tree id="idIWqz1N" class="tree-border " :data="deptOptions" show-checkbox default-expand-all ref="deptRef" node-key="id" :check-strictly="!form.deptCheckStrictly" empty-text="加载中，请稍候" :props="{ label: 'label', children: 'children' }">
                    </el-tree>
                </el-form-item>
            </el-form>
            <template id="idUqiMog" #footer>
                <div id="idlRP6RB" class="dialog-footer ">
                    <el-button id="idCuXthW" @click="submitDataScope" type="primary">
                        <span id="idTiGzIv">确 定
                        </span>
                    </el-button>
                    <el-button id="idpGcVTS" @click="cancelDataScope">
                        <span id="idpsZTc9">取 消
                        </span>
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!--JiaoSeGuanLihtmlEnd-->

</template>

<script setup name="Role">
    const router = useRouter();
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable
    } = proxy.useDict("sys_normal_disable");


    // interfaceCode
    import {
        findWhereRole,
        findOneRole,
        updateRole,
        saveRole,
        removeRole
    } from '../../../api/role.js'
    import {
        findOneGetMenuInfo,
        findWhereGetMenu
    } from '../../../api/menu.js'

    // insertMethod
    // JiaoSeGuanLiMethodStart
    // handleCommand
    function handleCommand(command, row) {

        switch (command) {
            case "handleDataScope":
                handleDataScope(row);
                break;
            case "handleAuthUser":
                handleAuthUser(row);
                break;
            default:
                break;
        }

    }
    // getMenuTreeselect
    function getMenuTreeselect() {

        menuTreeselect().then(response => {
            menuOptions.value = response.data;
        });

    }
    // getDeptAllCheckedKeys
    function getDeptAllCheckedKeys() {

        // 目前被选中的部门节点
        let checkedKeys = deptRef.value.getCheckedKeys();
        // 半选中的部门节点
        let halfCheckedKeys = deptRef.value.getHalfCheckedKeys();
        checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
        return checkedKeys;

    }
    // 设置所有节点
    function getRoleMenuTreeselect(roleId) {
        return findWhereGetMenu({}).then(response => {
            menuOptions.value = proxy.handleTree(response.data, "menuId");
            return response;
        });
    }
    // getRoleDeptTreeselect
    function getRoleDeptTreeselect(roleId) {

        return roleDeptTreeselect(roleId).then(response => {
            deptOptions.value = response.depts;
            return response;
        });

    }
    // 获取大纲树节点所选id
    function getMenuAllCheckedKeys() {

        // 目前被选中的菜单节点
        let checkedKeys = menuRef.value.getCheckedKeys();
        // 半选中的菜单节点
        let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
        checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
        return checkedKeys;

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

        if (menuRef.value != undefined) {
            menuRef.value.setCheckedKeys([]);
        }
        menuExpand.value = false;
        menuNodeAll.value = false;
        deptExpand.value = true;
        deptNodeAll.value = false;
        form.value = {
            roleId: undefined,
            roleName: undefined,
            roleKey: undefined,
            roleSort: 0,
            status: "0",
            menuIds: [],
            deptIds: [],
            menuCheckStrictly: true,
            deptCheckStrictly: true,
            remark: undefined
        };
        proxy.resetForm("roleRef");

    }
    // handleAdd
    function handleAdd() {

        reset();
        // getMenuTreeselect();
        getRoleMenuTreeselect()
        open.value = true;
        title.value = "添加角色";

    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        const roleId = row._id || ids.value;
        const roleMenu = getRoleMenuTreeselect(roleId);

        findOneRole({
            _id: roleId // id
        }).then(response => {
            form.value = response.data;
            form.value.roleSort = Number(form.value.roleSort);
            open.value = true;

            nextTick(() => {
                roleMenu.then((res) => {

                    let checkedKeys = response.data.menuIds || [];
                    checkedKeys.forEach((v) => {
                        nextTick(() => {
                            menuRef.value.setChecked(v, true, false);
                        });
                    });
                });
            });
            title.value = "修改角色";
        });
    }
    // handleDelete
    function handleDelete(row) {
        const roleIds = row._id || ids.value;
        proxy.$modal.confirm('是否确认删除"' + (row.roleName || '所选') + '"的数据项?').then(function() {
            return removeRole({
                _id: roleIds // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // handleExport
    function handleExport() {

        proxy.download("system/role/export", {
            ...queryParams.value,
        }, `role_${new Date().getTime()}.xlsx`);

    }
    // getList
    function getList() {
        loading.value = true;
        let params = {
            ...proxy.addDateRange(queryParams.value, dateRange.value)
        }
        params.start = (params.pageNum - 1) * params.pageSize
        params.limit = params.pageSize
        findWhereRole(params).then(response => {
            roleList.value = response.data.list;
            total.value = response.data.total;
            loading.value = false;
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
        proxy.$modal.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?').then(function() {
            return updateRole(row);
        }).then(() => {
            proxy.$modal.msgSuccess(text + "成功");
        }).catch(function() {
            row.status = row.status === "0" ? "1" : "0";
        });

    }
    // handleAuthUser
    function handleAuthUser(row) {

        router.push("/system/role-auth/user/" + row.roleId);

    }
    // handleDataScope
    function handleDataScope(row) {

        reset();
        const roleDeptTreeselect = getRoleDeptTreeselect(row.roleId);
        getRole(row.roleId).then(response => {
            form.value = response.data;
            openDataScope.value = true;
            nextTick(() => {
                roleDeptTreeselect.then(res => {
                    nextTick(() => {
                        if (deptRef.value) {
                            deptRef.value.setCheckedKeys(res.checkedKeys);
                        }
                    });
                });
            });
            title.value = "分配数据权限";
        });

    }
    // handleCheckedTreeExpand
    function handleCheckedTreeExpand(value, type) {

        if (type == "menu") {
            let treeList = menuOptions.value;
            for (let i = 0; i < treeList.length; i++) {
                menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
            }
        } else if (type == "dept") {
            let treeList = deptOptions.value;
            for (let i = 0; i < treeList.length; i++) {
                deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
            }
        }

    }
    // handleCheckedTreeNodeAll
    function handleCheckedTreeNodeAll(value, type) {

        if (type == "menu") {
            menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
        } else if (type == "dept") {
            deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
        }

    }
    // handleCheckedTreeConnect
    function handleCheckedTreeConnect(value, type) {

        if (type == "menu") {
            form.value.menuCheckStrictly = value ? true : false;
        } else if (type == "dept") {
            form.value.deptCheckStrictly = value ? true : false;
        }

    }
    // submitForm
    function submitForm() {
        proxy.$refs["roleRef"].validate(valid => {
            if (valid) {
                if (form.value._id != undefined) {
                    form.value.menuIds = getMenuAllCheckedKeys();

                    updateRole(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    form.value.menuIds = getMenuAllCheckedKeys();
                    saveRole(form.value).then(response => {
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
    // dataScopeSelectChange
    function dataScopeSelectChange(value) {

        if (value !== "2") {
            deptRef.value.setCheckedKeys([]);
        }

    }
    // submitDataScope
    function submitDataScope() {

        if (form.value.roleId != undefined) {
            form.value.deptIds = getDeptAllCheckedKeys();
            dataScope(form.value).then(response => {
                proxy.$modal.msgSuccess("修改成功");
                openDataScope.value = false;
                getList();
            });
        }

    }
    // cancelDataScope
    function cancelDataScope() {

        openDataScope.value = false;
        reset();

    }

    // JiaoSeGuanLiMethodEnd


    // insertData
    // JiaoSeGuanLiDataStart

    // ids
    var ids = ref([])
    // showSearch
    const showSearch = ref(true)
    // dateRange
    var dateRange = ref([])
    // single
    const single = ref(true)
    // multiple
    const multiple = ref(true)
    // loading
    const loading = ref(true)
    // roleList
    var roleList = ref([])
    // total
    const total = ref(0)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // menuExpand
    const menuExpand = ref(false)
    // menuNodeAll
    const menuNodeAll = ref(false)
    // menuOptions
    var menuOptions = ref([])
    // menuRef
    const menuRef = ref(null)
    // openDataScope
    const openDataScope = ref(false)
    // data
    var data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            roleName: undefined,
            roleKey: undefined,
            status: undefined
        },
        rules: {
            roleName: [{
                required: true,
                message: "角色名称不能为空",
                trigger: "blur"
            }],
            roleKey: [{
                required: true,
                message: "权限字符不能为空",
                trigger: "blur"
            }],
            roleSort: [{
                required: true,
                message: "角色顺序不能为空",
                trigger: "blur"
            }]
        },
    })
    // dataScopeOptions
    var dataScopeOptions = ref([{
            value: "1",
            label: "全部数据权限"
        },
        {
            value: "2",
            label: "自定数据权限"
        },
        {
            value: "3",
            label: "本部门数据权限"
        },
        {
            value: "4",
            label: "本部门及以下数据权限"
        },
        {
            value: "5",
            label: "仅本人数据权限"
        }
    ])
    // deptExpand
    const deptExpand = ref(true)
    // deptNodeAll
    const deptNodeAll = ref(false)
    // deptOptions
    var deptOptions = ref([])
    // deptRef
    const deptRef = ref(null)
    // JiaoSeGuanLiDataEnd
    const {
        queryParams,
        form,
        rules
    } = toRefs(data);

    // defaultLoad
    // JiaoSeGuanLiMountedStart
    getList();
    // JiaoSeGuanLiMountedEnd
</script>
<style>
    .JiaoSeGuanLicssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .JiaoSeGuanLicssEnd {}
</style>