(function(){

// ─────────────────────────────────────────
// НАСТРОЙКИ JSONBin
// ─────────────────────────────────────────
var JSONBIN_ID  = '69b4bf17c3097a1dd523132d';
var JSONBIN_KEY = '$2a$10$0GPaIJrOvPUYtRsyx6N7zeJ9j6zm7nNDDv8gaiAKESR6cQ8PAWZOG';
// ─────────────────────────────────────────

var JSONBIN_URL = 'https://api.jsonbin.io/v3/b/' + JSONBIN_ID;

var C=[
  {i:'😀',e:['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','😵','🤯','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','😤','😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👻','👽','🤖']},
  {i:'❤️',e:['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💯','✅','❌','⭕','❗','❓','💢','💥','💫','💦','💨','💬','💤','🔥','⚡','🌈','⭐','🌟','✨','🎉','🎊','🎈','🎁','🎀','🏆','🥇','🎯','🎲','🧩']},
  {i:'👍',e:['👍','👎','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','✋','🖐','🖖','👋','🤚','💪','🙏','🤝','👏','🙌','🤲','✍️','💅','🤳','👀','👁','👃','👂','👄','👅','💋','👣','🧠','🦵','🦶']},
  {i:'🐶',e:['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐴','🦄','🐝','🦋','🐌','🐞','🐜','🐢','🐍','🦎','🐙','🦑','🐠','🐟','🐬','🐳','🦈','🐊','🐘','🦒','🦓','🐆','🐅','🐎','🐕','🐩','🐈','🦜','🐇','🦔','🐾']},
  {i:'🍎',e:['🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥕','🌽','🌶','🥒','🥦','🧄','🧅','🍄','🌰','🍞','🥐','🧀','🥚','🍳','🥞','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🌮','🌯','🍣','🥟','🍱','🎂','🍰','🧁','🍩','🍪','🍫','🍬','🍭','🍯','☕','🍵','🧋','🍺','🍻','🥂','🍷','🥃','🍸','🍹','🍾']},
  {i:'🚗',e:['🚗','🚕','🚙','🚌','🏎','🚓','🚑','🚒','🛻','🚚','🚜','🏍','🛵','🚲','🛴','✈️','🚁','🚀','🛸','🚢','⛵','🚤','🚂','🌍','🌎','🌏','🗺','🏔','⛰','🌋','🏕','🏖','🏜','🏝','🏠','🏡','🏢','🏥','🏦','🏨','🏪','🏫','🏬','🏰','⛪','🕌','⛩','🗼','🗽']},
  {i:'💡',e:['💡','🔦','🕯','🔋','🔌','💻','🖥','📱','☎️','📞','📺','📷','📹','🎥','🔭','🔬','🩺','💊','💉','🩹','🧬','🔒','🔓','🔑','🗝','🔨','⚒','🛠','🔧','🔩','⚙️','🧲','💰','💳','🪙','📦','📫','📝','✏️','📖','📚','📋','📌','📍','📅','📆','📊','📈','📉','🗑','🔖','🏷','🎒','👜','🧳']},
];
var AV=[['#FF6B6B','#FF8E53'],['#667EEA','#764BA2'],['#11998E','#38EF7D'],['#F093FB','#F5576C'],['#4FACFE','#00F2FE'],['#43E97B','#38F9D7'],['#FA709A','#FEE140'],['#A18CD1','#FBC2EB'],['#FDA085','#F6D365'],['#84FAB0','#8FD3F4'],['#F77062','#FE5196'],['#30CFD0','#667EEA']];

var chats=[], cur=null, ps='elio', pt='', eo=false;
var lastSnapshot='', saving=false, saveConfirmed=false;

// ─────────────────────────────────────────
// JSONBin: читаем — сравниваем по содержимому
// ─────────────────────────────────────────
async function lv(){
  try {
    var r = await fetch(JSONBIN_URL + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    var j = await r.json();
    var record = Array.isArray(j.record) ? j.record.filter(function(x){ return !x.__empty; }) : [];
    var snapshot = JSON.stringify(record);
    if(snapshot !== lastSnapshot){
      lastSnapshot = snapshot;
      chats = record;
      return true;
    }
  } catch(e){ console.warn('read error:', e); }
  return false;
}

// ─────────────────────────────────────────
// JSONBin: сохраняем + подтверждаем
// ─────────────────────────────────────────
async function sv(){
  if(saving) return;
  saving = true;
  saveConfirmed = false;
  try {
    // JSONBin не принимает пустой массив — добавляем плейсхолдер
    var data = chats.length > 0 ? chats : [{"__empty":true}];
    var body = JSON.stringify(data);
    await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: body
    });
    // Читаем обратно чтобы убедиться что JSONBin сохранил именно это
    var check = await fetch(JSONBIN_URL + '/latest', {
      headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    var jc = await check.json();
    var confirmedRaw = Array.isArray(jc.record) ? jc.record.filter(function(x){ return !x.__empty; }) : [];
    lastSnapshot = JSON.stringify(confirmedRaw);
    saveConfirmed = true;
  } catch(e){ console.warn('write error:', e); }
  saving = false;
}

// ─────────────────────────────────────────
// Polling каждые 3 секунды
// ─────────────────────────────────────────
async function poll(){
  if(!saving){
    var changed = await lv();
    if(changed){
      rl();
      if(cur !== null) rm();
    }
  }
  setTimeout(poll, 3000);
}

// ─────────────────────────────────────────
// УТИЛИТЫ
// ─────────────────────────────────────────
function ac(n){var h=0;for(var i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))&0xFFFFFF;return AV[Math.abs(h)%AV.length];}
function ii(n){return n.trim().split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase()||'?';}
function es(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function g(id){return document.getElementById(id);}

function tk(){
  var n=new Date(),t=n.getHours()+':'+(('0'+n.getMinutes()).slice(-2));
  g('ec-t1').textContent=t; g('ec-t2').textContent=t;
}
setInterval(tk,15000); tk();

// ─────────────────────────────────────────
// СПИСОК ЧАТОВ
// ─────────────────────────────────────────
function rl(){
  var l=g('ec-cl'),e=g('ec-empty');
  l.innerHTML='';
  // фильтруем битые записи — нужны только объекты с name и messages
  chats = chats.filter(function(ch){ return ch && ch.name && Array.isArray(ch.messages); });
  if(!chats.length){e.style.display='flex';return;}
  e.style.display='none';
  chats.slice().reverse().forEach(function(ch,ri){
    var last=ch.messages[ch.messages.length-1];
    var pv=last?(last.sender==='elio'?'Elio':ch.name)+': '+last.text:'No messages yet';
    var lt=last?last.time:'',c=ac(ch.name),id=ch.id;
    var w=document.createElement('div'); w.className='ci';
    w.style.animation='ew-sl .3s ease '+(ri*.04)+'s both';
    var item=document.createElement('div'); item.className='ci-l';
    item.innerHTML='<div class="av" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+')">'
      +ii(ch.name)+'</div><div class="ci-inf"><div class="ci-top">'
      +'<span class="ci-nm">'+es(ch.name)+'</span><span class="ci-dt">'+es(lt)+'</span>'
      +'</div><div class="ci-pv">'+es(pv)+'</div></div>'
      +'<svg width="6" height="11" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#ccc" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    item.addEventListener('click',(function(cid){return function(){oc(cid);};})(id));
    var db=document.createElement('button'); db.className='delbtn';
    db.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Delete';
    db.addEventListener('click',(function(cid){return async function(e){
      e.stopPropagation();
      chats=chats.filter(function(c){return String(c.id)!==String(cid);});
      await sv(); rl();
    };})(id));
    w.appendChild(item); w.appendChild(db); l.appendChild(w);
  });
}

// ─────────────────────────────────────────
// ОТКРЫТЬ / ЗАКРЫТЬ ЧАТ
// ─────────────────────────────────────────
function oc(id){
  var ch=chats.filter(function(c){return String(c.id)===String(id);})[0];
  if(!ch)return; cur=ch.id;
  var c=ac(ch.name),hav=g('ec-hav');
  hav.textContent=ii(ch.name);
  hav.style.background='linear-gradient(135deg,'+c[0]+','+c[1]+')';
  g('ec-hn').textContent=ch.name; g('ec-to').textContent=ch.name;
  rm(); ss('elio');
  g('ec-list').classList.add('off');
  g('ec-chat').classList.remove('off'); g('ec-chat').classList.add('on');
  g('ec-ta').value=''; g('ec-ta').style.height='auto';
  g('ec-sb').disabled=true; ce();
}
function gb(){
  g('ec-chat').classList.add('off'); g('ec-chat').classList.remove('on');
  g('ec-list').classList.remove('off');
  cur=null; ce(); rl();
}

// ─────────────────────────────────────────
// СООБЩЕНИЯ
// ─────────────────────────────────────────
function rm(){
  var a=g('ec-ma'),ch=chats.filter(function(c){return c.id===cur;})[0];
  a.innerHTML=''; if(!ch)return;
  ch.messages.forEach(function(m){ab(m.sender,m.text,m.time,ch.name,false);});
  a.scrollTop=a.scrollHeight;
}
function ab(sender,text,time,on,ani){
  var a=g('ec-ma'),me=sender==='elio';
  var gr=document.createElement('div'); gr.className='bg '+(me?'bme':'bth');
  if(ani)gr.style.animation='ew-pop .25s cubic-bezier(.34,1.56,.64,1) both';
  var s=document.createElement('div'); s.className='bs'; s.textContent=me?'Elio':on;
  var b=document.createElement('div'); b.className='bb '+(me?'bme':'bth'); b.textContent=text;
  var t=document.createElement('div'); t.className='bt'; t.textContent=time;
  gr.appendChild(s); gr.appendChild(b); gr.appendChild(t);
  a.appendChild(gr); if(ani)a.scrollTop=a.scrollHeight;
}

// ─────────────────────────────────────────
// ОТПРАВИТЕЛЬ
// ─────────────────────────────────────────
function ss(s){
  ps=s;
  var ch=chats.filter(function(c){return c.id===cur;})[0];
  var nm=ch?ch.name:'Other';
  g('ec-bdgt').textContent=s==='elio'?'Elio is writing':nm+' is writing';
  g('ec-sd').className='sd'+(s==='elio'?'':' sdt');
}
function sel(s){
  ps=s;
  g('ec-te').className='wt '+(s==='elio'?'ws':'wu');
  g('ec-to').className='wt '+(s==='other'?'ws':'wu');
}
g('ec-bdg').addEventListener('click',function(){var ns=ps==='elio'?'other':'elio';ss(ns);sel(ns);});
g('ec-te').addEventListener('click',function(){sel('elio');});
g('ec-to').addEventListener('click',function(){sel('other');});

// ─────────────────────────────────────────
// ОТПРАВКА
// ─────────────────────────────────────────
function sm(){
  var ta=g('ec-ta'),tx=ta.value.trim(); if(!tx)return; pt=tx;
  var ch=chats.filter(function(c){return c.id===cur;})[0];
  g('ec-to').textContent=ch?ch.name:'Other'; sel(ps);
  var n=new Date();
  g('ec-st').value=n.getHours()+':'+(('0'+n.getMinutes()).slice(-2));
  g('ec-sd2').value=(('0'+n.getDate()).slice(-2))+'.'+(('0'+(n.getMonth()+1)).slice(-2))+'.'+n.getFullYear();
  ce(); g('ec-sm').classList.add('on');
  setTimeout(function(){g('ec-st').focus();},300);
}
g('ec-sc').addEventListener('click', async function(){
  var t=g('ec-st').value.trim(),d=g('ec-sd2').value.trim();
  var ft=[d,t].filter(Boolean).join('  ')||'—';
  var ch=chats.filter(function(c){return c.id===cur;})[0]; if(!ch)return;
  ch.messages.push({sender:ps,text:pt,time:ft});
  ab(ps,pt,ft,ch.name,true);
  g('ec-ta').value=''; g('ec-ta').style.height='auto';
  g('ec-sb').disabled=true; g('ec-sm').classList.remove('on');
  ss(ps==='elio'?'other':'elio');
  await sv();
});

var ta=g('ec-ta');
ta.addEventListener('input',function(){
  this.style.height='auto';
  this.style.height=Math.min(this.scrollHeight,90)+'px';
  g('ec-sb').disabled=this.value.trim()==='';
});
ta.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sm();}});
g('ec-sb').addEventListener('click',sm);
g('ec-back').addEventListener('click',gb);

// ─────────────────────────────────────────
// НОВЫЙ ЧАТ
// ─────────────────────────────────────────
g('ec-newbtn').addEventListener('click',function(){
  g('ec-ncn').value=''; g('ec-nm').classList.add('on');
  setTimeout(function(){g('ec-ncn').focus();},300);
});
g('ec-ncc').addEventListener('click',function(){g('ec-nm').classList.remove('on');});
g('ec-ncs').addEventListener('click', async function(){
  var nm=g('ec-ncn').value.trim(); if(!nm){g('ec-ncn').focus();return;}
  var ch={id:Date.now(),name:nm,messages:[]};
  chats.push(ch);
  g('ec-nm').classList.remove('on');
  oc(ch.id);
  await sv();
});
g('ec-ncn').addEventListener('keydown',function(e){if(e.key==='Enter')g('ec-ncs').click();});
g('ec-nm').addEventListener('click',function(e){if(e.target===this)this.classList.remove('on');});
g('ec-sm').addEventListener('click',function(e){if(e.target===this)this.classList.remove('on');});

// ─────────────────────────────────────────
// EMOJI
// ─────────────────────────────────────────
function bg2(idx){
  var gr=g('ec-eg'); gr.innerHTML='';
  C[idx].e.forEach(function(em){
    var b=document.createElement('button'); b.className='ec'; b.textContent=em;
    b.addEventListener('click',(function(e){return function(){
      var inp=g('ec-ta'),s=inp.selectionStart||inp.value.length,e2=inp.selectionEnd||s;
      inp.value=inp.value.slice(0,s)+e+inp.value.slice(e2);
      inp.dispatchEvent(new Event('input'));
    };})(em));
    gr.appendChild(b);
  });
  gr.scrollTop=0;
}
function be(){
  var tabs=g('ec-ets');
  C.forEach(function(cat,i){
    var b=document.createElement('button');
    b.className='etb'+(i===0?' ea':'');
    b.textContent=cat.i;
    b.addEventListener('click',(function(idx){return function(){
      document.querySelectorAll('#ew .etb').forEach(function(x,j){x.className='etb'+(j===idx?' ea':'');});
      bg2(idx);
    };})(i));
    tabs.appendChild(b);
  });
  bg2(0);
}
function ce(){eo=false;g('ec-ep').classList.remove('eon');g('ec-eb').textContent='🙂';}
g('ec-eb').addEventListener('click',function(){eo=!eo;g('ec-ep').classList.toggle('eon',eo);this.textContent=eo?'⌨️':'🙂';});
g('ec-ecl').addEventListener('click',function(){ce();g('ec-ta').focus();});
be();

// ─────────────────────────────────────────
// СТАРТ
// ─────────────────────────────────────────
async function init(){
  await lv();
  rl();
  poll();
}
init();
})();
