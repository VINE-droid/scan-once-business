import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import InventoryPage from "./pages/InventoryPage";
import Billing from "./pages/Billing";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route
  path="/receive"
  element={<h1 className="text-2xl">Receive Stock (Coming Soon)</h1>}
/>

          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App; 