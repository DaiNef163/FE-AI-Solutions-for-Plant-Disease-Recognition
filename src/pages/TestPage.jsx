import React, { useMemo, useState } from "react";
import CartItem from "../components/CartPage/CartItem";
import CartPay from "../components/CartPage/CartPay";

export default function CartPage() {
    // Mock data for cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Thuốc diệt sâu",
            description: "nhỏ",
            imageUrl: "../../public/images/leafHome1.png",
            price: 100000,
            quantity: 2,
        },
        {
            id: 2,
            name: "Thuốc diệt cỏ",
            description: "xl",
            imageUrl: "../../public/images/leafhome2.png",
            price: 200000,
            quantity: 1,
        },
    ]);
    const totalPrice = useMemo(() => {
        return cartItems?.reduce((first, item, i) => {
            return item.price * item.quantity + first;
        }, 0);
    }, [cartItems]);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) return;

        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
    };

    // Handle item deletion from the cart
    const handleItemDelete = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Giỏ Hàng</h1>
                    </div>

                    <div className="flex gap-8 mt-8">
                        <div className="w-2/3">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onItemDelete={handleItemDelete}
                                />
                            ))}
                        </div>

                        <div className="w-1/3">
                            <CartPay amount={totalPrice} fee={0}  />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
