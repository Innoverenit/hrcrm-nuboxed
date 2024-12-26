import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { Button } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import UploadIcon from '@mui/icons-material/Upload';
const Option = StyledSelect.Option;

class LeadsActionRight extends React.Component {
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
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       "85",//Add 0
       "123",//Import 1
       
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { handleLeadsModal, user} = this.props;
    return (
      <>
        {user.leadsCreateInd === true && user.crmInd === true &&(
        <div class=" flex  items-center">
         <div className="max-sm:hidden">
          <Button type="primary"  
        onClick={() => this.props.handleLeadsImportModal(true)}
        >
            <UploadIcon className=" !text-icon"/>
            {this.state.translatedMenuItems[1]}
            {/* Import */}
          </Button>
          </div>
          
      {this.props.viewType==="teams" || this.props.viewType ==="all" ?  "" :
      <>

          <Button type="primary"  onClick={() => handleLeadsModal(true)}>
          <DataSaverOnIcon className="!text-icon"/>
          {this.state.translatedMenuItems[0]}
          {/* Add */}
          </Button>
          
          </>
        }
      
        </div>
  
        )} 
         
       
      </>
    );
  }
}

const mapStateToProps = ({ auth, team,leads, account }) => ({
  user: auth.userDetails,
  // addLeadsImportModal:leads.addLeadsImportModal,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // handleLeadsImportModal
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LeadsActionRight)

