import{a as h,q as m,t as B,y as v,d as f,b,g as d,c as l,j as A,f as C,w as E,aE as V,an as $,aj as u,ah as L,N,aF as k,aG as R,ak as P}from"./index.e095584c.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";import{B as T}from"./index.0dfee2fa.js";import"./index.6f20635a.js";const[x,j]=h("row"),S=Symbol(x),D={tag:m("div"),wrap:B,align:String,gutter:v(0),justify:String};var F=f({name:x,props:D,setup(s,{slots:o}){const{children:c,linkChildren:i}=b(S),_=d(()=>{const e=[[]];let t=0;return c.forEach((n,r)=>{t+=Number(n.span),t>24?(e.push([r]),t-=24):e[e.length-1].push(r)}),e}),a=d(()=>{const e=Number(s.gutter),t=[];return e&&_.value.forEach(n=>{const r=e*(n.length-1)/n.length;n.forEach((p,I)=>{if(I===0)t.push({right:r});else{const g=e-t[p-1].right,w=r-g;t.push({left:g,right:w})}})}),t});return i({spaces:a}),()=>{const{tag:e,wrap:t,align:n,justify:r}=s;return l(e,{class:j({[`align-${n}`]:n,[`justify-${r}`]:r,nowrap:!t})},{default:()=>{var p;return[(p=o.default)==null?void 0:p.call(o)]}})}}});const[U,M]=h("col"),W={tag:m("div"),span:v(0),offset:A};var q=f({name:U,props:W,setup(s,{slots:o}){const{parent:c,index:i}=C(S),_=d(()=>{if(!c)return;const{spaces:a}=c;if(a&&a.value&&a.value[i.value]){const{left:e,right:t}=a.value[i.value];return{paddingLeft:e?`${e}px`:null,paddingRight:t?`${t}px`:null}}});return()=>{const{tag:a,span:e,offset:t}=s;return l(a,{style:_.value,class:M({[e]:e,[`offset-${t}`]:t})},{default:()=>{var n;return[(n=o.default)==null?void 0:n.call(o)]}})}}});const G=E(q),H=E(F);var K="/assets/login-box-bg.9027741f.svg";const y=s=>(k("data-v-2d3e1092"),s=s(),R(),s),Y={class:"vben-login"},z=y(()=>P("h1",null,"\u6CE1\u6E38\u5DE5\u65F6\u7CFB\u7EDF",-1)),J=y(()=>P("img",{style:{width:"100%"},src:K,class:"logo",alt:"logo"},null,-1)),Q=N(" SSO\u767B\u5F55 "),X=f({__name:"index",setup(s){const{VITE_APP_API_BASE_URL:o}={VITE_APP_PREVIEW:"false",VITE_CONSOLE:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};V(()=>{location.href=location.origin+o+"/ssoLogin"});function c(){location.href=location.origin+o+"/ssoLogin"}return(i,_)=>{const a=G,e=T,t=H;return L(),$("div",Y,[l(t,{justify:"center"},{default:u(()=>[l(a,{span:"16"},{default:u(()=>[z]),_:1}),l(a,{span:"16",style:{"margin-top":"40px"}},{default:u(()=>[J]),_:1}),l(a,{span:"16",style:{"margin-top":"40px"}},{default:u(()=>[l(e,{type:"primary",block:"",onClick:c},{default:u(()=>[Q]),_:1})]),_:1})]),_:1})])}}});var nt=O(X,[["__scopeId","data-v-2d3e1092"]]);export{nt as default};
