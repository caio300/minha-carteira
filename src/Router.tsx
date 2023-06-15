import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from './pages/Dashboard/index';
import List from './pages/List/index';

import SignIn from "./pages/SignIn";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/" element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/list/:type" element={<List/>}/>
      </Route>
    </Routes>
  )
}