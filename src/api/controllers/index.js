const Student = require('../models/student');
const elastic = require('../../helpers/elastic');

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.json({
      students,
    });
  } catch (err) {
    return res.status(500).send('Something broke!');
  }
};

// search implementation with elastic search
exports.search = async (req, res) => {
  const { query } = req.query;

  try {
    const body = await elastic.search(query);
    return res.json({
      body : body,
    });
  } catch (err) {
    return res.status(500).send('Something broke!');
  }
};

// create new student in mongodb and add to elasticSearch index
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    // create elasticsearch index with new data
    await elastic.add(req.body);

    return res.status(200).send('Student created successfully');
  } catch (err) {
    return res.status(500).send('Something broke!');
  }
};
