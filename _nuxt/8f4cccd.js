(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{621:function(n,t,e){var content=e(672);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,e(108).default)("0b257b05",content,!0,{sourceMap:!1})},671:function(n,t,e){"use strict";e(621)},672:function(n,t,e){var o=e(107)(!1);o.push([n.i,".navBtn-actions>span,.v-icon{color:#eaab4d}.navBtn>span{letter-spacing:-.3px;font-size:10px}",""]),n.exports=o},707:function(n,t,e){"use strict";e.r(t);var o=e(708),c=e(558),l=e(561),r=(e(34),{data:function(){return{menus:[{path:"/home",icon:"mdi-home",name:"home",label:"หน้าแรก"},{path:"/account",icon:"mdi-account",name:"account",label:"ข้อมูลส่วนตัว"},{path:"/calendar",icon:"mdi-calendar-blank",name:"calendar",label:"ปฏิทิน"},{path:"/history",icon:"mdi-clipboard-list",name:"history",label:"ประวัติ"},{path:"/alert",icon:"mdi-alert-circle",name:"alert",label:"ประกาศ"}]}},methods:{action:function(n){return this.$route.name==n}}}),d=(e(671),e(66)),component=Object(d.a)(r,(function(){var n=this,t=n._self._c;return t(o.a,{attrs:{fixed:""}},n._l(n.menus,(function(menu,e){return t(c.a,{key:e,class:"navBtn ".concat(n.action(menu.name)?"navBtn-actions":""),on:{click:function(t){return n.$router.push(menu.path)}}},[t("span",[n._v(n._s(menu.label))]),n._v(" "),t(l.a,[n._v(n._s(menu.icon))])],1)})),1)}),[],!1,null,null,null);t.default=component.exports}}]);