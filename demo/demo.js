(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* ---------- data ---------- */
  var SERVICES=[
    ["Stucco Installation","New stucco done right the first time, built to handle Kern County heat."],
    ["Stucco Repair & Patch","Cracks, holes, and damage repaired and blended to match."],
    ["Stucco Texture Matching","We match existing textures so repairs disappear."],
    ["Acrylic & EIFS Stucco","Flexible, color-rich acrylic finishes and insulated wall systems."],
    ["Stucco Color Coat","A fresh, even color coat that brings faded stucco back."],
    ["Interior & Exterior Plaster","Traditional plaster work, inside and out, finished clean."],
    ["Plaster Repair","Cracked walls and water-damaged ceilings repaired and blended."],
    ["Venetian Plaster","Hand-troweled polished plaster with real depth and movement."],
    ["Drywall Installation & Repair","Hanging, taping, and finishing drywall, from one patch to a full remodel."],
    ["Metal Stud Framing","Straight, solid light-gauge steel framing for walls and soffits."],
    ["T-Bar Ceilings","Suspended T-bar grid ceilings for offices and commercial spaces."]
  ];
  var REVIEWS=[
    ["We took out a window and added a door, and Diaz Plastering finished the job with redoing the stucco. They did an awesome job! The crew were very professional and cleaned up afterwards. They did everything I asked and more! I will be recommending them to anyone looking for a good plastering company.","Jose F."],
    ["Excellent work! They repaired a ceiling for me from damage from a roof leak. They were fast, extremely professional, left no mess behind, and it looks like nothing ever happened to the ceiling. Highly recommend.","Sarah L."],
    ["Diaz Plastering does it again! They are professional, kind, and hard working. They show up when they say they will and on time, to boot! We had more stucco repair, as well as interior drywall patching. Both were executed perfectly and look wonderful! Thank you for another job well done!","Jason H."],
    ["Jovani and team are very professional and great to work with for you your drywall and stucco needs. Diaz Plastering Inc 100% recommended thank you for your great work","Rami D."],
    ["Fantastic job! The guys were on time, respectful and clean! They did a great job and I would recommend them to anyone looking for a quality and professional construction service!","Nicole R."],
    ["Jovani and his team were a pleasure to do business with. They were very professional and showed up when they said they would. We had our entire house color coated and are so happy with the results. We will definitely recommend them to our friends and family","Kevin B."],
    ["Diaz Plastering installed new drywall and stucco during our remodel and did a wonderful job! Good quality work and Jovani was very helpful and responsive.","Sarah T."],
    ["Completed 3 of my houses in a great and timely fashion. Staff was amazing and completed additional work that we needed.","Ronil P."]
  ];
  function esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;")}

  /* services grid, form select, footer list */
  $("#svc").innerHTML=SERVICES.map(function(s){return '<article class="card"><div class="ph"><span>Real photo: '+esc(s[0])+'</span></div><div class="body"><h3>'+esc(s[0])+'</h3><p>'+esc(s[1])+'</p><a class="link" href="#quote">Learn more &rarr;</a></div></article>'}).join("");
  $("#svc-select").insertAdjacentHTML("beforeend",SERVICES.map(function(s){return "<option>"+esc(s[0])+"</option>"}).join("")+"<option>Not sure</option>");
  $("#fsvc").innerHTML=SERVICES.map(function(s){return '<li><a href="#services">'+esc(s[0])+'</a></li>'}).join("");

  /* review marquee: two rows, opposite directions, duplicated for a seamless loop */
  function card(r){return '<div class="rv"><div class="top"><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span class="g">GOOGLE</span></div><p>&ldquo;'+esc(r[0])+'&rdquo;</p><b>'+esc(r[1])+'</b></div>'}
  var a=REVIEWS.slice(0,4), b=REVIEWS.slice(4);
  $("#r1").innerHTML=a.concat(a).map(card).join("");
  $("#r2").innerHTML=b.concat(b).map(card).join("");

  /* ---------- mobile menu ---------- */
  var menu=$("#dz-menu"), burger=$("#dz .burger");
  function setMenu(open){menu.classList.toggle("open",open);burger.setAttribute("aria-expanded",open);document.documentElement.style.overflow=open?"hidden":"";
    burger.innerHTML=open?'<svg class="i" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>':'<svg class="i" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'}
  burger.addEventListener("click",function(){setMenu(!menu.classList.contains("open"))});
  $$("a",menu).forEach(function(l){l.addEventListener("click",function(){setMenu(false)})});

  /* ---------- before / after ---------- */
  var range=$("#ba input"), bef=$("#ba-before"), bar=$("#ba-bar"), knob=$("#ba-knob");
  function setBA(v){bef.style.clipPath="inset(0 "+(100-v)+"% 0 0)";bar.style.left=v+"%";knob.style.left=v+"%"}
  range.addEventListener("input",function(){setBA(+range.value)}); setBA(50);
  $$(".tab").forEach(function(t){t.addEventListener("click",function(){$$(".tab").forEach(function(x){x.classList.remove("on")});t.classList.add("on");
    $("#ba-t").innerHTML=t.dataset.t;$("#ba-c").textContent=t.dataset.c;$("#ba-b").textContent=t.dataset.b;$("#ba-a").textContent=t.dataset.a;range.value=50;setBA(50)})});

  /* ---------- demo form ---------- */
  $(".drop input").addEventListener("change",function(e){var n=e.target.files.length;$("#drop-t").textContent=n?n+" photo"+(n>1?"s":"")+" added":"Add photos of the area"});
  $("#qform").addEventListener("submit",function(e){e.preventDefault();var t=$("#toast");t.style.display="block";t.scrollIntoView({behavior:"smooth",block:"center"})});

  /* ---------- scroll hero ---------- */
  var FRAME_BASE="https://cdn.jsdelivr.net/gh/jonathanmojarro89-a11y/diaz-hero@main/frames/";
  var SETS={desktop:{dir:"desktop/",count:151},mobile:{dir:"mobile/",count:121}};
  var INTRO=0.10, STAGES=6;
  var root=$("#dz-hero"), canvas=$("canvas",root), ctx=canvas.getContext("2d"), poster=$(".poster",root), hint=$(".hint",root), panels=$$(".panel",root);
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches, mq=window.matchMedia("(max-width: 767px)");
  var set, imgs=[], current=-1, active=-1, ticking=false;
  function url(i){return FRAME_BASE+set.dir+"f"+String(i+1).padStart(3,"0")+".webp"}
  function setPanel(n){if(n===active)return;active=n;panels.forEach(function(p,i){p.classList.toggle("on",i===n);p.classList.toggle("past",i<n)});root.setAttribute("data-side",panels[n].getAttribute("data-side"))}
  function sizeCanvas(){var d=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(canvas.clientWidth*d);canvas.height=Math.round(canvas.clientHeight*d);current=-1;render()}
  function draw(img){var cw=canvas.width,ch=canvas.height,s=Math.max(cw/img.naturalWidth,ch/img.naturalHeight),w=img.naturalWidth*s,h=img.naturalHeight*s;ctx.drawImage(img,(cw-w)/2,(ch-h)/2,w,h)}
  function nearest(i){for(var d=0;d<set.count;d++){var x=imgs[i-d],y=imgs[i+d];if(x&&x.complete&&x.naturalWidth)return i-d;if(y&&y.complete&&y.naturalWidth)return i+d}return -1}
  function progress(){if(reduce)return 1;var r=root.getBoundingClientRect(),t=root.offsetHeight-window.innerHeight;return Math.min(1,Math.max(0,-r.top/t))}
  function render(){ticking=false;var p=progress();
    setPanel(p<INTRO?0:1+Math.min(STAGES-1,Math.round((p-INTRO)/(1-INTRO)*(STAGES-1))));
    hint.style.opacity=p>0.02?0:1;
    var fp=p<INTRO?0:(p-INTRO)/(1-INTRO), idx=nearest(Math.round(fp*(set.count-1)));
    if(idx<0||idx===current)return; current=idx; draw(imgs[idx]); root.classList.add("ready")}
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(render)}}
  function load(i,cb){if(imgs[i])return;var im=new Image();im.decoding="async";im.src=url(i);imgs[i]=im;im.onload=function(){if(cb)cb();onScroll()}}
  function init(){set=mq.matches?SETS.mobile:SETS.desktop;imgs=[];current=-1;var last=set.count-1;
    if(reduce){poster.src=url(last);load(last,sizeCanvas);setPanel(panels.length-1);return}
    poster.src=url(0);load(0,sizeCanvas);var step=last/(STAGES-1);for(var s=1;s<STAGES;s++)load(Math.round(s*step));
    var i=1;(function next(){var n=0;while(i<=last&&n<6){if(!imgs[i]){load(i);n++}i++}if(i<=last)setTimeout(next,60)})()}
  setPanel(0); init();
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("resize",sizeCanvas);
  (mq.addEventListener?mq.addEventListener("change",init):mq.addListener(init));
})();
