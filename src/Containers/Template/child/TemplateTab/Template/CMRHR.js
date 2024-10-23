import React from 'react';
import Pdfuipage from './Pdfuipage'; // Adjust the import path
import { Button } from 'antd'
import moment from 'moment';
import jsPDF from "jspdf";
import "jspdf-autotable";

const voucherBillData = {
    date: '2023-10-23',
    customerName: 'John Doe',
    invoiceNumber: 'INV-001',
    items: [
      { name: 'Item 1', quantity: 2, price: 10.99 },
      { name: 'Item 2', quantity: 1, price: 7.49 },
      // Add more items as needed
    ],
  }
function CMR (props){

  const exportTemplateCMRPage = async () => {
    var doc = new jsPDF();

    var name1 = `HEADER 1 :`
    var name2 = `HEADER 2 :`
    var value = "4"
    var header = `Exemplar für
Copy for`

    doc.setFillColor(2, 179, 34);
    doc.rect(0, 0, 230, 16, 'F');
    doc.setFontSize(25);
    doc.text(value, 3, 10)
    doc.setFontSize(12);
    doc.text(header, 11, 6)

    doc.setFontSize(10);
    doc.setDrawColor(0, 255, 0)
    doc.rect(5, 16, 100, 30); // x, y, width, height //make box 2
    doc.text(name1, 30, 21);
    // doc.text("Content/Text of box -1", 8, 26);

    doc.setDrawColor(0, 255, 0)
    doc.rect(105, 16, 100, 30); ///make box 1
    doc.text(name2, 140, 21);
    // doc.text("Content/Text of box -2", 110, 26);


    doc.save(`CMR_template ${moment().format("L")}`);

}
const exportPDFCMRPage = async () => {
    var doc = new jsPDF();

    var name1 = `HEADER 1 :`
    var name2 = `HEADER 2 :`
    var value = "4"
    var header = `Exemplar für
Copy for`

    doc.setFillColor(2, 179, 34); 
    doc.rect(0, 0, 230, 16, 'F');
    doc.setFontSize(25);
    doc.text(value, 3, 10)
    doc.setFontSize(12);
    doc.text(header, 11, 6)

    doc.setFontSize(10);
    doc.setDrawColor(0, 255, 0)
    doc.rect(5, 16, 100, 30); // x, y, width, height //make box 2
    doc.text(name1, 30, 21);
    doc.text("Content/Text of box -1", 8, 26);

    doc.setDrawColor(0, 255, 0)
    doc.rect(105, 16, 100, 30); ///make box 1
    doc.text(name2, 140, 21);
    doc.text("Content/Text of box -2", 110, 26);

    doc.save(`CMR ${moment().format("L")}`);

}
    return (
    <>
  {/* <Pdfuipage  /> */}



    
    
        <div style={{ display: "flex" }}>
            <Button type='primary' onClick={exportTemplateCMRPage}>Template</Button>
            <Button type="primary" onClick={exportPDFCMRPage}>CMR</Button>
        </div>
    


   
  </>
    );
}
export default CMR;