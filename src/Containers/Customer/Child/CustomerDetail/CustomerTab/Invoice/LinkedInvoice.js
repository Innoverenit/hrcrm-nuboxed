import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";

class LinkedInvoice extends Component {
  componentDidMount() {

  }
  render() {
    const columns = [
      {
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
      },
      {
   
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "documentTitle",
      },
      {
        title: (
          <FormattedMessage id="app.description" defaultMessage="Description" />
        ),
        dataIndex: "documentDescription",
        width: "20%", 
      },
      {
        title: (
          <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" />
        ),
        dataIndex: "uploadedBy",
      },
    
      {
        title: "",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer",fontSize:"1.35rem", }}
              />
            </a>
          );
        },
      },
      {
        title: "",
       dataIndex: "documentId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <StyledPopconfirm
              title={<FormattedMessage
                id="app.doyouwanttodelete?"
                defaultMessage="Do you want to delete?"
              />}
            
            >
              <DeleteOutlined type="delete" style={{ cursor: "pointer",fontSize:"1.25rem", color: "red" }} />
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingDocumentsByCustomerIdError) {
    //   return <APIFailed />;
    // }
    // if (fetchingCustomerOpportunity) return <BundleLoader/>;
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
          <StyledTable
            pagination={false}
            scroll={{ y: tableHeight }}
            rowKey="CustomerId"
            columns={columns}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ customer }) => ({
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedInvoice);

