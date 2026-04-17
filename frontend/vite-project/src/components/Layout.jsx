// src/components/Layout.jsx
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Medicines from "./Medicines";
import Billing from "./Billing";
import Stock from "./Stock";

export default function Layout({ token, onLogout }) {
    const [page, setPage] = useState("dashboard");
    const [medicines, setMedicines] = useState([]);
    const [loadingMeds, setLoadingMeds] = useState(true);
    const [globalError, setGlobalError] = useState("");
    const [todaySales, setTodaySales] = useState(0);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                setLoadingMeds(true);
                setGlobalError("");

                const res = await fetch("http://localhost:5000/api/medicines", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch medicines");
                const data = await res.json();
                setMedicines(data);
            } catch (err) {
                console.error(err);
                setGlobalError("Could not load medicines from server.");
            } finally {
                setLoadingMeds(false);
            }
        };
        fetchMedicines();
    }, [token]);

    const lowStockCount = medicines.filter((m) => m.stock < 5).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-purple-100 py-6 px-3">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col overflow-hidden">
                <Navbar currentPage={page} setPage={setPage} onLogout={onLogout} />

                <main className="p-6 md:p-8 bg-slate-50/60 flex-1 space-y-6">
                    {globalError && (
                        <p className="text-red-600 bg-red-50 p-2 rounded">{globalError}</p>
                    )}

                    {page === "dashboard" && (
                        <Dashboard
                            totalMedicines={medicines.length}
                            lowStockCount={lowStockCount}
                            todaySales={todaySales}
                        />
                    )}

                    {page === "medicines" && (
                        <Medicines
                            token={token}
                            medicines={medicines}
                            setMedicines={setMedicines}
                            loading={loadingMeds}
                            setGlobalError={setGlobalError}
                        />
                    )}

                    {page === "billing" && (
                        <Billing
                            token={token}
                            medicines={medicines}
                            setMedicines={setMedicines}
                            todaySales={todaySales}
                            setTodaySales={setTodaySales}
                            setGlobalError={setGlobalError}
                        />
                    )}

                    {page === "stock" && (
                        <Stock
                            medicines={medicines}
                            setMedicines={setMedicines}
                            token={token}
                            setGlobalError={setGlobalError}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
