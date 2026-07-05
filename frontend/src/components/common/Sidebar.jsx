import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <h2 className="text-lg font-semibold mb-8">
        Menu
      </h2>

      <nav className="space-y-4">
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `block w-full text-left p-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          Inventory
        </NavLink>

        <NavLink
          to="/billing"
          className={({ isActive }) =>
            `block w-full text-left p-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          Billing
        </NavLink>

        <NavLink
          to="/receive"
          className={({ isActive }) =>
            `block w-full text-left p-2 rounded ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`
          }
        >
          Receive Stock
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;