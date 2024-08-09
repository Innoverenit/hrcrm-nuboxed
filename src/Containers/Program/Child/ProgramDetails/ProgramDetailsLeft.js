import React, { Component,Suspense,lazy} from "react";
import ProgramOverViewCard from "../ProgramCards/ProgramOverViewCard";

class ProgramDetailsLeft extends Component {
  render() {
    const { program } = this.props;
    return (
      <>
        <div class="flex-col block">
         <Suspense fallback={"Loading"}>
         <ProgramOverViewCard program={program} />
         </Suspense>
    </div>
      </>
    );
  }
}
export default ProgramDetailsLeft;
