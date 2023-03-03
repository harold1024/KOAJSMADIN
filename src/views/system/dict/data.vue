<template>
    <!--ZiDianShuJuhtmlStart-->

    <div id="defaultId1">
        <div id="idcXpSje" class="app-container ">
            <el-form id="idkKQvQO" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
                <el-form-item id="idfclDsi" label="字典名称" prop="dictType">
                    <el-select id="idNJL2bg" v-model="queryParams.dictType">
                        <el-option id="idXOtRua" v-for="item in typeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictType">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idcJBs19" label="字典标签" prop="dictLabel">
                    <el-input id="idV6VLDD" v-model="queryParams.dictLabel" placeholder="请输入字典标签" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idEH8xl4" label="状态" prop="status">
                    <el-select id="id3osBzJ" v-model="queryParams.status" placeholder="数据状态" clearable>
                        <el-option id="idm6I2si" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idAt5PJT">
                    <el-button id="idRLvvle" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="id3KMHdt" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idDHi7Vf" class="mb8 " :gutter="10">
                <el-col id="id9MhZA2" :span="1.5">
                    <el-button id="idpPqJxv" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:dict:add']">
                        新增

                    </el-button>
                </el-col>
                <el-col id="idqGLtuU" :span="1.5">
                    <el-button id="idstH4DX" @click="handleUpdate" type="success" plain icon="Edit" :disabled="single" v-hasPermi="['system:dict:edit']">
                        修改

                    </el-button>
                </el-col>
                <el-col id="idvPhz3O" :span="1.5">
                    <el-button id="idrMGTUF" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:dict:remove']">
                        删除

                    </el-button>
                </el-col>
                <el-col id="idpH8jGH" :span="1.5">
                    <el-button id="idvbBcOg" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:dict:export']">
                        导出

                    </el-button>
                </el-col>
                <el-col id="id1Bm8Vf" :span="1.5">
                    <el-button id="idTMPV1k" @click="handleClose" type="warning" plain icon="Close">
                        关闭

                    </el-button>
                </el-col>
                <right-toolbar id="id2VniVa" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idguFlTO" v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
                <el-table-column id="idKWC9DE" type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column id="idab3tac" label="字典编码" align="center" prop="dictCode">
                </el-table-column>
                <el-table-column id="idmqqcPe" label="字典标签" align="center" prop="dictLabel">
                    <template id="idaz4rFK" #default="scope">
                        <span id="idcqjLEv" v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">
                            {{ scope.row.dictLabel }}

                        </span>
                        <el-tag id="idMG3Jbd" v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">
                            {{ scope.row.dictLabel }}

                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idl7QLJV" label="字典键值" align="center" prop="dictValue">
                </el-table-column>
                <el-table-column id="idsBczXk" label="字典排序" align="center" prop="dictSort">
                </el-table-column>
                <el-table-column id="idhTTn2W" label="状态" align="center" prop="status">
                    <template id="idvkVoNn" #default="scope">
                        <dict-tag id="idBZ86RR" :options="sys_normal_disable" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idGxtENQ" label="备注" align="center" prop="remark" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idcmj5Qd" label="创建时间" align="center" prop="createTime" width="180">
                    <template id="idVLKhKq" #default="scope">
                        <span id="idVOFZN3">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="iddNnLc4" label="操作" align="center" width="150" class-name="small-padding fixed-width">
                    <template id="idjH43FQ" #default="scope">
                        <el-button id="idXRRl7x" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:dict:edit']">
                            修改

                        </el-button>
                        <el-button id="idI8v5Vv" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:dict:remove']">
                            删除

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination id="idgSZpi6" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
                <!-- 添加或修改参数配置对话框 -->
            </pagination>
        </div>
        <el-dialog id="idDfptRv" v-model="open" :title="title" width="500px" append-to-body>
            <el-form id="iduZKdSo" ref="dataRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item id="idTRcuwp" label="字典类型">
                    <el-input id="iduj1QKv" v-model="form.dictType" :disabled="true">
                    </el-input>
                </el-form-item>
                <el-form-item id="idPfs2Om" label="数据标签" prop="dictLabel">
                    <el-input id="idq96DLl" v-model="form.dictLabel" placeholder="请输入数据标签">
                    </el-input>
                </el-form-item>
                <el-form-item id="idVLp36S" label="数据键值" prop="dictValue">
                    <el-input id="idhuXHbi" v-model="form.dictValue" placeholder="请输入数据键值">
                    </el-input>
                </el-form-item>
                <el-form-item id="idpA9ZQM" label="样式属性" prop="cssClass">
                    <el-input id="idMvoevQ" v-model="form.cssClass" placeholder="请输入样式属性">
                    </el-input>
                </el-form-item>
                <el-form-item id="idQ8Mkuv" label="显示排序" prop="dictSort">
                    <el-input-number id="idjJvHjK" v-model="form.dictSort" controls-position="right" :min="0">
                    </el-input-number>
                </el-form-item>
                <el-form-item id="id6jxcXZ" label="回显样式" prop="listClass">
                    <el-select id="idoGPbjq" v-model="form.listClass">
                        <el-option id="idJdVTAF" v-for="item in listClassOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idvQBpQm" label="状态" prop="status">
                    <el-radio-group id="idVqm3tb" v-model="form.status">
                        <el-radio id="idlBaoFu" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                            {{ dict.label }}

                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item id="idpMG2tF" label="备注" prop="remark">
                    <el-input id="idcH7qCu" v-model="form.remark" type="textarea" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
            </el-form>
            <template id="idxvrruB" #footer>
                <div id="idbmBpKH" class="dialog-footer ">
                    <el-button id="idotTtHe" @click="submitForm" type="primary">
                        确 定

                    </el-button>
                    <el-button id="idBBVG34" @click="cancel">
                        取 消

                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <!--ZiDianShuJuhtmlEnd-->

</template>

<script setup name="Data">
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable
    } = proxy.useDict("sys_normal_disable");


    const route = useRoute();
    // 数据标签回显样式

    // interfaceCode
    import {
        saveAddDictData,
        findWhereGetDictDataList,
        findOneDictDataInfo,
        updateDictData,
        removeDictData
    } from '../../../api/dictData.js'
    import {
        findOneGetDictType,
        findWhereGetDictList
    } from '../../../api/dict.js'

    // insertMethod
    // ZiDianShuJuMethodStart
    // 获取所有字典
    function getTypes(dictId) {
        findOneGetDictType({
            _id: dictId // 字典id  改用唯一id
        }).then(response => {
            queryParams.value.dictType = response.data.dictType;
            defaultDictType.value = response.data.dictType;
            getList();
        });
    }
    // 获取字典里的列表
    async function getTypeList() {
        let response = await findWhereGetDictList({
            start: 0, // 分页起始位置
            limit: 100, // 分页显示条数
            searchValue: '', // 搜索关键字
            createBy: '', // 创建人
            updateBy: '', // 更新人
            remark: '', // 标记
            params: '', // 参数
            dictId: '', // 字典id
            dictName: '', // 字典名称
            dictType: '', // 字典类型
            status: '' // 状态
        })
        typeOptions.value = response.data.list
    }
    // handleQuery
    function handleQuery() {

        queryParams.value.pageNum = 1;
        getList();

    }
    // reset
    function reset() {

        form.value = {
            dictCode: undefined,
            dictLabel: undefined,
            dictValue: undefined,
            cssClass: undefined,
            listClass: "default",
            dictSort: 0,
            status: "0",
            remark: undefined
        };
        proxy.resetForm("dataRef");

    }
    // resetQuery
    function resetQuery() {

        proxy.resetForm("queryRef");
        queryParams.value.dictType = defaultDictType;
        handleQuery();

    }
    // handleAdd
    function handleAdd() {
        reset();
        open.value = true;
        title.value = "添加字典数据";
        form.value.dictType = queryParams.value.dictType;
    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        const dictCode = row._id || ids.value;

        findOneDictDataInfo({
            _id: dictCode // 内容id
        }).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改字典数据";
        });
    }
    // handleDelete
    function handleDelete(row) {
        const dictCodes = row._id || ids.value;
        proxy.$modal.confirm('是否确认删除"' + (row.dictLabel || '所选') + '"的数据项？').then(function() {
            return removeDictData({
                _id: dictCodes // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // handleExport
    function handleExport() {

        proxy.download("system/dict/data/export", {
            ...queryParams.value
        }, `dict_data_${new Date().getTime()}.xlsx`);

    }
    // handleClose
    function handleClose() {

        const obj = {
            path: "/system/dict"
        };
        proxy.$tab.closeOpenPage(obj);

    }
    // getList
    async function getList() {
        loading.value = true;


        let params = {
            ...queryParams.value
        }
        params.start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize // 分页起始位置
        params.limit = queryParams.value.pageSize // 分页显示条数
        let data = await findWhereGetDictDataList(params)
        if (data) {
            dataList.value = data.data.list;
            total.value = data.data.total;
            loading.value = false;
        } else {

        }
        return
    }
    // handleSelectionChange
    function handleSelectionChange(selection) {

        ids.value = selection.map(item => item._id);
        single.value = selection.length != 1;
        multiple.value = !selection.length;

    }
    // submitForm
    function submitForm() {

        proxy.$refs["dataRef"].validate(valid => {
            if (valid) {
                if (form.value._id != undefined) {
                    updateDictData(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {

                    saveAddDictData(form.value).then(response => {
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

    // ZiDianShuJuMethodEnd


    // insertData
    // ZiDianShuJuDataStart

    // ids
    var ids = ref([])
    // defaultDictType
    const defaultDictType = ref('')
    // showSearch
    const showSearch = ref(true)
    // typeOptions
    const typeOptions = ref([])
    // single
    const single = ref(true)
    // multiple
    const multiple = ref(true)
    // loading
    const loading = ref(true)
    // dataList
    var dataList = ref([])
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
            dictLabel: [{
                required: true,
                message: "数据标签不能为空",
                trigger: "blur"
            }],
            dictValue: [{
                required: true,
                message: "数据键值不能为空",
                trigger: "blur"
            }],
            dictSort: [{
                required: true,
                message: "数据顺序不能为空",
                trigger: "blur"
            }]
        }
    })
    // total
    const total = ref(0)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // listClassOptions
    const listClassOptions = ref([{
            value: "default",
            label: "默认"
        },
        {
            value: "primary",
            label: "主要"
        },
        {
            value: "success",
            label: "成功"
        },
        {
            value: "info",
            label: "信息"
        },
        {
            value: "warning",
            label: "警告"
        },
        {
            value: "danger",
            label: "危险"
        }
    ])
    // ZiDianShuJuDataEnd
    const {
        queryParams,
        form,
        rules
    } = toRefs(data);

    // defaultLoad
    // ZiDianShuJuMountedStart
    getTypes(route.params && route.params.dictId);
    getTypeList();
    // ZiDianShuJuMountedEnd
</script>
<style>
    .ZiDianShuJucssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ZiDianShuJucssEnd {}
</style>