import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import InventoryPage from "./pages/InventoryPage";
import Billing from "./pages/Billing";
import ReceivingPage from "./pages/ReceivingPage";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route path="/receive" element={<ReceivingPage />} />

          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App; 