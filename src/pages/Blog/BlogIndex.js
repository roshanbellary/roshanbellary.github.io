import { useState, useEffect } from 'react';
import BlogPostPreview from '../../Components/BlogPostPreview/BlogPostPreview';
import styles from './BlogIndex.module.css';

function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/blog/manifest.json`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'// Blog'}</h1>
      <p className={styles.subtitle}>Thoughts on engineering, research, and more</p>

      {loading ? (
        <p className={styles.loading}>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        <div className={styles.grid}>
          {posts.map(post => (
            <BlogPostPreview key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogIndex;
