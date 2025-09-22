const initSqlJs = require("sql.js");
const fs = require("fs");

(async () => {
  try {
    const SQL = await initSqlJs({
      locateFile: () => "sql-wasm.wasm"   // الملف موجود بجانب test-db.js
    });

    // إذا كان فيه ملف db.sqlite افتحه، إذا ما فيه أنشئ جديد
    let db;
    if (fs.existsSync("db.sqlite")) {
      const filebuffer = fs.readFileSync("db.sqlite");
      db = new SQL.Database(filebuffer);
    } else {
      db = new SQL.Database();
      db.run("CREATE TABLE IF NOT EXISTS ads (id INTEGER PRIMARY KEY, title TEXT, price INTEGER);");
    }

    // إدخال إعلان جديد
    db.run("INSERT INTO ads (title, price) VALUES ('إعلان محفوظ', 200);");

    // قراءة البيانات
    const result = db.exec("SELECT * FROM ads;");
    console.log("الإعلانات في قاعدة البيانات:");
    console.log(result[0].values);

    // حفظ قاعدة البيانات
    const data = db.export();
    fs.writeFileSync("db.sqlite", Buffer.from(data));

  } catch (err) {
    console.error("ERROR:", err);
  }
})();
