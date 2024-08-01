import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import React, { lazy } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleRepositoryOrganizationModal } from "../Auth/AuthAction"
import { Tooltip } from 'antd';
const RepositoryOrganizationModal = lazy(() =>
  import("./RepositoryOrganizationModal")
);

function RepositoryData(props) {
  return (
    <>
      <div>
        <Tooltip title="Repository">
          <LibraryBooksIcon
            className="!text-icon cursor-pointer text-[#1890ff] mr-[0.25rem]"
            onClick={() => {

              props.handleRepositoryOrganizationModal(true);
            }}
          />
        </Tooltip>
      </div>

      <RepositoryOrganizationModal
        repositoryOrganizationModal={props.repositoryOrganizationModal}
        handleRepositoryOrganizationModal={props.handleRepositoryOrganizationModal}
      />
    </>
  )
}
const mapStateToProps = ({ auth, customer, employee }) => ({
  repositoryOrganizationModal: auth.repositoryOrganizationModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleRepositoryOrganizationModal

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryData);

