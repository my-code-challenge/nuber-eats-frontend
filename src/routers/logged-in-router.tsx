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
import MyRestaurants from "../pages/owner/my-restaurants";

const clientRoutes = [
    {
        path: "/",
        component: <Restaurants />,
    },
    {
        path: "/search",
        component: <Search />,
    },
    {
        path: "/category/:slug",
        component: <Category />,
    },
    {
        path: "/restaurant/:id",
        component: <Restaurant />,
    },
];

const ownerRoutes = [
    {
        path: "/",
        component: <MyRestaurants />,
    },
];

const commonRoutes = [
    {
        path: "/confirm",
        component: <ConfirmEmail />,
    },
    {
        path: "/edit-profile",
        component: <EditProfile />,
    },
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
                {data.me.role === UserRole.Client &&
                    clientRoutes.map((route, index) => (
                        <Route key={index} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                {data.me.role === UserRole.Owner &&
                    ownerRoutes.map((route, index) => (
                        <Route key={index} path={route.path}>
                            {route.component}
                        </Route>
                    ))}

                {commonRoutes.map((route, index) => (
                    <Route key={index} path={route.path}>
                        {route.component}
                    </Route>
                ))}
                {/* <Redirect from="/potato" to="/" />  /potato 경로로 접근시 / 경로로 리디렉션 */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};
