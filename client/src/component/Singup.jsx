import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

export const Singup = ({ show2, handleClose2 }) => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPass: ""
  });

  const { name, email, password, cPass } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (login) {
        const res = await fetch("http://localhost:9090/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.status === 401) {
          toast.error("Invalid credentials");
          return;
        }

        sessionStorage.setItem('email', data.email);
        toast.success("Login successful!");
        handleClose2();
        window.location.reload();
      } else {
        if (password !== cPass) {
          toast.error("Passwords don't match");
          return;
        }

        const res = await fetch("http://localhost:9090/api/user/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (res.status === 400) {
          toast.error("Registration failed");
          return;
        }

        sessionStorage.setItem('email', email);
        toast.success("Registration successful!");
        handleClose2();
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    width: "100%",
    marginBottom: "1rem",
    fontSize: "1rem",
    transition: "border-color 0.2s ease",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#ffffff",
    fontWeight: "500",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };

  return (
    <Modal
      show={show2}
      onHide={handleClose2}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          border: "none",
          padding: "1.5rem 1.5rem 0"
        }}
      />
      <Modal.Body style={{ padding: "1.5rem" }}>
        <div className="auth-container">
          <h3 style={{
            fontSize: "1.75rem",
            fontWeight: "600",
            color: "#2d3748",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            {login ? "Welcome Back!" : "Create Account"}
          </h3>

          <form onSubmit={handleSubmit}>
            {!login && (
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Full Name"
                style={inputStyle}
                required
                minLength={2}
              />
            )}

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
              style={inputStyle}
              required
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              style={inputStyle}
              required
              minLength={6}
            />

            {!login && (
              <input
                type="password"
                name="cPass"
                value={cPass}
                onChange={handleChange}
                placeholder="Confirm Password"
                style={inputStyle}
                required
                minLength={6}
              />
            )}

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
              onMouseEnter={e => e.target.style.background = "#2563eb"}
              onMouseLeave={e => e.target.style.background = "#3b82f6"}
            >
              {loading ? "Please wait..." : login ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#4a5568",
            fontSize: "0.95rem"
          }}>
            {login ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setLogin(!login)}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
                textDecoration: "underline"
              }}
            >
              {login ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
