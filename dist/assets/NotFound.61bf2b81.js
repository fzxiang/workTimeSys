import{d as u,aL as r,w as c,af as _,ag as e,ae as p,c as m,N as i,ai as d,an as f,ao as l}from"./index.61c9c03e.js";import{E as F}from"./index.f80f1b4c.js";import{a as y}from"./index.fb0a485f.js";const N=u({__name:"NotFound",setup(x){const n=l(),t=r({time:2*1e3,onFinish:()=>{n.push({name:"HomeIndex"})}});t.start();const o=t.current;return c(()=>{console.log(o.seconds)}),(h,v)=>{const a=y,s=F;return p(),_(s,{description:"\u7A7A\u9875\u9762"},{default:e(()=>[m(a,{round:"",type:"primary",class:"bottom-button"},{default:e(()=>[i("\u8FD4\u56DE\u4E3B\u9875\uFF08"+d(f(o).seconds)+"\uFF09",1)]),_:1})]),_:1})}}});export{N as default};