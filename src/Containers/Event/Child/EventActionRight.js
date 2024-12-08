import React, { Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleEventModal } from "../EventAction";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { BundleLoader } from "../../../Components/Placeholder";
class EventActionRight extends React.Component {
  state = {
    isClicked: "import",
    translatedMenuItems: [],
  };
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
        "85",//0 Add
       
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const {
      userId,
      user,
      role,
      handleCustomerModal,
    } = this.props;
    const { handleEventModal } = this.props;
    return (
      <div class=" flex items-center" >
         {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.eventFullListInd === true &&(
         <Suspense fallback={<BundleLoader />}> <div
         selectedLanguage={this.props.selectedLanguage}
         translateText={this.props.translateText}
         /></Suspense>
         )} 
        <Tooltip placement="left" title="Create">
          <Button type="primary"
            onClick={() => handleEventModal(true)}>
          <DataSaverOnIcon className="!text-icon"/>
          {this.state.translatedMenuItems[0]} 
          {/* Add */}
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth,event }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEventModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EventActionRight);
