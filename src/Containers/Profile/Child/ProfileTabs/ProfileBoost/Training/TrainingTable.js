import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
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
import { deleteTrainingTable } from "../../../../ProfileAction";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
        //title: " Course Name",
        title: (
          <FormattedMessage id="app.courseName" defaultMessage=" Course Name" />
        ),
        dataIndex: "courseName",
        // width: "35%"
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
      {
        // title: "Organization/Institution",
        title: (
          <FormattedMessage
            id="app.organization"
            defaultMessage="Organization/Institution"
          />
        ),
        dataIndex: "organization",
      },
      {
        //title: "Grade",
        title: <FormattedMessage id="app.grade" defaultMessage="Grade" />,
        dataIndex: "grade",
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
        dataIndex: "documentId",
        render: (name, item, i) => {
          //debugger
          return (
            <EditOutlined
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
              <DeleteOutlined type="delete" style={{ cursor: "pointer", color: "red" }} />
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
        <UpdateTrainingModal
          updateTrainingModal={updateTrainingModal}
          handleUpdateTrainingModal={handleUpdateTrainingModal}
        />
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
