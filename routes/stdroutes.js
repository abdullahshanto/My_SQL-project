const express = require("express");
const {
  getDonors,
  getDonorByID,
  createTable,
  insertDonor,
  dropTable,
  showTables,
  updateDonor,
  deleteDonor,
} = require("../controllers/stdcontrollers");

const router = express.Router();

// table admin endpoints
router.post("/table", createTable);
router.delete("/table", dropTable);
router.get("/tables", showTables);

// donor CRUD endpoints
router.get("/", getDonors);
router.post("/", insertDonor);
router.get("/:id", getDonorByID);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);

module.exports = router;
