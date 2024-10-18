import React, { Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProspectTableData from "../JumpStart/ProspectTableData"
import { StyledDrawer } from "../../../../Components/UI/Antd";
import QuotationTabData from "./QuotationTabData";

function AddProspectDrawerModal (props) {

   console.log("tttt",props.title)
    return (
      <div>
 <StyledDrawer
          title="Prospect"
          width={"87%"}
          destroyOnClose
          visible={props.isModalOpen}
          onClose={props.setIsModalOpen}
      
        
        >
          <Suspense fallback={<BundleLoader />}>
      
          {props.title === "Investor" ? (
            <ProspectTableData
            selectedCountry={props.selectedCountry}
            modalData={props.modalData}
            />  ) : 
 <QuotationTabData 
 modalData={props.modalData}
 selectedCountry={props.selectedCountry}
/>

}
      
        </Suspense>
         
        </StyledDrawer>
      </div>
    );
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({
    
  candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddProspectDrawerModal);

