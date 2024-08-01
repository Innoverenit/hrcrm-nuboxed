import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

class TeamsActionRight extends React.Component {
  
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
      handleTeamsModal,
    } = this.props;

   
    return (
      <div class="flex items-center" >
        {this.props.viewType === "order" || this.props.viewType === "table" ?
          <Button
            type="primary"
            // ghost
            onClick={() => handleTeamsModal(true)}
          > < DataSaverOnIcon className="!text-icon"/>
          {this.state.translatedMenuItems[0]}{/* Add */}
          </Button>
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsActionRight);