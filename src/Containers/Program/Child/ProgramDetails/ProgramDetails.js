import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { getProgramDetailsById } from "../../ProgramAction";
import { MainWrapper } from "../../../../Components/UI/Layout";

import { BundleLoader } from "../../../../Components/Placeholder";
import ProgramDetailsHeader from "./ProgramDetailsHeader";
const ProgramDetailsLeft =lazy(()=>import("./ProgramDetailsLeft"));


class ProgramDetails extends Component {
  componentDidMount() {
      this.props.getProgramDetailsById(this.props.match.params.programDetailsId);
  }
  render() {
    console.log(program)
    const { program, fetchingProgramDetailsById } = this.props;
    return (
      <>
        <>
          <ProgramDetailsHeader />
          {fetchingProgramDetailsById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : 
          (
              <div>
                <Suspense fallback={"Loading..."}>
                  <div class=" flex flex-nowrap w-full">
                     <div class=" w-1/4">
                      <ProgramDetailsLeft program={program} />
                    </div>
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ program }) => ({
    fetchingProgramDetailsById: program.fetchingProgramDetailsById,
    program: program.program,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProgramDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProgramDetails)

