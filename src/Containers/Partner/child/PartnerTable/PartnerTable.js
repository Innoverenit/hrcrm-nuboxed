import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import ExploreIcon from '@mui/icons-material/Explore';
import InfiniteScroll from "react-infinite-scroll-component";
import { bindActionCreators } from "redux";
import StatusToggle from "./StatusToggle";
import dayjs from "dayjs";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from "react-highlight-words";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Tooltip,  Button, Input, Select } from "antd";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import {
  getPartnerListByUserId,
  getPartnerDetailsById,
  handlePartnerEmailDrawerModal,
  setEditPartner,
  handleUpdatePartnerModal,
  updateOwnerpartnerById,
  emptyPartner
} from "../../PartnerAction";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import {
  getRecruiterName,
} from "../../../Opportunity/OpportunityAction";
import { getOwnsalesList } from "../../PartnerAction";
import PartnerDetailView from "./PartnerDetailView";
import PartnerSkillsLoadMore from "../PartnerDetail/PartnerTab/PartnerSkillsLoadMore";
import AddPartnerEmailDrawerModal from "./AddPartnerEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdatePartnerModal = lazy(() =>
  import("../UpdatePartner/UpdatePartnerModal")
);

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function PartnerTable(props) {

  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getPartnerListByUserId(props.userId,page);
    props.getSectors();
    setPage(page + 1);
    props.getRecruiterName();
    props.getOwnsalesList();
  }, []);

  useEffect(()=>{
    return()=>props.emptyPartner();
  },[] );


  const handleLoadMore = () => {
    setTimeout(() => {
            setPage(page + 1);
            props.getPartnerListByUserId(props.currentUser?props.currentUser:props.userId,page);
    }, 100);
  
  }

  const salelist = props.sales.map((item) => {
    return {
      label: item.fullName,
      value: item.employeeId,
    };
  });
  const recruiterlist = props.recruiterName.map((item) => {
    return {
      label: item.fullName,
      value: item.employeeId,
    };
  });
  const newSkill =
    props.skillList &&
    props.skillList.map((item) => {
      return { skillName: item };
    });

  const mergedlist = salelist.concat(recruiterlist);
  const ownerlistType = useMemo(() => {
    if (!props.ownSales) return [];
    return (
      props.ownSales.length &&
      props.ownSales.map((ownSales) => {
        return {
          text: ownSales.fullName || "",
          value: ownSales.fullName,
        };
      })
    );
  }, [props.ownSales]);

  const AssignedTypeOption = useMemo(() => {
    if (!props.ownSales) return [];
    return (
      props.ownSales.length &&
      props.ownSales.map((ownSales) => {
        return {
          text: ownSales.fullName || "",
          value: ownSales.fullName,
        };
      })
    );
  }, [props.ownSales]);


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  const [visibleselect, setvisibleselect] = useState(false);
  const [selectedValue, setselectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleTransferClick() {
    setvisibleselect(true);
  }
  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }
  function handleSend() {
    let data = {
      // userId:props.userId,
      partnerIds: selectedRowKeys,
    };
    setselectedValue(props.updateOwnerpartnerById(selectedValue, data));
    console.log(selectedValue, selectedRowKeys);
  }

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  function handleSelected(value) {
    setselectedValue(value);
    console.log(value);
  }

  const [currentPartnerId, setCurrentPartnerId] = useState("");

  function handleSetCurrentPartnerId(partnerId) {
    setCurrentPartnerId(partnerId);
    console.log(partnerId);
  }

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
            icon={<SearchIcon />}
            //icon="search"
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
        <SearchIcon
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
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
            textToHighlight={text ? text.toString() : ""}
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

  const sectorNameOption = useMemo(() => {
    if (!props.sectors) return [];
    return (
      props.sectors.length &&
      props.sectors.map((sectors) => {
        return {
          text: sectors.sectorName || "",
          value: sectors.sectorName,
        };
      })
    );
  }, [props.sectors]);

  const {
    fetchingPartners,
    user,
    partnerByUserId,
    allpartnerByUserId,
    handleUpdatePartnerModal,
    updatePartnerModal,
    fetchingPartnersError,
  } = props;

  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <Tooltip title={item.partnerName}>
           <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">
              <MultiAvatar2
                primaryTitle={item.partnerName}
                imageId={item.imageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "partnerName",
      width: "15%",
      ...getColumnSearchProps("partnerName"),
      sorter: (a, b) => {
        var nameA = a.partnerName; // ignore upper and lowercase
        var nameB = b.partnerName; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const fullName = ` ${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""}`;

        const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        console.log(date, currentdate, currentdate === date);
        const dataLoc = ` Address : ${item.address &&
          item.address.length &&
          item.address[0].address1}
         Street : ${item.address &&
           item.address.length &&
           item.address[0].street}
        State : ${item.address && item.address.length && item.address[0].state}
       Country : ${(item.address &&
         item.address.length &&
         item.address[0].country) ||
         ""}
         PostalCode : ${item.address &&
           item.address.length &&
           item.address[0].postalCode} `;
        return (
          <>
            <PartnerDetailView
              partnerId={item.partnerId}
              partnerName={item.partnerName}
            />
            &nbsp;&nbsp;
            {date === currentdate ? (
              <span
                style={{
                  color: "tomato",
                  fontWeight: "bold",
                }}
              >
                New
              </span>
            ) : null}
          </>
        );
      },
    },

    {
      width: "3%",
      render: (name, item, i) => {
        return (
        <>
         
              <Tooltip title={item.url}>
              {item.url !== "" && (
               <span
              //type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => { 
              }}
            >        <a
            href={`https://${item.url}`}
           target="_blank"
          >   
               <ExploreIcon 
            style={{ cursor: "pointer",color:"green",fontSize: "0.8rem", }}
          />
              </a>
            </span>
              )}
         </Tooltip>
           
          </>
        );
      },
    },
    {
      title: "Sector" ,
      dataIndex: "sector",
      width: "15%",
      filters: sectorNameOption,
      onFilter: (value, record) => {
        return record.sector === value;
      },
    },
    {
      //title: "Email",
      title:"Country" ,
      dataIndex: "country",
      width: "9%",
      sorter: (a, b) => {
        var nameA = a.country; // ignore upper and lowercase
        var nameB = b.country; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },      
    },

    {
      title: "Skills",
      //dataIndex: "skillName",
      width: "18%",
      ...getColumnSearchProps("skillName"),
      render: (name, item, i) => {
        return (
          <>
            <span>
              <PartnerSkillsLoadMore skill={item.skill} />
            </span>
          </>
        );
      },
     
    },
    {
      title:"Assigned",
       dataIndex: "assignedTo",
      width: "10%",
      filters: AssignedTypeOption,
      onFilter: (value, record) => {
        return record.country === value;
      },
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.assignedTo}>
              <span>
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
            </Tooltip>

          </>
        );
      },

    },


    {
      //title: "Email",
      title:"Owner" ,
      dataIndex: "ownerName",
      width: "9%",
      filters: ownerlistType,

      onFilter: (value, record) => {
        return record.fullName === value;
      },
      // ...getColumnSearchProps('ownerName'),
      render: (name, item, i) => {
        return (
          <>
            <Tooltip title={item.ownerName}>
              <span>
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"2.1em"}
                  imgHeight={"2.1em"}
                />
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      //title: "Type",
      title:"Approved" ,
      dataIndex: "status",
      width: "8%",
      render(name, item) {
        return (
          <>
            <StatusToggle partnerId={item.partnerId} status={item.status} />
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            {/* {user.talentUpdateInd ===true && ( */}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.getCustomerDetailsById(item.customerId);
                props.getCustomerKeySkill(item.customerId);
                props.handleCustomerDrawerModal(item, true);
              }}
            >
              {user.pulseAccessInd === true && 
              <MonitorHeartIcon style={{fontSize: "0.8rem", color: "#df9697"}}/>}
            </span>
          </>
        );
      },
    },   
    {
      width: "2%",
      render: (name, item, i) => {
        const dataLoc = ` Address : ${item.address &&
          item.address.length &&
          item.address[0].address1} 
   Street : ${item.address && item.address.length && item.address[0].street}   
  State : ${item.address && item.address.length && item.address[0].state}
 Country : ${(item.address && item.address.length && item.address[0].country) ||
   ""} 
   PostalCode : ${item.address &&
     item.address.length &&
     item.address[0].postalCode} `;
        return (
          <>
            <Tooltip
              overlayStyle={{ maxWidth: "300px" }}
              title={dataLoc}
            >
              <span
                style={{
                  // color:
                  //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <>
            <Tooltip title={item.email}>
              <MailOutlineIcon type="mail"
               style={{ cursor: "pointer" }} 
               onClick={() => {
               props.getPartnerDetailsById(item.partnerId );
               props.handlePartnerEmailDrawerModal(true);
              }}
               />
                
          
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "documentId",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip
            title="Edit"
          >
            {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
            {props.user.vendorUpdateInd === true && (
             <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setEditPartner(item);
                  handleUpdatePartnerModal(true);
                  handleSetCurrentPartnerId(item.partnerId);
                }}
              >
                  <BorderColorIcon style={{fontSize: "0.8rem",}}/>
              </span>
            )}
          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "1%",
    },
  ];
  if (fetchingPartnersError) {
    return <NodataFoundPage />;
  }

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 100;
  return (
    <>
      <Button
        type="primary"
        onClick={start}
        disabled={!hasSelected}
        loading={loading}
      >
        Clear
      </Button>
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Button
        type="primary"
        onClick={handleTransferClick}
        disabled={!hasSelected}
      >
        Select
      </Button>
      {visibleselect && hasSelected && (
        <>
          <Select style={{ width: 120 }} onChange={handleSelected}>
            {mergedlist.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            })}
          </Select>
          <Button type="primary" onClick={handleSend}>
            Transfer
          </Button>
        </>
      )}
      <InfiniteScroll
                dataLength={props.partnerByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={600}
            >
      <StyledTable
        rowSelection={rowSelection}
        rowKey={(record) => record.partnerId}
        columns={columns}
        dataSource={partnerByUserId}
        Loading={fetchingPartners || fetchingPartnersError}
        pagination={false}
      />
      </InfiniteScroll>
     
<AddPartnerEmailDrawerModal
handlePartnerEmailDrawerModal={props.handlePartnerEmailDrawerModal}
addDrawerPartnerEmailModal={props.addDrawerPartnerEmailModal}
/>
      <UpdatePartnerModal
        partnerId={currentPartnerId}
        updatePartnerModal={updatePartnerModal}
        handleUpdatePartnerModal={handleUpdatePartnerModal}
        handleSetCurrentPartnerId={handleSetCurrentPartnerId}
      />
    </>
  );
}

const mapStateToProps = ({ auth, partner, opportunity, sector }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  partnerByUserId: partner.partnerByUserId,
  sectors: sector.sectors,
  sales: opportunity.sales,
  ownSales: partner.ownSales,
  addDrawerPartnerEmailModal:partner.addDrawerPartnerEmailModal,
  recruiterName: opportunity.recruiterName,
  allpartnerByUserId: partner.allpartnerByUserId,
  fetchingPartners: partner.fetchingPartners,
  fetchingPartnersError: partner.fetchingPartnersError,
  updatePartnerModal: partner.updatePartnerModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPartnerListByUserId,
      emptyPartner,
      getRecruiterName,
      handleUpdatePartnerModal,
      setEditPartner,
      getSectors,
      getOwnsalesList,
      updateOwnerpartnerById,
      handlePartnerEmailDrawerModal,
      getPartnerDetailsById,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PartnerTable);


