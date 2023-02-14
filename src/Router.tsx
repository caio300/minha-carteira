import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from './pages/Dashboard/index';
import List from './pages/List/index';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/list/:type" element={<List/>}/>
      </Route>
    </Routes>
  )
}