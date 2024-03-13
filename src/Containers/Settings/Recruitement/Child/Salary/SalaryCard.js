import React, { Component ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import {handleSalaryModal} from "../../../SettingsAction"
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { TextInput, } from "../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../Components/Placeholder";
import AddSalaryModal from "./AddSalaryModal";
// import {
//   getSectors,
//   addSectors,
//   removeSectors,
//   updateSectors,
//   searchSectorName,
//   ClearReducerDataOfSector
// } from "./SectorsAction";
// const SingleSectors = lazy(() =>
//   import("./SingleSector")
// );

class SalaryCard extends Component {
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
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
    //   this.props.getSectors();
    //   this.props.ClearReducerDataOfSector();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
    //   this.props.searchSectorName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    // this.props.getSectors();
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
    handleAddSector = () => {
      const { addSectors, sectors } = this.props;
      const { sectorName, editInd, addingSectors, isTextInputOpen } = this.state;
      let sector = { sectorName, editInd };
    
      let exist =
        sectors && sectors.some((element) => element.sectorName === sectorName);
    
      // if (exist) {
      //   message.error(
      //     "Can't create as another sector type exists with the same name!"
      //   );
      // } else {
        // addSectors(sector, () => console.log("add sector callback"));
        this.setState({
          sectorName: "",
          singleSector: "",
          isTextInputOpen: false,
          editInd: true,
        });
      // }
    };
    
  handleDeleteSector = (sectorId = { sectorId }) => {
    // this.props.removeSectors(sectorId);
    this.setState({ sectorName: "", singleSector: "" });
  };
  handleUpdateSector = (sectorName, sectorId, editInd, cb) => {
    // this.props.updateSectors(sectorName, sectorId, editInd, cb);
    this.setState({ sectorName: "", singleSector: "", editInd: true });
  };

  componentDidMount() {
    // const { getSectors } = this.props;
    console.log();
    // getSectors();
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingSectors,
      fetchingSectorsError,
      sectors,
      addingSectors,
      updatingSectors,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      sectorName,
      singleSector,
      linkedSectors,
    } = this.state;
    if (fetchingSectors) return <BundleLoader/>;
    //if (fetchingSectorsError) return <p>We are unable to load data</p>;
    return (
      <>
          <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
             <div class=" flex flex-row justify-between">
           <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
          
              <>
                
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    
                    // Loading={addingSectors}
                    onClick={() => {
                       
                        this.props.handleSalaryModal(true);
                       

                      }}
                    // onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
               
              </>

             </div>
            <div class=" flex flex-col" >
             
              {/* <MainWrapper className="!h-[69vh] !mt-2" >
              {sectors.length ? (
  sectors
    .slice() 
    .sort((a, b) => a.sectorName.localeCompare(b.sectorName)) 
    .map((sector, i) => (
                    <SingleSectors
                      key={i}
                      value={singleSector}
                      name="singleSector"
                      sector={sector}
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
                  ))
                  ) : (
                    <p>No Data Available</p>
                    // Swal.fire({
                    //   icon: 'info',
                    //   title:"No data available",
                    //   showConfirmButton: false,
                    //   timer: 1500
                    // })
              
                  )}
              </MainWrapper> */}
            </div>
           
          </MainWrapper>
   
           
        </div>
        <AddSalaryModal
    
    addSalaryModal={this.props.addSalaryModal}
        handleSalaryModal={this.props.handleSalaryModal}
      
      />
        {/* <div class=" font-bold">Updated on {dayjs(this.props.sectors && this.props.sectors.length && this.props.sectors[0].updationDate).format('YYYY-MM-DD')} by {this.props.sectors && this.props.sectors.length && this.props.sectors[0].name}</div> */}
      </>
    );
  }
}

const mapStateToProps = ({ sector,settings }) => ({
  addingSectors: sector.addingSectors,
  addingSectorsError: sector.addingSectorsError,
  sectors: sector.sectors,
  addSalaryModal:settings.addSalaryModal,

  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingSectors: sector.fetchingSectors,
  fetchingSectorsError: sector.fetchingSectorsError,

  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleSalaryModal
    //   getSectors,
    //   addSectors,
    //   removeSectors,
    //   updateSectors,
    //   searchSectorName,
    //   ClearReducerDataOfSector
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SalaryCard);
