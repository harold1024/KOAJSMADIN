<template>
    <!--ZiDianGuanLiShouYehtmlStart-->

    <div id="defaultId1">
    </div>
    <!--ZiDianGuanLiShouYehtmlEnd-->

    <!--ShouYehtmlStart-->

    <div id="defaultId1" class=" uc1cfe">
        <el-button id="gb9e83" @click="initData()" class="  u543b8" type="primary" :loading="isInitLoading" v-hasPermi="['system:home:init']">初始化数据
        </el-button>
        <el-button id="g943eb" @click="openSlctSql()" type="primary">还原数据库
        </el-button>
        <div id="gc76b2">
        </div>
        <!-- <div id="geba55" class=" u844a1">
            <div id="idvcaHnf">
                <iframe id="idsIfDjA" src="//player.bilibili.com/player.html?aid=300076657&bvid=BV1MF411c7bg&cid=749217399&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="800">
                </iframe>
            </div>
        </div> -->
        <div id="ce40ca">
        </div>
        <div id="c15f2d">
        </div>
        <el-dialog id="c01587" v-model="dialogVisible" title="选择数据库" :visible.sync="dialogVisible">
            <div id="c1ddc1" @click="slctSql(item)" v-for="(item,index) in sqlList" class=" u7be4f">
                <div id="c8854c" class=" u3a1e1">{{item.name}}
                </div>
                <div id="g7cfaf">{{item.pathDir}}
                </div>
            </div>
            <div id="c908e0" class=" dialog-footer  u31391" slot="footer">
            </div>
        </el-dialog>
    </div>
    <!--ShouYehtmlEnd-->

</template>
<script setup>
    import request from '@/utils/request'
    import {
        reactive,
        toRefs,
        ref
    } from 'vue'
    const {
        proxy
    } = getCurrentInstance();
    // interfaceCode
    import {
        findOneMongoDirectory,
        saveMongoDataBackdown
    } from '../api/mongoData.js'
    import {
        updateTokenUser
    } from '../api/user.js'
    import {
        saveSystemInit
    } from '../api/system'

    // insertMethod
    // ZiDianGuanLiShouYeMethodStart

    // ZiDianGuanLiShouYeMethodEnd

    // ShouYeMethodStart
    // 初始化数据
    async function initData() {
        isInitLoading.value = true
        try {
            let data = await saveSystemInit({})
            if (data) {
                proxy.$modal.msgSuccess("初始化成功");
            } else {
                proxy.$modal.msgError("初始化失败");
            }
        } catch (err) {

        }
        isInitLoading.value = false

    }
    // 打开数据库选择弹框
    async function openSlctSql() {
        dialogVisible.value = true
        sqlSlct.value = {}

        let data = await findOneMongoDirectory({})
        if (data) {
            console.log(data)
            sqlList.value = data.data
        } else {

        }
    }
    // 选择对应的数据库
    async function slctSql(item) {
        sqlSlct.value = item
        dialogVisible.value = false
        proxy.$nextTick(() => {
            proxy.$confirm('还原数据库会清除之前的数据，请做好备份，确定要还原吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                saveMongoDataBackdown({
                    pathDir: sqlSlct.value.pathDir // 目录
                }).then((data) => {
                    if (data) {
                        proxy.$message({
                            type: 'success',
                            message: '还原成功!'
                        });
                    } else {
                        proxy.$message({
                            type: 'success',
                            message: '还原失败!'
                        });
                    }
                }).catch(() => {
                    proxy.$message({
                        type: 'info',
                        message: '还原取消'
                    });
                });


            }).catch(() => {
                proxy.$message({
                    type: 'info',
                    message: '还原取消'
                });
            });
        })
    }

    // ShouYeMethodEnd

    // insertData
    // ZiDianGuanLiShouYeDataStart

    // ZiDianGuanLiShouYeDataEnd

    // ShouYeDataStart

    // 点击初始化进行中
    const isInitLoading = ref(false)
    // 
    const dialogVisible = ref(false)
    // 所选的数据库
    const sqlSlct = ref({})
    // 数据库列表
    const sqlList = ref([{
        name: '2022-8-22-15-48',
        pathDir: 'D://aaa/fsfs/fsfs/2022-8-22-15-48'
    }, {
        name: '2022-8-23-15-48',
        pathDir: 'D://aaa/fsfs/fsfs/2022-8-23-15-48'
    }, {
        name: '2022-9-23-15-48',
        pathDir: 'D://aaa/fsfs/fsfs/2022-9-23-15-48'
    }])
    // ShouYeDataEnd

    // defaultLoad
    // ZiDianGuanLiShouYeMountedStart

    // ZiDianGuanLiShouYeMountedEnd

    // ShouYeMountedStart

    // ShouYeMountedEnd
</script>
<style>
    .ZiDianGuanLiShouYecssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ZiDianGuanLiShouYecssEnd {}

    .ShouYecssStart {}

    .uc1cfe {
        padding-top: 1em;
        padding-left: 1em;
        padding-right: 1em;
        padding-bottom: 1em;
    }

    .u543b8 {
        margin-top: 1em;
        margin-left: 1em;
        margin-right: 1em;
        margin-bottom: 1em;
    }

    .u844a1 {
        margin-top: 14px;
    }

    .u7be4f {
        margin-bottom: 0.5em;
        margin-top: 15px;
        cursor: pointer;
    }

    .u3a1e1 {
        margin-bottom: 0.5em;
        font-weight: bold;
    }

    .u31391 {
        margin-top: 15px;
    }

    .u7be4f:hover {
        color: rgba(36, 115, 244, 1);
    }

    .ShouYecssEnd {}
</style>