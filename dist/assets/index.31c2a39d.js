import{b as m,j as v,x as w,v as P,d as g,k as A,l as f,c,f as B,h as $,y as E,a9 as d,r as C,ac as V,s as N,ak as R,ag as _,ae as L,N as D,aD as T,aE as j,ah as S}from"./index.61c9c03e.js";import{a as O}from"./index.fb0a485f.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";const[x,U]=m("row"),y=Symbol(x),W={tag:v("div"),wrap:w,align:String,gutter:P(0),justify:String};var H=g({name:x,props:W,setup(o,{slots:r}){const{children:u,linkChildren:l}=A(y),p=f(()=>{const e=[[]];let t=0;return u.forEach((a,n)=>{t+=Number(a.span),t>24?(e.push([n]),t-=24):e[e.length-1].push(n)}),e}),s=f(()=>{const e=Number(o.gutter),t=[];return e&&p.value.forEach(a=>{const n=e*(a.length-1)/a.length;a.forEach((i,k)=>{if(k===0)t.push({right:n});else{const h=e-t[i-1].right,I=n-h;t.push({left:h,right:I})}})}),t});return l({spaces:s}),()=>{const{tag:e,wrap:t,align:a,justify:n}=o;return c(e,{class:U({[`align-${a}`]:a,[`justify-${n}`]:n,nowrap:!t})},{default:()=>{var i;return[(i=r.default)==null?void 0:i.call(r)]}})}}});const[K,M]=m("col"),Y={tag:v("div"),span:P(0),offset:B};var q=g({name:K,props:Y,setup(o,{slots:r}){const{parent:u,index:l}=$(y),p=f(()=>{if(!u)return;const{spaces:s}=u;if(s&&s.value&&s.value[l.value]){const{left:e,right:t}=s.value[l.value];return{paddingLeft:e?`${e}px`:null,paddingRight:t?`${t}px`:null}}});return()=>{const{tag:s,span:e,offset:t}=o;return c(s,{style:p.value,class:M({[e]:e,[`offset-${t}`]:t})},{default:()=>{var a;return[(a=r.default)==null?void 0:a.call(r)]}})}}});const z=E(q),G=E(H);var J="/assets/login-box-bg.9027741f.svg";const b=o=>(T("data-v-abe0af90"),o=o(),j(),o),Q={class:"vben-login"},X=b(()=>S("h1",null,"\u6CE1\u6E38\u5DE5\u65F6\u7CFB\u7EDF",-1)),Z=b(()=>S("img",{style:{width:"100%"},src:J,class:"logo",alt:"logo"},null,-1)),ee=D(" SSO\u767B\u5F55 "),te=g({__name:"index",setup(o){const r=d.get("theme"),u=C(r==="dark"),l=V();N(u,e=>{e?(l.mode="dark",d.set("theme","dark",!1)):(l.mode="light",d.set("theme","light",!1))});const{VITE_APP_API_BASE_URL:p}={VITE_APP_PREVIEW:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};function s(){location.href=location.origin+p+"/ssoLogin"}return(e,t)=>{const a=z,n=O,i=G;return L(),R("div",Q,[c(i,{justify:"center"},{default:_(()=>[c(a,{span:"16"},{default:_(()=>[X]),_:1}),c(a,{span:"16",style:{"margin-top":"40px"}},{default:_(()=>[Z]),_:1}),c(a,{span:"16",style:{"margin-top":"40px"}},{default:_(()=>[c(n,{type:"primary",block:"",onClick:s},{default:_(()=>[ee]),_:1})]),_:1})]),_:1})])}}});var oe=F(te,[["__scopeId","data-v-abe0af90"]]);export{oe as default};
