import React, { Component,lazy, Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ContactInvestActionLeft = lazy(()=>import("./ContactInvestActionLeft"));
const ContactInvestActionRight = lazy(() =>import("./ContactInvestActionRight"));

class ContactInvestHeader extends Component {
  render() {
    const {
      addContactInvestModal,
      handleContactInvestModal,
      viewType,
      teamsAccessInd,
      setContactInvetViewType,
      handleChange,
      currentData,
      handleClear,
      handleClean,
      handleCurrentData,
      currentUser
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <Suspense >
            <ContactInvestActionLeft         
            teamsAccessInd={teamsAccessInd}
            handleFilterChange={this.props.handleFilterChange}
            filter={this.props.filter}
              viewType={viewType}
              setContactInvetViewType={setContactInvetViewType}
              currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}     
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}        
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            />
            </Suspense>
          }
          rightComponent={
            <Suspense>
            <ContactInvestActionRight 
            viewType={viewType}
            addContactInvestModal={addContactInvestModal}
            handleContactInvestModal={handleContactInvestModal}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            translatedMenuItems={this.props.translatedMenuItems}
            />
            </Suspense>
          }
        />
      </div>
    );
  }
}

export default ContactInvestHeader;
