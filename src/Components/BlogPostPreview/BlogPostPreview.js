import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styles from './BlogPostPreview.module.css';

function BlogPostPreview({ slug, title, date, description, tags }) {
  return (
    <Link to={`/blog/${slug}`} className={styles.card}>
      <p className={styles.date}>{format(parseISO(date), 'MMM d, yyyy')}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default BlogPostPreview;
