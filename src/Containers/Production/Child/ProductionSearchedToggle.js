import React,{useState} from "react";
import { Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createProductionLink } from "../ProductionAction";

function ProductionSearchedToggle (props) {

    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
      setChecked(prevChecked => !prevChecked);

      if (!checked) {
        props.createProductionLink(
                    {
                      
                        productName:props.item.name,
                        productId:props.item.productId,
                        quantity:props.item.quantity,
                        locationDetailsId:props.locationId,
                        userId:props.userId
                    },);
      }
    };
  
    return (
      <div>
        <Switch checked={checked} onChange={handleToggle} />
      </div>
    );

}

const mapStateToProps = ({ auth }) => ({
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createProductionLink
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ProductionSearchedToggle);
