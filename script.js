'use strict';
const loader=document.getElementById('loader');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('load',()=>{window.setTimeout(()=>loader.classList.add('hidden'),reducedMotion?0:1250)}, {once:true});
// Never leave the visitor stuck on the intro if an external image/font hangs.
window.setTimeout(()=>loader.classList.add('hidden'),3200);
const menuToggle=document.getElementById('menuToggle');
const siteNav=document.getElementById('siteNav');
menuToggle.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuToggle.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{siteNav.classList.remove('open');menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
const items=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver' in window&&!reducedMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});items.forEach(item=>observer.observe(item))}else{items.forEach(item=>item.classList.add('visible'))}
const glow=document.getElementById('cursorGlow');
if(window.matchMedia('(pointer:fine)').matches&&!reducedMotion){window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}else glow.style.display='none';
const hero=document.getElementById('heroCharacter');
if(!reducedMotion){window.addEventListener('scroll',()=>{const y=window.scrollY;if(y<window.innerHeight)hero.style.translate=`0 ${Math.min(y*.13,95)}px`},{passive:true})}
const high=document.getElementById('highHonor');const low=document.getElementById('lowHonor');
function updateHonor(isHigh){high.classList.toggle('active',isHigh);low.classList.toggle('active',!isHigh);high.setAttribute('aria-pressed',String(isHigh));low.setAttribute('aria-pressed',String(!isHigh));document.getElementById('honorTitle').textContent=isHigh?'A GOOD MAN':'A WANTED MAN';document.getElementById('honorText').textContent=isHigh?'Even in a cruel world, there is still room for kindness.':'The frontier remembers every debt, every betrayal, every bullet.';document.getElementById('honorIcon').textContent=isHigh?'☀':'☠';document.getElementById('honorMeter').style.left=isHigh?'78%':'22%'}
high.addEventListener('click',()=>updateHonor(true));low.addEventListener('click',()=>updateHonor(false));
hero.addEventListener('error',()=>{hero.classList.add('image-unavailable');hero.alt='Arthur Morgan artwork unavailable; please connect to the internet to load the official character image.'});
