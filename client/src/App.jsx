import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { AddAddress } from "./pages/AddAddress";
import { MyOrders } from "./pages/MyOrders";
import { SellerLogin } from "./components/seller/SellerLogin";
import { SellerLayout } from "./pages/seller/SellerLayout";
import { AddProduct } from "./pages/seller/AddProduct";
import { ProductList } from "./pages/seller/ProductList";
import { Orders } from "./pages/seller/Orders";
import { AnimatePresence, motion } from "framer-motion";
import { Contact } from "./pages/Contact";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setNavScrolled(true);
      return;
    }

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar isHomePage={isHomePage} scrolled={navScrolled} />
        </div>
      )}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : `${isHomePage ? "px-6 md:px-16 lg:px-24 xl:px-32" : "pt-20 px-6 md:px-16 lg:px-24 xl:px-32"}`}`}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route path="/products" element={
                <AnimatedPage>
                  <AllProducts />
                </AnimatedPage>
              }
            />
            <Route path="/contact" element={
                <AnimatedPage>
                  <Contact />
                </AnimatedPage>
              }
            />
            <Route path="/products/:category" element={
                <AnimatedPage>
                  <ProductCategory />
                </AnimatedPage>
              }
            />
            <Route path="/products/:category/:id" element={
                <AnimatedPage>
                  <ProductDetails />
                </AnimatedPage>
              }
            />
            <Route path="/cart" element={
                <AnimatedPage>
                  <Cart />
                </AnimatedPage>
              }
            />
            <Route path="/add-address" element={
                <AnimatedPage>
                  <AddAddress />
                </AnimatedPage>
              }
            />
            <Route path="/my-orders" element={
                <AnimatedPage>
                  <MyOrders />
                </AnimatedPage>
              }
            />
            <Route
              path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}
            >
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
