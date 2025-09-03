import React, { useState } from 'react';
import { Addnote } from "./Addnote";
import { Singup } from './Singup';

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const data = { id: "", title: "", desc: "" };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleLogout = () => {
    sessionStorage.removeItem('email');
    window.location.reload();
  };

  const navStyles = {
    container: {
      background: "#ffffff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: "0.75rem 1.5rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    link: {
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      transition: "all 0.2s ease",
      color: "#4a5568",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.95rem",
    },
    activeLink: {
      background: "#3b82f6",
      color: "#ffffff",
    },
    button: {
      background: "#3b82f6",
      color: "#ffffff",
      border: "none",
      padding: "0.5rem 1.25rem",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.2s ease",
      fontWeight: "500",
    }
  };

  return (
    <nav style={navStyles.container}>
      <div style={navStyles.nav}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            margin: 0,
            color: "#2d3748"
          }}>
            Writify
          </h1>

          <a href="/" style={{ ...navStyles.link, ...navStyles.activeLink }}>
            <i className="fas fa-layer-group" />
            <span>All Notes</span>
          </a>

          <a href="/" style={navStyles.link}>
            <i className="fas fa-briefcase" />
            <span>Business</span>
          </a>

          <a href="/" style={navStyles.link}>
            <i className="fas fa-share-alt" />
            <span>Social</span>
          </a>

          <a href="/" style={navStyles.link}>
            <i className="fas fa-tag" />
            <span>Important</span>
          </a>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {sessionStorage.getItem("email") ? (
            <>
              <button
                onClick={handleShow}
                style={navStyles.button}
                onMouseEnter={e => e.target.style.background = "#2563eb"}
                onMouseLeave={e => e.target.style.background = "#3b82f6"}
              >
                <i className="fas fa-plus" />
                <span>Add Note</span>
              </button>

              <button
                onClick={handleLogout}
                style={{
                  ...navStyles.button,
                  background: "#dc2626"
                }}
                onMouseEnter={e => e.target.style.background = "#b91c1c"}
                onMouseLeave={e => e.target.style.background = "#dc2626"}
              >
                <i className="fas fa-sign-out-alt" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleShow2}
              style={navStyles.button}
              onMouseEnter={e => e.target.style.background = "#2563eb"}
              onMouseLeave={e => e.target.style.background = "#3b82f6"}
            >
              <i className="fas fa-sign-in-alt" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {show && <Addnote handleClose={handleClose} show={show} data={data} edit={false} />}
      {show2 && <Singup handleClose2={handleClose2} show2={show2} />}
    </nav>
  );
};
