!function(){var a=document.createElement("style");a.innerHTML=".van-row{display:flex;flex-wrap:wrap}.van-row--nowrap{flex-wrap:nowrap}.van-row--justify-center{justify-content:center}.van-row--justify-end{justify-content:flex-end}.van-row--justify-space-between{justify-content:space-between}.van-row--justify-space-around{justify-content:space-around}.van-row--align-center{align-items:center}.van-row--align-bottom{align-items:flex-end}.van-col{display:block;box-sizing:border-box;min-height:1px}.van-col--1{flex:0 0 4.16666667%;max-width:4.16666667%}.van-col--offset-1{margin-left:4.16666667%}.van-col--2{flex:0 0 8.33333333%;max-width:8.33333333%}.van-col--offset-2{margin-left:8.33333333%}.van-col--3{flex:0 0 12.5%;max-width:12.5%}.van-col--offset-3{margin-left:12.5%}.van-col--4{flex:0 0 16.66666667%;max-width:16.66666667%}.van-col--offset-4{margin-left:16.66666667%}.van-col--5{flex:0 0 20.83333333%;max-width:20.83333333%}.van-col--offset-5{margin-left:20.83333333%}.van-col--6{flex:0 0 25%;max-width:25%}.van-col--offset-6{margin-left:25%}.van-col--7{flex:0 0 29.16666667%;max-width:29.16666667%}.van-col--offset-7{margin-left:29.16666667%}.van-col--8{flex:0 0 33.33333333%;max-width:33.33333333%}.van-col--offset-8{margin-left:33.33333333%}.van-col--9{flex:0 0 37.5%;max-width:37.5%}.van-col--offset-9{margin-left:37.5%}.van-col--10{flex:0 0 41.66666667%;max-width:41.66666667%}.van-col--offset-10{margin-left:41.66666667%}.van-col--11{flex:0 0 45.83333333%;max-width:45.83333333%}.van-col--offset-11{margin-left:45.83333333%}.van-col--12{flex:0 0 50%;max-width:50%}.van-col--offset-12{margin-left:50%}.van-col--13{flex:0 0 54.16666667%;max-width:54.16666667%}.van-col--offset-13{margin-left:54.16666667%}.van-col--14{flex:0 0 58.33333333%;max-width:58.33333333%}.van-col--offset-14{margin-left:58.33333333%}.van-col--15{flex:0 0 62.5%;max-width:62.5%}.van-col--offset-15{margin-left:62.5%}.van-col--16{flex:0 0 66.66666667%;max-width:66.66666667%}.van-col--offset-16{margin-left:66.66666667%}.van-col--17{flex:0 0 70.83333333%;max-width:70.83333333%}.van-col--offset-17{margin-left:70.83333333%}.van-col--18{flex:0 0 75%;max-width:75%}.van-col--offset-18{margin-left:75%}.van-col--19{flex:0 0 79.16666667%;max-width:79.16666667%}.van-col--offset-19{margin-left:79.16666667%}.van-col--20{flex:0 0 83.33333333%;max-width:83.33333333%}.van-col--offset-20{margin-left:83.33333333%}.van-col--21{flex:0 0 87.5%;max-width:87.5%}.van-col--offset-21{margin-left:87.5%}.van-col--22{flex:0 0 91.66666667%;max-width:91.66666667%}.van-col--offset-22{margin-left:91.66666667%}.van-col--23{flex:0 0 95.83333333%;max-width:95.83333333%}.van-col--offset-23{margin-left:95.83333333%}.van-col--24{flex:0 0 100%;max-width:100%}.van-col--offset-24{margin-left:100%}@media (max-width: 780px){.vben-login[data-v-abe0af90]{position:absolute;top:40%;left:0;margin-top:-50%}}.van-col[data-v-abe0af90]{margin-bottom:20px}.van-col h1[data-v-abe0af90]{text-align:center}\n",document.head.appendChild(a),System.register(["./index-legacy.cd0b50fb.js","./index-legacy.2ed91a81.js","./plugin-vue_export-helper-legacy.7bb61c33.js"],(function(a){"use strict";var t,e,n,l,o,f,i,s,r,c,v,d,m,u,g,x,h,p,w,b,y,_,j,E;return{setters:[function(a){t=a.b,e=a.j,n=a.x,l=a.v,o=a.d,f=a.k,i=a.l,s=a.c,r=a.f,c=a.h,v=a.y,d=a.a9,m=a.r,u=a.ac,g=a.s,x=a.ak,h=a.ag,p=a.ae,w=a.N,b=a.aD,y=a.aE,_=a.ah},function(a){j=a.a},function(a){E=a._}],execute:function(){const[P,A]=t("row"),k=Symbol(P),I={tag:e("div"),wrap:n,align:String,gutter:l(0),justify:String};var S=o({name:P,props:I,setup(a,{slots:t}){const{children:e,linkChildren:n}=f(k),l=i((()=>{const a=[[]];let t=0;return e.forEach(((e,n)=>{t+=Number(e.span),t>24?(a.push([n]),t-=24):a[a.length-1].push(n)})),a})),o=i((()=>{const t=Number(a.gutter),e=[];return t?(l.value.forEach((a=>{const n=t*(a.length-1)/a.length;a.forEach(((a,l)=>{if(0===l)e.push({right:n});else{const l=t-e[a-1].right,o=n-l;e.push({left:l,right:o})}}))})),e):e}));return n({spaces:o}),()=>{const{tag:e,wrap:n,align:l,justify:o}=a;return s(e,{class:A({[`align-${l}`]:l,[`justify-${o}`]:o,nowrap:!n})},{default:()=>{var a;return[null==(a=t.default)?void 0:a.call(t)]}})}}});const[L,R]=t("col"),T={tag:e("div"),span:l(0),offset:r};var V=o({name:L,props:T,setup(a,{slots:t}){const{parent:e,index:n}=c(k),l=i((()=>{if(!e)return;const{spaces:a}=e;if(a&&a.value&&a.value[n.value]){const{left:t,right:e}=a.value[n.value];return{paddingLeft:t?`${t}px`:null,paddingRight:e?`${e}px`:null}}}));return()=>{const{tag:e,span:n,offset:o}=a;return s(e,{style:l.value,class:R({[n]:n,[`offset-${o}`]:o})},{default:()=>{var a;return[null==(a=t.default)?void 0:a.call(t)]}})}}});const $=v(V),B=v(S);const C=a=>(b("data-v-abe0af90"),a=a(),y(),a),D={class:"vben-login"},U=C((()=>_("h1",null,"泡游工时系统",-1))),N=C((()=>_("img",{style:{width:"100%"},src:"/assets/login-box-bg.9027741f.svg",class:"logo",alt:"logo"},null,-1))),O=w(" SSO登录 ");a("default",E(o({__name:"index",setup(a){const t=d.get("theme"),e=m("dark"===t),n=u();g(e,(a=>{a?(n.mode="dark",d.set("theme","dark",!1)):(n.mode="light",d.set("theme","light",!1))}));const{VITE_APP_API_BASE_URL:l}={VITE_APP_PREVIEW:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};function o(){location.href=location.origin+l+"/ssoLogin"}return(a,t)=>{const e=$,n=j,l=B;return p(),x("div",D,[s(l,{justify:"center"},{default:h((()=>[s(e,{span:"16"},{default:h((()=>[U])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:h((()=>[N])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:h((()=>[s(n,{type:"primary",block:"",onClick:o},{default:h((()=>[O])),_:1})])),_:1})])),_:1})])}}}),[["__scopeId","data-v-abe0af90"]]))}}}))}();
