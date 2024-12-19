import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import SearchIcon from '@mui/icons-material/Search';
import {getSectors} from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
import { getAllSalesList} from "../../../Opportunity/OpportunityAction";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Tooltip,Button,Input } from "antd";
import Highlighter from 'react-highlight-words';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import {
  getCustomerListByCategory,
  handleUpdateCustomerModal,
  setEditCustomer,
} from "../../CustomerAction";
import styled from "styled-components";
const CustomerDetailView=lazy(()=>import("./CustomerDetailView"));


function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerWhiteTable(props) {
  useEffect(() => {
    props.getCustomerListByCategory("white");
    props.getAllSalesList();
  }, []);

  const [currentCustomerId, setCurrentCustomerId] = useState("");
  // const [isShown, setIsShown] = useState(false);

  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
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
        // <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
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

  const sectorsNameOption = useMemo(() => {
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
    fetchingCustomers,
    customerByCategory,
    handleUpdateCustomerModal,

    fetchingCustomersError,
  } = props;
  // if (fetchingCustomers) {
  //   return <BundleLoader />;
  // }
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
      width: "19%",
      // defaultSortOrder: "ascend",
      sorter: (a, b) => {
        var nameA = a.name; // ignore upper and lowercase
        var nameB = b.name; // ignore upper and lowercase
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
        return (
          <>
          <CustomerDetailView customerId={item.customerId} name={item.name} />
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
     
      title: "URL",
      dataIndex: "url",
      width:"15%",
    },
   
    {
    
      title: "Sector" ,
      dataIndex: "sector",
       width: "13%",
       filters: sectorsNameOption,
      

       onFilter: (value, record) => {
         return record.sector === value;
       },
    },

    {
    
      title: "Email",
      dataIndex: "email",
      width: "19%",
      ...getColumnSearchProps('email'),
    },
    
    {
    title:"Address" ,
      // dataIndex: "address[0].address1",
      render: (name, item, i) => {
        console.log(item);
        return `${(item.address &&
          item.address.length &&
          item.address[0].address1) ||
          ""} 
        ${(item.address && item.address.length && item.address[0].address2) ||
          ""}
         ${(item.address && item.address.length && item.address[0].street) ||
           ""} 
           ${(item.address && item.address.length && item.address[0].state) ||
            ""} 
            ${(item.address && item.address.length && item.address[0].postalCode) ||
              ""} 
        ${(item.address && item.address.length && item.address[0].city) || ""},
            `;
      },
      width: "30%",
    },
    {
      title:"Country",
      dataIndex: "country",
      width: "10%",
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
      title: "Owner" ,
      dataIndex: "ownerName",
      width: "8%",
      // ...getColumnSearchProps('ownerName'),
      filters:ownerlistType,

  onFilter: (value, record) => {
    return record.fullName === value;
  },

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
      title: "",
      dataIndex: "documentId",
      width:"3%",
     
      render: (name, item, i) => {
        // const IconShowhover = item.documentId !== null ? true : false;
       
        return (
           
          <>
          {/* {IconShowhover && */}
          <Tooltip title="Edit">
        <span
              type="edit"
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditCustomer(item);
                handleUpdateCustomerModal(true);
                handleSetCurrentCustomerId(item.customerId);
              }}
            >
                    <BorderColorIcon  style={{fontSize: "0.8rem",}}/>
              </span>
          </Tooltip>
         {/* }  */}
            </>
           
        );
     
      },
    },
  ];
//   if (fetchingCustomersError) {
//     return <APIFailed />;
//   }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <StyledTable
        rowKey="accountId"
        columns={columns}
        dataSource={customerByCategory}
        // Loading={fetchingCustomers || fetchingCustomersError}
        // scroll={{ y: 500 }}
        // pagination={false
        scroll={{ y: tableHeight }}
       
        pagination={false}
          // defaultPageSize: 15,
          // showSizeChanger: true,
          // pageSizeOptions: ["15", "25", "40", "50"],
        
      />

      {/* <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      /> */}
    </>
  );
}
// }
const mapStateToProps = ({customer,opportunity}) => ({
  customerByCategory: customer.customerByCategory,
  fetchingCustomersCategory: customer.fetchingCustomersCategory,
  fetchingCustomersCategoryError: customer.fetchingCustomersCategoryError,
  sales: opportunity.sales,
   recruiterName: opportunity.recruiterName,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerListByCategory,
      handleUpdateCustomerModal,
      setEditCustomer,
      getSectors,
      getAllSalesList,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerWhiteTable);
const AppIcon1 = (props) => (
  
  <BorderColorIcon
  // className="icon1"

  />

);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  font-size:1rem;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;