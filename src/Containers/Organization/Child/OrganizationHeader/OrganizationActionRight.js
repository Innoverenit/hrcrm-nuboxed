import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

const Option = StyledSelect.Option;

class OrganizationActionRight extends React.Component {
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
    const {
      userId,
      user,
      role,
      handleOrganizationModal,
    } = this.props;
    return (
      <div class=" flex  items-center">
   
      
        <Tooltip placement="left" title="Create">
          {this.props.user.customerCreateInd ===true && user.crmInd === true &&(
          <Button
            type="primary"
            onClick={() => handleOrganizationModal(true)}
          >
          <DataSaverOnIcon className="!text-icon"/>{this.state.translatedMenuItems[0]}
          </Button>
           )} 
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationActionRight)

