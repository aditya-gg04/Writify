import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Addnote } from "./Addnote";

export const Card = ({ id, title, desc, date }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title2, setTitle2] = useState(title);
  const [description, setDescription] = useState(desc);
  const data = { id, title, desc };

  const handleDelete = async () => {
    const res = await fetch(`https://writify-lokj.onrender.com/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();
  };

  const handleCardClick = (e) => {
    // Prevent expanding when clicking buttons
    if (!e.target.closest('.card-actions')) {
      setIsExpanded(!isExpanded);
    }
  };

  // Add new styles for overlay
  const overlayStyle = isExpanded ? {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    height: "75vh",
    background: "#ffffff",
    zIndex: 1000,
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    padding: "32px",
    overflow: "auto"
  } : {};

  // Add backdrop style
  const backdropStyle = isExpanded ? {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999
  } : {};

  // Handle escape key to close expanded card
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  return (
    <>
      <div className="col-md-6 single-note-item all-category" style={{ padding: "20px" }}>
        <div
          className="card card-body"
          onClick={handleCardClick}
          style={{
            borderRadius: "20px",
            boxShadow: isExpanded
              ? "0 12px 28px rgba(0,0,0,0.12)"
              : "0 4px 16px rgba(0,0,0,0.08)",
            border: "none",
            background: "#ffffff",
            minHeight: isExpanded ? "400px" : "280px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            cursor: "pointer",
            transform: "scale(1)", // Remove scale transform from here
            zIndex: isExpanded ? 1 : 0,
            padding: "24px",
            height: "300px"
          }}
        >
          <span
            className="side-stick"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: "60%",
              width: "8px",
              background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
              borderRadius: "4px",
              opacity: "0.8"
            }}
          />
          <div style={{ padding: "0 16px" }}>
            <h5
              className="note-title mb-3"
              style={{
                fontWeight: 700,
                color: "#1a202c",
                fontSize: "1.25rem",
                letterSpacing: "-0.025em"
              }}
            >
              {title}
            </h5>
            <p
              className="note-date text-muted mb-4"
              style={{
                fontSize: "0.875rem",
                color: "#64748b"
              }}
            >
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p
              className="note-inner-content"
              style={{
                fontSize: "1rem",
                color: "#4a5568",
                lineHeight: "1.6",
                marginBottom: 0,
                maxHeight: isExpanded ? "none" : "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "all 0.3s ease"
              }}
            >
              {desc}
            </p>
          </div>
          <div
            className="card-actions"
            style={{
              marginTop: "24px",
              padding: "16px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "20px",
              background: "#f8fafc",
              borderRadius: "0 0 20px 20px"
            }}
          >
            <button
              className="action-btn"
              title="Favorite"
              style={{
                border: "none",
                background: "none",
                padding: "8px",
                cursor: "pointer",
                color: "#eab308",
                transition: "all 0.2s ease",
                borderRadius: "8px"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              <i className="fa fa-star fa-lg" />
            </button>
            <button
              className="action-btn"
              title="Delete"
              onClick={handleDelete}
              style={{
                border: "none",
                background: "none",
                padding: "8px",
                cursor: "pointer",
                color: "#dc2626",
                transition: "all 0.2s ease",
                borderRadius: "8px"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              <i className="fa fa-trash fa-lg" />
            </button>
            <button
              className="action-btn"
              title="Edit"
              onClick={handleShow}
              style={{
                border: "none",
                background: "none",
                padding: "8px",
                cursor: "pointer",
                color: "#3b82f6",
                transition: "all 0.2s ease",
                borderRadius: "8px"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              <i className="fa-solid fa-pen-to-square fa-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Add overlay and backdrop when expanded */}
      {isExpanded && (
        <>
          <div style={backdropStyle} onClick={() => setIsExpanded(false)} />
          <div style={overlayStyle}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#4a5568",
                  padding: "8px"
                }}
              >
                ×
              </button>
              <h3 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "16px"
              }}>
                {title}
              </h3>
              <p style={{
                color: "#64748b",
                marginBottom: "24px"
              }}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#4a5568"
              }}>
                {desc}
              </div>
              <div className="card-actions" style={{
                marginTop: "32px",
                padding: "16px 0",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px"
              }}>
                <button
                  className="action-btn"
                  title="Favorite"
                  style={{
                    border: "none",
                    background: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#eab308",
                    transition: "all 0.2s ease",
                    borderRadius: "8px"
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                  <i className="fa fa-star fa-lg" />
                </button>
                <button
                  className="action-btn"
                  title="Delete"
                  onClick={handleDelete}
                  style={{
                    border: "none",
                    background: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#dc2626",
                    transition: "all 0.2s ease",
                    borderRadius: "8px"
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                  <i className="fa fa-trash fa-lg" />
                </button>
                <button
                  className="action-btn"
                  title="Edit"
                  onClick={handleShow}
                  style={{
                    border: "none",
                    background: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#3b82f6",
                    transition: "all 0.2s ease",
                    borderRadius: "8px"
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.15)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                  <i className="fa-solid fa-pen-to-square fa-lg" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {show && <Addnote handleClose={handleClose} show={show} data={data} edit={true} />}
    </>
  );
};
