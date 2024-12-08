import React, { useEffect, useState, } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { Button,Input, } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {getProjectsTeamListById,
  getCandidateTotalBilling} from "../../ProjectsAction"
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import { MultiAvatar } from "../../../../Components/UI/Elements";
const ButtonGroup = Button.Group;

function ProjectsTeamTable (props)  {

  useEffect(() => {
    // props.getCandidateTotalBilling(props.match.params.candidateId.projectId);
    props.getProjectsTeamListById(props.projectsById.projectId);  
}, [])

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
        render(name, item, ) {
          console.log("projectId", props.projectId);
          return (
            
            <>
  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`} title={item.candidateName}>
      {item.candidateName}
    </Link>
             {/* <Link
                toUrl={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`}
                title={`${item.candidateName || ""} `}
              /> */}
             
            </>
          ); 
        }   
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      render: (text, item) => {
        return <span>
           {item.customerName === null ? (
              ""
            ) : (
          <MultiAvatar
                  primaryTitle={item.customerName}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
                )}
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
  title: "Billable Hour",
  dataIndex: "billableHour",
  
  width:"5%",    
},
{
  title: "Onboard Date",
  dataIndex: "onboardDate",
  
  width:"5%",  
  render: (text, item) => {
    const date= ` ${dayjs(item.onboardDate).format("ll")}`
     return <span>
{date}
       </span>;
   },  
},
{
  title: "End Date",
  dataIndex: "actualEndDate",
  render: (text, item) => {
    const date2= ` ${dayjs(item.actualEndDate).format("ll")}`
     return <span>
{date2}
       </span>;
   },
  width:"5%",    
},
   
    
        
     
    ]
    return (
        <>        
            <StyledTable
                columns={columns}
               dataSource={props.teamProject}
                pagination={false}
                scroll={{ y: 500 }}
            />
  
        </>
       
    )
}

const mapStateToProps = ({ projects }) => ({
  teamProject:projects.teamProject,
  candidateTotalBilling:projects.candidateTotalBilling,
  projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getProjectsTeamListById,
    getCandidateTotalBilling  
    }, dispatch);


    export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTeamTable);
