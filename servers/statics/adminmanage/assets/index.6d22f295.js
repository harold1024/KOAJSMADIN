import{z as D,D as P,r as s,d as r,A as x,o as w,c as R,f as e,w as t,i as V,B as b,j as C,e as L,v as B,I as j,m as y,n as z}from"./index.23926b0b.js";function F(d){return D({url:"/monitor/online/list",method:"get",params:d})}function O(d){return D({url:"/monitor/online/"+d,method:"delete"})}const Q={class:"app-container"},A=y("\u641C\u7D22"),E=y("\u91CD\u7F6E"),G=y("\u5F3A\u9000"),H=P({name:"Online"}),W=Object.assign(H,{setup(d){const{proxy:m}=z(),N=s([]),f=s(!0),_=s(0),i=s(1),p=s(10),u=s({ipaddr:void 0,userName:void 0});function v(){f.value=!0,F(u.value).then(a=>{N.value=a.rows,_.value=a.total,f.value=!1})}function c(){i.value=1,v()}function K(){m.resetForm("queryRef"),c()}function S(a){m.$modal.confirm('\u662F\u5426\u786E\u8BA4\u5F3A\u9000\u540D\u79F0\u4E3A"'+a.userName+'"\u7684\u7528\u6237?').then(function(){return O(a.tokenId)}).then(()=>{v(),m.$modal.msgSuccess("\u5220\u9664\u6210\u529F")}).catch(()=>{})}return v(),(a,n)=>{const k=r("el-input"),g=r("el-form-item"),h=r("el-button"),I=r("el-form"),l=r("el-table-column"),T=r("el-table"),U=r("pagination"),$=x("hasPermi"),q=x("loading");return w(),R("div",Q,[e(I,{model:u.value,ref:"queryRef",inline:!0,"label-width":"68px"},{default:t(()=>[e(g,{label:"\u767B\u5F55\u5730\u5740",prop:"ipaddr"},{default:t(()=>[e(k,{modelValue:u.value.ipaddr,"onUpdate:modelValue":n[0]||(n[0]=o=>u.value.ipaddr=o),placeholder:"\u8BF7\u8F93\u5165\u767B\u5F55\u5730\u5740",clearable:"",onKeyup:V(c,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(g,{label:"\u7528\u6237\u540D\u79F0",prop:"userName"},{default:t(()=>[e(k,{modelValue:u.value.userName,"onUpdate:modelValue":n[1]||(n[1]=o=>u.value.userName=o),placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D\u79F0",clearable:"",onKeyup:V(c,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),e(g,null,{default:t(()=>[e(h,{type:"primary",icon:"Search",onClick:c},{default:t(()=>[A]),_:1}),e(h,{icon:"Refresh",onClick:K},{default:t(()=>[E]),_:1})]),_:1})]),_:1},8,["model"]),b((w(),C(T,{data:N.value.slice((i.value-1)*p.value,i.value*p.value),style:{width:"100%"}},{default:t(()=>[e(l,{label:"\u5E8F\u53F7",width:"50",type:"index",align:"center"},{default:t(o=>[L("span",null,B((i.value-1)*p.value+o.$index+1),1)]),_:1}),e(l,{label:"\u4F1A\u8BDD\u7F16\u53F7",align:"center",prop:"tokenId","show-overflow-tooltip":!0}),e(l,{label:"\u767B\u5F55\u540D\u79F0",align:"center",prop:"userName","show-overflow-tooltip":!0}),e(l,{label:"\u6240\u5C5E\u90E8\u95E8",align:"center",prop:"deptName","show-overflow-tooltip":!0}),e(l,{label:"\u4E3B\u673A",align:"center",prop:"ipaddr","show-overflow-tooltip":!0}),e(l,{label:"\u767B\u5F55\u5730\u70B9",align:"center",prop:"loginLocation","show-overflow-tooltip":!0}),e(l,{label:"\u64CD\u4F5C\u7CFB\u7EDF",align:"center",prop:"os","show-overflow-tooltip":!0}),e(l,{label:"\u6D4F\u89C8\u5668",align:"center",prop:"browser","show-overflow-tooltip":!0}),e(l,{label:"\u767B\u5F55\u65F6\u95F4",align:"center",prop:"loginTime",width:"180"},{default:t(o=>[L("span",null,B(a.parseTime(o.row.loginTime)),1)]),_:1}),e(l,{label:"\u64CD\u4F5C",align:"center","class-name":"small-padding fixed-width"},{default:t(o=>[b((w(),C(h,{type:"text",icon:"Delete",onClick:J=>S(o.row)},{default:t(()=>[G]),_:2},1032,["onClick"])),[[$,["monitor:online:forceLogout"]]])]),_:1})]),_:1},8,["data"])),[[q,f.value]]),b(e(U,{total:_.value,page:i.value,"onUpdate:page":n[2]||(n[2]=o=>i.value=o),limit:p.value,"onUpdate:limit":n[3]||(n[3]=o=>p.value=o)},null,8,["total","page","limit"]),[[j,_.value>0]])])}}});export{W as default};