
(() => {
const TOTAL=180, KEY="boredom_played_v1", id=Number(window.GAME_ID||0);
const app=document.querySelector("#app"), counter=document.querySelector("#counter");
const seen=()=>{try{return JSON.parse(sessionStorage.getItem(KEY)||"[]")}catch{return[]}};
const save=a=>sessionStorage.setItem(KEY,JSON.stringify([...new Set(a)]));
const pad=n=>String(n).padStart(3,"0");
const root=location.href.replace(/\/games\/\d+\.html.*$/,"/");
const gameURL=n=>root+"games/"+pad(n)+".html";
const pick=a=>a[Math.floor(Math.random()*a.length)];
const update=()=>counter.textContent=`${seen().length} / ${TOTAL} explored`;
const mark=()=>{if(id)save([...seen(),id]);update()};
const next=()=>{let a=seen();if(a.length>=TOTAL){sessionStorage.removeItem(KEY);a=[]}
location.href=gameURL(pick([...Array(TOTAL)].map((_,i)=>i+1).filter(n=>!a.includes(n))))};
document.querySelector(".brand").href=root; update();

if(!id){
 app.innerHTML=`<section class="home"><div><span class="badge">180 tiny games · no accounts</span>
 <h1>Bored?<br>Perfect.</h1><p>One button. One small game. Then another.</p>
 <button class="bored" id="start">I’m bored →</button></div></section>`;
 document.querySelector("#start").onclick=next; return;
}
const type=(id-1)%10, stage=Math.floor((id-1)/10)+1;
const names=["Target Drift","Reaction Room","Signal Memory","Quick Maths","Letter Lab","Pocket Maze","Meteor Aim","Colour Code","Arrow Rush","Odd One Out"];
const subs=["Catch the drifting pulse before it escapes.","Wait for green. Move fast, not early.","Watch the sequence, then replay it.","Five clean calculations. No calculator.","Unscramble the word.","Collect every gold square.","Pop every meteor.","Crack the four-colour code.","Match the arrows as they arrive.","Find the tile that differs."];
app.innerHTML=`<section><span class="badge">Game ${id} of ${TOTAL} · stage ${stage}</span><h2>${names[type]}</h2><p>${subs[type]}</p>
<div class="card" id="game"></div><div class="status" id="status"></div>
<div class="nav"><button id="another">Take me to another</button><button class="ghost" id="home">Take me home</button></div></section>`;
const g=document.querySelector("#game"), status=document.querySelector("#status");
document.querySelector("#another").onclick=()=>{mark();next()};
document.querySelector("#home").onclick=()=>{mark();location.href=root};
const say=(s,good)=>{status.textContent=s;status.style.color=good===false?"var(--bad)":good?"var(--good)":"var(--ink)"};
const win=()=>say("Nice. That one is yours.",true);
const btn=(x,c="")=>`<button class="${c}">${x}</button>`;
const rnd=n=>Math.floor(Math.random()*n);

function drift(){
 let hits=0, need=8+Math.min(stage,7);
 g.innerHTML=`<div><b>Hits: <span>0</span> / ${need}</b></div><button class="target"></button>`;
 const t=g.querySelector(".target"), move=()=>{t.style.left=(7+Math.random()*78)+"%";t.style.top=(15+Math.random()*70)+"%"};
 t.onclick=()=>{hits++;g.querySelector("span").textContent=hits;if(hits===need){t.remove();win()}else move()};move();
}
function reaction(){
 let round=0, armed=false, timer;
 const begin=()=>{armed=false;g.innerHTML=`<div style="text-align:center"><b>Round ${round+1} / 3</b><p>Wait for green…</p></div>`;
 timer=setTimeout(()=>{armed=true;g.innerHTML=`<button style="background:var(--good);font-size:25px;padding:38px">TAP!</button>`;
 g.querySelector("button").onclick=e=>{e.stopPropagation();if(++round===3)win();else setTimeout(begin,600)}},1100+Math.random()*2500);
 g.onclick=()=>{if(!armed){clearTimeout(timer);say("Too early. Resetting.",false);setTimeout(begin,700)}}};
 g.innerHTML=`<div style="text-align:center"><p>Three quick reactions.</p>${btn("Start")}</div>`;g.querySelector("button").onclick=begin;
}
function memory(){
 const colors=["#ff5d70","#5b5cff","#18ae70","#ffbf37"], seq=Array.from({length:3+Math.min(stage,7)},()=>rnd(4));let at=0,locked=true;
 g.innerHTML=`<div><div class="pads">${colors.map((c,i)=>`<button class="pad" data-i="${i}" style="background:${c}"></button>`).join("")}</div><p class="tiny" style="text-align:center">Watch closely.</p></div>`;
 const pads=[...g.querySelectorAll(".pad")],flash=i=>{pads[i].classList.add("on");setTimeout(()=>pads[i].classList.remove("on"),330)};
 seq.forEach((x,i)=>setTimeout(()=>flash(x),500+i*530));setTimeout(()=>{locked=false;say("Your turn.")},700+seq.length*530);
 pads.forEach((p,i)=>p.onclick=()=>{if(locked)return;flash(i);if(i!==seq[at]){at=0;say("Start again.",false);return}if(++at===seq.length){locked=true;win()}});
}
function maths(){
 let score=0;const ask=()=>{let a=rnd(14+stage*3)+3,b=rnd(11+stage*2)+2,mul=stage%3===0,answer=mul?a*b:a+b;
 g.innerHTML=`<div style="text-align:center"><p class="tiny">Solved: ${score} / 5</p><div style="font-size:46px;font-weight:850">${a} ${mul?"×":"+"} ${b}</div><div class="row" style="margin-top:20px"><input class="answer" inputmode="numeric"><button>Check</button></div></div>`;
 let input=g.querySelector("input"),check=()=>{if(Number(input.value)===answer){if(++score===5)win();else ask()}else{say("Not quite.",false);input.select()}};
 g.querySelector("button").onclick=check;input.onkeydown=e=>e.key==="Enter"&&check();input.focus()};ask();
}
function letters(){
 const words=["PLANET","MARBLE","GUITAR","CANDLE","JUNGLE","ROCKET","PUZZLE","VIOLET","CASTLE","BRIDGE","COMET","FOREST","RABBIT","OCEAN","MUSEUM"];
 let word=words[(stage-1)%words.length],scramble=word.split("").sort(()=>Math.random()-.5).join("");
 g.innerHTML=`<div style="text-align:center"><p class="tiny">Unscramble this word</p><div style="font-size:38px;font-weight:850;letter-spacing:.15em">${scramble}</div><div class="row" style="margin-top:22px"><input class="answer"><button>Submit</button></div></div>`;
 let input=g.querySelector("input"),check=()=>input.value.trim().toUpperCase()===word?win():say("Keep rearranging.",false);
 g.querySelector("button").onclick=check;input.onkeydown=e=>e.key==="Enter"&&check();input.focus();
}
function maze(){
 let x=2,y=2,got=0,coins=Array.from({length:6+Math.min(stage,6)},()=>({x:rnd(6),y:rnd(6)}));
 coins=coins.filter((p,i,a)=>!(p.x===2&&p.y===2)&&a.findIndex(q=>q.x===p.x&&q.y===p.y)===i);let goal=coins.length;
 g.innerHTML=`<div><div class="grid maze"></div><div class="keys"><span class="blank"></span>${btn("↑")}<span class="blank"></span>${btn("←")}${btn("↓")}${btn("→")}</div></div>`;
 const grid=g.querySelector(".maze"),draw=()=>{grid.innerHTML="";for(let j=0;j<6;j++)for(let i=0;i<6;i++)grid.innerHTML+=`<div class="cell${i===x&&j===y?" player":""}${coins.some(c=>c.x===i&&c.y===j)?" coin":""}"></div>`;say(`Gold: ${got} / ${goal}`)};
 const move=(dx,dy)=>{x=Math.max(0,Math.min(5,x+dx));y=Math.max(0,Math.min(5,y+dy));let n=coins.findIndex(c=>c.x===x&&c.y===y);if(n>=0){coins.splice(n,1);if(++got===goal)win()}draw()};
 [[0,-1],[-1,0],[0,1],[1,0]].forEach((d,i)=>g.querySelectorAll(".keys button")[i].onclick=()=>move(...d));draw();
}
function aim(){
 let score=0,need=10+Math.min(stage,8);g.innerHTML=`<div><b>Meteors: <span>0</span> / ${need}</b></div><button class="target" style="background:var(--bad)"></button>`;
 const t=g.querySelector(".target"),move=()=>{t.style.left=(5+Math.random()*81)+"%";t.style.top=(15+Math.random()*70)+"%"};
 t.onclick=()=>{g.querySelector("span").textContent=++score;if(score===need){t.remove();win()}else move()};move();
}
function code(){
 let colors=["#ff5d70","#5b5cff","#18ae70","#ffbf37"],secret=Array.from({length:4},()=>rnd(4)),guess=[0,0,0,0],tries=0;
 const draw=()=>{g.innerHTML=`<div style="text-align:center"><p class="tiny">Attempt ${tries+1} / 6 · tap colours to change them</p><div class="row">${guess.map((v,i)=>`<button class="pad" data-i="${i}" style="width:54px;height:54px;background:${colors[v]}"></button>`).join("")}</div><p>${btn("Check code")}</p></div>`;
 g.querySelectorAll(".pad").forEach(p=>p.onclick=()=>{guess[p.dataset.i]=(guess[p.dataset.i]+1)%4;draw()});
 g.querySelector("p button").onclick=()=>{let exact=guess.filter((v,i)=>v===secret[i]).length;if(exact===4)win();else if(++tries===6){tries=0;secret=Array.from({length:4},()=>rnd(4));say("New code. Try again.",false)}else say(`${exact} in the right position.`,false)}};draw();
}
function arrows(){
 let score=0,need=8+Math.min(stage,8),want;const show=()=>{want=pick(["↑","↓","←","→"]);g.innerHTML=`<div style="text-align:center"><p class="tiny">Correct: ${score} / ${need}</p><div style="font-size:82px;font-weight:850">${want}</div><div class="row">${["↑","↓","←","→"].map(x=>btn(x,"choice")).join("")}</div></div>`;
 g.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(b.textContent===want){if(++score===need)win();else show()}else say("Wrong direction.",false)})};show();
}
function odd(){
 let hue=rnd(300),base=`hsl(${hue},75%,60%)`,other=`hsl(${hue},75%,43%)`,chosen=rnd(36);
 g.innerHTML=`<div style="text-align:center"><p class="tiny">One tile is different.</p><div class="grid odd">${Array.from({length:36},(_,i)=>`<button class="cell" style="background:${i===chosen?other:base}"></button>`).join("")}</div></div>`;
 g.querySelectorAll(".cell").forEach((b,i)=>b.onclick=()=>i===chosen?win():say("That belongs with the others.",false));
}
[drift,reaction,memory,maths,letters,maze,aim,code,arrows,odd][type]();
})();
