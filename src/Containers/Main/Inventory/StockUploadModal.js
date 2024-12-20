import React, { Component,Suspense ,lazy} from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";

const StockImportForm = lazy(() => import("./StockImportForm"));
class StockUploadModal extends Component {
  render() {
  
    return (
      <div>
 <StyledDrawer
          title="Import"
          width={"30%"}
          visible={this.props.addStockModal}
        onClose={() => this.props.handleStockUpload(false)} >
          <Suspense fallback={<BundleLoader />}>
        <StockImportForm
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        locationDetailsId={this.props.locationDetailsId}
        
        />
       </Suspense>
         
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth,employee,candidate }) => ({  
 });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StockUploadModal);
