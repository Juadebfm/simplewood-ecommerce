import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Elements from "./pages/Elements";
import Pages from "./pages/Pages";
import Shop from "./pages/Shop";
import Sale from "./pages/Sale";
import Products from "./pages/Products";
import { ProductsProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import CreateAccount from "./pages/CreateAccount";

const App = () => {
  return (
    <div className="overflow-x-hidden font-poppins">
      <AuthProvider>
        <ProductsProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/elements" element={<Elements />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/acct" element={<CreateAccount />} />
            </Routes>
          </Router>
        </ProductsProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
