// У папці "utils" містяться допоміжні файли, для роботи з базою даних QuintaDB.

import axios from 'axios';

const API_KEY = 'caW6CPgqDmqykml8kXEHjd';
const APP_ID = 'c4WQ_cUCjfBykjx1RcJSoH';
const TABLE_NAME = 'bcrSkYW7HdNOo9WQpcICon';

export async function getAllItemsFromTable() {
  try {
    const response = await axios.get(
      `https://quintadb.com.ua/apps/${APP_ID}/dtypes/entity/${TABLE_NAME}.json?rest_api_key=${API_KEY}&view=`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
      }
    );
    const data = response.data.records.map(note => {
      const dateObject = new Date(note.created_at);
      const milliseconds = dateObject.getTime();
      return {
        id: note.id,
        time: milliseconds,
        title: note.values.cxWPjwcmnbeA_dOmoAdK9B
          ? note.values.cxWPjwcmnbeA_dOmoAdK9B
          : '',
        body: note.values.dcQ8knWRTdNyk_WOejW7bF
          ? note.values.dcQ8knWRTdNyk_WOejW7bF
          : '',
      };
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const url = `https://quintadb.com.ua/apps/${APP_ID}/dtypes.json`;
const values = {
  cxWPjwcmnbeA_dOmoAdK9B: ' ',
  dcQ8knWRTdNyk_WOejW7bF: ' ',
};

export const postData = async () => {
  try {
    const response = await axios.post(url, {
      rest_api_key: API_KEY,
      entity_id: TABLE_NAME,
      values: values,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export async function editItemsFromTable(editNote) {
  const { id, title, body } = editNote;
  const url = `https://quintadb.com.ua/apps/${APP_ID}/dtypes/${id}.json?rest_api_key=${API_KEY}`;

  try {
    const response = await axios.put(url, {
      values: {
        cxWPjwcmnbeA_dOmoAdK9B: title,
        dcQ8knWRTdNyk_WOejW7bF: body,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteItemsFromTable(noteId) {
  try {
    const response = await axios.delete(
      `https://quintadb.com.ua/apps/${APP_ID}/dtypes/${noteId}.json?rest_api_key=${API_KEY}&view=`,
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
