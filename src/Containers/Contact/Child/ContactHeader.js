import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ContactActionLeft = lazy(()=>import("./ContactActionLeft"));
const ContactActionRight = lazy(() =>import("./ContactActionRight"));
class ContactHeader extends Component {
  render() {
    const {
      handleContactModal,
      handleContactImportModal,
      viewType,
      setContactsViewType,
      currentData,
      handleButtonClick,
      visibility,
      handleSecondFilterChange,
      currentSecondData,
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <ContactActionLeft
              currentData={this.props.currentData}
              handleChange={this.props.handleChange}
              text={this.props.text}
              handleClear={this.props.handleClear}
              setCurrentData={this.props.setCurrentData}
              viewType={viewType}
              handleFilterChange={this.props.handleFilterChange}
              filter={this.props.filter}
              setContactsViewType={setContactsViewType}
              currentPartnerData={this.props.currentPartnerData}
              handlePartnerClear={this.props.handlePartnerClear}
              setCurrentPartnerData={this.props.setCurrentPartnerData}
              // selectedChoice={this.props.selectedChoice}
              // handleChoiceChange={this.props.handleChoiceChange}
              selectedCountry={this.props.selectedCountry}
              handleCountryChange={this.props.handleCountryChange}
            />
          }
          rightComponent={
            <ContactActionRight handleContactModal={handleContactModal} 
            handleContactImportModal={handleContactImportModal}
            viewType={viewType}
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}
            currentPartnerUser={this.props.currentPartnerUser}
            handlePartnerDropChange={this.props.handlePartnerDropChange}
            />
          }
        />
      </div>
    );
  }
}

export default ContactHeader;
