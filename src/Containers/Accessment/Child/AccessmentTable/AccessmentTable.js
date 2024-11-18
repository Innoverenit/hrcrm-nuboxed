import React, { useEffect,useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { getAssessment,handleQuestionrModal } from '../../AccessmentAction';
import { OnlyWrapCard } from "../../../../Components/UI/Layout";

import { Tooltip,Button } from "antd";
import { Link } from "../../../../Components/Common";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddQuestionsDrawer from './AddQuestionsDrawer';

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
         <div className=" md:w-[4.1rem]">Name</div>
        <div className=" md:w-[12.1rem]">
       course</div>
        <div className="md:w-[8.5rem]">Time</div>
        <div className="md:w-[6.8rem]">Duration Type</div>
    
        <div className="md:w-[5.2rem]">URL</div>
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
                                        <VisibilityIcon
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