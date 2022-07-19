import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import Auth from './components/Auth';
import RequireAuth from './components/RequireAuth';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />}>
        <Route path='/' element={<LoginPage />} >
          <Route index element={<LoginForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Route>
      </Route>
      <Route path='/home' element={<RequireAuth />}>
        <Route path='/home' element={<HomePage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
