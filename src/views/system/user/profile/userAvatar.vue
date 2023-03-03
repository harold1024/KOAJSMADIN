<template>
    <!--TouXiangShangChuanChaJianhtmlStart-->

    <div id="defaultId1">
        <div id="idD4WsmA" @click="editCropper()" class=" user-info-head">
            <img id="idK8OLct" class="img-circle img-lg " :src="options.img" title="点击上传头像" />
        </div>
        <div id="g6097b">
        </div>
        <el-dialog id="idhNwv5U" v-model="open" :title="title" width="800px" append-to-body @opened="modalOpened" @close="closeDialog">
            <el-row id="id3WwRPn">
                <el-col id="idCdXZHl" :style="{height: '350px'}" :xs="24" :md="12">
                    <vue-cropper id="idgR5DJ6" ref="cropper" :img="options.img" :info="true" :autoCrop="options.autoCrop" :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight" :fixedBox="options.fixedBox" @realTime="realTime" v-if="visible">
                    </vue-cropper>
                </el-col>
                <el-col id="idxG57Im" :style="{height: '350px'}" :xs="24" :md="12">
                    <div id="idMVkaz8" class="avatar-upload-preview ">
                        <img id="idTcOC68" :style="options.previews.img" :src="options.previews.url" />
                    </div>
                </el-col>
            </el-row>
            <br id="idM19UbP" />
            <el-row id="idQSzVlE">
                <el-col id="idHug4QP" :lg="3" :md="3">
                    <el-upload id="id1K8eno" action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
                        <el-button id="idGCsNnv">
                            <el-icon id="idvJKAnE" class="el-icon--right ">
                                <Upload id="idtXShvi">
                                </Upload>
                            </el-icon>
                            <span id="iduWBCOR">选择
                            </span>
                        </el-button>
                    </el-upload>
                </el-col>
                <el-col id="idB65wPx" :lg="{span: 1, offset: 2}" :md="2">
                    <el-button id="id2eqsL5" @click="changeScale(1)" icon="Plus">
                    </el-button>
                </el-col>
                <el-col id="idkFw675" :lg="{span: 1, offset: 1}" :md="2">
                    <el-button id="idK9Ss1U" @click="changeScale(-1)" icon="Minus">
                    </el-button>
                </el-col>
                <el-col id="idJ26Bdq" :lg="{span: 1, offset: 1}" :md="2">
                    <el-button id="idD6UuNG" @click="rotateLeft()" icon="RefreshLeft">
                    </el-button>
                </el-col>
                <el-col id="idZOJuuP" :lg="{span: 1, offset: 1}" :md="2">
                    <el-button id="idVilsc9" @click="rotateRight()" icon="RefreshRight">
                    </el-button>
                </el-col>
                <el-col id="idixzIKT" :lg="{span: 2, offset: 6}" :md="2">
                    <el-button id="iduL8K4k" @click="uploadImg()" type="primary">
                        <span id="idWRnMAQ">提 交
                        </span>
                    </el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
    <!--TouXiangShangChuanChaJianhtmlEnd-->

</template>

<script setup>
    import "vue-cropper/dist/index.css";
    import {
        VueCropper
    } from "vue-cropper";
    import {
        uploadAvatar
    } from "@/api/user";
    import useUserStore from '@/store/modules/user'

    const userStore = useUserStore()
    const {
        proxy
    } = getCurrentInstance();




    // interfaceCode

    // insertMethod
    // TouXiangShangChuanChaJianMethodStart
    // editCropper
    function editCropper() {

        open.value = true;

    }
    // modalOpened
    function modalOpened() {

        visible.value = true;

    }
    // closeDialog
    function closeDialog() {

        options.img = userStore.avatar;
        options.visible = false;

    }
    // realTime
    function realTime(data) {

        options.previews = data;

    }
    // requestUpload
    function requestUpload() {


    }
    // beforeUpload
    function beforeUpload(file) {

        if (file.type.indexOf("image/") == -1) {
            proxy.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                options.img = reader.result;
            };
        }

    }
    // changeScale
    function changeScale(num) {

        num = num || 1;
        proxy.$refs.cropper.changeScale(num);

    }
    // rotateLeft
    function rotateLeft() {

        proxy.$refs.cropper.rotateLeft();

    }
    // rotateRight
    function rotateRight() {

        proxy.$refs.cropper.rotateRight();

    }
    // uploadImg
    function uploadImg() {
        proxy.$refs.cropper.getCropBlob(data => {
            let formData = new FormData();
            formData.append("file", data);
            uploadAvatar(formData).then(response => {
                open.value = false;
                options.img = response.data.file;
                userStore.avatar = options.img;
                proxy.$modal.msgSuccess("修改成功");
                visible.value = false;
            });
        });

    }

    // TouXiangShangChuanChaJianMethodEnd


    // insertData
    // TouXiangShangChuanChaJianDataStart

    // options
    var options = reactive({
        img: userStore.avatar, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        previews: {} //预览数据
    })
    // title
    const title = ref('修改头像')
    // open
    const open = ref(false)
    // visible
    const visible = ref(false)
    // TouXiangShangChuanChaJianDataEnd


    // defaultLoad
    // TouXiangShangChuanChaJianMountedStart

    // TouXiangShangChuanChaJianMountedEnd
</script>

<style lang='scss' scoped>
    .TouXiangShangChuanChaJiancssStart {}

    .user-info-head {

        position: relative;

        display: inline-block;

        height: 120px;

    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .TouXiangShangChuanChaJiancssEnd {}
</style>