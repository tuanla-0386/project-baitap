import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import ErrorPage from './pages/ErrorPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} >
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
