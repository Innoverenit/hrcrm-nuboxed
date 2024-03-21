import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
const OrganizationDocumentTab = lazy(() =>
  import("./OrganizationDocumentTab")
);



const RepositoryOrganizationModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="Repository"
        width="69%"
        visible={props.repositoryOrganizationModal}
        onClose={() => props.handleRepositoryOrganizationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>

          <OrganizationDocumentTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default RepositoryOrganizationModal;
