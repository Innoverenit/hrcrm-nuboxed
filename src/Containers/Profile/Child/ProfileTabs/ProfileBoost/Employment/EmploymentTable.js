import React, { Component,lazy , Suspense} from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { handleUpdateEmploymentModal } from "../../../../ProfileAction";
import {
  getEmploymentDetails,
  setEditEmployment,
} from "../../../../ProfileAction";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import { deleteEmploymentTable } from "../../../../ProfileAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateEmploymentModal = lazy(() => import("../Employment/UpdateEmploymentModal"));
class EmploymentTable extends Component {
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
    const { getEmploymentDetails, employeeId } = this.props;
    getEmploymentDetails(employeeId);
  }

  render() {
    const {
      fetchingEmploymentDetails,
      fetchingEmploymentDetailsError,
      employment,
      handleUpdateEmploymentModal,
      updateEmploymentModal,
      setEditEmployment,
      deleteEmploymentTable,
    } = this.props;

    // const { emailCredential, fetchingEmailCredential } = this.props;
    const columns = [
      {
        // title: "Company Name",
        title: (
          <FormattedMessage
            id="app.companyname"
            defaultMessage="Company Name"
          />
        ),
        dataIndex: "companyName",
        // width: "35%"
      },
      {
        //title: "Designation",
        title: (
          <FormattedMessage id="app.designation" defaultMessage="Designation" />
        ),
        dataIndex: "designation",
      },
      {
        //title: "Start Date",
        title: (
          <FormattedMessage id="app.startDate" defaultMessage="Start Date" />
        ),
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        //title: "End Date",
        title: <FormattedMessage id="app.endDate" defaultMessage="End Date" />,
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("LL")}</span>;
        },
      },
      //combine and show salary +curr+type
      {
        title: "Salary",
        render: (name, item, i) => {
          return (
            <span>{`${item.salary} ${item.currency} ${item.salaryType}`}</span>
          );
        },
      },

      {
        //title: "Description",
        title: (
          <FormattedMessage id="app.description" defaultMessage="Description" />
        ),
        dataIndex: "description",
      },
      {
        //title: "Marks Secured",
        title: (
          <FormattedMessage
            id="app.type"
            defaultMessage="Type"
          />
        ),
        // dataIndex: "marksSecured",
      },
      {
        title: "",
        dataIndex: "documentId",
        width: "9%",
        render: (name, item, i) => {
          return (
            <>
              {item.documentId ? (
                <a
                  href={`${base_url}/document/${item.documentId}`}
                  target="_blank"
                >
                  <DownloadIcon
                    type="download"
                    // onClick={() => startDownload()}
                    style={{ cursor: "pointer" }}
                  />
                </a>
              ) : null}
            </>
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
              onConfirm={() => deleteEmploymentTable(item.id)}
            >
              <DeleteOutlineIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },

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
                setEditEmployment(item);
                handleUpdateEmploymentModal(true);
              }}
            />
          );
        },
      },
    ];

    if (fetchingEmploymentDetailsError) {
      return <NodataFoundPage />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
            pagination={false}
          columns={columns}
          dataSource={employment}
          loading={fetchingEmploymentDetails || fetchingEmploymentDetailsError}
          onChange={console.log("task onChangeHere...")}
        />
       <Suspense fallback={"Loading ..."}>
        <UpdateEmploymentModal
          updateEmploymentModal={updateEmploymentModal}
          handleUpdateEmploymentModal={handleUpdateEmploymentModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        /></Suspense>
        {/* )} */}
      
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  employment: profile.employmentDetails,
  fetchingEmploymentDetails: profile.fetchingEmploymentDetails,
  fetchingEmploymentDetailsError: profile.fetchingEmploymentDetailsError,
  updateEmploymentModal: profile.updateEmploymentModal,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmploymentDetails,
      setEditEmployment,
      handleUpdateEmploymentModal,
      deleteEmploymentTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentTable);
