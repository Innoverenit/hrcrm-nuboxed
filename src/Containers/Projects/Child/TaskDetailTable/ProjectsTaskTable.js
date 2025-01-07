import React, { useEffect, useState} from 'react'
import { StyledTable } from '../../../../Components/UI/Antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Tooltip,Button,Input,Avatar } from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {getProjectsTaskListById} from "../../ProjectsAction"
import Highlighter from 'react-highlight-words';
import "jspdf-autotable";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import EmptyPage from '../../../Main/EmptyPage';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MultiAvatar } from "../../../../Components/UI/Elements";
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link } from 'react-router-dom';
const ButtonGroup = Button.Group;

function ProjectsTaskTable (props)  {

  useEffect(() => {
    props.getProjectsTaskListById(props.projectsById.projectId);  
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
                  // icon={<SearchIcon />}
                 // icon="search"
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
    
  //   const columns = [

  //     {
  //       title: "",
  //       width:"2%",    
  //   },
  //   {
  //     title: "",
  //     dataIndex: "priority",
  //     width:"4%",
  //     render: (text, item) => { 
  //       return (
  //         <div>
  //           {item.priority === "High" && (
  //             <div
  //               style={{
  //                 borderRadius: "50%",
  //                 height: "2.1875em",
  //                 width: "2.1875em",
  //                 backgroundColor: "red",
  //               }}
  //             >
  //             </div>
  //           )} 
  //           {item.priority === "Medium" && (
  //             <div
  //               style={{
  //                 borderRadius: "50%",
  //                 height: "2.1875em",
  //                 width: "2.1875em",
  //                 backgroundColor: "orange",
  //               }}
  //             ></div>
  //           )}
  //           {item.priority === "Low" && (
  //             <div
  //               style={{
  //                 borderRadius: "50%",
  //                 height: "2.1875em",
  //                 width: "2.1875em",
  //                 backgroundColor: "teal",
  //               }}
  //             >
  //         </div>  
  //           )}
  //         </div>
  //       );
  //     },

  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "taskType",
  //     width:"6%",
  // },
  // {
  //   title: "Name",
  //   ...getColumnSearchProps("taskName"), 
  //   dataIndex: "taskName",
  //   width:"12%",

  // },
  //       {
  //         title: "Assigned on",
  //         dataIndex: "",
  //         width:"8%",
  //         render: (text, item) => {
            
  //           return <span>{` ${dayjs(item.assignedOn).format("ll")}`}</span>;
  //         },
  //       },
  //       {
  //         title: "Assigned",
  //         dataIndex: "assignedToName",
  //         width:"8%",
  //         render: (text, item) => {
  //           return <span>
  //             {/* {` ${data.taskType}`} */}
  //             <MultiAvatar
  //                     primaryTitle={item.assignedToName}
  //                     // imageId={item.ownerImageId}
  //                     // imageURL={item.imageURL}
  //                     imgWidth={"1.8em"}
  //                     imgHeight={"1.8em"}
  //                   />
  //             </span>;
  //         },
        
  //       },
  //       {
  //         title: "Status",
  //         dataIndex: "candidateName",
  //         width:"10%",
  //         render: (text, item) => {
  //           return <span>
             
             
  //                       <Avatar.Group
  //                     maxCount={2}
  //                     maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
  //                   >
  //                     {item.candidates &&
  //                       item.candidates.map((candidate, i) => {
  //                         const data1 = candidate.candidateName
  //                            .slice(0,2)
  //                           // .split("")[0]
  //                           // .toUpperCase();
  //                         console.log("datas", data1);
  //                         return (
  //                           <Tooltip title={candidate.candidateName}>
  //                             <Avatar style={{ backgroundColor: "#94b3e4" }}>
  //                               {data1}
  //                             </Avatar>
  //                           </Tooltip>
  //                         );
  //                       })}
                     
  //                   </Avatar.Group>
  
  //             </span>;
  //         },
  //       },

  //       {
  //         title: "Start",
  //         dataIndex: "startDate",
  //         width:"8%",
  //        render: (text, item) => {
  //          const date= ` ${dayjs(item.startDate).format("ll")}`
  //           return <span>
  // {date}
  //             </span>;
  //         },
  
  //       },
  //       {
  //         title: "End",
  //         dataIndex: "endDate",
  //         width:"8%",
  //         render: (text, item) => {
  //            const data2= ` ${dayjs(item.endDate).format("ll")}`
  //           return <span>
  //             {data2}

  //             </span>;
  //         },
  
  //       },
  //       // {
  //       //   title: "Status",
  //       //   dataIndex: "taskStatus",
  //       //   width:"5%",
  //       //   render: (text, item) => {
  //       //     return (
            
  //       //       <ButtonGroup>
  //       //         {item.complitionStatus === "To Start" && (
  //       //           <StatusIcon
  //       //             type="To Start"
  //       //             iconType="fa-hourglass-start"
  //       //             tooltip="To Start"
  //       //              color="blue"
  //       //           />
  //       //         )}
  //       //         {item.complitionStatus === "In Progress" && (
  //       //           <StatusIcon
  //       //             type="In Progress"
  //       //             iconType="fa-hourglass-half"
  //       //             tooltip="In Progress"
  //       //           />
  //       //         )}
  //       //         {item.complitionStatus === "completed" && (
  //       //           <StatusIcon
  //       //             type="Completed"
  //       //             iconType="fa-hourglass"
  //       //             tooltip="Completed"
  //       //           />
  //       //         )}
  //       //       </ButtonGroup> 
            
             
             
              
  //       //     );
  //       //   },
  //       // },

  //       {
  //         title: "",
  //         dataIndex: "Completed",
  //         width:"10%",
  //         render: (text, item) => {
  //           return (
  //             <span>
  //               {item.taskStatus === "Completed" && !item.approvedInd ? (
  //                 <>
  //                   <div>
  //                     <Button
  //                       // onClick={() => approveTaskByTaskId(item.taskId)}
  //                       style={{ backgroundColor: "teal", color: "white" }}
  //                     >
  //                       Approve
  //                     </Button>
  //                     <Button
  //                       style={{
  //                         backgroundColor: "rgb(233, 79, 79)",
  //                         color: "white",
  //                       }}
  //                       // onClick={() => rejectTaskByTaskId(item.taskId)}
  //                     >
  //                       Reject
  //                     </Button>
  //                   </div>
  //                 </>
  //               ) : (
  //                   <>
  //                     {item.approvedInd === "Approved" ? (
  //                       <CheckCircleOutlineIcon
  //                         type="check-circle"
  //                         theme="twoTone"
  //                         twoToneColor="#52c41a"
  //                         size={140}
  //                         style={{ fontSize: "1.5625em" }}
  //                       />
  //                     ) : item.approvedInd === "Rejected" ? (
  //                       <HighlightOffIcon
  //                         type="close-circle"
  //                         theme="twoTone"
  //                         twoToneColor="red"
  //                         size={140}
  //                         style={{ fontSize: "1.5625em" }}
  //                       />
  //                     ) : (
  //                           <></>
  //                         )}
  //                   </>
  //                 )}
  //             </span>
  //           );
  //         },
  //       },
     
  //   ]
    return (
      
        <>        
            {/* <StyledTable
                columns={columns}
               dataSource={props.taskProject}
                pagination={false}
                scroll={{ y: 500 }}
            /> */}
  
        
        <div className=' flex   sticky  z-auto'>
        <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent items-end sticky  z-10">
           <div className=" flex justify-between w-[100%] !text-lm font-bold font-poppins">
         
           <div className="  w-[2.02rem]">   </div>
           <div className="  w-[15.7rem] text-sm text-[#00A2E8]  truncate "> <InfoIcon className='!text-icon mr-1 text-[#e4eb2f]' /> Priority</div>
           <div className="   w-[15.9rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
           Type
           </div>
           <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
           Name
           </div>
           <div className="   w-[15.99rem] truncate "><GroupsIcon className='!text-icon mr-1 text-[#e4eb2f]'/>
           Assigned</div> 
           <div className="   w-[16.3rem] truncate  "> <ContactsIcon className="!text-icon mr-1 "/>
           Status</div>
           <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
           Start Date</div>
           <div className="  w-[15.8rem] truncate "> <AccountCircleIcon className="!text-icon mr-1  text-[#d64933]"/>
           End Date</div>
            </div>    
         </div>
         { !props.fetchingTaskProject && props.taskProject.length ===0 ?<EmptyPage/>: props.taskProject.map((item, index) => {
       return (
           <div className="flex rounded justify-between bg-white py-ygap  max-sm:rounded  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 <div class="flex  w-[3.1rem] items-center justify-start  border-l-2 border-green-500 h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
                 <div className='text-xs ml-gap font-poppins'>
                 {/* <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/hour/candidate/hour-details/project/${item.candidateId}/${item.projectId}`} title={item.candidateName}>
                {item.candidateName}
               </Link> */}
              </div>
                   </div>
                   </div>
                   
             <div class="flex  w-[8.4rem]  ml-gap items-center justify-start h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              
              <div className='text-xs  ml-gap font-poppins'>
             {/* {item.billableHour} */}
             </div>
             </div> 
             <div class="flex  w-[7.3rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              
              <div className='text-xs font-poppins'>
            {/* {item.onboardDate} */}
             </div>
             </div> 
             <div class="flex  w-[8.4rem]  ml-gap items-center justify-center h-8 bg-[#eef2f9]  text-xs max-xl:w-[6.3rem] max-lg:w-[4.9rem] max-sm:w-auto max-sm:flex-row max-sm:justify-between ">
              
              <div className='text-xs font-poppins'>
           {/* {item.actualEndDate} */}
             </div>
             </div>   
                   </div>             
       ) }
               )} 
         </div>    
         </div>  
         </>
       
    )
}

const mapStateToProps = ({ projects }) => ({
  taskProject:projects.taskProject,
  fetchingTaskProject:projects.fetchingTaskProject,
  projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getProjectsTaskListById,
    }, dispatch);


    export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTaskTable);

    function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
      const start = type;
      console.log(start);
      //////debugger;
      if (status === type) {
        size = "1.875em";
      } else {
        size = "1em";
      }
      return (
        <Tooltip title={tooltip}>
          <Button
            ghost={status !== type}
            style={{
              padding: "0.375em",
              borderColor: "transparent",
              color: type === "Completed" ? "green" : "orange",
            }}
            onClick={onClick}
          >
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
          </Button>
        </Tooltip>
      );
    }