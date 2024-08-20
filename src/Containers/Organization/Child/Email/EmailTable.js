import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import { Switch } from "antd";
import { getEmailCredentials } from "../Email/EmailAction";
import { handleUpdateEmailModal } from "../../../Settings/SettingsAction";
import { setEditEmail } from "../../../Settings/SettingsAction";
import { EditOutlined } from "@ant-design/icons";
const UpdateEmailModal = lazy(() => import('./UpdateEmailModal'))
class EmailTable extends Component {
  componentDidMount() {
    const { getEmailCredentials } = this.props;
    getEmailCredentials();
    // getBankDetails(this.props.userId);
  }
  render() {
    const {
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
        title: "Make Default",
         dataIndex: "active",
         width: "12%",
         render: (name, item, i) => {
           console.log(item.thirdPartyAccessInd)
           return (
            
             <span>
         
                <Switch 
                         // checked={props.instockInd || toggle}
                         // disabled={props.thirdPartyAccessInd}
                         isLoading={true}
                         checkedChildren="Yes"
                         unCheckedChildren="No"
                 
                     />
                     
             </span>
         
           );
         },
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
    ];

    if (fetchingEmailCredential) {
      return <BundleLoader />;
    }
    console.log(emailCredential);
    return (
      <>
        {emailCredential && (
          <>
            <StyledTable
              columns={columns}
              dataSource={
                Object.keys(emailCredential).length === 0
                  ? []
                  : [emailCredential]
              }
              onChange={console.log("task onChangeHere...")}
              scroll={{ y: 280 }}
          pagination={false}
            />
            <Suspense fallback={<BundleLoader />}>
            <UpdateEmailModal
              addUpdateEmailModal={addUpdateEmailModal}
              handleUpdateEmailModal={handleUpdateEmailModal}
              selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} 
            /></Suspense>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ email, auth, settings }) => ({
  emailCredential: email.emailCredential,
  addUpdateEmailModal: settings.addUpdateEmailModal,
  fetchingEmailCredential: email.fetchingEmailCredential,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  //   updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmailCredentials,
      handleUpdateEmailModal,
      //   handleUpdateBankModal,
      setEditEmail,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailTable);
