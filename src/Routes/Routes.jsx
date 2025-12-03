import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../pages/Home/Home";
import ProductDetailsLayout from "../Layout/ProductDetailsLayout/ProductDetailsLayout";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdatePassword from "../pages/UpdatePassword/UpdatePassword";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import PrivateRoutes from "./PrivateRoute/PrivateRoute";
import Contact from "../pages/Contact/Contact";
import ShowAllCardLayout from "../Layout/ShowAllCardLayout/ShowAllCardLayout";
// import ShowAllCard from "../pages/ShowAllCards/ShowAllCard";
import ShowAllCards from "../Components/ShowAllCards/ShowAllCards";
import Error from "../Components/Error/Error";
import SellProduct from "../pages/Sell-A-Product/SellProduct";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import SellInfo from "../pages/Dash-Board/Sell-info/SellInfo";
import BuyProduct from "../pages/Dash-Board/Buy-Product/BuyProduct";
import Payment from "../pages/Dash-Board/Payment/Payment";
import PaymentSuccess from "../pages/Dash-Board/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dash-Board/Payment/PaymentCancel";



export const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <HomeLayout></HomeLayout>,
            errorElement: <Error></Error>,
            children: [
                {
                    index: true,
                    element: <Home></Home>,
                }
            ]
        },
        {
            path: "card",
            element: <ShowAllCardLayout></ShowAllCardLayout>,
            children: [
                {
                    path: "showAllCards",
                    element: <ShowAllCards></ShowAllCards>
                }
            ]
        },
        {
            path: "product",
            element: <ProductDetailsLayout></ProductDetailsLayout>,
            children: [
                {
                    path: "productDetails/:id",
                    element: <PrivateRoutes>
                        <ProductDetails></ProductDetails>
                    </PrivateRoutes>
                },
                {
                    path: "sell-product",
                    element: <SellProduct></SellProduct>
                },
            ]
        },
        {
            path: "auth",
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: "login",
                    element: <Login></Login>
                },
                {
                    path: "register",
                    element: <Register></Register>
                },
                {
                    path: "updatePassword",
                    element: <PrivateRoutes>
                        <UpdatePassword></UpdatePassword>
                    </PrivateRoutes>
                },
                {
                    path: "myProfile",
                    element: <PrivateRoutes>
                        <MyProfile></MyProfile>
                    </PrivateRoutes>
                },
                {
                    path: "updateProfile",
                    element: <PrivateRoutes>
                        <UpdateProfile></UpdateProfile>
                    </PrivateRoutes>
                }
            ]
        },
        {
            path: "dashboard",
            element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
            children: [
                {
                    path: "sell-info",
                    element: <SellInfo></SellInfo>
                },
                {
                    path: "your-cart",
                    element: <BuyProduct></BuyProduct>
                },
                {
                    path: "payment/:productId",
                    Component: Payment,
                },
                {
                    path: "payment-success",
                    // Component: PaymentSuccess
                    element: <PaymentSuccess></PaymentSuccess>
                },
                {
                    path: "payment-cancelled",
                    // Component: PaymentCancel,
                    element: <PaymentCancel></PaymentCancel>
                }
            ]
        },
        {
            path: "contact",
            element: <PrivateRoutes>
                <Contact></Contact>
            </PrivateRoutes>
        },
    ]
)