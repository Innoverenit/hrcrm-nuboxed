import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";

import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import VisibilityIcon from '@mui/icons-material/Visibility';
class HolidayTable extends Component {
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
    const { getBankDetails } = this.props;
    // getBankDetails(this.props.userId);
  }
  render() {
    const {
      fetchingBankDetails,
      fetchingBankDetailsError,
      bank,
      handleUpdateBankModal,
      updateBankModal,
      setEditBank,
    } = this.props;
    const columns = [
      {
        title: "Name",
        // dataIndex: "bankName",
        // width: "35%"
      },
      {
        title: "Date",
        // dataIndex: "branchName",
      },
      {
        title: "Type",
        // dataIndex: "accountNo",
      },
      //   {
      //     title: "IFSC CODE",
      //     dataIndex: "ifscCode",
      //   },
      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <VisibilityIcon
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditBank(item);
                // handleUpdateBankModal(true);
              }}
            />
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
          Loading={fetchingBankDetails || fetchingBankDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: 460 }}
          pagination={false}
        />
        {/* <UpdateBankModal
                    updateBankModal={updateBankModal}
                    handleUpdateBankModal={handleUpdateBankModal}
                /> */}
      </>
    );
  }
}

const mapStateToProps = ({ profile, auth }) => ({
  // bank: profile.bankDetails,
  // fetchingBankDetails: profile.fetchingBankDetails,
  fetchingBankDetailsError: profile.fetchingBankDetailsError,
  userId: auth.userDetails.userId,
  // updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getBankDetails,
      // handleUpdateBankModal,
      // setEditBank,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HolidayTable);
