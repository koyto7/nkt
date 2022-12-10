import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

// UI component for user profile
export function UserProfile({ user }) {
  return (
    <div className="box-center">
      <img src={user.photoURL || '/hacker.png'} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>

      {auth.currentUser && (
        <button onClick={() => signOut(auth)}>Sign Out</button>
      )}
    </div>
  );
}
