import { Menu, Bell, Circle } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md">

      <div className="flex h-full items-center justify-between px-4 md:px-8">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>

            <h1 className="text-xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-xs text-slate-500">
              Welcome back 👋
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Status */}

          <div className="hidden items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 md:flex">

            <Circle
              size={8}
              fill="currentColor"
            />

            Live

          </div>

          {/* Notifications */}

          <button className="rounded-full p-2 transition hover:bg-slate-100">
            <Bell size={20} />
          </button>

          {/* Avatar */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white shadow">

            A

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;