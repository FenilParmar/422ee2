const globals = require('@jest/globals');
const request = require('supertest');
const app = require('../src/app');
const { makeToken } = require('./utils');

const { describe, it, expect } = globals;

// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

describe('GET /api/post', () => {
  it('should return all posts of author ID 2 in specific order.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({ authorIds: '2' })
      .send();
    expect(res.body).toEqual({
      posts: [
        {
          tags: ['food', 'recipes', 'baking'],
          id: 1,
          text: 'Excepteur occaecat minim reprehenderit cupidatat dolore voluptate velit labore pariatur culpa esse mollit. Veniam ipsum amet eu dolor reprehenderit quis tempor pariatur labore. Tempor excepteur velit dolor commodo aute. Proident aute cillum dolor sint laborum tempor cillum voluptate minim. Amet qui eiusmod duis est labore cupidatat excepteur occaecat nulla.',
          likes: 12,
          reads: 5,
          popularity: 0.19,
        },
        {
          tags: ['travel', 'hotels'],
          id: 2,
          text: 'Ea cillum incididunt consequat ullamco nisi aute labore cupidatat exercitation et sunt nostrud. Occaecat elit tempor ex anim non nulla sit culpa ipsum aliquip. In amet in Lorem ut enim. Consectetur ea officia reprehenderit pariatur magna eiusmod voluptate. Nostrud labore id adipisicing culpa sunt veniam qui deserunt magna sint mollit. Cillum irure pariatur occaecat amet reprehenderit nisi qui proident aliqua.',
          likes: 104,
          reads: 200,
          popularity: 0.7,
        },
        {
          tags: ['travel', 'airbnb', 'vacation'],
          id: 3,
          text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
          likes: 10,
          reads: 32,
          popularity: 0.7,
        },
      ],
    });
    expect(res.status).toEqual(200);
  });
});

describe('PATCH /api/posts/:postId', () => {
  it('should update properties of a post.', async () => {
    const token = makeToken(1);
    const postId = 1;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        tags: ['travel', 'vacation'],
        text: 'my text',
        authorIds: [1, 5],
      });
    expect(res.body).toEqual({
      post: {
        authorIds: [1, 5],
        id: 1,
        likes: 12,
        popularity: 0.19,
        reads: 5,
        tags: ['travel', 'vacation'],
        text: 'my text',
      },
    });
    expect(res.status).toEqual(200);
  });
  it('should only update text when only text is provided', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        text: 'new text',
      });
    expect(res.body).toEqual({
      post: {
        authorIds: [2, 3],
        id: 3,
        likes: 10,
        popularity: 0.7,
        reads: 32,
        tags: ['travel', 'airbnb', 'vacation'],
        text: 'new text',
      },
    });
  });
});
