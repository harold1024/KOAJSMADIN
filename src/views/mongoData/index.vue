<template>
    <!--ShuJuKuhtmlStart-->

    <div id="defaultId1" class=" u43f13">
        <div id="c39a19" class="app-container ">
            <el-form id="c0c580" label-width="68px" :model="queryParams" :inline="true" ref="queryRef">
                <el-form-item id="cffab5" label="名称" prop="name">
                    <el-input id="cc98f6" v-model="queryParams.name" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item id="cd7194" label="目录" prop="pathDir">
                    <el-input id="c5fe93" v-model="queryParams.pathDir" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item id="c6aa73" label="下载地址" prop="downUrl">
                    <el-input id="c1bd57" v-model="queryParams.downUrl" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item id="c6021e" label="下载次数" prop="downNum">
                    <el-input-number id="c37b62" v-model="queryParams.downNum" placeholder="请输入内容">
                    </el-input-number>
                </el-form-item>
                <el-form-item id="c5214a" label="创建日期" prop="createTime">
                    <el-date-picker id="c3396c" v-model="queryParams.createTime" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item id="ceb63d">
                    <el-button id="c6cc5d" :loading="handleQueryloading" @click="handleQuery" icon="Search" type="primary">查询
                    </el-button>
                    <el-button id="c407a1" @click="resetQuery" icon="Refresh">重置
                    </el-button>
                </el-form-item>
            </el-form>
            <el-row id="c4e1b1" class="  ud5872">
                <el-col id="c0ff96" class="  u30542" :span="1.5">
                    <el-button id="cb501a" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['add']">新增
                    </el-button>
                </el-col>
                <el-col id="c38721" class="  uee2e5" :span="1.5">
                    <el-button id="c44364" @click="handleDelete" type="danger" plain icon="Delete" :disabled="multiple" v-hasPermi="['delete']">删除
                    </el-button>
                </el-col>
                <div id="g3b150" class=" u597a7">
                    <el-button id="g2ca87" @click="backup()" type="primary">一键备份数据库
                    </el-button>
                </div>
            </el-row>
            <el-table id="c1f74d" v-loading="loading" :data="mongoDataList" @selection-change="handleSelectionChange">
                <el-table-column id="c0e6c1" type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column id="cf7b34" prop="name" label="名称">
                </el-table-column>
                <el-table-column id="c52a26" prop="pathDir" label="目录">
                </el-table-column>
                <el-table-column id="c24741" prop="createTime" label="备份时间">
                    <template id="c85f5b" #default="scope">
                        <span id="c5627b">
                            {{ parseTime(scope.row.createTime) }}

                        </span>
                    </template>
                </el-table-column>
                <el-table-column id="c8fb0d" prop="downUrl" label="下载地址">
                </el-table-column>
                <el-table-column id="c1dd18" label="操作" align="center" width="120px" fixed="right">
                    <template id="c844b7" #default="scope">
                        <div id="cb7c2e" class="  u8f6b2">
                            <el-button id="c0158f" @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['edit']">编辑
                            </el-button>
                            <el-button id="ca1f0f" @click="handleDelete(scope.row)" class="  u6201e" type="text" icon="Delete" v-hasPermi="['delete']">删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination id="c4736b" v-show="pages.total > 0" class="  u2a50d" layout="sizes, prev, pager, next" :total="pages.total" :current-page="pages.pageNum" :page-size="pages.pageSize" @current-change="changePage" @size-change="changeSize">
            </el-pagination>
            <el-dialog id="c8f18b" v-model="open" :title="title" append-to-body>
                <el-form id="c433bf" ref="mongoDataRef" :model="form" :rules="rules" label-width="80px">
                    <el-form-item id="c88bc0" label="名称" prop="name">
                        <el-input id="cc9518" v-model="form.name" placeholder="请输入内容">
                        </el-input>
                    </el-form-item>
                    <el-form-item id="c53738" label="下载地址" prop="downUrl">
                        <el-input id="ca090e" v-model="form.downUrl" placeholder="请输入内容">
                        </el-input>
                    </el-form-item>
                    <el-form-item id="cf77f6" label="目录" prop="pathDir">
                        <el-input id="c767eb" v-model="form.pathDir" placeholder="请输入内容">
                        </el-input>
                    </el-form-item>
                    <el-form-item id="c500c0" label="下载次数" prop="downNum">
                        <el-input-number id="ce38e5" v-model="form.downNum" placeholder="请输入内容">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item id="c154de">
                        <el-button id="c3c445" :loading="isSubmitloading" @click="submitForm" type="primary">确定
                        </el-button>
                        <el-button id="cf301a" @click="cancel" type="default">取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
    <!--ShuJuKuhtmlEnd-->

</template>
<script setup>
    import {
        reactive,
        toRefs,
        ref,
        getCurrentInstance
    } from 'vue'
    const {
        proxy
    } = getCurrentInstance();
    // interfaceCode
    import {
        saveMongoData,
        updateMongoData,
        findWhereMongoData,
        removeMongoData,
        findOneMongoData,
        saveMongoDataBackup
    } from '../../api/mongoData.js'
    // insertMethod
    // ShuJuKuMethodStart
    // 点击搜索
    async function handleQuery() {
        pages.value.pageNum = 1 // 页数改为1页
        handleQueryloading.value = true // 搜索中
        try {
            await getList() // 查询数据
        } catch (err) {
            console.log('查询失败')
        }
        handleQueryloading.value = false // 关闭搜索


    }
    // 重置表单
    function resetQuery() {
        proxy.resetForm("queryRef");
        handleQuery();
    }
    // 打开新增弹框
    function handleAdd() {
        reset()
        open.value = true
        title.value = "添加"

    }
    // 备份数据库
    async function backup() {
        let data = await saveMongoDataBackup({
            name: '', // 名称
            pathDir: '', // 目录
            downNum: '', // 下载次数
            downUrl: '' // 下载地址
        })
        if (data) {
            proxy.$message({
                message: '备份完成',
                type: 'success'
            });
            getList()
        } else {

        }
    }
    // 选中表单列
    async function handleSelectionChange(selection) {
        ids.value = selection.map(item => item._id)
        multiple.value = !selection.length

    }
    // 获取表格数据
    async function getList() {
        loading.value = true;
        let params = {
            ...queryParams.value
        }
        params.start = (pages.value.pageNum - 1) * pages.value.pageSize
        params.limit = pages.value.pageSize
        if (params.createTime && params.createTime.length > 0) {
            params.startTime = params.createTime[0]
            params.endTime = params.createTime[1]
        }
        try {
            let response = await findWhereMongoData(params)
            if (response) {
                mongoDataList.value = response.data.list
                pages.value.total = response.data.total
                loading.value = false
            }
        } catch (err) {

        }



    }
    // 修改按钮事件
    async function handleUpdate(row) {
        reset();
        open.value = true;
        title.value = "修改";
        const _id = row._id || ids.value;
        const response = await findOneMongoData({
            _id // 数据唯一id
        })
        form.value = response.data;



    }
    // 删除操作
    async function handleDelete(row) {
        const id = row._id || ids.value // ids用来批量删除
        const isTure = await proxy.$modal.confirm('是否确认删除"' + (row.dictName || '所选') + '"的数据项？')
        if (isTure) {
            const data = await removeMongoData({
                _id: id // 数据唯一id
            })
            if (data) {
                getList()
                proxy.$modal.msgSuccess("删除成功")
            }
        }

    }
    // 当尺寸变化时
    async function changeSize(num) {

        pages.value.pageSize = num
        getList()
    }
    // 页数变化
    async function changePage(num) {

        pages.value.pageNum = num
        getList()
    }
    // 重置
    async function reset(num) {

        form.value._id = ''
        proxy.resetForm("mongoDataRef");
    }
    // 提交表单
    function submitForm() {

        proxy.$refs["mongoDataRef"].validate(valid => {
            if (valid) {
                if (form.value._id) {
                    updateMongoData(form.value).then(response => {
                        proxy.$modal.msgSuccess("修改成功");
                        open.value = false;
                        getList();
                    });
                } else {
                    saveMongoData(form.value).then(response => {
                        proxy.$modal.msgSuccess("新增成功");
                        open.value = false;
                        getList();
                    });
                }
            }
        })

    }
    // 取消
    function cancel() {
        open.value = false
        reset()

    }

    // ShuJuKuMethodEnd

    // insertData
    // ShuJuKuDataStart

    // 是否显示参数搜索
    const showSearch = ref(true)
    // 查询参数
    const queryParams = ref({
        name: '', // 名称
        pathDir: '', // 目录
        downNum: 0, // 下载次数
        createTime: [], // 创建时间
        downUrl: '' // 下载地址
    })
    // 加载中
    const handleQueryloading = ref(false)
    // 是否没选中
    const multiple = ref(true)
    // 表格数据
    var mongoDataList = ref([])
    // 所选id
    var ids = ref([])
    // 表格加载中
    const loading = ref(false)
    // 分页数据
    const pages = ref({
        pageNum: 1,
        pageSize: 10,
        total: 0
    })
    // 对话框显示
    const open = ref(false)
    // 标题
    const title = ref('提示')
    // 表单检验
    const rules = ref({
        name: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
        }],
        pathDir: [{
            required: true,
            message: '目录不能为空',
            trigger: 'blur'
        }],
        downNum: [{
            required: true,
            message: '下载次数不能为空',
            trigger: 'blur'
        }],
        downUrl: [{
            required: true,
            message: '下载地址不能为空',
            trigger: 'blur'
        }]
    })
    // 表单数据
    const form = ref({
        id: '', // 唯一id
        name: '', // 名称
        pathDir: '', // 目录
        downNum: 0, // 下载次数
        downUrl: '' // 下载地址
    })
    // 加载中
    const isSubmitloading = ref(false)
    // ShuJuKuDataEnd

    // defaultLoad
    // ShuJuKuMountedStart
    getList()
    // ShuJuKuMountedEnd
</script>
<style>
    .ShuJuKucssStart {}

    .u43f13 {
        align-items: center;
    }

    .ud5872 {
        margin-bottom: 0.5em;
    }

    .u30542 {
        margin-right: 10px
    }

    .uee2e5 {
        margin-bottom: 0.5em;
    }

    .u597a7 {
        margin-left: 0.5em;
    }

    .u8f6b2 {
        display: flex;
        justify-content: center;
    }

    .u6201e {
        color: rgba(255, 69, 0, 1);
    }

    .u2a50d {
        margin-top: 0.5em;
    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ShuJuKucssEnd {}
</style>