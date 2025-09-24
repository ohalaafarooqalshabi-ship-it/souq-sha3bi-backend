// Frontend JS for السوق الشعبي MVP (works offline using localStorage, and can call backend if configured)
const STORAGE_KEY = 'souk_popular_listings_v1';
const API_BASE = ''; // if you run backend, set e.g. 'http://localhost:4000'
const TOKEN_KEY = 'souk_token';

const createBtn = document.getElementById('createBtn');
const sidePanel = document.getElementById('sidePanel');
const createForm = document.getElementById('createForm');
const thumbs = document.getElementById('thumbs');
const imagesInput = document.getElementById('imagesInput');
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const cityFilter = document.getElementById('cityFilter');
const totalCount = document.getElementById('totalCount');
const clearBtn = document.getElementById('clearBtn');
const aboutView = document.getElementById('aboutView');
const formView = document.getElementById('formView');
const backToForm = document.getElementById('backToForm');
const aboutBtn = document.getElementById('aboutBtn');
const toast = document.getElementById('toast');

let selectedImages = [];
let listings = loadListings();

renderCityOptions();
renderListings();

createBtn.addEventListener('click', () => {
  formView.style.display = '';
  aboutView.style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

aboutBtn.addEventListener('click', () => {
  formView.style.display = 'none';
  aboutView.style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

imagesInput.addEventListener('change', handleFiles);
createForm.addEventListener('submit', onCreate);
searchInput.addEventListener('input', renderListings);
cityFilter.addEventListener('change', renderListings);
clearBtn.addEventListener('click', () => {
  createForm.reset();
  selectedImages = [];
  thumbs.innerHTML = '';
});
backToForm.addEventListener('click', () => {
  aboutView.style.display = 'none';
  formView.style.display = '';
});

function showToast(msg, time=2500){
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  setTimeout(()=>{ toast.style.opacity = '0'; toast.style.pointerEvents = 'none'; }, time);
}

// Load listings from localStorage or from backend if API_BASE set
function loadListings(){
  if(API_BASE){
    // try fetch from backend (non-blocking): we'll still use localStorage as fallback
    fetch(API_BASE + '/api/ads').then(r=>r.json()).then(data=>{
      if(Array.isArray(data) && data.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        listings = data.map(normalizeListing);
        renderCityOptions();
        renderListings();
      }
    }).catch(()=>{});
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) {
      const demo = [
        demoListing('قهوة عربية محمصة', 'كيس 1 كغ، جديد', 10, 'عدن', false),
        demoListing('دراجة هوائية', 'حالة ممتازة، استخدام بسيط', 85, 'صنعاء', true, 7),
        demoListing('هاتف ذكي مستعمل', 'شاشة جيدة، بطارية 80%', 120, 'تعز', false)
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
      return demo;
    }
    return JSON.parse(raw).map(normalizeListing);
  } catch(e){
    console.error('خطأ في تحميل الإعلانات', e);
    return [];
  }
}

function saveListings(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  // if backend is available, try to sync (best-effort)
  if(API_BASE){
    // naive sync: post new items without id starting with '__local'
    const token = localStorage.getItem(TOKEN_KEY);
    listings.forEach(item=>{
      if(item.id && item.id.startsWith('__local')){
        fetch(API_BASE + '/api/ads', { headers: token ? { 'Authorization': 'Bearer ' + token, 'Content-Type':'application/json' } : { 'Content-Type':'application/json' },
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(item)
        }).then(r=>r.json()).then(remote=>{
          // replace local id with remote id if returned
          if(remote && remote.id){
            item.id = remote.id;
            saveListings();
            renderListings();
          }
        }).catch(()=>{});
      }
    });
  }
}

function demoListing(title, desc, price, city, isPremium=false, premiumDays=0){
  const now = new Date();
  return {
    id: '__local-'+Math.random().toString(36).slice(2,9),
    title, description:desc, price: parseFloat(price),
    city, images: [], createdAt: now.toISOString(),
    is_premium: !!isPremium,
    premium_until: isPremium ? new Date(Date.now() + premiumDays*24*3600*1000).toISOString() : null
  };
}

function normalizeListing(l){
  return {
    id: l.id || ('__local-'+Math.random().toString(36).slice(2,9)),
    title: l.title || '',
    description: l.description || '',
    price: Number(l.price || 0),
    city: l.city || '',
    images: l.images || [],
    createdAt: l.createdAt || new Date().toISOString(),
    is_premium: !!l.is_premium,
    premium_until: l.premium_until || null
  };
}

function handleFiles(e){
  const files = Array.from(e.target.files || []);
  const max = 5;
  if(files.length + selectedImages.length > max){
    alert('الحد الأقصى للصور هو '+max);
    return;
  }
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      selectedImages.push(ev.target.result);
      renderThumbs();
    };
    reader.readAsDataURL(file);
  });
  imagesInput.value = '';
}

function renderThumbs(){
  thumbs.innerHTML = '';
  selectedImages.forEach((src, idx) => {
    const d = document.createElement('div');
    d.className = 'thumb';
    d.innerHTML = '<img src="'+src+'" style="width:100%;height:100%;object-fit:cover"/>';
    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.title = 'حذف';
    btn.style.cssText = 'position:absolute;margin-top:-52px;margin-right:6px;background:#fff;border-radius:50%;border:none;padding:4px;cursor:pointer';
    btn.addEventListener('click', () => {
      selectedImages.splice(idx,1);
      renderThumbs();
    });
    d.style.position = 'relative';
    d.appendChild(btn);
    thumbs.appendChild(d);
  });
}

function onCreate(e){
  const token = localStorage.getItem(TOKEN_KEY);
  if(!token){ if(!confirm('يجب تسجيل الدخول لنشر إعلان. اذهب لصفحة الدخول الآن؟')) return; window.location.href='login.html'; return; }
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value) || 0;
  const city = document.getElementById('city').value.trim() || 'غير محدد';

  if(!title){
    alert('الرجاء إدخال عنوان الإعلان');
    return;
  }

  const item = {
    id: '__local-'+Math.random().toString(36).slice(2,9),
    title, description, price, city,
    images: selectedImages.slice(0,5),
    createdAt: new Date().toISOString(),
    is_premium: false,
    premium_until: null
  };

  listings.unshift(item);
  saveListings();
  createForm.reset();
  selectedImages = [];
  thumbs.innerHTML = '';
  renderCityOptions();
  renderListings();
  showToast('تم نشر الإعلان بنجاح — يمكنك ترقيته لاحقًا.');
}

function renderCityOptions(){
  const cities = Array.from(new Set(listings.map(i=> (i.city||'غير محدد').trim()).filter(Boolean)));
  cityFilter.innerHTML = '<option value="">كل المدن</option>' + cities.map(c=> `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
}

function renderListings(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const city = (cityFilter.value || '').trim();
  const filtered = listings.filter(i => {
    if(city && i.city !== city) return false;
    if(!q) return true;
    return (i.title+' '+i.description+' '+i.city).toLowerCase().includes(q);
  });

  const now = new Date();
  const sorted = filtered.sort((a,b) => {
    const aPremium = a.is_premium && a.premium_until && new Date(a.premium_until) > now;
    const bPremium = b.is_premium && b.premium_until && new Date(b.premium_until) > now;
    if(aPremium && !bPremium) return -1;
    if(bPremium && !aPremium) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  cardsContainer.innerHTML = '';
  if(sorted.length === 0){
    cardsContainer.innerHTML = '<div class="muted">لا توجد إعلانات تطابق البحث.</div>';
  } else {
    sorted.forEach(renderCard);
  }
  totalCount.textContent = sorted.length;
}

function renderCard(item){
  const now = new Date();
  const premiumActive = item.is_premium && item.premium_until && new Date(item.premium_until) > now;
  const card = document.createElement('article');
  card.className = 'card' + (premiumActive ? ' premium' : '');
  const imgUrl = (item.images && item.images.length>0) ? item.images[0] : '';
  const imgDiv = document.createElement('div');
  imgDiv.className = 'img';
  if(imgUrl) imgDiv.style.backgroundImage = `url('${imgUrl}')`;
  else imgDiv.textContent = 'صورة';
  card.appendChild(imgDiv);

  const meta = document.createElement('div');
  meta.className = 'meta';
  const title = document.createElement('h4');
  title.className = 'title';
  title.textContent = item.title;
  meta.appendChild(title);
  const city = document.createElement('div');
  city.className = 'city';
  city.textContent = item.city + ' • ' + (new Date(item.createdAt)).toLocaleDateString();
  meta.appendChild(city);

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = item.price ? item.price + ' $' : 'مجانًا';
  meta.appendChild(price);

  const badges = document.createElement('div');
  badges.className = 'badges';
  if(premiumActive){
    const b = document.createElement('div');
    b.className = 'badge premium';
    b.innerHTML = '⭐ <strong>مميز</strong> • ينتهي ' + new Date(item.premium_until).toLocaleDateString();
    badges.appendChild(b);
  }

  const age = document.createElement('div');
  age.className = 'muted';
  age.style.marginTop = '6px';
  age.textContent = item.description;
  meta.appendChild(age);
  meta.appendChild(badges);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const upgradeBtn = document.createElement('button');
  upgradeBtn.className = 'btn secondary';
  const expiredOrNot = !(item.is_premium && item.premium_until && new Date(item.premium_until) > now);
  upgradeBtn.textContent = expiredOrNot ? 'ترقية إلى مميز (7 أيام)' : 'تمت ترقيته';
  upgradeBtn.disabled = !expiredOrNot;
  upgradeBtn.addEventListener('click', () => {
    if(!confirm('محاكاة دفع: هل تريد ترقية الإعلان لـ7 أيام؟')) return;
    if(API_BASE){
      // call backend to upgrade (best-effort)
      fetch(API_BASE + '/api/ads/' + encodeURIComponent(item.id) + '/premium', {
        method: 'PUT'
      }).then(r=>r.json()).then(updated=>{
        if(updated && updated.id){
          Object.assign(item, updated);
          saveListings();
          renderListings();
          showToast('تمت الترقية عبر الخادم!');
        }
      }).catch(()=>{ doLocalUpgrade(item); });
    } else {
      doLocalUpgrade(item);
    }
  });
  actions.appendChild(upgradeBtn);

  const delBtn = document.createElement('button');
  delBtn.className = 'btn';
  delBtn.style.background = 'linear-gradient(90deg,#ef4444,#ff7a7a)';
  delBtn.textContent = 'حذف';
  delBtn.addEventListener('click', () => {
    if(!confirm('هل تريد حذف هذا الإعلان؟')) return;
    if(API_BASE){
      fetch(API_BASE + '/api/ads/' + encodeURIComponent(item.id), { method:'DELETE', headers: localStorage.getItem(TOKEN_KEY) ? { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY) } : {} })
        .then(()=>{ listings = listings.filter(x => x.id !== item.id); saveListings(); renderListings(); showToast('تم الحذف'); })
        .catch(()=>{ listings = listings.filter(x => x.id !== item.id); saveListings(); renderListings(); showToast('تم الحذف محليًا'); });
    } else {
      listings = listings.filter(x => x.id !== item.id);
      saveListings();
      renderCityOptions();
      renderListings();
      showToast('تم الحذف');
    }
  });
  actions.appendChild(delBtn);

  meta.appendChild(actions);
  card.appendChild(meta);
  cardsContainer.appendChild(card);
}

function doLocalUpgrade(item){
  item.is_premium = true;
  item.premium_until = new Date(Date.now() + 7*24*3600*1000).toISOString();
  saveListings();
  renderListings();
  showToast('تمت الترقية محليًا!');
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


// Auth UI helpers
function updateAuthUI(){
  const token = localStorage.getItem(TOKEN_KEY);
  let controls = document.querySelector('.controls');
  if(!controls) return;
  // remove any auth buttons if exist
  const existing = document.getElementById('authArea');
  if(existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'authArea';
  if(token){
    const user = JSON.parse(localStorage.getItem('souk_user') || '{}');
    div.innerHTML = `<span class="muted" style="margin-right:8px">مرحبًا، ${escapeHtml(user.name || user.email || 'مستخدم')}</span>
      <button class="btn secondary" id="logoutBtn">تسجيل خروج</button>`;
  } else {
    div.innerHTML = `<a href="login.html" class="btn secondary" style="text-decoration:none;color:var(--accent);padding:8px 10px;border-radius:10px">دخول</a>
      <a href="signup.html" class="btn secondary" style="text-decoration:none;color:var(--accent);padding:8px 10px;border-radius:10px;margin-right:6px">إنشاء حساب</a>`;
  }
  controls.appendChild(div);
  const logout = document.getElementById('logoutBtn');
  if(logout) logout.addEventListener('click', ()=>{ localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('souk_user'); updateAuthUI(); showToast('تم تسجيل الخروج'); });
}

document.addEventListener('DOMContentLoaded', ()=>{ updateAuthUI(); });
