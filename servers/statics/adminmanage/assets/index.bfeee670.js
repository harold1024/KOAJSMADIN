import{r as o,t as a,V as l,A as u,B as d,o as m,c as p,e as h,x as g,J as v}from"./index.23926b0b.js";const _=["src"],w={props:{src:{type:String,required:!0}},setup(s){const n=s,e=o(document.documentElement.clientHeight-94.5+"px;"),t=o(!0),r=a(()=>n.src);return l(()=>{setTimeout(()=>{t.value=!1},300),window.onresize=function(){e.value=document.documentElement.clientHeight-94.5+"px;"}}),(c,f)=>{const i=u("loading");return d((m(),p("div",{style:v("height:"+e.value)},[h("iframe",{src:g(r),frameborder:"no",style:{width:"100%",height:"100%"},scrolling:"auto"},null,8,_)],4)),[[i,t.value]])}}};export{w as _};
