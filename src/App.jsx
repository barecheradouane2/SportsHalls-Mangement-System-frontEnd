import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@/Layouts/AppLayout";

import Dashboard from "./pages/Dashborad";
import Products from "./pages/Products";
import Activities from "./pages/Activities";
import Members from "./pages/Members";
import Subscriptions from "./pages/Subscriptions";
import Attendance from "./pages/Attendance";
import Incomes from "./pages/Incomes";
import Outcomes from "./pages/Outcomes";
import Settings from "./pages/Settings";



// Import global styles

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Dashboard/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/members" element={<Members />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/outcomes" element={<Outcomes />} />
          <Route path="/settings" element={<Settings/>} />

        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
