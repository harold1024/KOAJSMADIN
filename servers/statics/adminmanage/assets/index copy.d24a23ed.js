import{D as we,r as c,G as Ce,P as Ie,d,A as W,o as s,c as F,B as I,I as xe,f as l,w as e,x as n,i as Ne,F as O,C as K,j as r,X as Z,e as f,v as L,k as h,Y as Te,m as u,n as Se,O as Ue}from"./index.23926b0b.js";import{l as ee,g as Fe,u as qe,a as Me,d as Pe}from"./menu.5dcc5d1c.js";import{I as Re}from"./index.46c9668c.js";const $e={class:"app-container"},De=u("\u641C\u7D22"),Ae=u("\u91CD\u7F6E"),Be=u("\u65B0\u589E"),Ee=u("\u5C55\u5F00/\u6298\u53E0"),Oe=u("\u4FEE\u6539"),Ke=u("\u65B0\u589E"),Le=u("\u5220\u9664"),Qe=u("\u76EE\u5F55"),je=u("\u83DC\u5355"),ze=u("\u6309\u94AE"),Ge=u("\u662F\u5426\u5916\u94FE "),Xe=u("\u662F"),Ye=u("\u5426"),He=u(" \u8DEF\u7531\u5730\u5740 "),Je=u(" \u7EC4\u4EF6\u8DEF\u5F84 "),We=u(" \u6743\u9650\u5B57\u7B26 "),Ze=u(" \u8DEF\u7531\u53C2\u6570 "),el=u(" \u662F\u5426\u7F13\u5B58 "),ll=u("\u7F13\u5B58"),tl=u("\u4E0D\u7F13\u5B58"),nl=u(" \u663E\u793A\u72B6\u6001 "),al=u(" \u83DC\u5355\u72B6\u6001 "),ol={class:"dialog-footer"},ul=u("\u786E \u5B9A"),sl=u("\u53D6 \u6D88"),dl=we({name:"Menu"}),_l=Object.assign(dl,{setup(rl){const{proxy:_}=Se(),{sys_show_hide:le,sys_normal_disable:q}=_.useDict("sys_show_hide","sys_normal_disable"),Q=c([]),w=c(!1),M=c(!0),P=c(!0),R=c(""),$=c([]),D=c(!1),A=c(!0),T=c(!1),j=c(null),te=Ce({form:{},queryParams:{menuName:void 0,visible:void 0},rules:{menuName:[{required:!0,message:"\u83DC\u5355\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],orderNum:[{required:!0,message:"\u83DC\u5355\u987A\u5E8F\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],path:[{required:!0,message:"\u8DEF\u7531\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}}),{queryParams:x,form:a,rules:ne}=Ie(te);function N(){M.value=!0,ee(x.value).then(i=>{Q.value=_.handleTree(i.data,"menuId"),M.value=!1})}function z(){$.value=[],ee().then(i=>{const o={menuId:0,menuName:"\u4E3B\u7C7B\u76EE",children:[]};o.children=_.handleTree(i.data,"menuId"),$.value.push(o)})}function ae(){w.value=!1,B()}function B(){a.value={menuId:void 0,parentId:0,menuName:void 0,icon:void 0,menuType:"M",orderNum:void 0,isFrame:"1",isCache:"0",visible:"0",status:"0"},_.resetForm("menuRef")}function G(){j.value.reset(),T.value=!0}function oe(i){a.value.icon=i,T.value=!1}function ue(){T.value=!1}function E(){N()}function se(){_.resetForm("queryRef"),E()}function X(i){B(),z(),i!=null&&i.menuId?a.value.parentId=i.menuId:a.value.parentId=0,w.value=!0,R.value="\u6DFB\u52A0\u83DC\u5355"}function de(){A.value=!1,D.value=!D.value,Ue(()=>{A.value=!0})}async function re(i){B(),await z(),Fe(i.menuId).then(o=>{a.value=o.data,w.value=!0,R.value="\u4FEE\u6539\u83DC\u5355"})}function ie(){_.$refs.menuRef.validate(i=>{i&&(a.value.menuId!=null?qe(a.value).then(o=>{_.$modal.msgSuccess("\u4FEE\u6539\u6210\u529F"),w.value=!1,N()}):Me(a.value).then(o=>{_.$modal.msgSuccess("\u65B0\u589E\u6210\u529F"),w.value=!1,N()}))})}function me(i){_.$modal.confirm('\u662F\u5426\u786E\u8BA4\u5220\u9664\u540D\u79F0\u4E3A"'+i.menuName+'"\u7684\u6570\u636E\u9879?').then(function(){return Pe(i.menuId)}).then(()=>{N(),_.$modal.msgSuccess("\u5220\u9664\u6210\u529F")}).catch(()=>{})}return N(),(i,o)=>{const C=d("el-input"),m=d("el-form-item"),pe=d("el-option"),_e=d("el-select"),v=d("el-button"),Y=d("el-form"),p=d("el-col"),ce=d("right-toolbar"),H=d("el-row"),V=d("el-table-column"),fe=d("dict-tag"),he=d("el-table"),ve=d("el-tree-select"),b=d("el-radio"),S=d("el-radio-group"),be=d("search"),y=d("el-icon"),ye=d("el-popover"),Ve=d("el-input-number"),g=d("question-filled"),k=d("el-tooltip"),ge=d("el-dialog"),U=W("hasPermi"),ke=W("loading");return s(),F("div",$e,[I(l(Y,{model:n(x),ref:"queryRef",inline:!0},{default:e(()=>[l(m,{label:"\u83DC\u5355\u540D\u79F0",prop:"menuName"},{default:e(()=>[l(C,{modelValue:n(x).menuName,"onUpdate:modelValue":o[0]||(o[0]=t=>n(x).menuName=t),placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",clearable:"",onKeyup:Ne(E,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),l(m,{label:"\u72B6\u6001",prop:"status"},{default:e(()=>[l(_e,{modelValue:n(x).status,"onUpdate:modelValue":o[1]||(o[1]=t=>n(x).status=t),placeholder:"\u83DC\u5355\u72B6\u6001",clearable:""},{default:e(()=>[(s(!0),F(O,null,K(n(q),t=>(s(),r(pe,{key:t.value,label:t.label,value:t.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(m,null,{default:e(()=>[l(v,{type:"primary",icon:"Search",onClick:E},{default:e(()=>[De]),_:1}),l(v,{icon:"Refresh",onClick:se},{default:e(()=>[Ae]),_:1})]),_:1})]),_:1},8,["model"]),[[xe,P.value]]),l(H,{gutter:10,class:"mb8"},{default:e(()=>[l(p,{span:1.5},{default:e(()=>[I((s(),r(v,{type:"primary",plain:"",icon:"Plus",onClick:X},{default:e(()=>[Be]),_:1})),[[U,["system:menu:add"]]])]),_:1},8,["span"]),l(p,{span:1.5},{default:e(()=>[l(v,{type:"info",plain:"",icon:"Sort",onClick:de},{default:e(()=>[Ee]),_:1})]),_:1},8,["span"]),l(ce,{showSearch:P.value,"onUpdate:showSearch":o[2]||(o[2]=t=>P.value=t),onQueryTable:N},null,8,["showSearch"])]),_:1}),A.value?I((s(),r(he,{key:0,data:Q.value,"row-key":"menuId","default-expand-all":D.value,"tree-props":{children:"children",hasChildren:"hasChildren"}},{default:e(()=>[l(V,{prop:"menuName",label:"\u83DC\u5355\u540D\u79F0","show-overflow-tooltip":!0,width:"160"}),l(V,{prop:"icon",label:"\u56FE\u6807",align:"center",width:"100"},{default:e(t=>[l(n(Z),{"icon-class":t.row.icon},null,8,["icon-class"])]),_:1}),l(V,{prop:"orderNum",label:"\u6392\u5E8F",width:"60"}),l(V,{prop:"perms",label:"\u6743\u9650\u6807\u8BC6","show-overflow-tooltip":!0}),l(V,{prop:"component",label:"\u7EC4\u4EF6\u8DEF\u5F84","show-overflow-tooltip":!0}),l(V,{prop:"status",label:"\u72B6\u6001",width:"80"},{default:e(t=>[l(fe,{options:n(q),value:t.row.status},null,8,["options","value"])]),_:1}),l(V,{label:"\u521B\u5EFA\u65F6\u95F4",align:"center",prop:"createTime"},{default:e(t=>[f("span",null,L(i.parseTime(t.row.createTime)),1)]),_:1}),l(V,{label:"\u64CD\u4F5C",align:"center",width:"200","class-name":"small-padding fixed-width"},{default:e(t=>[I((s(),r(v,{type:"text",icon:"Edit",onClick:J=>re(t.row)},{default:e(()=>[Oe]),_:2},1032,["onClick"])),[[U,["system:menu:edit"]]]),I((s(),r(v,{type:"text",icon:"Plus",onClick:J=>X(t.row)},{default:e(()=>[Ke]),_:2},1032,["onClick"])),[[U,["system:menu:add"]]]),I((s(),r(v,{type:"text",icon:"Delete",onClick:J=>me(t.row)},{default:e(()=>[Le]),_:2},1032,["onClick"])),[[U,["system:menu:remove"]]])]),_:1})]),_:1},8,["data","default-expand-all"])),[[ke,M.value]]):h("",!0),l(ge,{title:R.value,modelValue:w.value,"onUpdate:modelValue":o[17]||(o[17]=t=>w.value=t),width:"680px","append-to-body":""},{footer:e(()=>[f("div",ol,[l(v,{type:"primary",onClick:ie},{default:e(()=>[ul]),_:1}),l(v,{onClick:ae},{default:e(()=>[sl]),_:1})])]),default:e(()=>[l(Y,{ref:"menuRef",model:n(a),rules:n(ne),"label-width":"100px"},{default:e(()=>[l(H,null,{default:e(()=>[l(p,{span:24},{default:e(()=>[l(m,{label:"\u4E0A\u7EA7\u83DC\u5355"},{default:e(()=>[l(ve,{modelValue:n(a).parentId,"onUpdate:modelValue":o[3]||(o[3]=t=>n(a).parentId=t),data:$.value,props:{value:"menuId",label:"menuName",children:"children"},"value-key":"menuId",placeholder:"\u9009\u62E9\u4E0A\u7EA7\u83DC\u5355","check-strictly":""},null,8,["modelValue","data"])]),_:1})]),_:1}),l(p,{span:24},{default:e(()=>[l(m,{label:"\u83DC\u5355\u7C7B\u578B",prop:"menuType"},{default:e(()=>[l(S,{modelValue:n(a).menuType,"onUpdate:modelValue":o[4]||(o[4]=t=>n(a).menuType=t)},{default:e(()=>[l(b,{label:"M"},{default:e(()=>[Qe]),_:1}),l(b,{label:"C"},{default:e(()=>[je]),_:1}),l(b,{label:"F"},{default:e(()=>[ze]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),n(a).menuType!="F"?(s(),r(p,{key:0,span:24},{default:e(()=>[l(m,{label:"\u83DC\u5355\u56FE\u6807",prop:"icon"},{default:e(()=>[l(ye,{placement:"bottom-start",width:540,visible:T.value,"onUpdate:visible":o[6]||(o[6]=t=>T.value=t),trigger:"click",onShow:G},{reference:e(()=>[I((s(),r(C,{modelValue:n(a).icon,"onUpdate:modelValue":o[5]||(o[5]=t=>n(a).icon=t),placeholder:"\u70B9\u51FB\u9009\u62E9\u56FE\u6807",onClick:G,readonly:""},{prefix:e(()=>[n(a).icon?(s(),r(n(Z),{key:0,"icon-class":n(a).icon,class:"el-input__icon",style:{height:"32px",width:"16px"}},null,8,["icon-class"])):(s(),r(y,{key:1,style:{height:"32px",width:"16px"}},{default:e(()=>[l(be)]),_:1}))]),_:1},8,["modelValue"])),[[n(Te),ue]])]),default:e(()=>[l(n(Re),{ref_key:"iconSelectRef",ref:j,onSelected:oe},null,512)]),_:1},8,["visible"])]),_:1})]),_:1})):h("",!0),l(p,{span:12},{default:e(()=>[l(m,{label:"\u83DC\u5355\u540D\u79F0",prop:"menuName"},{default:e(()=>[l(C,{modelValue:n(a).menuName,"onUpdate:modelValue":o[7]||(o[7]=t=>n(a).menuName=t),placeholder:"\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1}),l(p,{span:12},{default:e(()=>[l(m,{label:"\u663E\u793A\u6392\u5E8F",prop:"orderNum"},{default:e(()=>[l(Ve,{modelValue:n(a).orderNum,"onUpdate:modelValue":o[8]||(o[8]=t=>n(a).orderNum=t),"controls-position":"right",min:0},null,8,["modelValue"])]),_:1})]),_:1}),n(a).menuType!="F"?(s(),r(p,{key:1,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:"\u9009\u62E9\u662F\u5916\u94FE\u5219\u8DEF\u7531\u5730\u5740\u9700\u8981\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),Ge])]),default:e(()=>[l(S,{modelValue:n(a).isFrame,"onUpdate:modelValue":o[9]||(o[9]=t=>n(a).isFrame=t)},{default:e(()=>[l(b,{label:"0"},{default:e(()=>[Xe]),_:1}),l(b,{label:"1"},{default:e(()=>[Ye]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType!="F"?(s(),r(p,{key:2,span:12},{default:e(()=>[l(m,{prop:"path"},{label:e(()=>[f("span",null,[l(k,{content:"\u8BBF\u95EE\u7684\u8DEF\u7531\u5730\u5740\uFF0C\u5982\uFF1A`user`\uFF0C\u5982\u5916\u7F51\u5730\u5740\u9700\u5185\u94FE\u8BBF\u95EE\u5219\u4EE5`http(s)://`\u5F00\u5934",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),He])]),default:e(()=>[l(C,{modelValue:n(a).path,"onUpdate:modelValue":o[10]||(o[10]=t=>n(a).path=t),placeholder:"\u8BF7\u8F93\u5165\u8DEF\u7531\u5730\u5740"},null,8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType=="C"?(s(),r(p,{key:3,span:12},{default:e(()=>[l(m,{prop:"component"},{label:e(()=>[f("span",null,[l(k,{content:"\u8BBF\u95EE\u7684\u7EC4\u4EF6\u8DEF\u5F84\uFF0C\u5982\uFF1A`system/user/index`\uFF0C\u9ED8\u8BA4\u5728`views`\u76EE\u5F55\u4E0B",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),Je])]),default:e(()=>[l(C,{modelValue:n(a).component,"onUpdate:modelValue":o[11]||(o[11]=t=>n(a).component=t),placeholder:"\u8BF7\u8F93\u5165\u7EC4\u4EF6\u8DEF\u5F84"},null,8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType!="M"?(s(),r(p,{key:4,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:"\u63A7\u5236\u5668\u4E2D\u5B9A\u4E49\u7684\u6743\u9650\u5B57\u7B26\uFF0C\u5982\uFF1A@PreAuthorize(`@ss.hasPermi('system:user:list')`)",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),We])]),default:e(()=>[l(C,{modelValue:n(a).perms,"onUpdate:modelValue":o[12]||(o[12]=t=>n(a).perms=t),placeholder:"\u8BF7\u8F93\u5165\u6743\u9650\u6807\u8BC6",maxlength:"100"},null,8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType=="C"?(s(),r(p,{key:5,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:'\u8BBF\u95EE\u8DEF\u7531\u7684\u9ED8\u8BA4\u4F20\u9012\u53C2\u6570\uFF0C\u5982\uFF1A`{"id": 1, "name": "ry"}`',placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),Ze])]),default:e(()=>[l(C,{modelValue:n(a).query,"onUpdate:modelValue":o[13]||(o[13]=t=>n(a).query=t),placeholder:"\u8BF7\u8F93\u5165\u8DEF\u7531\u53C2\u6570",maxlength:"255"},null,8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType=="C"?(s(),r(p,{key:6,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:"\u9009\u62E9\u662F\u5219\u4F1A\u88AB`keep-alive`\u7F13\u5B58\uFF0C\u9700\u8981\u5339\u914D\u7EC4\u4EF6\u7684`name`\u548C\u5730\u5740\u4FDD\u6301\u4E00\u81F4",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),el])]),default:e(()=>[l(S,{modelValue:n(a).isCache,"onUpdate:modelValue":o[14]||(o[14]=t=>n(a).isCache=t)},{default:e(()=>[l(b,{label:"0"},{default:e(()=>[ll]),_:1}),l(b,{label:"1"},{default:e(()=>[tl]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType!="F"?(s(),r(p,{key:7,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:"\u9009\u62E9\u9690\u85CF\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4F46\u4ECD\u7136\u53EF\u4EE5\u8BBF\u95EE",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),nl])]),default:e(()=>[l(S,{modelValue:n(a).visible,"onUpdate:modelValue":o[15]||(o[15]=t=>n(a).visible=t)},{default:e(()=>[(s(!0),F(O,null,K(n(le),t=>(s(),r(b,{key:t.value,label:t.value},{default:e(()=>[u(L(t.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0),n(a).menuType!="F"?(s(),r(p,{key:8,span:12},{default:e(()=>[l(m,null,{label:e(()=>[f("span",null,[l(k,{content:"\u9009\u62E9\u505C\u7528\u5219\u8DEF\u7531\u5C06\u4E0D\u4F1A\u51FA\u73B0\u5728\u4FA7\u8FB9\u680F\uFF0C\u4E5F\u4E0D\u80FD\u88AB\u8BBF\u95EE",placement:"top"},{default:e(()=>[l(y,null,{default:e(()=>[l(g)]),_:1})]),_:1}),al])]),default:e(()=>[l(S,{modelValue:n(a).status,"onUpdate:modelValue":o[16]||(o[16]=t=>n(a).status=t)},{default:e(()=>[(s(!0),F(O,null,K(n(q),t=>(s(),r(b,{key:t.value,label:t.value},{default:e(()=>[u(L(t.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0)]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue"])])}}});export{_l as default};
