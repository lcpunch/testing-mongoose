const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true })
 .then(() => console.log('Connected to MongoDB.'))
 .catch(err => console.error('Could not connect to MongoDB, error:', err.message))

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
