import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';
import { auth, provider, db } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username ? props.children : props.fallback || <SignInButton />;
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).catch((e) => console.error(e));
    // if successful, redirect to /admin
    router.push('/admin');
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google-icon.svg'} /> Sign in with Google
    </button>
  );
}
