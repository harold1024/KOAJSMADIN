<template>
    <!--ZiDianGuanLiShouYehtmlStart-->

    <div id="defaultId1">
        <div id="iddmn4pm" class="app-container ">
            <el-form id="idPEMr7W" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
                <el-form-item id="idVzl2cC" label="字典名称" prop="dictName">
                    <el-input id="idi7ekfd" v-model="queryParams.dictName" placeholder="请输入字典名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idbJFCWg" label="字典类型" prop="dictType">
                    <el-input id="idTz1e1w" v-model="queryParams.dictType" placeholder="请输入字典类型" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idrx7Pxu" label="状态" prop="status">
                    <el-select id="idSmEbdL" v-model="queryParams.status" placeholder="字典状态" clearable>
                        <el-option id="idsUTAws" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="id3dkQxw" label="创建时间">
                    <el-date-picker id="iduxRqZU" v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item id="id5JqRO4">
                    <el-button id="id3nVKNt" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="idipVzGg" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idlLhcZG" class="mb8 " :gutter="10">
                <el-col id="idj6OGkR" :span="1.5">
                    <el-button id="idtq5SnK" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:dict:add']">
                        新增

                    </el-button>
                </el-col>
                <el-col id="idCC8A4T" :span="1.5">
                    <el-button id="idgmOrK1" @click="handleUpdate" type="success" plain icon="Edit" :disabled="single" v-hasPermi="['system:dict:edit']">
                        修改

                    </el-button>
                </el-col>
                <el-col id="idoMBU8q" :span="1.5">
                    <el-button id="id92vTV9" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:dict:remove']">
                        删除

                    </el-button>
                </el-col>
                <el-col id="idEhZcWu" v-show="false" :span="1.5">
                    <el-button id="idp8mVFU" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:dict:export']">
                        导出

                    </el-button>
                </el-col>
                <el-col id="idgZKEe3" :span="1.5">
                    <el-button id="idliAuMk" @click="handleRefreshCache" type="danger" plain icon="Refresh" v-hasPermi="['system:dict:remove']">
                        刷新缓存

                    </el-button>
                </el-col>
                <right-toolbar id="id2qxnVX" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idSmQlXv" v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
                <el-table-column id="id6gTRkG" type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column id="idZabx6N" label="字典名称" align="center" prop="dictName" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idhmPs1D" label="字典类型" align="center" :show-overflow-tooltip="true">
                    <template id="idRqxivf" #default="scope">
                        <router-link id="idh1zUPo" class="link-type " :to="'/system/dict-data/index/' + scope.row._id">
                            <span id="idJN4KpS">
                                {{ scope.row.dictType }}

                            </span>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column id="id7avIBL" label="状态" align="center" prop="status">
                    <template id="idgFBhZV" #default="scope">
                        <dict-tag id="idKRJE3M" :options="sys_normal_disable" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idBzD269" label="备注" align="center" prop="remark" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idvILZVO" label="创建时间" align="center" prop="createTime" width="180">
                    <template id="id7uC9vC" #default="scope">
                        <span id="idZe98U9">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="idArdX9m" label="操作" align="center" class-name="small-padding fixed-width">
                    <template id="idZf3q1o" #default="scope">
                        <el-button id="idOvZfuz" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:dict:edit']">
                            修改

                        </el-button>
                        <el-button id="idqQRj1x" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:dict:remove']">
                            删除

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination id="idE66g7i" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
                <!-- 添加或修改参数配置对话框 -->
            </pagination>
        </div>
        <el-dialog id="idStPcMX" v-model="open" :title="title" width="500px" append-to-body>
            <el-form id="idiswxuK" ref="dictRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item id="idCnI5tV" label="字典名称" prop="dictName">
                    <el-input id="id9plSdb" v-model="form.dictName" placeholder="请输入字典名称">
                    </el-input>
                </el-form-item>
                <el-form-item id="idVaNLRm" label="字典类型" prop="dictType">
                    <el-input id="idd1xvpt" v-model="form.dictType" placeholder="请输入字典类型">
                    </el-input>
                </el-form-item>
                <el-form-item id="idh1qcMK" label="状态" prop="status">
                    <el-radio-group id="idWo1TkE" v-model="form.status">
                        <el-radio id="idIF5ich" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                            {{ dict.label }}

                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item id="id3oP8VV" label="备注" prop="remark">
                    <el-input id="idNoVnBG" v-model="form.remark" type="textarea" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>
            <template id="idn9Uh4P" #footer>
                <div id="id7UkL8f" class="dialog-footer ">
                    <el-button id="idiIPoBv" @click="submitForm" type="primary">
                        确 定

                    </el-button>
                    <el-button id="ids1sHxT" @click="cancel">
                        取 消

                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!--ZiDianGuanLiShouYehtmlEnd-->
</template>

<script setup name="Dict">
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable
    } = proxy.useDict("sys_normal_disable");















    /** 查询字典类型列表 */

    /** 取消按钮 */

    /** 表单重置 */

    /** 搜索按钮操作 */

    /** 重置按钮操作 */

    /** 新增按钮操作 */

    /** 多选框选中数据 */

    /** 修改按钮操作 */

    /** 提交按钮 */

    /** 删除按钮操作 */

    /** 导出按钮操作 */

    /** 刷新缓存按钮操作 */




    // interfaceCode
    import {
        findWhereGetDictList,
        findOneGetDictType,
        updateDict,
        saveAddDict,
        removeDict
    } from '../../../api/dict.js'

    // insertMethod
    // ZiDianGuanLiShouYeMethodStart
    // handleQuery
    function handleQuery() {

        queryParams.value.pageNum = 1;
        getList();

    }
    // reset
    function reset() {

        form.value = {
            dictId: undefined,
            dictName: undefined,
            dictType: undefined,
            status: "0",
            remark: undefined
        };
        proxy.resetForm("dictRef");

    }
    // resetQuery
    function resetQuery() {

        dateRange.value = [];
        proxy.resetForm("queryRef");
        handleQuery();

    }
    // handleAdd
    function handleAdd() {

        reset();
        open.value = true;
        title.value = "添加字典类型";

    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        const dictId = row.dictId || ids.value;

        findOneGetDictType({
            _id: row._id // 字典id
        }).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改字典类型";
        });
    }
    // handleDelete
    function handleDelete(row) {
        const dictIds = row.dictId || ids.value; // ids用来批量删除
        proxy.$modal.confirm('是否确认删除"' + (row.dictName || '所选') + '"的数据项？').then(function() {

            return removeDict({
                _id: (row._id || ids.value) // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // handleExport
    function handleExport() {

        proxy.download("system/dict/type/export", {
            ...queryParams.value
        }, `dict_${new Date().getTime()}.xlsx`);

    }
    // handleRefreshCache
    function handleRefreshCache() {

        refreshCache().then(() => {
            proxy.$modal.msgSuccess("刷新成功");
        });

    }
    // 获取字典数据
    async function getList() {
        loading.value = true;
        let params = {
            ...queryParams.value
        }
        params.start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize
        params.limit = queryParams.value.pageSize // 分页不一样需要映射一下
        let data = await findWhereGetDictList(params)
        if (data) {
            typeList.value = data.data.list
            total.value = data.data.total;
            loading.value = false;
        } else {

        }
    }
    // handleSelectionChange
    function handleSelectionChange(selection) {

        ids.value = selection.map(item => item._id);
        single.value = selection.length != 1;
        multiple.value = !selection.length;

    }
    // submitForm
    function submitForm() {
        proxy.$refs["dictRef"].validate(valid => {
            if (valid) {
                if (form.value.dictId != undefined) {
                    updateDict(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    saveAddDict(form.value).then(response => {
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

    // ZiDianGuanLiShouYeMethodEnd


    // insertData
    // ZiDianGuanLiShouYeDataStart

    // ids
    const ids = ref([])
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
    // typeList
    const typeList = ref([])
    // data
    var data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            dictName: undefined,
            dictType: undefined,
            status: undefined
        },
        rules: {
            dictName: [{
                required: true,
                message: "字典名称不能为空",
                trigger: "blur"
            }],
            dictType: [{
                required: true,
                message: "字典类型不能为空",
                trigger: "blur"
            }]
        },
    })
    // total
    const total = ref(0)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // ZiDianGuanLiShouYeDataEnd

    const {
        queryParams,
        form,
        rules
    } = toRefs(data);

    // defaultLoad
    // ZiDianGuanLiShouYeMountedStart
    getList();
    // ZiDianGuanLiShouYeMountedEnd
</script>
<style>
    .ZiDianGuanLiShouYecssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ZiDianGuanLiShouYecssEnd {}
</style>