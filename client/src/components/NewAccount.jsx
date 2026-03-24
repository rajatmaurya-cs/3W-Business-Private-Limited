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
  const [loading, setloading] = useState(false);

  // 🔥 states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    zip: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  // 🔥 handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔥 VALIDATION FUNCTION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "Zip is required";

    if (!formData.terms) newErrors.terms = "You must accept terms";

    return newErrors;
  };

  // 🔥 HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setValidated(true);

    // ❌ STOP if errors exist
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setloading(true);

      const res = await Api.post("/auth/signin", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        city: formData.city.trim(),
        state: formData.state.trim(),
        zip: formData.zip.trim(),
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

        {/* NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Enter name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* EMAIL + PASSWORD */}
        <Row className="mb-3">

          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

        </Row>

        {/* ADDRESS */}
        <Row className="mb-3">

          <Form.Group as={Col} md="6">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
              placeholder="City"
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              value={formData.state}
              onChange={handleChange}
              isInvalid={!!errors.state}
              placeholder="State"
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              isInvalid={!!errors.zip}
              placeholder="Zip"
            />
            <Form.Control.Feedback type="invalid">
              {errors.zip}
            </Form.Control.Feedback>
          </Form.Group>

        </Row>

        {/* TERMS */}
        <Form.Group className="mb-3">
          <Form.Check
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            isInvalid={!!errors.terms}
            label="Agree to terms and conditions"
          />
          <Form.Control.Feedback type="invalid">
            {errors.terms}
          </Form.Control.Feedback>
        </Form.Group>

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            background: "#667eea",
            border: "none",
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

      </Form>
    </div>
  );
}

export default NewAccount;