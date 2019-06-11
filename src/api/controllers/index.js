const { Client } = require('@elastic/elasticsearch');
const db = require('../../config/db/');
const Student = require('../models/student');

const client = new Client({ node: process.env.ES_URL });

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
    const { body } = await client.msearch({
      body: [
        { index: 'student' },
        { query: { match: { name: query } } },

        { index: 'student' },
        { query: { match: { lastName: query } } },
      ],

    });
    return res.json({
      body: body.responses,
    });
  } catch (err) {
    return res.status(500).send('Something broke!');
  }
};

// create new student in mongodb and add to elasticSearch index
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    student.save();

    // create elasticsearch index with new data
    client.bulk({
      body: [
        { index: { _index: 'student', _id: req.body._id } },
        {
          name: req.body.name,
          lastName: req.body.lastName,
        },
      ],
    }, (err) => {
      if (err) {
        return res.status(500).send('ElasticSearch Problem!');
      }
    });
    return res.status(200).send('Student created successfully');
  } catch (err) {
    return res.status(500).send('Something broke!');
  }
};
