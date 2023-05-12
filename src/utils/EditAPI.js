import axios from 'axios';

export const putData = async () => {
  const appId = 'c4WQ_cUCjfBykjx1RcJSoH';
  const Id = 'c_vetcOJjaWPKbq8kBk8oG';
  const url = `https://quintadb.com.ua/apps/${appId}/${Id}.json`;
  const restApiKey = 'caW6CPgqDmqykml8kXEHjd';
  const data = {
    values: {
      dcQ8knWRTdNyk_WOejW7bF: 'vvvvv',
      cxWPjwcmnbeA_dOmoAdK9B: 'rtyrtyuuuuuuuuuuuuuuuuuuuu',
    },
  };
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.put(url, data, {
      headers: headers,
      params: {
        rest_api_key: restApiKey,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
