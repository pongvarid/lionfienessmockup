(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{830:function(t,e,n){"use strict";n.r(e);var r=n(576),o=n(557),c=n(552),l=n(559),v=n(693),d=n(600),f=n(579),_=(n(40),n(583),n(1)),m=(n(41),{data:function(){return{lists:[]}},created:function(){var t=this;return Object(_.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.run();case 2:case"end":return e.stop()}}),e)})))()},methods:{run:function(){var t=this;return Object(_.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$core.getHttp("/api/app/contact/");case 2:t.lists=e.sent;case 3:case"end":return e.stop()}}),e)})))()},open:function(link,t){return Object(_.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.open(link,"_system","location=yes");case 1:case"end":return t.stop()}}),t)})))()}}}),w=n(70),component=Object(w.a)(m,(function(){var t=this,e=t._self._c;return e("div",[e(d.a,{attrs:{dark:""}},[e(r.a,{attrs:{icon:""},on:{click:function(e){return t.$router.push("/home")}}},[e(l.a,[t._v("mdi-arrow-left")])],1),t._v(" "),e(f.a,[t._v(t._s(t.$l("ติดต่อเรา","Contact"))+" ")]),t._v(" "),e(v.a)],1),t._v(" "),e("div",[e("div",t._l(t.lists,(function(n,i){return e("div",{key:i},[e(o.a,{staticClass:"m-2",attrs:{outlined:""}},[e(c.c,[e("h2",{staticClass:"font-semibold text-base"},[t._v(t._s(n.name))]),t._v(" "),e("p",[t._v(t._s(n.detail))]),t._v(" "),n.link?e(r.a,{attrs:{outlined:"",block:"",depressed:"",color:"success"},on:{click:function(e){return t.open(n.link,n.name)}}},[t._v(t._s(t.$l("เปิดลิ้ง","Open Link")))]):t._e()],1)],1)],1)})),0),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("br")])],1)}),[],!1,null,null,null);e.default=component.exports}}]);