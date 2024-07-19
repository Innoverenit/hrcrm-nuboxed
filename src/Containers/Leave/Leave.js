import React, { Component, lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getleaveLeftSideDetails, setLeavesViewType } from "./LeavesAction";
const LeaveCardList = lazy(() => import("./Child/CardView/LeaveCardList"));
const LeaveCardView = lazy(() => import("./Child/CardView/LeaveCardView"));
const LeaveHeader = lazy(() => import("./Child/LeaveHeader"));
const LeaveStatusCard = lazy(() => import("./Child/CardView/LeaveStatusCard"));
const LeaveGranttChart = lazy(() => import("./Child/Chart/LeaveGranttChart"));
const LeaveJumpstart = lazy(() => import("./Child/JumpStartBoxes/LeaveJumpstart"));


class Leave extends Component {
  state = { currentData: "", currentUser: "" };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  componentDidMount() {
    const {
      user: { userId },
      getleaveLeftSideDetails,
    } = this.props;
    getleaveLeftSideDetails(userId);
  }
  render() {
    const {
      setLeavesViewType,
      addEmployeeModal,
      handleEmployeeModal,
      viewType,
    } = this.props;
    return (
      <>

        <LeaveHeader
          selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}
          handleDropChange={this.handleDropChange}
          currentUser={this.state.currentUser}
          viewType={this.props.viewType}
          setLeavesViewType={this.props.setLeavesViewType}
          handleClear={this.handleClear}
          handleChange={this.handleChange}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <LeaveJumpstart leaveFetching={this.props.leaveFetching} />

        {/* <FlexContainer>
          <Suspense fallback={"Loading..."}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}> */}
        {this.props.viewType === "tile" ?
          <LeaveCardView
          selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}
            viewType={viewType}
          /> :
          //  this.props.viewType === "table" ?
          //      <LeaveTable 
          //      viewType={viewType}
          //      />:
          this.props.viewType === "card" ?
            <LeaveCardList
              viewType={viewType}
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
              /> : this.props.viewType === "list" ?
              <LeaveStatusCard
                viewType={viewType}
                selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
              /> : this.props.viewType === "grant" ?
                <LeaveGranttChart
                  viewType={viewType}
                  selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText}
                /> :
                null}
        {/* <div style={{ width: "25%", height: "100%" }}>
                <LeaveDetailLeft leaveFetching={this.props.leaveFetching} />
              </div> */}
        {/* <div style={{ width: "100%", height: "100%" }}>
                <LeaveDetailRight />
              </div> */}
        {/* </FlexContainer>
          </Suspense>
        </FlexContainer> */}
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = ({ auth, leave }) => ({
  user: auth.userDetails,
  viewType: leave.viewType,

  leaveFetching: leave.leaveFetching,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getleaveLeftSideDetails,
    setLeavesViewType
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
