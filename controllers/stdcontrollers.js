const { dbPromise } = require("../config/db");
const colors = require("colors");

const getstudent = async (req, res) => {
  try {
    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM students ORDER BY id DESC");

    if (!rows || rows.length === 0) {
      return res.status(404).send({ success: false, message: "no record found" });
    }

    res.status(200).send({ success: true, message: "record found", totalLength: rows.length, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "error fetching student records", error: err.message });
  }
};

const getstdbyID = async (req, res) => {
  try {
    const stdID = req.params.id;
    if (!stdID) return res.status(400).send({ success: false, message: "invalid id" });

    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [stdID]);
    if (!rows || rows.length === 0) return res.status(404).send({ success: false, message: "no record found" });

    res.status(200).send({ success: true, message: "student found", std_details: rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "internal error", error: error.message });
  }
};

const creat_table = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("table has been created".bgGreen.white);
    return res.status(200).send({ success: true, message: "table created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant create table", error: error.message });
  }
};

const insert_data = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).send({ success: false, message: "name and email are required" });

    const db = await dbPromise;
    const [result] = await db.query("INSERT INTO students (name, email) VALUES (?, ?)", [name.trim(), email.trim()]);

    console.log("inserted values into table".bgGreen.white);
    return res.status(201).send({ success: true, message: "Data inserted successfully", insertedId: result.insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant insert data into table", error: error.message });
  }
};

const show_table = async (req, res) => {
  try {
    const db = await dbPromise;
    const [data] = await db.query("SHOW TABLES");
    if (!data || data.length === 0) return res.status(404).send({ success: false, message: "no table found" });
    return res
      .status(200)
      .send({ success: true, message: "Data fetched successfully", totalLength: data.length, data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "can't fetch data", error: error.message });
  }
};

const drop_table = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.query("DROP TABLE IF EXISTS students");
    return res.status(200).send({ success: true, message: "table dropped successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant drop table", error: error.message });
  }
};

const delete_table = async (req, res) => {
  try {
    const db = await dbPromise;
    await db.query("DROP TABLE IF EXISTS students");
    return res.status(200).send({ success: true, message: "table deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant delete table", error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const { name, email } = req.body;
    if (!id) return res.status(400).send({ success: false, message: "id is required for updating" });

    const db = await dbPromise;
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
    const existing = rows && rows[0];
    if (!existing) return res.status(404).send({ success: false, message: "no record found" });

    const nextName = (name && name.trim()) || existing.name;
    const nextEmail = (email && email.trim()) || existing.email;
    await db.query("UPDATE students SET name = ?, email = ? WHERE id = ?", [nextName, nextEmail, id]);

    return res.status(200).send({ success: true, message: "Data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant update data", error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const stdID = req.params.id;
    if (!stdID) return res.status(400).send({ success: false, message: "id is required" });

    const db = await dbPromise;
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [stdID]);
    if (!result || result.affectedRows === 0)
      return res.status(404).send({ success: false, message: "no record found" });

    return res.status(200).send({ success: true, message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "cant delete data", error: error.message });
  }
};

module.exports = {
  getstudent,
  getstdbyID,
  creat_table,
  insert_data,
  drop_table,
  show_table,
  delete_table,
  updateStudent,
  deleteStudent,
};
