const express = require("express");
const {
  getstudent,
  getstdbyID,
  creat_table,
  insert_data,
  delete_table,
  show_table,
  updateStudent,
  deleteStudent,
  drop_table,
} = require("../controllers/stdcontrollers");

const router = express.Router();

// table admin endpoints
router.post("/table", creat_table);
router.delete("/table", drop_table);
router.get("/tables", show_table);

// student CRUD endpoints
router.get("/", getstudent);
router.post("/", insert_data);
router.get("/:id", getstdbyID);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
