/**
  Backend for "السوق الشعبي"
  - DB: @seald-io/nedb (users.db, ads.db)
  - Auth: JWT
  - Owner info embedded
*/
const express = require('express');
const Datastore = require('@seald-io/nedb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// قواعد البيانات
const DATA_DIR = __dirname;
const usersDB = new Datastore({ filename: path.join(DATA_DIR, 'users.db'), autoload: true });
const adsDB = new Datastore({ filename: path.join(DATA_DIR, 'ads.db'), autoload: true });

// معلومات التطبيق / المالك
const APP_NAME = "السوق الشعبي";
const OWNER_NAME = "علاء فاروق سيف علوان الشعبي";
const OWNER_PHONE = "777268793";

// إعداد السرّ للتوكِن
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_now';

// Helper functions
const dbFindOne = (db, q) =>
  new Promise((res, rej) => db.findOne(q, (e, d) => (e ? rej(e) : res(d))));
const dbInsert = (db, doc) =>
  new Promise((res, rej) => db.insert(doc, (e, d) => (e ? rej(e) : res(d))));
const dbFind = (db, q, sort) =>
  new Promise((res, rej) => {
    let c = db.find(q || {});
    if (sort) c = c.sort(sort);
    c.exec((e, docs) => (e ? rej(e) : res(docs)));
  });
const dbUpdate = (db, q, u, opts) =>
  new Promise((res, rej) => db.update(q, u, opts || {}, (e, n) => (e ? rej(e) : res(n))));
const dbRemove = (db, q, opts) =>
  new Promise((res, rej) => db.remove(q, opts || {}, (e, n) => (e ? rej(e) : res(n))));

// Middleware لفك التوكِن
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Missing token' });
  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ========== المسارات ==========

// تسجيل مستخدم جديد
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username & password required" });

    const existing = await dbFindOne(usersDB, { username });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await dbInsert(usersDB, { username, password: hashed });
    res.json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error in register" });
  }
});

// تسجيل دخول
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await dbFindOne(usersDB, { username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error in login" });
  }
});

// إضافة إعلان
app.post('/api/ads', auth, async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price)
      return res.status(400).json({ error: "title & price required" });

    const ad = await dbInsert(adsDB, {
      title,
      price,
      userId: req.user.id,
      createdAt: new Date()
    });
    res.json({ success: true, ad });
  } catch (err) {
    console.error("Ad insert error:", err);
    res.status(500).json({ error: "Server error in ads" });
  }
});

// تعديل إعلان
app.put('/api/ads/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;

    const count = await dbUpdate(
      adsDB,
      { _id: id, userId: req.user.id },
      { $set: { title, price } }
    );

    if (count === 0) return res.status(404).json({ error: "Ad not found or not yours" });
    res.json({ success: true });
  } catch (err) {
    console.error("Ad update error:", err);
    res.status(500).json({ error: "Server error in ad update" });
  }
});

// حذف إعلان
app.delete('/api/ads/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const count = await dbRemove(adsDB, { _id: id, userId: req.user.id });

    if (count === 0) return res.status(404).json({ error: "Ad not found or not yours" });
    res.json({ success: true });
  } catch (err) {
    console.error("Ad delete error:", err);
    res.status(500).json({ error: "Server error in ad delete" });
  }
});

// عرض كل الإعلانات
app.get('/api/ads', async (req, res) => {
  try {
    const ads = await dbFind(adsDB, {}, { createdAt: -1 });
    res.json(ads);
  } catch (err) {
    console.error("Ads fetch error:", err);
    res.status(500).json({ error: "Server error in ads fetch" });
  }
});

// معلومات التطبيق
app.get('/api/info', (req, res) => {
  res.json({ app: APP_NAME, owner: OWNER_NAME, phone: OWNER_PHONE });
});

// تشغيل السيرفر على الشبكة
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on http://0.0.0.0:${PORT}`);
  console.log("ℹ️ افتح المتصفح أو التطبيق على http://<IP_جهازك>:" + PORT);
});
