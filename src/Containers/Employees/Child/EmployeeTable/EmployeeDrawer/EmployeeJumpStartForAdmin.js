import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../../../Components/Common";
class EmployeeJumpStartForAdmin extends Component {
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
        "679",//0 Created on"
        "979",//1Level
    
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    return (
      <div class=" flex flex-col">
 
 <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-full ">
          <JumpStartBox
            title=  {this.state.translatedMenuItems[0]}
            noProgress
            stringValue
            bgColor="#005075"
          />
          <CurrencySymbol />

          <JumpStartBox
            noProgress
            stringValue
            title=  {this.state.translatedMenuItems[1]}
            bgColor="#0093d7"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contact, account, settings }) => ({
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeJumpStartForAdmin);
