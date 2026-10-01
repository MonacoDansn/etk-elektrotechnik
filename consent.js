/* Cookie-Hinweis und Google Analytics 4 (lädt erst nach Einwilligung) */
(function(){
  var ID='G-V1YV8GX506', KEY='etk-consent', loaded=false;
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}
  window.gtag=gtag;
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});

  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}

  function load(){
    if(loaded)return; loaded=true;
    gtag('consent','update',{analytics_storage:'granted'});
    var s=document.createElement('script');
    s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
    document.head.appendChild(s);
    gtag('js',new Date());
    gtag('config',ID);
  }
  function clearGa(){
    var host=location.hostname, doms=['',host,'.'+host,'.'+host.replace(/^www\./,'')];
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(/^_ga/.test(n)) doms.forEach(function(d){
        document.cookie=n+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'+(d?'; domain='+d:'');
      });
    });
  }

  var css='#cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;'+
    'background:#12151c;color:#e8ebf0;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:20px 22px;'+
    'box-shadow:0 30px 80px -20px rgba(0,0,0,.7);font:15px/1.5 Inter,system-ui,sans-serif}'+
    '#cc[hidden]{display:none}#cc p{margin:0 0 14px}#cc b{display:block;color:#fff;font-family:"Space Grotesk",system-ui,sans-serif;font-size:1.05rem;margin-bottom:4px}'+
    '#cc a{color:#FFAB11;cursor:pointer;text-decoration:underline}'+
    '#cc .cc-btns{display:flex;gap:10px;flex-wrap:wrap}'+
    '#cc button{flex:1 1 140px;padding:12px 18px;border-radius:999px;font:600 .95rem Inter,system-ui,sans-serif;cursor:pointer;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff}'+
    '#cc button.cc-yes{background:#FFAB11;border-color:#FFAB11;color:#111}';

  function build(){
    var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
    var d=document.createElement('div');
    d.id='cc'; d.setAttribute('role','dialog'); d.setAttribute('aria-label','Cookie-Einstellungen'); d.hidden=true;
    d.innerHTML='<p><b>Cookies für die Statistik</b>Mit Ihrer Zustimmung nutzen wir Google Analytics, um zu sehen, welche Seiten gelesen werden. '+
      'Dabei werden Cookies gesetzt. Sie können die Einwilligung jederzeit am Seitenende widerrufen. <a id="ccMore">Datenschutz</a></p>'+
      '<div class="cc-btns"><button type="button" class="cc-no">Ablehnen</button><button type="button" class="cc-yes">Akzeptieren</button></div>';
    document.body.appendChild(d);
    d.querySelector('.cc-yes').addEventListener('click',function(){set('granted');d.hidden=true;load()});
    d.querySelector('.cc-no').addEventListener('click',function(){
      var was=get()==='granted'; set('denied'); d.hidden=true;
      if(was||loaded){gtag('consent','update',{analytics_storage:'denied'});clearGa();location.reload()}
    });
    d.querySelector('#ccMore').addEventListener('click',function(){
      var dlg=document.getElementById('impressum'); if(dlg&&dlg.showModal){dlg.showModal();var h=dlg.querySelector('#gaInfo');if(h)h.scrollIntoView()}
    });
    return d;
  }

  function init(){
    var box=build(), c=get();
    if(c==='granted') load(); else if(c!=='denied') box.hidden=false;
    var b=document.getElementById('openConsent');
    if(b) b.addEventListener('click',function(){box.hidden=false;box.querySelector('.cc-yes').focus()});
    document.addEventListener('click',function(e){
      if(!loaded)return;
      var a=e.target.closest&&e.target.closest('a[href]'); if(!a)return;
      var h=a.getAttribute('href'), m=/^tel:/.test(h)?'telefon':/^mailto:/.test(h)?'email':/wa\.me/.test(h)?'whatsapp':null;
      if(m) gtag('event','generate_lead',{method:m});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
