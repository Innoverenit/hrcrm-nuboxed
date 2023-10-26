import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import React from 'react'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import AddUploadOrganizationModal from "./AddUploadOrganizationModal"
import {handleRepositoryOrganizationModal} from "../Auth/AuthAction"
import RepositoryOrganizationModal from './RepositoryOrganizationModal';

function RepositoryData(props) {
  return (
    <>
    <div>
        <BatchPredictionIcon
        style={{fontSize:"1.2rem",marginLeft:"0.5rem"}}
          onClick={() => {
          
            props.handleRepositoryOrganizationModal(true);
          }}
        />
        </div>

        <RepositoryOrganizationModal
        repositoryOrganizationModal={props.repositoryOrganizationModal}
        handleRepositoryOrganizationModal={props.handleRepositoryOrganizationModal}
        />
    </>
  )
}
const mapStateToProps = ({ auth, customer,employee }) => ({
    repositoryOrganizationModal:auth.repositoryOrganizationModal
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
         handleRepositoryOrganizationModal
      
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(RepositoryData);

