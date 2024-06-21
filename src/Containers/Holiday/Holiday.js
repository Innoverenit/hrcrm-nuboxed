import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleHolidayModal } from "./HolidayAction";
const HolidayPage = lazy(() => import("./Child/HolidayPage"));

class Holiday extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    const { addHolidayModal, handleHolidayModal } = this.props;
    console.log(addHolidayModal);
    return (
      <>
        {/* <React.Fragment> */}
        {/* <HolidayHeader handleHolidayModal={handleHolidayModal} /> */}
        
        <HolidayPage />
      </>
    );
  }
}

const mapStateToProps = ({ auth, holiday }) => ({
  user: auth.userDetails,
  addHolidayModal: holiday.addHolidayModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleHolidayModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
