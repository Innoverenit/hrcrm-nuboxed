import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from 'dayjs';
import DownloadIcon from '@mui/icons-material/Download';
import Highlighter from "react-highlight-words";
import { base_url } from "../../../../../../Config/Auth";
import { getDocuments } from "../../../../../Settings/Documents/DocumentsAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Tooltip,
  Badge,
  Button,
  Input
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import {getInvestorDocument} from "../../../../InvestorAction"
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined } from "@ant-design/icons";

class InvestorLinkedDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
  }
  componentDidMount() {
    const {
      getInvestorDocument,
    } = this.props;
    getInvestorDocument(this.props.investorDetails.investorId);
    this.props.getDocuments();
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      documentsByInvestorId,
      fetchingDocumentsByInvestorId,
      fetchingDocumentsByInvestorIdError,
      deleteDocument,
    } = this.props;

    const documentTypeOption = this.props.documents.map((item) => {
      return {
        text: item.documentTypeName,
        value: item.documentTypeName,
      };
    });
    const columns = [
      {
        title: <FormattedMessage id="app.date" defaultMessage="Date" />,
        dataIndex: "creationDate",
        sorter: (a, b) => {
          var creationDateA = a.creationDate; // ignore upper and lowercase
          var creationDateB = b.creationDate; // ignore upper and lowercase
          if (creationDateA < creationDateB) {
            return -1;
          }
          if (creationDateA > creationDateB) {
            return 1;
          }

          return 0;
        },
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.creationDate).format("ll")}`}</span>;
        },
      },
      {
        //title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
        dataIndex: "documentTitle",
        ...this.getColumnSearchProps("documentTitle"),
      },
      {
        title: <FormattedMessage id="app.type" defaultMessage="Type" />,
        dataIndex: "documentTitle",
        filters: documentTypeOption,
        onFilter: (value, record) => {
          return record.documentTitle === value;
        },
      },
      {
        //title: "Description",
        title: (
          <FormattedMessage id="app.description" defaultMessage="Description" />
        ),
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
        //title: "Uploaded By",
        title: (
          <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" />
        ),
        dataIndex: "uploadedBy",
        render: (name, item, i) => {
          return (
            <Tooltip title={item.uploadedBy}>
              <SubTitle>
                <MultiAvatar
                  primaryTitle={item.uploadedBy}
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
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
              // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer",fontSize:"0.8rem" }}
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
              title={
                <FormattedMessage
                  id="app.doyouwanttodelete?"
                  defaultMessage="Do you want to delete?"
                />
              }
              // onConfirm={() => deleteDocument(item.documentId)}
            >
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer", color: "red",fontSize:"0.8rem"  }}
              />
            </StyledPopconfirm>
          );
        },
      },
    ];

    // if (fetchingDocumentsByInvestorIdError) {
    //   return <APIFailed />;
    // }
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
            rowKey="CustomerId"
            columns={columns}
            dataSource={documentsByInvestorId}
            Loading={
              fetchingDocumentsByInvestorId ||
              fetchingDocumentsByInvestorIdError
            }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ customer,investor, document }) => ({
  customer: customer.customer,
  documents: document.documents,
  fetchingDocumentsByInvestorId: investor.fetchingDocumentsByInvestorId,
  fetchingDocumentsByInvestorIdError:
    investor.fetchingDocumentsByInvestorIdError,
  documentsByInvestorId: investor.documentsByInvestorId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorDocument,
      // deleteDocument,
      getDocuments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorLinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
