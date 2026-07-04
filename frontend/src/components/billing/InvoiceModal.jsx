import jsPDF from "jspdf";
import "jspdf-autotable";

export default function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const { invoice_number, date, items, customer, payment_method, grand_total } =
    invoice;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Scan Once — Invoice", 14, 20);

    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoice_number}`, 14, 28);
    doc.text(`Date: ${date}`, 14, 34);
    doc.text(`Customer: ${customer}`, 14, 40);
    doc.text(`Payment Method: ${payment_method}`, 14, 46);

    doc.autoTable({
      startY: 54,
      head: [["Product", "Qty", "Unit Price", "Subtotal"]],
      body: items.map((item) => [
        item.name,
        item.quantity,
        `Rs.${item.unit_price.toFixed(2)}`,
        `Rs.${(item.unit_price * item.quantity).toFixed(2)}`,
      ]),
    });

    const finalY = doc.lastAutoTable.finalY || 60;
    doc.setFontSize(13);
    doc.text(`Grand Total: Rs.${grand_total.toFixed(2)}`, 14, finalY + 12);

    doc.save(`${invoice_number}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            Invoice Generated
          </h2>
          <p className="text-sm text-gray-500">{invoice_number}</p>
        </div>

        <div className="mb-4 space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-800">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Customer</span>
            <span className="font-medium text-gray-800">{customer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium text-gray-800">
              {payment_method}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-2">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between py-1 text-gray-600"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.unit_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
            <span>Grand Total</span>
            <span>₹{grand_total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-gray-100 py-3 font-semibold text-gray-700 hover:bg-gray-200"
          >
            New Sale
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
