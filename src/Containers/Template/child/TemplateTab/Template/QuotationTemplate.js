import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { base_url2 } from "../../../../../Config/Auth";

const QuotationTemplate = (props) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    {
      id: 1361,
      style:"American",
      date: "30/08/2024",
      dueDate: "29/09/2024",
      shipDate: "30/08/2024",
      shipVia: "MIKE DROPOFF",
      salesRep: "Tracy Sales",
      purchaseOrder: "BO-TM9456525",
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
      date: "05/09/2024",
      dueDate: "05/10/2024",
      shipDate: "05/09/2024",
      shipVia: "UPS",
      salesRep: "Alex Martinez",
      purchaseOrder: "PO-AL7658934",
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
     // Post the data of the first invoice
    }
  }, []);

  const sendInvoiceData = (invoice) => {
    const payload = {
        orgId: props.orgId,
        type: invoice?.style || "Smart",
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
          <h3 className="text-xl font-bold mb-3">Quotation</h3>
          <ul>
          
            {invoices.map((invoice) => (
                <>
                   <div className="font-semibold text-sm">{invoice.style}</div>
              <li
                key={invoice.id}
                className={`p-3 mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg ${
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

<div className="font-semibold text-sm">Smart</div>
              <li
                className={`p-3 mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg ${
                  selectedInvoice?.style === "Smart" ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setSelectedInvoice({ style: "Smart" })}
              >
                <div className="font-bold">Invoice #302218158</div>
                <div>Date: 30-09-2024</div>
                <div></div>
              </li>
          </ul>
        </div>

        {/* Right Column - Preview of Selected Invoice */}
        <div className="w-3/4 bg-white font-sans h-[80vh] overflow-x-auto p-5">
        {selectedInvoice ? (
            selectedInvoice.style === "Smart" ? (
              <div className="container mx-auto p-5">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-700">KRG ASIAN FOOD</h1>
                <h5 className="text-sm">
                  BTW: NL86402939B01 BANKDETAILS: ING Bank: 0878381 BIC Code: INGBNL2A IBAN: NL74INGB0000878381
                </h5>
              </div>
        
              <div>
                <table className="w-full table-auto">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        Remon Afro Asian Market<br />
                        West-Kruiskade 87<br />
                        3014 AN Rotterdam<br />
                        Nederland<br />
                        afro_asianmarket@hotmail.com
                      </td>
                      <td className="text-center p-2">
                        <h1 className="text-2xl font-bold">Offerte</h1>
                      </td>
                      <td className="text-right p-2">
                        Offertenummer: 302218158<br />
                        Relatienummer: 2 <br />
                        Datum: 30-09-2024<br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
        
              <div>
                <table className="w-full table-auto border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr>
                      <th className="p-2 border border-gray-300 text-left">Aantal</th>
                      <th className="p-2 border border-gray-300 text-left">Omschrijving</th>
                      <th className="p-2 border border-gray-300 text-left">BTW</th>
                      <th className="p-2 border border-gray-300 text-left">Prijs</th>
                      <th className="p-2 border border-gray-300 text-left">Totaal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample Invoice Data */}
                    <tr>
                      <td className="p-2 border border-gray-300">1.00</td>
                      <td className="p-2 border border-gray-300">TRS Gramflour Besan (12 x 1 kg)</td>
                      <td className="p-2 border border-gray-300">9</td>
                      <td className="p-2 border border-gray-300">25.07</td>
                      <td className="p-2 border border-gray-300">25.07</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-gray-300">3.00</td>
                      <td className="p-2 border border-gray-300">Heera Powa Medium (6 x 1 kg)</td>
                      <td className="p-2 border border-gray-300">9</td>
                      <td className="p-2 border border-gray-300">14.02</td>
                      <td className="p-2 border border-gray-300">42.06</td>
                    </tr>
                    {/* More rows can be added here following the same structure */}
                  </tbody>
                </table>
              </div>
        
              <div className="footer mt-8">
                <div className="flex justify-between">
                  <table className="w-1/2 table-auto">
                    <thead>
                      <tr>
                        <th className="p-2 border border-gray-300 text-left">BTW %</th>
                        <th className="p-2 border border-gray-300 text-left">Grondslag</th>
                        <th className="p-2 border border-gray-300 text-left">Bedrag</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-gray-300">9.00</td>
                        <td className="p-2 border border-gray-300">565.42</td>
                        <td className="p-2 border border-gray-300">50.89</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-gray-300">21.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                        <td className="p-2 border border-gray-300">0.00</td>
                      </tr>
                    </tbody>
                  </table>
        
                  <table className="w-1/2 table-auto ml-4">
                    <tbody>
                      <tr>
                        <td className="p-2 text-right font-bold">Totaal excl. btw</td>
                        <td className="p-2">€ 565.42</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-right font-bold">Totaal btw</td>
                        <td className="p-2">€ 50.89</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-right font-bold">Offertebedrag</td>
                        <td className="p-2">€ 616.31</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            ) :  (
            <>
              {/* Header */}
              <div className="flex justify-between">
                <div className="flex flex-col text-sm">
                  <div className="font-bold">1 Di Inc.</div>
                  <div>21A-81 Northern Heights Drive</div>
                  <div>Richmond Hill ON L4B 4C9</div>
                  <div>+14162780878</div>
                  <div>sales@1di.ca</div>
                  <div>GST/HST Registration No.: 71265570</div>
                </div>
                <div>
                  <img src="Logo_new.png" alt="Logo" className="w-[100px]" />
                </div>
              </div>

              {/* Title */}
              <div className="text-teal-600 font-medium text-2xl mt-2">Quotation</div>

              {/* Billing and Shipping */}
              <div className="flex justify-between text-sm mt-2">
                <div className="flex flex-col">
                  <div className="font-bold">BILL TO</div>
                  <div>Robert Cowman</div>
                  <div>FG Bradley's Fairview</div>
                  <div>1800 Sheppard Ave E. Fairview</div>
                  <div>Mall, Unit 2045</div>
                  <div>Toronto Ontario M2J 5A7</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">SHIP TO</div>
                  <div>Robert Cowman</div>
                  <div>FG Bradley's Fairview</div>
                  <div>1800 Sheppard Ave E. Fairview</div>
                  <div>Mall, Unit 2045</div>
                  <div>Toronto Ontario M2J 5A7</div>
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
                    <div className="font-bold">477 | Jumbo Foam D20</div>
                    <div>477 | Jumbo Foam D20</div>
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
            </>  )
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuotationTemplate);

