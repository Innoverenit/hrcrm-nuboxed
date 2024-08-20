import React, { Component,lazy, Suspense} from "react";
import { ActionHeader } from "../../Components/Utils";
const OrganizationActionRight = lazy(() =>
  import("./Child/OrganizationHeader/OrganizationActionRight")
);
const OrganizationActionLeft = lazy(() =>
  import("./OrganizationActionLeft")
);

class OrganizationHeader extends Component {
  render() {
    const {
        handleOrganizationModal,
      viewType,
      handleChange,
      currentData,
      handleClear,
      setOrganizationViewType,
    } = this.props;
    return (
      <div className="sticky mt-1 z-50"> 
      
        <ActionHeader
          leftComponent={
            <Suspense fallback={"Loading..."}>
            <OrganizationActionLeft
            viewType={viewType}
            activeTab={this.props.activeTab}
            organizationDetailsList={this.props.organizationDetailsList}
            organizationDetails={this.props.organizationDetails}
            handleOnClick={this.props.handleOnClick}
            // handleChange={handleChange}
            setOrganizationViewType={setOrganizationViewType}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
            /></Suspense>
          }
       
          rightComponent={
            <Suspense fallback={"Loading..."}>
            <OrganizationActionRight
            viewType={viewType}
            handleOrganizationModal={handleOrganizationModal}
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
           /></Suspense>
          }
        />
      </div>
    );
  }
}

export default OrganizationHeader;
