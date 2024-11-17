import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Switch } from "antd";
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import dayjs from "dayjs";
import { date } from "yup";

class SettingsSingleHoliday extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      currentStage: "",
      fields: {},
       date: this.props.holidays.date,
      // date:"",
      holidayType: false,
      
    };
  }
  handleChange = ({ target: { name, value } }) => {
    debugger;
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  };
  // onChangeDatePicker = (date, dateString) => {
  //   console.log(date, dateString);
  //   this.setState({ date: moment(dateString) });
  // };
  onChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ date: dayjs(dateString) });
  };
 
  handleChangeHolidayTime = (checked) => {
    console.log(checked);
    this.setState({
      holidayType: checked,
    });
  };
  render() {
    console.log(this.state.fields);
    const { holidays } = this.props;
    console.log(holidays);

    const {
      holidays: { holidayName, date, holidayType, holidayId,handleDeleteHoliday },
    } = this.props;

    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between items-center"
          
              
              // onClick={() => handleStageClick(stageId, stageName)}
              // style={{
              //   backgroundColor:
              // stageId === currentStage && "rgb(161, 185, 185)",
              // }}
              >
                <StageName
                  style={{
                    // flexBasis: "85%",
                    flexBasis: "30%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {elipsize(holidayName, 23)}
                </StageName>
                <StageValue
                  style={{
                    flexBasis: "18%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                    // marginRight: "8%",
                  }}
                >
                  {dayjs(date).format("YYYY-MM-DD")}
                  {/* {`${dayjs(date).format("ll")}`} */}
                </StageValue>
                <StageValue
                  style={{
                    flexBasis: "27%",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "Green" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {`${holidayType}`}
                </StageValue>
            
          
       
          {/* {holidayType === "Optional" ?
          <StageValue
          style={{
        
            textAlign: "left",
           
        
          }}
          >
            <Popconfirm
              title="Do you wish to change Status ? "
              okText="Yes"
              cancelText="No"
            >
              <Switch
                style={{ width: "7em" }}
                checkedChildren="Applied"
                unCheckedChildren="Not Applied"
              />
            </Popconfirm>
          </StageValue>
          :null} */}
      
              
                {/* {this.props.role === "ADMIN" && ( */}
                  <div style={{}}>
                    <BorderColorIcon
                      tooltipTitle="Edit"
                      iconType="edit"
                      onClick={toggleViewType}
                      style={{fontSize:"1rem"}}
                    />
                  </div>
                  {/* )} */}
                  &nbsp; &nbsp;
                  {/* {this.props.role === "ADMIN" && ( */}
                  <div style={{}}>
                    <DeleteIcon
                      tooltipTitle="Delete"
                      iconType="delete"
                      //  onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      // handleIconClick={item.holidayId}
                      onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                  </div>
                  {/* )} */}
              </div>

            ) : (
                <div class=" flex">
                  <TextInput
                    name={this.props.newHolidayName}
                    defaultValue={holidayName}
                    onChange={this.handleChange}
                    width={"48%"}
                  />
                &nbsp;
                <DatePicker
                   width={"48%"}
                  value={dayjs(this.state.date)}
                  onChange={this.onChangeDatePicker}
                />
                &nbsp;
                  <Switch
                    style={{ width: "9rem", }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
                 
                &nbsp;
                 
                            
                  <div class=" flex justify-end mr-[0.3125em] mt-[0.625em] mb-[0.625em]"
                
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      // Loading={updatingStages}

                      onClick={() =>
                        this.props.handleUpdateHoliday(
                          holidayId,
                          this.state.fields.holidayName,
                          this.state.date,
                          this.state.holidayType === true
                            ? "Optional"
                            : "Mandatory",
                          toggleViewType()
                        )
                      }
                    >
                      Save
                     
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                      Cancel
                    
                  </Button>
                  </div>
                </div>
                 
              )
          }
        </ViewEditCard>
      </StageWrapper>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SettingsSingleHoliday);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;
const StageValue = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-size: 1 rem;
  font-weight: 400;
  margin: 0;
`;
