import React, { Component } from "react";
import {
  SubTitle,
} from "../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/Edit';

class OrganizationAboutView extends Component {
  render() {
    const {
      organizationList: { industryType,vat,fiscalStartDate,fiscalStartMonth, tradeCurrency, companySize },
      toggleViewType,
    } = this.props;
    // console.log(highestLevel);
    return (
      <>
        <div class=" flex justify-end" >
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
        <OrganizationItemRow
          label="Fiscal Year"
          value={`${fiscalStartDate} ${fiscalStartMonth}`}
        />
        <OrganizationItemRow label="Reporting currency" value={tradeCurrency} />
        <OrganizationItemRow label="Company Size" value={companySize} />
        <OrganizationItemRow label="Industry type" value={industryType} />
        <OrganizationItemRow label="VAT(In %)" value={vat} />
       
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationAboutView);



const OrganizationItemRow = ({ label, value }) => {
  return (
    <div class=" items-center flex flex-no-wrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600, width: 300 }}>
        {label}
      </SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "0.2rem" }}
      >
        {value}
      </SubTitle>
    </div>
  );
};
