import React, { Component ,lazy ,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../../../Config/Auth";
import {
  getEducationDetails,
  setEditEducation,
} from "../../../../ProfileAction";
import { handleUpdateEducationModal } from "../../../../ProfileAction";
import {
  deleteEducationTable,
} from "../../../../ProfileAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateEducationModal = lazy(() => import("../../ProfileBoost/Education/UpdateEducationModal"));
class EducationTable extends Component {
  componentDidMount() {    
      this.props.getEducationDetails(this.props.employeeId);  
  }

  render() {
    console.log(this.props.employeeId);
    const {
      eduDetails,
      fetchingEducationDetails,
      fetchingEducationDetailsError,
      handleUpdateEducationModal,
      updateEducationModal,
      singleEmployee,
      setEditEducation,
      employeeId,
      deleteEducationTable,
    } = this.props;
    console.log(employeeId);

    const columns = [
      {
        title: "Education Type",
        dataIndex: "educationType",
        // width: "35%"
      },
      {
        title: "Course Name",
        dataIndex: "courseName",
      },
      // {
      //   title: "Course Type",
      //   dataIndex: "courseType",
      // },
      {
        title: "Year of Passing",
        dataIndex: "yearOfPassing",
        
      },
      {
        title: "University/Institute Name",
        dataIndex: "university",
      },
      // {
      //   title: "Specialization",
      //   dataIndex: "specialization",
      // },
      {
        title: "Marks Secured",
        dataIndex: "marksSecured",
      },
      {
       
        title: "Type"
       ,
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
              onClick={() => {
                //debugger
                // this.props.setEmail(item);
                setEditEducation(item);
                handleUpdateEducationModal(true);
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
              onConfirm={() => deleteEducationTable(item.id)}
            >
              <DeleteOutlineIcon type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingEducationDetailsError) {
      return <NodataFoundPage />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={eduDetails}
          pagination={false}
          loading={fetchingEducationDetails || fetchingEducationDetailsError}
          onChange={console.log("task onChangeHere...")}
          expandedRowRender={(record) => {
            return (
              <>
                <p>{record.courseType || ""}</p>
                <p>{record.specialization || ""}</p>
              </>
            );
          }}
        />
<Suspense fallback={"Loading ..."}>
        <UpdateEducationModal
          updateEducationModal={updateEducationModal}
          handleUpdateEducationModal={handleUpdateEducationModal}
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        /></Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  eduDetails: profile.eduDetails,
  updateEducationModal: profile.updateEducationModal,
  fetchingEducationDetails: profile.fetchingEducationDetails,
  fetchingEducationDetailsError: profile.fetchingEducationDetailsError,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEducationDetails,
      handleUpdateEducationModal,
      setEditEducation,
      deleteEducationTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
