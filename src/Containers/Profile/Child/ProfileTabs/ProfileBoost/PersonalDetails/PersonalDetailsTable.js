import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from 'react-intl';
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  handleUpdatePersonalDetailsModal,
  getDocumentDetails,
  setEditDocument,
  deletePersonalTable,
} from "../../../../ProfileAction";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const UpdatePersonalDetailsModal = lazy(() => import("./UpdatePersonalDetailsModal"));
class EducationTable extends Component {
  componentDidMount() {
    const { getDocumentDetails, employeeId } = this.props;
    getDocumentDetails(employeeId);
  }
  
  render() {
    const {
      documentDetails,
      fetchingDocumentDetails,
      fetchingDocumentDetailsError,
      handleUpdatePersonalDetailsModal,
      updatePersonalDetailsModal,
      setEditDocument,
      deletePersonalTable,
    } = this.props;

    const columns = [
      {
        //title: " Type",
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "idType",
        // width: "35%"
      },
      {
        //title: "Document ID number",
        title: (
          <FormattedMessage id="app.idNo" defaultMessage="Document ID number" />
        ),
        dataIndex: "idNo",
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
              tooltipTitle="Edit"
              iconType="edit"
              style={{ fontSize: 16 }}
              handleIconClick={() => {
                setEditDocument(item);
                handleUpdatePersonalDetailsModal(true);
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
              onConfirm={() => deletePersonalTable(item.id)}
            >
              <DeleteOutlined type="delete" style={{ cursor: "pointer", color: "red" }} />
              {/* <Button type="primary" className='edit_hover_class' icon="delete"  /> */}
            </StyledPopconfirm>
          );
        },
      },
    ];

    if (fetchingDocumentDetailsError) {
      return <APIFailed />;
    }
    return (
      <>
        {/* {emailCredential && ( */}
        <StyledTable
         pagination={false}
          columns={columns}
          dataSource={documentDetails}
          loading={fetchingDocumentDetails || fetchingDocumentDetailsError}
          onChange={console.log("task onChangeHere...")}
        />
        <Suspense fallback={<BundleLoader />}>
        <UpdatePersonalDetailsModal
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          updatePersonalDetailsModal={updatePersonalDetailsModal}
          handleUpdatePersonalDetailsModal={handleUpdatePersonalDetailsModal}
        /></Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  documentDetails: profile.documentDetails,
  fetchingDocumentDetails: profile.fetchingDocumentDetails,
  fetchingDocumentDetailsError: profile.fetchingDocumentDetailsError,  
  updatePersonalDetailsModal: profile.updatePersonalDetailsModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocumentDetails,
      setEditDocument,
      handleUpdatePersonalDetailsModal,
      deletePersonalTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
