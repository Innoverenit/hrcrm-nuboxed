import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
import RegionalDashActionLeft from "./RegionalDashActionLeft";

class RegionalDashboardHeader extends Component {
  render() {
    const {
      handleCustomerModal,
      viewType,
      setReionalDashViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <RegionalDashActionLeft
            viewType={viewType}
            handleChange={handleChange}
            setReionalDashViewType={setReionalDashViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
              handleFilterChange={this.props.handleFilterChange}
              filter={this.props.filter}
            />
          }
    
        />
      </div>
    );
  }
}

export default RegionalDashboardHeader;
