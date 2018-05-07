/*
 * fitty v2.2.3 - Snugly resizes text to fit its parent container
 * Copyright (c) 2017 Rik Schennink <hello@rikschennink.nl> (http://rikschennink.nl/)
 */
!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.fitty=n.exports}}(this,function(e,t){"use strict";function n(e,t){var n=r({},E,t),i=e.map(function(e){var t=r({},n,{element:e});return z(t),F(t),{element:e,fit:w(t,a.DIRTY),unsubscribe:T(t)}});return s(),i}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?n(o(document.querySelectorAll(e)),t):n([e],t)[0]}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o=function(e){return[].slice.call(e)},u=window,a={IDLE:0,DIRTY_CONTENT:1,DIRTY_LAYOUT:2,DIRTY:3},c=[],l=null,s="requestAnimationFrame"in u?function(){u.cancelAnimationFrame(l),l=u.requestAnimationFrame(function(){d(c.filter(function(e){return e.dirty}))})}:function(){},f=function(e){return function(){c.forEach(function(t){t.dirty=e}),s()}},d=function(e){e.filter(function(e){return!e.styleComputed}).forEach(function(e){e.styleComputed=v(e)}),e.filter(h).forEach(b),e.filter(m).forEach(p),e.forEach(y),e.forEach(S)},p=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},m=function(e){return e.dirty!==a.DIRTY_LAYOUT||e.dirty===a.DIRTY_LAYOUT&&e.element.parentNode.clientWidth!==e.availableWidth},v=function(e){var t=u.getComputedStyle(e.element,null);e.currentFontSize=parseInt(t.getPropertyValue("font-size"),10),e.display=t.getPropertyValue("display"),e.whiteSpace=t.getPropertyValue("white-space")},h=function(e){var t=!1;return/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),t},y=function(e){b(e),e.dirty=a.IDLE},b=function(e){e.element.style.cssText="white-space:"+e.whiteSpace+";display:"+e.display+";font-size:"+e.currentFontSize+"px"},S=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},w=function(e,t){return function(){e.dirty=t,s()}},z=function(e){e.newbie=!0,e.dirty=!0,c.push(e)},T=function(e){return function(){c=c.filter(function(t){return t.element!==e.element}),e.observeMutations&&e.observer.disconnect(),e.element.style.removeProperty("font-size")}},F=function(e){e.observeMutations&&(e.observer=new MutationObserver(w(e,a.DIRTY_CONTENT)),e.observer.observe(e.element,e.observeMutations))},D={subtree:!0,childList:!0,characterData:!0},E={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in u&&D},O=null,Y=function(){u.clearTimeout(O),O=u.setTimeout(f(a.DIRTY_LAYOUT),i.observeWindowDelay)},x=["resize","orientationchange"];Object.defineProperty(i,"observeWindow",{set:function(e){var t=(e?"add":"remove")+"EventListener";x.forEach(function(e){u[t](e,Y)})}}),i.observeWindow=!0,i.observeWindowDelay=100,i.fitAll=f(a.DIRTY),t.default=i,e.exports=t.default});