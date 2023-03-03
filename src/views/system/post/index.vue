<template>
    <!--GangWeiGuanLihtmlStart-->

    <div id="defaultId1">
        <div id="idZGpxX8" class="app-container ">
            <el-form id="idlnU4KV" v-show="showSearch" :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
                <el-form-item id="id4Zgv82" label="岗位名称" prop="postName">
                    <el-input id="id4U8tAM" v-model="queryParams.postName" placeholder="请输入岗位名称" clearable @keyup.enter="handleQuery">
                    </el-input>
                </el-form-item>
                <el-form-item id="idonvDVv" label="状态" prop="status">
                    <el-select id="idVmw9x6" v-model="queryParams.status" placeholder="岗位状态" clearable>
                        <el-option id="id9ZAVf8" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item id="idlHubvX">
                    <el-button id="idnDn8fT" @click="handleQuery" type="primary" icon="Search">
                        搜索

                    </el-button>
                    <el-button id="id9jtFfC" @click="resetQuery" icon="Refresh">
                        重置

                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="idxi9DLS" class="mb8 " :gutter="10">
                <el-col id="idUSN1qH" class=" ubd5dd" :span="1.5">
                    <el-button id="idFf2bRH" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['system:post:add']">
                        新增

                    </el-button>
                </el-col>
                <el-col id="idC1Vsje" v-show="false" :span="1.5">
                    <el-button id="idSToC23" @click="handleUpdate" type="success" plain icon="Edit" :disabled="single" v-hasPermi="['system:post:edit']">
                        修改

                    </el-button>
                </el-col>
                <el-col id="idrLTINv" :span="1.5">
                    <el-button id="idGQ9cXS" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['system:post:remove']">
                        删除

                    </el-button>
                </el-col>
                <el-col id="iddOJxHW" v-show="false" :span="1.5">
                    <el-button id="idmrLtpQ" @click="handleExport" type="warning" plain icon="Download" v-hasPermi="['system:post:export']">
                        导出

                    </el-button>
                </el-col>
                <right-toolbar id="idpVlRPT" v-model:showsearch="showSearch" @queryTable="getList">
                </right-toolbar>
            </el-row>
            <el-table id="idKunK2I" v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
                <el-table-column id="idwvrVMh" type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column id="idJzRQXn" label="岗位编码" align="center" prop="postCode">
                </el-table-column>
                <el-table-column id="id1jqvTd" label="岗位名称" align="center" prop="postName">
                </el-table-column>
                <el-table-column id="idVmcseZ" label="岗位排序" align="center" prop="postSort">
                </el-table-column>
                <el-table-column id="idI47RsW" label="状态" align="center" prop="status">
                    <template id="idViZ9Kh" #default="scope">
                        <dict-tag id="idnznncr" :options="sys_normal_disable" :value="scope.row.status">
                        </dict-tag>
                    </template>
                </el-table-column>
                <el-table-column id="idMsh5mk" label="创建时间" align="center" prop="createTime" width="180">
                    <template id="idozFZe3" #default="scope">
                        <span id="idj1Afdr">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="id54eqE1" label="操作" align="center" class-name="small-padding fixed-width">
                    <template id="idDnnRof" #default="scope">
                        <el-button id="idVFeVqM" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['system:post:edit']">
                            修改

                        </el-button>
                        <el-button id="idJrKsnN" @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['system:post:remove']">
                            删除

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination id="idwAlLDv" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList">
            </pagination>
            <!-- 添加或修改岗位对话框 -->
            <el-dialog id="idcRBATH" v-model="open" :title="title" width="500px" append-to-body>
                <el-form id="idFXa1TZ" ref="postRef" :model="form" :rules="rules" label-width="80px">
                    <el-form-item id="idjBbi4B" label="岗位名称" prop="postName">
                        <el-input id="idFeAvrU" v-model="form.postName" placeholder="请输入岗位名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item id="idioJUGi" label="岗位编码" prop="postCode">
                        <el-input id="idElhCU8" v-model="form.postCode" placeholder="请输入编码名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item id="idcVeZvH" label="岗位顺序" prop="postSort">
                        <el-input-number id="idCKrfCA" v-model="form.postSort" controls-position="right" :min="0">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item id="idEBq5va" label="岗位状态" prop="status">
                        <el-radio-group id="id7IgVCx" v-model="form.status">
                            <el-radio id="idzvaax1" v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">
                                {{ dict.label }}

                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item id="idOWowzs" label="备注" prop="remark">
                        <el-input id="idDsAkXq" v-model="form.remark" type="textarea" placeholder="请输入内容">
                        </el-input>
                    </el-form-item>
                </el-form>
                <template id="idfTWFKn" #footer>
                    <div id="idkGfDQA" class="dialog-footer ">
                        <el-button id="id7oqvr7" @click="submitForm" type="primary">
                            确 定

                        </el-button>
                        <el-button id="idu2GHfG" @click="cancel">
                            取 消

                        </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
    <!--GangWeiGuanLihtmlEnd-->

</template>

<script setup name="Post">
    const {
        proxy
    } = getCurrentInstance();
    const {
        sys_normal_disable
    } = proxy.useDict("sys_normal_disable");















    /** 查询岗位列表 */

    /** 取消按钮 */

    /** 表单重置 */

    /** 搜索按钮操作 */

    /** 重置按钮操作 */

    /** 多选框选中数据 */

    /** 新增按钮操作 */

    /** 修改按钮操作 */

    /** 提交按钮 */

    /** 删除按钮操作 */

    /** 导出按钮操作 */





    // interfaceCode
    import {
        findWherePost,
        findOnePost,
        updatePost,
        savePost,
        removePost
    } from '../../../api/post.js'

    // insertMethod
    // GangWeiGuanLiMethodStart
    // 
    function handleQuery(搜索按钮点击) {
        queryParams.value.pageNum = 1;
        getList();
    }
    // reset
    function reset() {

        form.value = {
            postId: undefined,
            postCode: undefined,
            postName: undefined,
            postSort: 0,
            status: "0",
            remark: undefined
        };
        proxy.resetForm("postRef");

    }
    // resetQuery
    function resetQuery() {

        proxy.resetForm("queryRef");
        handleQuery();

    }
    // handleAdd
    function handleAdd() {

        reset();
        open.value = true;
        title.value = "添加岗位";

    }
    // handleUpdate
    function handleUpdate(row) {
        reset();
        const postId = row._id || ids.value;

        findOnePost({
            _id: postId // 数据唯一id
        }).then(response => {
            form.value = response.data;
            open.value = true;
            title.value = "修改岗位";
        });
    }
    // handleDelete
    function handleDelete(row) {
        const postIds = row._id || ids.value;
        proxy.$modal.confirm('是否确认删除"' + (row.postName || '所选') + '"的数据项？').then(function() {

            return removePost({
                _id: postIds // 数据唯一id
            });
        }).then(() => {
            getList();
            proxy.$modal.msgSuccess("删除成功");
        }).catch(() => {});
    }
    // handleExport
    function handleExport() {

        proxy.download("system/post/export", {
            ...queryParams.value
        }, `post_${new Date().getTime()}.xlsx`);

    }
    // getList
    function getList() {
        loading.value = true;
        let params = {
            ...queryParams.value
        }
        params.start = (params.pageNum - 1) * params.pageSize
        params.limit = params.pageSize

        findWherePost(params).then(response => {
            postList.value = response.data.list;
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
    // submitForm
    function submitForm() {

        proxy.$refs["postRef"].validate(valid => {
            if (valid) {
                if (form.value._id != undefined) {
                    updatePost(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    savePost(form.value).then(response => {
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

    // GangWeiGuanLiMethodEnd


    // insertData
    // GangWeiGuanLiDataStart

    // ids
    var ids = ref([])
    // data
    var data = reactive({
        form: {},
        queryParams: {
            pageNum: 1,
            pageSize: 10,
            postCode: undefined,
            postName: undefined,
            status: undefined
        },
        rules: {
            postName: [{
                required: true,
                message: "岗位名称不能为空",
                trigger: "blur"
            }],
            postCode: [{
                required: true,
                message: "岗位编码不能为空",
                trigger: "blur"
            }],
            postSort: [{
                required: true,
                message: "岗位顺序不能为空",
                trigger: "blur"
            }],
        }
    })
    // showSearch
    const showSearch = ref(true)
    // single
    const single = ref(true)
    // multiple
    const multiple = ref(true)
    // loading
    const loading = ref(true)
    // postList
    var postList = ref([])
    // total
    const total = ref(0)
    // title
    const title = ref('')
    // open
    const open = ref(false)
    // GangWeiGuanLiDataEnd
    const {
        queryParams,
        form,
        rules
    } = toRefs(data);

    // defaultLoad
    // GangWeiGuanLiMountedStart
    getList()
    // GangWeiGuanLiMountedEnd
</script>
<style>
    .GangWeiGuanLicssStart {}

    .ubd5dd {
        display: flex;
    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .GangWeiGuanLicssEnd {}
</style>