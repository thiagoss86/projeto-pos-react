export default function Feedback({ loading, error, success }) {
  if (loading) return <div className="card muted">Carregando...</div>;
  if (error) return <div className="card" style={{ borderColor: '#ff5a69' }}>⚠️</div>;
  if (success) return <div className="card" style={{ borderColor: '#3b8c3b' }}>✅</div>;
  return null;
}   