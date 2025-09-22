const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = path.join(__dirname, 'market.db');

async function init(){
  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec(`CREATE TABLE IF NOT EXISTS ads (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    price REAL,
    city TEXT,
    images TEXT,
    createdAt TEXT,
    is_premium INTEGER DEFAULT 0,
    premium_until TEXT
  )`);
  // optional: insert demo if empty
  const row = await db.get('SELECT COUNT(*) as c FROM ads');
  if(row.c === 0){
    await db.run(`INSERT INTO ads (id,title,description,price,city,images,createdAt,is_premium,premium_until)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      'demo-1','قهوة عربية محمصة','كيس 1 كغ، جديد',10,'عدن','[]', new Date().toISOString(), 0, null);
  }
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    createdAt TEXT
  )`);
  
  // add user_id column to ads if not exists
  try {
    await db.get("SELECT user_id FROM ads LIMIT 1");
  } catch(e) {
    await db.exec('ALTER TABLE ads ADD COLUMN user_id TEXT NULL');
  }
  await db.close();
}

async function getDb(){
  return open({ filename: DB_PATH, driver: sqlite3.Database });
}

async function getAllAds(){
  const db = await getDb();
  const rows = await db.all('SELECT * FROM ads ORDER BY (CASE WHEN is_premium=1 AND premium_until > datetime("now") THEN 0 ELSE 1 END), createdAt DESC');
  rows.forEach(r => { r.images = JSON.parse(r.images || '[]'); });
  await db.close();
  return rows;
}

async function getAd(id){
  const db = await getDb();
  const r = await db.get('SELECT * FROM ads WHERE id = ?', id);
  if(r) r.images = JSON.parse(r.images || '[]');
  await db.close();
  return r;
}

async function insertAd(item){
  const db = await getDb();
  await db.run(`INSERT INTO ads (id,title,description,price,city,images,createdAt,is_premium,premium_until) VALUES (?,?,?,?,?,?,?,?,?)`,
    item.id, item.title, item.description, item.price, item.city, item.images, item.createdAt, item.is_premium, item.premium_until);
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    createdAt TEXT
  )`);
  
  // add user_id column to ads if not exists
  try {
    await db.get("SELECT user_id FROM ads LIMIT 1");
  } catch(e) {
    await db.exec('ALTER TABLE ads ADD COLUMN user_id TEXT NULL');
  }
  await db.close();
}

async function setPremium(id, until){
  const db = await getDb();
  await db.run('UPDATE ads SET is_premium=1, premium_until=? WHERE id=?', until, id);
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    createdAt TEXT
  )`);
  
  // add user_id column to ads if not exists
  try {
    await db.get("SELECT user_id FROM ads LIMIT 1");
  } catch(e) {
    await db.exec('ALTER TABLE ads ADD COLUMN user_id TEXT NULL');
  }
  await db.close();
}

async function deleteAd(id){
  const db = await getDb();
  await db.run('DELETE FROM ads WHERE id=?', id);
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    createdAt TEXT
  )`);
  
  // add user_id column to ads if not exists
  try {
    await db.get("SELECT user_id FROM ads LIMIT 1");
  } catch(e) {
    await db.exec('ALTER TABLE ads ADD COLUMN user_id TEXT NULL');
  }
  await db.close();
}

module.exports = { init, getAllAds, getAd, insertAd, setPremium, deleteAd, insertUser, getUserByEmail, getUser };


async function insertUser(user){
  const db = await getDb();
  await db.run(`INSERT INTO users (id,name,email,phone,password_hash,createdAt) VALUES (?,?,?,?,?,?)`,
    user.id, user.name, user.email, user.phone, user.password_hash, user.createdAt);
  await db.close();
}

async function getUserByEmail(email){
  const db = await getDb();
  const r = await db.get('SELECT * FROM users WHERE email = ?', email);
  await db.close();
  return r;
}

async function getUser(id){
  const db = await getDb();
  const r = await db.get('SELECT * FROM users WHERE id = ?', id);
  await db.close();
  return r;
}

module.exports = { init, getAllAds, getAd, insertAd, setPremium, deleteAd, insertUser, getUserByEmail, getUser };
