YUI.add("moodle-core_availability-form",function(e,t){M.core_availability=M.core_availability||{},M.core_availability.form={plugins:{},field:null,mainDiv:null,rootList:null,idCounter:0,init:function(t){for(var n in t){var r=t[n],i=M[r[0]].form;i.init.apply(i,r)}this.field=e.one("#id_availabilityconditionsjson"),this.field.setAttribute("aria-hidden","true"),this.mainDiv=e.Node.create('<div class="availability-field fcontainer"></div>'),this.field.insert(this.mainDiv,"after");var s=this.field.get("value");if(s==="")this.rootList=new M.core_availability.List(null,!0);else{var o=e.JSON.parse(s);this.rootList=new M.core_availability.List(o,!0)}this.mainDiv.appendChild(this.rootList.node),this.update(),this.rootList.renumber(),this.mainDiv.setAttribute("aria-live","polite"),this.field.ancestor("form").on("submit",function(){this.mainDiv.all("input,textarea,select").set("disabled",!0)},this)},update:function(){var t=this.rootList.getValue(),n=[];this.rootList.fillErrors(n),n.length!==0&&(t.errors=n),this.field.set("value",e.JSON.stringify(t))}},M.core_availability.plugin={allowAdd:!1,init:function(e,t,n){var r=e.replace(/^availability_/,"");this.allowAdd=t,M.core_availability.form.plugins[r]=this,this.initInner.apply(this,n)},initInner:function(){},getNode:function(){throw"getNode not implemented"},fillValue:function(){throw"fillValue not implemented"},fillErrors:function(){},focusAfterAdd:function(e){var t=e.one("input:not([disabled]),select:not([disabled])");t.focus()}},M.core_availability.List=function(t,n,r){this.children=[],n!==undefined&&(this.root=n);var i=M.str.availability;this.node=e.Node.create('<div class="availability-list"><h3 class="accesshide"></h3><div class="availability-inner"><div class="availability-header">'+i.listheader_sign_before+' <label><span class="accesshide">'+i.label_sign+' </span><select class="availability-neg" title="'+i.label_sign+'">'+'<option value="">'+i.listheader_sign_pos+"</option>"+'<option value="!">'+i.listheader_sign_neg+"</option></select></label> "+'<span class="availability-single">'+i.listheader_single+"</span>"+'<span class="availability-multi">'+i.listheader_multi_before+' <label><span class="accesshide">'+i.label_multi+" </span>"+'<select class="availability-op" title="'+i.label_multi+'"><option value="&">'+i.listheader_multi_and+"</option>"+'<option value="|">'+i.listheader_multi_or+"</option></select></label> "+i.listheader_multi_after+"</span></div>"+'<div class="availability-children"></div>'+'<div class="availability-none">'+M.str.moodle.none+"</div>"+'<div class="availability-button"></div></div></div>'),n||this.node.addClass("availability-childlist"),this.inner=this.node.one("> .availability-inner");var s=!0;n?(t&&t.show!==undefined&&(s=t.show),this.eyeIcon=new M.core_availability.EyeIcon(!1,s),this.node.one(".availability-header").get("firstChild").insert(this.eyeIcon.span,"before")):r&&(t&&t.showc!==undefined&&(s=t.showc),this.eyeIcon=new M.core_availability.EyeIcon(!1,s),this.inner.insert(this.eyeIcon.span,"before"));if(!n){var o=new M.core_availability.DeleteIcon(this),u=this.node.one(".availability-none");u.appendChild(document.createTextNode(" ")),u.appendChild(o.span),u.appendChild(e.Node.create('<span class="label label-warning">'+M.str.availability.invalid+"</span>"))}var a=e.Node.create('<button type="button" class="btn btn-default">'+M.str.availability.addrestriction+"</button>");a.on("click",function(){this.clickAdd()},this),this.node.one("div.availability-button").appendChild(a);if(t){switch(t.op){case"&":case"|":this.node.one(".availability-neg").set("value","");break;case"!&":case"!|":this.node.one(".availability-neg").set("value","!")}switch(t.op){case"&":case"!&":this.node.one(".availability-op").set("value","&");break;case"|":case"!|":this.node.one(".availability-op").set("value","|")}for(var f=0;f<t.c.length;f++){var l=t.c[f];this.root&&t&&t.showc!==undefined&&(l.showc=t.showc[f]);var c;l.type!==undefined?c=new M.core_availability.Item(l,this.root):c=new M.core_availability.List(l,!1,this.root),this.addChild(c)}}this.node.one(".availability-neg").on("change",function(){M.core_availability.form.update(),this.updateHtml()},this),this.node.one(".availability-op").on("change",function(){M.core_availability.form.update(),this.updateHtml()},this),this.updateHtml()},M.core_availability.List.prototype.addChild=function(t){this.children.length>0&&this.inner.one(".availability-children").appendChild(e.Node.create('<div class="availability-connector"><span class="label"></span></div>')),this.children.push(t),this.inner.one(".availability-children").appendChild(t.node)},M.core_availability.List.prototype.focusAfterAdd=function(){this.inner.one("button").focus()},M.core_availability.List.prototype.isIndividualShowIcons=function(){if(!this.root)throw"Can only call this on root list";var e=this.node.one(".availability-neg").get("value")==="!",t=this.node.one(".availability-op").get("value")==="|";return!e&&!t||e&&t},M.core_availability.List.prototype.renumber=function(e){var t={count:this.children.length},n;e===undefined?(t.number="",n=""):(t.number=e+":",n=e+".");var r=M.util.get_string("setheading","availability",t);this.node.one("> h3").set("innerHTML",r);for(var i=0;i<this.children.length;i++){var s=this.children[i];s.renumber(n+(i+1))}},M.core_availability.List.prototype.updateHtml=function(){this.children.length>0?(this.inner.one("> .availability-children").removeAttribute("aria-hidden"),this.inner.one("> .availability-none").setAttribute("aria-hidden","true"),this.inner.one("> .availability-header").removeAttribute("aria-hidden"),this.children.length>1?(this.inner.one(".availability-single").setAttribute("aria-hidden","true"),this.inner.one(".availability-multi").removeAttribute("aria-hidden")):(this.inner.one(".availability-single").removeAttribute("aria-hidden"),this.inner.one(".availability-multi").setAttribute("aria-hidden","true"))):(this.inner.one("> .availability-children").setAttribute("aria-hidden","true"),this.inner.
one("> .availability-none").removeAttribute("aria-hidden"),this.inner.one("> .availability-header").setAttribute("aria-hidden","true"));if(this.root){var e=this.isIndividualShowIcons();for(var t=0;t<this.children.length;t++){var n=this.children[t];e?n.eyeIcon.span.removeAttribute("aria-hidden"):n.eyeIcon.span.setAttribute("aria-hidden","true")}e?this.eyeIcon.span.setAttribute("aria-hidden","true"):this.eyeIcon.span.removeAttribute("aria-hidden")}var r;this.inner.one(".availability-op").get("value")==="&"?r=M.str.availability.and:r=M.str.availability.or,this.inner.all(".availability-connector span.label").each(function(e){e.set("innerHTML",r)})},M.core_availability.List.prototype.deleteDescendant=function(e){for(var t=0;t<this.children.length;t++){var n=this.children[t];if(n===e){this.children.splice(t,1);var r=n.node;return this.children.length>0&&(r.previous(".availability-connector")?r.previous(".availability-connector").remove():r.next(".availability-connector").remove()),this.inner.one("> .availability-children").removeChild(r),M.core_availability.form.update(),this.updateHtml(),this.inner.one("> .availability-button").one("button").focus(),!0}if(n instanceof M.core_availability.List){var i=n.deleteDescendant(e);if(i)return!0}}return!1},M.core_availability.List.prototype.clickAdd=function(){var t=e.Node.create('<div><ul class="list-unstyled"></ul><div class="availability-buttons"><button type="button" class="btn btn-default">'+M.str.moodle.cancel+"</button></div></div>"),n=t.one("button"),r={dialog:null},i=t.one("ul"),s,o,u,a;for(var f in M.core_availability.form.plugins){if(!M.core_availability.form.plugins[f].allowAdd)continue;s=e.Node.create('<li class="clearfix"></li>'),o="availability_addrestriction_"+f;var l=M.str["availability_"+f];u=e.Node.create('<button type="button" class="btn btn-default"id="'+o+'">'+l.title+"</button>"),u.on("click",this.getAddHandler(f,r),this),s.appendChild(u),a=e.Node.create('<label for="'+o+'">'+l.description+"</label>"),s.appendChild(a),i.appendChild(s)}s=e.Node.create('<li class="clearfix"></li>'),o="availability_addrestriction_list_",u=e.Node.create('<button type="button" class="btn btn-default"id="'+o+'">'+M.str.availability.condition_group+"</button>"),u.on("click",this.getAddHandler(null,r),this),s.appendChild(u),a=e.Node.create('<label for="'+o+'">'+M.str.availability.condition_group_info+"</label>"),s.appendChild(a),i.appendChild(s);var c={headerContent:M.str.availability.addrestriction,bodyContent:t,additionalBaseClass:"availability-dialogue",draggable:!0,modal:!0,closeButton:!1,width:"450px"};r.dialog=new M.core.dialogue(c),r.dialog.show(),n.on("click",function(){r.dialog.destroy(),this.inner.one("> .availability-button").one("button").focus()},this)},M.core_availability.List.prototype.getAddHandler=function(e,t){return function(){e?newItem=new M.core_availability.Item({type:e,creating:!0},this.root):newItem=new M.core_availability.List({c:[],showc:!0},!1,this.root),this.addChild(newItem),M.core_availability.form.update(),M.core_availability.form.rootList.renumber(),this.updateHtml(),t.dialog.destroy(),newItem.focusAfterAdd()}},M.core_availability.List.prototype.getValue=function(){var e={};e.op=this.node.one(".availability-neg").get("value")+this.node.one(".availability-op").get("value"),e.c=[];var t;for(t=0;t<this.children.length;t++)e.c.push(this.children[t].getValue());if(this.root)if(this.isIndividualShowIcons()){e.showc=[];for(t=0;t<this.children.length;t++)e.showc.push(!this.children[t].eyeIcon.isHidden())}else e.show=!this.eyeIcon.isHidden();return e},M.core_availability.List.prototype.fillErrors=function(e){this.children.length===0&&!this.root&&e.push("availability:error_list_nochildren");for(var t=0;t<this.children.length;t++)this.children[t].fillErrors(e)},M.core_availability.List.prototype.eyeIcon=null,M.core_availability.List.prototype.root=!1,M.core_availability.List.prototype.children=null,M.core_availability.List.prototype.node=null,M.core_availability.List.prototype.inner=null,M.core_availability.Item=function(t,n){this.pluginType=t.type,M.core_availability.form.plugins[t.type]===undefined?(this.plugin=null,this.pluginNode=e.Node.create('<div class="availability-warning">'+M.str.availability.missingplugin+"</div>")):(this.plugin=M.core_availability.form.plugins[t.type],this.pluginNode=this.plugin.getNode(t),this.pluginNode.addClass("availability_"+t.type)),this.node=e.Node.create('<div class="availability-item"><h3 class="accesshide"></h3></div>');if(n){var r=!0;t.showc!==undefined&&(r=t.showc),this.eyeIcon=new M.core_availability.EyeIcon(!0,r),this.node.appendChild(this.eyeIcon.span)}this.pluginNode.addClass("availability-plugincontrols"),this.node.appendChild(this.pluginNode);var i=new M.core_availability.DeleteIcon(this);this.node.appendChild(i.span),this.node.appendChild(document.createTextNode(" ")),this.node.appendChild(e.Node.create('<span class="label label-warning"/>'))},M.core_availability.Item.prototype.getValue=function(){return value={type:this.pluginType},this.plugin&&this.plugin.fillValue(value,this.pluginNode),value},M.core_availability.Item.prototype.fillErrors=function(e){var t=e.length;this.plugin?this.plugin.fillErrors(e,this.pluginNode):e.push("core_availability:item_unknowntype");var n=this.node.one("> .label-warning");e.length!==t&&!n.get("firstChild")?n.appendChild(document.createTextNode(M.str.availability.invalid)):e.length===t&&n.get("firstChild")&&n.get("firstChild").remove()},M.core_availability.Item.prototype.renumber=function(e){var t={number:e};this.plugin?t.type=M.str["availability_"+this.pluginType].title:t.type="["+this.pluginType+"]",t.number=e+":";var n=M.util.get_string("itemheading","availability",t);this.node.one("> h3").set("innerHTML",n)},M.core_availability.Item.prototype.focusAfterAdd=function(){this.plugin.focusAfterAdd(this.pluginNode)},M.core_availability.Item.prototype.pluginType=null,M.core_availability.Item.prototype.plugin=null,M.core_availability.Item.prototype.eyeIcon=null
,M.core_availability.Item.prototype.node=null,M.core_availability.Item.prototype.pluginNode=null,M.core_availability.EyeIcon=function(t,n){this.individual=t,this.span=e.Node.create('<span class="availability-eye">');var r=M.cfg.wwwroot+"/theme/image.php/"+M.cfg.theme+"/core/"+M.cfg.themerev,i=e.Node.create('<img tabindex="0" role="button"/>'),s=t?"_individual":"_all",o=function(){i.set("src",r+"/t/show"),i.set("alt",M.str.availability["hidden"+s]),i.set("title",M.str.availability["hidden"+s]+" \u2022 "+M.str.availability.show_verb)},u=function(){i.set("src",r+"/t/hide"),i.set("alt",M.str.availability["shown"+s]),i.set("title",M.str.availability["shown"+s]+" \u2022 "+M.str.availability.hide_verb)};n?u():o(),this.span.appendChild(i);var a=function(){this.isHidden()?u():o(),M.core_availability.form.update()};i.on("click",a,this),i.on("key",a,"up:enter",this)},M.core_availability.EyeIcon.prototype.individual=!1,M.core_availability.EyeIcon.prototype.span=null,M.core_availability.EyeIcon.prototype.isHidden=function(){var e=this.individual?"_individual":"_all",t=M.str.availability["hidden"+e];return this.span.one("img").get("alt")===t},M.core_availability.DeleteIcon=function(t){this.span=e.Node.create('<span class="availability-delete">');var n=e.Node.create('<img src="'+M.cfg.wwwroot+"/theme/image.php/"+M.cfg.theme+"/core/"+M.cfg.themerev+'/t/delete" alt="'+M.str.moodle["delete"]+'" title="'+M.str.moodle["delete"]+'" tabindex="0" role="button"/>');this.span.appendChild(n);var r=function(){M.core_availability.form.rootList.deleteDescendant(t),M.core_availability.form.rootList.renumber()};n.on("click",r,this),n.on("key",r,"up:enter",this)},M.core_availability.DeleteIcon.prototype.span=null},"@VERSION@",{requires:["base","node","event","panel","moodle-core-notification-dialogue","json"]});