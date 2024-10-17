import React, {lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHoliday, getHolidayyear, updateHoliday,deleteHoliday } from "../HolidayAction";
import { StyledTabs } from "../../../Components/UI/Antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import { DatePicker } from "antd";
const SingleHoliday=lazy(()=>import("./SingleHoliday"));

const TabPane = StyledTabs.TabPane;

class HolidayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputOpen: false,
      holidayName: "",
      holidayType: false,
      date: "",
    };
  }
  componentDidMount() {
    const currentYear = new Date().getFullYear();
    
    this.props.getHolidayyear(this.props.workplace,currentYear);
  }
  handleChangeHolidayTime = (checked) => {
    this.setState({
      holidayType: checked,
    });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleAddProcess = () => {
    const { updateProcessName } = this.props;

    const {
      processName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.processId;
    let process = { processName, processId: Id };
    updateProcessName(process, this.handleCallBack1);
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      this.props.getHolidayyear();
    } else {
      alert("error");
    }
  };
  handleAddStage = () => {
    console.log(this.state.holidayName);
    console.log(dayjs(this.state.date).toISOString());
    console.log(this.state.holidayType ? "Optional" : "Mandatory");
    this.props.addHoliday(
      {
        holidayName: this.state.holidayName,
        date: dayjs(this.state.date).toISOString(),
        holidayType: this.state.holidayType ? "Optional" : "Mandatory",
      },
      this.handleCallBack
    );

    this.setState({
      isTextInputOpen: false,
    });
  };
  handleCancel = () => {
    console.log("cancel button");
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  };
  onChange = (date, dateString) => {
    if (dateString) {
      const selectedYear = parseInt(dateString, 10);
      
     
      console.log('Selected Year:', selectedYear);
      this.setState({ selectedYear });
      this.props.getHolidayyear(this.props.workplace,selectedYear);
    }
   
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: dayjs(dateString) });
  };
  handleUpdateHoliday = (id, holidayName, date, holidayType) => {
    this.props.updateHoliday(id, holidayName, date, holidayType);
  };
  handleDeleteHoliday = (id) => {
    this.props.deleteHoliday(id);
    this.setState({ holidayType: "", singleHoliday: "" });
};
  render() {
    const currentYear = dayjs().format('YYYY');
   
    const { selectedYear } = this.state;
    console.log(this.props.workplace)
  
    const { isTextInputOpen } = this.state;
    const {
      userType,
      fetchingHoliday
    } = this.props;
    console.log(this.state.holidayName);
    if (fetchingHoliday) {
      return <BundleLoader />;
    }
    const firstItem = this.props.holidaysYear[0];
console.log(this.props.holidaysYear)
    return (
      <>
        <div class=" flex">
          <div  class="max-sm:w-[24rem] md:w-2/4">
            <MainWrapper>
              <div class=" flex justify-left text-[1rem] text-[white] bg-[#40A9FF]"
            
              >
                Holiday List-<div>
                <DatePicker 
                //  format="YYYY"
                defaultValue={dayjs(currentYear, 'YYYY')}
                
                 onChange={this.onChange}
                  picker="year" />
                 </div>
                 <div className=" ml-4">
      {firstItem && (
        <>
          <div>{firstItem.userOptnlHolidayApplied}/{firstItem.orgOptnlHoliday}</div>
        </>
      )}
    </div>              
              </div>                                  
              <div>
                {this.props.holidaysYear.map((item, i) => (
                  <SingleHoliday
                  holidaysYear={item}
                    newHolidayName="holidayName"
                    handleUpdateHoliday={this.handleUpdateHoliday}
                    handleDeleteHoliday={this.handleDeleteHoliday}
                  />
                ))}
              </div>
             
            </MainWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ holiday, auth }) => ({
  holidaysYear: holiday.holidaysYear,
  fetchingHoliday:holiday.fetchingHoliday,
  addingHoliday: holiday.addingHoliday,
  userType: auth.userDetails,
  deleteHoliday:holiday.deleteHoliday,
  address:auth.userDetails.address,
  workplace:auth.userDetails.workplace,
  // country:auth.userDetails.address && auth.userDetails.address.length && auth.userDetails.address[0].country,
  deleteHolidayError:holiday.deleteHolidayError,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addHoliday, getHolidayyear, updateHoliday,  deleteHoliday }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HolidayPage);
