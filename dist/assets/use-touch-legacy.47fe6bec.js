System.register(["./index-legacy.2a4a8940.js"],(function(e){"use strict";var a;return{setters:[function(e){a=e.r}],execute:function(){e("u",(function(){const e=a(0),t=a(0),l=a(0),u=a(0),v=a(0),i=a(0),n=a(""),r=()=>{l.value=0,u.value=0,v.value=0,i.value=0,n.value=""};return{move:a=>{const r=a.touches[0];var s,c;l.value=(r.clientX<0?0:r.clientX)-e.value,u.value=r.clientY-t.value,v.value=Math.abs(l.value),i.value=Math.abs(u.value),(!n.value||v.value<10&&i.value<10)&&(n.value=(s=v.value,c=i.value,s>c?"horizontal":c>s?"vertical":""))},start:a=>{r(),e.value=a.touches[0].clientX,t.value=a.touches[0].clientY},reset:r,startX:e,startY:t,deltaX:l,deltaY:u,offsetX:v,offsetY:i,direction:n,isVertical:()=>"vertical"===n.value,isHorizontal:()=>"horizontal"===n.value}}))}}}));
