(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"Cuy+":function(e,t,n){"use strict";n.r(t);var i=n("q1tI"),o=n.n(i),a=n("7oih"),r=n("VUD3"),c=n("S7Tf"),l=(n("91GP"),n("f3/d"),n("rGqo"),n("yt8O"),n("Btvt"),n("RW0V"),n("84bF"),n("wTIg")),s=n("qKvR");var u=Object(l.a)("form",{target:"e16lve6w0"})("max-width:",(function(e){return e.theme.sizes.maxWidthCentered}),";margin:0 auto;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:flex-start;input,textarea{font-family:inherit;font-size:inherit;background:",(function(e){return e.theme.colors.tertiary}),";color:",(function(e){return e.theme.colors.text}),";border-radius:2px;padding:1em;&::-webkit-input-placeholder{color:gray;}&::-moz-placeholder{color:gray;}&:-ms-input-placeholder{color:gray;}&:-moz-placeholder{color:gray;}&:required{box-shadow:none;}}&::before{content:'';background:black;height:100%;width:100%;position:fixed;top:0;left:0;z-index:1;transition:0.2s all;opacity:",(function(e){return e.overlay?".8":"0"}),";visibility:",(function(e){return e.overlay?"visible":"hidden"}),";}"),h=Object(l.a)("input",{target:"e16lve6w1"})("margin:0 0 1em 0;width:100%;@media (min-width:",(function(e){return e.theme.responsive.small}),"){width:49%;}"),d=Object(l.a)("input",{target:"e16lve6w2"})("margin:0 0 1em 0;width:100%;@media (min-width:",(function(e){return e.theme.responsive.small}),"){width:49%;}"),m=Object(l.a)("textarea",{target:"e16lve6w3"})({name:"ipqq7p",styles:"width:100%;margin:0 0 1em 0;line-height:1.6;min-height:250px;resize:vertical;"}),p=Object(l.a)("input",{target:"e16lve6w4"})("background:",(function(e){return e.theme.colors.text})," !important;color:white !important;cursor:pointer;transition:0.2s;&:hover{background:",(function(e){return e.theme.colors.highlight})," !important;}"),b=Object(l.a)("div",{target:"e16lve6w5"})("background:white;padding:2em;border-radius:2px;position:fixed;min-width:75%;top:50%;left:50%;transform:translate(-50%,-50%);margin:0 auto;z-index:99;display:flex;flex-flow:column;align-items:flex-start;transition:0.2s all;opacity:",(function(e){return e.visible?"1":"0"}),";visibility:",(function(e){return e.visible?"visible":"hidden"}),";@media screen and (min-width:",(function(e){return e.theme.responsive.small}),"){min-width:inherit;max-width:400px;}p{line-height:1.6;margin:0 0 2em 0;}"),f=Object(l.a)("div",{target:"e16lve6w6"})("background:",(function(e){return e.theme.colors.text}),";font-size:1em;display:inline-block;margin:0 auto;border:none;outline:none;cursor:pointer;color:white;padding:1em;border-radius:2px;text-decoration:none;transition:0.2s;z-index:99;&:focus{outline:none;}&:hover{background:",(function(e){return e.theme.colors.highlight}),";}"),g=function(e){return Object.keys(e).map((function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])})).join("&")},w=function(e){var t,n;function i(t){var n;return(n=e.call(this,t)||this).handleInputChange=function(e){var t,i=e.target,o=i.value,a=i.name;n.setState(((t={})[a]=o,t))},n.handleSubmit=function(e){fetch("/?no-cache=1",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:g(Object.assign({"form-name":"contact"},n.state))}).then(n.handleSuccess).catch((function(e){return alert(e)})),e.preventDefault()},n.handleSuccess=function(){n.setState({name:"",email:"",message:"",showModal:!0})},n.closeModal=function(){n.setState({showModal:!1})},n.state={name:"",email:"",message:"",showModal:!1},n}return n=e,(t=i).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,i.prototype.render=function(){return Object(s.c)(u,{name:"contact",onSubmit:this.handleSubmit,"data-netlify":"true","data-netlify-honeypot":"bot",overlay:this.state.showModal,onClick:this.closeModal},Object(s.c)("input",{type:"hidden",name:"form-name",value:"contact"}),Object(s.c)("p",{hidden:!0},Object(s.c)("label",null,"Don’t fill this out:"," ",Object(s.c)("input",{name:"bot",onChange:this.handleInputChange}))),Object(s.c)(h,{name:"name",type:"text",placeholder:"Full Name",value:this.state.name,onChange:this.handleInputChange,required:!0}),Object(s.c)(d,{name:"email",type:"email",placeholder:"Email",value:this.state.email,onChange:this.handleInputChange,required:!0}),Object(s.c)(m,{name:"message",type:"text",placeholder:"Message",value:this.state.message,onChange:this.handleInputChange,required:!0}),Object(s.c)(p,{name:"submit",type:"submit",value:"Send"}),Object(s.c)(b,{visible:this.state.showModal},Object(s.c)("p",null,"Thank you for reaching out. I will get back to you as soon as possible."),Object(s.c)(f,{onClick:this.closeModal},"Okay")))},i}(o.a.Component),v=n("EYWl");t.default=function(e){e.data;return Object(s.c)(a.a,null,Object(s.c)(v.a,{title:"Contact",description:"Contact description goes here"}),Object(s.c)(r.a,null,Object(s.c)(c.a,null,"Contact"),Object(s.c)(w,null)))}}}]);
//# sourceMappingURL=component---src-pages-contact-js-64b9b86771fd245d19d8.js.map