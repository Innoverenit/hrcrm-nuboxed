import React, { Component,lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable, } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { getEmailProfileCredentials } from "../../../../ProfileAction";
import { handleUpdateEmailModal } from "../../../../../Profile/ProfileAction";
import { setEditEmail } from "../../../../../Profile/ProfileAction";
import { EditOutlined } from "@ant-design/icons";
const UpdateEmailModal = lazy(() => import("./UpdateEmailModal"));
const EmailStatusToggle = lazy(() => import("./EmailStatusToggle"));
class EmailTable extends Component {
  componentDidMount() {
    const { getEmailProfileCredentials } = this.props;
    getEmailProfileCredentials();
    // getBankDetails(this.props.userId);
  }
  render() {
    const {
      emailProfileCredential,
      emailCredential,
      fetchingEmailCredential,
      userId,
      handleUpdateEmailModal,
      addUpdateEmailModal,
      updateEmailModal,
      setEditEmail,
      //   fetchingBankDetails,
      //   bank,
      //   handleUpdateBankModal,
      //   updateBankModal,
      //   setEditBank,
    } = this.props;
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
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

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <EditOutlined
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditEmail(item);
                handleUpdateEmailModal(true);
              }}
            />
          );
        },
      },
      {
       title: "Make Default",
        dataIndex: "active",
        width: "12%",
        render: (name, item, i) => {
          console.log(item.thirdPartyAccessInd)
          return (
           
            <span>
        
        <EmailStatusToggle
        
        defaultInd={item.defaultInd}
        id={item.id}
        />
                    
            </span>
        
          );
        },
      },
    ];

    if (fetchingEmailCredential) {
      return <BundleLoader />;
    }
    // console.log(emailCredential);
    return (
      <>
        {/* {emailCredential && ( */}
          <>
            <StyledTable
              columns={columns}
              dataSource={
                emailProfileCredential
              }
              onChange={console.log("task onChangeHere...")}
              scroll={{ y: 280 }}
          pagination={false}
            />
          <  Suspense fallback={<BundleLoader />}>
            <UpdateEmailModal
              addUpdateEmailModal={addUpdateEmailModal}
              handleUpdateEmailModal={handleUpdateEmailModal}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
            /></Suspense>
          </>
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ email, auth,profile, settings }) => ({
  emailCredential: email.emailCredential,
  emailProfileCredential:profile.emailProfileCredential,
  addUpdateEmailModal: settings.addUpdateEmailModal,
  fetchingEmailCredential: email.fetchingEmailCredential,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  //   updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmailProfileCredentials,
      handleUpdateEmailModal,
      //   handleUpdateBankModal,
      setEditEmail,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailTable);
