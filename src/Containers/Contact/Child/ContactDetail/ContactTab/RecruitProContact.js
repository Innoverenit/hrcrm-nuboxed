import React, { Component } from "react";
import { connect } from "react-redux";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { bindActionCreators } from "redux";
import {
  Tooltip,
  Input, Button,
  message,
  Badge,
} from "antd";
import { Link } from "../../../../../Components/Common";
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
import { getCustomerRecruit } from "../../../../Customer/CustomerAction";
import SearchIcon from '@mui/icons-material/Search';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import { StyledTable } from "../../../../../Components/UI/Antd";


class RecruitProContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      profileId: "",
      contactId: "",
      editModal: false,
      stageList: [],
      recruitmentId: "",
      searchText: '',
      searchedColumn: '',
      userId:"",
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
        <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
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
  handleCallback = () => {
  };
  handleCopy = (
    recruitmentId,
    recruitmentProcessId,
    stageId,
    customerId,
    opportunityId
  ) => {
    const value = {
      recruitmentId: recruitmentId,
      recruitmentProcessId: recruitmentProcessId,
      stageId: stageId,
      customerId: customerId,
      opportunityId: opportunityId,
    };
    //   // this.props.addRecruitProProfile(value, this.handleCallback);
  };

  handleEditModal = (data) => {
    this.setState({ editModal: data });
  };
  handleError = (recruitmentId, profileId) => {
    debugger;
    this.setState({ recruitmentId: recruitmentId, profileId: profileId });
  };
  handleIconClick = (profileId, contactId,userId, stageList) => {
    debugger;
    this.setState({ show: true, profileId, contactId,userId, stageList });
    this.props.getContactById(contactId);
    this.props.getCatagoryByContactId(contactId);
    //   // this.props.getContactDocument(contactId);
  };

  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
  componentDidMount() {
    const {
      customer: { customerId },
      getCustomerRecruit,
    } = this.props;
    
    getCustomerRecruit(customerId);
    
  }
  handleCallBack = (status, customerId,opportunityId, profileId) => {
    if (status === "success") {
      message.success("Offer released");
      this.props.emailSendRecruitment({
        customerId: customerId,
        opportunityId: opportunityId,
        userId: this.props.userId,
        profileId: profileId,
      });
    }
  };
  render() {
    console.log("?>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<", this.state.stageList);
    const columns = [
      {
        //title: "Currency",
        title: "Job ID"  ,
       dataIndex: "jobOrder",
        width: "9%",
        ...this.getColumnSearchProps('jobOrder'),
        render: (name, item, i) => {
         return {
           props: {
           },
           children: (
             <>
               <Badge count={item.number} style={{ right: "1px" }}>
                 <span             
                 >
                   {`${item.jobOrder} `} &nbsp;
                 </span>
               </Badge>
             </>
           ),
         };
        
       },
    
      },
      {
        title: "Requirement"
        ,
        dataIndex: "requirementName",
        width: "10%",
        ...this.getColumnSearchProps('requirementName'),
      },
      {
        title: "Quotation",
        dataIndex: "opprtunityName",
            width:"8%",
            ...this.getColumnSearchProps('opprtunityName'),
              render: (name, item, i) => {
          const opprtunityName = `${item.salutation || ""} ${item.firstName ||
            ""} ${item.middleName || ""} ${item.lastName || ""} `;
            return (
            <Link
            toUrl={`/opportunity`}
            title={`${item.opprtunityName}`}
          />
            );
          }
    },
    {
      title: "Close By",
      dataIndex: "closeByDate",
      width:"7%",
      sorter: (a, b) => {
        var closeByDateA = a.closeByDate; // ignore upper and lowercase
        var closeByDateB = b.closeByDate; // ignore upper and lowercase
        if (closeByDateA < closeByDateB) {
          return -1;
        }
        if (closeByDateA > closeByDateB) {
          return 1;
        }

        return 0;
      },
      render: (text, item) => {
        const closeByDate = dayjs(item.closeByDate).format("ll");
        return <span>{closeByDate}</span>;
      },
  },
  {
        title: "Start",

        dataIndex: "processName",
        width: "7%",
        render: (name, item, i) => {
          console.log(item);
          return <span>{dayjs(item.avilableDate).format("ll")}</span>;
        },
        sorter: (a, b) => {
          if (a.avilableDate < b.avilableDate) {
            return -1;
          }
          if (a.avilableDate > b.avilableDate) {
            return 1;
          }
          return 0;
        },
      },
      {
        title: "Rate/hr",
        dataIndex: "billing",
        width: "6%",
      },
      {
      
        title: "Experience"
      ,
        dataIndex: "experience",
        width: "9%",
        sorter: (a, b) => {
          var experienceA = a.experience; // ignore upper and lowercase
          var experienceB = b.experience; // ignore upper and lowercase
          if (experienceA < experienceB) {
            return -1;
          }
          if (experienceA > experienceB) {
            return 1;
          }
  
          return 0;
        },
      },
      {
        title: "Skill Set",
        
        dataIndex: "skillName",
        width: "9%",
        ...this.getColumnSearchProps('skillName'),
      },
    {
      title: "OnBoarded",
      dataIndex: "onBoardNo",
      width:"9%",
      sorter: (a, b) => {
        var onBoardNoA = a.onBoardNo; // ignore upper and lowercase
        var onBoardNoB = b.onBoardNo; // ignore upper and lowercase
        if (onBoardNoA < onBoardNoB) {
          return -1;
        }
        if (onBoardNoA > onBoardNoB) {
          return 1;
        }

        return 0;
      },
  },
{
  //title: "Sponsor",
  title: "Owner"
  ,
   dataIndex: "recruitOwner",
  width: "5%",
  render: (name, item, i) => {
    return (
      <Tooltip title={item.recruitOwner}>
       
          <MultiAvatar
            primaryTitle={item.recruitOwner}
            imgWidth={"1.8em"}
            imgHeight={"1.8em"}
          />
      
      </Tooltip>
    );
  },
},
{
        title: "Sponsor",
       
        dataIndex: "sponserName",
        width: "5%",
        render: (name, item, i) => {
          return (
            <Tooltip title={item.sponserName}>
             
                <MultiAvatar
                  primaryTitle={item.sponserName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
            
            </Tooltip>
          );
        },
      },
      {
        width: "2%",
        render: (name, item, i) => {
          return (
           <>
          <MonitorHeartIcon
          className=" !text-icon cursor-pointer text-[#df9697]"
          />
           </>
          );
        },
      },
     
    ];
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {/* {callsListByOpportunityId && ( */}
        <StyledTable
          scroll={{ y: tableHeight }}
          pagination={false}
          rowKey="profileId"
          columns={columns}
          dataSource={this.props.recruitByOpportunityId}

        ></StyledTable>
      </>
    );
  }
}

const mapStateToProps = ({ customer, opportunity, auth }) => ({
  customerRecruit:customer.customerRecruit,
  customer: customer.customer,
  opportunityId: opportunity.opportunity.opportunityId,
  recruitByOpportunityId:opportunity.recruitByOpportunityId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerRecruit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitProContact);
