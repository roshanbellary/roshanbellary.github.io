const badgeStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  padding: '0.25rem 0.75rem',
  border: '1px solid var(--color-border)',
  borderRadius: '4px',
  color: 'var(--color-accent-dim)',
  background: 'rgba(0, 255, 65, 0.05)',
  display: 'inline-block',
};

function SkillBadge({ name }) {
  return <span style={badgeStyle}>{name}</span>;
}

export default SkillBadge;
