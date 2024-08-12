
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, message ,Input} from "antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput} from "../../../Components/UI/Elements";

import {addUnits,getUnits,
  removeUnits,
  updateUnits,
  searchUnitName
} from "../Unit/UnitAction"
import dayjs from "dayjs";
 import SingleUnit from "./SingleUnit";


class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      unitName: "",
      type: "",
      singleUnit: "",
      editInd:true,
      currentData: ""
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
     this.props.getUnits(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddUnits = () => {
    const { addUnits, units } = this.props;
    const { unitName, addingUnits, isTextInputOpen,editInd
    } = this.state;
    let unit = { unitName,editInd
    };

    let exist =
    units &&
    units.some((element) => element.unitName == unitName);

    if (exist) {
      message.error(
        "Can't create as another unit type exists with same name!"
      );
    } else {
      addUnits(unit, () => console.log("add unit callback"));
    }

    this.setState({
      unitName: "",
      singleUnit: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteUnit = (unitId={unitId}) => {
    this.props.removeUnits(unitId);
    this.setState({ unitName: "", unitId: "" });
  };
  handleUpdateUnit = (unitName,unitId ,editInd, cb) => {
    this.props.updateUnits(unitName, unitId,editInd, cb);
    this.setState({ unitName: "", singleUnit: "",editInd: true });
  };

  componentDidMount() {
    const { getUnits ,organizationId} = this.props;
    console.log();
    getUnits(organizationId);
  }
  render() {
    const {
      fetchingUnits,
      fetchingUnitsError,
      units,
      addingUnits,
      updatingUnits,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      unitName,
      singleUnit,
      linkedTasks,
    } = this.state;
    if (fetchingUnits) return <p>Loading ...</p>;
   
    return (
      <>
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
                     <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder="Search by Name"
            width={"100%"}
         
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchUnitName(this.state.currentData);

          }}
        >
          Submit
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
      
        </Button>
        </div>
        <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {units.length &&
                  units.map((unit, i) => (
                    <SingleUnit
                       key={i}
                      value={singleUnit}
                      name="singleUnit"
                        unit={unit}
                      linkedTasks={linkedTasks}
                      updatingUnits={updatingUnits}
                      handleUpdateUnit={this.handleUpdateUnit}
                      handleChange={this.handleChange}
                      handleUnitTask={this.handleUnitTask}
                      handleDeleteUnit={this.handleDeleteUnit}
                    />
                   ))} 
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ml-1 mt-1 ">
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="unitName"
                  value={unitName}
                   onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!unitName}
                  Loading={addingUnits}
                  onClick={this.handleAddUnits}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                     Loading={addingUnits}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
               
              </>
            )}
          </MainWrapper>
         
        </div>
        <h4>Updated on {dayjs(this.props.units && this.props.units.length && this.props.units[0].updationDate).format("ll")} by {this.props.units && this.props.units.length && this.props.units[0].name}</h4>
      </>
    );
  }
}

const mapStateToProps = ({ unit,auth }) => ({
  addingUnits: unit.addingUnits,
  addingUnitsError: unit.addingUnitsError,
  units: unit.units,

  removingUnits: unit.removingUnits,
  removingUnitsError: unit.removingUnitsError,

  organizationId: auth.userDetails.organizationId,
  fetchingUnits:unit.fetchingUnits,
  fetchingUnitsError: unit.fetchingUnitsError,

  updatingUnits: unit.updatingUnits,
  updatingUnitsError: unit.updatingUnitsError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUnits,
    addUnits,
    removeUnits,
     updateUnits,
     searchUnitName
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Unit);
