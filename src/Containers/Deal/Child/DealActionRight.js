import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

class DealActionRight extends React.Component {
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
        
          
         
        "85",//0 Add
      "499",//1 Export
      
        
        
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
      viewType,
      user,
      handleDealModal,
    } = this.props;
    return (
      <div class=" flex items-center">
        <Tooltip placement={"left"} title="Create"
             >
  
           {viewType === "table" && user.imInd === true  && user.opportunityCreateInd ===true && (
          <Button
            type="primary"
            // ghost
            onClick={() => handleDealModal(true)}
          >
              <DataSaverOnIcon className="!text-icon"/> 
              {this.state.translatedMenuItems[0]}

          </Button>
            )}  
        </Tooltip>
         <div class="max-sm:hidden">
        <Button
        style={{lineHeight:"inherit"}}
           type="primary"
          // default
        href={`${base_url}/excel/export/user/opportunity/${userId}`}
        >
          {/* Export */}
          <UploadIcon className=" !text-icon"/>
          {this.state.translatedMenuItems[1]}
        </Button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealActionRight)

