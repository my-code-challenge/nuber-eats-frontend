import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Category from "../pages/client/category";
import Restaurant from "../pages/client/restaurant";

const ClientRoutes = [
    <Route key={1} path="/" exact>
        <Restaurants />
    </Route>,
    <Route key={2} path="/confirm">
        <ConfirmEmail />
    </Route>,
    <Route key={3} path="/edit-profile">
        <EditProfile />
    </Route>,
    <Route key={4} path="/search">
        <Search />
    </Route>,
    <Route key={5} path="/category/:slug">
        <Category />
    </Route>,
    <Route key={6} path="/restaurant/:id">
        <Restaurant />
    </Route>,
];

export const LoggedInRouter = () => {
    const { data, loading, error } = useMe();

    return !data || loading || error ? (
        <div className="h-screen flex justify-center items-center">
            <span className="font-medium text-xl tracking-wide">Loading...</span>
        </div>
    ) : (
        <Router>
            <Header />
            <Switch>
                {console.log(data.me.role)}
                {data.me.role === UserRole.Client && ClientRoutes}
                {/* <Redirect from="/potato" to="/" />  /potato 경로로 접근시 / 경로로 리디렉션 */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};
