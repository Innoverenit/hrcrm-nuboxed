import React, { useEffect, useState, } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button,Input,Tooltip } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { BundleLoader } from '../../../../Components/Placeholder';
import { MultiAvatar } from '../../../../Components/UI/Elements';



function BillableCandidateListTable (props)  {
   
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
          title: "Name"
       ,
          dataIndex: "fullName",
          width:"15%",
      },
      {
        title: "Project"
    ,
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
      title: "Customer"
    ,
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
        title: "Partner"
    ,
        dataIndex: "partnerName",
        width:"8%",
    },
 
        {
          title:"Requirement"
       ,
            dataIndex: "requirementName",
            width:"10%",
        },
        {
          title:"Mobile"
        ,
          dataIndex: "mobileNumber",
          width:"8%",
          render: (text, item) => {
            return (
              <>{item.countryDialCode}{item.mobileNumber}</>
            )
          }
      },
      {
        title: "Email"
    ,
        dataIndex: "emailId",
        width:"12%",
    },
      {
        title:"Role"
      ,
        dataIndex: "roleType",
        width:"14%",
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
             <div class=" flex justify-end">
        <Button type="primary" onClick={handleSubmitCheckedItem}>Submit</Button>
      </div>
        </>
    )
}

const mapStateToProps = ({ dashboard }) => ({
    candidatesBillableAmount:dashboard.candidatesBillableAmount,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
  
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillableCandidateListTable);