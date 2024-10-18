import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getQuotationDashboard,getQuotationDashboardCount } from "../../Dashboard/DashboardAction";


const DashBoardSummary=(props) =>{


  useEffect(() => {


    props.getQuotationDashboard(props.userId);
    props.getQuotationDashboardCount(props.userId)


   
  }, []);
  const data = {
    deals: [
      { name: "David Miller", description: "Request for Sample logo", date: "Yesterday", amount: "$ 5,000.00" },
      { name: "Adam Johnson", description: "Web design deal-confirmation", date: "Jul 12", amount: "$ 3,000.00" },
      { name: "Martin Taylor", description: "Reg: Price plans", date: "Jul 12", amount: "$ 4,000.00" },
      { name: "Valarie Thomas", description: "Clarification in Pricing", date: "Jul 02", amount: "$ 10,000.00" },
      { name: "George Faulkner", description: "Demo request", date: "Jun 31", amount: "$ 4,000.00" },
      { name: "Patrick Joho Smith", description: "Need business cards design", date: "Jun 21", amount: "$ 5,000.00" },
    ],
    contactsLeads: [
      { name: "Jeremy Watson", description: "Product logo!", time: "10:40 am" },
      { name: "Maria Thomas", description: "Demo request", time: "Yesterday" },
      { name: "Steve Johnson", description: "Plans and benefits", time: "Jul 06" },
      { name: "Sandra Evans", description: "Latest upgrade?", time: "Jun 04" },
      { name: "Warren Hastings", description: "Re: Welcome onboarding", time: "Jun 22" },
      { name: "James Carter", description: "Clarification in the design", time: "Jun 21" },
    ],
    notInCrm: [
      { name: "Donna Baker", description: "Regarding product features", time: "11:58 am" },
      { name: "Sandra Evans", description: "Tradeshow on 12/7/2016", time: "10:20 am" },
      { name: "Twitter", description: "Follow James Carter on Twitter!", time: "9:47 am" },
      { name: "Charles Jones", description: "Interest in your product", time: "7:40 AM" },
      { name: "Nancy Parker", description: "Webinar registration", time: "Yesterday" },
      { name: "Deborah Smith", description: "Let's schedule a call", time: "Yesterday" },
    ],
    colleagues: [
      { name: "Robert Yonker, Me", description: "Re: Final Attempt", date: "Yesterday" },
      { name: "Jennifer from Zylker", description: "Choose the right plan", date: "Jul 11" },
      { name: "Elizabeth Leon, Me (2)", description: "Re: Quick question", date: "Jun 13" },
      { name: "Manish Sharma", description: "New Contact?", date: "Yesterday" },
      { name: "Rose Edward", description: "Trying to connect", date: "Jun 02" },
    ],
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-4 gap-6  rounded mt-1  bg-white h-[87vh] ">
      {/* TASK */}
      <div class="flex flex-col">
        <h2 className="text-xl font-bold mb-4">TASK-(5)</h2>
        {data.deals.map((deal, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] ">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{deal.name}</p>
                <p className="text-sm text-gray-500">{deal.description}</p>
              </div>
              <p className="text-sm text-gray-500">{deal.date}</p>
            </div>
            <p className="text-green-600 font-bold bg-green-100 inline-block px-2 py-1 rounded">${deal.amount}</p>
          </div>
        ))}
      </div>
{/* <div class="relative   sm:after:content-[''] sm:after:absolute sm:after:w-[3px] sm:after:min-h-[500vh] sm:after:bg-black sm:after:right-[-1rem]"></div> */}
      {/* QUOTATION */}
      <div class="flex flex-col border-x-black h-[40vh]">
  <h2 className="text-xl font-bold mb-4 ">
  QUOTATION - (1)
  {/* ({`${props.quotationDashboardCount.} `}) */}
</h2>
  {props.quotationDashboard.length === 0 ? (
    <p>No data found</p>
  ) : (
    props.quotationDashboard.map((lead, index) => (
      <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
        <div className="flex justify-between">
          <p className="font-semibold">{lead.quotationId}</p>
          <p className="text-sm text-gray-500">{lead.time}</p>
        </div>
        <p className="text-sm text-gray-500">{lead.amount}</p>
        <p className="text-sm text-gray-500">{lead.contactPersonName}</p>
      </div>
    ))
  )}
</div>


      {/* ORDER */}
      <div class="flex flex-col">
        <h2 className="text-xl font-bold mb-4">ORDER-(6)</h2>
        {data.notInCrm.map((contact, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.time}</p>
            </div>
            <p className="text-sm text-gray-500">{contact.description}</p>
            
          </div>
        ))}
      </div>

      {/* DEALS */}
      <div class="flex flex-col">
        <h2 className="text-xl font-bold mb-4"> DEALS-(5) </h2>
        {data.colleagues.map((colleague, index) => (
          <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23]">
            <div className="flex justify-between">
              <p className="font-semibold">{colleague.name}</p>
              <p className="text-sm text-gray-500">{colleague.date}</p>
            </div>
            <p className="text-sm text-gray-500">{colleague.description}</p>
          </div>
        ))}
      </div>
    </div>   
  );
};
const mapStateToProps = ({ dashboard, auth }) => ({
  userId: auth.userDetails.userId,
  quotationDashboard:dashboard.quotationDashboard,
  quotationDashboardCount:dashboard.quotationDashboardCount
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getQuotationDashboard,
  getQuotationDashboardCount

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardSummary);
