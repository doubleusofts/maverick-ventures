'use strict';
// Public form-service URL only. Keep empty for demo mode. No secret keys belong in client code.
const FORM_ENDPOINT = '';
const header = document.querySelector('.header');
const groups = [...document.querySelectorAll('.nav-group')];
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const desktop = window.matchMedia('(min-width: 801px)');
let menuCloseTimer;
function cancelMenuClose() { clearTimeout(menuCloseTimer); }
function toggleGroup(group, open) {
  group.classList.toggle('open', open);
  group.querySelector('button').setAttribute('aria-expanded', String(open));
  group.querySelector('.mega').inert = !open;
}
function closeGroups() { cancelMenuClose(); groups.forEach(group => toggleGroup(group, false)); }
groups.forEach(group => {
  const button = group.querySelector('button');
  button.addEventListener('click', () => { const open = desktop.matches || !group.classList.contains('open'); closeGroups(); toggleGroup(group, open); });
  group.addEventListener('mouseenter', () => { cancelMenuClose(); if (desktop.matches) { closeGroups(); toggleGroup(group, true); } });
  group.addEventListener('mouseleave', () => { if (desktop.matches) menuCloseTimer = setTimeout(() => { if (!group.matches(':hover') && !group.contains(document.activeElement)) toggleGroup(group, false); }, 200); });
  group.querySelector('.mega').addEventListener('mouseenter', cancelMenuClose);
  group.addEventListener('focusout', () => { setTimeout(() => { if (!group.contains(document.activeElement)) toggleGroup(group, false); }, 0); });
  button.addEventListener('keydown', event => { if (event.key === 'ArrowDown') { event.preventDefault(); closeGroups(); toggleGroup(group, true); group.querySelector('.mega-links a').focus(); } });
  group.querySelectorAll('[data-image]').forEach(link => {
    const update = () => { group.querySelector('.mega-image img').src = link.dataset.image; };
    link.addEventListener('mouseenter', update); link.addEventListener('focus', update);
  });
});
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  hamburger.textContent = open ? '×' : '☰';
  if (!open) closeGroups();
});
document.addEventListener('click', event => { if (!header.contains(event.target)) { closeGroups(); nav.classList.remove('mobile-open'); hamburger.setAttribute('aria-expanded','false'); hamburger.setAttribute('aria-label','Open navigation'); hamburger.textContent='☰'; } });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = groups.find(g => g.classList.contains('open'));
  if (openGroup) { closeGroups(); openGroup.querySelector('button').focus(); }
  else if (nav.classList.contains('mobile-open')) { hamburger.click(); hamburger.focus(); }
});
desktop.addEventListener('change', () => { closeGroups(); nav.classList.remove('mobile-open'); hamburger.setAttribute('aria-expanded','false'); hamburger.setAttribute('aria-label','Open navigation'); hamburger.textContent='☰'; });
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
const tabs = [...document.querySelectorAll('.cap-tab')];
function activateTab(index, focus = false) {
  tabs.forEach((tab,i) => { tab.setAttribute('aria-selected',String(index === i)); tab.tabIndex = index === i ? 0 : -1; document.getElementById(tab.getAttribute('aria-controls')).hidden = index !== i; });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab,i) => {
  tab.addEventListener('click', () => activateTab(i));
  tab.addEventListener('keydown', event => { let next=i; if (event.key==='ArrowDown'||event.key==='ArrowRight') next=(i+1)%tabs.length; else if(event.key==='ArrowUp'||event.key==='ArrowLeft') next=(i-1+tabs.length)%tabs.length; else if(event.key==='Home') next=0; else if(event.key==='End') next=tabs.length-1; else return; event.preventDefault(); activateTab(next,true); });
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold:.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', async event => {
  event.preventDefault();
  const name=form.elements.name, message=form.elements.message;
  name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
  message.setCustomValidity(message.value.trim().length>=10 ? '' : 'Please enter at least 10 non-space characters.');
  if (!form.reportValidity()) return;
  const status=form.querySelector('.status'), submit=form.querySelector('[type=submit]');
  if (!FORM_ENDPOINT) { status.textContent='Online delivery is not connected yet. Your enquiry was not sent. Please email info@maverickventures.international or call +966 55 645 3204.'; return; }
  submit.disabled=true; status.textContent='Sending your enquiry…';
  try { const response=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}); if(!response.ok) throw new Error('Delivery failed'); status.textContent='Thank you. Your enquiry has been sent successfully.'; form.reset(); }
  catch { status.textContent='Your enquiry could not be sent. Please try again or use the company contact details.'; }
  finally { submit.disabled=false; }
});
if (form) form.addEventListener('input', event => { if ('setCustomValidity' in event.target) event.target.setCustomValidity(''); });

const certificateDialog = document.querySelector('.certificate-lightbox');
if (certificateDialog) {
  const cards = [...document.querySelectorAll('[data-certificate]')];
  const picture = certificateDialog.querySelector('.certificate-viewport img');
  const viewport = certificateDialog.querySelector('.certificate-viewport');
  let current = 0, zoom = 1, opener;
  function fitImage() {
    if (!picture.naturalWidth || !certificateDialog.open) return;
    const scale = Math.min((viewport.clientWidth - 20) / picture.naturalWidth, (viewport.clientHeight - 20) / picture.naturalHeight);
    picture.style.width = `${picture.naturalWidth * scale * zoom}px`;
    picture.style.height = 'auto';
  }
  function setZoom(value) {
    zoom = Math.max(1, Math.min(4, value));
    fitImage();
    certificateDialog.querySelector('[data-cert-action="zoom-out"]').disabled = zoom === 1;
    certificateDialog.querySelector('[data-cert-action="zoom-in"]').disabled = zoom === 4;
  }
  function show(index) {
    current = (index + cards.length) % cards.length;
    const card = cards[current], title = card.querySelector('h3').textContent;
    picture.src = card.dataset.full; picture.alt = title;
    document.getElementById('certificate-title').textContent = title;
    certificateDialog.querySelector('.certificate-counter').textContent = `${current + 1} of ${cards.length} · Arrow keys: previous / next · + / −: zoom · Esc: close`;
    setZoom(1); viewport.scrollTo(0, 0);
  }
  cards.forEach((card, index) => card.addEventListener('click', () => {
    opener = card; show(index); certificateDialog.showModal(); document.body.style.overflow = 'hidden'; fitImage();
    certificateDialog.querySelector('[data-cert-action="close"]').focus();
  }));
  function action(name) {
    if (name === 'close') certificateDialog.close();
    if (name === 'previous') show(current - 1);
    if (name === 'next') show(current + 1);
    if (name === 'zoom-in') setZoom(zoom + .5);
    if (name === 'zoom-out') setZoom(zoom - .5);
  }
  certificateDialog.querySelectorAll('[data-cert-action]').forEach(button => button.addEventListener('click', () => action(button.dataset.certAction)));
  certificateDialog.addEventListener('keydown', event => {
    const command = {ArrowLeft:'previous',ArrowRight:'next','+':'zoom-in','=':'zoom-in','-':'zoom-out'}[event.key];
    if (command) { event.preventDefault(); action(command); }
  });
  certificateDialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
  picture.addEventListener('load', fitImage);
  window.addEventListener('resize', fitImage);
}
