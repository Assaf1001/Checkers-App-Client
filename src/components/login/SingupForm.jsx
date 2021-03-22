import React, { useContext, useState } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { loginAction } from "../../actions/loginActions";
import { saveUserOnCookie } from "../../cookies/cookies";
import { singUp } from "../../server/user";

const SingupForm = (props) => {
    const { dispatchUserData } = useContext(LoginContext);
    const history = useHistory();

    const [inputClasses, setInputClasses] = useState(["", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", ""]);
    const [validInputs, setValidInputs] = useState([
        false,
        false,
        false,
        false,
    ]);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    const isFormInvalid = () => validInputs.includes(false);

    const validateInput = (
        value,
        inputindex,
        setValue,
        missingValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            setStateOfInputs("", "", true);
            setValue(value);
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };

    const onSubmitIsValidInputs = () => {
        const isPasswordValidFunc = () => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return passwordRegex.test(password);
        };
        const isPasswordRepeatedValidFunc = () => password === passwordRepeated;

        const isEmailValid = validator.isEmail(email);
        const isPasswordValid = isPasswordValidFunc();
        const isPasswordRepeatedValid = isPasswordRepeatedValidFunc();

        setInputClasses([
            "",
            isEmailValid ? "" : "input-invalid",
            isPasswordValid ? "" : "input-invalid",
            isPasswordRepeatedValid ? "" : "input-invalid",
        ]);
        setInvalidMessages([
            "",
            isEmailValid ? "" : "Email invalid",
            isPasswordValid
                ? ""
                : "Password must contain capital character, regular character, a number and must have at least 8 characters",
            isPasswordRepeatedValid
                ? ""
                : "The two passwords must be identical",
        ]);
        setValidInputs([
            true,
            isEmailValid,
            isPasswordValid,
            isPasswordRepeatedValid,
        ]);

        return isEmailValid && isPasswordValid && isPasswordRepeatedValid;
    };

    const onInputUserName = (event) => {
        const newUserName = event.target.value.trim();
        validateInput(
            newUserName,
            0,
            setUserName,
            "Please enter your user name"
        );
    };

    const onInputEmail = (event) => {
        const newEmail = event.target.value.trim();
        validateInput(newEmail, 1, setEmail, "Please enter your email");
    };

    const onInputPassword = (event) => {
        const newPassword = event.target.value;
        validateInput(newPassword, 2, setPassword, "Please enter a password");
    };

    const onInputPasswordRepeated = (event) => {
        const newPasswordRepeated = event.target.value;
        validateInput(
            newPasswordRepeated,
            3,
            setPasswordRepeated,
            "Please repeat your password"
        );
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        if (onSubmitIsValidInputs()) {
            singUp({ userName, email, password })
                .then((userData) => {
                    dispatchUserData(
                        loginAction(userData.user, userData.token)
                    );
                    saveUserOnCookie(userData);
                    history.push("/lobby");
                })
                .catch((err) => {
                    if (err.message.includes("User name")) {
                        setInputClasses(["input-invalid", "", "", ""]);
                        setInvalidMessages([err.message, "", "", ""]);
                        setValidInputs([false, true, true, true]);
                    } else if (err.message.includes("Email")) {
                        setInputClasses(["", "input-invalid", "", ""]);
                        setInvalidMessages(["", err.message, "", ""]);
                        setValidInputs([true, false, true, true]);
                    } else console.log(err);
                });
        }
    };

    return (
        <div className="login-form">
            <h3>SIGN UP</h3>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="userName">Pick a user name</label>
                <input
                    id="userName"
                    placeholder="User name"
                    className={inputClasses[0]}
                    onChange={onInputUserName}
                />
                {invalidMessages[0] !== "" && (
                    <div className="invalid-message">{invalidMessages[0]}</div>
                )}
                <label htmlFor="email">Enter your email</label>
                <input
                    id="email"
                    placeholder="Email"
                    className={inputClasses[1]}
                    onChange={onInputEmail}
                />
                {invalidMessages[1] !== "" && (
                    <div className="invalid-message">{invalidMessages[1]}</div>
                )}
                <label htmlFor="password">Create a password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className={inputClasses[2]}
                    onChange={onInputPassword}
                />
                {invalidMessages[2] !== "" && (
                    <div className="invalid-message">{invalidMessages[2]}</div>
                )}
                <label htmlFor="repeat-password">Repeat your password</label>
                <input
                    id="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    className={inputClasses[3]}
                    onChange={onInputPasswordRepeated}
                />
                {invalidMessages[3] !== "" && (
                    <div className="invalid-message">{invalidMessages[3]}</div>
                )}

                <button type="submit" disabled={isFormInvalid()}>
                    SIGN UP
                </button>
            </form>
            <div
                className="login-signup"
                onClick={() => props.setIsLoginMode(true)}
            >
                Already a member? <span>LOG IN</span>
            </div>
        </div>
    );
};

export default SingupForm;
