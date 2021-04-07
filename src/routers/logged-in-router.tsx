import { useCallback } from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
    const handleClick = useCallback(() => {
        isLoggedInVar(false);
    }, []);
    return (
        <div>
            <h1>Logged In</h1>
            <button onClick={handleClick}>Click to Logout</button>
        </div>
    );
};
