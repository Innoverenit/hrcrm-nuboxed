import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from "react-intl";
import { getCourse,handleEditModal,setEditCourse } from "../CourseAction";
import { Link } from "../../../Components/Common";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import UpdateCourseModal from "./UpdateCourseModal";
import { Tooltip } from "antd";

function CourseTable(props) {
  useEffect(() => {
    props.getCourse();
  }, []);
  const [currentCourseId, setCurrentCourseId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [rowdata, setrowData] = useState({});

  function handleSetCurrentCourseId(item) {
    setCurrentCourseId(item);
    console.log(item);
  }
  const handleRowData = (data) => {
    setrowData(data);
  };
  



  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };
  const{handleEditModal,addEditDrawerModal}=props;

  return (
    <>
        <div className='flex justify-end sticky top-28 z-auto'>
         <OnlyWrapCard style={{backgroundColor:"#eaedf1"}}>
         <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
        
         <div className=" md:w-[4.1rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
        <div className=" md:w-[6.1rem]"><FormattedMessage id="app.duration" defaultMessage="Duration"/></div>
        <div className=" md:w-[4.2rem] "><FormattedMessage id="app.price" defaultMessage="Price" /></div>
        <div className="md:w-[3.8rem]"><FormattedMessage id="app.description" defaultMessage="Description" /></div>
        <div className="w-12"></div>
            </div>
            <InfiniteScroll
        dataLength={props.courseById.length}
      //   next={handleLoadMore}
      // hasMore={hasMore}
        // loader={fetchingTaskListRangeByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
             {props.courseById.map((item) => {
               const currentdate = moment().format("DD/MM/YYYY");
               const date = moment(item.creationDate).format("DD/MM/YYYY");
               const content = item.description;
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[18.1rem] max-sm:w-full  ">
    <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
    <Link
          toUrl={`/course/${item.courseId}`}
          title={`${item.courseName}`}
        >{item.courseName}</Link>&nbsp;&nbsp;
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
                            </h4>
    </div>

    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

    <h4 class=" text-xs text-cardBody font-poppins">
                        {item.duration} 
                    </h4>
    </div></div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs text-cardBody font-poppins">
                      
    {item.currencyName} {item.price}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[19rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
        {item.description === null ? (
              "No Data"
            ) : (
              <div>
                <p>
                  {isExpanded
                    ? content
                    : `${content && content.slice(0, 7)}...`}
                </p>
                {isExpanded ? (
                  <button onClick={handleCollapseClick}>
                    <FormattedMessage id="app.readless" defaultMessage="Read Less"/>
                    </button>
                ) : (
                  <button onClick={handleExpandClick}>
                    <FormattedMessage id="app.readmore" defaultMessage="Read More"/>
                    </button>
                )}
              </div>
            )}
                    </h4>
    </div>
<div>
    <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "1rem",color: "grey", }}
                onClick={() => {
                     props.setEditCourse(item);
                    handleEditModal(true);
                    handleSetCurrentCourseId(item);
                  
                }}
              />
            </Tooltip>
            </div>

{/* <div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<h4 class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            // onClick={() => {
                                            //     props.setEditProducts(item);
                                            //     handleUpdateProductModal(true);
                                            // }}
                                        />
                                    </Tooltip>
</h4>


</div> */}
</div>
</div>
          );
        })}
         </InfiniteScroll>
             
              </OnlyWrapCard>
              </div> 
              <UpdateCourseModal
        course={currentCourseId}
        addEditDrawerModal={addEditDrawerModal}
        handleEditModal={handleEditModal}
        handleSetCurrentCourseId={handleSetCurrentCourseId}
      />
    </>
  );
}

const mapStateToProps = ({ course }) => ({
  courseById: course.courseById,
  addEditDrawerModal:course.addEditDrawerModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCourse,
      setEditCourse,
      handleEditModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);

// import React, { useEffect, useState, useMemo, lazy } from "react";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// import { FormattedMessage } from "react-intl";
// import { Tooltip, Button, Input } from "antd";
// import SearchIcon from "@mui/icons-material/Search";
// import Highlighter from "react-highlight-words";
// import "jspdf-autotable";
// import { getCourse } from "../CourseAction";
// import { BundleLoader } from "../../../Components/Placeholder";
// import CourseDetailsView from "./CourseDetailsView";

// function CourseTable(props) {
//   useEffect(() => {
//     props.getCourse();
//   }, []);

//   const [isExpanded, setIsExpanded] = useState(false);

//   const [rowdata, setrowData] = useState({});

//   const handleRowData = (data) => {
//     setrowData(data);
//   };
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   function handleSearch(selectedKeys, confirm, dataIndex) {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   }

//   const handleExpandClick = () => {
//     setIsExpanded(true);
//   };

//   const handleCollapseClick = () => {
//     setIsExpanded(false);
//   };

//   function handleReset(clearFilters) {
//     clearFilters();
//     setSearchText("");
//   }
//   function getColumnSearchProps(dataIndex) {
//     return {
//       filterDropdown: ({
//         setSelectedKeys,
//         selectedKeys,
//         confirm,
//         clearFilters,
//       }) => (
//         <div style={{ padding: 8 }}>
//           <Input
//             placeholder={`Search ${dataIndex}`}
//             value={selectedKeys[0]}
//             onChange={(e) =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             style={{ width: 240, marginBottom: 8, display: "block" }}
//           />

//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//         </div>
//       ),
//       filterIcon: (filtered) => (
//         <SearchIcon
//           type="search"
//           style={{ color: filtered ? "#1890ff" : undefined }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record[dataIndex]
//           ? record[dataIndex]
//               .toString()
//               .toLowerCase()
//               .includes(value.toLowerCase())
//           : "",
//       onFilterDropdownVisibleChange: (visible) => {
//         if (visible) {
//           // setTimeout(() => this.searchInput.select());
//         }
//       },
//       render: (text) =>
//         searchedColumn === dataIndex ? (
//           <Highlighter
//             highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//             searchWords={[searchText]}
//             autoEscape
//             textToHighlight={text ? text.toString() : ""}
//           />
//         ) : (
//           text
//         ),
//     };
//   }

//   const columns = [
//     {
//       title: "",
//       //dataIndex: "logo",
//       width: "2%",
//     },
//     {
//       //title: "Name",
//       title: <FormattedMessage id="app.name" defaultMessage="Name" />,
//       dataIndex: "courseName",
//       ...getColumnSearchProps("courseName"),
//       width: "19%",
//       render: (name, item, id) => {
//         const currentdate = moment().format("DD/MM/YYYY");
//         const date = moment(item.creationDate).format("DD/MM/YYYY");
//         return (
//           <>
//             <CourseDetailsView
//               courseId={item.courseId}
//               courseName={item.courseName}
//             />
//             &nbsp;&nbsp;
//             {date === currentdate ? (
//               <span
//                 style={{
//                   color: "tomato",
//                   fontWeight: "bold",
//                 }}
//               >
//                 New
//               </span>
//             ) : null}
//           </>
//         );
//       },
//     },
//     {
//       title: "Duration",
//       dataIndex: "duration",
//       width: "10%",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       width: "10%",
//       render: (name, item, i) => {
//         return (
//           <span>
//             {item.currencyName} {item.price}
//           </span>
//         );
//       },
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       width: "10%",
//       render: (text, item) => {
//         const content = item.description;
//         return (
//           <>
//             {item.description === null ? (
//               "No Data"
//             ) : (
//               <div>
//                 <p>
//                   {isExpanded
//                     ? content
//                     : `${content && content.slice(0, 7)}...`}
//                 </p>
//                 {isExpanded ? (
//                   <button onClick={handleCollapseClick}>Read Less</button>
//                 ) : (
//                   <button onClick={handleExpandClick}>Read More</button>
//                 )}
//               </div>
//             )}
//           </>
//         );
//       },
//     },
//   ];

//   if (props.fetchingLeadsTabData) {
//     return <BundleLoader />;
//   }
//   return (
//     <>
//       <StyledTable
//         columns={columns}
//         dataSource={props.courseById}
//         pagination={false}
//       />
//     </>
//   );
// }

// const mapStateToProps = ({ course }) => ({
//   courseById: course.courseById,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCourse,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);
