import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button,  message, Input } from "antd";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import {
    getStreams,
    addStreams,
//   removeSectors,
//   updateSectors,
//   searchSectorName,
} from "./StreamAction";

import SingleStream from "./SingleStream";

class Stream extends Component {
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
    this.props.getStreams();
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
  handleAddStream = () => {
    const { addStreams, streams } = this.props;
    const { levelName, editInd, addingStreams, isTextInputOpen } = this.state;
    let stream = { levelName, editInd };

    let exist =
    streams && streams.some((element) => element.levelName == levelName);

    if (exist) {
      message.error(
        "Can't create as another sector type exists with same name!"
      );
    } else {
        addStreams(stream, () => console.log("add level callback"));
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
    const { getStreams } = this.props;
    console.log();
    getStreams();
    // this.getLinkedSources();
  }
  render() {
    const {
        fetchingStreams,
        fetchingStreamsError,
        streams,
        addingStreams,
      updatingSectors,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      sectorName,
      singleSector,
      linkedSectors,
    } = this.state;
    if (fetchingStreams) return <p>Loading ...</p>;
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
                {streams.length &&
                  streams.map((stream, i) => (
                    <SingleStream
                      key={i}
                      value={SingleStream}
                      name="singleStream"
                      stream={stream}
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
              <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ml-[0.3125em] mt-[0.3125em] ">                                      
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
                  Loading={addingStreams}
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
                    Loading={addingStreams}
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
        <div>Updated on {dayjs(this.props.streams && this.props.streams.length && this.props.streams[0].updationDate).format("ll")} by {this.props.streams && this.props.streams.length && this.props.streams[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ stream }) => ({
  addingStreams: stream.addingStreams,
  addingStreamsError: stream.addingStreamsError,
  streams: stream.streams,

//   removingSectors: sector.removingSectors,
//   removingSectorsError: sector.removingSectorsError,
fetchingStreams: stream.fetchingStreams,
fetchingStreamsError: stream.fetchingStreamsError,

//   updatingSectors: sector.updatingSectors,
//   updatingSectorsError: sector.updatingSectorsError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getStreams,
        addStreams,
    //   removeSectors,
    //   updateSectors,
    //   searchSectorName,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Stream);
