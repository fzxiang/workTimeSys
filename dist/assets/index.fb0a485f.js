import{F,b as S,d as y,l as P,H as x,c as r,f as m,j as f,x as j,i as O,aB as A,y as B,at as L,aC as M,M as U,e as C,a1 as H,p as K}from"./index.61c9c03e.js";const $="van-hairline",q=`${$}--surround`,me=`${$}--top-bottom`,be=`${$}-unset--top-bottom`,xe="van-haptics-feedback",ve=Symbol("van-form"),V={to:[String,Object],url:String,replace:Boolean};function Y({to:e,url:n,replace:a,$router:l}){e&&l?l[a?"replace":"push"](e):n&&(a?location.replace(n):location.href=n)}function Z(){const e=F().proxy;return()=>Y(e)}const[G,p]=S("badge"),W={dot:Boolean,max:m,tag:f("div"),color:String,offset:Array,content:m,showZero:j,position:f("top-right")};var J=y({name:G,props:W,setup(e,{slots:n}){const a=()=>{if(n.content)return!0;const{content:t,showZero:i}=e;return O(t)&&t!==""&&(i||t!==0)},l=()=>{const{dot:t,max:i,content:s}=e;if(!t&&a())return n.content?n.content():O(i)&&A(s)&&+s>i?`${i}+`:s},c=P(()=>{const t={background:e.color};if(e.offset){const[i,s]=e.offset;n.default?(t.top=x(s),typeof i=="number"?t.right=x(-i):t.right=i.startsWith("-")?i.replace("-",""):`-${i}`):(t.marginTop=x(s),t.marginLeft=x(i))}return t}),d=()=>{if(a()||e.dot)return r("div",{class:p([e.position,{dot:e.dot,fixed:!!n.default}]),style:c.value},[l()])};return()=>{if(n.default){const{tag:t}=e;return r(t,{class:p("wrapper")},{default:()=>[n.default(),d()]})}return d()}}});const Q=B(J),[X,z]=S("icon"),ee=e=>e==null?void 0:e.includes("/"),ne={dot:Boolean,tag:f("i"),name:String,size:m,badge:m,color:String,badgeProps:Object,classPrefix:String};var te=y({name:X,props:ne,setup(e,{slots:n}){const a=L(M,null),l=P(()=>e.classPrefix||(a==null?void 0:a.iconPrefix)||z());return()=>{const{tag:c,dot:d,name:t,size:i,badge:s,color:o}=e,g=ee(t);return r(Q,U({dot:d,tag:c,class:[l.value,g?"":`${l.value}-${t}`],style:{color:o,fontSize:x(i)},content:s},e.badgeProps),{default:()=>{var u;return[(u=n.default)==null?void 0:u.call(n),g&&r("img",{class:z("image"),src:t},null)]}})}}});const ae=B(te),[oe,v]=S("loading"),ie=Array(12).fill(null).map((e,n)=>r("i",{class:v("line",String(n+1))},null)),re=r("svg",{class:v("circular"),viewBox:"25 25 50 50"},[r("circle",{cx:"50",cy:"50",r:"20",fill:"none"},null)]),ce={size:m,type:f("circular"),color:String,vertical:Boolean,textSize:m,textColor:String};var le=y({name:oe,props:ce,setup(e,{slots:n}){const a=P(()=>C({color:e.color},H(e.size))),l=()=>{var c;if(n.default)return r("span",{class:v("text"),style:{fontSize:x(e.textSize),color:(c=e.textColor)!=null?c:e.color}},[n.default()])};return()=>{const{type:c,vertical:d}=e;return r("div",{class:v([c,{vertical:d}]),"aria-live":"polite","aria-busy":!0},[r("span",{class:v("spinner",c),style:a.value},[c==="spinner"?ie:re]),l()])}}});const se=B(le),[de,b]=S("button"),ue=C({},V,{tag:f("button"),text:String,icon:String,type:f("default"),size:f("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:f("button"),loadingSize:m,loadingText:String,loadingType:String,iconPosition:f("left")});var fe=y({name:de,props:ue,emits:["click"],setup(e,{emit:n,slots:a}){const l=Z(),c=()=>a.loading?a.loading():r(se,{size:e.loadingSize,type:e.loadingType,class:b("loading")},null),d=()=>{if(e.loading)return c();if(a.icon)return r("div",{class:b("icon")},[a.icon()]);if(e.icon)return r(ae,{name:e.icon,class:b("icon"),classPrefix:e.iconPrefix},null)},t=()=>{let o;if(e.loading?o=e.loadingText:o=a.default?a.default():e.text,o)return r("span",{class:b("text")},[o])},i=()=>{const{color:o,plain:g}=e;if(o){const u={color:g?o:"white"};return g||(u.background=o),o.includes("gradient")?u.border=0:u.borderColor=o,u}},s=o=>{e.loading?K(o):e.disabled||(n("click",o),l())};return()=>{const{tag:o,type:g,size:u,block:I,round:R,plain:k,square:E,loading:D,disabled:h,hairline:T,nativeType:w,iconPosition:_}=e,N=[b([g,u,{plain:k,block:I,round:R,square:E,loading:D,disabled:h,hairline:T}]),{[q]:T}];return r(o,{type:w,class:N,style:i(),disabled:h,onClick:s},{default:()=>[r("div",{class:b("content")},[_==="left"&&d(),t(),_==="right"&&d()])]})}}});const Se=B(fe);export{be as B,ve as F,xe as H,ae as I,se as L,Se as a,me as b,Q as c,$ as d,V as r,Z as u};
