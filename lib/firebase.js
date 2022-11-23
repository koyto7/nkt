// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  where,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBznmyMTqdqP2koqEtqkfR2wEhxl4PzC7k',
  authDomain: 'nkt-firebaseapp.firebaseapp.com',
  projectId: 'nkt-firebaseapp',
  storageBucket: 'nkt-firebaseapp.appspot.com',
  messagingSenderId: '596851014901',
  appId: '1:596851014901:web:4e7bc97c4f3b8c7e7419bc',
  measurementId: 'G-FHPLSTEK6V',
};

// Initialize Firebase
// need if becaue next may try to initialize twice
function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}
const app = createFirebaseApp(firebaseConfig);

// Auth exports
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
// Firestore exports
const db = getFirestore(app);
// Storage exports
const storage = getStorage(app);
const STATE_CHANGED = 'state_changed';

// EXPORTS
export { db, auth, storage, provider, STATE_CHANGED };

////////////////////////
// Helper functions
////////////////////////

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, 'users');
  const userQuery = query(
    usersRef,
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(userQuery)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
