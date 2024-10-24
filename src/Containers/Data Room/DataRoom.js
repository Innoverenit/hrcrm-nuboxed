import React, {Suspense,lazy, useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataInvestorRoomCard from "../Data Room/DataInvestorRoomCard"
import { BundleLoader } from "../../Components/Placeholder";
import {setDataRoomViewType,handleDataroomModal} from "./DataRoomAction";
const AddDataRoomModal=lazy(()=> import("../Data Room/AddDataRoomModal"));
const DataRoomHeader=lazy(()=> import("../Data Room/DataRoomHeader"));
const DataRoomCard=lazy(()=> import("../Data Room/DataRoomCard"));
const DataRoomCustomerCard=lazy(()=> import("../Data Room/DataRoomCustomerCard"));
const DataRoomProspectCard=lazy(()=> import("../Data Room/DataRoomProspectcard"));

function DataRoom (props) {

  const [selectedTab, setSelectedTab] = useState('prospect'); 
  const [selectedButtonTab, setSelectedButtonTab] = useState('byList');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const[selectedPersonData,setSelectedPersonData] =useState(null)
console.log(selectedButtonTab)
  const [selectedInvestor, setSelectedInvestor] = useState(null);
const[selectedCustomer,setSelectedCustomer]=useState(null)
  const handleCardClick = (person,prospectData) => {
    setSelectedPerson(person);
    setSelectedPersonData(prospectData);
  };


  const handleCardClickInvestor = (person) => {
    setSelectedInvestor(person);
  };


  const handleCardClickCustomer = (person) => {
    setSelectedCustomer(person);
  };
  console.log(selectedPerson)
 
    const {
        handleDataroomModal ,
        addDataroomModal   
      } = props;
      const [viewType,setDataRoomViewType]=useState("list");
        return (
            <React.Fragment>
            <Suspense fallback={<BundleLoader />}>
            <DataRoomHeader
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             setDataRoomViewType={setDataRoomViewType}
             viewType={viewType}
             handleDataroomModal={handleDataroomModal}
            />
             <AddDataRoomModal
             selectedLanguage={props.selectedLanguage}
             translateText={props.translateText}
             addDataroomModal={addDataroomModal}
             handleDataroomModal={handleDataroomModal}
        />                  
       
            {selectedTab === "list" ? 
           //<DataRoomTab />
              <DataInvestorRoomCard
              selectedInvestor={selectedInvestor}
              setSelectedInvestor={setSelectedInvestor}
              handleCardClickInvestor={handleCardClickInvestor}
              translateText={props.translateText}
              selectedLanguage={props.selectedLanguage}
              translatedMenuItems={props.translatedMenuItems}
              />:
              selectedTab === "customer" ? 
            //<DataRoomTab />
               <DataRoomCustomerCard
               selectedCustomer={selectedCustomer}
               setSelectedCustomer={setSelectedCustomer}
               handleCardClickCustomer={handleCardClickCustomer}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
               translatedMenuItems={props.translatedMenuItems}
               />
           :
           selectedTab === "prospect" ? 
            //<DataRoomTab />
               <DataRoomProspectCard
               selectedPersonData={selectedPersonData}
               setSelectedButtonTab={setSelectedButtonTab}
               selectedButtonTab={selectedButtonTab}
               selectedPerson={selectedPerson}
               handleCardClick={handleCardClick}
               setSelectedPerson={setSelectedPerson}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
               translatedMenuItems={props.translatedMenuItems}
               />
            : null}   
            </Suspense>  
          </React.Fragment>
        )
}

const mapStateToProps = ({ datRoom }) => ({
    viewType: datRoom.viewType,
    addDataroomModal: datRoom.addDataroomModal
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setDataRoomViewType,
    handleDataroomModal
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DataRoom);