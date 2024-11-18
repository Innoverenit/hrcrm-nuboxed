import React, { useMemo, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from 'react-intl';

import { base_url } from "../../../../../../Config/Auth";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getPartnerDocument,
  deleteDocument,
} from "../../../../PartnerAction";
import DownloadIcon from '@mui/icons-material/Download';
import { getDocuments } from "../../../../../Settings/Documents/DocumentsAction";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      partner: { partnerId },
      getPartnerDocument,
    } = this.props;
    getPartnerDocument(partnerId);
    this.props.getDocuments();
  }
  render() {
    const {
      documentsByPartnerId,
      fetchingDocumentsByPartnerId,
      fetchingDocumentsByPartnerIdError,
      deleteDocument,
    } = this.props;
    const documentContentTypeOption = this.props.documents.map((item) => {
      return {
        text: item.documentTypeName,
        value: item.documentTypeName,
      };
    });
    const columns = [
      {
        // title: "Date",
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
        sorter: (a, b) => {
          var nameA = a.creationDate; // ignore upper and lowercase
          var nameB = b.creationDate; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        },
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        // title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "documentTitle",
        onFilter: (value, record) => record.taskSubject.indexOf(value) === 0,
        sorter: (a, b) => a.taskSubject.length - b.taskSubject.length,
      },
      {
        //title: "Type",
        title: (
          <FormattedMessage id="app.documentContentType" defaultMessage="Type" />
        ),
        dataIndex: "documentContentType",
        width: "15%",
        // defaultSortOrder: "descend",
        filters: documentContentTypeOption,
        onFilter: (value, record) => {
          return record.documentContentType === value;
        },
        sorter: (a, b) => {
          const typeA = a.documentContentType;
          const typeB = b.documentContentType;
          if (typeA < typeB) {
            return -1;
          }
          if (typeA > typeB) {
            return 1;
          }
          // names must be equal
          return 0;
        },
      },
      {
        // title: "Description",
        title: <FormattedMessage id="app.description" defaultMessage="Description1" />,
        dataIndex: "documentDescription",
        width: "20%",
        render: (name, item, i) => {
          console.log(item);
          return <span>{elipsize(item.documentDescription || "", 15)}</span>;
        },
        onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        sorter: (a, b) => a.taskType.length - b.taskType.length,
      },
      {
        // title: "Uploaded By",
        title: <FormattedMessage id="app.uploadedby" defaultMessage="Uploaded By" />,
        dataIndex: "uploadedBy",
        width: "8%",
        // onFilter: (value, record) => record.taskType.indexOf(value) === 0,
        // sorter: (a, b) => a.taskType.length - b.taskType.length
        render: (name, item, i) => {
          return (
            <Tooltip title={item.uploadedBy}>
              <SubTitle>
                <MultiAvatar
                  primaryTitle={item.uploadedBy}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
            </Tooltip>
          );
        },
      },
      {
        title: "",
        // dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          console.log(item)
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            >
              <DownloadIcon 
                type="download"
                style={{ cursor: "pointer" ,fontSize:"0.8rem"}}
              />
            </a>
          );
        },
      },
      {
        title: "",
        // dataIndex: "documentTypeId",
        dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title="Do you want to delete?"
              onConfirm={() => deleteDocument(item.documentId)}
            >
              <DeleteIcon  style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: tableHeight }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="PartnerId"
            columns={columns}
            dataSource={documentsByPartnerId}
            // Loading={
            //   fetchingDocumentsByPartnerId ||
            //   fetchingDocumentsByPartnerIdError
            // }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ partner, document }) => ({
  partner: partner.partner,
  fetchingDocumentsByPartnerId: partner.fetchingDocumentsByPartnerId,
  fetchingDocumentsByPartnerIdError: partner.fetchingDocumentsByPartnerIdError,
  documentsByPartnerId: partner.documentsByPartnerId,
  documents: document.documents,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerDocument,
      deleteDocument,
      getDocuments
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
