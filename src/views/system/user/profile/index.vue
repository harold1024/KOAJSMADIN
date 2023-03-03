<template>
    <!--YongHuXinXihtmlStart-->

    <div id="defaultId1">
        <div id="idKbm733" class="app-container ">
            <el-row id="idVqwESJ" :gutter="20">
                <el-col id="idTH8AnK" :span="8" :xs="24">
                    <el-card id="idsr68zR" class="box-card ">
                        <template id="id5r2BDn" v-slot:header>
                            <div id="idSsX6LN" class="clearfix ">
                                <span id="idPzZM4U">个人信息
                                </span>
                            </div>
                        </template>
                        <div id="idbfQdRF">
                            <div id="idifs1OJ" class="text-center ">
                                <userAvatar id="id29folI" :user="state.user">
                                </userAvatar>
                            </div>
                            <ul id="idtaWz8s" class="list-group list-group-striped ">
                                <li id="idvmwZFX" class="list-group-item ">
                                    <svg-icon id="id75KgbV" icon-class="user">
                                    </svg-icon>
                                    <div id="idkSsWKS" class="pull-right ">
                                        <span id="ido6jQKj">{{ state.user.username }}
                                        </span>
                                    </div>
                                    用户名称

                                </li>
                                <li id="idP1Ajvi" class="list-group-item ">
                                    <svg-icon id="idzNXt8k" icon-class="phone">
                                    </svg-icon>
                                    <div id="idEEWDtD" class="pull-right ">
                                        {{ state.user.phonenumber }}

                                    </div>
                                    手机号码

                                </li>
                                <li id="idcnlGGX" class="list-group-item ">
                                    <svg-icon id="idoHCwDi" icon-class="email">
                                    </svg-icon>
                                    <div id="idetSWpg" class="pull-right ">
                                        {{ state.user.email }}

                                    </div>
                                    用户邮箱

                                </li>
                                <li id="idJwlDIs" class="list-group-item ">
                                    <svg-icon id="id8Vdbgv" icon-class="tree">
                                    </svg-icon>
                                    <div id="idP8LeTd" class="pull-right " v-if="state.user.dept">
                                        {{ state.user.dept.deptName }} / {{ state.postGroup }}

                                    </div>
                                    所属部门

                                </li>
                                <li id="id7PR1T1" class="list-group-item ">
                                    <svg-icon id="id8HCZVw" icon-class="peoples">
                                    </svg-icon>
                                    <div id="id8c1rSW" class="pull-right ">
                                        {{ state.roleGroup }}

                                    </div>
                                    所属角色

                                </li>
                                <li id="idvdPmZ3" class="list-group-item ">
                                    <svg-icon id="idNcijgZ" icon-class="date">
                                    </svg-icon>
                                    <div id="idJ5dDsR" class="pull-right ">
                                        {{formatDate(state.user.createTime )}}

                                    </div>
                                    创建日期

                                </li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col id="idGIAhRV" :span="16" :xs="24">
                    <el-card id="ideT8IRZ">
                        <template id="idZcZKhd" v-slot:header>
                            <div id="idqPgHQx" class="clearfix ">
                                <span id="id1wn6dH">
                                    基本资料

                                </span>
                            </div>
                        </template>
                        <el-tabs id="idGOpOgh" v-model="activeTab">
                            <el-tab-pane id="idPjxSaW" label="基本资料" name="userinfo">
                                <userInfo id="idG6Vev5" :user="state.user">
                                </userInfo>
                            </el-tab-pane>
                            <el-tab-pane id="idrP3qaS" label="修改密码" name="resetPwd">
                                <resetPwd id="idVko5TV" :user="state.user">
                                </resetPwd>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
    <!--YongHuXinXihtmlEnd-->

</template>

<script setup name="Profile">
    import userAvatar from "./userAvatar";
    import userInfo from "./userInfo";
    import resetPwd from "./resetPwd";
    import {
        formatDate
    } from '../../../../utils/timeFomat'



    // console.log(formatDate)

    // interfaceCode
    import {
        findOneTokenUser
    } from '../../../../api/user.js'


    // insertMethod
    // YongHuXinXiMethodStart
    // getUser
    function getUser() {


        findOneTokenUser({}).then(response => {
            state.user = response.data;
            state.roleGroup = response.roleGroup;
            state.postGroup = response.postGroup;
        });

    }

    // YongHuXinXiMethodEnd


    // insertData
    // YongHuXinXiDataStart

    // state
    var state = reactive({
        user: {},
        roleGroup: {},
        postGroup: {}
    })
    // activeTab
    const activeTab = ref('userinfo')
    // YongHuXinXiDataEnd


    // defaultLoad
    // YongHuXinXiMountedStart
    getUser();
    // YongHuXinXiMountedEnd
</script>
<style>
    .YongHuXinXicssStart {}

    @media (min-width: 576px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}

    @media (min-width: 1200px) {}

    .YongHuXinXicssEnd {}
</style>