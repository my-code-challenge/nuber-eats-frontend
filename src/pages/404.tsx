import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
            <h4 className="font-medium text-base mb-5">
                The page you're looking for does not exist or has moved.
            </h4>
            <Link className="hover:underline text-lime-600" to="/">
                Go Back home &rarr;
            </Link>
        </div>
    );
};
