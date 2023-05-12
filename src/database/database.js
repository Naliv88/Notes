// У папці "db" містяться файли, пов'язані з локальною базою даних браузера і збереженням нотаток.
import { openDB } from 'idb';

const DB_NAME = 'notes-db';
const DB_VERSION = 1;
const NOTES_STORE_NAME = 'notes';

// відкриває базу даних і повертає об'єкт бази даних
async function openNotesDB() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(NOTES_STORE_NAME)) {
        const notesStore = db.createObjectStore(NOTES_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });

        // додати три початкові нотатки
        notesStore.add({
          title: 'Нотатка 1',
          body: 'Текст нотатки 1',
          time: 1683653676766,
          id: '_J0-BZ',
        });
        notesStore.add({
          title: 'Нотатка 2',
          body: 'Текст нотатки 2',
          time: 1683653676766,
          id: '_J0-B2',
        });
        notesStore.add({
          title: 'Нотатка 3',
          body: 'Текст нотатки 3',
          time: 1683653676766,
          id: '_J0-B3',
        });
      }
    },
  });
}

// додає нову нотатку до бази даних
async function addNoteToDB(note) {
  const db = await openNotesDB();
  const tx = db.transaction(NOTES_STORE_NAME, 'readwrite');
  await tx.store.add(note);
  await tx.done;
}

// отримує список всіх нотаток з бази даних
async function getAllNotesFromDB() {
  const db = await openNotesDB();
  const tx = db.transaction(NOTES_STORE_NAME, 'readonly');
  const notes = await tx.store.getAll();
  await tx.done;
  return notes;
}

// видаляє нотатку з бази даних за її ідентифікатором
async function deleteNoteFromDB(noteId) {
  const db = await openNotesDB();
  const tx = db.transaction(NOTES_STORE_NAME, 'readwrite');
  await tx.store.delete(noteId);
  await tx.done;
}

// оновлює існуючу нотатку в базі даних
async function updateNoteInDB(note) {
  const db = await openNotesDB();
  const tx = db.transaction(NOTES_STORE_NAME, 'readwrite');
  await tx.store.put(note);
  await tx.done;
}

export { addNoteToDB, getAllNotesFromDB, deleteNoteFromDB, updateNoteInDB };
