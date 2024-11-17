import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
         <div className=" flex justify-between w-[100%]  px-2 bg-transparent font-bold sticky top-0 z-10">
        
         <div className=" md:w-[4.1rem]">Name</div>
        <div className=" md:w-[6.1rem]">Duration</div>
        <div className=" md:w-[4.2rem] ">Price</div>
        <div className="md:w-[3.8rem]">Description</div>
        <div className="w-12"></div>
            </div>
            <InfiniteScroll
        dataLength={props.courseById.length}
      //   next={handleLoadMore}
      // hasMore={hasMore}
        // loader={fetchingTaskListRangeByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
             {props.courseById.map((item) => {
               const currentdate = dayjs().format("DD/MM/YYYY");
               const date = dayjs(item.creationDate).format("DD/MM/YYYY");
               const content = item.description;
          return (
<div>
<div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
       <div class="flex">
    <div className=" flex font-medium flex-col md:w-[18.1rem] max-sm:w-full  ">
    <h4 class="text-sm  font-semibold  font-poppins cursor-pointer">
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

    <h4 class=" text-xs  font-poppins">
                        {item.duration} 
                    </h4>
    </div></div>
    
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <h4 class=" text-xs  font-poppins">
                      
    {item.currencyName} {item.price}
                    </h4>
    </div>
    <div className=" flex font-medium flex-col md:w-[19rem] max-sm:flex-row w-full max-sm:justify-between ">
       

        <h4 class=" text-xs  font-semibold  font-poppins">
        {item.description === null ? (
              "None"
            ) : (
              <div>
                <p>
                  {isExpanded
                    ? content
                    : `${content && content.slice(0, 7)}...`}
                </p>
                {isExpanded ? (
                  <button onClick={handleCollapseClick}>
                  Read Less
                    </button>
                ) : (
                  <button onClick={handleExpandClick}>
                   Read More
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
<h4 class=" text-xs  font-poppins">
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