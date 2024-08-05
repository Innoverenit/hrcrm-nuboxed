import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';

const EmployeesPendingDocument = (props) => {

console.log("employeeName",props.employeeName)
  return (
    <div class="overflow-y-auto h-[40rem]">
    <div class="flex">  
   {props.employeeName.listOfDocPending.map((item) => {
     return (
      <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
    
     <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
      <div class="flex">
     <div className=" flex font-medium flex-col md:w-[15rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" font-normal text-[0.82rem] font-poppins">
  {item}
</div>
{/* </Tooltip>   */}
</div>         
 

</div>

 </div>

  </div>
     )
    })}
  </div>
    </div>
  )
}
const mapStateToProps = ({ location,employee,auth }) => ({
    employees: employee.employees,
    fetchingEmployee: employee.fetchingEmployee,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getEmployeelist
    },
    dispatch

  );
export default connect(mapStateToProps, mapDispatchToProps) (EmployeesPendingDocument)

const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: 42rem;
`;



