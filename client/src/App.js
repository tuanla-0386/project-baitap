import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './components/Auth';
import ProfileItem from './components/ProfileItem';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditPage from './pages/EditPage';
import EditForm from './components/EditForm';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />}>
        <Route path='/' element={<LoginPage />} />
      </Route>
      <Route path='home' element={<RequireAuth />}>
        <Route index element={<HomePage />} />
        <Route path='profile' element={<ProfilePage />}>
          <Route path=':id' element={<ProfileItem />} />
        </Route>
        <Route path='edit' element={<EditPage />}>
          <Route path=':id' element={<EditForm />} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
