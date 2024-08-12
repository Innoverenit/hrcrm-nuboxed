import React, { lazy, Suspense,useEffect } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ErpNote from "../../../../ErpNote/ErpNote.js";
import StyledDrawer from "../../../../../../Components/UI/Antd/Drawer.js";

const ReceivedOrderIdPhoneNoteModal = (props) => {
    const { particularRowData,...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Notes`}
                width="35vw"
                visible={props.phoNoteReceivedOrderIdModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onClose={() => props.handleReceivedOrderIdPhoneNoteModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                <ErpNote
                         type="phone"
                         id={props.particularRowData.phoneId}
                        />
              
                </Suspense>
            </StyledDrawer>
        </>
    );


}
const mapStateToProps = ({}) => ({
   
      
});
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
     
      },
      dispatch
    );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReceivedOrderIdPhoneNoteModal);
