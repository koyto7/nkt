import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const router = useRouter();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
