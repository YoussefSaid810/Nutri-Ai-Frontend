import React, { Fragment, StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/Store";
import MainLayout from "views/layouts/Main/MainLayout";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Outlet,
} from "react-router-dom";
import Home from "views/pages/Home/Home";
import Foods from "views/pages/Foods/Foods";
import AuthLayout from "views/layouts/AuthLayout/AuthLayout";
import { AuthService } from "services/Auth/auth";
import Calculator from "views/pages/Calculator/Calculator";
import AuthView from "views/pages/AuthView/AuthView";
import EmailVerification from "views/pages/EmailVerification/EmailVerification";
import Offline from "views/pages/Offline/Offline";
import ProfileLayout from "views/layouts/ProfileLayout/ProfileLayout";
import Profile from "views/pages/UserProfile/Profile/Profile";
import ProfilePreferences from "views/pages/UserProfile/ProfilePreferences/ProfilePreferences";
import AuthRedirect from "views/pages/UserProfile/authRedirect/authRedirect";
import ProfileSettings from "views/pages/UserProfile/ProfileSettings/ProfileSettings";
import DietHistory from "views/pages/UserProfile/DietHistory/DietHistory";
import ChatApp from "views/pages/UserProfile/ChatApp/ChatApp";
import Suggestions from "views/pages/UserProfile/Suggestions/Suggestions";
import MealView from "views/pages/MealView/MealView";
import UpdateInformation from "views/pages/UserProfile/UpdateInformation/ProfileSettings/UpdateInformation";
import { UpdateInformationService } from "services/User/UpdateInformationService";
import UpdatePassword from "views/pages/UserProfile/UpdateInformation/UpdatePassword/UpdatePassword";
import { UpdatePasswordService } from "services/User/UpdatePasswordService";
import UpdateAccount from "views/pages/UserProfile/UpdateInformation/UpdateAccount/UpdateAccount";
import DashboardLayout from "views/layouts/Dashboard/DashboardLayout";
import DashboardHome from "views/pages/Dashboard/Home/DashboardHome";
import ListMeals from "views/pages/Dashboard/ListMeals/ListMeals";
import NotFound from "views/pages/NotFound/NotFound";
import RankMyMeals from "views/pages/UserProfile/RankMyMeals/RankMyMeals";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Fragment>
            <Route path="/" caseSensitive={false} element={<MainLayout />}>
                <Route path="" caseSensitive={false} element={<Home />}></Route>
                <Route path="meals" caseSensitive={false} element={<Outlet />}>
                    <Route
                        path=""
                        caseSensitive={false}
                        element={<Foods />}></Route>
                    <Route
                        path=":id"
                        caseSensitive={false}
                        element={<MealView />}></Route>
                </Route>
                <Route
                    path="calculator"
                    caseSensitive={false}
                    element={<Calculator />}></Route>
                <Route
                    path="profile"
                    caseSensitive={false}
                    element={<ProfileLayout />}>
                    <Route
                        path=""
                        caseSensitive={false}
                        element={<AuthRedirect />}></Route>
                    <Route
                        path="account"
                        caseSensitive={false}
                        element={<Profile />}></Route>
                    <Route
                        path="preferences"
                        caseSensitive={false}
                        element={<ProfilePreferences />}></Route>
                    <Route
                        path="history"
                        caseSensitive={false}
                        element={<DietHistory />}></Route>
                    <Route
                        path="settings"
                        caseSensitive={false}
                        element={<ProfileSettings />}></Route>
                    <Route
                        path="settings/information"
                        caseSensitive={false}
                        action={UpdateInformationService}
                        element={<UpdateInformation />}></Route>
                    <Route
                        path="settings/accountInformation"
                        caseSensitive={false}
                        element={<UpdateAccount />}></Route>
                    <Route
                        path="settings/changePassword"
                        caseSensitive={false}
                        action={UpdatePasswordService}
                        element={<UpdatePassword />}></Route>
                    <Route
                        path="chat"
                        caseSensitive={false}
                        element={<ChatApp />}></Route>
                    <Route
                        path="suggestions"
                        caseSensitive={false}
                        element={<Suggestions />}></Route>
                    <Route
                        path="rank_my_meals"
                        caseSensitive={false}
                        element={<RankMyMeals />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Route>
                <Route
                    path="admin"
                    caseSensitive={false}
                    element={<DashboardLayout />}>
                    <Route path="" element={<DashboardHome />} />
                    <Route path="home" element={<DashboardHome />} />
                    <Route path="meals/:index" element={<ListMeals />} />
                    <Route path="*" element={<NotFound />}></Route>
                </Route>
                <Route
                    path="offline"
                    caseSensitive={false}
                    element={<Offline />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Route>

            <Route path="/auth/" caseSensitive={false} element={<AuthLayout />}>
                <Route
                    path="account/:target"
                    action={AuthService}
                    element={<AuthView />}></Route>
                <Route
                    path="verifyEmail/:id"
                    action={EmailVerification}
                    element={<EmailVerification />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Route>
        </Fragment>
    )
);

function App() {
    return (
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>
    );
}

export default App;
