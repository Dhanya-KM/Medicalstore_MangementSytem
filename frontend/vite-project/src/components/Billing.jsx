// src/components/Billing.jsx
import { useState } from "react";

export default function Billing({ token, medicines, setMedicines, todaySales, setTodaySales, setGlobalError }) {
    const [selectedMed, setSelectedMed] = useState("");
    const [qty, setQty] = useState("");
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");

    const handleAddToCart = () => {
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

        const med = medicines.find((m) => m._id === selectedMed);
        if (!med) return;

        if (Number(qty) > med.stock) {
            setError("Not enough stock available");
            return;
        }

        const existing = cart.find((c) => c._id === med._id);
        if (existing) {
            setCart(cart.map((c) => c._id === med._id ? { ...c, qty: c.qty + Number(qty) } : c));
        } else {
            setCart([...cart, { ...med, qty: Number(qty) }]);
        }

        setSelectedMed("");
        setQty("");
    };

    const handleRemoveFromCart = (id) => {
        setCart(cart.filter((c) => c._id !== id));
    };

    const handleCheckout = async () => {
        try {
            let totalAmount = 0;

            for (const item of cart) {
                const newStock = item.stock - item.qty;

                const res = await fetch(`http://localhost:5000/api/medicines/${item._id}`, {
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
                    prev.map((m) => (m._id === item._id ? updatedMed : m))
                );

                totalAmount += item.qty * item.price;
            }

            setTodaySales(todaySales + totalAmount);
            setCart([]);
            alert(`Billing complete! Total: ₹${totalAmount}`);
        } catch (err) {
            console.error(err);
            setGlobalError && setGlobalError(err.message || "Checkout failed");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Billing</h2>

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
                            {m.name} (Stock: {m.stock}, ₹{m.price})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    className="border p-2 rounded"
                    placeholder="Quantity"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                />

                <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </div>

            {/* Cart Table */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Cart</h3>
                {cart.length === 0 ? (
                    <p className="text-gray-500">No items in cart.</p>
                ) : (
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Medicine</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Price/unit</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.qty}</td>
                                    <td className="p-2">₹{item.price}</td>
                                    <td className="p-2">₹{item.qty * item.price}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleRemoveFromCart(item._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {cart.length > 0 && (
                    <div className="mt-4 text-right">
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
