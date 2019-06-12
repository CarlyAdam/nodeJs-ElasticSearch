const client = new Client({ node: config.esUrl });

exports.search = async (query) => {
  try {
    const { body } = await client.msearch({
      body: [
        { index: 'student' },
        { query: { match: { name: query } } },

        { index: 'student' },
        { query: { match: { lastName: query } } },
      ],

    });
    return body.responses;
  } catch (err) {
    return err;
  }
};

exports.add = async (body) => {
  try {
    client.bulk({
      body: [
        { index: { _index: 'student', _id: body._id } },
        {
          name: body.name,
          lastName: body.lastName,
        },
      ],
    }, (err) => {
      if (err) {
        throw new Error('ElasticSearch Problem!');
      }
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  search,
};