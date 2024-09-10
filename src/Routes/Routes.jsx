import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import ApplyScholar from "../Pages/ApplyScholar/ApplyScholar";
import AllReviews from "../Pages/Dashboard/AllReviews";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AppliedApplication from "../Pages/Dashboard/AppliedApplication";
import ManageScholarShip from "../Pages/Dashboard/ManageScholarShip";
import MyApplication from "../Pages/Dashboard/MyApplication";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MyReview from "../Pages/Dashboard/MyReview";
import ScholarshipForm from "../Pages/Dashboard/ScholarshipForm";
import UpdateScholarShipItems from "../Pages/Dashboard/UpdateScholarShipItems";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import Register from "../Pages/Shared/Register";
import PrivateRoute from "../Private/PrivateRoute";
import Details from "../components/Details";
import UpdateMyApplication from "../Pages/Dashboard/UpdateMyApplication";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/allScholarship",
            element: <AllScholarship></AllScholarship>
        },
        {
            path: "/ApplyScholar/:id",
            element: <PrivateRoute><ApplyScholar></ApplyScholar></PrivateRoute>,
            
        },
        {
            path: "/items/:id",
            element: <PrivateRoute><Details></Details></PrivateRoute>,
            loader:({params}) => fetch(`https://scholar-stream-server.vercel.app/singleItem/${params.id}`)
            
        }
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {   
                path:'profile',
                element:  <MyProfile></MyProfile>
            },
            {
                path:'application',
                element:  <MyApplication></MyApplication>
            },
            {
                path:'review',
                element:  <MyReview></MyReview>
            },
            {
                path:'scholarshiform',
                element:  <ScholarshipForm></ScholarshipForm>
            },
            {
                path:'items/update/:id',
                element:  <UpdateScholarShipItems></UpdateScholarShipItems>
            },
            {
                path:'scholaritem/update/:id',
                element:  <UpdateMyApplication></UpdateMyApplication>
            },
            {
                path:'manageScholarshiform',
                element:  <ManageScholarShip></ManageScholarShip>
            },
            {   
                path:'allapplyscholarship',
                element:  <AppliedApplication></AppliedApplication>
            },
            {
                path:'allusers',
                element:  <AllUsers></AllUsers>
            },
            {
                path:'allreview',
                element:  <AllReviews></AllReviews>
            },
            {
                path:'review',
                element:  <MyReview></MyReview>
            },
        ]
    }
  ]);
  export default router;    