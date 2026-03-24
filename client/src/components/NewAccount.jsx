import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Api from '../Api';
import { useNavigate } from "react-router-dom";

function NewAccount() {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const res = await Api.post("/auth/signin", {
        email,
        password,
        name,
      });

      if (res.data.success) {
        alert("Account created successfully 🚀");
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "20px",
      }}
    >

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >

        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account 🚀
        </h3>

        {/* Name */}
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Name</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              required
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>
        </Row>

        {/* Email + Password */}
        <Row className="mb-3">

          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Password</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              minLength={6}
            />
          </Form.Group>

        </Row>

        {/* Address */}
        <Row className="mb-3">

          <Form.Group as={Col} md="6">
            <Form.Label>City</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              type="text"
              placeholder="City"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>State</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              type="text"
              placeholder="State"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              style={{ padding: "10px", borderRadius: "6px" }}
              type="text"
              placeholder="Zip"
              required
            />
          </Form.Group>

        </Row>

        {/* Terms */}
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
          />
        </Form.Group>

        {/* Button */}
        <Button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            background: "#667eea",
            border: "none",
            fontWeight: "500",
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

      </Form>
    </div>
  );
}

export default NewAccount;