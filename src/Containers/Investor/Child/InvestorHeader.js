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
             showCheckboxes={props.showCheckboxes}
             selectedDeals={props.selectedDeals}
             selectedUser={props.selectedUser}
             isTransferMode={props.isTransferMode}
             handleUserSelect={props.handleUserSelect}
             handleTransferClick={props.handleTransferClick}
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
