import React, { Component,lazy} from "react";
import { ActionHeader } from "../../Components/Utils";
import OrganizationActionRight from "./Child/OrganizationHeader/OrganizationActionRight";
import OrganizationActionLeft from "./OrganizationActionLeft";
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
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <OrganizationActionLeft
            viewType={viewType}
            // handleChange={handleChange}
            setOrganizationViewType={setOrganizationViewType}

            />
          }
       
          rightComponent={
            <OrganizationActionRight
            viewType={viewType}
            handleOrganizationModal={handleOrganizationModal}
           />
          }
        />
      </div>
    );
  }
}

export default OrganizationHeader;
