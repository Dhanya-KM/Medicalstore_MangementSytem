export default function Dashboard({ totalMedicines, lowStockCount, todaySales }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-xs text-sky-600 uppercase">Total Medicines</p>
                <p className="text-2xl font-bold">{totalMedicines}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-xs text-amber-600 uppercase">Low Stock</p>
                <p className="text-2xl font-bold">{lowStockCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-xs text-emerald-600 uppercase">Today's Sales</p>
                <p className="text-2xl font-bold">₹{todaySales}</p>
            </div>
        </div>
    );
}
