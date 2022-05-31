import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDB is in the putDB database');
  const todosDb = await openDB('jate',1);
  const transmit = todosDb.transaction('jate', 'readwrite');
  // // const storeObj = storeObj.put({
  // //   value: content
  // // });
  const storeObj = transmit.objectStore('jate');
  const req = storeObj.put({
    value: content
  });
  const res = await req;
  console.log('😳🔥: saved to DB', res);
  // //console.error('putDb not implemented');
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get all the data from the database');
  const pingDb = await openDB('jate', 1);
  const transmit = pingDb.transaction('jate', 'readonly');
  const storeObj = transmit.objectStore('jate');
  const req = storeObj.getAll();
  const res = await req;
  console.log('res.value', res);
  return res;
  // // console.error('getDb not implemented');
}

initdb();
