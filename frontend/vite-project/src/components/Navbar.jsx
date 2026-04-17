export default function Navbar({ currentPage, setPage, onLogout }) {
    const navButton = (id, label) => (
        <button
            onClick={() => setPage(id)}
            className={`px-3 py-2 rounded-xl text-sm md:text-base transition ${currentPage === id
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
        >
            {label}
        </button>
    );

    return (
        <nav className="border-b border-slate-200 px-4 py-3 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg">
                    🏥
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-semibold text-slate-800">
                        Medical Store
                    </h1>
                    <p className="text-xs text-slate-500 hidden sm:block">
                        Manage medicines, billing and stock
                    </p>
                </div>
            </div>

            <div className="flex gap-2 md:gap-3">
                {navButton("dashboard", "Dashboard")}
                {navButton("medicines", "Medicines")}
                {navButton("billing", "Billing")}
                {navButton("stock", "Stock")}
            </div>

            <button
                onClick={onLogout}
                className="text-sm md:text-base px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
            >
                Logout
            </button>
        </nav>
    );
}
