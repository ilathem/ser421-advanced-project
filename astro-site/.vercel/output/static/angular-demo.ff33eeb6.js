import{\u0275 as c,a as d,b as s,c as a,d as p,e as r,f as u,g as i,h as f,N as l,s as m,I as g,C as T,i as h,j as x}from"./chunks/common.63b7a1ed.js";function _(t,e){if(t&1&&(s(0,"p"),a(1),p()),t&2){const n=h();i(1),x(n.todoText)}}class o{constructor(){this.todoText="Just do it",this.show=!1}toggle(){this.show=!this.show}}o.\u0275fac=function(e){return new(e||o)};o.\u0275cmp=c({type:o,selectors:[["app-todo"]],inputs:{todoText:"todoText"},standalone:!0,features:[d],decls:5,vars:1,consts:[[4,"ngIf"],[3,"click"]],template:function(e,n){e&1&&(s(0,"p"),a(1,"This is my list of things"),p(),r(2,_,2,1,"p",0),s(3,"button",1),u("click",function(){return n.toggle()}),a(4,"Toggle"),p()),e&2&&(i(2),f("ngIf",n.show))},dependencies:[l],encapsulation:2});(function(){(typeof ngDevMode>"u"||ngDevMode)&&m(o,[{type:T,args:[{selector:"app-todo",standalone:!0,imports:[l],template:`
    <p>This is my list of things</p>

    <p *ngIf="show">{{todoText}}</p>

    <button (click)="toggle()">Toggle</button>
  `}]}],null,{todoText:[{type:g}]})})();export{o as TodoComponent};
