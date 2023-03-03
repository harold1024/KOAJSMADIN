<template>
    <!--YongHuBiaoDanZuJianhtmlStart-->

    <div id="defaultId1">
        <el-form id="idNQZsT4" ref="userRef" :model="user" :rules="rules" label-width="80px">
            <el-form-item id="idePHRTR" label="用户昵称" prop="nickName">
                <el-input id="idU3wqtH" v-model="user.nickName" maxlength="30">
                </el-input>
            </el-form-item>
            <el-form-item id="idFLuCRG" label="手机号码" prop="phonenumber">
                <el-input id="idDDtfHi" v-model="user.phonenumber" maxlength="11">
                </el-input>
            </el-form-item>
            <el-form-item id="idxJEVSS" label="邮箱" prop="email">
                <el-input id="iddmnkIS" v-model="user.email" maxlength="50">
                </el-input>
            </el-form-item>
            <el-form-item id="idlkbNvv" label="性别">
                <el-radio-group id="idvn84Xa" v-model="user.sex">
                    <el-radio id="idtr9wBv" label="0">
                        男

                    </el-radio>
                    <el-radio id="idct4Cv7" label="1">
                        女

                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item id="idajof3J">
                <el-button id="idAbOcKB" @click="submit" type="primary">
                    保存

                </el-button>
                <el-button id="idf5RcvF" @click="close" type="danger">
                    关闭

                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <!--YongHuBiaoDanZuJianhtmlEnd-->

</template>

<script setup>
    const props = defineProps({
        user: {
            type: Object
        }
    });

    const {
        proxy
    } = getCurrentInstance();
    let regPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    import useUserStore from '@/store/modules/user'

    const userStore = useUserStore()


    /** 提交按钮 */
    ;
    /** 关闭按钮 */
    ;


    // interfaceCode
    import {
        updateTokenUser
    } from '../../../../api/user.js'

    // insertMethod
    // YongHuBiaoDanZuJianMethodStart
    // submit
    function submit() {

        proxy.$refs.userRef.validate(valid => {
            if (valid) {
                let params = {
                    ...props.user
                }
                params.avatar = userStore.avatar
                updateTokenUser(params).then(response => {
                    proxy.$modal.msgSuccess("修改成功");
                });
            }
        });

    }
    // close
    function close() {

        proxy.$tab.closePage();

    }

    // YongHuBiaoDanZuJianMethodEnd


    // insertData
    // YongHuBiaoDanZuJianDataStart

    // rules
    var rules = ref({
        nickName: [{
            required: true,
            message: "用户昵称不能为空",
            trigger: "blur"
        }],
        email: [{
            required: true,
            message: "邮箱地址不能为空",
            trigger: "blur"
        }, {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
        }],
        phonenumber: [{
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
        }, {
            pattern: regPhone,
            message: "请输入正确的手机号码",
            trigger: "blur"
        }],
    })
    // YongHuBiaoDanZuJianDataEnd


    // defaultLoad
    // YongHuBiaoDanZuJianMountedStart

    // YongHuBiaoDanZuJianMountedEnd
</script>
<style>
    .YongHuBiaoDanZuJiancssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .YongHuBiaoDanZuJiancssEnd {}
</style>