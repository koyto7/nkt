// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, initializeAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  where,
  query,
  limit,
  getDocs,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
console.log('APP>>>>', app);
const auth = getAuth(app);
console.log('AUTH>>>>', auth);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

export { db, auth, storage, provider };

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
