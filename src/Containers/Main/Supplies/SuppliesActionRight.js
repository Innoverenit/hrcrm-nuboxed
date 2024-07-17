import React,{lazy,Suspense} from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import { handleSuppliesModal } from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

const SuppliesAddModal=lazy(()=>import("./SuppliesAddModal"));

class SuppliesActionRight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          
         
        "Add",
        
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { handleSuppliesModal, addSuppliesModal, user, viewType } = this.props;

    return (
      <>
        {user.functionName === "Production" && user.designation === "Manager" &&
          viewType === "grid" ?
          <Tooltip title="Export Supplies">
            <Button
              //type="primary"
              className="export"
              href={`${base_url}/export/supplies`}
            >
             
            </Button>
          </Tooltip>
          : null}
        {viewType === "all" && (
          <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              onClick={() => handleSuppliesModal(true)}
            ><DataSaverOnIcon className="!text-icon"/>
             {/* Add */}
             {this.state.translatedMenuItems[0]}
            </Button>
          </Tooltip>
        )}
<Suspense fallback={<BundleLoader/>}>
        <SuppliesAddModal
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage}
          handleSuppliesModal={handleSuppliesModal}
          addSuppliesModal={addSuppliesModal}
        />
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ supplies, auth }) => ({
  addSuppliesModal: supplies.addSuppliesModal,
  user: auth.userDetails,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleSuppliesModal,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SuppliesActionRight)
);
