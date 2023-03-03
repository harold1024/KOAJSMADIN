<template>
    <!--ZhuCeYeMianhtmlStart-->

    <div id="defaultId1" class=" u7c9ea">
        <div id="idzaOzuF" class=" register">
            <el-form id="idBCfEfM" class="register-form ud4206" ref="registerRef" :model="registerForm" :rules="registerRules">
                <h3 id="idwRdC3M" class=" title">
                    后台管理系统

                </h3>
                <el-form-item id="idQ8asex" prop="username">
                    <el-input id="idFVxeH6" v-model="registerForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
                        <template id="idk4oLC5" #prefix>
                            <svg-icon id="idxCijMJ" class="el-input__icon  input-icon" icon-class="user">
                            </svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item id="id5QHdKz" prop="password">
                    <el-input id="idS5o6iL" v-model="registerForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleRegister">
                        <template id="idnxipd5" #prefix>
                            <svg-icon id="idoK3X7p" class="el-input__icon input-icon " icon-class="password">
                            </svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item id="iduKCvEQ" prop="confirmPassword">
                    <el-input id="idJLO669" v-model="registerForm.confirmPassword" type="password" placeholder="确认密码" @keyup.enter="handleRegister" size="large">
                        <template id="idgF8d1L" #prefix>
                            <svg-icon id="id2O4NfV" class="el-input__icon input-icon " icon-class="password">
                            </svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item id="idoRsDeg" prop="code" v-if="captchaOnOff">
                    <el-input id="idC8epLR" v-model="registerForm.code" class=" ue1feb" size="large" auto-complete="off" placeholder="验证码" @keyup.enter="handleRegister">
                        <template id="iduOBf7O" #prefix>
                            <svg-icon id="idN6rb8N" class="el-input__icon input-icon " icon-class="validCode">
                            </svg-icon>
                        </template>
                    </el-input>
                    <div id="idmdwLKa" class="register-code ub54f8">
                        <img id="idOifgVZ" @click="getCode" class=" register-code-img" :src="codeUrl" />
                    </div>
                </el-form-item>
                <el-form-item id="idlx4s4l">
                    <el-button id="iduph4xs" class=" u07811" :loading="loading" size="large" type="primary" @click.prevent="handleRegister">
                        <span id="idbrAGTR" v-if="!loading">
                            注 册

                        </span>
                        <span id="idSXJ6Bb" v-else>
                            注 册 中...

                        </span>
                    </el-button>
                    <div id="idSCooFg" class=" u5766c">
                        <router-link id="idOqCVe3" class="link-type " :to="'/login'">
                            使用已有账户登录

                        </router-link>
                    </div>
                </el-form-item>
            </el-form>
            <!-- 底部 -->
            <div id="idwIohBx" class=" el-register-footer">
                <span id="id5du3LK">
                    Copyright © 2018-2022 ruoyi.vip All Rights Reserved.

                </span>
            </div>
        </div>
    </div>
    <!--ZhuCeYeMianhtmlEnd-->

</template>

<script setup>
    import {
        ElMessageBox
    } from "element-plus";

    // interfaceCode
    import {
        saveRegister
    } from '../api/user.js'
    import {
        setPassword
    } from '../utils/password'





    const router = useRouter();
    const {
        proxy
    } = getCurrentInstance();








    const captchaOnOff = ref(true);

    const equalToPassword = (rule, value, callback) => {
        if (registerForm.value.password !== value) {
            callback(new Error("两次输入的密码不一致"));
        } else {
            callback();
        }
    }

    // ZhuCeYeMianDataStart

    // 
    const registerRules = ref({
        username: [{
                required: true,
                trigger: "blur",
                message: "请输入您的账号"
            },
            {
                min: 2,
                max: 20,
                message: "用户账号长度必须介于 2 和 20 之间",
                trigger: "blur"
            }
        ],
        password: [{
                required: true,
                trigger: "blur",
                message: "请输入您的密码"
            },
            {
                min: 5,
                max: 20,
                message: "用户密码长度必须介于 5 和 20 之间",
                trigger: "blur"
            }
        ],
        confirmPassword: [{
                required: true,
                trigger: "blur",
                message: "请再次输入您的密码"
            },
            {
                required: true,
                validator: equalToPassword,
                trigger: "blur"
            }
        ],
        code: [{
            required: true,
            trigger: "change",
            message: "请输入验证码"
        }]
    })
    // 
    const registerForm = ref({
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: ""
    })
    // 
    const codeUrl = ref('')
    // 请求地址
    var baseUrl = import.meta.env.VITE_APP_BASE_API
    // 注册加载
    const loading = ref(false)
    // ZhuCeYeMianDataEnd

    // ZhuCeYeMianMethodStart
    // 获取验证码
    async function getCode() {
        codeUrl.value = baseUrl + '/user/getimagecode?' + Math.random()
        return
        // 如果是若依自带后端请用以下代码
        getCodeImg().then(res => {
            captchaOnOff.value = res.captchaOnOff === undefined ? true : res.captchaOnOff;
            if (captchaOnOff.value) {
                codeUrl.value = "data:image/gif;base64," + res.img;
                registerForm.value.uuid = res.uuid;
            }
        });
    }
    // 提交注册
    async function handleRegister() {
        proxy.$refs.registerRef.validate(async valid => {
            if (valid) {
                loading.value = true;
                try {
                    let params = {
                        ...registerForm.value
                    }
                    params.password = setPassword(params.password) // 密码进行加密
                    let data = await saveRegister(params)



                    loading.value = false;
                    const username = registerForm.value.username;
                    ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", "系统提示", {
                        dangerouslyUseHTMLString: true,
                        type: "success",
                    }).then(() => {
                        router.push("/login");
                    }).catch(() => {});
                } catch (e) {
                    loading.value = false;
                    if (captchaOnOff) {
                        getCode();
                    }
                }
                return
            }
        });
    }

    // ZhuCeYeMianMethodEnd
    // ZhuCeYeMianMountedStart
    getCode()
    // ZhuCeYeMianMountedEnd
</script>

<style lang='scss' scoped>
    .ZhuCeYeMiancssStart {}

    .u7c9ea {
        height: 100%;
    }

    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url(../assets/images/beijingtu4.jpg);
        background-size: cover;
    }

    .ud4206 {
        width: 400px;
        border-radius: 6px;
        background: #fff;
        padding: 25px 25px 5px 25px;
    }

    .title {

        margin: 0px auto 30px auto;

        text-align: center;

        color: #707070;

    }

    .input-icon {

        height: 39px;

        width: 14px;

        margin-left: 0px;

    }

    .ue1feb {
        width: 63%;
    }

    .ub54f8 {
        width: 33%;
        height: 38px;
    }

    .register-code-img {
        height: 38px;
        padding-left: 12px;
        cursor: pointer;
        vertical-align: middle;
    }

    .u07811 {
        display: block;
        width: 100%;
    }

    .u5766c {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .el-register-footer {

        height: 40px;

        line-height: 40px;

        position: fixed;

        bottom: 0;

        width: 100%;

        text-align: center;

        color: #fff;

        font-family: Arial;

        font-size: 12px;

        letter-spacing: 1px;

    }

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .ZhuCeYeMiancssEnd {}
</style>