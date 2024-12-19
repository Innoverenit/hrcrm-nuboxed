import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { base_url2 } from "../../../../../Config/Auth";

const InvoiceTemplateTable = ({ props }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
const invoiceData =  [
{
  
        name: "ABCD.",
        style:"Canadian",
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
    if (invoiceData.length > 0) {
      const firstInvoice = invoiceData[0];
      setSelectedInvoice(firstInvoice); 
    }
  }, []);
  const sendInvoiceData = (invoice) => {
    const payload = {
     // orgId: props.organizationId,
       type: invoice.style,
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
             <div className="w-1/4 bg-white p-4 h-[80vh] overflow-auto">
          <h3 className="text-xl font-bold mb-3">Invoice</h3>
          <ul>
            {invoiceData.map((invoice) => (
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

            <div className="font-semibold text-sm">Kaf</div>
              <li
                className={`p-3 mb-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg ${
                  selectedInvoice?.style === "Kaf" ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setSelectedInvoice({ style: "Kaf" })}
              >
                <div className="font-bold">Invoice #302218158</div>
                <div>Date: 30-09-2024</div>
                <div></div>
              </li>
          </ul>
        </div>
        <div className="w-3/4 bg-white font-sans h-[80vh] overflow-x-auto p-5">
        {selectedInvoice ? (
            selectedInvoice.style === "Kaf" ? (
              <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">

              {/* Header */}
              <div className="mb-8 w-[60%] ml-auto">
                <h1 className="text-4xl font-bold text-gray-800">KRG ASIAN FOOD</h1>
                <hr className="my-4 border-gray-300" />
                <div className="flex justify-between">
                  <div>
                    <p>Sevillaweg 90 <br /> 3047 AL Rotterdam <br /> The Netherlands <br /> 0031 (10) 415679</p>
                  </div>
                  <div className="text-center">
                    <p>KVK: 86619853 <br /> BTW: NL864024939B01 <br /> info@krgasianfood.com <br /> www.krgasianfood.com</p>
                  </div>
                  <div className="text-right">
                    <p>Bankdetails: <br /> ING Bank: 0878381 <br /> BIC Code nr: INGBNL2A <br /> BTW: NL864024939B01 <br /> IBAN: NL74INGB0000878381</p>
                  </div>
                </div>
              </div>
        
              {/* Invoice Info */}
              <div className="w-full mb-8">
                <div className="flex justify-between">
                  {/* Left Section */}
                  <div className="w-1/3 text-left">
                    <strong>Remon Afro Asian Market</strong><br />
                    West-Kruiskade 87<br />
                    3014 AN Rotterdam<br />
                    Nederland<br />
                    Email: Info@krgasianfood.com<br />
                    Order info:
                  </div>
        
                  {/* Center Section */}
                  <div className="w-1/3 text-center">
                    <h5 className="text-lg font-bold">PLEASE MENTION OUR INVOICE NUMBER WHILE PROCESSING THE PAYMENT</h5>
                    <strong>Factuur</strong><br />
                    Tel no: 010 414 0955 <br />
                    Mob: 06 3433 6633
                  </div>
        
                  {/* Right Section */}
                  <div className="w-1/3 text-right">
                    Factuurnummer: KRG247163<br />
                    Klantnummer: 2<br />
                    Factuurdatum: 01-10-2024
                  </div>
                </div>
              </div>
        
              {/* Items Section */}
              <div className="flex flex-col mb-8 bg-gray-100 p-4 rounded-lg">
                <div className="flex font-semibold text-gray-700 mb-2">
                  <div className="w-1/6">Artikelcodes</div>
                  <div className="w-1/6">Aantal</div>
                  <div className="w-2/6">Omschrijving</div>
                  <div className="w-1/6">BTW</div>
                  <div className="w-1/6">Prijs</div>
                  <div className="w-1/6">Totaal</div>
                </div>
        
                {/* Item Row 1 */}
                <div className="flex mb-2 border-t pt-2">
                  <div className="w-1/6">TRSGF1</div>
                  <div className="w-1/6">1.00</div>
                  <div className="w-2/6">TRS Gramflour Besan (12 x 1 kg)</div>
                  <div className="w-1/6">9</div>
                  <div className="w-1/6">25.07</div>
                  <div className="w-1/6">25.07</div>
                </div>
        
                {/* Item Row 2 */}
                <div className="flex mb-2 border-t pt-2">
                  <div className="w-1/6">TRSABC1</div>
                  <div className="w-1/6">2.00</div>
                  <div className="w-2/6">TRS Another Item</div>
                  <div className="w-1/6">9</div>
                  <div className="w-1/6">10.00</div>
                  <div className="w-1/6">20.00</div>
                </div>
              </div>
        
              {/* Summary Section */}
              <div className="flex justify-between mb-8 space-x-8">
                {/* Tax Breakdown Section */}
                <div className="w-1/3 mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex mb-4 font-semibold text-gray-700">
                    <div className="w-1/3 text-left">
                      <strong>Btw %</strong>
                    </div>
                    <div className="w-1/3 text-left">
                      <strong>Grondslag</strong>
                    </div>
                    <div className="w-1/3 text-left">
                      <strong>Bedrag</strong>
                    </div>
                  </div>
        
                  {/* Row 1 */}
                  <div className="flex mb-2">
                    <div className="w-1/3 py-2 px-4 border border-gray-300">0.00</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">9</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">565.42</div>
                  </div>
        
                  {/* Row 2 */}
                  <div className="flex mb-2">
                    <div className="w-1/3 py-2 px-4 border border-gray-300">9.00</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">0.00</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">50.89</div>
                  </div>
        
                  {/* Row 3 */}
                  <div className="flex mb-2">
                    <div className="w-1/3 py-2 px-4 border border-gray-300">21.00</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">0.00</div>
                    <div className="w-1/3 py-2 px-4 border border-gray-300">0.00</div>
                  </div>
                </div>
        
                {/* Signature Section */}
                <div className="w-1/3 border p-4 bg-gray-50">
                  <strong>Handtekening voor ontvangst</strong>
                </div>
        
                {/* Total Section */}
                <div className="w-1/3 border p-4 bg-gray-50">
                  <div className="flex justify-between py-2">
                    <strong>Totaal gewicht</strong>
                    <span>202.5 kg</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <strong>Totaal excl. btw</strong>
                    <span>€ 565.42</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <strong>Totaal btw</strong>
                    <span>€ 50.89</span>
                  </div>
                  <div className="flex justify-between py-2 border-t mt-4">
                    <strong>Factuurbedrag</strong>
                    <strong>€ 616.31</strong>
                  </div>
                </div>
              </div>
        
            </div>
            ):
            <>   
        <style>
        {`
        
        .container {
            width: 80%;
            margin: auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .company-info {
            display: inline-block; 
            width: 100%;
          }

          .company-details {
            display: inline-block;
            vertical-align: top; 
            width: calc(100% - 120px); 
          }

          .company-logo {
            display: inline-block; 
            vertical-align: top; 
            width: 100px; 
            margin-left: 20px;
          }

          footer {
            margin-top: 20px;
            text-align: center;
          }

          .text-black {
            color: black;
          }

          .font-bold {
            font-weight: bold;
          }

          .text-sm {
            font-size: 0.875rem; 
          }
        `}
      </style>
      <div className="container">
      <div className="company-info">
            <div className='company-details text-sm '>
              <p className='text-black font-bold'>   {selectedInvoice.name}</p>
              <p className='text-black'>{selectedInvoice.address}</p>
              <p className='text-black'>{selectedInvoice.phone}</p>
              <p className='text-black'>{selectedInvoice.email}</p>
              <p className='text-black'>GST/HST Registration No.: {selectedInvoice.gstNo}</p>
            </div>
            </div>
           <div className="company-logo"> 
            <img src={selectedInvoice.logo} alt="Company Logo" width="100px" />
            </div>
            </div>
    
            
             {/* <div class="container">
             <div class="sub-container">
               <table>
              <thead className="text-sm">
                <tr>
                <p className='text-black font-bold'>{selectedInvoice.name}</p>
          
                </tr>
                <tr>
               <p className='text-black'>{selectedInvoice.address}</p>
              <p className='text-black'>{selectedInvoice.phone}</p>
              <p className='text-black'>{selectedInvoice.email}</p>
              <p className='text-black'>GST/HST Registration No.: {selectedInvoice.gstNo}</p>
                </tr>
              </thead>
            </table> 
            </div>
             <div class="logo"> 
            <img src={selectedInvoice.logo} alt="Company Logo" width="100px" />
            </div> 
           </div> */}

                {/* <div className="flex justify-between">
                    <div className="flex  text-sm">
                        <div className="font-bold">{selectedInvoice.name}</div>
                        <div>{selectedInvoice.address}</div>
                        <div>{selectedInvoice.phone}</div>
                        <div>{selectedInvoice.email}</div>
                        <div>GST/HST Registration No.: {selectedInvoice.gstNo}</div>
                    </div>
                    <img src={selectedInvoice.logo} alt="Company Logo" width="100px" />
                </div> */}

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
  organizationId: auth.userDetails.organizationId,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTemplateTable);
  

   



