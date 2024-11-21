import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select,Switch,Input } from "antd";
import {base_url,base_url2} from "../../../Config/Auth";
import Swal from 'sweetalert2';
import axios from "axios";

const { Option } = Select; 

function AssignedOpenDrawerForm(props) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [touchedUser, setTouchedUser] = useState(false);
  const [isLoadingUsers, setIsLoadingUser] = useState(false);

  const handleSelectUserFocus = () => {
    if (!touchedUser) {
      fetchUser();
      setTouchedUser(true);
    }
  };


    const fetchUser = async () => {
        setIsLoadingUser(true);
            try {
                const apiEndpoint = `${base_url}/employee/active/user/drop-down/${props.organizationId}`;
                const response = await fetch(apiEndpoint,{
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${props.token}`,
                    'Content-Type': 'application/json',
                  },
                });
                const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching customers:', error);
        } finally {
          setIsLoadingUser(false);
        }
      };

        const handleUserChange = async (value) => {
            setLoading(true);
            setError(null);
            try {
              const response = await axios.put(`${base_url2}/distributor/changesAssignTo/${props.distributorId}/${value}`,{
              assignTo :props.userId, 
              },
                {
                  headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                  },
                }  
              );
             
              setData(response.data);
              Swal.fire({
                title: 'Success!',
                text: 'Reassigned successfully!',
                icon: 'success',
                // confirmButtonText: 'OK',
                showConfirmButton: false,
                timer: 1500,
            });
            } 
            
            catch (err) {
              setError(err);
              Swal.fire({
                title: 'Error!',
                text: 'There was an issue generating the invoice.',
                icon: 'error',
                // confirmButtonText: 'OK',
                showConfirmButton: false,
                timer: 1500,
            });
            } finally {
              setLoading(false);
            }
    // updateTheUser(props.currentCustomerId,value);
  };
      
    
    

  return (
    <>
    
     
          <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
       
            <div class=" flex justify-between max-sm:flex-col">
              <div class=" h-full w-[47.5%] mt-3 max-sm:w-wk">
              <div class="font-bold text-xs">
            List of Users with ERP customer access
                </div>
                     <Select
               placeholder="Select Users"
               loading={isLoadingUsers}
               onFocus={handleSelectUserFocus}
               onChange={handleUserChange}
             >
               {users.map(customer => (
                 <Option key={customer.employeeId} value={customer.employeeId}>
                   {customer.empName}
                 </Option>
               ))}
             </Select>
                
               
               
              
              
              </div>

        
             
            </div>
          
          
         
          </div>
     
    </>
  );
}

const mapStateToProps = ({ auth, opportunity,employee,currency,investor, contact, customer,leads }) => ({
  user: auth.userDetails,
  crmAllData:leads.crmAllData,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  token: auth.token,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AssignedOpenDrawerForm);
