import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { FormattedMessage } from 'react-intl';
import {Button,Input,Checkbox, Tooltip } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import { CurrencySymbol } from "../../../Components/Common";
import {updateInvoiceData} from "../InvoiceAction"
import "jspdf-autotable";
import { BundleLoader } from '../../../Components/Placeholder';
import { MultiAvatar } from '../../../Components/UI/Elements';



function InvoiceListTable (props)  {
   
    useEffect(() => {
          
    }, [])

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedRow, setselectedRow] = useState([]);
  



    const [rowdata, setrowData] = useState({});

    const onChange = (data) => {
      setselectedRow([...selectedRow, data])
      console.log('checked = ', data);
    }
    
    const handleRowData = (data) => {
      setrowData(data);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedValue, setselectedValue] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");


  
    
  
    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    
    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }

      const handleExpandClick = () => {
        setIsExpanded(true);
      };
    
      const handleCollapseClick = () => {
        setIsExpanded(false);
      };
    
      function handleReset(clearFilters) {
        clearFilters();
        setSearchText("");
      }

      function handleSubmitCheckedItem() {
        let data = {
          // userId:selectedValue,
          result:selectedRowKeys,
        };
        props.updateInvoiceData( data);
        console.log(selectedRowKeys);
      }
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
            <SearchIcon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          ),
          onFilter: (value, record) =>
          record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()) : "",
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
                textToHighlight={text ? text.toString(): ""}
              />
            ) : (
              text
            ),
        };
      }
    
    const columns = [
        {
          title: "Candidate",
          dataIndex: "candidateName",
          width:"10%",
      },
        {
            title: "Project",
            dataIndex: "projectName",
            width:"6%",
            render: (name, item, i) => {
              return (
                <>
                  <Tooltip title={item.projectName}>
                  <span>
                    <MultiAvatar
                      primaryTitle={item.projectName}
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
          title: "Customer",
          dataIndex: "customerName",
          width:"8%",
          render: (name, item, i) => {
            return (
              <>
                <Tooltip title={item.customerName}>
                <span>
                  <MultiAvatar
                    primaryTitle={item.customerName}
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
        title: "Hour",
        dataIndex: "hour",
        width:"8%",
    },

  {
    title: "Billing",
    dataIndex: "billingAmount",
    width:"8%",
    render: (text, item) => {
      return (
        <>
            <span>
            <CurrencySymbol currencyType={item.billableCurency} />
  {item.billingAmount}
  </span>
  </>
      )
    }
},
  {
    title: "Actual Billable Amount",
    dataIndex: "finalBillableAmount",
    width:"10%",
    render: (text, item) => {
      return (
        <>
          <span>
        
            <CurrencySymbol currencyType={item.billableCurency} />
            &nbsp;
         { `${Number(item.finalBillableAmount).toFixed(2)}  `} 

        </span></>
      )
    }
},
{
  title: "Actual Billable Hour",
  dataIndex: "finalBillableHour",
  width:"12%",
},
{
  title: "Projected Billable Amount",
  dataIndex: "actualBillableAmount",
  width:"12%",
  render: (text, item) => {
    return (
      <>
       <span>
            <CurrencySymbol currencyType={item.billableCurency} />
            &nbsp;
         { `${Number(item.actualBillableAmount).toFixed(2)}  `} 
    </span>
    </>
    )
  }
},
{
  title: "Projected Billable Hour",
  dataIndex: "actualBillableHour",
  width:"10%",
 
},
{
  title: "Month",
  dataIndex: "month",
  width:"8%",
  render: (text, item) => {
    return (
      <>{item.month} {item.year}</>
    )
  }
},


       
  
  


     
    ]

    if (props.fetchingLeadsTabData) {
      return <BundleLoader/>;
    }
    return (
        <>        
            <StyledTable
              // rowKey="projectId"
              rowKey={(record) => record}
              rowSelection={rowSelection}
                columns={columns}
                height={500}
                scroll={{ y: 700 }}
                 dataSource={props.candidateTotalBillingForInvoice}
                pagination={false}
            />
             <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleSubmitCheckedItem}>Submit</Button>
      </div>
        </>
    )
}

const mapStateToProps = ({ invoice }) => ({
   candidateTotalBillingForInvoice:invoice.candidateTotalBillingForInvoice,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      updateInvoiceData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceListTable);