
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDealsContactList,setDealsContactValue  } from "../../DealAction"
import {getCurrency} from "../../../Auth/AuthAction";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Tooltip,Button ,Input} from "antd";
import { DatePicker } from "antd";
import DealsCardToggle from "./DealsCardToggle";
import { BundleLoader } from "../../../../Components/Placeholder";

const ButtonGroup = Button.Group;

function LinkedDealContact(props) {
  const [editingId, setEditingId] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const [newMonth, setNewMonth] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [currencyId, setCurrencyId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    props.getCurrency();
    props.getDealsContactList(props.currentItem.invOpportunityId);
  }, []);

  const handleEditAmount = (contactId, amount,currencyId,repayMonth,interest,borrowDate) => {
    setEditingId(contactId);
    setNewAmount(amount);
    setCurrencyId(currencyId);
    setNewMonth(repayMonth);
    setNewInterest(interest);
   
    setSelectedDate(borrowDate);
  };
  const handleCurrency = (event) => {
    const currencyId = event.target.value;
    setCurrencyId(currencyId);
  };

  const handleUpdateAmount = (item) => {
    const formattedDate = selectedDate ? dayjs(selectedDate).toISOString() : null;
    const data = {
      contactId: item.contactId,
      invOpportunityId: props.invOpportunityId,
      amount: newAmount,
      interest:newInterest,
      repayMonth: newMonth,
      currency:currencyId,
      borrowDate: formattedDate,
      borrowInd:item.borrowInd,
 

    };
    props.setDealsContactValue(data,props.currentItem.invOpportunityId);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };
 const onDateChange = (date, dateString) => {
    if (dateString) {
      const selectedYear = parseInt(dateString, 10);
      
     
      console.log('Selected Year:', selectedYear);
      this.setState({ selectedYear });
      // this.props.getHolidayyear(this.props.workplace,selectedYear);
    }
   
  };
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString); // Store the selected date as a string
  };




  
 


if (props.fetchingDealsContactList) {
    return <BundleLoader />;
  }
  
  const currentYear = dayjs().format('YYYY');

  return (
    
    <>
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 p-1 w-[99%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" md:w-[10.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className="w-[8.8rem]"><FormattedMessage
              id="app.tagCustomer"
              defaultMessage="Tag Investor"
            />
            </div>
            <div className="w-[3.8rem]"><FormattedMessage
              id="app.amount"
              defaultMessage="Amount"
            />
            </div>
          
            <div className="w-[8.8rem]"><FormattedMessage
              id="app.payout"
              defaultMessage="Payout (in months)"
            />
            </div>
            <div className="w-[3.8rem]"><FormattedMessage
              id="app.Interest"
              defaultMessage="Interest"
            />
            </div>
           
            <div className="w-[3.8rem]"><FormattedMessage
              id="app.Collected"
              defaultMessage="Collected"
            />
            </div>
            <div className="w-[2.8rem]">
            </div>
          </div>
          <div class="overflow-x-auto h-[77vh]">
            {/* <InfiniteScroll
              dataLength={props.dealsContactList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingDealsContactList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
            > */}
              {props.dealsContactList.length ?
                <>
                  {props.dealsContactList.map((item) => {
                    return (
                      <>
                        <div className="flex rounded justify-between mt-[0.5rem] bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"

                        >
                          <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-[34rem] max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem]  font-poppins">
                               {item.name}

                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-[30rem] max-sm:justify-between w-full max-sm:flex-row ">
     
<div class=" font-normal text-[0.85rem]  font-poppins">

 <DealsCardToggle
item={item}
invOpportunityId={props.currentItem.invOpportunityId}
 />
</div>
</div>

  <div className="flex flex-row items-center md:w-[42rem] max-sm:flex-row w-full max-sm:justify-end">
 
  <div className="flex flex-row w-[30rem] ">
  {item.borrowInd && (
    <>
                {editingId === item.contactId ? (
                  <div className="flex flew-row">
                    <Input
                     style={{width:"55%"}}
                      placeholder="Amount"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                        <select
                 style={{marginLeft:"0.5rem"}}
                 //  defaultValue={region.taskType}
                  className="customize-select"
                  value={item.currency} 
                  onChange={handleCurrency}
              >
                  <option value="">Currency</option>
                  {props.currencies.map((item) => (
                      <option 
                          key={item.currency_id} value={item.currency_id}>
                          {item.currency_name}
                      </option>
                  ))}
              </select> 
                                     <Input
                     style={{width:"55%",marginLeft:"0.5rem"}}
                      placeholder="Month"
                      value={newMonth}
                      onChange={(e) => setNewMonth(e.target.value)}
                    />
                                      <Input
                     style={{width:"55%",marginLeft:"0.5rem"}}
                      placeholder="Interent"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                    />
                
                         <DatePicker
                            style={{marginLeft:"0.5rem"}}
                          // defaultValue={dayjs(item.borrowDate)}
  value={selectedDate ? dayjs(selectedDate) : null} 
  onChange={(date, dateString) => setSelectedDate(dateString)}
  picker="date" 
/>
                    <Button onClick={() => handleUpdateAmount(item)}>Save</Button>
                    <Button onClick={cancelEdit}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex fle-row">
                    <div className="flex ml-2 w-[7rem]">{item.amount} {item.currency}</div>
                    <div className="flex ml-2 w-[7rem]">{item.repayMonth}</div>
                    <div className="flex ml-2 w-[4rem]">{item.interest}</div>
             
                    <div className="flex ml-2 w-[8rem]">{item.borrowDate ? dayjs(item.borrowDate).format("ll") : ""}</div>
                    <BorderColorIcon
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={() => handleEditAmount(item.contactId, item.amount,item.currency,item.repayMonth,item.interest,item.borrowDate)}
                      className=" text-[tomato] flex justify-center justify-items-center !text-icon"
                    />
                    
                  </div>
                )}
                </>

)}
              
  </div>
 

  </div>




                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.dealsContactList.length &&
                  !props.fetchingDealsContactList ? <NodataFoundPage /> : null}
            {/* </InfiniteScroll> */}
          </div>
        </div>
      </div>


    </>
  )
}
const mapStateToProps = ({  deal, auth }) => ({
    dealsContactList: deal.dealsContactList,
  userId: auth.userDetails.userId,
  fetchingDealsContactList:deal.fetchingDealsContactList,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDealsContactList,
        setDealsContactValue,
        getCurrency
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealContact);

