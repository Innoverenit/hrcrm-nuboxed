import React,{useState} from "react";
import { Switch} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliesSupplierType } from "../SuppliesAction";

function SuppliesCardToggle (props) {

    const [checked, setChecked] = useState(false);
    const handleToggle = () => {
      setChecked(prevChecked => !prevChecked);

      if (!checked) {
        props.setSuppliesSupplierType(
                    {
                        supplierId:props.item.supplierId,
                        supplierSuppliesInd:"true",
                        suppliesId:props.suppliesId,
    
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

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setSuppliesSupplierType
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesCardToggle);
