(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{562:function(t,e,r){"use strict";var n=r(564);e.a=n.a},573:function(t,e,r){"use strict";var n=r(5),o=r(577),c=r(41),l=r(40),d=r(59),h=r(168);n({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=c(this),r=l(e),n=h(e,0);return n.length=o(n,e,e,r,0,void 0===t?1:d(t)),n}})},574:function(t,e,r){r(134)("flat")},577:function(t,e,r){"use strict";var n=r(135),o=r(40),c=r(205),l=r(94),d=function(t,e,source,r,h,v,m,f){for(var element,_,w=h,y=0,x=!!m&&l(m,f);y<r;)y in source&&(element=x?x(source[y],y,e):source[y],v>0&&n(element)?(_=o(element),w=d(t,e,element,_,w,v-1)-1):(c(w+1),t[w]=element),w++),y++;return w};t.exports=d},596:function(t,e,r){"use strict";r(33),r(25),r(35),r(8),r(28),r(31),r(38);var n=r(6),o=(r(601),r(77));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:l({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:l({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},601:function(t,e,r){var content=r(602);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("7132a15d",content,!0,{sourceMap:!1})},602:function(t,e,r){var n=r(53)(!1);n.push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom;margin:0 -1px}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""]),t.exports=n},668:function(t,e,r){t.exports=r.p+"img/logox.8267d60.jpg"},717:function(t,e,r){var content=r(718);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("2d62e390",content,!0,{sourceMap:!1})},718:function(t,e,r){var n=r(53)(!1);n.push([t.i,".v-carousel{overflow:hidden;position:relative;width:100%}.v-carousel__controls{align-items:center;background:rgba(0,0,0,.3);bottom:0;display:flex;height:50px;justify-content:center;list-style-type:none;position:absolute;width:100%;z-index:1}.v-carousel__controls>.v-item-group{flex:0 1 auto}.v-carousel__controls__item{margin:0 8px}.v-carousel__controls__item .v-icon{opacity:.5}.v-carousel__controls__item--active .v-icon{opacity:1;vertical-align:middle}.v-carousel__controls__item:hover{background:none}.v-carousel__controls__item:hover .v-icon{opacity:.8}.v-carousel__progress{margin:0;position:absolute;bottom:0;left:0;right:0}.v-carousel .v-window-item{display:block;height:inherit;text-decoration:none}.v-carousel--hide-delimiter-background .v-carousel__controls{background:transparent}.v-carousel--vertical-delimiters .v-carousel__controls{height:100%!important;width:50px}",""]),t.exports=n},726:function(t,e,r){var content=r(770);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("69dc683a",content,!0,{sourceMap:!1})},768:function(t,e,r){"use strict";r(33),r(25),r(35),r(8),r(28),r(31),r(38);var n=r(6),o=r(706),c=r(685),l=r(64),d=r(9),h=r(167);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=Object(l.a)(o.a,h.a);e.a=f.extend().extend({name:"v-carousel-item",inject:{parentTheme:{default:{isDark:!1}}},provide:function(){return{theme:this.parentTheme}},inheritAttrs:!1,methods:{genDefaultSlot:function(){return[this.$createElement(c.a,{staticClass:"v-carousel__item",props:m(m({},this.$attrs),{},{height:this.windowGroup.internalHeight}),on:this.$listeners,scopedSlots:{placeholder:this.$scopedSlots.placeholder}},Object(d.o)(this))]},genWindowItem:function(){var t=this.generateRouteLink(),e=t.tag,data=t.data;return data.staticClass="v-window-item",data.directives.push({name:"show",value:this.isActive}),this.$createElement(e,data,this.genDefaultSlot())}}})},769:function(t,e,r){"use strict";r(726)},770:function(t,e,r){var n=r(53)(!1);n.push([t.i,".class-video[data-v-0c0694a2]{width:100vw;height:60vh;-o-object-fit:cover;object-fit:cover}",""]),t.exports=n},784:function(t,e,r){"use strict";r(33),r(25),r(35),r(8),r(28),r(31),r(38);var n=r(6),o=(r(65),r(80),r(717),r(705)),c=r(563),l=r(562),d=r(618),h=r(589),v=h.a.extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return h.a.options.computed.classes.call(this)}},methods:{genData:h.a.options.methods.genData}}),m=r(9),f=r(29);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function w(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-carousel",props:{continuous:{type:Boolean,default:!0},cycle:Boolean,delimiterIcon:{type:String,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:function(t){return t>0}},mandatory:{type:Boolean,default:!0},progress:Boolean,progressColor:String,showArrows:{type:Boolean,default:!0},verticalDelimiters:{type:String,default:void 0}},provide:function(){return{parentTheme:this.theme}},data:function(){return{internalHeight:this.height,slideTimeout:void 0}},computed:{classes:function(){return w(w({},o.a.options.computed.classes.call(this)),{},{"v-carousel":!0,"v-carousel--hide-delimiter-background":this.hideDelimiterBackground,"v-carousel--vertical-delimiters":this.isVertical})},isDark:function(){return this.dark||!this.light},isVertical:function(){return null!=this.verticalDelimiters}},watch:{internalValue:"restartTimeout",interval:"restartTimeout",height:function(t,e){t!==e&&t&&(this.internalHeight=t)},cycle:function(t){t?this.restartTimeout():(clearTimeout(this.slideTimeout),this.slideTimeout=void 0)}},created:function(){this.$attrs.hasOwnProperty("hide-controls")&&Object(f.a)("hide-controls",':show-arrows="false"',this)},mounted:function(){this.startTimeout()},methods:{genControlIcons:function(){return this.isVertical?null:o.a.options.methods.genControlIcons.call(this)},genDelimiters:function(){return this.$createElement("div",{staticClass:"v-carousel__controls",style:{left:"left"===this.verticalDelimiters&&this.isVertical?0:"auto",right:"right"===this.verticalDelimiters?0:"auto"}},[this.genItems()])},genItems:function(){for(var t=this,e=this.items.length,r=[],i=0;i<e;i++){var n=this.$createElement(c.a,{staticClass:"v-carousel__controls__item",attrs:{"aria-label":this.$vuetify.lang.t("$vuetify.carousel.ariaLabel.delimiter",i+1,e)},props:{icon:!0,small:!0,value:this.getValue(this.items[i],i)}},[this.$createElement(l.a,{props:{size:18}},this.delimiterIcon)]);r.push(n)}return this.$createElement(v,{props:{value:this.internalValue,mandatory:this.mandatory},on:{change:function(e){t.internalValue=e}}},r)},genProgress:function(){return this.$createElement(d.a,{staticClass:"v-carousel__progress",props:{color:this.progressColor,value:(this.internalIndex+1)/this.items.length*100}})},restartTimeout:function(){this.slideTimeout&&clearTimeout(this.slideTimeout),this.slideTimeout=void 0,window.requestAnimationFrame(this.startTimeout)},startTimeout:function(){this.cycle&&(this.slideTimeout=window.setTimeout(this.next,+this.interval>0?+this.interval:6e3))}},render:function(t){var e=o.a.options.render.call(this,t);return e.data.style="height: ".concat(Object(m.g)(this.height),";"),this.hideDelimiters||e.children.push(this.genDelimiters()),(this.progress||this.progressColor)&&e.children.push(this.genProgress()),e}})},819:function(t,e,r){"use strict";r.r(e);var n=r(565),o=r(784),c=r(768),l=r(596),d=r(564),h=r(647),v=r(740),m=(r(39),r(36),r(2)),f=(r(71),r(45),r(37)),_=r(18),w=r(116),y=r(103),x=r(626),O=r.n(x),j={name:"classId",mounted:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.run();case 2:t.response=!0;case 3:case"end":return e.stop()}}),e)})))()},data:function(){return{response:!1,tier:w.a.mytier,id:0,def:{id:1,name:"BODYPUMB",detail:"เรื่องความไว้วางใจเทรนเนอร์ส่วนตัวสอนออกกำลังกาย  ที่ Lion Fitness ไม่ต้องใหวตก็ตัดสินใจได้ทันที  แค่เริ่มมาทดลองเทรนฟรีกับเรา เทรนเนอร์ที่มีประสบการณ์มากกว่า 100 ชม. พร้อมทั้งประเมินสมรรถภาพการออกกำลังกาย วิเคราะห์มวลร่างกายและให้คำปรึกษาการวางเป้าหมายในการออกกำลังกาย",video:"video/class/01_bpfhtbk.mp4",image_1:"images/class/cbg_KwrYJbJ.png",image_2:null,image_3:null,image_4:null,image_5:null,recommend:!0,is_active:!0,created_at:"2022-08-07T08:13:01.030758Z",updated_at:"2022-08-28T17:07:48.114550Z",category:1},data:this.def,coaches:[],user:w.a.user,isClass:!0}},methods:{run:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.$route.params.id),t.id=t.$route.params.id,e.next=4,_.a.getHttp("/api/course/class/".concat(t.id,"/"));case 4:return data=e.sent,t.data=data.id?data:t.def,e.next=8,t.getCoaches();case 8:if(!w.a.user){e.next=12;break}return e.next=11,y.a.fundingClass(t.user.id,t.id);case 11:t.isClass=e.sent;case 12:case"end":return e.stop()}}),e)})))()},getCoaches:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.data.coaches&&(t.coaches=O.a.map(t.data.coaches,(function(t){return t.coach_training.user})));case 1:case"end":return e.stop()}}),e)})))()},registerClass:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=w.a,n=w.a.user,!r.mytier||!n.in_class){e.next=16;break}return e.next=5,f.a.confirm("ยืนยันการลงทะเบียนเข้าคลาส");case 5:if(!e.sent){e.next=14;break}return e.next=8,y.a.registerClass(t.user.id,t.id);case 8:if(!e.sent.id){e.next=12;break}return e.next=12,f.a.alert("ลงทะเบียนเข้าคลาส ".concat(t.data.name," สำเร็จ"));case 12:return e.next=14,t.run();case 14:e.next=18;break;case 16:return e.next=18,f.a.alert("กรุณาเลือกแพ็คเกจสมาชิกก่อนลงทะเบียนคลาส หรือ ต่ออายุสมาชิก","info");case 18:case"end":return e.stop()}}),e)})))()},getClass:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.$router.push("/auth/login/");case 1:case"end":return e.stop()}}),e)})))()}}},k=(r(769),r(81)),component=Object(k.a)(j,(function(){var t=this,e=t._self._c;return t.response?e("div",[e(v.a,{staticClass:"w-full mt-4",attrs:{absolute:"",color:"transparent",flat:"",fixed:""}},[e("h2",{staticClass:"text-2xl ml-4 text-white"},[t._v(t._s(t.data.name))]),t._v(" "),e(h.a),t._v(" "),e(n.a,{attrs:{dark:"",small:"",text:""},on:{click:function(e){return t.$router.push("/home/")}}},[e(d.a,{attrs:{size:"28"}},[t._v("mdi-close")])],1)],1),t._v(" "),e(o.a,{staticStyle:{height:"60vh"},attrs:{continuous:!1,cycle:!0,"show-arrows":!1,"hide-delimiter-background":"","delimiter-icon":"mdi-minus"}},[e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("video",{staticClass:"class-video",attrs:{autoplay:"",muted:"",playsinline:"",loop:""},domProps:{muted:!0}},[e("source",{attrs:{src:"".concat(t.$url,"/").concat(t.data.video),type:"video/mp4"}}),t._v("\n                    Your browser does not support HTML5 video.\n                ")])])]),t._v(" "),t.data.image_1?e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("img",{staticClass:"class-video",attrs:{src:"".concat(t.$url,"/").concat(t.data.image_1),alt:""}})])]):t._e(),t._v(" "),t.data.image_2?e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("img",{staticClass:"class-video",attrs:{src:"".concat(t.$url,"/").concat(t.data.image_2),alt:""}})])]):t._e(),t._v(" "),t.data.image_3?e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("img",{staticClass:"class-video",attrs:{src:"".concat(t.$url,"/").concat(t.data.image_3),alt:""}})])]):t._e(),t._v(" "),t.data.image_4?e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("img",{staticClass:"class-video",attrs:{src:"".concat(t.$url,"/").concat(t.data.image_4),alt:""}})])]):t._e(),t._v(" "),t.data.image_5?e(c.a,[e("div",{staticClass:"relative overflow-hidden w-full"},[e("div",{staticClass:"absolute bg-gradient-to-b from-black/80 via-black-500/0 to-black/0 inset-0 z-0"}),t._v(" "),e("img",{staticClass:"class-video",attrs:{src:"".concat(t.$url,"/").concat(t.data.image_5),alt:""}})])]):t._e()],1),t._v(" "),e("div",[e("div",{staticClass:"p-6 pb-20"},[e(l.a,{staticClass:"mt-6"}),t._v(" "),e("h2",{staticClass:"text-xl xd uppercase mt-8"},[t._v("DETAILS")]),t._v(" "),e("div",{staticClass:"p-2"},[e("span",{domProps:{innerHTML:t._s(t.data.detail)}})]),t._v(" "),e(l.a,{staticClass:"mt-6 mb-4"}),t._v(" "),t._l(t.coaches,(function(n,i){return e("div",{key:"i",staticClass:"flex items-center"},[n.image?e("img",{staticClass:"rounded-full w-20 h-20 object-cover",attrs:{src:"".concat(t.$url,"/").concat(n.image),alt:""}}):e("img",{staticClass:"rounded-full w-20 h-20 object-cover",attrs:{src:r(668),alt:""}}),t._v(" "),e("div",[e("h2",{staticClass:"text-xl xd ml-2"},[t._v("Kru."+t._s(n.nick_name)+" ")])])])})),t._v(" "),e(l.a,{staticClass:"mt-4 mb-6"})],2)])],1):t._e()}),[],!1,null,"0c0694a2",null);e.default=component.exports}}]);