(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{809:function(t,e,r){"use strict";r.r(e);var n=r(564),o=(r(39),r(25),r(71),r(2)),c=(r(30),r(73),r(45),r(618),r(0)),d=r.n(c),l={data:function(){return{items:[],response:!1}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.run();case 2:t.response=!0;case 3:case"end":return e.stop()}}),e)})))()},methods:{run:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$core.getHttp("/api/trainer/trainer-coruse/?is_active=true");case 2:t.items=e.sent;case 3:case"end":return e.stop()}}),e)})))()},store:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!confirm(e.$l("ยืนยันการสั่งซื้อ Package นี้?","Confirm to buy this package?"))){r.next=10;break}return r.next=4,e.$core.postHttp("/api/trainer/trainer-class/",{number:t.count,end_date:d()().add(t.count,"days").format("YYYY-MM-DD"),status:0,is_active:!0,trainer:e.$route.query.id,coruse:t.id,user:e.$auth.user.id});case 4:if(!r.sent.id){r.next=10;break}return r.next=8,e.$web.alert(e.$l("สั่งซื้อ Package สำเร็จ","Buy package success"));case 8:return r.next=10,e.$router.replace("/trainer/me/");case 10:case"end":return r.stop()}}),r)})))()}}},f=r(78),component=Object(f.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg h-screen"},[e("section",{staticClass:"pt-6 pb-32 overflow-hidden",attrs:{"data-section-id":"1","data-share":"","data-category":"pricing"}},[e("div",{staticClass:"container mx-auto"},[e("div",{staticClass:"max-w-xl"},[e("h2",{staticClass:"font-heading font-bold text-4xl sm:text-7xl",attrs:{"data-config-id":"auto-txt-2-1"}},[t._v(t._s(t.$l("Packages","Packages")))]),t._v(" "),e("span",{staticClass:"inline-block text-base",attrs:{"data-config-id":"auto-txt-1-1"}},[t._v(t._s(t.$l("เลือกรายการที่คุณต้องการ","Choose the package you want.")))])]),t._v(" "),e("div",{staticClass:"flex flex-wrap"},t._l(t.items,(function(r,o){return e("div",{key:o,staticClass:"w-full md:w-1/3 mt-4"},[e("div",{staticClass:"relative pt-8 px-11 pb-10 bg-white rounded shadow-8xl shadow-lg"},[r.recommended?e("p",{staticClass:"absolute right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-100 uppercase tracking-px rounded-full text-gray-900",attrs:{"data-config-id":"auto-txt-22-1"}},[t._v("แนะนำ")]):t._e(),t._v(" "),e("h3",{staticClass:"mb-0.5 font-heading font-semibold text-lg text-gray-900",attrs:{"data-config-id":"auto-txt-23-1"}},[t._v(t._s(r.name))]),t._v(" "),e("p",{staticClass:"mb-5 text-gray-600 text-sm",attrs:{"data-config-id":"auto-txt-24-1"}},[t._v(t._s(r.description))]),t._v(" "),e("div",{staticClass:"mb-9 flex"},[e("span",{staticClass:"mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900",attrs:{"data-config-id":"auto-txt-25-1"}},[t._v("฿")]),t._v(" "),e("span",{staticClass:"font-heading font-semibold text-6xl sm:text-7xl text-gray-900",attrs:{"data-config-id":"auto-txt-26-1"}},[t._v(t._s(r.price))]),t._v(" "),e("span",{staticClass:"font-heading font-semibold self-end",attrs:{"data-config-id":"auto-txt-27-1"}},[t._v(" ("+t._s(r.count)+" ครั้ง/"+t._s(r.day)+" วัน) ")])]),t._v(" "),e("div",{staticClass:"group relative mb-9"},[e("div",{staticClass:"absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 p-1 rounded-lg transition ease-out duration-300"}),t._v(" "),e(n.a,{attrs:{block:"",color:"success"},on:{click:function(e){return t.store(r)}}},[t._v("เลือก Package นี้")])],1),t._v(" "),e("p",[t._v("\n                            "+t._s(r.ect)+"\n                        ")])])])})),0)])])])}),[],!1,null,null,null);e.default=component.exports}}]);