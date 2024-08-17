import React, { Component,lazy,Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader } from "../../../Components/Placeholder";
const TaskActionRight = lazy(() => import("./TaskActionRight"));
const TaskActionLeft = lazy(() => import("./TaskActionLeft"));
class TaskHeader extends Component {
  render() {
    const { viewType, setTaskViewType } = this.props;
    return (
      <div className="sticky mt-1 z-50"> 
        <ActionHeader
          leftComponent={
            
            <Suspense fallback={<BundleLoader />}><TaskActionLeft 
            viewType={viewType}
            setTaskViewType={setTaskViewType}
          /></Suspense>}
          rightComponent={<Suspense fallback={<BundleLoader />}><TaskActionRight 
            viewType={viewType}
          /></Suspense>}
        />
      </div>
    );
  }
}

export default TaskHeader;
