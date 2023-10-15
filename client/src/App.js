import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserAuthPage from './pages/UserAuthPage';
import BlogPage from './pages/BlogPage';
import Home from './pages/Home';
import SingleBlogPage from './pages/SingleBlogPage';
import EditPage from './pages/EditPage';
import AboutPage from './pages/AboutPage';
import Page404 from './components/404Page/Page404'
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<UserAuthPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:slug' element={<SingleBlogPage />} />
          <Route path='/:id/new' element={<BlogPage/>} />
          <Route path='/:id/:title/edit' element={<EditPage/>} />
          <Route path='/about' element ={<AboutPage />} />
          <Route path='/404page' element ={<Page404 />} />
          <Route path='/contact' element ={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
