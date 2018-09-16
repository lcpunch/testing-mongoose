const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost, comment;
  beforeEach(() => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'yes it is' });
    comment = new Comment({ content: 'Thats really true my friend' });

    // Magic. Mongo will automatically associate the ObjectId instead of the object.
    joe.blogPosts.push(blogPost);
    blogPosts.comments.push(comment);
    comment.user = joe;
  });
});
