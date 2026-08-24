const SETS=window.SET_MASTER;
const STATS=window.STAT_MASTER;
const MAIN=window.MAIN_OPTIONS;
const SUB=window.SUB_OPTIONS;
const LABEL=window.OPTION_LABELS;
const ICON=k=>`assets/stats/${k}.png`;
const PERCENT_OPTIONS=new Set(window.PERCENT_OPTIONS);
const initialSubs=()=>Array.from({length:4},()=>({stat:null,roll:0}));
const initialEquipment=()=>[
 {slot:'weapon',set:null,main:null,subs:initialSubs()},
 {slot:'weapon',set:null,main:null,subs:initialSubs()},
 {slot:'armor',set:null,main:null,subs:initialSubs()},
 {slot:'armor',set:null,main:null,subs:initialSubs()}
];
let state={character:'fai',transcend:null,potAtk:null,potDef:null,potHp:null,difficulty:4,targets:{},equipment:initialEquipment()};
function byId(id){return document.getElementById(id)}
function character(){return window.CHARACTERS.find(x=>x.id===state.character)||window.CHARACTERS[0]}
function pot(stat,lv){
  if(lv===null||lv===undefined)return 0;
  return window.PROGRESSION_RULES.potential?.[stat]?.[lv]||0
}
function transPct(c,stat,t){
  if(t===null||t===undefined)return 0;
  const r=window.PROGRESSION_RULES.transcend;
  if(stat==='hp')return (c.grade==='LEGEND'?r.hp_legend:r.hp_rare)[t]||0;
  const primary=c.transcend_primary===(stat==='attack'?'ATK':'DEF');
  return primary?(c.grade==='LEGEND'?r.legend_main:r.rare_main)[t]||0:r.secondary[t]||0
}
function star4Bonus(c){
  if(state.transcend===null||state.transcend<4)return {};
  const x=window.PROGRESSION_RULES.star4_bonus[c.star4_bonus];
  return x?{[x[0]]:x[1]}:{}
}
function setBonuses(eq=state.equipment){const counts={};eq.forEach(e=>{if(e.set)counts[e.set]=(counts[e.set]||0)+1});const out={};Object.entries(counts).forEach(([k,n])=>{const s=SETS[k];if(!s)return;const fx=n>=4?s.four:n>=2?s.two:{};Object.entries(fx).forEach(([st,v])=>out[st]=(out[st]||0)+v)});return out}
function optionTotals(eq=state.equipment){const o={};const add=(k,v)=>{if(!k)return;o[k]=(o[k]||0)+Number(v||0)};eq.forEach(e=>{if(!e.set)return;add(e.main,e.main?(MAIN[e.slot][e.main]||0):0);e.subs.forEach(s=>add(s.stat,SUB[s.stat]?.[s.roll]||0))});return o}
function calc(eq=state.equipment){const c=character(),t=state.transcend;const opt=optionTotals(eq),set=setBonuses(eq),s4=star4Bonus(c);const baseAtk=c.base_attack,baseDef=c.base_defense,baseHp=c.base_hp;const transAtk=Math.floor(baseAtk*transPct(c,'attack',t)/100),transDef=Math.floor(baseDef*transPct(c,'defense',t)/100),transHp=Math.floor(baseHp*transPct(c,'hp',t)/100);const atkPct=(opt.all_attack_percent||0)+(set.all_attack_percent||0),defPct=(opt.defense_percent||0)+(set.defense_percent||0),hpPct=(opt.hp_percent||0)+(set.hp_percent||0);return {
 attack:Math.floor(baseAtk+transAtk+pot('attack',state.potAtk)+304*eq.filter(e=>e.slot==='weapon'&&e.set).length+(opt.all_attack_flat||0)+baseAtk*atkPct/100),
 defense:Math.floor(baseDef+transDef+pot('defense',state.potDef)+189*eq.filter(e=>e.slot==='armor'&&e.set).length+(opt.defense_flat||0)+baseDef*defPct/100),
 hp:Math.floor(baseHp+transHp+pot('hp',state.potHp)+1079*eq.filter(e=>e.slot==='armor'&&e.set).length+(opt.hp_flat||0)+baseHp*hpPct/100),
 attack_speed:c.base_speed+(opt.attack_speed||0),critical_rate:5+(s4.critical_rate||0)+(opt.critical_rate||0)+(set.critical_rate||0),critical_damage:150+(s4.critical_damage||0)+(opt.critical_damage||0),weak_point_attack:(s4.weak_point_attack||0)+(opt.weak_point_attack||0)+(set.weak_point_attack||0),block_rate:(s4.block_rate||0)+(opt.block_rate||0)+(set.block_rate||0),damage_taken_reduction:(s4.damage_taken_reduction||0)+(opt.damage_taken_reduction||0),effect_hit:(s4.effect_hit||0)+(opt.effect_hit||0)+(set.effect_hit||0),effect_resistance:(opt.effect_resistance||0)+(set.effect_resistance||0)} }
function equipImage(e){if(!e.set)return null;const variant=e.slot==='armor'?2:(character().attack_type==='MAGIC'?3:1);return `assets/equipment/${e.set}_${variant}.png`}
function optionValue(stat,value){if(!stat||value===undefined||value===null)return '—';return `${Number(value).toLocaleString()}${PERCENT_OPTIONS.has(stat)?'%':''}`}
function statValue(stat,value){return `${Number(value).toLocaleString()}${STATS[stat].unit}`}
function fillSelectors(){const cs=byId('character');cs.innerHTML=window.CHARACTERS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');cs.value=state.character;byId('transcend').innerHTML=`<option value="" selected disabled>กรุณาเลือกข้ามขีดจำกัด</option>`+Array.from({length:13},(_,i)=>`<option value="${i}">${i}</option>`).join('');for(const [id,label] of [['potAtk','กรุณาเลือกศักยภาพ พลังโจมตี'],['potDef','กรุณาเลือกศักยภาพ พลังป้องกัน'],['potHp','กรุณาเลือกศักยภาพ พลังชีวิต']]){byId(id).innerHTML=`<option value="" selected disabled>${label}</option>`+[0,10,20,30].map(v=>`<option value="${v}">Lv.${v}</option>`).join('')}if(state.transcend!==null)byId('transcend').value=state.transcend;if(state.potAtk!==null)byId('potAtk').value=state.potAtk;if(state.potDef!==null)byId('potDef').value=state.potDef;if(state.potHp!==null)byId('potHp').value=state.potHp}
function characterPortraitPath(c){return c.portrait||`assets/characters/${c.id}.png`}
function renderHero(){
  const c=character();
  const portrait=byId('portrait');
  portrait.innerHTML='';
  const img=document.createElement('img');
  img.className='character-portrait-img';
  img.alt=c.name;
  img.src=characterPortraitPath(c);
  img.onload=()=>portrait.classList.add('has-image');
  img.onerror=()=>{portrait.classList.remove('has-image');portrait.innerHTML=`<span>${(c.name||'?')[0]}</span>`};
  portrait.appendChild(img);
  byId('roleBadge').textContent=`สาย: ${c.role}`;
  byId('typeBadge').textContent=`ประเภทโจมตี: ${c.attack_type}`;
  byId('gradeBadge').textContent=`ระดับ: ${c.grade}`;
  byId('baseAtk').textContent=c.base_attack.toLocaleString();
  byId('baseDef').textContent=c.base_defense.toLocaleString();
  byId('baseHp').textContent=c.base_hp.toLocaleString();
  byId('baseSpd').textContent=c.base_speed
}
function renderSiteMeta(){
  const cfg=window.SITE_CONFIG||{};
  document.title=`${cfg.app_name||'7K-RE:BIRTH Build Maker'} v${cfg.version||''}`.trim();
  const brand=byId('appBrand');
  if(brand){const name=cfg.app_name||'7K-RE:BIRTH Build Maker';brand.innerHTML=name.replace('7K-RE:BIRTH','<span>7K-RE:BIRTH</span>')}
  const patch=byId('patchBadge');
  if(patch)patch.textContent=[cfg.patch_text,cfg.credit_text].filter(Boolean).join(' ')
}
function nextPriority(){const used=Object.values(state.targets).map(x=>Number(x.priority)).filter(Boolean);for(let i=1;i<=11;i++)if(!used.includes(i))return i;return 11}
function parseTarget(v){const s=String(v).replace(/,/g,'').trim();if(!s)return null;const n=Number(s);return Number.isFinite(n)?n:null}
function statusHtml(k,cur,target){if(target===null||target===undefined||target==='')return '<span class="status none">ยังไม่กำหนด</span>';const d=cur-Number(target);return d>=0?`<span class="status good">✓ ถึงเป้า ${d>0?`(+${d.toLocaleString()}${STATS[k].unit})`:''}</span>`:`<span class="status bad">ขาด ${Math.abs(d).toLocaleString()}${STATS[k].unit}</span>`}
function statBreakdown(k,cur){
 const c=character(),opt=optionTotals(),set=setBonuses(),s4=star4Bonus(c);
 if(k==='attack_speed'){
   const bonus=cur.attack_speed-c.base_speed;
   return bonus?`<small class="stat-breakdown">Base ${c.base_speed} + อุปกรณ์ ${bonus}</small>`:`<small class="stat-breakdown">Base ${c.base_speed}</small>`;
 }
 return '';
}
function renderStats(){
 const cur=calc(),g=byId('statsGrid');g.innerHTML='';
 const groups=[['attack','defense','hp','attack_speed','critical_rate','critical_damage'],['weak_point_attack','block_rate','damage_taken_reduction','effect_hit','effect_resistance']];
 g.innerHTML=groups.map(group=>`<div class="stats-column"><div class="stats-head"><span>ค่าสถานะ</span><span>ปัจจุบัน</span><span>Target</span><span>Priority</span><span>สถานะ</span></div>${group.map(k=>{const st=STATS[k],target=state.targets[k]?.target??'',pri=state.targets[k]?.priority??'';return `<div class="stat-row clean" data-stat-row="${k}"><div class="stat-name"><img src="${ICON(st.icon.replace('.png',''))}" onerror="this.style.opacity=.25"><span>${st.th}</span></div><div class="stat-current"><span>${statValue(k,cur[k])}</span>${statBreakdown(k,cur[k])}</div><input class="target-input" data-stat="${k}" inputmode="decimal" placeholder="ไม่กำหนด" value="${target}"><select class="priority-select" data-priority="${k}" ${target===''?'disabled':''}><option value="">—</option>${Array.from({length:11},(_,i)=>`<option value="${i+1}" ${Number(pri)===i+1?'selected':''}>P${i+1}</option>`).join('')}</select><div class="stat-status">${statusHtml(k,cur[k],target)}</div></div>`}).join('')}</div>`).join('');
 document.querySelectorAll('.target-input').forEach(el=>el.addEventListener('input',e=>{const k=e.target.dataset.stat,n=parseTarget(e.target.value),row=document.querySelector(`[data-stat-row="${k}"]`),sel=row.querySelector('.priority-select');if(n===null){delete state.targets[k];sel.disabled=true;sel.value='';row.querySelector('.stat-status').innerHTML=statusHtml(k,cur[k],null)}else{if(!state.targets[k])state.targets[k]={target:n,priority:nextPriority()};else state.targets[k].target=n;sel.disabled=false;sel.value=state.targets[k].priority;row.querySelector('.stat-status').innerHTML=statusHtml(k,cur[k],n)}}));
 document.querySelectorAll('.priority-select').forEach(el=>el.addEventListener('change',e=>{const k=e.target.dataset.priority;if(state.targets[k])state.targets[k].priority=Number(e.target.value)||99}))
}
function selectOptions(obj,val){return `<option value="" ${!val?'selected':''}>กรุณาเลือกออปชันหลัก</option>`+Object.keys(obj).map(k=>`<option value="${k}" ${k===val?'selected':''}>${LABEL[k]||k}</option>`).join('')}
function subSelectOptions(e,currentIndex){
 const used=new Set(e.subs.map((s,idx)=>idx===currentIndex?null:s.stat).filter(Boolean));
 const current=e.subs[currentIndex].stat;
 return `<option value="" ${!current?'selected':''}>กรุณาเลือกออปชันรอง</option>`+Object.keys(SUB).map(k=>`<option value="${k}" ${k===current?'selected':''} ${used.has(k)&&k!==current?'disabled':''}>${LABEL[k]||k}${used.has(k)&&k!==current?' · เลือกแล้ว':''}</option>`).join('')
}
function setOptions(val){return `<option value="" ${!val?'selected':''}>กรุณาเลือกเซต</option>`+Object.entries(SETS).map(([k,s])=>`<option value="${k}" ${k===val?'selected':''}>${s.th}</option>`).join('')}
function renderSimLiveStats(){
 const box=byId('simLiveStats');if(!box)return;const cur=calc();
 const order=['attack','defense','hp','attack_speed','critical_rate','critical_damage','weak_point_attack','block_rate','damage_taken_reduction','effect_hit','effect_resistance'];
 box.innerHTML=order.map(k=>{
   const t=state.targets[k]?.target;
   const hasTarget=t!==undefined&&t!==null&&t!=='';
   return `<div class="sim-live-stat ${hasTarget?'targeted':''}"><img src="${ICON(STATS[k].icon.replace('.png',''))}"><span class="live-name">${STATS[k].th}</span><span class="live-value">${statValue(k,cur[k])}${hasTarget?` <small class="live-target">/ ${statValue(k,t)}</small>`:''}</span></div>`
 }).join('');
}
function renderEquipment(){const grid=byId('equipmentGrid');grid.innerHTML='';state.equipment.forEach((e,i)=>{const used=e.subs.reduce((a,s)=>a+s.roll,0),remain=5-used,img=equipImage(e),imageHtml=img?`<img class="equip-image" src="${img}">`:`<div class="equip-image equip-placeholder">?</div>`,mainIcon=e.main?`<img src="${ICON(e.main)}">`:`<span class="main-icon-placeholder">?</span>`,mainVal=e.main?optionValue(e.main,MAIN[e.slot][e.main]):'—';grid.insertAdjacentHTML('beforeend',`<article class="equip-card" data-eq="${i}"><div class="equip-image-wrap">${imageHtml}<span class="slot-tag">${e.slot==='weapon'?'WEAPON':'ARMOR'} ${i%2+1}</span></div><div class="equip-editor"><div class="equip-top"><div class="field"><label>เซตอุปกรณ์</label><select class="set-select">${setOptions(e.set)}</select></div></div><div class="main-block"><div class="main-label"><span>MAIN OPTION · +15</span><span>${e.slot==='weapon'?'อาวุธ':'เกราะ'}</span></div><div class="main-content">${mainIcon}<select class="main-select">${selectOptions(MAIN[e.slot],e.main)}</select><div class="main-value">${mainVal}</div></div></div><div class="subs-title">SUB OPTIONS · Roll รวม 5 ครั้ง</div>${e.subs.map((s,j)=>{const maxForRow=Math.min(5,s.roll+remain),subIcon=s.stat?`<img src="${ICON(s.stat)}">`:`<span class="sub-icon-placeholder">?</span>`,subVal=s.stat?optionValue(s.stat,SUB[s.stat][s.roll]):'—';return `<div class="sub-row" data-sub="${j}">${subIcon}<select class="sub-select" title="ออปชันรองห้ามซ้ำกันในอุปกรณ์ชิ้นเดียว">${subSelectOptions(e,j)}</select><select class="roll-select" ${!s.stat?'disabled':''}>${Array.from({length:6},(_,r)=>`<option value="${r}" ${r===s.roll?'selected':''} ${r>maxForRow?'disabled':''}>+${r} Roll</option>`).join('')}</select><span class="value-pill">${subVal}</span></div>`}).join('')}<div class="roll-left ${remain<0?'invalid':''}">Roll คงเหลือ: <b>${remain}</b> / 5 ${remain===0?'✓':''}</div></div></article>`)});document.querySelectorAll('.equip-card').forEach(card=>{const i=+card.dataset.eq;card.querySelector('.set-select').onchange=e=>{state.equipment[i].set=e.target.value||null;renderAll()};card.querySelector('.main-select').onchange=e=>{state.equipment[i].main=e.target.value||null;renderAll()};card.querySelectorAll('.sub-row').forEach(row=>{const j=+row.dataset.sub;row.querySelector('.sub-select').onchange=ev=>{const next=ev.target.value||null;const duplicate=next&&state.equipment[i].subs.some((sub,idx)=>idx!==j&&sub.stat===next);if(duplicate){ev.target.value=state.equipment[i].subs[j].stat||'';return}state.equipment[i].subs[j].stat=next;if(!next)state.equipment[i].subs[j].roll=0;renderAll()};row.querySelector('.roll-select').onchange=e=>{const requested=+e.target.value,otherUsed=state.equipment[i].subs.reduce((sum,sub,idx)=>sum+(idx===j?0:sub.roll),0);state.equipment[i].subs[j].roll=Math.min(requested,Math.max(0,5-otherUsed));renderAll()}})})}
function targetOrder(){return Object.entries(state.targets).sort((a,b)=>(a[1].priority||99)-(b[1].priority||99))}
function compareScore(stats){const keys=targetOrder(),pass=[],missing=[],over=[];for(const [k,t] of keys){const d=stats[k]-t.target;pass.push(d>=0?1:0);missing.push(d>=0?0:-d);over.push(d>0?d:0)}return {pass,missing,over}}
function distributions(max){const out=[];for(let a=0;a<=max;a++)for(let b=0;b<=max;b++)for(let c=0;c<=max;c++){const d=5-a-b-c;if(d>=0&&d<=max)out.push([a,b,c,d])}return out}
function targetContributorSet(){const out=new Set();for(const [k] of targetOrder()){if(k==='attack'){out.add('all_attack_flat');out.add('all_attack_percent')}else if(k==='defense'){out.add('defense_flat');out.add('defense_percent')}else if(k==='hp'){out.add('hp_flat');out.add('hp_percent')}else if(SUB[k])out.add(k)}return out}
function irrelevantRolls(eq){const rel=targetContributorSet();return eq.reduce((sum,e)=>sum+e.subs.reduce((a,s)=>a+(rel.has(s.stat)?0:s.roll),0),0)}
function riskScore(eq){return eq.reduce((sum,e)=>sum+Math.max(...e.subs.map(s=>s.roll)),0)}
function lexCmp(A,B){const sa=compareScore(A.stats),sb=compareScore(B.stats);for(let i=0;i<sa.pass.length;i++){if(sa.pass[i]!==sb.pass[i])return sb.pass[i]-sa.pass[i];if(sa.missing[i]!==sb.missing[i])return sa.missing[i]-sb.missing[i];if(sa.over[i]!==sb.over[i])return sa.over[i]-sb.over[i]}if((A.irrelevant??0)!==(B.irrelevant??0))return (A.irrelevant??0)-(B.irrelevant??0);return (A.risk??0)-(B.risk??0)}
function recommendCore(){
 if(!targetOrder().length){byId('recommendations').className='recommendations empty';byId('recommendations').textContent='กรุณากำหนด Target อย่างน้อย 1 ค่า';return}
 if(state.equipment.some(e=>!e.set||!e.main||e.subs.some(s=>!s.stat))){byId('recommendations').className='recommendations empty';byId('recommendations').textContent='กรุณาเลือก Set, ออปชันหลัก และออปชันรองให้ครบทั้ง 4 ชิ้นก่อนวิเคราะห์';return}
 const max=+byId('difficulty').value,ds=distributions(max);let candidates=[{eq:JSON.parse(JSON.stringify(state.equipment))}];
 for(let i=0;i<4;i++){
  const next=[];
  for(const c of candidates)for(const d of ds){const n={eq:JSON.parse(JSON.stringify(c.eq))};n.eq[i].subs.forEach((sub,j)=>sub.roll=d[j]);n.stats=calc(n.eq);n.irrelevant=irrelevantRolls(n.eq);n.risk=riskScore(n.eq);next.push(n)}
  next.sort(lexCmp);candidates=next.slice(0,1800)
 }
 const ranked=candidates.map(c=>({...c,stats:c.stats||calc(c.eq),irrelevant:irrelevantRolls(c.eq),risk:riskScore(c.eq)})).sort(lexCmp),picks=[];
 for(const c of ranked){const sig=c.eq.map(e=>e.subs.map(s=>s.roll).join('')).join('|');if(!picks.some(p=>p.sig===sig)){picks.push({...c,sig});if(picks.length===3)break}}
 renderRecommendations(picks)
}
async function recommend(){
 const btn=byId('recommendBtn');
 const box=byId('recommendations');
 if(!targetOrder().length){box.className='recommendations empty';box.textContent='กรุณากำหนด Target อย่างน้อย 1 ค่า';return}
 const old=btn.textContent;
 btn.disabled=true;
 btn.classList.add('is-loading');
 btn.textContent='กำลังประมวลผล...';
 box.className='recommendations loading-state';
 box.innerHTML='<div class="loading-card"><span class="spinner"></span><div><b>กำลังวิเคราะห์ Build</b><small>ระบบกำลังคำนวณการกระจาย Roll และเปรียบเทียบ Target...</small></div></div>';
 await new Promise(r=>setTimeout(r,80));
 try{ recommendCore(); }
 finally{ btn.disabled=false;btn.classList.remove('is-loading');btn.textContent=old; }
}
function renderRecommendations(picks){
 const box=byId('recommendations'),rel=targetContributorSet();box.className='recommendations';
 box.innerHTML=picks.map((p,i)=>{
  const targets=targetOrder().map(([k,t])=>{const v=p.stats[k],ok=v>=t.target;return `<span class="target-chip ${ok?'good':'bad'}">P${t.priority} ${STATS[k].th}: ${statValue(k,v)} / ${statValue(k,t.target)}</span>`}).join('');
  const firstMiss=targetOrder().find(([k,t])=>p.stats[k]<t.target);
  const note=firstMiss?`<div class="optimizer-note warn">ยังไม่ถึง ${STATS[firstMiss[0]].th} ตาม Target ด้วย Set / Main / Sub Option ที่เลือกใน Simulator — แผนนี้คือค่าที่ระบบหาได้ใกล้ที่สุด</div>`:`<div class="optimizer-note ok">ผ่าน Target ที่กำหนดครบแล้ว</div>`;
  const eqCards=p.eq.map((e,ix)=>{
    const slotName=`${ix<2?'อาวุธ':'เกราะ'} ${ix%2+1}`;
    const targetRolls=e.subs.filter(s=>s.roll>0&&rel.has(s.stat)).reduce((a,s)=>a+s.roll,0);
    return `<div class="plan-eq simple"><div class="plan-eq-title simple"><span class="plan-slot-name">${slotName}</span><span class="plan-main-inline"><span class="label">ออปชันหลัก</span><img src="${ICON(e.main)}"><span class="name">${LABEL[e.main]}</span></span><span class="plan-main-value">${optionValue(e.main,MAIN[e.slot][e.main])}</span></div><div class="recommended-rolls">${e.subs.map(s=>{const targeted=rel.has(s.stat),zero=s.roll===0;return `<div class="plan-roll-row ${targeted&&s.roll>0?'target-roll':''} ${zero?'zero-row':''}"><img src="${ICON(s.stat)}"><span>${LABEL[s.stat]}</span><span class="val">${optionValue(s.stat,SUB[s.stat][s.roll])}</span><span class="roll-badge ${zero?'zero':''}">+${s.roll}</span></div>`}).join('')}<div class="roll-summary">Roll ที่ช่วย Target โดยตรง ${targetRolls}/5 ครั้ง · แสดงครบทั้ง 4 ออปชัน</div></div></div>`
  }).join('');
  return `<article class="plan-card ${i===0?'best':''}"><div class="plan-head"><div><h3>${['🥇 แบบแนะนำ','🥈 แบบทางเลือก','🥉 แบบทางเลือก'][i]}</h3><div class="plan-targets">${targets}</div></div><button data-use="${i}">ใช้แผนนี้ใน Simulator</button></div>${note}<div class="plan-eq-grid">${eqCards}</div></article>`
 }).join('');
 box.querySelectorAll('[data-use]').forEach(btn=>btn.onclick=()=>{state.equipment=JSON.parse(JSON.stringify(picks[+btn.dataset.use].eq));renderAll();byId('simulatorCapture').scrollIntoView({behavior:'smooth',block:'start'})})
}
function reset(){state.targets={};state.transcend=null;state.potAtk=null;state.potDef=null;state.potHp=null;state.equipment=initialEquipment();fillSelectors();renderAll()}
async function exportBuildScreenshot(){const el=byId('simulatorCapture');if(typeof html2canvas!=='function'){alert('ไม่สามารถโหลดระบบ Screenshot ได้ กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่');return}const btn=byId('exportBtn'),old=btn.textContent;btn.disabled=true;btn.textContent='กำลังสร้างภาพ...';try{const canvas=await html2canvas(el,{backgroundColor:'#11141d',scale:2,useCORS:true,logging:false});const a=document.createElement('a');a.download=`SKRE_${character().id}_build_simulator.png`;a.href=canvas.toDataURL('image/png');a.click()}catch(err){console.error(err);alert('สร้างภาพไม่สำเร็จ กรุณาลองเปิดผ่านเว็บเซิร์ฟเวอร์หรือเบราว์เซอร์อื่น')}finally{btn.disabled=false;btn.textContent=old}}
function renderAll(){
  // Render the live simulator summary independently so an error in another panel
  // cannot leave the summary area blank. This also reduces redraw/compositor issues.
  const steps=[renderHero,renderEquipment,renderSimLiveStats,renderStats];
  for(const fn of steps){
    try{ fn(); }
    catch(err){ console.error('Render error in',fn.name,err); }
  }
}
renderSiteMeta();
fillSelectors();
byId('character').onchange=e=>{state.character=e.target.value;renderAll()};
byId('transcend').onchange=e=>{state.transcend=e.target.value===''?null:+e.target.value;renderAll()};
byId('potAtk').onchange=e=>{state.potAtk=e.target.value===''?null:+e.target.value;renderAll()};
byId('potDef').onchange=e=>{state.potDef=e.target.value===''?null:+e.target.value;renderAll()};
byId('potHp').onchange=e=>{state.potHp=e.target.value===''?null:+e.target.value;renderAll()};
byId('difficulty').onchange=e=>state.difficulty=+e.target.value;
byId('recommendBtn').onclick=recommend;
byId('resetBtn').onclick=reset;
byId('exportBtn').onclick=exportBuildScreenshot;
renderAll();
