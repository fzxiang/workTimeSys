import{k as R,l as _,A as x,W as s,m as d,b as l,z as f,t as p,s as v,ax as $,y as B,ay as y,az as E,G as S}from"./index.d6e4e1ab.js";const g="van-hairline",F=`${g}--surround`,U=`${g}--top-bottom`,K=`${g}-unset--top-bottom`,M="van-haptics-feedback",j=Symbol("van-form"),[I,P]=R("badge"),T={dot:Boolean,max:l,tag:f("div"),color:String,offset:Array,content:l,showZero:p,position:f("top-right")};var D=_({name:I,props:T,setup(e,{slots:a}){const r=()=>{if(a.content)return!0;const{content:t,showZero:n}=e;return v(t)&&t!==""&&(n||t!==0)},c=()=>{const{dot:t,max:n,content:o}=e;if(!t&&r())return a.content?a.content():v(n)&&$(o)&&+o>n?`${n}+`:o},u=x(()=>{const t={background:e.color};if(e.offset){const[n,o]=e.offset;a.default?(t.top=s(o),typeof n=="number"?t.right=s(-n):t.right=n.startsWith("-")?n.replace("-",""):`-${n}`):(t.marginTop=s(o),t.marginLeft=s(n))}return t}),i=()=>{if(r()||e.dot)return d("div",{class:P([e.position,{dot:e.dot,fixed:!!a.default}]),style:u.value},[c()])};return()=>{if(a.default){const{tag:t}=e;return d(t,{class:P("wrapper")},{default:()=>[a.default(),i()]})}return i()}}});const C=B(D),[N,O]=R("icon"),z=e=>e==null?void 0:e.includes("/"),k={dot:Boolean,tag:f("i"),name:String,size:l,badge:l,color:String,badgeProps:Object,classPrefix:String};var w=_({name:N,props:k,setup(e,{slots:a}){const r=y(E,null),c=x(()=>e.classPrefix||(r==null?void 0:r.iconPrefix)||O());return()=>{const{tag:u,dot:i,name:t,size:n,badge:o,color:h}=e,m=z(t);return d(C,S({dot:i,tag:u,class:[c.value,m?"":`${c.value}-${t}`],style:{color:h,fontSize:s(n)},content:o},e.badgeProps),{default:()=>{var b;return[(b=a.default)==null?void 0:b.call(a),m&&d("img",{class:O("image"),src:t},null)]}})}}});const G=B(w);export{K as B,j as F,M as H,G as I,U as a,F as b,g as c};
