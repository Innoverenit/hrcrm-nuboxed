import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getListOfInvoice} from "../../Invoice/InvoiceAction"
import { FormattedMessage } from 'react-intl';
import {Button,Input, Tooltip } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { CurrencySymbol } from "../../../Components/Common";
import { BundleLoader } from '../../../Components/Placeholder';
import { MultiAvatar } from '../../../Components/UI/Elements';



function InvoiceTable (props)  {
    console.log(props.programs)
    useEffect(() => {
       props.getListOfInvoice(props.userId)   
    }, [])

    const [isExpanded, setIsExpanded] = useState(false);
  
  



    const [rowdata, setrowData] = useState({});
    
    const handleRowData = (data) => {
      setrowData(data);
    };
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    
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
            title: "",
            //dataIndex: "logo",
            width:"2%",
        },
        {
          title: "Invoice Id",
          dataIndex: "invoiceId",
          width:"8%",
      },
        {
            title: "Team",
            dataIndex: "candidateName",
            width:"8%",
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
                    // imageId={item.ownerImageId}
                    // imageURL={item.imageURL}
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
        title: "Project",
        dataIndex: "projectName",
        width:"8%",
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
      title: "Amount",
      dataIndex: "billingAmount",
      width:"8%",
      render: (text, item) => {
        return (
          <>
           <span>
                <CurrencySymbol currencyType={item.billableCurency} />
                &nbsp;
        {item.billingAmount}
        </span>
        </>
        )
      }
  },
  {
    title: "Hour",
    dataIndex: "hour",
    width:"8%",
},
  {
    title: "Projected Billable Amount",
    dataIndex: "actualBillableAmount",
    width:"8%",
    render: (text, item) => {
      return (
        <>
         <span>
              <CurrencySymbol currencyType={item.billableCurency} />
              &nbsp;
      {item.actualBillableAmount}
      </span>
      </>
      )
    }
},
{
  title: "Projected Billable Hour",
  dataIndex: "actualBillableHour",
  width:"8%",
},
{
  title: "Actual Billable Amount",
  dataIndex: "projectedBillableAmount",
  width:"8%",
  render: (text, item) => {
    return (
      <>
       <span>
            <CurrencySymbol currencyType={item.billableCurency} />
            &nbsp;
    {item.projectedBillableAmount}
    </span>
    </>
    )
  }
},
{
  title: "Actual Billable Hour",
  dataIndex: "projectedBillableHour",
  width:"8%",
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
                columns={columns}
                 dataSource={props.invoiceList}
                pagination={false}
                height={600}
                // scroll={{ y: 700 }}
            />
        </>
    )
}

const mapStateToProps = ({ auth,invoice }) => ({
  userId: auth.userDetails.userId,
  invoiceList:invoice.invoiceList,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getListOfInvoice
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceTable);