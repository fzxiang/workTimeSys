!function(){var a=document.createElement("style");a.innerHTML="body{--van-switch-size: 26px;--van-switch-width:calc(1.8em + 4px);--van-switch-height:calc(1em + 4px);--van-switch-node-size: 1em;--van-switch-node-background: var(--van-white);--van-switch-node-shadow: 0 3px 1px 0 rgba(0, 0, 0, .05);--van-switch-background: rgba(120, 120, 128, .16);--van-switch-on-background: var(--van-primary-color);--van-switch-duration: var(--van-duration-base);--van-switch-disabled-opacity: var(--van-disabled-opacity)}.van-theme-dark{--van-switch-background: rgba(120, 120, 128, .32)}.van-switch{position:relative;display:inline-block;box-sizing:content-box;width:var(--van-switch-width);height:var(--van-switch-height);font-size:var(--van-switch-size);background:var(--van-switch-background);border-radius:var(--van-switch-node-size);cursor:pointer;transition:background-color var(--van-switch-duration)}.van-switch__node{position:absolute;top:2px;left:2px;width:var(--van-switch-node-size);height:var(--van-switch-node-size);font-size:inherit;background:var(--van-switch-node-background);border-radius:100%;box-shadow:var(--van-switch-node-shadow);transition:transform var(--van-switch-duration) cubic-bezier(.3,1.05,.4,1.05)}.van-switch__loading{top:25%;left:25%;width:50%;height:50%;line-height:1}.van-switch--on{background:var(--van-switch-on-background)}.van-switch--on .van-switch__node{transform:translate(calc(var(--van-switch-width) - var(--van-switch-node-size) - 4px))}.van-switch--on .van-switch__loading{color:var(--van-switch-on-background)}.van-switch--disabled{cursor:not-allowed;opacity:var(--van-switch-disabled-opacity)}.van-switch--loading{cursor:default}.vben-login[data-v-062a7d9a]{position:absolute;top:40%;left:0;margin-top:-50%}.van-col[data-v-062a7d9a]{margin-bottom:20px}.van-col h1[data-v-062a7d9a]{text-align:center}\n",document.head.appendChild(a),System.register(["./index-legacy.fdf3d058.js","./index-legacy.e31efcec.js","./index-legacy.98cb2a1b.js"],(function(a){"use strict";var n,t,e,i,o,c,s,d,l,r,v,u,h,g,w,b,p,m,f,_,k,x,y,V;return{setters:[function(a){n=a.k,t=a.b,e=a.c,i=a.l,o=a.ab,c=a.W,s=a.m,d=a.y,l=a.ai,r=a.ag,v=a.r,u=a.aj,h=a.w,g=a.ak,w=a.ap,b=a.am,p=a._,m=a.aA,f=a.aB,_=a.an},function(a){k=a.L,x=a.C,y=a.B,V=a.R},function(){}],execute:function(){const[z,P]=n("switch"),C={size:t,loading:Boolean,disabled:Boolean,modelValue:e,activeColor:String,inactiveColor:String,activeValue:{type:e,default:!0},inactiveValue:{type:e,default:!1}};var E=i({name:z,props:C,emits:["change","update:modelValue"],setup(a,{emit:n,slots:t}){const e=()=>a.modelValue===a.activeValue,i=()=>{if(!a.disabled&&!a.loading){const t=e()?a.inactiveValue:a.activeValue;n("update:modelValue",t),n("change",t)}},d=()=>{if(a.loading){const n=e()?a.activeColor:a.inactiveColor;return s(k,{class:P("loading"),color:n},null)}if(t.node)return t.node()};return o((()=>a.modelValue)),()=>{var n;const{size:o,loading:l,disabled:r,activeColor:v,inactiveColor:u}=a,h=e(),g={fontSize:c(o),backgroundColor:h?v:u};return s("div",{role:"switch",class:P({on:h,loading:l,disabled:r}),style:g,tabindex:r?void 0:0,"aria-checked":h,onClick:i},[s("div",{class:P("node")},[d()]),null==(n=t.background)?void 0:n.call(t)])}}});const A=d(E);const I=a=>(m("data-v-062a7d9a"),a=a(),f(),a),S={class:"vben-login"},B=I((()=>_("h1",null,"泡游工时系统",-1))),L=I((()=>_("img",{style:{width:"100%"},src:"/assets/login-box-bg.9027741f.svg",class:"logo",alt:"logo"},null,-1))),R=p(" SSO登录 ");a("default",l(i({__name:"index",setup(a){const n=r.get("theme"),t=v("dark"===n),e=u();h(t,(a=>{a?(e.mode="dark",r.set("theme","dark",!1)):(e.mode="light",r.set("theme","light",!1))}));const{VITE_APP_API_BASE_URL:i}={VITE_APP_PREVIEW:"false",VITE_APP_PUBLIC_PATH:"/",VITE_APP_API_BASE_URL:"/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0};function o(){location.href=location.origin+i+"/ssoLogin"}return(a,n)=>{const e=x,i=y,c=V,d=A;return g(),w("div",S,[s(c,{justify:"center"},{default:b((()=>[s(e,{span:"16"},{default:b((()=>[B])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:b((()=>[L])),_:1}),s(e,{span:"16",style:{"margin-top":"40px"}},{default:b((()=>[s(i,{type:"primary",block:"",onClick:o},{default:b((()=>[R])),_:1})])),_:1})])),_:1}),s(d,{modelValue:t.value,"onUpdate:modelValue":n[0]||(n[0]=a=>t.value=a),size:"18px"},null,8,["modelValue"])])}}}),[["__scopeId","data-v-062a7d9a"]]))}}}))}();
