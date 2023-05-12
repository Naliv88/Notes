import axios from 'axios';

const API_KEY = 'caW6CPgqDmqykml8kXEHjd';
const APP_ID = 'c4WQ_cUCjfBykjx1RcJSoH';
const TABLE_NAME = 'entity/bcrSkYW7HdNOo9WQpcICon';

export async function getAllItemsFromTable() {
  try {
    const response = await axios.get(
      `https://quintadb.com.ua/apps/${APP_ID}/dtypes/${TABLE_NAME}.json?rest_api_key=${API_KEY}&view=`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
