import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, message, Input } from "antd";
import { MainWrapper} from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import dayjs from "dayjs";
import SingleProgram from "./SingleProgram";

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedSectors: [],
      isTextInputOpen: false,
      addingSector: false,
      sectorName: "",
      type: "",
      singleSector: "",
      editInd: true,
      currentData: "",
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getPrograms();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {

    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddProgram = () => {
    const { addPrograms, programs } = this.props;
    const { levelName, editInd, addingPrograms, isTextInputOpen } = this.state;
    let program = { levelName, editInd };

    let exist =
    programs && programs.some((element) => element.levelName == levelName);

    if (exist) {
      message.error(
        "Can't create as another sector type exists with same name!"
      );
    } else {
        addPrograms(program, () => console.log("add level callback"));
    }

    this.setState({
      sectorName: "",
      singleSector: "",
      isTextInputOpen: false,
      editInd: true,
    });
  };
  handleDeleteSector = (sectorId = { sectorId }) => {
    this.props.removeSectors(sectorId);
    this.setState({ sectorName: "", singleSector: "" });
  };
  handleUpdateSector = (sectorName, sectorId, editInd, cb) => {
    this.props.updateSectors(sectorName, sectorId, editInd, cb);
    this.setState({ sectorName: "", singleSector: "", editInd: true });
  };
 
  componentDidMount() {
    const { getPrograms } = this.props;
    console.log();
    getPrograms();
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingPrograms,
        fetchingProgramsError,
        programs,
        addingPrograms,
      updatingSectors,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      sectorName,
      ingleProgram,
      linkedSectors,
    } = this.state;
    if (fetchingPrograms) return <p>Loading ...</p>;
    //if (fetchingSectorsError) return <p>We are unable to load data</p>;
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
            <div style={{ width: "18vw", display: "flex" }}>
              <Input
                placeholder="Search by Name"
                width={"100%"}
              
                onChange={(e) => this.handleSearchChange(e)}
                value={this.props.currentData}
              />
              <Button
                type={this.props.currentData ? "primary" : "danger"}
                onClick={() => {
                  this.props.searchSectorName(this.state.currentData);
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
               Clear
              </Button>
            </div>

            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            {/* Types Of Documents */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {programs.length &&
                  programs.map((program, i) => (
                    <SingleProgram
                      key={i}
                      value={SingleProgram}
                      name="singleProgram"
                      program={program}
                      linkedSectors={linkedSectors}
                      updatingSectors={updatingSectors}
                      handleChange={this.handleChange}
                      handleUpdateSector={this.handleUpdateSector}
                      handleDeleteSector={this.handleDeleteSector}
                      handleClear={this.handleClear}
                      handleSearchChange={this.handleSearchChange}
                      currentData={this.state.currentData}
                      setCurrentData={this.setCurrentData}
                    />
                  ))}
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto mt-[5px] ml-[5px] ">          
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="sectorName"
                  value={sectorName}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!sectorName}
                  Loading={addingPrograms}
                  onClick={this.handleAddSector}
                  style={{ marginRight: "0.125em" }}
                >
                  Save</Button>
             
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel</Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    Loading={addingPrograms}
                    onClick={this.toggleInput}
                  >
                 
                  Add More
                  </Button>
                </div>
               
              </>
            )}
          </MainWrapper>
       
        </div>
        <div>Updated on {dayjs(this.props.programs && this.props.programs.length && this.props.programs[0].updationDate).format("ll")} by {this.props.programs && this.props.programs.length && this.props.programs[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ program }) => ({
  addingPrograms: program.addingPrograms,
  addingProgramsError: program.addingProgramsError,
  programs: program.programs,
  fetchingPrograms: program.fetchingPrograms,
  fetchingProgramsError: program.fetchingProgramsError,



});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getPrograms,
        // addPrograms,
 
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Program);
