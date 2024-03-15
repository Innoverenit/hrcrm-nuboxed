import React,{useState} from "react";
import { Switch} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSupplierSuppliesType  } from "../../../../SuppliersAction";

function SupplierSuppliesToggle (props) {

    const [checked, setChecked] = useState(false);
    const handleToggle = () => {
      setChecked(prevChecked => !prevChecked);

      if (!checked) {
        props.setSupplierSuppliesType(
                    {
                        suppliesId:props.item.suppliesId,
                        supplierSuppliesInd:"true",
                        supplierId:props.supplierId,
    
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
            setSupplierSuppliesType
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierSuppliesToggle);
