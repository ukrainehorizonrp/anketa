const U=["Ваш Roblox Username:"];
const q=(q,h,o)=>({q,h,o});
const NICK=q("Ваш Roblox Username:"),MIC=q("Чи маєте ви мікрофон?","","Так / Ні"),VC=q("Чи маєте ви Voice Chat у Roblox?","","Так / Ні"),
GP=q("Які геймпаси ви маєте в грі?","Вкажіть усі геймпаси, пов'язані з поліцією."),TIME=q("Ваш час онлайну та часовий пояс:"),
RULES=q("Знання правил сервера:","Оцініть свої знання від 1 до 10."),
OK=t=>q("Підтвердження:",t,"Так / Ні");
const FORMS=[
{id:"dpp",name:"ДПП / ДДП",title:"Департамент патрульної та дорожньої поліції",role:"Другорядна роль",q:[
NICK,q("Ваш вік:","(Необов'язкове питання)"),GP,TIME,
q("Який напрямок ви обираєте?","","ДПП — Департамент патрульної поліції / ДДП — Департамент дорожньої поліції"),
RULES,q("Ваші сильні сторони:","Опишіть у 3–5 реченнях."),
OK("Підтверджую, що готовий дотримуватися дисципліни та адекватної поведінки під час роботи, бути присутнім на тренуваннях, працювати в команді, виконувати накази старших за званням, співпрацювати з громадянами, дотримуватися правил UKRAINE HORIZON RP, виконувати поставлені завдання та вчасно подавати звіти.")]},
{id:"phantom",name:"Фантом",title:"Фантом",role:"Другорядна роль",q:[
NICK,q("Ваш вік:","Обов'язкове питання"),MIC,VC,q("Чи маєте ви гемпас Undercover Police?","","Так / Ні"),TIME,RULES,
OK("Підтверджую, що готовий дотримуватися дисципліни, правил сервера та наказів старших за званням, працювати в команді, брати участь у тренуваннях та виконувати поставлені завдання.")]},
{id:"kord",name:"КОРД",title:"КОРД — Корпус оперативно-раптової дії",role:"",q:[
NICK,q("Ваш вік:"),MIC,VC,GP,TIME,RULES,
q("Наскільки добре ви граєте в PvP?","Оцініть свої навички від 1 до 10."),
OK("Підтверджую, що готовий дотримуватися дисципліни, правил сервера та наказів старших за званням, працювати в команді, брати участь у тренуваннях та виконувати поставлені завдання.")]},
{id:"slid",name:"Слідчий відділ",title:"Слідчий відділ",role:"",q:[
NICK,q("Ваш вік:"),MIC,VC,GP,TIME,RULES,
q("Наскільки добре ви розумієтеся на RP та проведенні розслідувань?","Оцініть свої навички від 1 до 10."),
q("Розкажіть про себе та як ви уявляєте себе в цій роботі (2-3 речення):"),
OK("Підтверджую, що готовий дотримуватися дисципліни, правил сервера та наказів старших за званням, працювати в команді, брати участь у тренуваннях, проводити розслідування та виконувати поставлені завдання.")]}
];
let cur=FORMS[0];
const chips=document.getElementById("chips"),sheet=document.getElementById("sheet"),btn=document.getElementById("copy");
const tg=window.Telegram&&window.Telegram.WebApp;
if(tg){try{
  tg.ready();tg.expand();
  if(tg.colorScheme)document.documentElement.dataset.theme=tg.colorScheme;
  if(tg.disableVerticalSwipes)tg.disableVerticalSwipes();
  const bg=getComputedStyle(document.body).backgroundColor;
  const hex=bg.match(/\d+/g).slice(0,3).map(n=>(+n).toString(16).padStart(2,"0")).join("");
  if(tg.setHeaderColor)tg.setHeaderColor("#"+hex);
  if(tg.setBackgroundColor)tg.setBackgroundColor("#"+hex);
}catch(e){}}

function toText(f){
  const head=f.title+(f.role?"\n("+f.role+")":"");
  return head+"\n\n"+f.q.map((x,i)=>(i+1)+". "+x.q+(x.h?"\n"+x.h:"")+(x.o?"\n"+x.o:"")).join("\n\n")+"\n";
}
function render(){
  chips.innerHTML="";
  FORMS.forEach(f=>{
    const b=document.createElement("button");
    b.className="chip";b.textContent=f.name;b.setAttribute("role","tab");
    b.setAttribute("aria-selected",f.id===cur.id);
    b.onclick=()=>{cur=f;render();try{tg&&tg.HapticFeedback.selectionChanged()}catch(e){}};
    chips.appendChild(b);
  });
  sheet.innerHTML="<h2></h2><p class='desc'></p><ol></ol>";
  sheet.querySelector("h2").textContent=cur.title;
  const d=sheet.querySelector(".desc");d.textContent=cur.role;d.hidden=!cur.role;
  const ol=sheet.querySelector("ol");
  cur.q.forEach(x=>{const li=document.createElement("li");
    const a=document.createElement("strong");a.textContent=x.q;li.appendChild(a);
    if(x.h){const h=document.createElement("div");h.className="h";h.textContent=x.h;li.appendChild(h)}
    if(x.o){const o=document.createElement("div");o.className="o";o.textContent=x.o;li.appendChild(o)}
    ol.appendChild(li)});
  btn.textContent="Скопіювати анкету";
}
async function copy(text){
  try{await navigator.clipboard.writeText(text);return true}catch(e){}
  const t=document.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";
  document.body.appendChild(t);t.select();
  let ok=false;try{ok=document.execCommand("copy")}catch(e){}
  t.remove();return ok;
}
btn.onclick=async()=>{
  const ok=await copy(toText(cur));
  btn.textContent=ok?"Скопійовано ✓":"Не вдалося скопіювати";
  btn.classList.remove("done");void btn.offsetWidth;btn.classList.add("done");
  try{tg&&tg.HapticFeedback.notificationOccurred(ok?"success":"error")}catch(e){}
  setTimeout(()=>{btn.textContent="Скопіювати анкету"},1800);
};
render();
