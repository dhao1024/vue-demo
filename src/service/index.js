const comments = [
  {
    username: 'DDD',
    email: '',
    content: 'test comment2',
    id: 1,
    like: 14,
    date: '2020-12-12',
    replys: [],
  },
  {
    username: 'PR',
    email: '',
    content: 'test comment test comment test comment test comment',
    id: 0,
    like: 4,
    date: '2020-1-8',
    replys: [{
      username: 'from',
      email: '',
      content: 'test reply test reply test reply test reply ',
      to: 'PR',
    },
    {
      username: 'from2',
      email: '',
      content: 'test reply2',
      to: 'from1',
    },
    {
      username: 'from3',
      email: '',
      content: 'test reply3',
      to: 'from2',
    },
    {
      username: 'from4',
      email: '',
      content: 'test reply4',
      to: 'PR',
    },
    ],
  },
];

let _count = comments.length;
const DELAY = 1000;

export function getComment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(comments);
    }, DELAY);
  });
}

export function postComment({
  username, email, content, to, commentID,
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'deny') {
        resolve({
          status: -1,
          message: "test: username can't be `deny`",
        });
        return;
      }

      if (to) {
        comments[_count - commentID - 1].replys.push({
          username, email, content, to,
        });
      } else {
        comments.unshift({
          username,
          email,
          content,
          date: new Date().toISOString(),
          like: 0,
          id: _count++,
          replys: [],
        });
      }

      resolve({
        status: 0,
        message: 'ok',
      });
    }, DELAY);
  });
}
