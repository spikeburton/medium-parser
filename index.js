const axios = require('axios');
const username = 'spikeburton';

exports.handler = async () => {
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
      post.image = `https://miro.medium.com/fit/c/800/400/${
        posts[i].virtuals.previewImage.imageId
      }`;
      post.url = `https://medium.com/@${username}/${posts[i].uniqueSlug}`;

      result.push(post);
    }

    return {
      statusCode: 200,
      body: result
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: { msg: e.message }
    };
  }
};
