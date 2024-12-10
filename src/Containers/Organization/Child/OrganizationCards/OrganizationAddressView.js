import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/Edit';
class OrganizationAddressView extends Component {
  render() {
    console.log(this.props.organizationList);
    const {
      organizationList: { url, phoneNumber,address, },
        toggleViewType
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      

       
      <>
      <div class=" flex justify-end">
      {this.props.role==="ADMIN"&&(
      <BorderColorIcon 
              // tooltipTitle="Edit"
              // iconType="edit"
              onClick={toggleViewType}
              style={{
                color: "grey",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            />
      )}
        </div>

<OrganizationItemRow label="Address" value={addressdata||""} />
        <OrganizationItemRow label="Street" value={addressdata1||""} />
        <OrganizationItemRow label="City" value={addressdata2||""} />
        <OrganizationItemRow label="State" value={addressdata3||""} />
        <OrganizationItemRow label="Pin Code" value={addressdata4||""} />
      </>
     
      
    );
  }
}

const mapStateToProps = ({ settings,auth }) => ({
  role: auth.userDetails.role
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // getWorkFlowCategory,
  // getProcessForWorkFlowData
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationAddressView);

const OrganizationItemRow = ({ label, value }) => {
  return (    
    <div class=" items-center flex flex-no-wrap"
      style={{ margin: "0.4rem" }}
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </div>
  );
};