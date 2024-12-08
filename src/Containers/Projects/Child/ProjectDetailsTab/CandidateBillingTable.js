import React, { useEffect, useState,useMemo,lazy } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from "../../../../Components/Common";
import { Tooltip,Button,Input,Avatar } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {getProjectsTeamListById,
  getCandidateTotalBilling} from "../../ProjectsAction"
import Highlighter from 'react-highlight-words';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MultiAvatar } from "../../../../Components/UI/Elements";
const ButtonGroup = Button.Group;

function CandidateBillingTable (props)  {

//   useEffect(() => {
//     // props.getCandidateTotalBilling(props.match.params.candidateId.projectId);
//     props.getProjectsTeamListById(props.projectsById.projectId);  
// }, [])

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
              // setTimeout(() => this.searchInput.select());
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
        width:"2%",    
    },
    {
        title: "Team",
        dataIndex: "candidateName",
        
        width:"5%",
      
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      render: (text, item) => {
        return <span>
          <MultiAvatar
                  primaryTitle={item.customerName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
          </span>;
      },
      width:"5%",    
  },
  {
    title: "Project",
    dataIndex: "projectName",
    
    width:"5%",    
},
{
  title: "Actual Billable Hour",
  dataIndex: "actualBillableHour",
  
  width:"5%",    
},
{
  title: "Actual Billable Amount",
  dataIndex: "actualBillableAmount",
  
  width:"5%",   
},
{
  title: "Final Billable Hour",
  dataIndex: "finalBillableHour",
  
  width:"5%",   
},
{
  title: "Final Billable Amount",
  dataIndex: "finalBillableAmount",
  
  width:"5%",   
},
{
  title: "Hour",
  dataIndex: "hour",
  
  width:"5%",   
},
{
  title: "Billing Amount",
  dataIndex: "billingAmount",
  
  width:"5%",   
},

   
    
        
     
    ]
    return (
        <>        
            <StyledTable
                columns={columns}
               dataSource={props.candidateTotalBilling}
                pagination={false}
                scroll={{ y: 500 }}
            />
  
        </>
       
    )
}

const mapStateToProps = ({ projects }) => ({
//   teamProject:projects.teamProject,
   candidateTotalBilling:projects.candidateTotalBilling,
//   projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    //   getProjectsTeamListById,
    // getCandidateTotalBilling  
    }, dispatch);


    export default connect(mapStateToProps, mapDispatchToProps)(CandidateBillingTable);
