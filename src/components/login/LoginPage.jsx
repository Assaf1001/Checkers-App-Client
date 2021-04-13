import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SingupForm from "./SingupForm";

const LoginPage = (props) => {
    const [isLoginMode, setIsLoginMode] = useState(
        props.location.state?.signUp ? false : true
    );
    const errorMessage = props.location.state?.needToLogin
        ? "You must login!"
        : "";

    return (
        <div>
            <div className="dark-background"></div>
            <div className="page-container">
                <div className="loginPage-content">
                    {isLoginMode ? (
                        <LoginForm
                            setIsLoginMode={setIsLoginMode}
                            errorMessage={errorMessage}
                        />
                    ) : (
                        <SingupForm setIsLoginMode={setIsLoginMode} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
