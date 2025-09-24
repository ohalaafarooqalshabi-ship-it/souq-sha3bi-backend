// auth.js - handles signup and login and stores token in localStorage
const API_BASE = ''; // set to backend URL if available, e.g., http://localhost:4000
const toast = document.getElementById('toast');

function showToast(msg, time=2200){
  if(!toast) return;
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(()=>{ toast.style.opacity = '0'; }, time);
}

async function login(email, password){
  const res = await fetch(API_BASE + '/api/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if(res.ok){
    localStorage.setItem('souk_token', data.token);
    localStorage.setItem('souk_user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    showToast('تم تسجيل الدخول');
    setTimeout(()=>{ window.location.href = 'index.html'; }, 700);
  } else {
    showToast(data.error || 'خطأ في تسجيل الدخول');
  }
}

async function signup(name, email, phone, password){
  const res = await fetch(API_BASE + '/api/signup', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name, email, phone, password })
  });
  const data = await res.json();
  if(res.ok){
    localStorage.setItem('souk_token', data.token);
    localStorage.setItem('souk_user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    showToast('تم إنشاء الحساب وتسجيل الدخول');
    setTimeout(()=>{ window.location.href = 'index.html'; }, 900);
  } else {
    showToast(data.error || 'خطأ في إنشاء الحساب');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      if(!email || !password){ showToast('الرجاء إدخال البريد وكلمة المرور'); return; }
      login(email, password);
    });
  }
  if(signupBtn){
    signupBtn.addEventListener('click', ()=>{
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('password').value.trim();
      if(!email || !password){ showToast('الرجاء إدخال البريد وكلمة المرور'); return; }
      signup(name, email, phone, password);
    });
  }
});
