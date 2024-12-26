
import React, { useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {  Button, Tooltip } from "antd";
import { StyledSelect } from "../../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

const Option = StyledSelect.Option;

class LocationActionRight extends React.Component {
 
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     translatedMenuItems: [],
  //   };
  // }

  // componentDidMount() {
  //   this.fetchMenuTranslations();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
  //     this.fetchMenuTranslations();
  //   }
  // }

  // fetchMenuTranslations = async () => {
  //   try {
  //     const itemsToTranslate = [
  //       "85",//0Add
  //       "104",//1"Create"
       
        
  //     ];

  //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
  //     this.setState({ translatedMenuItems: translations });
  //   } catch (error) {
  //     console.error('Error translating menu items:', error);
  //   }
  // };
  
  render() {
    console.log(this.props.handleLocationModal)
    return (
      <div class=" flex items-center" >

        <Tooltip placement="left" 
        // title=  {this.state.translatedMenuItems[1]}
        >
          <Button
            type="primary"
            onClick={() => this.props.handleLocationModal(true)}
          >
           

           <DataSaverOnIcon className="!text-icon"/>  {this.props.translatedMenuItems[3]}
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({  }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LocationActionRight)
