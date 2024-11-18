import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
  getTrainingDetails,
  setEditTraining,
  handleUpdateTrainingModal,
} from "../../../../ProfileAction";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { deleteTrainingTable } from "../../../../ProfileAction";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import VisibilityIcon from '@mui/icons-material/Visibility'; 

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const UpdateTrainingModal = lazy(() => import("./UpdateTrainingModal"));

class TrainingTable extends Component {
  componentDidMount() {
    const { getTrainingDetails, employeeId } = this.props;
    getTrainingDetails(employeeId);
  }
  render() {
    console.log(this.props.training);
    const {
      training,
      fetchingTrainingDetails,
      fetchingTrainingDetailsError,
      handleUpdateTrainingModal,
      updateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    } = this.props;

    const columns = [
      {
        title: " Course Name",
        dataIndex: "courseName",
        // width: "35%"
      },
      {
        title: "Start Date",
        dataIndex: "startDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.startDate).format("LL")}</span>;
        },
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.endDate).format("LL")}</span>;
        },
      },
      {
         title: "Organization/Institution",
        dataIndex: "organization",
      },
      {
        title: "Grade",
        dataIndex: "grade",
      },
      {
        title: "Marks Secured",
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
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <VisibilityIcon
              type="edit"
              style={{ cursor: "pointer" }}
              // onClick={() => handleUpdateTrainingModal(true)}
              onClick={() => {
                setEditTraining(item);
                handleUpdateTrainingModal(true);
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
              onConfirm={() => deleteTrainingTable(item.id)}
            >
              <DeleteOutlineIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingTrainingDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          columns={columns}
          dataSource={training}
          pagination={false}
          loading={fetchingTrainingDetails || fetchingTrainingDetailsError}
          onChange={console.log("task onChangeHere...")}
        />
        <Suspense fallback={<BundleLoader />}>
        <UpdateTrainingModal
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          updateTrainingModal={updateTrainingModal}
          handleUpdateTrainingModal={handleUpdateTrainingModal}
        /></Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  training: profile.trainingDetails,
  fetchingTrainingDetails: profile.fetchingTrainingDetails,
  fetchingTrainingDetailsError: profile.fetchingTrainingDetailsError,
  updateTrainingModal: profile.updateTrainingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTrainingDetails,
      handleUpdateTrainingModal,
      setEditTraining,
      deleteTrainingTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTable);
