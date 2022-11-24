import { db, auth } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment, doc, writeBatch } from 'firebase/firestore';

// function to increment the clap count
export default function ClapIncrement({ postRef }) {
  const uid = auth?.currentUser?.uid;

  // Listen to heart document for currently logged in user
  const clapRef = doc(db, postRef.path, 'claps', uid);
  const [clapCount] = useDocument(clapRef);
  // Create a user-to-post relationship
  const clap = async () => {
    const batch = writeBatch(db);
    batch.set(clapRef, { uid });
    batch.update(postRef, { clapCount: increment(1) });
    await batch.commit();
  };

  // Remove a user-to-post relationship
  const unclap = async () => {
    const batch = writeBatch(db);
    batch.delete(clapRef);
    batch.update(postRef, { clapCount: increment(-1) });
    await batch.commit();
  };

  return clapCount?.exists() ? (
    <button onClick={unclap}>🙌 Unclap</button>
  ) : (
    <button onClick={clap}>👏 Clap</button>
  );
}
