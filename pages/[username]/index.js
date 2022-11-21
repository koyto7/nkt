import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import { UserProfile } from '../../components/UserProfile';
import { PostFeed } from '../../components/PostFeed';

import {
  where,
  getDocs,
  orderBy,
  limit,
  collection,
  collectionGroup,
  query as fQuery,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);
  // console.log(userDoc.ref.path);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
}

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    // //alternative to userDoc.ref.path is to search through collection with collectionGroup()
    // const postsQuery = fQuery(
    //   collectionGroup(db, 'posts'),
    //   where('published', '==', true),
    //   orderBy('createdAt', 'desc'),
    //   limit(5)
    // );
    const postsQuery = fQuery(
      collection(db, userDoc.ref.path, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    // posts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);

    // console.log(posts);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}
