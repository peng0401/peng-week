"use strict";$(function(){$.ajax({url:"api/swiper",dataType:"json",success:function(n){var i,t;console.log(n),1===n.code&&(i=n.data,t="",i.forEach(function(n){t+='\n            <div class="swiper-slide">',t+=n.list.map(function(n){return'\n            <dl>\n                <dt><img src="'.concat(n.url,'"></dt>\n                <dd>').concat(n.title,"</dd>\n            </dl>\n            ")}).join(""),t+="</div>\n            "}),$(".swiper-wrapper").html(t),new Swiper(".swiper-container"))}})});