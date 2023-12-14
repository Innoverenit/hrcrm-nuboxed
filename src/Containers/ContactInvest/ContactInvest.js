import React, { useState,useEffect,Suspense, lazy } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader} from "../../Components/Placeholder";
import ContactInvestAllCardList from './Child/ContactInvestTable/ContactInvestAllCardList';
import {handleContactInvestModal,setContactInvetViewType,
  getContactInvestByUserId,
  getContactInvestFilterData} from "./ContactInvestAction";

const ContactInvestHeader = lazy(() => import("./Child/ContactInvestHeader"));
const AddContactInvestModal = lazy(() => import("./Child/AddContactInvestModal"));
const ContactInvestCardList = lazy(() => import("./Child/ContactInvestTable/ContactInvestCardList"));

function ContactInvest (props) {
  const [currentData,setcurrentData]=useState("");
    const [text, setText] = useState(undefined);
    const [currentUser, setCurrentUser] = useState("");
    const [currentPartnerUser, setCurrentPartnerUser] = useState("");
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(props.contactiNVESTbyId);
  const [filter, setFilter] = useState("creationdate");
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
  
    if (country === '') {
      setFilteredData(props.contactiNVESTbyId);
    } else {
      const filteredJobs = props.contactiNVESTbyId.filter((job) => job.department ===country );
      setFilteredData(filteredJobs);
    }
};
const handleFilterChange = (data) => {
  setFilter(data);
  props.getContactInvestFilterData(props.userId, 0, data);
};
const handleRoleChange = (event) => {
  const role = event.target.value;
  setSelectedRole(role);
  const filteredJobs = props.contactiNVESTbyId.filter((job) => {
    const roleMatch = role === '' || job.designation === role;
    return roleMatch;
  });

  setFilteredData(filteredJobs);
};
useEffect(()=>{
props.getContactInvestByUserId(props.userId,0,"creationdate")
},[])

const filterData = filteredData.filter(item =>
  Object.values(item).some(value =>
    typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase())
  )
);
const handleClear = () => {
  setcurrentData("");
  props.getContactInvestByUserId(currentUser || props.userId, 0, "creationdate");
};
const handleChange = (e) => {
  setcurrentData(e.target.value)
};
function handleCurrentData (value){
  setcurrentData(value)
}
  const handlePartnerDropChange = (value) => {
    setCurrentPartnerUser(value);
    props.getPArtnerContactPagination(value, 0);
    console.log("valid", value);
  };

  const handleDropChange = (value) => {
    setCurrentUser(value);
    props.getContactPagination(value, 0);
    console.log("valid", value);
  };



  useEffect(() => {
 
    const filteredJobs = props.contactiNVESTbyId.sort((a, b) => {
      const indA = a.pingInd;
      const indB = b.pingInd;
      if (indA < indB) {
        return 1;
      }
      if (indA > indB) {
        return -1;
      }
      return 0;
    });
    setFilteredData(filteredJobs);
  }, [props.contactiNVESTbyId, filterText]);

const{handleContactInvestModal,addContactInvestModal,
    setContactInvetViewType,viewType
}=props;
        return (
            <React.Fragment>
                <ContactInvestHeader
                viewType={viewType}
                setContactInvetViewType={setContactInvetViewType}
                addContactInvestModal={addContactInvestModal}
                handleContactInvestModal={handleContactInvestModal}
                handlePartnerDropChange={handlePartnerDropChange}
                handleDropChange={handleDropChange}
                currentUser={currentUser}
                currentPartnerUser={currentPartnerUser}
                text={text}
             
                currentData={currentData}
                handleClear={handleClear}
             
                handleChange={handleChange}
                handleCurrentData={handleCurrentData}
                handleFilterChange={handleFilterChange}
                filter={filter}
              />
             <AddContactInvestModal
        addContactInvestModal={addContactInvestModal}
        handleContactInvestModal={handleContactInvestModal}
      />
       <Suspense fallback={<BundleLoader />}>
        {viewType === "card" ?
          <ContactInvestCardList currentUser={currentUser}  filterData={filterData}/> 

         :viewType === "all" ?
         <ContactInvestAllCardList     /> 
         : null}
      </Suspense>
            </React.Fragment>
        )
}

const mapStateToProps = ({ contactinvest,auth }) => ({
    addContactInvestModal:contactinvest.addContactInvestModal,
    viewType:contactinvest.viewType,
    contactiNVESTbyId: contactinvest.contactiNVESTbyId,
    userId: auth.userDetails.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleContactInvestModal,
    setContactInvetViewType,
    getContactInvestByUserId,
    getContactInvestFilterData
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvest);