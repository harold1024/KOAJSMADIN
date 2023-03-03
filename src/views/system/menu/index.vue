<template>
    <!--CaiDanGuanLihtmlStart-->

    <div id="defaultId1">
        <div id="idbGPIvn" class="app-container ">
            <el-form id="idgjzCc6" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true">
                <el-form-item id="idShCZ1M" label="菜单名称" prop="menuName">
                    <el-input id="ids1eMXp" v-model="queryParams.menuName" placeholder="请输入菜单名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="id8uDibh" label="状态" prop="status">
                    <el-select id="idfvsV4o" v-model="queryParams.status" placeholder="菜单状态" clearable>
                        <el-option id="idXgVbo6" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idGAEwwd">
                    <el-button id="idBQWmE5" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="idMWVVB2" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idMBUV8P" class="mb8 " :gutter="10">
                <el-col id="idRrNtbZ" :span="1.5">
                    <el-button id="idMThaXh" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:menu:add']">
                        新增

                    </el-button>
                </el-col>
                <el-col id="idAfrgpF" :span="1.5">
                    <el-button id="id4bLn6v" @click="toggleExpandAll" type="info" plain icon="Sort">
                        展开/折叠

                    </el-button>
                </el-col>
                <right-toolbar id="idUaVpkN" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idLvhveC" v-if="refreshTable" v-loading="loading" :data="menuList" row-key="menuId" :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column id="id2bJUSq" prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160">
                </el-table-column>
                <el-table-column id="idGUvGKJ" prop="icon" label="图标" align="center" width="100">
                    <template id="idn12CuA" #default="scope">
                        <svg-icon id="idqCOHUV" :icon-class="scope.row.icon">
                        </svg-icon>
                    </template>
                </el-table-column>
                <el-table-column id="idVwEfCf" prop="orderNum" label="排序" width="60">
                </el-table-column>
                <el-table-column id="idFVXKmP" prop="perms" label="权限标识" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idbt29Zg" prop="component" label="组件路径" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idisdDmv" prop="status" label="状态" width="80">
                    <template id="idLRRk5V" #default="scope">
                        <dict-tag id="idoV8PKa" :options="sys_normal_disable" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idHCsvjn" label="创建时间" align="center" prop="createTime" width="200px">
                    <template id="idVEBSjs" #default="scope">
                        <span id="idLruO9a">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="id9OFDvO" label="操作" align="center" width="200" class-name="small-padding fixed-width">
                    <template id="id94dPRh" #default="scope">
                        <el-button id="idzpiLCd" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:menu:edit']">
                            修改

                        </el-button>
                        <el-button id="iduWGDHk" @click="handleAdd(scope.row)" type="text" icon="Plus" v-hasPermi="['system:menu:add']">
                            新增

                        </el-button>
                        <el-button id="idMglJhQ" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:menu:remove']">
                            删除

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加或修改菜单对话框 -->
            <el-dialog id="idq2WDQV" v-model="open" :title="title" width="680px" append-to-body>
                <el-form id="idmijbHQ" ref="menuRef" :model="form" :rules="rules" label-width="100px">
                    <el-row id="idJIK4dG">
                        <el-col id="idusjKTN" :span="24">
                            <el-form-item id="idgNlpvT" label="上级菜单">
                                <el-tree-select id="idkjCeX1" v-model="form.parentId" :data="menuList" :props="{ value: 'menuId', label: 'menuName', children: 'children' }" value-key="menuId" placeholder="选择上级菜单" check-strictly>
                                </el-tree-select>
                            </el-form-item>
                        </el-col>
                        <el-col id="iduVbWUF" :span="24">
                            <el-form-item id="idCZqTmn" label="菜单类型" prop="menuType">
                                <el-radio-group id="idlK8IF6" v-model="form.menuType">
                                    <el-radio id="idZNZh6o" label="M">
                                        目录

                                    </el-radio>
                                    <el-radio id="idveHD6B" label="C">
                                        菜单

                                    </el-radio>
                                    <el-radio id="idr9ehmc" label="F">
                                        按钮

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col id="idehkNAg" :span="24" v-if="form.menuType != 'F'">
                            <el-form-item id="id2vQ2ng" label="菜单" prop="icon">
                                <el-popover id="idrxo5gz" placement="bottom-start" :width="540" v-model:visible="showChooseIcon" trigger="click" @show="showSelectIcon">
                                    <template id="idbl6vVk" #reference>
                                        <el-input id="idRU7L8d" v-model="form.icon" @click="showSelectIcon" placeholder="点击选择图标" v-click-outside="hideSelectIcon" readonly>
                                            <template id="idAGDrDI" #prefix>
                                                <svg-icon id="idovzl7p" class="el-input__icon " v-if="form.icon" :icon-class="form.icon">
                                                </svg-icon>
                                                <el-icon id="id45G5vz" class=" u856a3" v-else>
                                                    <search id="idmCIFv9">
                                                    </search>
                                                </el-icon>
                                            </template>
                                        </el-input>
                                    </template>
                                    <icon-select id="idPahGRP" class=" u9751e" ref="iconSelectRef" @selected="selected">
                                    </icon-select>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col id="idgGLwV7" :span="12">
                            <el-form-item id="idE2poCG" label="菜单名称" prop="menuName">
                                <el-input id="id1vnaDV" v-model="form.menuName" placeholder="请输入菜单名称">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="id6TWmOg" :span="12">
                            <el-form-item id="idKhQand" label="显示排序" prop="orderNum">
                                <el-input-number id="idNPoNpw" v-model="form.orderNum" controls-position="right" :min="0">
                                </el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col id="idsHfggm" :span="12" v-if="form.menuType != 'F'">
                            <el-form-item id="idSv5kQH">
                                <template id="idtFDoRd" #label>
                                    <span id="idbvK7eX">
                                        <el-tooltip id="idifjteL" content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                                            <el-icon id="idPbCBQd">
                                                <question-filled id="idS2kHop">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idMzrR2e">
                                            </question-filled>
                                        </el-tooltip>
                                        是否外链

                                    </span>
                                </template>
                                <el-radio-group id="idVZLvUf" v-model="form.isFrame">
                                    <el-radio id="id666ljv" label="0">
                                        是

                                    </el-radio>
                                    <el-radio id="id7gmm6V" label="1">
                                        否

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col id="idsaNuc7" :span="12" v-if="form.menuType != 'F'">
                            <el-form-item id="idNxOPwF" prop="path">
                                <template id="idRDUHm1" #label>
                                    <span id="idVoOv3M">
                                        <el-tooltip id="id38x1rf" content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
                                            <el-icon id="idae35fx">
                                                <question-filled id="id2qj7Pb">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idB3kkja">
                                            </question-filled>
                                        </el-tooltip>
                                        路由地址

                                    </span>
                                </template>
                                <el-input id="idBMpRRr" v-model="form.path" placeholder="请输入路由地址">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idvhfkA7" :span="12" v-if="form.menuType == 'C'">
                            <el-form-item id="idQw5coW" prop="component">
                                <template id="idtMGMqD" #label>
                                    <span id="idPghmpH">
                                        <el-tooltip id="idVLNwOT" content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                                            <el-icon id="idn7vqSf">
                                                <question-filled id="id81VQkk">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idmhghce">
                                            </question-filled>
                                        </el-tooltip>
                                        组件路径

                                    </span>
                                </template>
                                <el-input id="id3SFpa5" v-model="form.component" placeholder="请输入组件路径">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idikgcNa" :span="12" v-if="form.menuType != 'M'">
                            <el-form-item id="idBDX9B7">
                                <el-input id="id9lhRnJ" v-model="form.perms" placeholder="请输入权限标识" maxlength="100">
                                </el-input>
                                <template id="idGlIi3X" #label>
                                    <span id="idhRdhIU">
                                        <el-tooltip id="idXPgTbh" content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)" placement="top">
                                            <el-icon id="idD1A7cx">
                                                <question-filled id="idOHexLg">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idmuRIu3">
                                            </question-filled>
                                        </el-tooltip>
                                        权限字符

                                    </span>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col id="idOugKOA" :span="12" v-if="form.menuType == 'C'">
                            <el-form-item id="idzAHhpc">
                                <el-input id="id2Hc9ro" v-model="form.query" placeholder="请输入路由参数" maxlength="255">
                                </el-input>
                                <template id="idkDnviC" #label>
                                    <span id="idZvA1KU">
                                        <el-tooltip id="idG83nsb" content="访问路由的默认传递参数，如：`{'id': 1, 'name': 'ry'}`" placement="top">
                                            <el-icon id="idIO4nlD">
                                                <question-filled id="idVlgGQl">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="id69VKVF">
                                            </question-filled>
                                        </el-tooltip>
                                        路由参数

                                    </span>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col id="idst1FuS" :span="12" v-if="form.menuType == 'C'">
                            <el-form-item id="idAJtFO2">
                                <template id="idPzaevU" #label>
                                    <span id="idSG5UdN">
                                        <el-tooltip id="idz6Nbbe" content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
                                            <el-icon id="idAdsjdF">
                                                <question-filled id="idpSTkUI">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idZJNPAz">
                                            </question-filled>
                                        </el-tooltip>
                                        是否缓存

                                    </span>
                                </template>
                                <el-radio-group id="id5olxHn" v-model="form.isCache">
                                    <el-radio id="id4rnRnX" label="0">
                                        缓存

                                    </el-radio>
                                    <el-radio id="idovgGgM" label="1">
                                        不缓存

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col id="idsf3uVU" :span="12" v-if="form.menuType != 'F'">
                            <el-form-item id="idRrSIuB">
                                <template id="idZFVZHQ" #label>
                                    <span id="idI5DxUJ">
                                        <el-tooltip id="id1NVkxu" content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                                            <el-icon id="idOVgAFr">
                                                <question-filled id="idugsfQF">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idz6w5OM">
                                            </question-filled>
                                        </el-tooltip>
                                        显示状态

                                    </span>
                                </template>
                                <el-radio-group id="idgFeVJV" v-model="form.visible">
                                    <el-radio id="id5dL1HV" v-for="dict in sys_show_hide" :key="dict.value" :label="dict.value">
                                        {{ dict.label }}

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col id="idj8H2Bm" :span="12" v-if="form.menuType != 'F'">
                            <el-form-item id="idf7VZzl">
                                <template id="idvsFciR" #label>
                                    <span id="idJiEI64">
                                        <el-tooltip id="idRRMupu" content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                                            <el-icon id="idEPODkU">
                                                <question-filled id="idEBT22v">
                                                </question-filled>
                                            </el-icon>
                                            <question-filled id="idvCsM9I">
                                            </question-filled>
                                        </el-tooltip>
                                        菜单状态

                                    </span>
                                </template>
                                <el-radio-group id="idSS3xZR" v-model="form.status">
                                    <el-radio id="idNA94lV" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                                        {{ dict.label }}

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template id="idn5x6Ix" #footer>
                    <div id="id9SVrcb" class="dialog-footer ">
                        <el-button id="idZkOUhr" @click="submitForm" type="primary">
                            确 定

                        </el-button>
                        <el-button id="idxXbvFd" @click="cancel">
                            取 消

                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
    <!--CaiDanGuanLihtmlEnd-->
</template>

<script setup name="Menu">
    import SvgIcon from "@/components/SvgIcon";
    import IconSelect from "@/components/IconSelect";
    import {
        ClickOutside as vClickOutside
    } from 'element-plus'

    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_show_hide,
        sys_normal_disable
    } = proxy.useDict("sys_show_hide", "sys_normal_disable");



    /** 查询菜单列表 */

    /** 查询菜单下拉树结构 */

    /** 取消按钮 */

    /** 表单重置 */

    /** 展示下拉图标 */

    /** 选择图标 */

    /** 图标外层点击隐藏下拉列表 */

    /** 搜索按钮操作 */

    /** 重置按钮操作 */

    /** 新增按钮操作 */

    /** 展开/折叠操作 */

    /** 修改按钮操作 */

    /** 提交按钮 */

    /** 删除按钮操作 */





    // interfaceCode
    import {
        findOneGetMenuInfo,
        findWhereGetMenu,
        updateEditeMenu,
        saveAddMenu,
        removeDeleteMenu
    } from '../../../api/menu.js'



    // insertMethod
    // CaiDanGuanLiMethodStart
    // getTreeselect
    async function getTreeselect() {
        menuOptions.value = [];

        let data = await findWhereGetMenu({})
        if (data) {
            const menu = {
                menuId: 0,
                menuName: "主类目",
                children: []
            };
            menu.children = proxy.handleTree(data.data, "menuId");
            menuOptions.value.push(menu);
        } else {

        }
        return
        listMenu().then(response => {
            const menu = {
                menuId: 0,
                menuName: "主类目",
                children: []
            };
            menu.children = proxy.handleTree(response.data, "menuId");
            menuOptions.value.push(menu);
        });
    }
    // handleQuery
    function handleQuery() {

        getList();

    }
    // reset
    function reset() {

        form.value = {
            menuId: undefined,
            parentId: 0,
            menuName: undefined,
            icon: undefined,
            menuType: "M",
            orderNum: undefined,
            isFrame: "1",
            isCache: "0",
            visible: "0",
            status: "0"
        };
        proxy.resetForm("menuRef");

    }
    // resetQuery
    function resetQuery() {

        proxy.resetForm("queryRef");
        handleQuery();

    }
    // handleAdd
    function handleAdd(row) {
        reset();
        getTreeselect();
        if (row != null && row.menuId) {
            form.value.parentId = row.menuId;
        } else {
            form.value.parentId = 0;
        }
        open.value = true;
        title.value = "添加菜单";
    }
    // 查询菜单列表
    function toggleExpandAll() {

        refreshTable.value = false;
        isExpandAll.value = !isExpandAll.value;
        nextTick(() => {
            refreshTable.value = true;
        });

    }
    // getList
    async function getList() {
        loading.value = true;
        let data = await findWhereGetMenu(queryParams.value)
        if (data) {
            menuList.value = proxy.handleTree(data.data, "menuId")
            loading.value = false;
        } else {
            loading.value = false;
        }
    }
    // handleUpdate
    async function handleUpdate(row) {
        reset();
        await getTreeselect();


        let data = await findOneGetMenuInfo({
            _id: row._id // 菜单id不能为空
        })
        if (data) {
            form.value = data.data;
            open.value = true;
            title.value = "修改菜单";
        } else {

        }
        return

        getMenu(row.menuId).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改菜单";
        });
    }
    // handleDelete
    function handleDelete(row) {
        proxy.$modal.confirm('是否确认删除名称为"' + row.menuName + '"的数据项?').then(async function() {


            let data = await removeDeleteMenu({
                _id: row._id // 数据唯一id
            })
            if (data) {
                return data
            } else {

            }
            //return delMenu(row.menuId);
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // showSelectIcon
    function showSelectIcon() {

        iconSelectRef.value.reset();
        showChooseIcon.value = true;

    }
    // hideSelectIcon
    function hideSelectIcon() {

        showChooseIcon.value = false;

    }
    // selected
    function selected(name) {

        form.value.icon = name;
        showChooseIcon.value = false;

    }
    // submitForm
    function submitForm() {
        proxy.$refs["menuRef"].validate(async valid => {

            if (valid) {
                if (form.value.menuId != undefined) {

                    let data = await updateEditeMenu(form.value)

                    if (data) {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    } else {

                    }

                } else {

                    let data = await saveAddMenu(form.value)
                    if (data) {
                        proxy.$modal.msgSuccess("新增成功");
                        open.value = false;
                        getList();
                    } else {

                    }
                    return
                    addMenu(form.value).then(response => {
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

    // CaiDanGuanLiMethodEnd


    // insertData
    // CaiDanGuanLiDataStart

    // data
    var data = reactive({
        form: {},
        queryParams: {
            menuName: undefined,
            status: undefined
        },
        rules: {
            menuName: [{
                required: true,
                message: "菜单名称不能为空",
                trigger: "blur"
            }],
            orderNum: [{
                required: true,
                message: "菜单顺序不能为空",
                trigger: "blur"
            }],
            path: [{
                required: true,
                message: "路由地址不能为空",
                trigger: "blur"
            }]
        },
    })
    // showSearch
    const showSearch = ref(true)
    // 是否开启刷新
    const refreshTable = ref(true)
    // 加载中
    const loading = ref(true)
    // 菜单列表
    var menuList = ref([])
    // 是否展示全部
    const isExpandAll = ref(false)
    // title
    const title = ref('')
    // 弹框的显示状态
    const open = ref(false)
    // menuOptions
    const menuOptions = ref([])
    // showChooseIcon
    const showChooseIcon = ref(false)
    // iconSelectRef
    const iconSelectRef = ref(null)
    // CaiDanGuanLiDataEnd
    const {
        queryParams,
        form,
        rules
    } = toRefs(data);

    // defaultLoad
    // CaiDanGuanLiMountedStart
    getList();
    // CaiDanGuanLiMountedEnd
</script>
<style>
    .CaiDanGuanLicssStart {}

    .u856a3 {
        width: 16px;
        height: 32px;
        margin-top: 1px;
    }

    .u9751e {
        align-items: center;
    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .CaiDanGuanLicssEnd {}
</style>