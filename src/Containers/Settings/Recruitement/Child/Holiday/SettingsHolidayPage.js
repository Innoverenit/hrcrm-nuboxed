import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addHoliday,
  getHoliday,
  updateHoliday,
  deleteHoliday,
} from "../../../../Holiday/HolidayAction";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import { Button, Switch, DatePicker } from "antd";

const SettingsSingleHoliday = lazy(() => import("./SettingsSingleHoliday"));
const TabPane = StyledTabs.TabPane;

class SettingsHolidayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputOpen: false,
      holidayName: "",
      selectedYear: dayjs().year(),
      holidayType: false,
      selectedDate: null,
    };
  }

  componentDidMount() {
    this.fetchHolidayData(this.state.selectedYear);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country_name !== this.props.country_name) {
      this.fetchHolidayData(this.state.selectedYear);
    }
  }

  fetchHolidayData = (year) => {
    const { getHoliday, country_name } = this.props;
    if (country_name) {
      getHoliday(country_name, year);
    }
  };

  handleHolidayTypeChange = (checked) => {
    this.setState({ holidayType: checked });
  };

  toggleTextInput = () => {
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  };

  handleAddHoliday = () => {
    const { holidayName, holidayType, selectedDate } = this.state;
    const { addHoliday, country_id } = this.props;

    if (holidayName && selectedDate) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD") + "T00:00:00Z";
      addHoliday(
        {
          country: country_id,
          holidayName,
          date: formattedDate,
          holidayType: holidayType ? "Optional" : "Mandatory",
        },
        this.handleAddHolidayCallback
      );
      this.setState({ isTextInputOpen: false, holidayName: "", selectedDate: null });
    } else {
      alert("Please provide valid holiday name and date.");
    }
  };

  handleAddHolidayCallback = (status) => {
    if (status === "Success") {
      this.fetchHolidayData(this.state.selectedYear);
    } else {
      alert("Error adding holiday");
    }
  };

  handleDatePickerChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleYearChange = (date, dateString) => {
    const year = parseInt(dateString, 10);
    if (year) {
      this.setState({ selectedYear: year }, () => this.fetchHolidayData(year));
    }
  };

  handleUpdateHoliday = (id, holidayName, date, holidayType) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD") + "T00:00:00Z";
    this.props.updateHoliday(id, holidayName, formattedDate, holidayType);
  };

  handleDeleteHoliday = (id) => {
    this.props.deleteHoliday(id);
  };

  render() {
    const { isTextInputOpen, holidayName, holidayType, selectedYear, selectedDate } = this.state;
    const { holidays = [], role, addingHoliday } = this.props;

    return (
      <>
        <div className="flex">
          <div className="w-[80%]">
            <MainWrapper justifyContent="space-between">
              <h1
                style={{
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "1.25em",
                  color: "white",
                  backgroundColor: "#40A9FF",
                }}
              >
                Holiday List
                <DatePicker
                  defaultValue={dayjs(selectedYear, "YYYY")}
                  picker="year"
                  onChange={this.handleYearChange}
                  style={{ marginLeft: "10px" }}
                />
              </h1>

              <div>
                {holidays.map((holiday) => (
                  <SettingsSingleHoliday
                    key={holiday.id}
                    holidays={holiday}
                    handleUpdateHoliday={this.handleUpdateHoliday}
                    handleDeleteHoliday={this.handleDeleteHoliday}
                  />
                ))}
              </div>

              {isTextInputOpen ? (
                <div className="flex items-center justify-between mt-4">
                  <TextInput
                    placeholder="Holiday name"
                    name="holidayName"
                    value={holidayName}
                    onChange={({ target: { value } }) => this.setState({ holidayName: value })}
                    width="30%"
                  />
                  <DatePicker onChange={this.handleDatePickerChange} value={selectedDate} />
                  <Switch
                    onChange={this.handleHolidayTypeChange}
                    checked={holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                  <Button type="primary" loading={addingHoliday} onClick={this.handleAddHoliday}>
                    Save
                  </Button>
                  <Button type="default" onClick={this.toggleTextInput}>
                    Cancel
                  </Button>
                </div>
              ) : (
                role === "ADMIN" && (
                  <div className="flex justify-end">
                    <Button type="primary" onClick={this.toggleTextInput}>
                      Add Holiday
                    </Button>
                  </div>
                )
              )}
            </MainWrapper>
          </div>
        </div>
        {holidays.length > 0 && (
          <h4>
            Updated on {dayjs(holidays[0].updationDate).format("YYYY-MM-DD")} by{" "}
            {holidays[0].updatedBy}
          </h4>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ holiday, auth }) => ({
  holidays: holiday.holidays,
  addingHoliday: holiday.addingHoliday,
  country_id: holiday.country_id,
  role: auth.userDetails?.role,
  country_name: holiday.country_name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addHoliday, getHoliday, updateHoliday, deleteHoliday }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHolidayPage);
