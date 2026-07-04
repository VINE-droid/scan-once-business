import { useState } from "react";
import ScanInput from "../components/billing/ScanInput";
import Cart from "../components/billing/Cart";
import CheckoutPanel from "../components/billing/CheckoutPanel";
import InvoiceModal from "../components/billing/InvoiceModal";
import {
  getProductByBarcode,
  submitSale,
  getMockCustomers,
} from "../services/billingService";

const customers = getMockCustomers();

export default function Billing() {
  const [cartItems, setCartItems] = useState([]);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  const [selectedCustomerId, setSelectedCustomerId] = useState(
    customers[0].id
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  const handleScan = async (barcode) => {
    setScanError("");
    setScanLoading(true);
    try {
      const res = await getProductByBarcode(barcode);
      const product = res.data;

      setCartItems((prev) => {
        const existing = prev.find((i) => i.product_id === product.product_id);
        if (existing) {
          return prev.map((i) =>
            i.product_id === product.product_id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [
          ...prev,
          {
            product_id: product.product_id,
            name: product.name,
            unit_price: product.selling_price ?? product.price ?? product.unit_price ?? 0,
            quantity: 1,
          },
        ];
      });
    } catch (err) {
      setScanError("Product not found for that barcode.");
    } finally {
      setScanLoading(false);
    }
  };

  const handleQtyChange = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((i) =>
        i.product_id === productId ? { ...i, quantity: newQty } : i
      )
    );
  };

  const handleRemove = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckoutLoading(true);

    const customer = customers.find((c) => c.id === Number(selectedCustomerId));

    try {
      const res = await submitSale({
        items: cartItems,
        customer_id: selectedCustomerId,
        payment_method: paymentMethod,
        grand_total: grandTotal,
      });

      setInvoice({
        invoice_number: res.data.invoice_number,
        date: new Date().toLocaleDateString(),
        items: cartItems,
        customer: customer?.name ?? "Walk-in Customer",
        payment_method: paymentMethod,
        grand_total: grandTotal,
      });
    } catch (err) {
      setScanError("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleNewSale = () => {
    setInvoice(null);
    setCartItems([]);
    setPaymentMethod("Cash");
    setSelectedCustomerId(customers[0].id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Billing</h1>
      <p className="mt-1 text-gray-600">Scan Once, Run Your Whole Business</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ScanInput onScan={handleScan} loading={scanLoading} />
          {scanError && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {scanError}
            </p>
          )}
          <Cart
            cartItems={cartItems}
            onQtyChange={handleQtyChange}
            onRemove={handleRemove}
          />
        </div>

        <div>
          <CheckoutPanel
            grandTotal={grandTotal}
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onCustomerChange={setSelectedCustomerId}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onCheckout={handleCheckout}
            disabled={cartItems.length === 0}
            loading={checkoutLoading}
          />
        </div>
      </div>

      <InvoiceModal invoice={invoice} onClose={handleNewSale} />
    </div>
  );
}
