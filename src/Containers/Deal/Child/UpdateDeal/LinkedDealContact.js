
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDealsContactList,setDealsContactType  } from "../../DealAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Tooltip,Button } from "antd";
import DealsCardToggle from "./DealsCardToggle";

const ButtonGroup = Button.Group;

function LinkedDealContact(props) {
  useEffect(() => {
    props.getDealsContactList(props.currentItem.invOpportunityId);
  }, []);

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [showBorrowInputs, setShowBorrowInputs] = useState(false);
  
  // Update input values
  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };
  
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };

  const handleSaveInputs = (item) => {
    const payload = {
      suppliesId: item.suppliesId,
      supplierId: props.supplier.supplierId,
      supplierSuppliesInd: true,
      inputValue1: inputValue1,  
      inputValue2: inputValue2,  
      inputValue3: inputValue3   
    };
    props.setSupplierSuppliesType(payload);
    setShowBorrowInputs(false);
  };



  const handleCancelInputs = () => {
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setShowBorrowInputs(false); // Hide the inputs without saving
  };

  useEffect(() => {
    // props.emptysUPPLIERS();
  }, []);


  return (
    <>
      <div className=' flex justify-end sticky  z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[8.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className="w-[3.8rem]">
            </div>
          </div>
          <div class="overflow-x-auto h-[64vh]">
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
                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"

                        >
                          <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-[20rem] max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                               {item.name}

                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



                         
                        

       
<div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

 <DealsCardToggle
item={item}
invOpportunityId={props.currentItem.invOpportunityId}
 />
</div>
</div>
{item.borrowInd && (
  <div className="flex flex-row items-center md:w-[6rem] max-sm:flex-row w-full max-sm:justify-end">
    <button onClick={() => setShowBorrowInputs(true)}>Open</button>
  </div>
)}

{showBorrowInputs && item.borrowInd && (
  <div className="flex flex-col mt-2">
    <input
      type="text"
      value={inputValue1}
      onChange={(e) => setInputValue1(e.target.value)}
      placeholder="Input 1"
    />
    <input
      type="text"
      value={inputValue2}
      onChange={(e) => setInputValue2(e.target.value)}
      placeholder="Input 2"
    />
    <input
      type="text"
      value={inputValue3}
      onChange={(e) => setInputValue3(e.target.value)}
      placeholder="Input 3"
    />
    <ButtonGroup>
    <Button onClick={handleCancelInputs}>Cancel</Button>
      onClick={() => handleSaveInputs(item)}
    </ButtonGroup>
  </div>
)}

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
  fetchingDealsContactList:deal.fetchingDealsContactList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDealsContactList,
        setDealsContactType
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealContact);

