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
      shipVia: "Psv offn",
      salesRep: "Tracy Sales",
      purchaseOrder: "BOi-TM56456",
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
      salesRep: "Bron Bkrey",
      purchaseOrder: "SO-AL5456765",
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
    if (invoices.length > 0) {
      const firstInvoice = invoices[0];
      setSelectedInvoice(firstInvoice); 
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
                <div className="font-bold">Invoice #43545465</div>
                <div>Date: 30-09-2024</div>
                <div></div>
              </li>

              <div className="font-semibold text-sm">Special</div>
              <li
                className={`p-3 mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg ${
                  selectedInvoice?.style === "Special" ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setSelectedInvoice({ style: "Special" })}
              >
                <div className="font-bold">Invoice #s546643</div>
                <div>Date: 14-08-2024</div>
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
                <h1 className="text-3xl font-bold text-blue-700">NKJ ASIAN FOOD</h1>
                <h5 className="text-sm">
                  LTW: NL86402939B02 BANKDETAILS: KNG Bank: 0878385 BIC Code: INGBNL2A JBAN: NL74INGB0000878381
                </h5>
              </div>
        
              <div>
                <table className="w-full table-auto">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        Gauxsit Market<br />
                        West-Kuancd 87<br />
                        3014 AN Rotterdam<br />
                        Nederland<br />
                        guanmarket@hotmail.com
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
                        <td className="p-2 border border-gray-300">10.00</td>
                        <td className="p-2 border border-gray-300">457.42</td>
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
                        <td className="p-2">€ 584.42</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-right font-bold">Totaal btw</td>
                        <td className="p-2">€ 62.89</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-right font-bold">Offertebedrag</td>
                        <td className="p-2">€ 647.31</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            ) :   selectedInvoice.style === "Special" ? (
              <div className="container mx-auto p-6 shadow-lg bg-white rounded-lg my-4">
              {/* Header Section */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-3xl font-bold text-blue-600">DPAKNS</h1>
                <div className="text-right">
                  <p><strong>Company Name:</strong> DPAKNS Ventures PVT. LTD.</p>
                  <p><strong>Address:</strong> Plot No. D/168, Sector-7, CDA, Cuttack, Odisha - 753014</p>
                  <p><strong>Telephone:</strong> 1800 532 8776 / +91-9556344705</p>
                  <p><strong>Website:</strong> <a href="http://www.dpakssn.com" className="text-blue-500" target="_blank" rel="noopener noreferrer">www.dpakssn.com</a></p>
                </div>
              </div>
        
              {/* Image Section */}
              <div className="flex mt-8">
                <div className="w-full h-60">
                  <img src="image1.jpg" alt="Image 1" className="w-full h-full object-cover" />
                </div>
              </div>
        
              <div className="text-center text-sm text-gray-600 mt-8">An initiative of DPAKNS VENTURES PRIVATE LIMITED</div>
        
              {/* First Quotation Section */}
              <div className="mx-auto p-6 bg-white shadow-lg rounded-md">
                <p className="text-lg leading-relaxed mb-6">Dear Sir/Ma’am,</p>
        
                <p className="text-base leading-relaxed mb-4">
                  I appreciate this opportunity to write to you. We, at KAPSSN, applaud the outstanding success made by Prayas Higher Secondary College under your leadership. And we believe the college will see exponential growth along with our added help.
                </p>
        
                <p className="text-base leading-relaxed mb-4">
                  KAPSSN is an educational aggregator with competence in bridging the gap between traditional and smart education. We fulfill the needs of schools/colleges throughout the country and assist in their transformation.
                </p>
        
                <p className="text-base leading-relaxed mb-4">
                  We are a B2B EdTech company situated in Bhubaneswar with nationwide operations. Our mission is to provide innovative educational facilities to schools/colleges at an affordable price to meet the newest academic standards.
                </p>
        
                <p className="text-base leading-relaxed mb-4">
                  KAPSSN is the country's sole educational aggregator. We take pride in contributing cutting-edge technology, pedagogical goods, and services. We help in revolutionizing schools/colleges and enhancing the quality of education in classrooms.
                </p>
        
                <p className="text-base leading-relaxed mb-4">
                  With the reform of educational policies, we believe traditional schooling methods should also evolve to incorporate modern technologies and goods. We, at KAPSSN, primarily aim to assist in undergoing such a transition and would love to be associated with your college.
                </p>
        
                <p className="text-base leading-relaxed mb-4">
                  We appreciate you trusting us with your important time and guarantee that your patience will not be in vain. For your convenience, I've attached the complete quotation as per your requirement.
                </p>
        
                <div className="mt-8">
                  <p className="text-base leading-relaxed mb-2">Thank you,</p>
                  <p className="font-semibold text-base">Daynand Pal</p>
                  <p className="text-base">Founder & CEO</p>
                </div>
              </div>
        
              {/* Product Table (Without table, using grid) */}
              <div className="mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-6">Special Quotation for Subramanyam HS College</h2>
                <h4 className="text-2xl font-semibold text-center mb-6">School Digital Bell (For 60 Capacity)</h4>
        
                <div className="space-y-4">
                  {/* Row 1: Header Titles */}
                  <div className="flex bg-gray-100 p-4 rounded-md">
                    <div className="w-1/12 font-semibold text-left">SL No.</div>
                    <div className="w-2/12 font-semibold text-left">Model No.</div>
                    <div className="w-4/12 font-semibold text-left">Specification</div>
                    <div className="w-1/12 font-semibold text-left">Qty.</div>
                    <div className="w-2/12 font-semibold text-left">Rate</div>
                    <div className="w-2/12 font-semibold text-left">Total Amount (GST Included)</div>
                  </div>
        
                  {/* Row 2 */}
                  <div className="flex bg-white p-4 rounded-md">
                    <div className="w-1/12">1</div>
                    <div className="w-2/12">Master wI-2</div>
                    <div className="w-4/12">60 Rooms Master Unit for School Bell & PA System</div>
                    <div className="w-1/12">1</div>
                    <div className="w-2/12">39,150</div>
                    <div className="w-2/12">39,150</div>
                  </div>
        
                  {/* Row 3 */}
                  <div className="flex bg-gray-50 p-4 rounded-md">
                    <div className="w-1/12">2</div>
                    <div className="w-2/12">Slave BS-51S-N</div>
                    <div className="w-4/12">Speaker with Talk Back Facility</div>
                    <div className="w-1/12">50</div>
                    <div className="w-2/12">2,899</div>
                    <div className="w-2/12">1,44,950</div>
                  </div>
        
                  {/* Additional rows can be added similarly... */}
        
                  <div className="mt-6 text-right">
                    <p className="text-lg font-semibold">Total Amount: 3,47,674</p>
                  </div>
        
                  <div className="mt-4 text-sm text-gray-700">
                    <p>*Price will vary as per the requirement. (Logistics & Installation Charges are Included)</p>
                    <p>*Note: Wire Charges will be extra if required*</p>
                    <p>*WARRANTY: 1 YEAR</p>
                  </div>
                </div>
        
                <div className="mt-8 text-center text-sm text-gray-600">An initiative of DPAKNS VENTURES PRIVATE LIMITED</div>
        
                {/* Clients Section */}
                <h4 className="text-xl font-semibold text-center mt-8">OUR CLIENTS</h4>
        
                <div className="flex mt-8">
                  <div className="w-full h-60">
                    <img src="image1.jpg" alt="Image 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-60">
                    <img src="image2.jpg" alt="Image 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-60">
                    <img src="image3.jpg" alt="Image 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-60">
                    <img src="image4.jpg" alt="Image 4" className="w-full h-full object-cover" />
                  </div>
                </div>
        
                {/* Footer Section */}
                <div className="text-center text-sm text-gray-600 mt-8">An initiative of DPAKNS VENTURES PRIVATE LIMITED</div>
              </div>
            </div> ) :(
            <>
              {/* Header */}
              <div className="flex justify-between">
                <div className="flex flex-col text-sm">
                  <div className="font-bold">1 Di Inc.</div>
                  <div>21A-81 Sorthern Heightds Drive</div>
                  <div>Gakmxsb Hill ON L4B 4C9</div>
                  <div>+14162780855</div>
                  <div>sales@1di.ca</div>
                  <div>GST/HST Registration No.: 71265571</div>
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
                  <div>Kna jBdv</div>
                  <div>Numakxn djnsd</div>
                  <div>1800 Sheppard Ave E. Fairview</div>
                  <div>Mall, Unit 2045</div>
                  <div>Toronto Ontario M2J 5A7</div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold">SHIP TO</div>
                  <div>Kna jBdv</div>
                  <div>Numakxn djnsd</div>
                  <div>1801 66 Ksn E. tecds</div>
                  <div>Mall, Unit 2045</div>
                  <div>Sartnf Lunk M2J 5A7</div>
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
                    <div className="font-bold">477 | Lux sokj</div>
                    <div>477 | Lux sokj</div>
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

