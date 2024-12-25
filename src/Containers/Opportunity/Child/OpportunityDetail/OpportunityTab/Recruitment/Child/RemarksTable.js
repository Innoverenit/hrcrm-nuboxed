import React, { Component } from "react";
import dayjs from "dayjs";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import {
  MultiAvatar,
} from "../../../../../../../Components/UI/Elements";
import { Tooltip,Input,Button, } from "antd";
import { StyledTable } from "../../../../../../../Components/UI/Antd";
import { getRemark ,handleUpdateRemarkModal,setEditRemark} from "../../../../../OpportunityAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
class RemarksTable extends Component {
  componentDidMount() {
     this.props.getRemark(this.props.profileId);
  }
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    searchedColumn: '',
    };
  }

  getColumnSearchProps = dataIndex => ({

    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchIcon />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchIcon style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  
  render() {
    const columns = [
      {
        title:"Date",
        dataIndex: "creationDate",
        width:"12%",
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
        render: (text, item) => {
          const availableDate = dayjs(item.creationDate).format("ll");
          return <>
          {/* {item.availableDate === null ? "None" : */}
            <span>
              {dayjs(item.creationDate).format("YYYY/MM/DD")}
            </span>
          {/* } */}
          
        </>
        },
      },
      {
        title: "Stage",
        dataIndex: "stageName",
        width:"10%",
        sorter: (a, b) => {
          const stageA = a.stageA && a.stageA.toLowerCase();
          const stageB = b.stageB && a.stageB.toLowerCase();
          if (stageA < stageB) {
            return -1;
          }
          if (stageA > stageB) {
            return 1;
          }
          return 0;
        },
      },
      {
        title: "Reviewer",
        dataIndex: "reviewer",
        width:"10%",
        ...this.getColumnSearchProps('reviewer'),
        // sorter: (a, b) => {
        //   const reviewerA = a.reviewerA && a.reviewerA.toLowerCase();
        //   const reviewerB = b.reviewerB && a.reviewerB.toLowerCase();
        //   if (reviewerA < reviewerB) {
        //     return -1;
        //   }
        //   if (reviewerA > reviewerB) {
        //     return 1;
        //   }
        //   return 0;
        // },
      },
      {
        title: "Sentiment",
       dataIndex: "score",
        width: "12%",
        sorter: (a, b) => {
          var scoreA = a.score; // ignore upper and lowercase
          var scoreB = b.score; // ignore upper and lowercase
          if (scoreA < scoreB) {
            return -1;
          }
          if (scoreA > scoreB) {
            return 1;
          }
  
          return 0;
        },
        },
      {
        title: "Comments",
        dataIndex: "note",
      },

      {
        title: "Posted",
        dataIndex: "ownerName",
        width: "8%",
        render: (name, item, i) => {
          return (
            <>
             <Tooltip title={item.ownerName}>
            <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                // imageId={item.ownerImageId}
                //  imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
                // style={{borderRadius:"13px" }}
              />
              </span>
             </Tooltip>
            
             </>
          );
        },
        
        },
       
    ];
    // if (this.props.fetchingRemark) {
    //   return <BundleLoader />;
    // }
    return (
      <>
        <StyledTable
          columns={columns}
           dataSource={this.props.remark}
          scroll={{ y: 100 }}
          // pagination={{
          //   defaultPageSize: 15,
          //   showSizeChanger: true,
          //   pageSizeOptions: ["15", "25", "40", "50"],
          // }}
          pagination={false}
        />
       
      </>
    );
  }
}
const mapStateToProps = ({ opportunity }) => ({
   fetchingRemark: opportunity.fetchingRemark,
   remark: opportunity.remark,
   updateRemarkModal:opportunity.updateRemarkModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     getRemark,
     setEditRemark,
     handleUpdateRemarkModal
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RemarksTable);
