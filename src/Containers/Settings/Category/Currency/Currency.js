import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { getCurrencyList ,
  allCurrencyMandatory,
  getCurrencyCount,
  searchCurrencyName,
  ClearReducerDataOfCurrency
} from "../Currency/CurrencyAction";
import DownloadIcon from '@mui/icons-material/Download';
import { Button,Input,Tooltip } from "antd";
import { base_url } from "../../../../Config/Auth";
import { BundleLoader } from "../../../../Components/Placeholder";
const SingleCurrency = lazy(() =>
  import("./SingleCurrency")
);



class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      currency_name: "",
      type: "",
      singleCurrency: "",
      editInd: true,
      currentData: "",
      selected: localStorage.getItem('selected') === 'true',
    };
  
  }

  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchCurrencyName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getCurrencyList();
      this.props.ClearReducerDataOfCurrency();
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getCurrencyList();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSelectDeselect = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected }, () => {
      localStorage.setItem('selected', this.state.selected);
       this.props.allCurrencyMandatory(this.state.selected);
    });
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

  componentDidMount() {
    const { getCurrencyList,getCountryRecords,getCurrencyCount,orgId } = this.props;
    console.log();
    getCurrencyList(getCurrencyList);
    getCurrencyCount(orgId);
   
  }
  render() {
    console.log("selected",this.state.selected)
    const {
        fetchingCurrencyList,
        currencyList,
      translatedMenuItems,
    } = this.props;
    const { currency_name, singleCurrency } =
      this.state;
      if (this.props.fetchingCurrencyList) {
        return <BundleLoader/>;
      }

    // if (fetchingUnitsError) return <p>We are unable to load data</p>;
    return (
      <>
        <div class=" flex flex-nowrap" >
       
          <div class="basis-full overflow-auto text-white"
          >
       
           
        
         
 
            <div class="flex flex-col">
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
              <div class=" flex flex-row">
              <div class=" flex w-[18vw] " >
            <Input
         placeholder="Search by Currency"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            <div class=" flex">
              <Button 
  type="primary"
  // style={{backgroundColor:this.state.selected ?"red" :"green"}}
  onClick={this.handleSelectDeselect}
  >
          {this.state.selected ? "Clear All" : "Select All"}
        </Button>
        </div>
        <div class=" ml-4">
        <Tooltip placement="left" title="XL">

<a href={`${base_url}/excel/export/currency/All`}>
<DownloadIcon 
   className=" !text-base cursor-pointer text-[green]"/>
</a>

</Tooltip>
</div>
        </div>
        &nbsp;
                 {/* {country.length &&
                  country.map((country, i) => (
                    <SingleCountry
                      key={i}
                      value={singleCountry}
                      name="singleCountry"
                      country={country}
                      handleChange={this.handleChange}
                    />
                  ))}  */}

{
  currencyList.length ? (
  [...currencyList] 
    .sort((a, b) => a.currency_name.localeCompare(b.currency_name)) // Sort by the "name" property
    .map((singleCurrency, i) => (
      <SingleCurrency
        key={i}
        value={singleCurrency.name} 
        name="singleCurrency"
        currency={singleCurrency} 
        handleChange={this.handleChange}
      />
    ))
    ) : (
      <p>No Data Available</p>
    )}










              </MainWrapper>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ currency, auth }) => ({
    fetchingCurrencyList: currency.fetchingCurrencyList,
  currencyList: currency.currencyList,
  currencyCount:currency.currencyCount,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCurrencyList,
        getCurrencyCount,
        searchCurrencyName,
        ClearReducerDataOfCurrency,
        allCurrencyMandatory,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Currency);







