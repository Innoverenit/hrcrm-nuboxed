import React, { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { Button, Select,Switch,Input } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import {updateProspectUser} from "../../CustomerAction"




import dayjs from "dayjs";
import { Listbox } from "@headlessui/react";


import {base_url} from "../../../../Config/Auth";



const { Option } = Select; 

function UpdateProspectUser(props) {


      const [users, setUsers] = useState([]);
  
  const [touchedUser, setTouchedUser] = useState(false);
  //const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoadingUsers, setIsLoadingUser] = useState(false);
//   useEffect(() => {
 
//   }, []);


  const handleSelectUserFocus = () => {
    if (!touchedUser) {
      fetchUser();
      // fetchSector();

      setTouchedUser(true);
    }
  };





    const fetchUser = async () => {
        setIsLoadingUser(true);
        try {
       
    
          const apiEndpoint = `${base_url}/employee/user-list/drop-down/crm`;
          const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${props.token}`,
              'Content-Type': 'application/json',
              // Add any other headers if needed
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



        const handleUserChange = (value) => {
    // setSelectedCustomer(customerId);
    // fetchContacts(customerId);
    props.updateProspectUser(props.currentCustomerId,value)
  };
      
    
    

  return (
    <>
    
     
          <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
       
            <div class=" flex justify-between max-sm:flex-col">
              <div class=" h-full w-[47.5%] mt-3 max-sm:w-wk">
              <div class="font-bold text-xs">
            List of Users with CRM access
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
        updateProspectUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProspectUser);
