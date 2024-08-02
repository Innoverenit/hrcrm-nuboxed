import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const CustomerActionLeft=lazy(()=> import("./CustomerActionLeft"));
const CustomerActionRight=lazy(()=> import("./CustomerActionRight"));

class CustomerHeader extends Component {
  render() {
    const {
      handleCustomerModal,
      viewType,
      teamsAccessInd,
      setCustomerViewType,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <CustomerActionLeft
            viewType={viewType}
            teamsAccessInd={teamsAccessInd}
            handleChange={handleChange}
            setCustomerViewType={setCustomerViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
              handleFilterChange={this.props.handleFilterChange}
              filter={this.props.filter}
            />
          }
          rightComponent={
            <CustomerActionRight
            handleCustomerImportModal={this.props.handleCustomerImportModal}
            viewType={viewType}
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}

            handleCustomerModal={handleCustomerModal} />
          }
        />
      </div>
    );
  }
}

export default CustomerHeader;
