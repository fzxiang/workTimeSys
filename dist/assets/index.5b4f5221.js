import{b as m,k as v,t as w,j as P,d as g,l as A,q as f,c,f as B,h as $,y as E,a4 as C,ai as d,r as V,a5 as N,v as R,a7 as L,ac as T,a9 as p,N as j,aA as D,aB as O,aa as S}from"./index.11f47860.js";import{a as F}from"./index.3504d9f9.js";const[b,U]=m("row"),x=Symbol(b),W={tag:v("div"),wrap:w,align:String,gutter:P(0),justify:String};var q=g({name:b,props:W,setup(o,{slots:r}){const{children:u,linkChildren:l}=A(x),_=f(()=>{const t=[[]];let e=0;return u.forEach((a,n)=>{e+=Number(a.span),e>24?(t.push([n]),e-=24):t[t.length-1].push(n)}),t}),s=f(()=>{const t=Number(o.gutter),e=[];return t&&_.value.forEach(a=>{const n=t*(a.length-1)/a.length;a.forEach((i,I)=>{if(I===0)e.push({right:n});else{const h=t-e[i-1].right,k=n-h;e.push({left:h,right:k})}})}),e});return l({spaces:s}),()=>{const{tag:t,wrap:e,align:a,justify:n}=o;return c(t,{class:U({[`align-${a}`]:a,[`justify-${n}`]:n,nowrap:!e})},{default:()=>{var i;return[(i=r.default)==null?void 0:i.call(r)]}})}}});const[H,K]=m("col"),M={tag:v("div"),span:P(0),offset:B};var Y=g({name:H,props:M,setup(o,{slots:r}){const{parent:u,index:l}=$(x),_=f(()=>{if(!u)return;const{spaces:s}=u;if(s&&s.value&&s.value[l.value]){const{left:t,right:e}=s.value[l.value];return{paddingLeft:t?`${t}px`:null,paddingRight:e?`${e}px`:null}}});return()=>{const{tag:s,span:t,offset:e}=o;return c(s,{style:_.value,class:K({[t]:t,[`offset-${e}`]:e})},{default:()=>{var a;return[(a=r.default)==null?void 0:a.call(r)]}})}}});const z=E(Y),G=E(q);var J="/assets/login-box-bg.9027741f.svg";const y=o=>(D("data-v-7bfdb8b6"),o=o(),O(),o),Q={class:"vben-login"},X=y(()=>S("h1",null,"\u6CE1\u6E38\u5DE5\u65F6\u7CFB\u7EDF",-1)),Z=y(()=>S("img",{style:{width:"100%"},src:J,class:"logo",alt:"logo"},null,-1)),tt=j(" SSO\u767B\u5F55 "),et=g({__name:"index",setup(o){const r=d.get("theme"),u=V(r==="dark"),l=N();R(u,t=>{t?(l.mode="dark",d.set("theme","dark",!1)):(l.mode="light",d.set("theme","light",!1))});const{VITE_APP_API_BASE_URL:_}={VITE_APP_PREVIEW:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};function s(){location.href=location.origin+_+"/ssoLogin"}return(t,e)=>{const a=z,n=F,i=G;return L(),T("div",Q,[c(i,{justify:"center"},{default:p(()=>[c(a,{span:"16"},{default:p(()=>[X]),_:1}),c(a,{span:"16",style:{"margin-top":"40px"}},{default:p(()=>[Z]),_:1}),c(a,{span:"16",style:{"margin-top":"40px"}},{default:p(()=>[c(n,{type:"primary",block:"",onClick:s},{default:p(()=>[tt]),_:1})]),_:1})]),_:1})])}}});var nt=C(et,[["__scopeId","data-v-7bfdb8b6"]]);export{nt as default};
