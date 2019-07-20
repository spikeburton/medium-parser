const axios = require('axios');
const username = 'spikeburton';

exports.handler = async () => {
  try {
    const res = await axios.get(
      `https://medium.com/@${username}/latest?format=json`
    );

    const response = {
      statusCode: 200,
      body: JSON.parse(res.data.replace('])}while(1);</x>', ''))
    };
    return response;
  } catch (e) {
    return {
      statusCode: 400,
      body: { msg: e.message }
    };
  }
};
