import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/elegant-icons.css";
import "./css/magnific-popup.css";
import "./css/nice-select.css";
import "./css/owl.carousel.min.css";
import "./css/slicknav.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";
import "font-awesome/css/font-awesome.min.css";
import "./js/jquery-3.3.1.min.js";
import "./js/bootstrap.min.js";
import "./js/jquery.nice-select.min.js";
import "./js/jquery.nicescroll.min.js";
import "./js/jquery.magnific-popup.min.js";
import "./js/jquery.countdown.min.js";
import "./js/jquery.slicknav.js";
import "./js/mixitup.min.js";
import "./js/owl.carousel.min.js";
import "./js/main.js";
import AboutPage from "./pages/about";
import ShopPage from "./pages/shop/index.js";
import BlogPage from "./pages/blog/index.js";
import ContactPage from "./pages/contact/index.js";
import ShopDetailsPage from "./pages/shop/details/index.js";
import ShoppingCartPage from "./pages/shop/cart/index.js";
import CheckoutPage from "./pages/checkout/index.js";
import BlogDetailsPage from "./pages/blog/details/index.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop-details" element={<ShopDetailsPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
