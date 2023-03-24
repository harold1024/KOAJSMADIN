<!-- 站点管理 -->
<template>
  <div class="app-container ">
    <el-row>
      <el-col :span="1.5">
        <el-button id="cb501a" @click="handleAdd" type="primary" plain icon="Plus" v-hasPermi="['add']">新增
        </el-button>
      </el-col>
    </el-row>
    <el-table id="c1f74d" v-loading="loading" :data="mongoDataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="_id" label="站点id"></el-table-column>
      <el-table-column prop="siteName" label="站点名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column id="c1dd18" label="操作" align="center" width="120px" fixed="right">
        <template #default="scope">
          <div class="  u8f6b2">
            <el-button @click="handleUpdate(scope.row)" type="text" icon="Edit" v-hasPermi="['edit']">
              编辑
            </el-button>
            <el-button @click="handleDelete(scope.row)" type="text" icon="Delete" v-hasPermi="['delete']">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="pages.total > 0" layout="sizes, prev, pager, next" :total="pages.total"
      :current-page="pages.pageNum" :page-size="pages.pageSize" @current-change="changePage" @size-change="changeSize">
    </el-pagination>
    <el-dialog v-model="open" :title="title" append-to-body>
      <el-form ref="mongoDataRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="站点名称" :label-width="formLabelWidth">
          <el-input v-model="form.siteName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="isSubmitloading" @click="submitForm" type="primary">确定
          </el-button>
          <el-button @click="cancel" type="default">取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
// import { log } from 'console';
import {
  reactive,
  toRefs,
  ref,
  getCurrentInstance
} from 'vue'
// interfaceCode
import {
  saveSiteManage,
  updateSiteManage,
  findWhereSiteManage,
  removeSiteManage,
  findOneSiteManage,
  // saveSiteManageBackup
} from '../../../api/siteMonitor/siteManage.js'
const {
  proxy
} = getCurrentInstance();

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

// 选中表单列
async function handleSelectionChange(selection) {
  ids.value = selection.map(item => item._id)
  multiple.value = !selection.length

}
// 获取表格数据
async function getList() {
  loading.value = true;
  let params = {
    // ...queryParams.value
  }
  params.start = (pages.value.pageNum - 1) * pages.value.pageSize
  params.limit = pages.value.pageSize
  // if (params.createTime && params.createTime.length > 0) {
  //   params.startTime = params.createTime[0]
  //   params.endTime = params.createTime[1]
  // }
  try {
    let response = await findWhereSiteManage(params)
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
  const response = await findOneSiteManage({
    _id // 数据唯一id
  })
  form.value = response.data;



}
// 删除操作
async function handleDelete(row) {
  const id = row._id || ids.value // ids用来批量删除
  const isTure = await proxy.$modal.confirm('是否确认删除"' + (row.dictName || '所选') + '"的数据项？')
  if (isTure) {
    const data = await removeSiteManage({
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
        console.log(form.value)
        updateSiteManage(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        saveSiteManage(form.value).then(response => {
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
  siteName: '', // 名称
  // pathDir: '', // 目录
  // downNum: 0, // 下载次数
  // downUrl: '' // 下载地址
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