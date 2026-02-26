import { useState } from 'react';
import { authAPI } from '../services/api';

export default function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">🔐 Accedi</h2>
      {error && (
        <div className="alert alert-error" role="alert">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">📧 Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tuo@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">🔒 Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <button type="button" className="link" onClick={() => setShowForgot(true)}>
            Password dimenticata?
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {loading ? '⏳ Accesso in corso...' : '🚀 Accedi'}
        </button>
      </form>

      {showForgot && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ width: 420, background: 'white', borderRadius: 8, padding: 20 }}>
            <h3>Recupera password</h3>
            {forgotMessage && <div className="alert">{forgotMessage}</div>}
            <input
              placeholder="Inserisci email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setShowForgot(false)}>
                Annulla
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  setForgotLoading(true);
                  setForgotMessage(null);
                  try {
                    const resp = await authAPI.forgotPassword(forgotEmail);
                    setForgotMessage(resp.data?.message || 'Se l\'account esiste, riceverai una email.');
                  } catch (err) {
                    setForgotMessage(err.response?.data?.message || err.message);
                  } finally {
                    setForgotLoading(false);
                  }
                }}
                disabled={forgotLoading}
              >
                {forgotLoading ? 'Invio...' : 'Invia email di reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
