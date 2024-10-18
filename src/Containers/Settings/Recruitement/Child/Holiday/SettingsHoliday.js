import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleHolidayModal } from "../../../../Holiday/HolidayAction";
const SettingsHolidayPage = lazy(() => import("../../../../Settings/Recruitement/Child/Holiday/SettingsHolidayPage"));


class SettingsHoliday extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    const { addHolidayModal, handleHolidayModal } = this.props;
    console.log(this.props.country_id);
    console.log(this.props.country_name);
    return (
      <>
           {/* <StyledTabs
              style={{ width: "80%" }}
              defaultActiveKey={activeKey}
              activeKey={activeKey}
              onChange={handleTabChange}
              type="card"
            >
              {props.mandatorylanguage.map((item, i) => (
                <TabPane
                  key={item.language}
                  tab={<span
                    style={{
                      backgroundColor: item.baseInd ? "#54B254" : "#B254B2",
                      display: "inline-block",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  >{elipsize(item.language, 10)}</span>}
                >
             
                </TabPane>
              ))}
            </StyledTabs> */}
        {/* <React.Fragment> */}
        {/* <HolidayHeader handleHolidayModal={handleHolidayModal} /> */}
        {/* <AddHolidayModal
          addHolidayModal={addHolidayModal}
          handleHolidayModal={handleHolidayModal}
        /> */}
        {/* <HolidayTable /> */}
        <SettingsHolidayPage country_name={this.props.country_name}
        country_id={this.props.country_id}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHoliday);
