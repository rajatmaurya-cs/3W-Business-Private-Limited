import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import "../Login.css"


import Api from '../Api';

const Logingpage = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState('');

    const [password, setpassword] = useState('');

    const [loading, setloading] = useState(false);


  const handlesubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
        const res = await Api.post("/auth/login", {
            email,
            password
        });

        navigate('/Home')

    } catch (error) {
      
        alert("User Not Found 🙆");
        
    } finally {
        setloading(false);
    }
};

        return (
                <div className="login-container">
                    <div className="login-card">
                        <h2>Login</h2>
                        <div className="subtitle">Welcome back — please enter your details</div>

                        <Form onSubmit={(e) => handlesubmit(e)}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"

                        onChange={(e) => setemail(e.target.value)}

                        required


                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"

                        required

                        onChange={(e) => setpassword(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit"



                >
                    Submit
                </Button>
                        </Form>

                        <div className="create-account" onClick={() => navigate('/signIn')}>
                            <span>createAccount</span>
                        </div>

                    </div>
                </div>
    )
}

export default Logingpage
