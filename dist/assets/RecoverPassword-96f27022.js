import{d as p,u as d,r as o,a as r,o as _,i as f,f as n,e as l,j as v,w as b,p as h,t as V,U as g,aa as w}from"./index-6280b85b.js";const x=["onSubmit"],y={class:"flex justify-center mt-4"},N=p({__name:"RecoverPassword",setup(B){const{t:a}=d(),e=o(""),s=o([]);function u(){e.value?w().push("/"):s.value=["Email is required"]}return(C,t)=>{const i=r("va-input"),m=r("va-button");return _(),f("form",{class:"login",onSubmit:g(u,["prevent"])},[n(i,{modelValue:e.value,"onUpdate:modelValue":t[0]||(t[0]=c=>e.value=c),class:"mb-4",type:"email",label:l(a)("auth.email"),error:!!s.value.length,"error-messages":s.value},null,8,["modelValue","label","error","error-messages"]),v("div",y,[n(m,{type:"submit",class:"my-0"},{default:b(()=>[h(V(l(a)("auth.reset_password")),1)]),_:1})])],40,x)}}});export{N as default};
