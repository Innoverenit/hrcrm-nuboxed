import React, { useState,useEffect,Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { MainWrapper } from "../../Components/UI/Layout";
import { getOrganizationDetails,setOrganizationViewType ,handleOrganizationModal,
  // getOrganizationList
} from "../Auth/AuthAction";
const AddOrganizationModal = lazy(() =>
  import("./Child/OrganizationHeader/AddOrganizationModal")
);
const OrganizationHeader = lazy(() =>
  import("./OrganizationHeader")
);

const OrganizationDetailLeft = lazy(() =>
  import("./Child/OrganizationDetailLeft")
);
const OrganizationDetailRight = lazy(() =>
  import("./Child/OrganizationDetailRight")
);

const Organization =(props) =>{
  console.log("organizationDetailsList length", props.organizationDetailsList.length);
  const [activeTab, setActiveTab] = useState("");
  console.log("active",activeTab)
  // console.log("active1",props.organizationDetailsList[0].organizationId)
  
//   useEffect(() => {
   
//     props.getOrganizationList();
//     // props.getOrganizationDetails(activeTab);
   
// },[]);

useEffect(() => {
  if(activeTab){

 props.getOrganizationDetails(activeTab);
  }
//  console.log(activeTab)
},[activeTab]);


useEffect(() => {
  // Check if data is available
  if (props.organizationDetailsList.length > 0) {
    // Update activeTab when data is available
    setActiveTab(props.organizationDetailsList[0]?.organizationId);
  }
}, [props.organizationDetailsList]); // Watch for changes in organizationDetailsList



  const handleTabClick = (key) => {
    console.log(key)
    setActiveTab(key);
     props.getOrganizationDetails(key);
  };
  
    const { fetchingOrganizationDetails,addOrganizationModal,organizationDetails,handleOrganizationModal } = props;
    // console.log(this.props.organizationDetails.imageId)
    return (
    
      <>
       <Suspense fallback={"Loading..."}>
        <OrganizationHeader 
        activeTab={activeTab}
        handleOnClick={handleTabClick}
        organizationDetailsList={props.organizationDetailsList}
        //  currentUser={this.state.currentUser}
        organizationDetails={organizationDetails}
         viewType={props.viewType}
         handleOrganizationModal={handleOrganizationModal}
        setOrganizationViewType={props.setOrganizationViewType}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}/>
          <AddOrganizationModal
          addOrganizationModal={addOrganizationModal}
          handleOrganizationModal={handleOrganizationModal}
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}/>
        </Suspense>
        {fetchingOrganizationDetails ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
            <div class=" flex ">
              <Suspense fallback={"Loading..."}>
              <div class="flex flex-no-wrap w-full">
              {activeTab && (
                  <div class=" w-[25%]" >
                    <OrganizationDetailLeft
                      selectedLanguage={props.selectedLanguage}
                      translateText={props.translateText}
                      organizationDetailsList={props.organizationDetailsList}
                      // organizationDetails={props.organizationDetails}
                      organizationList={props.organizationDetails} 
                    />
                  </div>
                     )}
                      {activeTab && (
                  <div class=" w-[75%]" >
                    <OrganizationDetailRight
                      selectedLanguage={props.selectedLanguage}
                      translateText={props.translateText} />
                  </div>
                    )}
                </div>
              </Suspense>
            </div>
          )}
      </>
    );
  }


const mapStateToProps = ({ auth }) => ({
  addOrganizationModal:auth.addOrganizationModal,
  fetchingOrganizationDetails: auth.fetchingOrganizationDetails,
  fetchingOrganizationDetailsError: auth.fetchingOrganizationDetailsError,
  organizationDetails:auth.organizationDetails,
  organizationDetailsList:auth.organizationDetailsList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrganizationDetails,
      // getOrganizationList,
      handleOrganizationModal,
      setOrganizationViewType
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
