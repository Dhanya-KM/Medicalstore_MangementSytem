// src/components/Medicines.jsx
import { useState } from "react";

export default function Medicines({
    token,
    medicines,
    setMedicines,
    loading,
    setGlobalError,
}) {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const resetForm = () => {
        setName("");
        setStock("");
        setPrice("");
        setError("");
    };

    const handleAdd = async () => {
        setError("");
        setGlobalError && setGlobalError("");

        if (!name || !stock || !price) {
            setError("All fields are required");
            return;
        }

        if (isNaN(stock) || isNaN(price)) {
            setError("Stock and Price must be numbers");
            return;
        }

        try {
            setSaving(true);

            const res = await fetch("http://localhost:5000/api/medicines", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    stock: Number(stock),
                    price: Number(price),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to add medicine");
            }

            // data is the created medicine from DB (with _id)
            setMedicines([...medicines, data]);
            resetForm();
        } catch (err) {
            console.error(err);
            setError(err.message || "Could not save medicine");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        setGlobalError && setGlobalError("");

        if (!window.confirm("Delete this medicine?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/medicines/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete medicine");
            }

            setMedicines(medicines.filter((m) => m._id !== id));
        } catch (err) {
            console.error(err);
            setGlobalError &&
                setGlobalError(err.message || "Could not delete medicine");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Manage Medicines
            </h2>

            {/* Add Medicine Card */}
            <div className="bg-white p-5 shadow-lg rounded-xl mb-6">
                {error && (
                    <p className="bg-red-100 text-red-600 p-2 text-sm rounded mb-3">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="text"
                        placeholder="Medicine Name"
                        value={name}
                        className="border p-2 rounded"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Stock"
                        value={stock}
                        className="border p-2 rounded"
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Price"
                        value={price}
                        className="border p-2 rounded"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleAdd}
                    disabled={saving}
                    className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${saving ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    {saving ? "Saving..." : "Add Medicine"}
                </button>
            </div>

            {/* Medicine List */}
            <div className="bg-white p-5 shadow-lg rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-gray-700">Medicine List</h3>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading medicines...</p>
                ) : medicines.length === 0 ? (
                    <p className="text-gray-500">No medicines added yet.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Name</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {medicines.map((m) => (
                                <tr key={m._id} className="border-b">
                                    <td className="p-2">{m.name}</td>
                                    <td className="p-2">{m.stock}</td>
                                    <td className="p-2">₹{m.price}</td>

                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDelete(m._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
