import UploadIcon from '@mui/icons-material/Upload';
import React from 'react'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import AddUploadOrganizationModal from "./AddUploadOrganizationModal"
import {handleUpdateOrganizationModal} from "../Auth/AuthAction"

function UploadOrganization(props) {
  return (
    <>
    <div>
        <UploadIcon
          onClick={() => {
          
            props.handleUpdateOrganizationModal(true);
          }}
        />
        </div>

        <AddUploadOrganizationModal
        updateOrganizationModal={props.updateOrganizationModal}
        handleUpdateOrganizationModal={props.handleUpdateOrganizationModal}
        />
    </>
  )
}
const mapStateToProps = ({ auth, customer,employee }) => ({
    updateOrganizationModal:auth.updateOrganizationModal
    // setEditingCustomer: customer.setEditingCustomer,
    // updateCustomerById: customer.updateCustomerById,
    // updateCustomerByIdError: customer.updateCustomerByIdError,
    // user: auth.userDetails,
    // userId: auth.userDetails.userId,
    // allCustomerEmployeeList:employee.allCustomerEmployeeList,
    // organizationId: auth.userDetails.organizationId,
    // employees: employee.employees,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        handleUpdateOrganizationModal
        // updateCustomer,
        // setEditCustomer,
        // getSectors,
        // getAllSalesList,
        // getAllCustomerEmployeelist,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(UploadOrganization);

