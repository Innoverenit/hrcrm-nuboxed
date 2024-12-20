import React, {useState,Suspense,lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  // setInvestorViewType
  handleInvestorModal,updateOwnerinvestorById} from "./InvestorAction";
import {getInvestorsbyId,emptyInvestor,getInvestorsFilterData} from "./InvestorAction";
import {
  getLatestCustomer,
  getCustomerCloser, 
} from "../Customer/CustomerAction";

const InvestorDeleteList = lazy(() => import("./InvestorDeleteList"));
const InvestorHeader = lazy(() => import("./Child/InvestorHeader"));
const InvestorTeamCardList = lazy(() => import("./Child/InvestorTable/InvestorTeamCardList"));
const InvestorAllCardList = lazy(() => import("./Child/InvestorTable/InvestorAllCardList"));
const InvestorCardList=lazy(() => import("./Child/InvestorTable/InvestorCardList"));
const AddInvestorModal=lazy(()=>import("./Child/AddInvestorModal"));

function Investor (props) {

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTransferMode, setIsTransferMode] = useState(true)
const [currentData,setcurrentData]=useState("");
const [currentUser,setcurrentUser]=useState("");
const [filter, setFilter] = useState("CreationDate");
const [viewType, setViewType] = useState(null);
  const [teamsAccessInd, setTeamsAccessInd] = useState(props.teamsAccessInd);
  const setInvestorViewType = (viewType) => {
    setViewType(viewType);
    setTeamsAccessInd(false);
  };

const handleClear = () => {
  setcurrentData("");
  props.getInvestorsbyId(currentUser || props.userId, 0, "creationdate");
};
function handleCurrentData (value){
  setcurrentData(value)
}

const handleTransferClick = () => {
  if (isTransferMode) {
    // If we're in Transfer mode, we show the checkboxes and switch to Cancel mode
    setShowCheckboxes(true);
    setIsTransferMode(false);
  } else {
    // If we're in Cancel mode, we uncheck all checkboxes and switch back to Transfer mode
    setShowCheckboxes(false);
    setIsTransferMode(true);
    setSelectedDeals([]);
    setSelectedUser(null); // Reset selected user
  }
};

const handleCheckboxChange = (dealName) => {
  setSelectedDeals((prevSelectedDeals) => {
    if (prevSelectedDeals.includes(dealName)) {
      return prevSelectedDeals.filter((name) => name !== dealName);
    } else {
      return [...prevSelectedDeals, dealName];
    }
  });
};

const handleUserSelect = (value) => {
  // const selectedUser = userList.find((user) => user.id === value);
  // setSelectedUser(selectedUser);
  let data={
    investorIds:selectedDeals
  }
  props.updateOwnerinvestorById(data,value)
  // console.log('Selected Deals:', selectedDeals);
  // console.log('Selected User:', selectedUser);
};
const handleFilterChange = (data) => {
  setFilter(data);
  props.getInvestorsFilterData(props.userId, 0, data);
  // props.getTeamInvestor(props.userId, 0,data);
};
const handleChange = (e) => {
  setcurrentData(e.target.value)
};

  const {
    addInvestorModal,
    handleInvestorModal,
    // viewType,
    // setInvestorViewType,

  } = props;
        return (
            <React.Fragment>
              <Suspense fallback={"Loading..."}>
          <InvestorHeader
          handleUserSelect={handleUserSelect}
          showCheckboxes={showCheckboxes}
          selectedDeals={selectedDeals}
          selectedUser={selectedUser}
          isTransferMode={isTransferMode}
          handleTransferClick={handleTransferClick}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          viewType={viewType}
          setInvestorViewType={setInvestorViewType}
          teamsAccessInd={teamsAccessInd}
          handleInvestorModal={handleInvestorModal}
          currentUser={currentUser}
          currentData={currentData}
          handleClear={handleClear}
       
          handleChange={handleChange}
          handleCurrentData={handleCurrentData}
          handleFilterChange={handleFilterChange}
          filter={filter}
          />
          <AddInvestorModal
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          addInvestorModal={addInvestorModal}
          handleInvestorModal={handleInvestorModal}
          />
 
 {teamsAccessInd ? (
       <InvestorTeamCardList
       showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             selectedUser={selectedUser}
             handleCheckboxChange={handleCheckboxChange}
       translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
       />
        ) : (
          <>
            {viewType === 'list' && <InvestorCardList
             translateText={props.translateText}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             selectedUser={selectedUser}
             handleCheckboxChange={handleCheckboxChange}
             selectedLanguage={props.selectedLanguage}
            /> }
            {viewType === 'all' && <InvestorAllCardList  filter={filter}
             translateText={props.translateText}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             selectedUser={selectedUser}
             handleCheckboxChange={handleCheckboxChange}
             selectedLanguage={props.selectedLanguage}
            /> }
            {viewType === 'teams' ?(  <InvestorTeamCardList
             translateText={props.translateText}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             selectedUser={selectedUser}
             handleCheckboxChange={handleCheckboxChange}
             selectedLanguage={props.selectedLanguage}
            />
            ):(
         <InvestorCardList
             translateText={props.translateText}
             showCheckboxes={showCheckboxes}
             selectedDeals={selectedDeals}
             selectedUser={selectedUser}
             handleCheckboxChange={handleCheckboxChange}
             selectedLanguage={props.selectedLanguage}
            />
            )}
             {viewType === 'delete' &&  <InvestorDeleteList
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
            />}
          </>
        )}

 </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ investor,auth }) => ({
  // viewType:investor.viewType,
  teamsAccessInd:auth.userDetails.teamsAccessInd,
  userId: auth.userDetails.userId,
  addInvestorModal:investor.addInvestorModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // setInvestorViewType,
  handleInvestorModal,
  getLatestCustomer,
  updateOwnerinvestorById,
  getCustomerCloser,
  getInvestorsbyId,emptyInvestor,getInvestorsFilterData
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Investor);