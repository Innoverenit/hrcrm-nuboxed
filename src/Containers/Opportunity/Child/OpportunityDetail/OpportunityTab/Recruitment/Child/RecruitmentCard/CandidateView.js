import React, { Component } from "react";
class CandidateView extends Component {
  render() {
    const {
      candidate: { firstName,middleName,lastName },
    } = this.props;
    return (
      <>
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[85%] ">

            &nbsp;
            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto w-[80%] ">
              <div
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {firstName} {middleName} {lastName}
              </div>
              <div overflow="hidden" textOverflow="ellipsis">
                {/* {"accountName"} */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CandidateView;
