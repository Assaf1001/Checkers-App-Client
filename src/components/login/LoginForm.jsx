import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { logInAction } from "../../actions/loginActions";
import { saveUserOnCookie } from "../../cookies/cookies";
import { logIn } from "../../server/auth";

const LoginForm = (props) => {
    const history = useHistory();
    const { dispatchUserData } = useContext(LoginContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            if (props.errorMessage !== "") {
                setErrorMessage(props.errorMessage);
            }
        }

        return () => (isComponentExist = false);
    }, [props.errorMessage]);

    const isFormValid = () => email.length === 0 || password.length === 0;

    const onInputEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail.length > 0) {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        } else {
            setEmail("");
            setIsEmailInputValid(false);
        }
    };

    const onInputPasswordInput = (event) => {
        const thePassword = event.target.value;
        if (thePassword.length > 0) {
            setPassword(thePassword);
            setIsPasswordInputValid(true);
        } else {
            setPassword("");
            setIsPasswordInputValid(false);
        }
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        logIn({ email, password })
            .then((userData) => {
                dispatchUserData(logInAction(userData));
                saveUserOnCookie(userData);
                history.push("/myAccount");
            })
            .catch((err) => {
                if (err.message === "Email or Password are invalid!") {
                    setErrorMessage(err.message);
                }
            });
    };

    return (
        <div className="login-form">
            <h3>LOG IN</h3>
            {errorMessage !== "" && (
                <div className="error-message">{errorMessage}</div>
            )}
            <form onSubmit={onSubmitForm}>
                <label htmlFor="email">Enter your email</label>
                <input
                    className={isEmailInputValid ? "" : "input-invalid"}
                    placeholder="Email"
                    id="email"
                    onInput={onInputEmailInput}
                />
                {!isEmailInputValid && (
                    <div className="invalid-message">
                        You must enter your email!
                    </div>
                )}
                <label htmlFor="password">Enter your password</label>
                <input
                    className={isPasswordInputValid ? "" : "input-invalid"}
                    placeholder="Password"
                    id="password"
                    type="password"
                    onInput={onInputPasswordInput}
                />
                {!isPasswordInputValid && (
                    <div className="invalid-message">
                        You must enter your password!
                    </div>
                )}
                <button type="submit" disabled={isFormValid()}>
                    LOG IN
                </button>
                <div className="login-signup">
                    Not a member yet?{" "}
                    <span onClick={() => props.setIsLoginMode(false)}>
                        SIGN UP
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
