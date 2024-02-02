import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getEmployeeKpiList} from "../../../../../../Main/Teams/TeamsAction"
const EmployeePerformanceTable = (props) => {
  const { translatedMenuItems } = props;

  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    props.getEmployeeKpiList(props.singleEmployee.employeeId)
  }, []);


 
  

  return (
    <>
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      {props.employeeKpiList.length === 0 ? (
          <p>No Data Available</p>
        ) : (
          props.employeeKpiList.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between mt-4" 
            //   style={{ borderBottom: '3px dotted #515050' }}
              >
                <div className="flex justify-between w-2/3">
{/*                  
                  <div className="Ccard__title w-40">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Name
                    </div>
                  
                      <div className="font-normal text-sm text-cardBody font-poppins">{item.kpiName}</div>
                   
                  </div> */}
                
                  {/* <div className="Ccard__title w-28">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Frequency
                    </div>
                
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>
                          {item.frequency} 
                        </span>
                      </div>
                  
                  </div> */}
                  <div className="Ccard__title w-36">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Assigned Value
                    </div>
                   
                      <div className="font-normal text-sm text-cardBody font-poppins">{item.assignedValue}</div>
                  
                  </div>
                  <div className="Ccard__title w-[9rem]">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Completed Value
                    </div>
                  
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>{item.completedValue}</span>
                      </div>
                
                  </div>
                  
                </div>
              </div>
            </div>
           ))
           )}
      </div>
    </>
  );
};



const mapStateToProps = ({ auth,
    teams }) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,

 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getEmployeeKpiList,
      

    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePerformanceTable);









