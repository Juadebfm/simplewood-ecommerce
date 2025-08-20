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

const App = () => {
  return (
    <div className="overflow-x-hidden font-poppins">
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
          </Routes>
        </Router>
      </ProductsProvider>
    </div>
  );
};

export default App;
