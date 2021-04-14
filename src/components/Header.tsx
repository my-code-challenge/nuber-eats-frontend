import { useCallback } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/eats-logo.svg";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";

export const Header: React.FC = () => {
    const { data } = useMe();
    const client = useApolloClient();

    const handleClick = useCallback(async () => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        authTokenVar(null);
        isLoggedInVar(false);
        await client.clearStore();
    }, []);
    return (
        <>
            {!data?.me.verified && (
                <div className="bg-red-500 p-3 text-center text-lg text-white font-semibold">
                    <span>Please verify your email.</span>
                </div>
            )}
            <header className="py-4">
                <div className="container w-full px-5 xl:px-0 flex justify-between items-center">
                    <Link to="/">
                        <img src={nuberLogo} alt="nuberLogo" className="w-24" />
                    </Link>
                    <div className="flex items-center">
                        <Link to="/edit-profile" className="mr-4">
                            <span className="text-xs">
                                <FontAwesomeIcon icon={faUser} className="text-xl" />
                            </span>
                        </Link>
                        <button type="button" className="hover:underline" onClick={handleClick}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};
