const ADMIN_PASSWORD = 'FArOOq736@$'; // عدلها في README للنسخة الحقيقية
const STORAGE_KEY = 'souk_popular_listings_v1';
const loginBtn = document.getElementById('loginBtn');
const adminPass = document.getElementById('adminPass');
const loginPanel = document.getElementById('loginPanel');
const adminPanel = document.getElementById('adminPanel');
const logoutBtn = document.getElementById('logoutBtn');
const adsList = document.getElementById('adsList');
const adminStats = document.getElementById('adminStats');
const toast = document.getElementById('toast');

loginBtn.addEventListener('click', ()=>{
  if(adminPass.value === ADMIN_PASSWORD){
    loginPanel.style.display = 'none';
    adminPanel.style.display = '';
    renderAdmin();
  } else {
    showToast('كلمة السر خاطئة');
  }
});

logoutBtn.addEventListener('click', ()=>{
  adminPass.value=''; adminPanel.style.display='none'; loginPanel.style.display='';
  showToast('تم تسجيل الخروج');
});

function loadListings(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    return JSON.parse(raw);
  } catch(e){ return []; }
}

function saveListings(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function renderAdmin(){
  const list = loadListings();
  adminStats.textContent = `إجمالي الإعلانات: ${list.length} — مميزة: ${list.filter(x=>x.is_premium && x.premium_until && new Date(x.premium_until)>new Date()).length}`;
  adsList.innerHTML = '';
  if(list.length===0) adsList.innerHTML = '<div class="muted">لا توجد إعلانات</div>';
  list.forEach(item=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.style.marginBottom='8px';
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${escapeHtml(item.title)}</div>
          <div class="muted">${escapeHtml(item.city)} • ${new Date(item.createdAt).toLocaleString()}</div>
        </div>
        <div style="text-align:right">
          <div style="margin-bottom:8px">${item.price ? item.price+' $' : 'مجانًا'}</div>
          <div style="display:flex;gap:6px">
            <button class="btn" data-action="toggle" data-id="${item.id}">${item.is_premium ? 'إلغاء تمييز' : 'تمييز'}</button>
            <button class="btn" style="background:linear-gradient(90deg,#ef4444,#ff7a7a)" data-action="delete" data-id="${item.id}">حذف</button>
          </div>
        </div>
      </div>
    `;
    adsList.appendChild(div);
  });

  adsList.querySelectorAll('button[data-action]').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const id = b.getAttribute('data-id');
      const action = b.getAttribute('data-action');
      if(action==='delete'){
        if(!confirm('هل تريد حذف الإعلان؟')) return;
        const newList = loadListings().filter(x=>x.id!==id);
        saveListings(newList);
        renderAdmin();
        showToast('تم الحذف');
      } else if(action==='toggle'){
        const list = loadListings();
        const it = list.find(x=>x.id===id);
        if(!it) return;
        if(it.is_premium && it.premium_until && new Date(it.premium_until) > new Date()){
          it.is_premium = false; it.premium_until = null;
        } else {
          it.is_premium = true; it.premium_until = new Date(Date.now()+7*24*3600*1000).toISOString();
        }
        saveListings(list);
        renderAdmin();
        showToast('تم التحديث');
      }
    });
  });
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function showToast(msg, time=2200){
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  setTimeout(()=>{ toast.style.opacity = '0'; toast.style.pointerEvents = 'none'; }, time);
}
