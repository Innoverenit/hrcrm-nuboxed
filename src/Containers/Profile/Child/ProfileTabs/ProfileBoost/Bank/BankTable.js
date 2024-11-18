import React, { Component,lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { handleUpdateBankModal, setEditBank } from "../../../../ProfileAction";
import { getBankDetails } from "../../../../ProfileAction";
import { deleteBankTable } from "../../../../ProfileAction";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

import { FormattedMessage } from 'react-intl';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const UpdateBankModal = lazy(() => import("../../ProfileBoost/Bank/UpdateBankModal"));
class BankTable extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });
  componentDidMount() {
    const { getBankDetails, employeeId } = this.props;
    getBankDetails(employeeId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bank,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
      deleteBankTable,
    } = this.props;
    const columns = [

      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.bankName" defaultMessage="Account Holder" />
        ),
        dataIndex: "accountHolder",
        // width: "35%"
      },
      {
        //title: "Bank Name",
        title: (
          <FormattedMessage id="app.bankName" defaultMessage="Bank Name" />
        ),
        dataIndex: "bankName",
        // width: "35%"
      },

      {
        //title: "Branch Name",
        title: (
          <FormattedMessage id="app.branchName" defaultMessage="Branch Name" />
        ),
        dataIndex: "branchName",
      },

      {
        //title: "A/C Number",
        title: (
          <FormattedMessage id="app.accountNo" defaultMessage=" Account#" />
        ),
        dataIndex: "accountNo",
      },

      {
        //title: "IFSC CODE",
        title: (
          <FormattedMessage id="app.ifscCode" defaultMessage="SWIFT Code" />
        ),
        dataIndex: "ifscCode",
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
                setEditBank(item);
                handleUpdateBankModal(true);
              }}
            />
          );
        },
      },
      {
        title: "",
        dataIndex: "id",
        width: "2%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteBankTable(item.id)}
            >
              <DeleteOutlined type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingBankDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={bank}
          loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
        />
 <Suspense fallback={<BundleLoader />}>
        <UpdateBankModal
        translateText={this.props.translateText}
        selectedLanguage={this.props.selectedLanguage}
          updateBankModal={updateBankModal}
          handleUpdateBankModal={handleUpdateBankModal}
        />
</Suspense>
        {/* )} */}
        {/* <StyledModal
                    title={"Configure"}
                    width="36%"
                    // height="50%"
                    visible={this.state.emailModalVisible}
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={this.handleEmailModalVisible}
                    footer={null}
                >
                    <EditEmailForm handleEmailModalVisible={this.handleEmailModalVisible} />
                </StyledModal> */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  bank: profile.bankDetails,
  fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBankDetails,
      handleUpdateBankModal,
      setEditBank,
      deleteBankTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BankTable);
