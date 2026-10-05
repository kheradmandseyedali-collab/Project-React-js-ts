import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import MainLoading from "../components/global/MainLoading";
import Recaver from "../pages/recaver_pass/recaver";

const Login = lazy(() => import("../pages/login"));
const RecoverPass = lazy(() => import("../pages/recaver_pass"));
const Home = lazy(() => import("../pages/home"));
const Profile = lazy(() => import("../pages/profile"));
const AboutUs = lazy(() => import("../pages/aboute_us"));
const ContactUs = lazy(() => import("../pages/contact_us"));
const Posts = lazy(() => import("../pages/posts"));
const CreatePost = lazy(() => import("../pages/posts/components/CreatePost"));
const PostDetails = lazy(() => import("../pages/posts/components/Details"));
const ShowPost = lazy(() => import("../pages/posts/show"));
const EditPost = lazy(() => import("../pages/posts/EditPost"));
const TestContext = lazy(() => import("../pages/login"));
const MuiPage = lazy(() => import("../pages/mui"));
const Shop = lazy(() => import("../pages/Shop/shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Todos = lazy(() => import("../pages/todo-list"));
const NotFound = lazy(() => import("../pages/not_found"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<MainLoading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPass />} />
        <Route path="/recover-password/recover" element={<Recaver />} />
        <Route path="/" element={<Navigate to="/app/home" />} />
        <Route path="/app" element={<Navigate to="/app/home" />} />

        <Route path="/app" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/user" element={<Profile />} />
          <Route path="profile/products" element={<Profile />} />
          <Route path="profile/" element={<Profile />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/:postId" element={<PostDetails />} />
          <Route path="posts/:id" element={<ShowPost />} />
          <Route path="posts/edit/:id" element={<EditPost />} />
          <Route path="test-context" element={<TestContext />} />
          <Route path="mui" element={<MuiPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="todo-list" element={<Todos />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
