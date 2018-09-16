const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {

  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Henrique');
      done();
    })
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Henrique');
    assertName(joe.save(), done);
  });


  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Henrique' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.updateMany({ name: 'Joe' }, { name: 'Henrique' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name:'Joe' }, { name: 'Henrique' }),
      done
    );
  });

  it('A model class can find a record with an ID and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Henrique' }),
      done
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 10);
        done();
      })
  });
});
