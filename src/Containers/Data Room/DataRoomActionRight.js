

import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { StyledSelect } from "../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const Option = StyledSelect.Option;

class DataRoomActionRight extends React.Component {

  state = {
    isClicked: "import",
    
  };
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {}
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
    this.fetchMenuTranslations();
  };
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [   

        "85",//Add      

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const { handleDataroomModal, user } = this.props;
    return (
      <>
               <div class=" flex  items-center">
       
           {/* {this.props.user.dataRoomCreateInd ===true && user.imInd === true &&(
<Button
  type="primary"
  onClick={() => this.props.handleDataroomModal(true)}
>
  <DataSaverOnIcon className="!text-icon"/> 
       {this.state.translatedMenuItems[0]}
     
</Button>
   )}  */}
        </div>    
      </>
    );
  }
}
const mapStateToProps = ({ auth, team, account }) => ({ user: auth.userDetails,});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DataRoomActionRight)

