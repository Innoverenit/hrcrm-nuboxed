import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { base_url2 } from "../../../../../Config/Auth";

const InvoiceTemplate = (props) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    {
      id: 1361,
      style:"American",
      type:"ABCD Order",
      date: "30/08/2024",
      dueDate: "29/09/2024",
      shipDate: "30/08/2024",
      shipVia: "Dsd fdgfg",
      salesRep: "Tracy Sales",
      purchaseOrder: "SO-HU546465",
      subtotal: "450.00",
      hst: "58.50",
      total: "508.50",
      balanceDue: "508.50",
      taxRate: "HST (ON) @ 13%",
      tax: "58.50",
      net: "450.00",
    },
    {
      id: 1362,
      style:"Canadian",
      type:"ABCD Quation",
      date: "05/09/2024",
      dueDate: "05/10/2024",
      shipDate: "05/09/2024",
      shipVia: "UPS",
      salesRep: "Akj Vert",
      purchaseOrder: "SO-AL859j5",
      subtotal: "720.00",
      hst: "93.60",
      total: "813.60",
      balanceDue: "813.60",
      taxRate: "HST (ON) @ 13%",
      tax: "93.60",
      net: "720.00",
    },
  ];
  useEffect(() => {
    // Simulate an initial POST request to show the first invoice
    if (invoices.length > 0) {
      const firstInvoice = invoices[0];
      setSelectedInvoice(firstInvoice); // Set the first invoice as selected
    }
  }, []);

  const sendInvoiceData = (style) => {
    const payload = {
        orgId: props.orgId,
      type: style.style,
    };

    axios
    .post(`${base_url2}/template`,payload, 
      {
        headers: {
          Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
        },
      }
    )
      .then((response) => {
        console.log("POST successful", response.data);
      })
      .catch((error) => {
        console.error("POST failed", error);
      });
  };
//   const handleInvoiceSelect = (invoice) => {
//     setSelectedInvoice(invoice);
//     sendInvoiceData(invoice); // Post data when invoice is selected
//   };
const handleTemplateSelection = () => {
    if (selectedInvoice) {
      sendInvoiceData(selectedInvoice);
    }
  };


  return (
    <div className="bg-[white] min-h-screen p-5">
      <div className="mx-auto flex space-x-5">
        {/* Left Column - List of Invoices */}
        <div className="w-1/4 bg-white p-4 h-[80vh] overflow-auto">
          <h3 className="text-xl font-bold mb-3">ORDER</h3>
          <ul>
            {invoices.map((invoice) => (
              <>
              <div className="font-semibold text-sm">{invoice.style}</div>
              <li 
                key={invoice.id}
                className={`p-3 mb-2 cursor-pointer hover:bg-gray-200 rounded-lg ${
                  selectedInvoice?.id === invoice.id ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setSelectedInvoice(invoice)}
              >
                <div className="font-bold">Invoice #{invoice.id}</div>
                <div>Date: {invoice.date}</div>
                <div>Due Date: {invoice.dueDate}</div>
              </li>
              </>
            ))}
          </ul>
        </div>

        {/* Right Column - Preview of Selected Invoice */}
        <div className="w-3/4 bg-white font-sans h-[80vh] overflow-x-auto p-5">
          {selectedInvoice ? (
            <>
              {/* Header */}
              <div className="flex justify-between">
                <div className="flex flex-col text-sm">
                  <div className="font-bold">{selectedInvoice.type}</div>
                  <div>FLorandc</div>
                  <div>Gablinf </div>
                  <div>+5676785645</div>
                  <div>sales@1di.ca</div>
                  <div>GST/HST Registration No.: 867543</div>
                </div>
                <div>
                  <img src="Logo_new.png" alt="Logo" className="w-[100px]" />
                </div>
              </div>

              {/* Title */}
              <div className="text-teal-600 font-medium text-2xl mt-2">ORDER</div>

              {/* Billing and Shipping */}
              <div className="flex justify-between text-sm mt-2">
                <div className="flex flex-col">
                  <div className="font-bold">BILL TO</div>
                  <div>Soud Eroty</div>
                  <div>KL humn sdfs </div>
                  <div>89 Umajon</div>
                  <div>Mall, Unit 2045</div>
                  <div>Okain</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">SHIP TO</div>
                  <div>Soud Eroty</div>
                  <div>KL humn sdfs </div>
                  <div>89 Umajon</div>
                  <div>Mall, Unit 2045</div>
                  <div>Okain</div>
                </div>
                <div className="flex">
                  <div className="flex flex-col text-right">
                    <div className="font-bold">INVOICE {selectedInvoice.id}</div>
                    <div className="font-bold">DATE</div>
                    <div className="font-bold">DUE DATE</div>
                    <div className="font-bold">TERMS Net</div>
                  </div>
                  <div className="text-left ml-2">
                    <div>{selectedInvoice.id}</div>
                    <div>{selectedInvoice.date}</div>
                    <div>{selectedInvoice.dueDate}</div>
                    <div>30</div>
                  </div>
                </div>
              </div>

              <hr className="mt-4" />

              {/* Shipping Info */}
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-bold">SHIP DATE</div>
                  <div>{selectedInvoice.shipDate}</div>
                </div>
                <div>
                  <div className="font-bold">SHIP VIA</div>
                  <div>{selectedInvoice.shipVia}</div>
                </div>
                <div>
                  <div className="font-bold">SALES REP</div>
                  <div>{selectedInvoice.salesRep}</div>
                </div>
                <div>
                  <div className="font-bold">PURCHASE ORDER #</div>
                  <div>{selectedInvoice.purchaseOrder}</div>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col text-xs mt-4">
                <div className="flex justify-between text-teal-600 bg-[#8cbee6]">
                  <div>SKU</div>
                  <div>DESCRIPTION</div>
                  <div>QTY</div>
                  <div>RATE</div>
                  <div>AMOUNT</div>
                </div>
                <div className="flex justify-between mt-1">
                  <div className="w-[36px]">KES477</div>
                  <div className="ml-[-12px] w-[138px]">
                    <div className="font-bold">477 | Tuinsk Kumar</div>
                    <div>477 | Tuinsk Kumar</div>
                  </div>
                  <div className="ml-[-52px] w-[28px]">36</div>
                  <div className="ml-[-2px] w-[42px]">12.50</div>
                  <div className="ml-[-2px] w-[50px]">450.00</div>
                </div>
              </div>

              <hr className="border-t border-dotted mt-5" />

              {/* Totals */}
              <div className="flex justify-end text-sm mt-4">
                <div>
                  <div>SUBTOTAL</div>
                  <div>HST (ON) @ 13%</div>
                  <div>TOTAL</div>
                  <div>BALANCE DUE</div>
                </div>
                <div className="ml-20">
                  <div>{selectedInvoice.subtotal}</div>
                  <div>{selectedInvoice.hst}</div>
                  <div>{selectedInvoice.total}</div>
                  <div className="text-2xl font-bold">CAD {selectedInvoice.balanceDue}</div>
                </div>
              </div>
              <div className="mt-5">
          <h4 className="font-bold">TAX SUMMARY</h4>
          <div className="text-xs">
            <div className="flex justify-between bg-[#8cbee6] text-teal-600">
              <div className="w-[80px] flex justify-end">RATE</div>
              <div>TAX</div>
              <div>NET</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="ml-4">HST (ON) @ 13%</div>
              <div>58.50</div>
              <div>450.00</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="font-bold mt-12 flex justify-center">
          Please send all EFT remittance to Sales@1Di.ca
        </footer>
            </>
          ) : (
            <div className="text-center text-gray-500">Select an invoice to preview</div>
          )}
        </div>
      </div>
      <Button
            type="Primary"
        onClick={handleTemplateSelection}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        Select Template
      </Button>
    </div>
  );
};

const mapStateToProps = ({ settings, auth }) => ({
    orgId: auth.userDetails.organizationId,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTemplate);
  


