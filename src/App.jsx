import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';

// Import Pages
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import NewsEvents from './Pages/NewsEvents';
import ProductDetail from './Pages/ProductDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/products/detail" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;