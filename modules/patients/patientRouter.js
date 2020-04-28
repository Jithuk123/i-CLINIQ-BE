const express=require('express')
const router=express.Router,

const { validate } = require('./patientValidator');
const { authentication } = require('../auth/authenticationMiddleware');
const { authorization } = require('../auth/authorizationMiddleware');

const {}=require('./patientService')

router.get('/',getPatient)
router.get('/:patientId', validate('getSinglePatientCase'),getSinglePatient)
router.post('/',validate('postPatientCase'),postPatient)
router.put('/:patientId',validate('editPatientCase'),editPatient)
router.delete('/:patientId',validate('deletePatientCase'),deletePatient)

module.exports=router