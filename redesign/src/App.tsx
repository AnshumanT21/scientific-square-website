import { Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import CategoryPage from './pages/Category';
import About from './pages/About';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { getCategory } from './data/products';
import { productPath } from './lib/cn';

/** Keeps old links like /products/detail?product=electrolyzers working. */
function LegacyProductRedirect() {
  const [params] = useSearchParams();
  const slug = params.get('product');
  return <Navigate to={getCategory(slug ?? undefined) ? productPath(slug!) : '/products'} replace />;
}

export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/detail" element={<LegacyProductRedirect />} />
          <Route path="/products/:slug" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/news-events" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
