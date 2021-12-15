const listElements = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchBtn = document.querySelector('#fetch-btn');
const ul = document.querySelector('ul');

const sendHttpRequests = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then(error => {
          console.log(error);
          throw new Error('Something went wrong ! ');
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    });
};

async function fetchPosts() {
  try {
    const listOfPosts = await sendHttpRequests(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElements.append(postEl);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function sendPosts(title, body) {
  const postId = Math.random();
  const post = {
    title: title,
    body: body,
    userId: postId
  };
  try {
    sendHttpRequests(
      'POST',
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
  } catch (error) {
    console.log(error.message);
  }
}

fetchBtn.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
  event.preventDefault();
  const title = event.currentTarget.querySelector('#title').value;
  const content = event.currentTarget.querySelector('#content').value;
  sendPosts(title, content);
});

ul.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    try {
      const postId = event.target.closest('li').id;
      console.log(postId);
      sendHttpRequests(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      event.target.closest('li').remove();
    } catch (error) {
      console.log(error.message);
    }
  }
});
