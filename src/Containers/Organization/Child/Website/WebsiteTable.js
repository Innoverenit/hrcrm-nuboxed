import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getEmailCredentials } from "../../../../../Settings/Email/EmailAction";
import { StyledTable, StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Icon } from "antd";
  import { getWebsiteCredentials } from "../Website/WebsiteAction";
// import { handleBankModal } from "../../../../ProfileAction";
// import AddBankModal from "./AddBankModal";
// import UpdateBankModal from "../../ProfileBoost/Bank/UpdateBankModal";
// import { handleUpdateBankModal, setEditBank } from "../../../../ProfileAction";
// import { getBankDetails } from "../../../../ProfileAction";
// import EditEmailForm from "../../../../../Settings/Email/Child/EditEmailForm"
// import UpdateEmailModal from "./UpdateEmailModal";
// import { handleUpdateEmailModal } from "../../../Settings/SettingsAction";
// import { setEditEmail } from "../../../Settings/SettingsAction";
class WebsiteTable extends Component {
  componentDidMount() {
     const { getWebsiteCredentials } = this.props;
     getWebsiteCredentials(this.props.orgId);
    // getBankDetails(this.props.userId);
  }
  render() {
    const {
      websitesCredential,
      fetchingWebsiteCredential,
      fetchingWebsiteCredentialError,
    //   userId,
    //   handleUpdateEmailModal,
    //   addUpdateEmailModal,
    //   updateEmailModal,
    //   setEditEmail,
      //   fetchingBankDetails,
      //   bank,
      //   handleUpdateBankModal,
      //   updateBankModal,
      //   setEditBank,
    } = this.props;
    const columns = [
      {
        title: "Website",
        dataIndex: "website",
        // width: "35%"
      },
      {
        title: "Port",
        dataIndex: "port",
      },
      {
        title: "Host Name",
        dataIndex: "host",
      },

    //   {
    //     title: "",
    //     dataIndex: "documentId",
    //     render: (name, item, i) => {
    //       //debugger
    //       return (
    //         <Icon
    //           type="edit"
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             setEditEmail(item);
    //             handleUpdateEmailModal(true);
    //           }}
    //         />
    //       );
    //     },
    //   },
    ];

    // if (fetchingEmailCredential) {
    //   return <BundleLoader />;
    // }
    // console.log(emailCredential);
    return (
      <>
        {/* {emailCredential && ( */}
          <>
            <StyledTable
              columns={columns}
             loading={fetchingWebsiteCredential || fetchingWebsiteCredentialError}
             dataSource={
                Object.keys(websitesCredential).length === 0
                  ? []
                  : [websitesCredential]
              }
            //   onChange={console.log("task onChangeHere...")}
              scroll={{ y: 280 }}
          pagination={false}
            />
            {/* <UpdateEmailModal
              addUpdateEmailModal={addUpdateEmailModal}
              handleUpdateEmailModal={handleUpdateEmailModal}
            /> */}
          </>
         
      </>
    );
  }
}

const mapStateToProps = ({ websites, auth, settings }) => ({
  websitesCredential: websites.websitesCredential,
//   addUpdateEmailModal: settings.addUpdateEmailModal,
  fetchingWebsiteCredential: websites.fetchingWebsiteCredential,
  fetchingWebsiteCredentialError:websites.fetchingWebsiteCredentialError,
//   userId: auth.userDetails.userId,
orgId: auth.userDetails.organizationId,
  //   updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getWebsiteCredentials
    //   getEmailCredentials,
    //   handleUpdateEmailModal,
    //   //   handleUpdateBankModal,
    //   setEditEmail,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteTable);
