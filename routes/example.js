const express = require('express');
const router = express.Router();
const examples = require('../controllers/examples');

router.route('/').get(examples.getAllExamples);
router
  .route('/new')
  .get(examples.renderNewExampleForm)
  .post(examples.createNewExample);
router.route('/:exampleId').get(examples.getOneExample);

module.exports = router;
