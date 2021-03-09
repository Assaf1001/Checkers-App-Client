export const loginInitialState = { user: null, token: null };

const loginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.user, token: action.token };
        case "LOGOUT":
            return { user: null, token: null };
        default:
            return state;
    }
};

export default loginReducer;
