import React, { useEffect, useState } from "react";
import { Card } from "../component/Card";
import { Navbar } from "../component/Navbar";
import axios from "axios";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    setUserEmail(email);
    if (email) {
      fetchNotes(email);
    }
  }, []);

  const fetchNotes = async (email) => {
    try {
      const response = await axios.get(`https://writify-lokj.onrender.com/api/notes/${email}`);
      setNotes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setNotes([]);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{
          background: "#f7f8fa",
          minHeight: "100vh",
          padding: "32px 0",
          borderRadius: "18px",
          boxShadow: "0 2px 16px rgba(44,62,80,0.07)",
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            className="fw-bold"
            style={{
              color: "#2d3748",
              fontSize: "2.5rem",
              marginBottom: "8px",
              letterSpacing: "1px",
            }}
          >
            Writify
          </h1>
          <h4 className="text-muted" style={{ marginBottom: "4px" }}>
            Your Notes
          </h4>
          <p className="text-secondary" style={{ fontSize: "1.1rem", marginBottom: 0 }}>
            All your thoughts, ideas, and reminders in one place.
          </p>
        </div>
        <div style={{ minHeight: "300px", padding: "0 40px" }}>
          {userEmail ? (
            notes.length > 0 ? (
              <div style={{
                margin: "0 auto",
                maxWidth: "1200px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Show 2 cards per row
                gap: "32px",
                justifyContent: "center"
              }}>
                {notes.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      width: "100%",
                      minWidth: "500px", // Fixed minimum width
                      maxWidth: "600px", // Fixed maximum width
                      margin: "0 auto"  // Center cards
                    }}
                  >
                    <Card
                      id={note.id}
                      title={note.title}
                      date={note.date}
                      desc={note.description}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="alert alert-info mt-4"
                style={{
                  textAlign: "center",
                  fontSize: "1.1rem",
                  margin: "40px auto",
                  maxWidth: "400px",
                  borderRadius: "10px",
                }}
              >
                No notes found. Start by adding your first note!
              </div>
            )
          ) : (
            <div
              className="alert alert-warning mt-4"
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
                margin: "40px auto",
                maxWidth: "400px",
                borderRadius: "10px",
              }}
            >
              Please log in to view your notes.
            </div>
          )}
        </div>
        <footer
          className="mt-5 text-center text-muted"
          style={{
            fontSize: "0.95rem",
            paddingTop: "24px",
            borderTop: "1px solid #e2e8f0",
            marginTop: "48px",
            letterSpacing: "0.5px",
          }}
        >
          &copy; {new Date().getFullYear()} Writify &mdash; Your professional notes app.
        </footer>
      </div>
    </>
  );
};
