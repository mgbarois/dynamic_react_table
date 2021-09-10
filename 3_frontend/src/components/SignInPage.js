import React, { useState } from "react";
import { Card, Button } from 'react-bootstrap';

const SignInPage = ({ onLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Control inputs
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        // Validate email and password
        console.log("password", password);
        if (!/.+@.+\..+/.test(email)) {
            alert("Please enter a valid e-mail address.")
        }
        else if (password === "") {
            alert("Please enter your password.")
        }
        else {
            onLogin(true);
        }

    }

    return (
        <div className="signin-page">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Log in</Card.Title>
                    <Card.Text>
                        <div>
                            <div className>
                                <input
                                    onChange={onEmailChange}
                                    type="email"
                                    name="email-address"
                                    placeholder="E-mail"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <input
                                    onChange={onPasswordChange}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    id="password" />
                            </div>
                        </div>
                    </Card.Text>
                    <Button variant="primary" onClick={onSubmitSignIn}>Log in</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignInPage;