<template>
    <!--DengLuYeMianhtmlStart-->

    <div id="defaultId1" class=" ue3bc7">
        <div id="idVoafXT" class=" login">
            <el-form id="idlTTlLt" class="login-form u51b10" ref="loginRef" :model="loginForm" :rules="loginRules">
                <h3 id="idXQbgv9" class=" title">
                    后台管理系统

                </h3>
                <el-form-item id="id3387Zp" prop="username">
                    <el-input id="idgesRa3" v-model="loginForm.username" type="text" size="large" auto-complete="off"
                        placeholder="账号">
                        <template id="idj7jtXk" #prefix>
                            <svg-icon id="id3qSnhi" class="el-input__icon  input-icon" icon-class="user">
                            </svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item id="id2G5JZx" prop="password">
                    <el-input id="idAlETvN" v-model="loginForm.password" type="password" size="large" auto-complete="off"
                        placeholder="密码" @keyup.enter="handleLogin">
                        <template id="iddOJjwd" #prefix>
                            <svg-icon id="idTN59JL" class="el-input__icon input-icon " icon-class="password">
                            </svg-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item id="idLxt967" prop="code" v-if="captchaOnOff">
                    <div id="g687a7" class=" uab2c1">
                        <el-input id="id5OXvv3" v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码"
                            @keyup.enter="handleLogin">
                            <template id="idroloOf" #prefix>
                                <svg-icon id="idldg9cW" class="el-input__icon input-icon " icon-class="validCode">
                                </svg-icon>
                            </template>
                        </el-input>
                        <div id="idZOmNXU" class="login-code uad941">
                            <img id="ce850b" @click="getCode" class=" register-code-img" :src="codeUrl" />
                        </div>
                    </div>
                </el-form-item>
                <el-checkbox id="idwEZhKM" v-model="loginForm.rememberMe" class=" u6f302">
                    记住密码

                </el-checkbox>
                <el-form-item id="id4XAJVU">
                    <div id="g0b563" class=" u44479">
                        <el-button id="idLGUsOP" :loading="loading" size="large" type="primary"
                            @click.prevent="handleLogin">
                            <span id="idLfVr3s" v-if="!loading">
                                登 录

                            </span>
                            <span id="iduHE4QV" v-else>
                                登 录 中...

                            </span>
                        </el-button>
                        <div id="idTmBezr" v-if="register">
                            <router-link id="idBVswEt" class="link-type " :to="'/register'">
                                立即注册

                            </router-link>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <!-- 底部 -->
            <div id="id67SlmM" class=" el-login-footer">
                <span id="iddiscRp">
                    Copyright © 2018-2022 Harold Rights Reserved.

                </span>
            </div>
        </div>
    </div>
    <!--DengLuYeMianhtmlEnd-->
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { setPassword } from '../utils/password'
import useUserStore from '@/store/modules/user'
// interfaceCode

const userStore = useUserStore()
const router = useRouter();
const {
    proxy
} = getCurrentInstance();



// getCode();
// getCookie();
// DengLuYeMianMethodStart
// 获取保存的密码
function getCookie() {
    const username = Cookies.get("username");
    const password = Cookies.get("password");
    const rememberMe = Cookies.get("rememberMe");
    loginForm.username = !username ? loginForm.username : username
    loginForm.password = !password ? loginForm.password : decrypt(password)
    loginForm.rememberMe = !rememberMe ? false : Boolean(rememberMe)
}
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
// 登录方法
async function handleLogin() {
    proxy.$refs.loginRef.validate(valid => {
        if (valid) {
            loading.value = true;
            // 勾选了需要记住密码设置在cookie中设置记住用户明和名命
            if (loginForm.value.rememberMe) {
                Cookies.set("username", loginForm.value.username, {
                    expires: 30
                });
                Cookies.set("password", encrypt(loginForm.value.password), {
                    expires: 30
                });
                Cookies.set("rememberMe", loginForm.value.rememberMe, {
                    expires: 30
                });
            } else {
                // 否则移除
                Cookies.remove("username");
                Cookies.remove("password");
                Cookies.remove("rememberMe");
            }
            // 调用action的登录方法

            let params = {
                ...loginForm.value
            }
            params.password = setPassword(params.password) // 加密上传
            userStore.login(params).then(() => {
                router.push({
                    path: redirect.value || "/"
                });
            }).catch(() => {
                loading.value = false;
                // 重新获取验证码
                if (captchaOnOff.value) {
                    getCode();
                }
            });
        }
    });
}

// DengLuYeMianMethodEnd
// insertData
// DengLuYeMianDataStart

// 表单校验
const loginRules = ref({
    username: [{
        required: true,
        trigger: "blur",
        message: "请输入您的账号"
    }],
    password: [{
        required: true,
        trigger: "blur",
        message: "请输入您的密码"
    }],
    code: [{
        required: true,
        trigger: "change",
        message: "请输入验证码"
    }]
})
// 登录表单
const loginForm = ref({
    username: 'admin',
    password: '123456',
    rememberMe: '',
    code: '',
    uuid: ''
})
// 验证码开关
const captchaOnOff = ref(true)
// 验证码图片地址
const codeUrl = ref('')
// 请求地址
var baseUrl = import.meta.env.VITE_APP_BASE_API
// 登录后跳转地址
const redirect = ref('')
// 登录加载状态
const loading = ref(false)
// 是否显示注册按钮
const register = ref(true)
// DengLuYeMianDataEnd
// DengLuYeMianMountedStart
getCode()
getCookie()
    // DengLuYeMianMountedEnd
</script>

<style lang='scss' scoped>
.DengLuYeMiancssStart {}

.ue3bc7 {
    height: 100vh;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url(../assets/images/beijingtu4.jpg);
    background-size: cover;
}

.u51b10 {
    width: 400px;
    border-radius: 6px;
    background: #ffffff;
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

.uab2c1 {
    display: flex;
    width: 100%;
}

.uad941 {
    width: 33%;
    float: right;
}

.register-code-img {
    height: 38px;
    padding-left: 12px;
    cursor: pointer;
    vertical-align: middle;
}

.u6f302 {
    margin-bottom: 0.5em;
}

.u44479 {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.el-login-footer {

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

.DengLuYeMiancssEnd {}</style>