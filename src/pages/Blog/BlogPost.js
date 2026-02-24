import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format, parseISO } from 'date-fns';
import 'katex/dist/katex.min.css';
import styles from './BlogPost.module.css';

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };
  const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    }
    frontmatter[key] = value;
  });
  return { data: frontmatter, content: match[2] };
}

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/blog/posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.text();
      })
      .then(text => {
        const { data, content } = parseFrontmatter(text);
        setPost({ frontmatter: data, content });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className={styles.container}>
      <p className={styles.loading}>Loading post...</p>
    </div>
  );

  if (error) return (
    <div className={styles.container}>
      <Link to="/blog" className={styles.backLink}>{'<'}- back to blog</Link>
      <p className={styles.error}>Error: {error}</p>
    </div>
  );

  const { frontmatter, content } = post;

  return (
    <div className={styles.container}>
      <Link to="/blog" className={styles.backLink}>{'<'}- back to blog</Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{frontmatter.title || slug}</h1>
        <div className={styles.meta}>
          {frontmatter.date && (
            <span className={styles.date}>
              {format(parseISO(frontmatter.date), 'MMMM d, yyyy')}
            </span>
          )}
          {Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0 && (
            <div className={styles.tags}>
              {frontmatter.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className={styles.prose}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    background: '#0d0d0d',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img({ src, alt }) {
              const resolvedSrc = src && src.startsWith('http')
                ? src
                : `${process.env.PUBLIC_URL}/blog/images/${src}`;
              return <img src={resolvedSrc} alt={alt || ''} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default BlogPost;
