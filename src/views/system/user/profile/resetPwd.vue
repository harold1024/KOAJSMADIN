<template>
    <!--ZhongZhiMiMaZuJianhtmlStart-->

    <div id="defaultId1">
        <el-form id="idh74bEu" ref="pwdRef" :model="user" :rules="rules" label-width="80px">
            <el-form-item id="idwPrxkI" label="旧密码" prop="oldPassword">
                <el-input id="idsDvgs8" v-model="user.oldPassword" placeholder="请输入旧密码" type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item id="idaVVT1J" label="新密码" prop="newPassword">
                <el-input id="idXMQT2l" v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item id="idLQRJJG" label="确认密码" prop="confirmPassword">
                <el-input id="idGXhZi5" v-model="user.confirmPassword" placeholder="请确认密码" type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item id="idvFVPtd">
                <el-button id="idPLQkHH" @click="submit" type="primary">
                    <span id="id3HrxJu">保存
                    </span>
                </el-button>
                <el-button id="idSAlZv5" @click="close" type="danger">
                    <span id="idIwFlFV">关闭
                    </span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <!--ZhongZhiMiMaZuJianhtmlEnd-->

</template>

<script setup>
    const {
        proxy
    } = getCurrentInstance();
    import {
        setPassword
    } from '@/utils/password'


    const equalToPassword = (rule, value, callback) => {
        if (user.newPassword !== value) {
            callback(new Error("两次输入的密码不一致"));
        } else {
            callback();
        }
    };


    /** 提交按钮 */
    ;
    /** 关闭按钮 */
    ;


    // interfaceCode
    import {
        updateResetpasswordUser
    } from '../../../../api/user.js'

    // insertMethod
    // ZhongZhiMiMaZuJianMethodStart
    // 提交数据
    function submit() {
        proxy.$refs.pwdRef.validate(valid => {
            if (valid) {
                updateResetpasswordUser({
                    oldpassword: setPassword(user.oldPassword), // 旧密码
                    newpassword: setPassword(user.newPassword) // 新密码
                }).then(response => {
                    proxy.$modal.msgSuccess("修改成功");
                });
            }
        });
    }
    // close
    function close() {

        proxy.$tab.closePage();

    }

    // ZhongZhiMiMaZuJianMethodEnd


    // insertData
    // ZhongZhiMiMaZuJianDataStart

    // 表单数据
    var user = reactive({
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
    })
    // 表单校验
    var rules = ref({
        oldPassword: [{
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
        }],
        newPassword: [{
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
        }, {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
        }],
        confirmPassword: [{
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
        }, {
            required: true,
            validator: equalToPassword,
            trigger: "blur"
        }]
    })
    // ZhongZhiMiMaZuJianDataEnd


    // defaultLoad
    // ZhongZhiMiMaZuJianMountedStart

    // ZhongZhiMiMaZuJianMountedEnd
</script>
<style>
    .ZhongZhiMiMaZuJiancssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ZhongZhiMiMaZuJiancssEnd {}
</style>