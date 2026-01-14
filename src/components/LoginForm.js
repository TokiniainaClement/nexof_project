import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MockAuthService } from '../services/mockData';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess, onFaceVerificationRequired, isAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Un utilisateur est bel et bien connecté.");
            alert("Vous êtes déjà connecté !");
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Use mock authentication service
            const data = await MockAuthService.login(email, password);

            // Si le scan facial est requis
            if (data.requireFaceScan && data.userId) {
                console.log("Vérification faciale requise.");
                // Appeler la fonction parent pour gérer la vérification faciale
                onFaceVerificationRequired(data.userId);
            } else if (data.token) {
                // Si la connexion réussit directement
                localStorage.setItem('token', data.token);
                onLoginSuccess();
                console.log('Connexion réussie !');
            } else {
                throw new Error('Réponse serveur invalide.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="header-section">
                <h1 className="app-name">NEXOF</h1>
                <p className="app-slogan">Le réseau social du futur</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Se connecter</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="votre.email@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                {error && <p className="error-message">{error}</p>}
                
                <p className="create-account-option">
                    Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;