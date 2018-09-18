const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'yes it is' });

    // Magic. Mongo will automatically associate the ObjectId instead of the object.
    joe.blogPosts.push(blogPost);

    Promise.all([
      joe.save(),
      blogPost.save(),
    ])
    .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) =>{
        assert(count === 0);
        done();
      })
  });
});
