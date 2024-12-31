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
import ContactsIcon from '@mui/icons-material/Contacts';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import EmptyPage from '../../../Main/EmptyPage';
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
              // setTimeout(() => searchInput.select());
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
    
  //   const columns = [
  //     {
  //       title: "",   
  //       width:"2%",    
  //   },
  //   {
  //       title: "Team",
  //       dataIndex: "candidateName",
        
  //       width:"5%",
  //       render(name, item, ) {
  //         console.log("projectId", props.projectId);
  //         return (
            
  //           <>
  // <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`} title={item.candidateName}>
  //     {item.candidateName}
  //   </Link>
             {/* <Link
                toUrl={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`}
                title={`${item.candidateName || ""} `}
              /> */}
             
//             </>
//           ); 
//         }   
//     },
//     {
//       title: "Customer",
//       dataIndex: "customerName",
//       render: (text, item) => {
//         return <span>
//            {item.customerName === null ? (
//               ""
//             ) : (
//           <MultiAvatar
//                   primaryTitle={item.customerName}
//                   imgWidth={"1.8em"}
//                   imgHeight={"1.8em"}
//                 />
//                 )}
//           </span>;
//       },
//       width:"5%",    
//   },
//   {
//     title: "Project",
//     dataIndex: "projectName",
    
//     width:"5%",    
// },
// {
//   title: "Billable Hour",
//   dataIndex: "billableHour",
  
//   width:"5%",    
// },
// {
//   title: "Onboard Date",
//   dataIndex: "onboardDate",
  
//   width:"5%",  
//   render: (text, item) => {
//     const date= ` ${dayjs(item.onboardDate).format("ll")}`
//      return <span>
// {date}
//        </span>;
//    },  
// },
// {
//   title: "End Date",
//   dataIndex: "actualEndDate",
//   render: (text, item) => {
//     const date2= ` ${dayjs(item.actualEndDate).format("ll")}`
//      return <span>
// {date2}
//        </span>;
//    },
//   width:"5%",    
// },
   
    
        
     
    // ]
    return (
        <>   
          <div className=' flex   sticky  z-auto'>
     <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent items-end sticky  z-10">
        <div className=" flex justify-between w-[100%] !text-lm font-bold font-poppins">
      
        <div className="  w-[2.02rem]">   </div>
        <div className="  w-[15.7rem] text-sm text-[#00A2E8]  truncate "> <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' /> Name</div>
        <div className="   w-[15.9rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
        Skills
        </div>
        <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        Onboard Date</div>
        <div className="   w-[15.99rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
        Billable Hour</div> 
        <div className="   w-[16.3rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
        End Date</div>
        <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        Hours</div>
        <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
        Task</div>
         </div>    
      </div>
      { !props.fetchingTeamProject && props.teamProject.length ===0 ?<EmptyPage/>: props.teamProject.map((item, index) => {
    return (
        <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
           >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class="flex  w-[3.1rem] items-center justify-start  border-l-2 border-green-500 h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              <div className='text-xs ml-gap font-poppins'>
              <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`} title={item.candidateName}>
             {item.candidateName}
            </Link>
           </div>
                </div>
                </div>
                
          <div class="flex  w-[8.4rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs  ml-gap font-poppins'>
          {item.billableHour}
          </div>
          </div> 
          <div class="flex  w-[7.3rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
         {item.onboardDate}
          </div>
          </div> 
          <div class="flex  w-[8.4rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
           
           <div className='text-xs font-poppins'>
        {item.actualEndDate}
          </div>
          </div>   
                </div>             
    ) }
            )} 
      </div>    
      </div>     
            {/* <StyledTable
                columns={columns}
               dataSource={props.teamProject}
                pagination={false}
                scroll={{ y: 500 }}
            /> */}
  
        </>
       
    )
}

const mapStateToProps = ({ projects }) => ({
  teamProject:projects.teamProject,
  fetchingTeamProject:projects.fetchingTeamProject,
  candidateTotalBilling:projects.candidateTotalBilling,
  projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getProjectsTeamListById,
    getCandidateTotalBilling  
    }, dispatch);


    export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTeamTable);
