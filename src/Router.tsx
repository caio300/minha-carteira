import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from './pages/Dashboard/index';
import List from './pages/List/index';

import SignIn from "./pages/SignIn";

import { useAuth } from "./hooks/auth";

export function Router() {
  const { logged } = useAuth();
  return (
    <Routes>
      { !logged
        ?
        <Route path="/" element={<SignIn />}/>
        :
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/list/:type" element={<List/>}/>
        </Route>
      }
    </Routes>
  )
}