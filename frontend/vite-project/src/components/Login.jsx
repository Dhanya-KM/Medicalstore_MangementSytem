import { useState } from "react";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) throw new Error(data.message || "Login failed");

            onLogin(data.token);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}
