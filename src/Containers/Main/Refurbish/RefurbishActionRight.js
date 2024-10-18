import { Button } from 'antd'
import dayjs from 'dayjs';
import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";

const RefurbishActionRight = () => {
    const exportTemplateCMRPage = async () => {
        var doc = new jsPDF();

        var name1 = `HEADER 1`
        var name2 = `HEADER 2`
        var value = "4"
        var header = `Exemplar für
Copy for`

        doc.setFillColor(2, 179, 34);
        doc.rect(0, 3, 230, 16, 'F');
        doc.setFontSize(25);
        doc.text(value, 6, 10)
        doc.setFontSize(12);
        doc.text(header, 13, 6)

        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 16, 100, 30); // x, y, width, height //make box 2
        doc.text(name1, 30, 21);
        // doc.text("Content/Text of box -1", 8, 26);

        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 16, 100, 30); ///make box 1
        doc.text(name2, 140, 21);
        // doc.text("Content/Text of box -2", 110, 26);


        doc.save(`CMR_template ${dayjs().format("L")}`);

    }
    const exportPDFCMRPage = async () => {
        var doc = new jsPDF();

        var name1 = `1`
        var name2 = `No CMR`
        var name3 = `2`
        var name4 = `16`
        var name5 = `3`
        var name6 = `17`
        var name7A = `4`
        var name7B = `5`
        var name8 = `18`
        var name9A = `6`
        var name9B = `7`
        var name9C = `8`
        var name9D = `9`
        var name10A = `10`
        var name10B = `11`
        var name10C = `12`
        var name11A = `HA`
        var name11B = `HB`
        var name11C = `HC`
        var name13 = `13`
        var name19 = `19`
        var name14 = `14`
        var name21 = `21`
        var name15 = `15`
        var name20 = `20`
        var name22 = `22`
        var name23 = `23`
        var name24 = `24`
        var value = "4"
        var header = `Exemplar für
Copy for`

        doc.setFillColor(2, 179, 34);
        doc.rect(0, 0, 230, 13, 'F');
        doc.setFontSize(25);
        doc.text(value, 3, 8)
        doc.setFontSize(12);
        doc.text(header, 11, 5)

        //box-1
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 13, 100, 22); // x, y, width, height //make box 2
        doc.text(name1, 8, 19);
        // doc.text("Content/Text of box -1", 8, 23);
        //box-2
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 13, 100, 22); ///make box 1
        doc.text(name2, 110, 19);
        //box-3
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 35, 100, 22); // x, y, width, height //make box 2
        doc.text(name3, 8, 40);
        // doc.text("Content/Text of box -3", 8, 43);
        // box 4
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 35, 100, 22); ///make box 1
        doc.text(name4, 110, 40);
        // doc.text("Content/Text of box -4", 110, 43);
        //box -5
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 57, 100, 22); // x, y, width, height //make box 2
        doc.text(name5, 8, 60);

        //box -6
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 57, 100, 22); ///make box 1
        doc.text(name6, 110, 60);

        // box -7A
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 79, 100, 13); // x, y, width, height //make box 2
        doc.text(name7A, 8, 82);

        // //box-7B
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 92, 100, 13); // x, y, width, height //make box 2
        doc.text(name7B, 8, 97);

        //box -8
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 79, 100, 26);
        doc.text(name8, 110, 82);

        //box-9
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 105, 115, 50); // x, y, width, height //make box 2
        doc.text(name9A, 7, 113);
        doc.text(name9B, 36, 113);
        doc.text(name9C, 63, 113);
        doc.text(name9D, 90, 113);
        // box-10
        doc.rect(120, 105, 28, 62);
        doc.rect(148, 105, 28, 62);
        doc.rect(176, 105, 29, 62);
        doc.text(name10A, 123, 113);
        doc.text(name10B, 152, 113);
        doc.text(name10C, 180, 113);
        // box-11
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 155, 115, 12);
        doc.text(name11A, 20, 163);
        doc.text(name11B, 50, 163);
        doc.text(name11C, 80, 163);
        // //box -12

        doc.rect(5, 167, 100, 53);
        doc.text(name13, 20, 175);

        //box 13 table
        doc.text(name19, 108, 171);
        doc.rect(105, 167, 25, 53);
        doc.rect(130, 167, 25, 53);
        doc.rect(155, 167, 25, 53);//column
        doc.rect(180, 167, 25, 53);

        doc.rect(105, 167, 100, 7);
        doc.rect(105, 174, 100, 14); //row
        doc.rect(105, 188, 100, 26);
        doc.rect(105, 214, 100, 6);

        doc.rect(130, 174, 75, 7); //sub-row-row2
        doc.rect(130, 181, 75, 7);

        doc.rect(130, 188, 75, 6); //sub-row-row3
        doc.rect(130, 194, 75, 7);
        doc.rect(130, 201, 75, 6); //sub-row
        doc.rect(130, 207, 75, 7);

        //box-14

        doc.rect(5, 220, 200, 9);
        doc.text(name14, 8, 224);

        // box -15
        doc.rect(5, 229, 100, 11); // x, y, width, height //make box 2
        doc.text(name15, 8, 235);

        //box-16
        doc.rect(5, 240, 100, 11); // x, y, width, height //make box 2
        doc.text(name21, 8, 244);

        //box -17        
        doc.rect(105, 229, 100, 22);
        doc.text(name20, 110, 233);

        // box -18
        doc.rect(5, 251, 67, 25); // x, y, width, height //make box 2
        doc.text(name22, 8, 255);

        //box-19
        doc.rect(72, 251, 66, 25); // x, y, width, height //make box 2
        doc.text(name23, 77, 255);

        //box -20       
        doc.rect(138, 251, 67, 25);
        doc.text(name24, 140, 257);

        //footer
        doc.setFillColor(2, 179, 34);
        doc.rect(0, 276, 230, 15, 'F');

        doc.save(`CMR ${dayjs().format("L")}`);

    }
    return (
        <div style={{ display: "flex" }}>
            <Button type='primary' onClick={exportTemplateCMRPage}>Template</Button>
            <Button type="primary" onClick={exportPDFCMRPage}>CMR</Button>
        </div>
    )
}

export default RefurbishActionRight
