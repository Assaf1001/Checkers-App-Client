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
        <div className="main__container">
            <div className="login-form__container">
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
    );
};

export default LoginPage;
