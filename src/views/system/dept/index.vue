<template>
    <!--BuMenGuanLihtmlStart-->

    <div id="defaultId1">
        <div id="idoMajF5" class="app-container ">
            <el-form id="idCHQpkn" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true">
                <el-form-item id="idgLtaec" label="部门名称" prop="deptName">
                    <el-input id="id5kVm6t" v-model="queryParams.deptName" placeholder="请输入部门名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idthgjUf" label="状态" prop="status">
                    <el-select id="idGU8GNQ" v-model="queryParams.status" placeholder="部门状态" clearable>
                        <el-option id="idFeMkcG" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idvGdqE3">
                    <el-button id="idc7UlMK" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="idWpPpBU" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="id6rv8g3" class="mb8 " :gutter="10">
                <el-col id="idsajRje" :span="1.5">
                    <el-button id="idWCc6Va" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:dept:add']">
                        <span id="idCu9dzI">新增
                        </span>
                    </el-button>
                </el-col>
                <el-col id="idRsA6b3" :span="1.5">
                    <el-button id="id9a3hDR" @click="toggleExpandAll" type="info" plain icon="Sort">
                        <span id="idLeVHaH">展开/折叠
                        </span>
                    </el-button>
                </el-col>
                <right-toolbar id="idpEdKBf" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idTsBvAb" v-if="refreshTable" v-loading="loading" :data="deptList" row-key="deptId" :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column id="idEJnN6c" prop="deptName" label="部门名称" width="260">
                </el-table-column>
                <el-table-column id="idS1kcAm" prop="orderNum" label="排序" width="200">
                </el-table-column>
                <el-table-column id="idXDqKnH" prop="status" label="状态" width="100">
                    <template id="idnzvwnb" #default="scope">
                        <dict-tag id="idjEGiH6" :options="sys_normal_disable" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idjDzvVI" label="创建时间" align="center" prop="createTime" width>
                    <template id="id5q3d6P" #default="scope">
                        <span id="idlLxoKt">
                            <span id="idtE8gbg">{{ parseTime(scope.row.createTime) }}
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="idtHfVOt" label="操作" align="center" class-name="small-padding fixed-width" width="200">
                    <template id="idPiwEXe" #default="scope">
                        <el-button id="idfUb1OI" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:dept:edit']">
                            <span id="idJEDXqI">修改
                            </span>
                        </el-button>
                        <el-button id="idugVWAG" @click="handleAdd(scope.row)" type="text" icon="Plus" v-hasPermi="['system:dept:add']">
                            <span id="idLBMh4Q">新增
                            </span>
                        </el-button>
                        <el-button id="idKzvNot" @click="handleDelete(scope.row)" v-if="scope.row.parentId != 0" type="text" icon="Delete" v-hasPermi="['system:dept:remove']">
                            <span id="idmXaBiu">删除
                            </span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加或修改部门对话框 -->
            <el-dialog id="idkV69Hx" v-model="open" :title="title" width="600px" append-to-body>
                <el-form id="idPoDU3D" ref="deptRef" :model="form" :rules="rules" label-width="80px">
                    <el-row id="idtKHZqG">
                        <el-col id="idMu7oDv" :span="24" v-if="form.parentId !== 0">
                            <el-form-item id="id9WXfM2" label="上级部门" prop="parentId">
                                <el-tree-select id="idQwDJOx" v-model="form.parentId" :data="deptList" :props="{ value: 'deptId', label: 'deptName', children: 'children' }" value-key="deptId" placeholder="选择上级部门" check-strictly>
                                </el-tree-select>
                            </el-form-item>
                        </el-col>
                        <el-col id="id6VBfoL" :span="12">
                            <el-form-item id="idFa6WeU" label="部门名称" prop="deptName">
                                <el-input id="idZT8UXf" v-model="form.deptName" placeholder="请输入部门名称">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idIti9Ix" :span="12">
                            <el-form-item id="idOD2vxH" label="显示排序" prop="orderNum">
                                <el-input-number id="idLzOVFo" v-model="form.orderNum" controls-position="right" :min="0">
                                </el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col id="idMQwSbP" :span="12">
                            <el-form-item id="idpdOdbR" label="负责人" prop="leader">
                                <el-input id="idaK1rFm" v-model="form.leader" placeholder="请输入负责人" maxlength="20">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idLhwEK2" :span="12">
                            <el-form-item id="idl8JWu8" label="联系电话" prop="phone">
                                <el-input id="idg21Man" v-model="form.phone" placeholder="请输入联系电话" maxlength="11">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idsjejhA" :span="12">
                            <el-form-item id="idZUamPP" label="邮箱" prop="email">
                                <el-input id="idzAz5Sz" v-model="form.email" placeholder="请输入邮箱" maxlength="50">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col id="idoH8zg9" :span="12">
                            <el-form-item id="idVgtGGH" label="部门状态">
                                <el-radio-group id="ideiVeei" v-model="form.status">
                                    <el-radio id="idVawi7a" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                                        {{ dict.label }}

                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <template id="idFgmsnu" #footer>
                    <div id="idI9luFx" class="dialog-footer ">
                        <el-button id="idz3beI3" @click="submitForm" type="primary">
                            <span id="idrkMr4c">确 定
                            </span>
                        </el-button>
                        <el-button id="idRzRvEP" @click="cancel">
                            <span id="idL7xQSc">取 消
                            </span>
                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
    <!--BuMenGuanLihtmlEnd-->

</template>

<script setup name="Dept">
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable
    } = proxy.useDict("sys_normal_disable");

    // interfaceCode
    import {
        findWhereDept,
        findOneDept,
        updateDept,
        saveDept,
        removeDept
    } from '../../../api/dept.js'

    // insertMethod
    // BuMenGuanLiMethodStart
    // handleQuery
    function handleQuery() {

        getList();

    }
    // reset
    function reset() {

        form.value = {
            deptId: undefined,
            parentId: undefined,
            deptName: undefined,
            orderNum: 0,
            leader: undefined,
            phone: undefined,
            email: undefined,
            status: "0"
        };
        proxy.resetForm("deptRef");

    }
    // resetQuery
    function resetQuery() {

        proxy.resetForm("queryRef");
        handleQuery();

    }
    // handleAdd
    function handleAdd(row) {

        reset();
        //  listDept().then(response => {
        //    deptOptions.value = proxy.handleTree(response.data, "deptId");
        // });
        console.log("点击了新增")
        if (row != undefined) {
            console.log(row)
            form.value.parentId = row.deptId;
        }
        open.value = true;
        title.value = "添加部门";

    }
    // toggleExpandAll
    function toggleExpandAll() {

        refreshTable.value = false;
        isExpandAll.value = !isExpandAll.value;
        nextTick(() => {
            refreshTable.value = true;
        });

    }
    // 获取表格数据
    function getList() {
        loading.value = true;


        let params = {
            ...queryParams.value
        }
        params.start = 0
        params.limit = 1000
        findWhereDept(params).then(response => {
            deptList.value = proxy.handleTree(response.data.list, "deptId");
            loading.value = false;
        });
    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        // listDeptExcludeChild(row.deptId).then(response => {
        //   deptOptions.value = proxy.handleTree(response.data, "deptId");
        //  });

        findOneDept({
            _id: row._id // 数据唯一id
        }).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改部门";
        });
    }
    // handleDelete
    function handleDelete(row) {
        proxy.$modal.confirm('是否确认删除名称为"' + row.deptName + '"的数据项?').then(function() {

            return removeDept({
                _id: row._id // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // 数据提交
    function submitForm() {

        proxy.$refs["deptRef"].validate(valid => {
            if (valid) {
                if (form.value.deptId != undefined) {

                    updateDept(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {

                    saveDept(form.value).then(response => {
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

    // BuMenGuanLiMethodEnd

    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    // insertData
    // BuMenGuanLiDataStart

    // data
    var data = reactive({
        form: {},
        queryParams: {
            deptName: undefined,
            status: undefined
        },
        rules: {
            parentId: [{
                required: true,
                message: "上级部门不能为空",
                trigger: "blur"
            }],
            deptName: [{
                required: true,
                message: "部门名称不能为空",
                trigger: "blur"
            }],
            orderNum: [{
                required: true,
                message: "显示排序不能为空",
                trigger: "blur"
            }],
            email: [{
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"]
            }],
            phone: [{
                pattern: reg,
                message: "请输入正确的手机号码",
                trigger: "blur"
            }]
        },
    })
    // showSearch
    const showSearch = ref(true)
    // refreshTable
    const refreshTable = ref(true)
    // loading
    const loading = ref(true)
    // deptList
    const deptList = ref([])
    // isExpandAll
    const isExpandAll = ref(true)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // deptOptions
    var deptOptions = ref([])
    // BuMenGuanLiDataEnd

    const {
        queryParams,
        form,
        rules
    } = toRefs(data);


    // defaultLoad
    // BuMenGuanLiMountedStart
    getList();
    // BuMenGuanLiMountedEnd
</script>
<style>
    .BuMenGuanLicssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .BuMenGuanLicssEnd {}
</style>