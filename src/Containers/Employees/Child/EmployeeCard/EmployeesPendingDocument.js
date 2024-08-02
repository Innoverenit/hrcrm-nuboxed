import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';

const EmployeesPendingDocument = (props) => {
//   useEffect(() => {
//     props.getEmployeelist();
//     }, [])
//     useEffect(() => {
     
//         }, [props.employees])
// if(props.fetchingEmployee){
//     return <BundleLoader/>;
// }
console.log("employeeName",props.employeeName)
  return (
    <div class="overflow-y-auto h-[40rem]">
    <div class="flex">  
   {props.employeeName.listOfDocPending.map((item) => {
     return (
  <CardElement >
    
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

  </CardElement>
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


const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 2.5rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0.25em;
     height: 7rem;
    
  }
`