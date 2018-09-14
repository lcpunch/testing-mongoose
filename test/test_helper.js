const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true })
   .then(() => { done(); })
   .catch(err => console.error('Could not connect to MongoDB, error:', err.message))
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
