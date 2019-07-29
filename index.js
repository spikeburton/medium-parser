const axios = require('axios');

exports.handler = async event => {
  const username = event['queryStringParameters']['username'];
  const headers = {
    'Access-Control-Allow-Origin': '*'
  };

  if (!username) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'You must provide your username!' })
    };
  }

  const width = event['queryStringParameters']['width'] || 800;
  const height = event['queryStringParameters']['height'] || 400;

  try {
    const res = await axios.get(
      `https://medium.com/@${username}/latest?format=json`
    );

    const result = [];
    const posts = JSON.parse(res.data.replace('])}while(1);</x>', '')).payload
      .references.Post;
    for (let i in posts) {
      let post = {};

      post.id = posts[i].id;
      post.createdAt = posts[i].createdAt;
      post.title = posts[i].title;
      post.subtitle = posts[i].virtuals.subtitle;
      post.image = `https://miro.medium.com/fit/c/${width}/${height}/${
        posts[i].virtuals.previewImage.imageId
      }`;
      post.url = `https://medium.com/@${username}/${posts[i].uniqueSlug}`;

      result.push(post);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
