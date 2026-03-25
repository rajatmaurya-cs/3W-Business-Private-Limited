import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Api from '../Api';

const Logingpage = () => {

    const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa"
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },

  title: {
    textAlign: "center",
    marginBottom: "10px"
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px"
  },

  button: {
    width: "100%",
    background: "#007bff",
    border: "none",
    padding: "10px",
    color: "#fff",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  },

  createAccount: {
    marginTop: "15px",
    textAlign: "center",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "500"
  },

  /* 🔥 FULL SCREEN OVERLAY */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  /* 🔥 BIG SPINNER */
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #fff",
    borderTop: "5px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },

  /* 🔥 BUTTON SPINNER */
  smallSpinner: {
    width: "16px",
    height: "16px",
    border: "3px solid #fff",
    borderTop: "3px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    setloading(true);

    try {
      const res = await Api.post("/auth/login", {
        email,
        password
      });

      if (res.data.success) {
        navigate('/Home');
      }

    } catch (error) {
      alert(error.response?.data?.message || "User Not Found 🙆");
    } finally {
      setloading(false);
    }
  };

  return (
    <div style={styles.container}>

    
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>
          Welcome back — please enter your details
        </p>

        <Form onSubmit={handlesubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              disabled={loading}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <>
                <span style={styles.smallSpinner}></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div
          style={styles.createAccount}
          onClick={() => !loading && navigate('/signIn')}
        >
          Create Account
        </div>
      </div>
    </div>
  );
};

export default Logingpage;