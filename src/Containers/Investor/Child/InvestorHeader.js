import React, { lazy, Suspense} from "react";
import { ActionHeader } from "../../../Components/Utils";
const InvestorActionLeft=lazy(()=> import("./InvestorActionLeft"));
const InvestorActionRight=lazy(()=> import("./InvestorActionRight"));

function InvestorHeader (props) {
 

    const {
      handleInvestorModal,
      viewType,
      teamsAccessInd,
      setInvestorViewType,
      handleChange,
      currentData,
      handleClear,
      handleClean,
      handleCurrentData,
      currentUser

    } =props;
    return (
      <div className="sticky mt-1 z-50">
        <ActionHeader
          leftComponent={
            < Suspense fallback={"Loading..."}>
            <InvestorActionLeft
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            teamsAccessInd={teamsAccessInd}
            viewType={viewType}
            setInvestorViewType={setInvestorViewType}
            currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}
     
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}
            handleFilterChange={props.handleFilterChange}
                        filter={props.filter}
            />
            </Suspense>
          }
          rightComponent={
            < Suspense fallback={"Loading..."}>
            <InvestorActionRight
            viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            handleInvestorModal={handleInvestorModal}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            />
            </Suspense>
          }
        />
      </div>
    );
  
}

export default InvestorHeader;
