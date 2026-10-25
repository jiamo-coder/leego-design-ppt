(()=>{
  const slides=[...document.querySelectorAll('.slide')],key=`ldp:${document.querySelector('main').dataset.deckId}`;
  let index=0,mode=innerWidth<769?'reading':'presentation',notes=false;
  try{const saved=Number(localStorage.getItem(key));if(Number.isFinite(saved))index=Math.max(0,Math.min(slides.length-1,saved));}catch{}
  function render(){
    document.body.classList.toggle('overview',mode==='overview');document.body.classList.toggle('reading',mode==='reading');
    slides.forEach((s,i)=>{s.hidden=mode==='presentation'&&i!==index;s.setAttribute('aria-current',String(i===index));s.querySelector('.notes').hidden=!notes||i!==index;const available=mode==='overview'?s.parentElement.clientWidth/(innerWidth>=660?Math.floor(s.parentElement.clientWidth/320):1)-32:innerWidth;const scale=Math.min(available/1280,(innerHeight-84)/720,1);if(mode!=='reading'){s.style.width=`${1280*scale}px`;s.style.height=`${720*scale}px`;s.querySelector('.canvas').style.transform=`scale(${scale})`;}else{s.style.width='';s.style.height='';}});
    document.querySelector('[data-counter]').textContent=`${index+1} / ${slides.length}`;
    try{localStorage.setItem(key,String(index));}catch{}
  }
  function go(n){index=Math.max(0,Math.min(slides.length-1,n));render();if(mode==='reading')slides[index].scrollIntoView({block:'start'});}
  function action(a){if(a==='next')go(index+1);if(a==='prev')go(index-1);if(a==='overview')mode=mode==='overview'?'presentation':'overview';if(a==='reading')mode=mode==='reading'?'presentation':'reading';if(a==='notes')notes=!notes;render();}
  document.querySelector('nav').addEventListener('click',e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(a)action(a);});
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,[contenteditable=true]'))return;const a=({ArrowRight:'next',PageDown:'next',' ':'next',ArrowLeft:'prev',PageUp:'prev',o:'overview',n:'notes',r:'reading'})[e.key];if(a){e.preventDefault();action(a);}});
  slides.forEach((s,i)=>s.addEventListener('click',()=>{if(mode==='overview'){mode='presentation';go(i);}}));
  let startX=0,startY=0;document.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY;},{passive:true});
  document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(mode==='presentation'&&Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)go(index+(dx<0?1:-1));},{passive:true});
  document.querySelectorAll('[data-focal-x]').forEach(img=>{function fit(){const a=img.naturalWidth/img.naturalHeight,t=Number.parseFloat(img.style.width)/Number.parseFloat(img.style.height),cw=a>t?t/a:1,ch=a>t?1:a/t;const x=Math.min(1-cw,Math.max(0,Number(img.dataset.focalX)-cw/2)),y=Math.min(1-ch,Math.max(0,Number(img.dataset.focalY)-ch/2));img.style.objectPosition=`${cw<1?100*x/(1-cw):50}% ${ch<1?100*y/(1-ch):50}%`;}img.addEventListener('load',fit);if(img.complete)fit();});
  addEventListener('resize',render);render();
})();
