(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{563:function(t,e,r){"use strict";var o=r(565);e.a=o.a},573:function(t,e,r){"use strict";var o=r(5),n=r(576),l=r(40),c=r(39),d=r(59),v=r(168);o({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=l(this),r=c(e),o=v(e,0);return o.length=n(o,e,e,r,0,void 0===t?1:d(t)),o}})},574:function(t,e,r){r(134)("flat")},576:function(t,e,r){"use strict";var o=r(135),n=r(39),l=r(205),c=r(93),d=function(t,e,source,r,v,h,f,_){for(var element,m,y=v,x=0,O=!!f&&c(f,_);x<r;)x in source&&(element=O?O(source[x],x,e):source[x],h>0&&o(element)?(m=n(element),y=d(t,e,element,m,y,h-1)-1):(l(y+1),t[y]=element),y++),x++;return y};t.exports=d},579:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var o=r(169);var n=r(209),l=r(137);function c(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||Object(n.a)(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},599:function(t,e,r){"use strict";r(33),r(25),r(35),r(8),r(28),r(31),r(37);var o=r(6),n=(r(604),r(77));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=n.a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:c({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:c({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},604:function(t,e,r){var content=r(605);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("7132a15d",content,!0,{sourceMap:!1})},605:function(t,e,r){var o=r(53)(!1);o.push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom;margin:0 -1px}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""]),t.exports=o},628:function(t,e,r){var content=r(629);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("5db1c400",content,!0,{sourceMap:!1})},629:function(t,e,r){var o=r(53)(!1);o.push([t.i,'.theme--light.v-alert .v-alert--prominent .v-alert__icon:after{background:rgba(0,0,0,.12)}.theme--dark.v-alert .v-alert--prominent .v-alert__icon:after{background:hsla(0,0%,100%,.12)}.v-sheet.v-alert{border-radius:4px}.v-sheet.v-alert:not(.v-sheet--outlined){box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-sheet.v-alert.v-sheet--shaped{border-radius:24px 4px}.v-alert{display:block;font-size:16px;margin-bottom:16px;padding:16px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-alert:not(.v-sheet--tile){border-radius:4px}.v-application--is-ltr .v-alert>.v-alert__content,.v-application--is-ltr .v-alert>.v-icon{margin-right:16px}.v-application--is-rtl .v-alert>.v-alert__content,.v-application--is-rtl .v-alert>.v-icon{margin-left:16px}.v-application--is-ltr .v-alert>.v-icon+.v-alert__content{margin-right:0}.v-application--is-rtl .v-alert>.v-icon+.v-alert__content{margin-left:0}.v-application--is-ltr .v-alert>.v-alert__content+.v-icon{margin-right:0}.v-application--is-rtl .v-alert>.v-alert__content+.v-icon{margin-left:0}.v-alert__border{border-style:solid;border-width:4px;content:"";position:absolute}.v-alert__border:not(.v-alert__border--has-color){opacity:.26}.v-alert__border--left,.v-alert__border--right{bottom:0;top:0}.v-alert__border--bottom,.v-alert__border--top{left:0;right:0}.v-alert__border--bottom{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;bottom:0}.v-application--is-ltr .v-alert__border--left{border-top-left-radius:inherit;border-bottom-left-radius:inherit;left:0}.v-application--is-ltr .v-alert__border--right,.v-application--is-rtl .v-alert__border--left{border-top-right-radius:inherit;border-bottom-right-radius:inherit;right:0}.v-application--is-rtl .v-alert__border--right{border-top-left-radius:inherit;border-bottom-left-radius:inherit;left:0}.v-alert__border--top{border-top-left-radius:inherit;border-top-right-radius:inherit;top:0}.v-alert__content{flex:1 1 auto}.v-application--is-ltr .v-alert__dismissible{margin:-16px -8px -16px 8px}.v-application--is-rtl .v-alert__dismissible{margin:-16px 8px -16px -8px}.v-alert__icon{align-self:flex-start;border-radius:50%;height:24px;min-width:24px;position:relative}.v-application--is-ltr .v-alert__icon{margin-right:16px}.v-application--is-rtl .v-alert__icon{margin-left:16px}.v-alert__icon.v-icon{font-size:24px}.v-alert__wrapper{align-items:center;border-radius:inherit;display:flex}.v-application--is-ltr .v-alert--border.v-alert--prominent .v-alert__icon{margin-left:8px}.v-application--is-rtl .v-alert--border.v-alert--prominent .v-alert__icon{margin-right:8px}.v-alert--dense{padding-top:8px;padding-bottom:8px}.v-alert--dense .v-alert__border{border-width:medium}.v-alert--outlined{background:transparent!important;border:thin solid!important}.v-alert--outlined .v-alert__icon{color:inherit!important}.v-alert--prominent .v-alert__icon{align-self:center;height:48px;min-width:48px}.v-alert--prominent .v-alert__icon.v-icon{font-size:32px}.v-alert--prominent .v-alert__icon.v-icon:after{background:currentColor!important;border-radius:50%;bottom:0;content:"";left:0;opacity:.16;position:absolute;right:0;top:0}.v-alert--prominent.v-alert--dense .v-alert__icon.v-icon:after{transform:scale(1)}.v-alert--text{background:transparent!important}.v-alert--text:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;position:absolute;pointer-events:none;right:0;top:0}',""]),t.exports=o},648:function(t,e,r){r(5)({target:"Object",stat:!0},{is:r(417)})},686:function(t,e,r){"use strict";r(33),r(25),r(35),r(8),r(28),r(31),r(37);var o=r(6),n=(r(79),r(628),r(206)),l=r(563),c=r(562),d=r(133),v=r(77),h=r(1).a.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),f=r(64),_=r(29);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(f.a)(n.a,d.a,h).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(t){return"string"==typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var data={staticClass:"v-alert__border",class:Object(o.a)({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&((data=this.setBackgroundColor(this.computedColor,data)).class["v-alert__border--has-color"]=!0),this.$createElement("div",data)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(l.a,{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(c.a,{props:{color:e}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(c.a,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=y(y({},n.a.options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"==typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||v.a.options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(_.a)("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible];return this.$createElement("div",{staticClass:"v-alert__wrapper"},t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var data={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};this.coloredBorder||(data=(this.hasText?this.setTextColor:this.setBackgroundColor)(this.computedColor,data));return this.$createElement("div",data,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},839:function(t,e,r){"use strict";r.r(e);var o=r(686),n=r(565),l=r(599),c=r(564),d=r(725),v=r(612),h=r(2),f=(r(65),r(215),r(45),r(43)),_=r(116),m=r(18),y=r(0),x=r.n(y),O={data:function(){return{user:_.a.user,mytier:{},datePer:0,response:!1,count:0}},mounted:function(){var t=this;return Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.run();case 2:case"end":return e.stop()}}),e)})))()},methods:{run:function(){var t=this;return Object(h.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.loadMyTier();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()},loadMyTier:function(){var t=this;return Object(h.a)(regeneratorRuntime.mark((function e(){var r,o,n,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.getHttp("/api/payout/userpayout/?user=".concat(t.user.id));case 2:if(!((r=e.sent).length>0)){e.next=21;break}if(t.mytier=r[r.length-1],o=x()(),n=x()(t.mytier.end_date),l=n.diff(o,"days"),t.datePer=Number((l/t.mytier.days*100).toFixed(0)),console.log(l,t.datePer,t.mytier.days),t.count=l,!(l<3&&l>0)){e.next=16;break}return e.next=14,f.a.alert("สมาชิกใกล้หมดอายุแล้ว","info","คุณมีเวลาเหลืออีก ".concat(l," วัน กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป"));case 14:e.next=21;break;case 16:if(0!=l||1!=t.user.in_class){e.next=21;break}return e.next=19,f.a.alert("หมดอายุแล้ว","info","กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป");case 19:return e.next=21,_.a.switchUser(!1);case 21:case"end":return e.stop()}}),e)})))()}},computed:{endDate:function(){try{return x()(this.mytier.end_date).format("DD/MM/YYYY")}catch(t){return"-"}}}},w=r(81),component=Object(w.a)(O,(function(){var t=this,e=t._self._c;return e("div",[t.mytier.id||t.user.in_class?e("div",[0==t.mytier.status?e("div",[t.mytier.image_slip?e("div",[e("center",[e(c.a,{attrs:{size:"60",color:"green"}},[t._v("mdi-check-circle")]),t._v(" "),e("br"),t._v(" "),e("h2",{staticClass:"text-green-500 font-semibold text-xl"},[t._v("อัพโหลดหลักฐานการชำระเงิน เรียบร้อยแล้ว")]),t._v(" "),e("span",[e("p",[t._v("ขอบคุณที่ใช้บริการ กรุณารอการตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ จากนั้นจะสามารถใช้งานได้ต่อไป")])]),t._v(" "),e(n.a,{staticClass:"mt-4",attrs:{depressed:"",color:"warning"},on:{click:function(e){return t.$router.push("/payout/checkout/?id=".concat(t.mytier.id))}}},[t._v("แก้ไขหลักฐานการชำระเงิน")])],1)],1):e("div",[e("center",[e(c.a,{attrs:{size:"60",color:"orange"}},[t._v("mdi-information")]),t._v(" "),e("br"),t._v(" "),e(n.a,{attrs:{depressed:"",color:"success"},on:{click:function(e){return t.$router.push("/payout/checkout/?id=".concat(t.mytier.id))}}},[t._v("อัพโหลดหลักฐานการชำระเงิน")])],1),t._v(" "),e("p",[t._v(" หากคุณชำระเงินแล้วรอแอดมินตรวจสอบข้อมูลการชำระเงิน 1-2 วันทำการ")])],1)]):1==t.mytier.status?e("div",[t.count<1?e(o.a,{attrs:{type:"error"}},[t._v("\n                หมดอายุแล้ว กรุณาต่ออายุหลังจากหมดอายุแล้ว เพื่อให้สามารถใช้งานได้ต่อไป\n            ")]):t._e(),t._v(" "),e("h2",{staticClass:"font-semibold text-xl"},[t._v("Package "+t._s("".concat(t.mytier.tier_name)))]),t._v(" "),e(v.a,{staticClass:"mt-6",attrs:{readonly:"",dense:"",value:t.user.number_class,label:"จำนวน Class ที่จองได้",id:"id"}}),t._v(" "),e(d.a,{attrs:{value:t.datePer,height:"15",striped:"",color:t.datePer>=50?"green":t.datePer>=40?"orange":"red"}}),t._v(" (เหลือ "+t._s(t.count)+" วัน)\n            "),e(v.a,{staticClass:"mt-6",attrs:{readonly:"",dense:"",value:t.endDate,label:"วันหมดอายุสมาชิก",id:"id"}}),t._v(" "),e("p",[t._v(t._s(t.mytier.continue_course_data))]),t._v(" "),e(n.a,{attrs:{block:"",color:"success"},on:{click:function(e){return t.$router.push("/payout?old_id=".concat(t.mytier.id))}}},[t._v("สมัคร Package ใหม่/ต่ออายุสมาชิก")])],1):e("div",[e("h2",{staticClass:"font-semibold"},[t._v("ไม่ได้เป็นสมาชิก หรือ สถานะสมาชิกของคุณอาจหมดอายุแล้ว")]),t._v(" "),e("p",[t._v(t._s(t.mytier.ect))]),t._v(" "),e(n.a,{attrs:{block:"",color:"success"},on:{click:function(e){return t.$router.push("/payout/")}}},[t._v("สมัครเป็นสมาชิก/ต่ออายุสมาชิก")])],1),t._v(" "),1==t.mytier.status?e("div",[e(l.a),t._v(" "),e("br"),t._v(" "),t.count<1?e(n.a,{attrs:{block:"",color:"success"},on:{click:function(e){return t.$router.push("/payout/")}}},[t._v("ต่ออายุสมาชิก")]):t._e()],1):t._e()]):e("div",[e("h2",[t._v("เพื่อใช้งานส่วนต่างๆ ของระบบ คุณค้องเป็นสมาชิกกับ Fitness ก่อน")]),t._v(" "),e(n.a,{attrs:{block:"",color:"success"},on:{click:function(e){return t.$router.push("/payout/")}}},[t._v("สมัครเป็นสมาชิกกับ Fitness")])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);