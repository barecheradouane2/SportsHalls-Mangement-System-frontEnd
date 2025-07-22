
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
import Login from "./pages/Login";
// import Users from "./pages/Users";

import RequireAuth from "./components/RequireAuth";
import { ProductSalesProvider } from "./Context/ProductSalesContext";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
        <AuthProvider>

    <ProductSalesProvider>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/members" element={<Members />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/outcomes" element={<Outcomes />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/users" element={<Users />} /> */}


          </Route>

          {/* Fallback */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ProductSalesProvider>
        </AuthProvider>
  );
}

export default App;


















// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import AppLayout from "@/Layouts/AppLayout";

// import Dashboard from "./pages/Dashborad";
// import Products from "./pages/Products";
// import Activities from "./pages/Activities";
// import Members from "./pages/Members";
// import Subscriptions from "./pages/Subscriptions";
// import Attendance from "./pages/Attendance";
// import Incomes from "./pages/Incomes";
// import Outcomes from "./pages/Outcomes";
// import Settings from "./pages/Settings";

// import { ProductSalesProvider } from "./Context/ProductSalesContext";

// // Import global styles

// function App() {
//   return (
//     <ProductSalesProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<AppLayout />}>
//             <Route index path="/" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/activities" element={<Activities />} />
//             <Route path="/members" element={<Members />} />
//             <Route path="/subscriptions" element={<Subscriptions />} />
//             <Route path="/attendance" element={<Attendance />} />
//             <Route path="/incomes" element={<Incomes />} />
//             <Route path="/outcomes" element={<Outcomes />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>

//           <Route path="*" element={<h1>404 Not Found</h1>} />
//         </Routes>
//       </BrowserRouter>
//     </ProductSalesProvider>
//   );
// }

// export default App;
