<template>
    <!--DengLuRiZhihtmlStart-->

    <div id="defaultId1">
        <div id="ide3KaFc" class="app-container ">
            <el-form id="idhEggs4" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
                <el-form-item id="idJKlvib" label="登录地址" prop="ipaddr">
                    <el-input id="iduq9IHH" v-model="queryParams.ipaddr" placeholder="请输入登录地址" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="id7dq1R6" label="用户名称" prop="userName">
                    <el-input id="idaqb2Sp" v-model="queryParams.userName" placeholder="请输入用户名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idTAhdOk" label="状态" prop="status">
                    <el-select id="idxjAOVr" v-model="queryParams.status" placeholder="登录状态" clearable>
                        <el-option id="idMZnNIW" v-for="dict in sys_common_status" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="c12894" class=" u997e7" label="当天时间" prop="isCurrentTime">
                    <div id="ccdaa4">
                        <el-radio id="c808f4" v-model="queryParams.isCurrentTime" :label="true" @change="getList">当天时间
                        </el-radio>
                        <el-radio id="cb1cd7" v-model="queryParams.isCurrentTime" label @change="getList">自定义时间
                        </el-radio>
                    </div>
                </el-form-item>
                <el-form-item id="idrNuTSI" v-show="!queryParams.isCurrentTime" class=" uf8d3d" label="登录时间">
                    <el-date-picker id="idJ7wqFB" v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item id="idBHvbfF">
                    <el-button id="idwttSvH" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="ideL4cV9" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idHMt6iX" class="mb8 " :gutter="10">
                <el-col id="idBl9nmW" :span="1.5">
                    <el-button id="idR5EL2v" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:logininfor:remove']">
                        删除

                    </el-button>
                </el-col>
                <el-col id="idzFEqTt" :span="1.5">
                    <el-button id="idZ6qGik" @click="handleClean" type="danger" plain icon="Delete" v-hasPermi="['system:logininfor:remove']">
                        清空

                    </el-button>
                </el-col>
                <el-col id="ide3jTKa" :span="1.5">
                    <el-button id="idMOXH78" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:logininfor:export']">
                        导出

                    </el-button>
                </el-col>
                <right-toolbar id="idlRimjW" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idjxwcBd" ref="logininforRef" v-loading="loading" :data="logininforList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
                <el-table-column id="id3JpDFi" type="selection" width="55" align="center" ids="culumn1">
                </el-table-column>
                <el-table-column id="id7CfwB9" label="访问编号" align="center" prop="infoId">
                </el-table-column>
                <el-table-column id="idjkuDDv" label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']">
                </el-table-column>
                <el-table-column id="idAmAHkG" label="地址" align="center" prop="ipaddr" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idvX5wuF" label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idfsqKm8" label="操作系统" align="center" prop="os" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idFaxzBk" label="浏览器" align="center" prop="browser" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column id="idtOKZhR" label="登录状态" align="center" prop="status">
                    <template id="idZ5gZ7R" #default="scope">
                        <dict-tag id="idEMURoq" :options="sys_common_status" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idonXtQV" label="描述" align="center" prop="msg">
                </el-table-column>
                <el-table-column id="idEOoeVx" label="访问时间" align="center" prop="loginTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
                    <template id="idx3rui9" #default="scope">
                        <span id="idOgO7BK">
                            {{ parseTime(scope.row.loginTime) }}

                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination id="idHvAzbD" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
            </pagination>
        </div>
    </div>
    <!--DengLuRiZhihtmlEnd-->

</template>

<script setup name="Logininfor">
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_common_status
    } = proxy.useDict("sys_common_status");


    // interfaceCode
    import {
        findWhereLogininfor,
        removeLogininfor,
        removeLogininforAll
    } from '../../../api/logininfor.js'

    // insertMethod
    // DengLuRiZhiMethodStart
    // 搜索按钮操作
    function handleQuery() {

        queryParams.value.pageNum = 1;
        getList();

    }
    // 重置按钮操作
    function resetQuery() {

        dateRange.value = [];
        proxy.resetForm("queryRef");
        proxy.$refs["logininforRef"].sort(defaultSort.value.prop, defaultSort.value.order);
        handleQuery();

    }
    // 删除操作
    function handleDelete(row) {
        const infoIds = row._id || ids.value;
        proxy.$modal.confirm('是否确认删除"' + '所选' + '"的数据项?').then(function() {

            return removeLogininfor({
                _id: infoIds // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // 清空操作
    function handleClean() {
        proxy.$modal.confirm("是否确认清空所有登录日志数据项?").then(function() {

            return removeLogininforAll({});
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("清空成功");
        }).catch(() => {});
    }
    // 导出按钮操作
    function handleExport() {

        proxy.download("monitor/logininfor/export", {
            ...queryParams.value,
        }, `config_${new Date().getTime()}.xlsx`);

    }
    // 查询数据
    function getList() {
        loading.value = true;

        let params = {
            ...queryParams.value
        }

        params.start = (params.pageNum - 1) * params.pageSize
        params.limit = params.pageSize
        if (dateRange.value) {
            params.startTime = dateRange.value[0]
            params.endTime = dateRange.value[1]
        }


        // queryParams.value, dateRange.value

        findWhereLogininfor(params).then(response => {
            logininforList.value = response.data.list;
            total.value = response.data.total;
            loading.value = false;
        });
    }
    // 监听表格的选择项
    function handleSelectionChange(selection) {

        ids.value = selection.map(item => item._id);
        multiple.value = !selection.length;

    }
    // 监听表格排序
    function handleSortChange(column, prop, order) {

        queryParams.value.orderByColumn = column.prop;
        queryParams.value.isAsc = column.order;
        getList();

    }

    // DengLuRiZhiMethodEnd


    // insertData
    // DengLuRiZhiDataStart

    // 所选表格列表id
    var ids = ref([])
    // 查询参数
    var queryParams = ref({
        pageNum: 1,
        pageSize: 10,
        ipaddr: undefined,
        userName: undefined,
        status: undefined,
        orderByColumn: undefined,
        isAsc: undefined,
        isCurrentTime: ''
    })
    // 显示搜索
    const showSearch = ref(true)
    // dateRange
    var dateRange = ref([])
    // 不可点状态
    const multiple = ref(true)
    // loading
    const loading = ref(true)
    // logininforList
    var logininforList = ref([])
    // 默认排序
    var defaultSort = ref({
        prop: "loginTime",
        order: "descending"
    })
    // 页数统计
    const total = ref(0)
    // DengLuRiZhiDataEnd


    // defaultLoad
    // DengLuRiZhiMountedStart
    getList()
    // DengLuRiZhiMountedEnd
</script>
<style>
    .DengLuRiZhicssStart {}

    .u997e7 {
        width: 100%;
    }

    .uf8d3d {
        width: 100%;
    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .DengLuRiZhicssEnd {}
</style>