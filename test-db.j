const initSqlJs = require("sql.js");

(async () => {
  const SQL = await initSqlJs();

  // إنشاء قاعدة بيانات جديدة
  const db = new SQL.Database();

  // إنشاء جدول إعلانات
  db.run("CREATE TABLE ads (id INTEGER PRIMARY KEY, title TEXT, price INTEGER);");

  // إدخال إعلان تجريبي
  db.run("INSERT INTO ads (title, price) VALUES ('هاتف سامسونج', 150);");

  // استعلام
  const result = db.exec("SELECT * FROM ads;");

  console.log("الإعلانات المخزنة:");
  console.log(result[0].values);
})();
