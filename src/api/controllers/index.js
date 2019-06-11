const { Client } = require('@elastic/elasticsearch');
const db = require('../../config/db/');
const Student = require('../models/student');

const client = new Client({ node: process.env.ES_URL });