import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

const InvoiceTemplateTable = ({ props }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
const invoiceData =  [
{
  
        name: "1 Di Inc.",
        address: "21A-81 Northern Heights Drive, Richmond Hill ON L4B 4C9",
        phone: "+14162780878",
        email: "sales@1di.ca",
        gstNo: "71265570",
        logo: "Logo_new.png", // Replace with the actual logo path
            name: "Robert Cowman",
            company: "FG Bradley's Fairview",
            address: "1800 Sheppard Ave E. Fairview, Mall, Unit 2045, Toronto Ontario M2J 5A7",
            name: "Robert Cowman",
            company: "FG Bradley's Fairview",
            address: "1800 Sheppard Ave E. Fairview, Mall, Unit 2045, Toronto Ontario M2J 5A7",
        id: "1361",
        date: "30/08/2024",
        dueDate: "29/09/2024",
        terms: "Net 30",
        shipDate: "30/08/2024",
        shipVia: "MIKE DROPOFF",
        salesRep: "Tracy Sales",
        purchaseOrder: "BO-TM9456525",
    
            sku: "KES477",
            description: "477 | Jumbo Foam D20",
            qty: 36,
            rate: 12.50,
            amount: 450.00,
     
        subtotal: 450.00,
        hst: 58.50,
        total: 508.50,
        balanceDue: 508.50
  
}
]
useEffect(() => {
    // Simulate an initial POST request to show the first invoice
    if (invoiceData.length > 0) {
      const firstInvoice = invoiceData[0];
      setSelectedInvoice(firstInvoice); // Set the first invoice as selected
      sendInvoiceData(firstInvoice); // Post the data of the first invoice
    }
  }, []);
  const sendInvoiceData = (name) => {
    const payload = {
       // orgId: props.orgId,
      type: name.name,
    };

    axios
      .post("https://dummyurl.com/invoice", payload)
      .then((response) => {
        console.log("POST successful", response.data);
      })
      .catch((error) => {
        console.error("POST failed", error);
      });
  };
  const handleTemplateSelection = () => {
    if (selectedInvoice) {
      sendInvoiceData(selectedInvoice);
    }
  };
    return (
        <div className="bg-[#eaedf1] min-h-screen p-5">
             <div className="mx-auto flex space-x-5">
             <div className="w-1/4 bg-white p-4 h-[80vh] overflow-auto">
          <h3 className="text-xl font-bold mb-3">Invoice</h3>
          <ul>
            {invoiceData.map((invoice) => (
              <li
                key={invoice.id}
                className={`p-3 mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg ${
                  selectedInvoice?.id === invoice.id ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedInvoice(invoice)}
              >
                <div className="font-bold">Invoice #{invoice.id}</div>
                <div>Date: {invoice.date}</div>
                <div>Due Date: {invoice.dueDate}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 bg-white font-sans h-[80vh] overflow-x-auto p-5">
        {selectedInvoice ? (
            <>
                <div className="flex justify-between">
                    <div className="flex flex-col text-sm">
                        <div className="font-bold">{selectedInvoice.name}</div>
                        <div>{selectedInvoice.address}</div>
                        <div>{selectedInvoice.phone}</div>
                        <div>{selectedInvoice.email}</div>
                        <div>GST/HST Registration No.: {selectedInvoice.gstNo}</div>
                    </div>
                    <img src={selectedInvoice.logo} alt="Company Logo" width="100px" />
                </div>

                <h1 className="text-teal-600 font-medium text-2xl mt-2">INVOICE</h1>

                <div className="flex justify-between text-sm mt-2">
                    <div className="flex flex-col">
                        <div className="font-bold">BILL TO</div>
                        <div>{selectedInvoice.name}</div>
                        <div>{selectedInvoice.company}</div>
                        <div>{selectedInvoice.address}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">SHIP TO</div>
                        <div>{selectedInvoice.name}</div>
                        <div>{selectedInvoice.company}</div>
                        <div>{selectedInvoice.address}</div>
                    </div>
                    <div className="flex flex-col text-right">
                        <div className="font-bold">INVOICE {selectedInvoice.id}</div>
                        <div className="font-bold">DATE</div>
                        <div className="font-bold">DUE DATE</div>
                        <div className="font-bold">TERMS</div>
                    </div>
                    <div className="text-left ml-2">
                        <div>{selectedInvoice.date}</div>
                        <div>{selectedInvoice.dueDate}</div>
                        <div>{selectedInvoice.terms}</div>
                    </div>
                </div>
                
                <hr className="my-2" />

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

                <div className="flex flex-col text-xs mt-4">
                    <div className="flex justify-between bg-blue-300 text-teal-600">
                        <div>SKU</div>
                        <div>DESCRIPTION</div>
                        <div>QTY</div>
                        <div>RATE</div>
                        <div>AMOUNT</div>
                    </div>
                  
                        <div className="flex justify-between mt-1" >
                            <div className="w-36">{selectedInvoice.sku}</div>
                            <div className="ml-2 w-1/2">
                                <div className="font-bold">{selectedInvoice.description}</div>
                            </div>
                            <div className="ml-2 w-28">{selectedInvoice.qty}</div>
                            <div className="ml-2 w-28">{selectedInvoice.rate.toFixed(2)}</div>
                            <div className="ml-2 w-28">{selectedInvoice.amount.toFixed(2)}</div>
                        </div>

                </div>

                <hr className="border-dotted mt-2" />

                <div className="flex justify-end text-sm">
                    <div>
                        <div>SUBTOTAL</div>
                        <div>HST (ON) @ 13%</div>
                        <div>TOTAL</div>
                        <div>BALANCE DUE</div>
                    </div>
                    <div className="ml-16">
                        <div>{selectedInvoice.subtotal.toFixed(2)}</div>
                        <div>{selectedInvoice.hst.toFixed(2)}</div>
                        <div>{selectedInvoice.total.toFixed(2)}</div>
                        <div className="text-lg font-bold">CAD {selectedInvoice.balanceDue.toFixed(2)}</div>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold">TAX SUMMARY</h4>
                    <div className="text-xs">
                        <div className="flex justify-between bg-blue-300 text-teal-600">
                            <div className="w-20 text-right">RATE</div>
                            <div>TAX</div>
                            <div>NET</div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="ml-4">HST (ON) @ 13%</div>
                            <div>{selectedInvoice.hst.toFixed(2)}</div>
                            <div>{selectedInvoice.subtotal.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                <footer className="font-bold mt-[482px] text-center">
                    Please send all EFT remittance to {selectedInvoice.email}
                </footer>
                </>
          ) : (
            <div className="text-center text-gray-500">Select an invoice to preview</div>
          )}
            </div>
            <Button
            type="Primary"
        onClick={handleTemplateSelection}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        Select Template
      </Button>
      </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTemplateTable);
  

   



