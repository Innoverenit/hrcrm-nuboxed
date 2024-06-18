import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClubViewType } from "./ClubAction";
import { BundleLoader } from "../../../Components/Placeholder";
import ClubHeader from "./ClubHeader";
import ClubTableAll from "./ClubTableAll";




class Club extends Component {
  state = { currentData: "" };

  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const { setClubViewType, viewType } = this.props;
    return (
      <React.Fragment>
        <ClubHeader
          setClubViewType={setClubViewType}
          viewType={viewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />

        <Suspense fallback={<BundleLoader />}>
          {this.props.viewType === "table" ? (
            <ClubTableAll />
          )
          :null}
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ trade, auth }) => ({
  viewType: trade.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setClubViewType,
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Club);
