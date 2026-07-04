function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6">
      <h2 className="text-lg font-semibold mb-8">
        Menu
      </h2>

      <nav className="space-y-4">
        <button className="block w-full text-left hover:text-blue-400">
          Inventory
        </button>

        <button className="block w-full text-left hover:text-blue-400">
          Receive Stock
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;