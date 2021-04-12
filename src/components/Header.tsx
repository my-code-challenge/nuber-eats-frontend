import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/eats-logo.svg";

export const Header: React.FC = () => {
    const { data } = useMe();
    return (
        <>
            {!data?.me.verified && (
                <div className="bg-red-500 p-3 text-center text-lg text-white font-semibold">
                    <span>Please verify your email.</span>
                </div>
            )}
            <header className="py-4">
                <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
                    <img src={nuberLogo} alt="nuberLogo" className="w-24" />
                    <Link to="/edit-profile">
                        <span className="text-xs">
                            <FontAwesomeIcon icon={faUser} className="text-xl" />
                        </span>
                    </Link>
                </div>
            </header>
        </>
    );
};