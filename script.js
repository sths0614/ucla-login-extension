function resize(){
 try{var e=document.getElementById('appfeed');var a=window.top.frames['appfeed'].document;var h=a.body.innerHTML;var sh=a.body.scrollHeight;if(h.length)e.height=sh+(e.getAttribute('frameborder')?4:0);else e.parentNode.removeChild(e);}catch(e){}
}

function init(){
 if (top.location != self.location){var p=document.createElement('div');p.innerHTML='<p>This page is not viewable from inside a FRAME or IFRAME object.</p>';var pw=document.getElementById('page');while (pw.firstChild) pw.removeChild(pw.firstChild);pw.appendChild(p);}
 if(document.login){var i=document.getElementsByTagName('input');i[0].focus();}
 if(document.postback){var p=document.createElement('div');p.innerHTML='<p>You are being redirected to your requested site.</p><img src="/images/spin.gif" id="spinner"><p>It may take several seconds for this action to complete.  Please be patient.</p>';document.postback.appendChild(p);document.postback.submit();}
}
window.onload = init;
