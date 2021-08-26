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
let _count = 2;

export function getComment() {
  return JSON.parse(JSON.stringify(comments));
}

export function postComment({
  username, email, content, to, id,
}) {
  if (to) {
    comments[_count - id - 1].replys.push({
      username, email, content, to,
    });
  } else {
    comments.unshift({
      username,
      email,
      content,
      date: new Date().toISOString().slice(0, 10),
      like: 0,
      id: _count++,
      replys: [],
    });
  }
}
