import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (t) setToken(t);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!token) return setMessage('Token mancante');
    if (password.length < 6) return setMessage('Password deve avere almeno 6 caratteri');
    if (password !== confirm) return setMessage('Le password non corrispondono');

    setLoading(true);
    try {
      const resp = await authAPI.resetPassword(token, password);
      setMessage(resp.data?.message || 'Password aggiornata. Effettua il login.');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: '24px auto' }}>
      <h2>Imposta nuova password</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>🔒 Nuova password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>🔒 Conferma password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Salvataggio...' : 'Imposta password'}
        </button>
      </form>
    </div>
  );
}
