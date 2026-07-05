import { NavLink } from "react-router-dom";
import {
  Boxes,
  ShoppingCart,
  PackagePlus,
  Package,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
}) {
  const links = [
    {
      name: "Inventory",
      path: "/inventory",
      icon: Boxes,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: ShoppingCart,
    },
    {
      name: "Receive Stock",
      path: "/receive",
      icon: PackagePlus,
    },
     {
    name: "Add Product",
    path: "/add-product",
    icon: Package,
  },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen
          ${collapsed ? "w-20" : "w-64"}
          bg-slate-900 border-r border-slate-800
          text-white shadow-2xl
          flex flex-col
          transition-all duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="border-b border-slate-700 p-4">

          {!collapsed ? (
            <div className="flex items-start justify-between">

              {/* Logo */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/30">
                  <span className="text-sm font-black tracking-wide text-white">
                    SO
                  </span>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-white">
                    ScanOnce
                  </h1>

                  <p className="text-xs text-slate-400">
                    Retail POS
                  </p>
                </div>

              </div>

              {/* Desktop Collapse */}
              <button
                onClick={() => setCollapsed(true)}
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <PanelLeftClose size={18} />
              </button>

              {/* Mobile Close */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X size={22} />
              </button>

            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/30">
                <span className="text-sm font-black tracking-wide text-white">
                  SO
                </span>
              </div>

              <button
                onClick={() => setCollapsed(false)}
                className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <PanelLeftOpen size={18} />
              </button>

            </div>
          )}

        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center
                  ${
                    collapsed
                      ? "justify-center"
                      : "gap-3"
                  }
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                  }
                `
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium whitespace-nowrap">
                    {link.name}
                  </span>
                )}
              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;