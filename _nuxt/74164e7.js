(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{806:function(t,e,r){"use strict";r.r(e);var n=r(565),c=(r(38),r(25),r(71),r(2)),o=(r(30),r(73),r(65),r(36),r(45),r(43)),d=r(116),l=r(18),x=r(0),f=r.n(x),m={data:function(){return{tier:d.a.mytier,user:d.a.user,tires:[],response:!1,oldTier:null}},created:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$auth.setUser();case 3:if(t.user=d.a.user,t.user){e.next=9;break}return e.next=7,t.$router.push("/auth/register/");case 7:e.next=12;break;case 9:return e.next=11,t.run();case 11:t.response=!0;case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(0),e.next=18,t.$router.push("/auth/register/");case 18:case"end":return e.stop()}}),e,null,[[0,14]])})))()},methods:{run:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.loadTires();case 3:return e.next=5,t.getOldTierUser();case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})))()},loadTires:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=t.$route.query.pro_id)){e.next=7;break}return e.next=4,l.a.getHttp("/api/payout/tier/?is_active=true&by_promotion=true&promotion=".concat(r));case 4:t.tires=e.sent,e.next=10;break;case 7:return e.next=9,l.a.getHttp("/api/payout/tier/?is_active=true&by_promotion=false");case 9:t.tires=e.sent;case 10:case"end":return e.stop()}}),e)})))()},getOldTierUser:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(r=t.$route.query.old_id)){e.next=6;break}return e.next=5,l.a.getHttp("/api/payout/userpayout/".concat(r,"/"));case 5:t.oldTier=e.sent;case 6:e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})))()},chooseTier:function(t){var e=this;return Object(c.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e.oldTier){r.next=5;break}return r.next=3,e.chooseTierContinue(t);case 3:r.next=17;break;case 5:return r.next=7,o.a.confirm("ต้องการซื้อ ".concat(t.name," ?"),"คุณแน่ใจใช่ไหมที่จะยืนยันการสั่งซื้อ Package นี้");case 7:if(!r.sent){r.next=17;break}return r.next=11,l.a.postHttp("/api/payout/userpayout/",{amount:t.price,days:t.days,status:0,user:e.user.id,tier:t.id});case 11:if(!r.sent.id){r.next=17;break}return r.next=15,o.a.alert("ยืนยันการซื้อ Package สำเร็จ");case 15:return r.next=17,e.$router.replace("/account?tab=2");case 17:case"end":return r.stop()}}),r)})))()},chooseTierContinue:function(t){var e=this;return Object(c.a)(regeneratorRuntime.mark((function r(){var n,c,d,x;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,o.a.confirm("ต้องการซื้อ ".concat(t.name," ?"),"คุณแน่ใจใช่ไหมที่จะยืนยันการสั่งซื้อ Package นี้ ต่อจาก ".concat(e.oldTier.tier_name," จำนวนวันที่เหลือจะถูกรวมใน Package ใหม่"));case 2:if(!r.sent){r.next=18;break}return n=f()(e.oldTier.end_date),c=f()(),d=n.diff(c,"days"),x=Number(d)>=0?Number(d):0,r.next=10,l.a.postHttp("/api/payout/userpayout/",{amount:t.price,days:t.days+x,status:0,user:e.user.id,tier:t.id,ect:"จำนวนวันของ Package ".concat(t.name," (").concat(t.days," วัน) จะถูกเพิ่มขึ้นอีก ").concat(d," วัน จาก Package ").concat(e.oldTier.tier_name),continue_course:!0,continue_course_date:f()().format("YYYY-MM-DD"),continue_course_data:"ต่ออายุจาก Package ".concat(e.oldTier.tier_name," (โดย Package เดิมจะสิ้นสุดวันที่ ").concat(n.format("DD/MM/YYYY")," และ จำนวนวันที่เหลือจาก Package เดิม ").concat(d," วัน )")});case 10:if(!r.sent.id){r.next=18;break}return r.next=14,e.changeOldTierStatus();case 14:return r.next=16,o.a.alert("ยืนยันการซื้อ Package สำเร็จ");case 16:return r.next=18,e.$router.replace("/account?tab=2");case 18:case"end":return r.stop()}}),r)})))()},changeOldTierStatus:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.a.putHttp("/api/payout/userpayout/".concat(t.oldTier.id,"/"),{status:2,ect:"Package ถูกยกเลิกโดยระบบ เนื่องจากมีการสั่งซื้อ Package ใหม่"});case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()}}},v=r(81),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg"},[t.response?e("section",{staticClass:"pt-6 pb-32 bg overflow-hidden",attrs:{"data-section-id":"1","data-share":"","data-category":"pricing"}},[e("div",{staticClass:"container mx-auto"},[t._m(0),t._v(" "),e("div",{staticClass:"flex flex-wrap"},t._l(t.tires,(function(r,c){return e("div",{key:c,staticClass:"w-full md:w-1/3 mt-4",on:{click:function(e){return t.chooseTier(r)}}},[e("div",{staticClass:"relative pt-8 px-11 pb-10 bg-white rounded shadow-8xl shadow-lg"},[r.recommended?e("p",{staticClass:"absolute right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-100 uppercase tracking-px rounded-full text-gray-900",attrs:{"data-config-id":"auto-txt-22-1"}},[t._v("แนะนำ")]):t._e(),t._v(" "),r.by_promotion?e("p",{staticClass:"right-2 top-2 font-heading px-2.5 py-1 text-base max-w-max bg-orange-500 uppercase tracking-px rounded-full text-white",attrs:{"data-config-id":"auto-txt-22-1"}},[t._v("โปรโมชัน")]):t._e(),t._v(" "),e("h3",{staticClass:"mb-0.5 font-heading font-semibold text-lg text-gray-900",attrs:{"data-config-id":"auto-txt-23-1"}},[t._v(t._s(r.name))]),t._v(" "),e("p",{staticClass:"mb-5 text-gray-600 text-sm",attrs:{"data-config-id":"auto-txt-24-1"}},[t._v(t._s(r.description))]),t._v(" "),e("div",{staticClass:"mb-9 flex"},[e("span",{staticClass:"mr-1 mt-0.5 font-heading font-semibold text-lg text-gray-900",attrs:{"data-config-id":"auto-txt-25-1"}},[t._v("฿")]),t._v(" "),e("span",{staticClass:"font-heading font-semibold text-6xl sm:text-7xl text-gray-900",attrs:{"data-config-id":"auto-txt-26-1"}},[t._v(t._s(r.price))]),t._v(" "),e("span",{staticClass:"font-heading font-semibold self-end",attrs:{"data-config-id":"auto-txt-27-1"}},[t._v(" ("+t._s(r.days)+" วัน) ")])]),t._v(" "),e("div",{staticClass:"group relative mb-9"},[e("div",{staticClass:"absolute top-0 left-0 w-full h-full bg-gradient-green opacity-0 group-hover:opacity-50 p-1 rounded-lg transition ease-out duration-300"}),t._v(" "),e(n.a,{attrs:{block:"",color:"success"}},[t._v("เลือก Package นี้")])],1),t._v(" "),e("p",[t._v("\n                            "+t._s(r.detail)+"\n                        ")])])])})),0)])]):t._e()])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"max-w-xl"},[e("h2",{staticClass:"font-heading font-bold text-4xl sm:text-7xl",attrs:{"data-config-id":"auto-txt-2-1"}},[t._v("Packages")]),t._v(" "),e("span",{staticClass:"inline-block text-base",attrs:{"data-config-id":"auto-txt-1-1"}},[t._v("เลือกรายการที่คุณต้องการ")])])}],!1,null,null,null);e.default=component.exports}}]);