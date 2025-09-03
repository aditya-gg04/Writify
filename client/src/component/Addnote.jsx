import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export const Addnote = ({ show, handleClose, edit, data }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.desc || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      const endpoint = edit
        ? `https://writify-lokj.onrender.com/api/notes/${data.id}`
        : `https://writify-lokj.onrender.com/api/notes/${sessionStorage.getItem("email")}`;

      const res = await fetch(endpoint, {
        method: edit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error('Failed to save note');

      setDescription("");
      setTitle("");
      window.location.reload();
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      size="lg"
    >
      <Modal.Header
        closeButton
        style={{
          borderBottom: '1px solid #e2e8f0',
          padding: '1.5rem'
        }}
      >
        <Modal.Title style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#2d3748'
        }}>
          {edit ? 'Edit Note' : 'Add New Note'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '1.5rem' }}>
        {error && (
          <div
            className="alert alert-danger mb-4"
            style={{ borderRadius: '8px' }}
          >
            {error}
          </div>
        )}

        <form id="addnotesmodalTitle">
          <div className="mb-4">
            <label
              className="form-label"
              style={{
                fontWeight: '500',
                color: '#4a5568',
                marginBottom: '0.5rem'
              }}
            >
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                transition: 'border-color 0.15s ease-in-out',
                width: '100%'
              }}
            />
          </div>

          <div className="mb-2">
            <label
              className="form-label"
              style={{
                fontWeight: '500',
                color: '#4a5568',
                marginBottom: '0.5rem'
              }}
            >
              Note Description
            </label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={6}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                transition: 'border-color 0.15s ease-in-out',
                resize: 'vertical',
                minHeight: '150px',
                width: '100%'
              }}
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer style={{
        borderTop: '1px solid #e2e8f0',
        padding: '1.25rem 1.5rem'
      }}>
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '8px',
            fontWeight: '500',
            background: '#4299e1',
            border: 'none'
          }}
        >
          {loading ? 'Saving...' : edit ? 'Update Note' : 'Add Note'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
