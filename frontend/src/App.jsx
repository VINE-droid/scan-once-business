import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import InventoryPage from "./pages/InventoryPage";
import Billing from "./pages/Billing";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;