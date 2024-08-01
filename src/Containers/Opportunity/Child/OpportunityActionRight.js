// import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { FormattedMessage } from "react-intl";
// import { withRouter } from "react-router-dom";
// import { base_url } from "../../../Config/Auth";
// import { Button, Tooltip, } from "antd";
// import { StyledSelect } from "../../../Components/UI/Antd";
// import OpportunityShareForm from "./OpportunityShareForm";

// const Option = StyledSelect.Option;

// class OpportunityActionRight extends React.Component {
//   render() {
//     const {
//       userId,
//       subscriptionType,
//       users,
//       user,
//       department,
//       accountFilterText,
//       handleOpportunityModal,
//       setAccountFilterText,
//       setAccountFilterUser,
//     } = this.props;
//     return (
//       <div class=" flex items-center">
//          {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.opportunityFullListInd===true &&(
//       <OpportunityShareForm/>
//          )}
//         <Button
//         style={{lineHeight:"inherit"}}
//            type="primary"
//           // default
//         href={`${base_url}/excel/export/user/opportunity/${userId}`}
//         >
//           {/* Export */}
//           <FormattedMessage
//                 id="app.export"
//                 defaultMessage="Export"
//               />
//         </Button>
//         <Tooltip placement={"left"} title={<FormattedMessage
//                 id="app.create"
//                 defaultMessage="Create"
//               />}>
//            {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
//            {user.opportunityCreateInd ===true && user.crmInd === true && (
//           <Button
//             type="primary"
//             // ghost
//             onClick={() => handleOpportunityModal(true)}
//           >
//             Add
//           </Button>
//             )}  
//         </Tooltip>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ auth, team, account }) => ({
//   userId: auth.userDetails.userId,
//   user: auth.userDetails,
//   user: auth.userDetails,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
      
//     },
//     dispatch
//   );
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)
// );

import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import OpportunityShareForm from "./OpportunityShareForm";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

import UploadIcon from '@mui/icons-material/Upload';

const Option = StyledSelect.Option;

const OpportunityActionRight = (props) => {

//   function exportPDFAnnexure() {
//     var doc = new jsPDF();
//     var before = `East Repair Inc ` 
//     var OrderNo =`#`
//     var contact = `Contact details` 
//     var email= `Email: support@loadtripping.com`
//     var carrier= `Carrier details`
//     var load=`Load reference `
//     var carier=`Carrier Name `
//     var contacts=`Contact `
//     var plateno=`Plate numbers `
//     var drvrname=`Driver’s name `
//     var loadde=`Load details`
//     var loadingdate=`Loading date: `
//     var deliveydt=`Delivery date: `
//     var ofvechiles=`# of vehicles `
//     var distancee =`Distance `
//     var equipement=`Equipment `
//     var agreed =`Agreed price ex VAT €`
//     var make =`Make, Models and Vins`
//     var special =`Special instructions:`
//     var pickup=`Pick-up place`
//     var shippern=`Shipper name:`
//     var address=`Address:`
//     var city=`City:`
//     var country=`Country:`
//     var contacts=`Contact:`
//     var phone=`Phone:`
//     var addressf=`Address:`
//     var cityf=`City:`
//     var countryf=`Country:`
//     var contactsf=`Contact:`
//     var phonef=`Phone:`
//     var deliver=`Delivery place`
//     var reciver=`Receiver name:`
//     var attention=`ATTENTION`
//     var book=`Booked date: `
//     doc.setFont("Montserrat");
//     doc.setFillColor(0, 255, 0);
//     doc.setFontSize(11)
//     //doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
//     doc.text(before, 20, 60);
//     doc.setFillColor(0, 255, 0);
//     doc.setTextColor(88 ,108 ,179);
//     doc.text(OrderNo, 65, 60);
//     doc.setTextColor("#5a5353");
//     doc.setFontSize(9)
//     doc.text(contact, 120, 50);
//     doc.text(email, 120, 55);
//     doc.line(20, 70, 190, 70);
//     doc.setTextColor(88 ,108 ,179);
//     doc.text(carrier, 20, 80);  
//     doc.setTextColor("#5a5353");
//     doc.text(load, 20, 85);
//     doc.text(book, 150, 85);
//     doc.text(carier, 20, 90);
//     doc.text(contacts, 20, 95);
//     doc.text(plateno, 20, 100);
//     doc.text(drvrname, 20, 105);
//     doc.line(20, 115, 190, 115);
//     doc.setTextColor(88 ,108 ,179);
//     doc.text(loadde, 20, 125);
//     doc.setTextColor("#5a5353");
//     doc.text(loadingdate, 20, 135);
//     doc.text(deliveydt, 20, 140);
//     doc.text(ofvechiles, 20, 150);
//     doc.text(distancee, 60, 150);
//     doc.text(equipement, 100, 150);
//     doc.text(agreed, 20, 160);
//     doc.text(make, 20, 170);
//     doc.text(special, 20, 200);
//     doc.line(20, 205, 190, 205);
//     doc.setTextColor(88 ,108 ,179);
//     doc.text(pickup, 20, 210);
//     doc.setTextColor("#5a5353");
//     doc.text(shippern, 20, 220);
//     doc.text(address, 20, 225);
//     doc.text(city, 20, 230);
//     doc.text(country, 20, 235);
//     doc.text(contacts, 20, 240);
//     doc.text(phone, 20, 245);
//     doc.setTextColor(88 ,108 ,179);
//     doc.text(deliver, 20, 255);
//     doc.setTextColor("#5a5353");
//     doc.text(reciver, 20, 265);
//     doc.text(addressf, 20, 270);
//     doc.text(cityf, 20, 275);
//     doc.text(countryf, 20, 280);
//     doc.text(contactsf, 20, 285);
//     doc.text(phonef, 20, 290);
//     doc.setFillColor(2, 179, 34);
//     doc.save("Quotation.pdf")
//     }
// const exportPDFAnnexure = async () => {
//   var doc = new jsPDF();

//   var name1 = `East Repair Inc `
//   var name2 =`1912 Harvest Lane New York ,NY 12210`
//   var name3 =`BILL TO`
//   var name4 = `SHIP TO`
//   var name5 = `QUOTE #`
//   var name6 = `QUOTE DATE`
//   var name7 = `P.O.#`
//   var name8 = `Quote Total`
//   var name9 = `QTY`
//   var name10 = `DESCRIPTION`
//   var name11 = `UNIT PRICE`
//   var name12 = `AMOUNT`
//   var name13= `TERM & CONDITIONS`
//   var name14= `Payement id due within 15 days`
//   var name15= `Please make checks payble to: East repair Inc. `


//   doc.setFont("Montserrat");
//   doc.setFillColor(62, 115, 185);
//   doc.rect(0, 0, 230, 13, 'F');
//   doc.setFontSize(25);
//   doc.setFontSize(14);
//   doc.setDrawColor(0, 0, 0)
//   doc.text(name1, 8, 25);
//   doc.setFontSize(10);
//   doc.text(name2, 8, 32);
//   doc.setFontSize(12);
//   doc.text(name3, 8, 50);
//   doc.text(name4, 60, 50);
//   doc.text(name5, 120, 50);
//   doc.text(name6, 120, 58);
//   doc.text(name7, 120, 66);
//   doc.line(8, 80, 200, 80);
//   doc.setFontSize(22);
//   doc.text(name8, 8, 90);
//   doc.line(8, 100, 200, 100);
//   doc.setFontSize(10);
//   doc.text(name9, 8, 110);
//   doc.text(name10, 30, 110);
//   doc.text(name11, 90, 110);
//   doc.text(name12, 140, 110);
//   doc.setFontSize(12);
//   doc.text(name13, 8, 250);
//   doc.setFontSize(9);
//   doc.text(name14, 8, 260);
//   doc.text(name15, 8, 270);
//   //footer
//   doc.setFillColor(62, 115, 185);
//   doc.rect(0, 276, 230, 15, 'F');

//   doc.save("Quotation.pdf")

// }
  const {
    userId,
          subscriptionType,
          users,
          user,
          department,
          accountFilterText,
          handleOpportunityModal,
          setAccountFilterText,
          setAccountFilterUser,
  } = props;
  return (
    <div class=" flex items-center">
       {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.opportunityFullListInd===true &&(
    <OpportunityShareForm/>
       )}
       {/* <div class="w-6">
        <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon/>
                           </span>
          </div> */}
          <Tooltip placement={"left"} title={<FormattedMessage
              id="app.create"
              defaultMessage="Create"
            />}>
         {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
         {user.opportunityCreateInd ===true && user.crmInd === true && (
        <Button
          type="primary"
          // ghost
          onClick={() => handleOpportunityModal(true)}
        >
          <DataSaverOnIcon className="!text-icon"/>Add
        </Button>
          )}  
      </Tooltip>
      <Button
      style={{lineHeight:"inherit"}}
         type="primary"
        // default
      href={`${base_url}/excel/export/user/opportunity/${userId}`}
      >
        {/* Export */}
        <UploadIcon className=" !text-icon"/>
        <FormattedMessage
              id="app.export"
              defaultMessage="Export"
            />
      </Button>
      
    </div>
  );
};

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)
);
