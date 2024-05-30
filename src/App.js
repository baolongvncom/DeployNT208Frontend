import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProductPage from "./Pages/SearchProductPage";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import ChatPage from "./Pages/ChatPage";
import Footer from "./Components/Footer/Footer";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import UserProfile from "./Pages/UserProfile";
import jeremybudimanunsplash from "./Components/Assets/jeremy-budiman-unsplash.jpg";
import AdminAddProduct from "./AdminComponents/AdminAddProduct/AdminAddProduct";
import AdminListProduct from "./AdminComponents/AdminListProduct/AdminListProduct";
import AdminChatPage from "./AdminComponents/AdminChatPage/AdminChatPage";
import { useContext, useEffect } from "react";
import AdminNavBar from "./AdminComponents/AdminNavbar/AdminNavbar";
import { AuthenticationContext } from "./Context/AuthenticationContext";
import AdminSidebar from "./AdminComponents/AdminSidebar/AdminSidebar";
import OrderPage from "./Components/OrderPage/OrderPage";
import CheckoutPage from "./Components/Checkout/CheckoutPage";
import AdminUpdateProductPage from "./AdminComponents/AdminUpdateProduct/AdminUpdateProduct";
import AdminCheckOrder from "./AdminComponents/AdminCheckOrder/AdminCheckProduct";
// import AdminSidebar from './AdminComponents/AdminSidebar/AdminSidebar';
import "./Pages/CSS/AdminPage.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAdmin } = useContext(AuthenticationContext);

  useEffect(() => {
    if (isAdmin) {
      window.location.replace("/listproduct");
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {isAdmin ? <AdminNavBar /> : <Navbar />}
        {isAdmin ? <AdminSidebar /> : <></>}
        <Routes>
          <Route path="/addproduct" element={<AdminAddProduct />} />
          <Route path="/listproduct" element={<AdminListProduct />} />
          <Route path="/adminchatpage" element={<AdminChatPage />} />
          <Route path="/admincheckorder" element={<AdminCheckOrder />} />
          <Route path="/" element={<Shop />} />
          {/* <Route path='/admin' element={<AdminPage/>}/> */}

          <Route
            path="/watches"
            element={<SearchProductPage banner={jeremybudimanunsplash} />}
          />
          <Route
            path="/womens"
            element={<SearchProductPage banner={women_banner} />}
          />
          <Route
            path="/kids"
            element={<SearchProductPage banner={kids_banner} />}
          />
          <Route path="product">
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="updateproduct">
            <Route path=":productId" element={<AdminUpdateProductPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:activepage" element={<UserProfile />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderpage" element={<OrderPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
