import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import React, { lazy ,Suspense } from 'react'
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
            className="!text-2xl cursor-pointer text-[#1890ff] mr-1"
            onClick={() => {

              props.handleRepositoryOrganizationModal(true);
            }}
          />
        </Tooltip>
      </div>
      <Suspense >
      <RepositoryOrganizationModal
        repositoryOrganizationModal={props.repositoryOrganizationModal}
        handleRepositoryOrganizationModal={props.handleRepositoryOrganizationModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
      </Suspense>
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

