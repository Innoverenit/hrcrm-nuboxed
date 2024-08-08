import React, { useEffect, useState,useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component"
import { SearchOutlined,} from '@ant-design/icons';
import { CurrencySymbol } from "../../../../Components/Common";
import { Tooltip, Menu,Input,Button,Progress,Dropdown } from "antd";
import Highlighter from 'react-highlight-words';
import dayjs from "dayjs";
import { StyledTable } from "../../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
import ReinstateToggle from "../../Child/ReinstateToggle"
import {
  getDeletedOpportunity,
} from "../../OpportunityAction";
import OpportunityDetailView from "./OpportunityDetailView";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityDeletedTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getDeletedOpportunity(page);
    setPage(page + 1);
  }, []);


  const handleLoadMore = () => {
    setTimeout(() => {
     
      props.getDeletedOpportunity(page);
      setPage(page + 1); 
    }, 100);
  
  }
   const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]); 



  const SalesRepType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.assignedTo || "",
          value: sales.assignedTo,
        };
      })
    );
  }, [props.sales]); 

  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
               icon={<SearchOutlined />}           
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
        </div>
      ),
      filterIcon: (filtered) => (     
        <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    fetchingDeletedOpportunity,
    fetchingDeletedOpportunityError,
    deletedOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
  } = props;
  if (fetchingDeletedOpportunity) {
    return <BundleLoader />;
  }
  const columns = [
    {
      title: "",
      width: "2%",
    },

    {
      title: <FormattedMessage
        id="app.opportunityName"
        defaultMessage="Name"
      />,

      dataIndex: "opportunityName",
      ...getColumnSearchProps('opportunityName'),
      defaultSortOrder: "ascend",
      width: "15%",
      render: (name, item, i) => {
        return (
          <OpportunityDetailView
            opportunityId={item.opportunityId}
            opportunityName={item.opportunityName}
          />
        );
      },
    },
     {
      title: <FormattedMessage
        id="app.customer"
        defaultMessage="Customer"
      />,
      dataIndex: "customer",
      ...getColumnSearchProps('customer'),
       width: "15%",
    },

     {
      title: <FormattedMessage
        id="app.sponsor"
        defaultMessage="Sponsor"
      />,
      dataIndex: "contactName",
      ...getColumnSearchProps('contactName'),
       width: "8%",
       render: (name, item, i) => {
        return (
          // <Tooltip title={item.contactName}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            </SubTitle>
          // </Tooltip>
        );
      },
    },
    {
      title: <FormattedMessage
        id="app.startdate"
        defaultMessage="Start Date"
      />,

      dataIndex: "startDate",
      sorter: (a, b) => {
        var nameA = a.startDate; // ignore upper and lowercase
        var nameB = b.startDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        return 0;
      },
      render: (text, item) => {
        const startDate = dayjs(item.startDate).format("ll");
        return <span>{startDate}</span>;
      },
    },
    
    {
      //title: "Value",
      title: <FormattedMessage
        id="app.proposalAmount"
        defaultMessage="Value"
      />,
      //dataIndex: "proposalAmount",
      width: "10%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
      render: (name, item, i) => {        
        return (
          <>
             <span>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}
          </span>
          </>
        );
      },
    },

    {
  title: "Stages",
  width: "7%",
  sorter: (a, b) => {
    var nameA = a; // ignore upper and lowercase
    var nameB = b; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  },
  render: (name, item, i) => {
    var findProbability = 0;
    return (
      <span>
        <Dropdown
          overlay={
            <div>
              <Menu mode="horizontal">
                <Menu.Item
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: "#F5F5F5",
                  }}
                >
                </Menu.Item>
              </Menu>
            </div>
          }
          trigger={["click"]}
        >
          <Tooltip title={item.stageName}>
            {" "}
            <Progress
              type="circle"
              style={{ cursor: "pointer",color:"red" }}
              percent={findProbability}
              //disable={true}
              width={30}
               strokeColor={"#005075"}
             
            />
             {/* )}  */}
          </Tooltip>
        </Dropdown>
      </span>
    );
  },
},
 {
      title:"Sales Rep",
      width: "9%",
       dataIndex: "assignedTo",
       filters: SalesRepType,
      onFilter: (value, record) => {
        return record.assignedTo === value;
      },
       render: (text, item) => {
       return <>
          <span>
            <MultiAvatar
              primaryTitle={item.assignedTo}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
            </span>
           {/* </Tooltip>       */}
       </>
      },
       
    },

     {
      //title: "Email",
      title: <FormattedMessage id="app.owner" defaultMessage="Owner" />,
      dataIndex: "ownerName",
      //...getColumnSearchProps('ownerName'),
      filters:ownerlistType,
      render: (name, item, i) => {
        return (
          <>
           {/* <Tooltip title={item.ownerName}> */}
          <span>
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
               imageURL={item.imageURL}
              imgWidth={"2.1em"}
              imgHeight={"2.1em"}
            />
            </span>
           {/* </Tooltip> */}
           </>
        );
      },
       width: "6%",
    },

    {
      title: "Reinstate",
      margin: "8%",
      render: (name, item, i) => {
        return (
          <>
            <ReinstateToggle 
            opportunityId={item.opportunityId} 
            />
          </>
        );
      },
    },
  ];
  if (fetchingDeletedOpportunityError) {
    return <APIFailed />;
  }

  return (
    <>

<InfiniteScroll
                dataLength={props.deletedOpportunity.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={400}
            >
      <StyledTable
        rowKey="opportunityId"
        columns={columns}
        dataSource={deletedOpportunity}
        onChange={onChange}
        Loading={fetchingDeletedOpportunity || fetchingDeletedOpportunityError}

          pagination={false}
      />
      </InfiniteScroll>
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
  fetchingDeletedOpportunity: opportunity.fetchingDeletedOpportunity,
  fetchingDeletedOpportunityError: opportunity.fetchingDeletedOpportunityError,
  deletedOpportunity: opportunity.deletedOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDeletedTable);
