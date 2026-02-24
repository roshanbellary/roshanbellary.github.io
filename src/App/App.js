import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Home from '../pages/Home/Home';
import Experience from '../pages/Experience/Experience';
import Projects from '../pages/Projects/Projects';
import BlogIndex from '../pages/Blog/BlogIndex';
import BlogPost from '../pages/Blog/BlogPost';
import Contact from '../pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
