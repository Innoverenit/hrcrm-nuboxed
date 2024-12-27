
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {  Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';



const Option = StyledSelect.Option;

class PrmotionActionRight extends React.Component {
 
  componentDidMount() {
   
  }
  
  render() {
    console.log(this.props.handlePromotionsDrawer)
    return (
      <div class=" flex items-center" >

        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => this.props.handlePromotionsDrawer(true)}
          >
           

           <DataSaverOnIcon className="!text-icon"/>Add
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({  }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PrmotionActionRight)

