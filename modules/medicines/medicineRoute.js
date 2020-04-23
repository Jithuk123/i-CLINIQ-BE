const express = require('express');
const router = express.Router();
const { validate } = require('./medicineValidator');

const {
  getMedicine,
  getSingleMedicine,
  postMedicine,
  editMedicine,
  deleteMedicine,
} = require('./medicineService');

router.get('/', getMedicine);
router.get('/:medicineId', getSingleMedicine);
router.post('/', validate('postMedicineCase'), postMedicine);
router.put('/:medicineId', validate('editMedicineCase'), editMedicine);
router.delete('/:medicineId', validate('editMedicineCase'), deleteMedicine);
module.exports = router;
