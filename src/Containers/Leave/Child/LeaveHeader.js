import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const LeaveActionRight = lazy(() => import("./LeaveActionRight"));
const LeavesActionLeft = lazy(() => import("./LeavesActionLeft"));

class LeaveHeader extends Component {
    render() {
        const {
            viewType,
            setLeavesViewType,
            handleChange,
            currentData,
            handleClear,
        } = this.props;
        return (
            <>
            <div className="sticky mt-1 z-50"> 
        <ActionHeader
          leftComponent={
            <LeavesActionLeft
            viewType={viewType}
            handleChange={handleChange}
            setLeavesViewType={setLeavesViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <LeaveActionRight
            viewType={viewType}
            currentUser={this.props.currentUser} 
             />
          }
        />
      </div>
                <div>

                </div>
            </>

        );
    }
}

export default LeaveHeader;
