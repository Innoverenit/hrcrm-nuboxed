import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addapplyOffer } from "../HolidayAction";
import styled from "styled-components";
import { Button, DatePicker, Switch } from "antd";
import { TextInput, } from "../../../Components/UI/Elements";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ViewEditCard from "../../../Components/UI/Elements/ViewEditCard";
import { elipsize } from "../../../Helpers/Function/Functions";
import dayjs from "dayjs";

class SingleHoliday extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      color: "red",
      currentStage: "",
      fields: {},
      date: this.props.holidaysYear.date,
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
  handleUpdateBrokarage = (holidayId, year, countryId) => {
    const data = {
      holidayId: holidayId,
      year: year,
      countryId: countryId
    };

    this.props.addapplyOffer(data, holidayId);
  };
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
    const { holidaysYear } = this.props;
    console.log(holidaysYear);

    const {
      holidaysYear: { holidayName, date, holidayType,countryId,year, holidayId,handleDeleteHoliday },
    } = this.props;

    return (
      <StageWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex ">
                <StageName
                  style={{
                   
                   width:"13rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {elipsize(holidayName, 23)}
                </StageName>
                <StageValue
                  style={{
                    width:"10rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "orange" : "tomato",
                    fontWeight: "normal",
                    // marginRight: "8%",
                  }}
                >
                  {`${dayjs(date).format("DD/MM/YYYY")}`}
                </StageValue>
                <StageValue
                  style={{
                    width:"10rem",
                    textAlign: "left",
                    color: holidayType === "Optional" ? "Green" : "tomato",
                    fontWeight: "normal",
                  }}
                >
                  {`${holidayType}`}
                </StageValue>
            
          
       
          {holidayType === "Optional" ?
          <StageValue
          style={{
            // flexBasis: "41%",
            textAlign: "left",
           
            // fontWeight: "normal",
          }}
          >
            
            <Button
  type="primary"
    onClick={() => this.handleUpdateBrokarage(holidayId, year,countryId)}
    
  >
    Apply
   
  </Button>        
          </StageValue>
          :null}
      
              
                {this.props.role === "ADMIN" && (
                  <div style={{}}>
                    <BorderColorIcon
                      tooltipTitle="Edit"
                      iconType="edit"
                      handleIconClick={toggleViewType}
                       className=" !text-red-600 cursor-pointer !text-icon "
                    />
                  </div>)}
                
                  {this.props.role === "ADMIN" && (
                  <div class=" ml-2">
                    <BorderColorIcon
                      tooltipTitle="Delete"
                      iconType="delete"
                      //  onClick={() => this.props.handleDeleteHoliday(holidayId)}
                      // handleIconClick={item.holidayId}
                      handleIconClick={() => this.props.handleDeleteHoliday(holidayId)}
                       className=" !text-red-600 cursor-pointer !text-icon "
                    />
                  </div>)}
              </div>

            ) : (
                <div class=" flex">
                  <TextInput
                    name={this.props.newHolidayName}
                    defaultValue={holidayName}
                    onChange={this.handleChange}
                    width={"48%"}
                  />
            <div class=" ml-2">
                  <DatePicker
                    defaultValue={dayjs(date)}
                    onChange={this.onChangeDatePicker}
                  />
                  </div>
               
                  <Switch
                    style={{ width: "6.25em", marginLeft: "1rem" }}
                    onChange={this.handleChangeHolidayTime}
                    checked={this.state.holidayType}
                    checkedChildren="Optional"
                    unCheckedChildren="Mandatory"
                  />
            
                  <div class=" flex justify-end mr-[0.3125em] ml-2 mt-[0.625em] mb-[0.625em]"
                  
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
                 <div class=" ml-2">
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                      Cancel
                  </Button>
                  </div>
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
    addapplyOffer
  }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SingleHoliday);

const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  // cursor: pointer;
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
