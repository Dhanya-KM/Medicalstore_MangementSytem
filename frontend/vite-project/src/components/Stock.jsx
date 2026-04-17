// src/components/Stock.jsx
import { useState } from "react";

export default function Stock({ medicines, setMedicines, token, setGlobalError }) {
    const [selectedMed, setSelectedMed] = useState("");
    const [qty, setQty] = useState("");
    const [error, setError] = useState("");

    const handleAddStock = async () => {
        setError("");
        setGlobalError && setGlobalError("");

        if (!selectedMed || !qty) {
            setError("Select medicine and quantity");
            return;
        }

        if (isNaN(qty) || Number(qty) <= 0) {
            setError("Quantity must be a positive number");
            return;
        }

        try {
            const med = medicines.find((m) => m._id === selectedMed);
            const newStock = med.stock + Number(qty);

            const res = await fetch(`http://localhost:5000/api/medicines/${selectedMed}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ stock: newStock }),
            });

            const updatedMed = await res.json();
            if (!res.ok) throw new Error(updatedMed.message || "Failed to update stock");

            setMedicines((prev) =>
                prev.map((m) => (m._id === selectedMed ? updatedMed : m))
            );

            setSelectedMed("");
            setQty("");
        } catch (err) {
            console.error(err);
            setError(err.message || "Could not add stock");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Stock Tracker</h2>

            {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <select
                    className="border p-2 rounded"
                    value={selectedMed}
                    onChange={(e) => setSelectedMed(e.target.value)}
                >
                    <option value="">Select medicine</option>
                    {medicines.map((m) => (
                        <option key={m._id} value={m._id}>
                            {m.name} (stock: {m.stock})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    className="border p-2 rounded"
                    placeholder="Quantity to add"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                />

                <button
                    onClick={handleAddStock}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Stock
                </button>
            </div>

            <table className="w-full text-left border">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">Medicine</th>
                        <th className="p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((m) => (
                        <tr key={m._id} className="border-b">
                            <td className="p-2">{m.name}</td>
                            <td className="p-2">{m.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
