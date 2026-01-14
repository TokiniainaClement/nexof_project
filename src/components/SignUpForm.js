import React, { useState } from 'react';
import { MockAuthService } from '../services/mockData';
import './SignUpForm.css';

const SignUpForm = ({ onSignupSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Use mock authentication service
            const data = await MockAuthService.signup(email, password);
            if (onSignupSuccess) {
                onSignupSuccess(data.userId);
            }
            console.log('Compte créé, scan facial requis.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="signup-container">
            <div className="header-section">
                <h1 className="app-name">NEXOF</h1>
                <p className="app-slogan">Le réseau social du futur</p>
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Créer un compte</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="votre.email@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="6 caractères minimum" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Inscription...' : 'Créer mon compte'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignUpForm;