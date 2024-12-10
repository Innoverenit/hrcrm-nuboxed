import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
class OrganizationStatsView extends Component {
  render() {
    const {
      organizationList: {
        organizationUrl,
        facebook,
        twitter,

        linkedinUrl,
      },
      toggleViewType,
    } = this.props;
    // const mobile = `${countryDialCode || ""} ${mobileNo || ""}`;
    // const phon = `${countryDialCode1 || ""} ${phoneNo || ""}`;
    return (
      <>
          <div class=" flex justify-end">
          {this.props.role==="ADMIN"&&(
          <BorderColorIcon
            tooltipTitle="Edit"
            iconType="edit"
            onClick={toggleViewType}
            style={{
              color: "grey",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          />
          )}
        </div>
        <OrganizationItemRow label="Website" value={organizationUrl} isLink />
        {/* <OrganizationItemRow label="Mobile #" value={""} />
        <OrganizationItemRow label="Phone #" value={""} /> */}
        <OrganizationItemRow label="Twitter" value={twitter} />
        <OrganizationItemRow label="Linkedin" value={linkedinUrl} />
        <OrganizationItemRow label="Facebook" value={facebook} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationStatsView);

const OrganizationItemRow = ({ label, value, isLink }) => {
  return (
    <div class=" items-center flex flex-no-wrap"
      style={{ margin: "0.4rem" }}
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >
        {label}
      </div>
      {isLink ? (
       <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk"
          overflow="hidden"
          textOverflow="ellipsis"
          style={{ marginLeft: "-4rem" }}
        >
          <a href={`https://${value}`} target="_blank">
            {value}
          </a>
        </div>
      ) : (
          <div
           
          >
            {value}
          </div>
        )}
    </div>
  );
};
