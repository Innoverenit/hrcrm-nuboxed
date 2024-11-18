import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import { base_url } from "../../../../Config/Auth";
import { getDocuments } from "../../../Settings/Documents/DocumentsAction";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../Components/UI/Antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Tooltip,
  Input,
  Button,
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../Components/UI/Elements";
import {
  getLeadsDocument,
   deleteLeadsDocument,
} from "../../LeadsAction";
import DownloadIcon from '@mui/icons-material/Download';
import { elipsize } from "../../../../Helpers/Function/Functions";

import { DeleteOutlined } from "@ant-design/icons";

class LeadsDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
    };
  }
  componentDidMount() {
    const {
      lead: { leadsId },
      getLeadsDocument,
    } = this.props;
    getLeadsDocument(leadsId);
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
      documentsByLeadsId,
      fetchingDocumentsByLeadsId,
      fetchingDocumentsByLeadsIdError,
      deleteLeadsDocument,
    } = this.props;

    const columns = [
      {
        title:"Date" ,
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
        title: "Name",
        dataIndex: "documentTitle",
        ...this.getColumnSearchProps("documentTitle"),
      },
      {
        title:"Type",
        dataIndex: "documentContentType",
      },
      {
        title: "Description",
        
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
        title: "Uploaded By",
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
        // dataIndex: "documentTypeId",
        width: "5%",
        render: (name, item, i) => {
          return (
            <a
              href={`${base_url}/document/${item.documentId}`}
              // target="_blank"
            >
              <DownloadIcon
                type="download"
                // onClick={() => startDownload()}
                style={{ cursor: "pointer" }}
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
              onConfirm={() => deleteLeadsDocument(item.documentId)}
            >
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer", color: "red" }}
              />
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
            rowKey="CustomerId"
            columns={columns}
            dataSource={documentsByLeadsId}
            Loading={
              fetchingDocumentsByLeadsId ||
              fetchingDocumentsByLeadsIdError
            }
            onChange={console.log("task onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ leads, document }) => ({
  lead: leads.lead,
   documents: document.documents,
  fetchingDocumentsByLeadsId: leads.fetchingDocumentsByLeadsId,
  fetchingDocumentsByLeadsIdError:
  leads.fetchingDocumentsByLeadsIdError,
  documentsByLeadsId: leads.documentsByLeadsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeadsDocument,
      deleteLeadsDocument,
      getDocuments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
