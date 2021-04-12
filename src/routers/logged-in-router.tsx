import { useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { UserRole } from "../__generated__/globalTypes";
import { Restaurants } from "../pages/client/restaurants";
import { NotFound } from "../pages/404";

/** hooks */
import { useMe } from "../hooks/useMe";

/** components */
import { Header } from "../components/Header";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import Search from "../pages/client/search";

const ClientRoutes = [
    <Route key={1} path="/" exact>
        <Restaurants />
    </Route>,
    <Route key={2} path="/confirm" exact>
        <ConfirmEmail />
    </Route>,
    <Route key={3} path="/edit-profile" exact>
        <EditProfile />
    </Route>,
    <Route key={4} path="/search" exact>
        <Search />
    </Route>,
];

export const LoggedInRouter = () => {
    const { data, loading, error } = useMe();
    const handleClick = useCallback(() => {
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        authTokenVar(null);
        isLoggedInVar(false);
    }, []);
    return !data || loading || error ? (
        <div className="h-screen flex justify-center items-center">
            <span className="font-medium text-xl tracking-wide">Loading...</span>
        </div>
    ) : (
        <Router>
            <Header />
            <Switch>
                {data.me.role === UserRole.Client && ClientRoutes}
                {/* <Redirect from="/potato" to="/" />  /potato 경로로 접근시 / 경로로 리디렉션 */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};
