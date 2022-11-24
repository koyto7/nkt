import { Metatags } from '../components/Metatags';
import { PostFeed } from '../components/PostFeed';
import Loader from '../components/Loader';
import { db, fromMillis, postToJSON } from '../lib/firebase';
import {
  Timestamp,
  where,
  getDocs,
  orderBy,
  limit,
  collectionGroup,
  startAfter,
  query as fQuery,
} from 'firebase/firestore';
import { useState } from 'react';

// Max post to query per page
const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = fQuery(
    collectionGroup(db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

////////////////////////
//Defualt export
////////////////////////

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const query = fQuery(
      collectionGroup(db, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(query)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  ////////////////////////
  //PAGE MARKUP
  ////////////////////////
  return (
    <main>
      <Metatags title="Home" description="Get the latest posts on our site" />
      <div className="card card-info">
        <h2>💡 Implementation of Next.js + Firebase</h2>
        <p>
          Welcome! This app is built with Next.js and Firebase and is loosely
          inspired by Dev.to.
        </p>
        <p>
          Sign up for an 👨‍🎤 account, ✍️ write posts, then clap 👏 to content
          created by other users. All public content is server-rendered and
          search-engine optimized.
        </p>
      </div>

      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
