import React, {  useState,} from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
// import {getCandidatesBillableAmount} from "../../../Dashboard/DashboardAction"

import {Button,Input } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { BundleLoader } from '../../../../Components/Placeholder';



function CandidateBillableTable (props)  {
    // const [pageNo, setPageNo] = useState(0);
    // useEffect(() => {
    //     props.getCandidatesBillableAmount(props.userId,pageNo,props.month,props.year);
    //     setPageNo(pageNo + 1);
    // }, [])

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
        title: "Job Id",
        dataIndex: "jobOrder",
        width:"10%",
    },
        {
          title: "Name",
          dataIndex: "fullName",
          width:"10%",
      },
      {
        title: "Partner",
        dataIndex: "partnerName",
        width:"8%",
    },
    {
      title: "Owner",
      dataIndex: "ownerName",
      width:"8%",
  },
        {
            title: "Requirement",
            dataIndex: "requirementName",
            width:"10%",
        },
        {
          title: "Mobile",
          dataIndex: "mobileNumber",
          width:"8%",
          render: (text, item) => {
            return (
              <>{item.countryDialCode}{item.mobileNumber}</>
            )
          }
      },
      {
        title: "Role",
        dataIndex: "roleType",
        width:"8%",
    },
      {
        title: "Hour",
        dataIndex: "billableHour",
        width:"8%",
    },
    
  {
    title: "Benifit",
    dataIndex: "benifit",
    width:"8%",
},
{
  title: "Notice Period",
  dataIndex: "noticePeriod",
  width:"10%",
},
{
  title: "Distance",
  dataIndex: "preferredDistance",
},
{
  title: "Billing",
  dataIndex: "billing",
  width:"8%",
},
{
  title: "Final Billing",
  dataIndex: "finalBilling",
  width:"8%",
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
                height={400}
                 dataSource={props.candidatesBillableAmount}
                pagination={false}
            />
      
        </>
    )
}

const mapStateToProps = ({ dashboard ,auth}) => ({
    userId: auth.userDetails.userId,
    candidatesBillableAmount:dashboard.candidatesBillableAmount,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        // getCandidatesBillableAmount
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateBillableTable);