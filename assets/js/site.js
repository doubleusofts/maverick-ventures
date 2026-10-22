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
const dialog = document.getElementById('info-dialog');
const notices = {
  privacy:['Privacy Policy','Placeholder policy: this demo does not submit contact details, use analytics or set tracking cookies. Replace this notice with your approved privacy policy when you connect a form service or other data processing.'],
  compliance:['Compliance','Add your approved compliance statement and reporting channel here. For now, please use the contact page for general enquiries; no confidential reporting service is connected.'],
  social:['Social profile pending','Your company profile will appear here once its official URL is supplied. Replace this placeholder button with a link to your verified LinkedIn, Facebook or YouTube account.']
};
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => { const [title,copy]=notices[button.dataset.dialog]; document.getElementById('dialog-title').textContent=title; document.getElementById('dialog-copy').textContent=copy; dialog.showModal(); }));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', async event => {
  event.preventDefault();
  const name=form.elements.name, message=form.elements.message;
  name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
  message.setCustomValidity(message.value.trim().length>=10 ? '' : 'Please enter at least 10 non-space characters.');
  if (!form.reportValidity()) return;
  const status=form.querySelector('.status'), submit=form.querySelector('[type=submit]');
  if (!FORM_ENDPOINT) { status.textContent='Thank you. Your enquiry passed validation in demo mode. Nothing was sent or saved. Connect a form service to enable delivery.'; return; }
  submit.disabled=true; status.textContent='Sending your enquiry…';
  try { const response=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}); if(!response.ok) throw new Error('Delivery failed'); status.textContent='Thank you. Your enquiry has been sent successfully.'; form.reset(); }
  catch { status.textContent='Your enquiry could not be sent. Please try again or use the company contact details.'; }
  finally { submit.disabled=false; }
});
if (form) form.addEventListener('input', event => { if ('setCustomValidity' in event.target) event.target.setCustomValidity(''); });
