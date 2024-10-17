import React, { useEffect,useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { getAssessment,handleQuestionrModal } from '../../AccessmentAction';
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { Tooltip,Button } from "antd";
import { Link } from "../../../../Components/Common";
import {EditOutlined} from "@ant-design/icons";
import AddQuestionsDrawer from './AddQuestionsDrawer';
// import StatusToggle from './StatusToggle';

const AccessmentTable = (props) => {
   
  useEffect(() => {
    props.getAssessment(props.userId,props.orgId);
  }, []);
 
  const [rowData,setRowData]=useState("");

  function handleRowData(item){
setRowData(item)
  }
    return (
        <>
          <div className=' flex justify-end sticky top-28 z-auto'>
         <OnlyWrapCard style={{backgroundColor:"#eaedf1"}}>
         <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">
         <div className=""></div>
         <div className=" md:w-[4.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className=" md:w-[12.1rem]">
        <FormattedMessage id="app.course" defaultMessage="course"/></div>
         {/* <div className=" md:w-[4.2rem] "><FormattedMessage id="app.category" defaultMessage="Category" /></div> */}
        {/* <div className="md:w-[5.8rem]"><FormattedMessage id="app.questions" defaultMessage="Questions #" /></div> */}
        <div className="md:w-[8.5rem]"><FormattedMessage id="app.time" defaultMessage="Time" /></div>
        <div className="md:w-[6.8rem]"><FormattedMessage id="app.durationtype" defaultMessage="Duration Type" /></div>
      {/*  <div className="md:w-[5.2rem]"><FormattedMessage id="app.level" defaultMessage="Level" /></div> */}
        <div className="md:w-[5.2rem]"><FormattedMessage id="app.url" defaultMessage="URL" /></div>
        <div className="md:w-[5.2rem]"></div>
        <div className="w-12"></div>
            </div>
             {props.assessment.map((item) => {
               const currentdate = dayjs().format("DD/MM/YYYY");
               const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
    <Link
          toUrl={`/assessment/${item.assessmentId}`}
          title={`${item.assessmentName}`}
        >{item.assessmentName}</Link>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                  New
                                </span>
                              ) : null}
                            </div>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <div class=" text-xs  font-poppins">
                        {item.courseName} 
                    </div>
    </div>
    </div>
    
    {/* <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.category}
                    </div>
    </div> */}
    {/* <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <div class=" text-xs  font-semibold  font-poppins">
                      {item.noOfQuestions}
                    </div>
    </div> */}
    
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs  font-semibold  font-poppins">
               {item.duration}
             </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <div class=" text-xs  font-semibold  font-poppins">
               {item.durationType}
             </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
       <div class=" text-xs  font-semibold  font-poppins">
              {item.url}
            </div>
   </div>

    <div class="flex md:items-center"> 
{/* <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

<StatusToggle               
               item={item}
                assessmentId={item.assessmentId}
                publishInd={item.publishInd}
                />

</div>  */}
<div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

<Button type="primary" onClick={()=>{
  handleRowData(item);
  props.handleQuestionrModal(true)
}}>
  Add Question
</Button>

</div> 
</div>

<div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div class=" text-xs  font-poppins">
<Tooltip title="Edit">
                                        <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            // onClick={() => {
                                            //     props.setEditProducts(item);
                                            //     handleUpdateProductModal(true);
                                            // }}
                                        />
                                    </Tooltip>
</div>


</div>
</div>
</div>
          );
        })}
             
              </OnlyWrapCard>
              </div>
              <AddQuestionsDrawer rowData={rowData} addQuestionModal={props.addQuestionModal} handleQuestionrModal={props.handleQuestionrModal} />
        </>
    )
}

const mapStateToProps = ({ auth,assessment }) => ({
  assessment:assessment.assessment,
fetchingAssessment:assessment.fetchingAssessment,
userId: auth.userDetails.userId,
orgId: auth.userDetails.organizationId,
addQuestionModal:assessment.addQuestionModal

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
      getAssessment,
      handleQuestionrModal

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccessmentTable);

// import React, { useEffect,useState,useMemo } from 'react'
// import { StyledTable } from '../../../../Components/UI/Antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import dayjs from "dayjs";
// import "jspdf-autotable";
// import EditIcon from '@mui/icons-material/Edit';
// import Highlighter from 'react-highlight-words';
// import {SearchOutlined} from '@ant-design/icons';
// import { Button, Empty,Switch, Select, Tooltip, Icon,Input} from "antd";
// import { getAssessment } from '../../AccessmentAction';
// import AssessmentDetails, {AssessmenntDetails} from "../AssessmentDetails/AssessmentDetails";
// import AssessmentDetailsView from '../AssessmentDetails/AssessmentDetailsView';
// import StatusToggle from './StatusToggle';


// const AccessmentTable = (props) => {

//    useEffect(() => {
//     props.getAssessment(props.userId,props.orgId);
//   }, []);
//     function onChange(pagination, filters, sorter) {
//       console.log("params", pagination, filters, sorter);
//     }
//     const [searchText, setSearchText] = useState("");
//     const [searchedColumn, setSearchedColumn] = useState("");
  
//     function getColumnSearchProps(dataIndex) {
//       return {
//         filterDropdown: ({
//           setSelectedKeys,
//           selectedKeys,
//           confirm,
//           clearFilters,
//         }) => (
//           <div style={{ padding: 8 }}>
//             <Input
//               // ref={node => {
//               //   this.searchInput = node;
//               // }}
//               placeholder={`Search ${dataIndex}`}
//               value={selectedKeys[0]}
//               onChange={(e) =>
//                 setSelectedKeys(e.target.value ? [e.target.value] : [])
//               }
//               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//               style={{ width: 240, marginBottom: 8, display: "block" }}
//             />
            
//               <Button
//                 type="primary"
//                 onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                  icon={<SearchOutlined />}
//                 //icon="search"
//                 size="small"
//                 style={{ width: 90 }}
//               >
//                 Search
//               </Button>
//               <Button
//                 onClick={() => handleReset(clearFilters)}
//                 size="small"
//                 style={{ width: 90 }}
//               >
//                 Reset
//               </Button>
//               <Button
//                 type="link"
//                 size="small"
//                 onClick={() => {
//                   confirm({ closeDropdown: false });
//                   setSearchText(selectedKeys[0]);
//                   setSearchedColumn(dataIndex);
//                 }}
//               >
//                 Filter
//               </Button>
            
//           </div>
//         ),
//         filterIcon: (filtered) => (
//           // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//           <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
//         ),
//         onFilter: (value, record) =>
//           record[dataIndex]
//           ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase()) : "",
//         onFilterDropdownVisibleChange: (visible) => {
//           if (visible) {
//             // setTimeout(() => this.searchInput.select());
//           }
//         },
//         render: (text) =>
//           searchedColumn === dataIndex ? (
//             <Highlighter
//               highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//               searchWords={[searchText]}
//               autoEscape
//               textToHighlight={text ? text.toString(): ""}
//             />
//           ) : (
//             text
//           ),
//       };
//     }
  
//     function handleSearch(selectedKeys, confirm, dataIndex) {
//       confirm();
//       setSearchText(selectedKeys[0]);
//       setSearchedColumn(dataIndex);
//     }
  
//     function handleReset(clearFilters) {
//       clearFilters();
//       setSearchText("");
//     }
//     const categoryTypeOption = useMemo(() => {
//       if (!props.assessment) return [];
//       return (
//         props.assessment.length &&
//         props.assessment.map((assessment) => {
//           return {
//             text: assessment.category || "",
//             value: assessment.category,
//           };
//         })
//       );
//     }, [props.assessment]);
//     const columns = [
//       {
//         title: "",
//         width:"2%"
//     },
//         {
//             title: "Name",
//             dataIndex:"assessmentName",
//             ...getColumnSearchProps('assessmentName'),
//             render: (name, item, i) => {
//               const assessmentNameS = `${item.assessmentName}`;
//               const currentdate = dayjs().format("DD/MM/YYYY");
//         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
//               return (
//                 <>
//                 <AssessmentDetailsView assessmentId={item.assessmentId} assessmentName={item.assessmentName}/>
//                  &nbsp;&nbsp;
//                   {date === currentdate ? (
//                     <span
//                       style={{
//                         color: "tomato",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       New
//                     </span>
//                   ) : null}
//                 </>
//               );
//             },
//         },
//         {
//             title: "Theme",
//             dataIndex:"theme",
//             ...getColumnSearchProps('theme')
//         },
//         {
//             title: "Category",
//             dataIndex:"category",
//             filters:categoryTypeOption,
      
//             onFilter: (value, record) => {
//               return record.category === value;
//         },
//       },
//         {
//             title: "Questions #",
//             dataIndex:"noOfQuestions",
//         },
//         {
//             title: "Time",
//             dataIndex:"duration",
//             sorter: (a, b) => {
//               var nameA = a.time; // ignore upper and lowercase
//               var nameB = b.time; // ignore upper and lowercase
//               if (nameA < nameB) {
//                 return -1;
//               }
//               if (nameA > nameB) {
//                 return 1;
//               }
        
//               return 0;
//             },
//             // render: (text, item) => {
//             //   const time = dayjs(item.time).format("ll");
//             //   return <span>{time}</span>;
//             // },
//         },
//         {
//             title: "Level",
//             dataIndex:"level",
//             sorter: (a, b) => {
//               var nameA = a.level; // ignore upper and lowercase
//               var nameB = b.level; // ignore upper and lowercase
//               if (nameA < nameB) {
//                 return -1;
//               }
//               if (nameA > nameB) {
//                 return 1;
//               }
      
//               return 0;
//             },
//         },
//         {
//             title: "URL",
//              dataIndex: "url"
//         },
//         {
//             title: "",
//             dataIndex: "documentId",
//             width: "2%",
//             render: (name, item, i) => {
//               //debugger
//               return (
//                 <>
//                     <EditIcon
//                       type="edit"
//                       style={{ cursor: "pointer" }}
//                     />
//                 </>
//               );
//             },
//           },
//           {
//             title: "", 
//             width:"8%",          
//             // dataIndex: "paidInd",           
//             render: (name, item, i) => {
//               return (
//                 <StatusToggle               
//                item={item}
//                 assessmentId={item.assessmentId}
//                 publishInd={item.publishInd}
//                 //serviceId={item.serviceId}
//                 />
//               );
//             },
//         },
           
//     ]
//     return (
//         <>
       
//             <StyledTable
//                 columns={columns}
//                 loading={props.fetchingAssessment}
//                  dataSource={props.assessment}
//                 pagination={false}
//             />

//         </>
//     )
// }

// const mapStateToProps = ({ auth,assessment }) => ({
//   assessment:assessment.assessment,
// fetchingAssessment:assessment.fetchingAssessment,
// userId: auth.userDetails.userId,
// orgId: auth.userDetails.organizationId,

// });
// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//       getAssessment

//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(AccessmentTable);
