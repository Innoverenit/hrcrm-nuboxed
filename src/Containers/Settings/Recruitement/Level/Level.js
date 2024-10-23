import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, message, Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
    getLevels,
  addLevels,
//   removeSectors,
//   updateSectors,
//   searchSectorName,
} from "./LevelAction";
import SingleLevel from "./SingleLevel";

class Level extends Component {
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
    this.props.getLevels();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value });
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddLevel = () => {
    const { addLevels, levels } = this.props;
    const { levelName, editInd, addingLevels, isTextInputOpen } = this.state;
    let level = { levelName, editInd };

    let exist =
    levels && levels.some((element) => element.levelName == levelName);

    if (exist) {
      message.error(
        "Can't create as another sector type exists with same name!"
      );
    } else {
        addLevels(level, () => console.log("add level callback"));
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
    const { getLevels } = this.props;
    console.log();
    getLevels();
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingLevels,
        fetchingLevelsError,
      levels,
      addingLevels,
      updatingSectors,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      sectorName,
      singleSector,
      linkedSectors,
    } = this.state;
    if (fetchingLevels) return <p>Loading ...</p>;
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
                // onSearch={(value) => {
                //   props.inputCandidateDataSearch(value);
                //   props.setCurrentData(value);

                // }}
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
                <FormattedMessage id="app.clear" defaultMessage="Clear" />
              </Button>
            </div>

            <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              {/* <Title style={{ padding: 8 }}>Types Of Documents</Title> */}
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {levels.length &&
                  levels.map((level, i) => (
                    <SingleLevel
                      key={i}
                      value={SingleLevel}
                      name="singleLevel"
                      level={level}
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
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto mt-1 ml-1 "           
              >
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
                  Loading={addingLevels}
                  onClick={this.handleAddSector}
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
                    Loading={addingLevels}
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
        <div>Updated on {dayjs(this.props.levels && this.props.levels.length && this.props.levels[0].updationDate).format("ll")} by {this.props.levels && this.props.levels.length && this.props.levels[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ level }) => ({
  addingLevels: level.addingLevels,
  addingLevelsError: level.addingLevelsError,
   levels: level.levels,

fetchingLevels: level.fetchingLevels,
fetchingLevelsError: level.fetchingLevelsError,


});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getLevels,
    addLevels,
  
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Level);
