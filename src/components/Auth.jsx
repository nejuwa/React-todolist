import React, { useState, useEffect } from "react";
  // local reset password functionality added
function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false); 
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); 
  const [message, setMessage] = useState("");
  const [setUsernameAfterLogin, setSetUsernameAfterLogin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) onLogin(loggedUser);
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isRegister) {
      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        setMessage("⚠️ This email is already registered!");
        return;
      }
      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("✅ Registration successful! You can now log in.");
      setIsRegister(false);
      setEmail("");
      setUsername("");
      setPassword("");
    } else if (isForgot) {
      // --- Reset Password ---
      const userIndex = users.findIndex((u) => u.email === email);
      if (userIndex === -1) {
        setMessage("❌ Email not found!");
        return;
      }
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("✅ Password reset successful! You can now login.");
      setIsForgot(false);
      setEmail("");
      setNewPassword("");
    } else {
      // --- Login ---
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        if (!user.username) {
          setSetUsernameAfterLogin(true);
          setCurrentUserEmail(user.email);
          setMessage("👋 Please set your username before continuing.");
        } else {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          onLogin(user);
        }
      } else {
        setMessage("❌ Invalid email or password!");
      }
    }
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === currentUserEmail);
    if (userIndex !== -1) {
      users[userIndex].username = username;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
      onLogin(users[userIndex]);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-box p-4 shadow-sm bg-white rounded">
        {!setUsernameAfterLogin ? (
          <>
            <h2 className="text-center mb-3 text-primary">
              {isRegister ? "Register" : isForgot ? "Reset Password" : "Login"}
            </h2>

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {isForgot ? (
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              <button type="submit" className="btn btn-primary w-100">
                {isRegister ? "Register" : isForgot ? "Reset" : "Login"}
              </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}

            <div className="text-center mt-3">
              {!isForgot && (
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setIsForgot(true);
                    setMessage("");
                  }}
                >
                  Forgot Password?
                </button>
              )}

              <button
                className="btn btn-link"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setIsForgot(false);
                  setMessage("");
                }}
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "No account? Register"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center mb-3 text-primary">Set Your Username</h2>
            <form onSubmit={handleSetUsername}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-success w-100">
                Save Username
              </button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;



