!function(){var t=document.createElement("style");t.innerHTML=".van-row{display:flex;flex-wrap:wrap}.van-row--nowrap{flex-wrap:nowrap}.van-row--justify-center{justify-content:center}.van-row--justify-end{justify-content:flex-end}.van-row--justify-space-between{justify-content:space-between}.van-row--justify-space-around{justify-content:space-around}.van-row--align-center{align-items:center}.van-row--align-bottom{align-items:flex-end}.van-col{display:block;box-sizing:border-box;min-height:1px}.van-col--1{flex:0 0 4.16666667%;max-width:4.16666667%}.van-col--offset-1{margin-left:4.16666667%}.van-col--2{flex:0 0 8.33333333%;max-width:8.33333333%}.van-col--offset-2{margin-left:8.33333333%}.van-col--3{flex:0 0 12.5%;max-width:12.5%}.van-col--offset-3{margin-left:12.5%}.van-col--4{flex:0 0 16.66666667%;max-width:16.66666667%}.van-col--offset-4{margin-left:16.66666667%}.van-col--5{flex:0 0 20.83333333%;max-width:20.83333333%}.van-col--offset-5{margin-left:20.83333333%}.van-col--6{flex:0 0 25%;max-width:25%}.van-col--offset-6{margin-left:25%}.van-col--7{flex:0 0 29.16666667%;max-width:29.16666667%}.van-col--offset-7{margin-left:29.16666667%}.van-col--8{flex:0 0 33.33333333%;max-width:33.33333333%}.van-col--offset-8{margin-left:33.33333333%}.van-col--9{flex:0 0 37.5%;max-width:37.5%}.van-col--offset-9{margin-left:37.5%}.van-col--10{flex:0 0 41.66666667%;max-width:41.66666667%}.van-col--offset-10{margin-left:41.66666667%}.van-col--11{flex:0 0 45.83333333%;max-width:45.83333333%}.van-col--offset-11{margin-left:45.83333333%}.van-col--12{flex:0 0 50%;max-width:50%}.van-col--offset-12{margin-left:50%}.van-col--13{flex:0 0 54.16666667%;max-width:54.16666667%}.van-col--offset-13{margin-left:54.16666667%}.van-col--14{flex:0 0 58.33333333%;max-width:58.33333333%}.van-col--offset-14{margin-left:58.33333333%}.van-col--15{flex:0 0 62.5%;max-width:62.5%}.van-col--offset-15{margin-left:62.5%}.van-col--16{flex:0 0 66.66666667%;max-width:66.66666667%}.van-col--offset-16{margin-left:66.66666667%}.van-col--17{flex:0 0 70.83333333%;max-width:70.83333333%}.van-col--offset-17{margin-left:70.83333333%}.van-col--18{flex:0 0 75%;max-width:75%}.van-col--offset-18{margin-left:75%}.van-col--19{flex:0 0 79.16666667%;max-width:79.16666667%}.van-col--offset-19{margin-left:79.16666667%}.van-col--20{flex:0 0 83.33333333%;max-width:83.33333333%}.van-col--offset-20{margin-left:83.33333333%}.van-col--21{flex:0 0 87.5%;max-width:87.5%}.van-col--offset-21{margin-left:87.5%}.van-col--22{flex:0 0 91.66666667%;max-width:91.66666667%}.van-col--offset-22{margin-left:91.66666667%}.van-col--23{flex:0 0 95.83333333%;max-width:95.83333333%}.van-col--offset-23{margin-left:95.83333333%}.van-col--24{flex:0 0 100%;max-width:100%}.van-col--offset-24{margin-left:100%}.vben-login[data-v-7bfdb8b6]{position:absolute;top:40%;left:0;margin-top:-50%}.van-col[data-v-7bfdb8b6]{margin-bottom:20px}.van-col h1[data-v-7bfdb8b6]{text-align:center}\n",document.head.appendChild(t),System.register(["./index-legacy.4f17093f.js","./index-legacy.2df78c4a.js"],(function(t){"use strict";var a,e,n,l,o,f,i,s,r,c,v,d,m,u,g,x,h,p,w,b,y,_,j,E;return{setters:[function(t){a=t.b,e=t.k,n=t.t,l=t.j,o=t.d,f=t.l,i=t.q,s=t.c,r=t.f,c=t.h,v=t.y,d=t.a4,m=t.ai,u=t.r,g=t.a5,x=t.v,h=t.a7,p=t.ac,w=t.a9,b=t.N,y=t.aA,_=t.aB,j=t.aa},function(t){E=t.a}],execute:function(){const[P,A]=a("row"),I=Symbol(P),S={tag:e("div"),wrap:n,align:String,gutter:l(0),justify:String};var k=o({name:P,props:S,setup(t,{slots:a}){const{children:e,linkChildren:n}=f(I),l=i((()=>{const t=[[]];let a=0;return e.forEach(((e,n)=>{a+=Number(e.span),a>24?(t.push([n]),a-=24):t[t.length-1].push(n)})),t})),o=i((()=>{const a=Number(t.gutter),e=[];return a?(l.value.forEach((t=>{const n=a*(t.length-1)/t.length;t.forEach(((t,l)=>{if(0===l)e.push({right:n});else{const l=a-e[t-1].right,o=n-l;e.push({left:l,right:o})}}))})),e):e}));return n({spaces:o}),()=>{const{tag:e,wrap:n,align:l,justify:o}=t;return s(e,{class:A({[`align-${l}`]:l,[`justify-${o}`]:o,nowrap:!n})},{default:()=>{var t;return[null==(t=a.default)?void 0:t.call(a)]}})}}});const[L,R]=a("col"),T={tag:e("div"),span:l(0),offset:r};var V=o({name:L,props:T,setup(t,{slots:a}){const{parent:e,index:n}=c(I),l=i((()=>{if(!e)return;const{spaces:t}=e;if(t&&t.value&&t.value[n.value]){const{left:a,right:e}=t.value[n.value];return{paddingLeft:a?`${a}px`:null,paddingRight:e?`${e}px`:null}}}));return()=>{const{tag:e,span:n,offset:o}=t;return s(e,{style:l.value,class:R({[n]:n,[`offset-${o}`]:o})},{default:()=>{var t;return[null==(t=a.default)?void 0:t.call(a)]}})}}});const B=v(V),$=v(k);const C=t=>(y("data-v-7bfdb8b6"),t=t(),_(),t),U={class:"vben-login"},D=C((()=>j("h1",null,"泡游工时系统",-1))),N=C((()=>j("img",{style:{width:"100%"},src:"/assets/login-box-bg.9027741f.svg",class:"logo",alt:"logo"},null,-1))),O=b(" SSO登录 ");t("default",d(o({__name:"index",setup(t){const a=m.get("theme"),e=u("dark"===a),n=g();x(e,(t=>{t?(n.mode="dark",m.set("theme","dark",!1)):(n.mode="light",m.set("theme","light",!1))}));const{VITE_APP_API_BASE_URL:l}={VITE_APP_PREVIEW:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};function o(){location.href=location.origin+l+"/ssoLogin"}return(t,a)=>{const e=B,n=E,l=$;return h(),p("div",U,[s(l,{justify:"center"},{default:w((()=>[s(e,{span:"16"},{default:w((()=>[D])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:w((()=>[N])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:w((()=>[s(n,{type:"primary",block:"",onClick:o},{default:w((()=>[O])),_:1})])),_:1})])),_:1})])}}}),[["__scopeId","data-v-7bfdb8b6"]]))}}}))}();
