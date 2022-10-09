const Examples = require('../models/Example');

module.exports.getAllExamples = async (req, res) => {
  const examples = await Examples.find({});
  res.render('index');
};

module.exports.renderNewExampleForm = async (req, res) => {
  res.render('newExampleForm');
};

module.exports.createNewExample = async (req, res) => {
  const params = req.body;
  const newExample = await new Examples(params);
  await newExample.save();
  res.redirect('/');
};

module.exports.getOneExample = async (req, res) => {
  const { exampleId } = req.params;
  console.log(exampleId);
  const example = await Examples.findById(exampleId);
  console.log(example);
  res.json(example);
};
