import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { MainWrapper } from "../../../../Components/UI/Layout";
import { getCurrencyList ,
  allCurrencyMandatory,
  getCurrencyCount,
  searchCurrencyName,
  ClearReducerDataOfCurrency
} from "../Currency/CurrencyAction";
import { Button, Input, Tooltip } from "antd";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvestorCurrencyToggle from "./InvestorCurrencyToggle";
import SalesCurrencyToggle from "./SalesCurrencyToggle";
import CurrencyStatusToggle from "./CurrencyStatusToggle";


const Currency = ({ fetchingCurrencyList, currencyList, getCurrencyList, getCurrencyCount, searchCurrencyName, allCurrencyMandatory, ClearReducerDataOfCurrency }) => {
  const [selected, setSelected] = useState(localStorage.getItem('selected') === 'true');
  const [currentData, setCurrentData] = useState("");
  
  const handleClear = () => {
    setCurrentData("");
    getCurrencyList();
  };
  
  const handleSelectDeselect = () => {
    setSelected(!selected);
    localStorage.setItem('selected', !selected);
    allCurrencyMandatory(!selected);
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      searchCurrencyName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);
  
    if (e.target.value.trim() === "") {
      getCurrencyList();
      ClearReducerDataOfCurrency();
    }
  };

  useEffect(() => {
    getCurrencyList();
    getCurrencyCount();
  }, [getCurrencyList, getCurrencyCount]);

  if (fetchingCurrencyList) {
    return <BundleLoader />;
  }

  return (
    <>
   <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mr-2 mt-7px"  >
    <Input
            placeholder="Search by Currency"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChangeDes}
          />
          </div>
          <div className="flex w-[4rem]">
          <Button 
            type="primary"
            onClick={handleSelectDeselect}
          >
            {selected ? "Clear All" : "Select All"}
          </Button>
        </div>
        <div className="ml-4 w-[3rem]">
         
          <a href={`${base_url}/excel/export/currency/All`}>
          <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
            </a>
     
        </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[65vh] !mt-2" >
          {!fetchingCurrencyList && currencyList.length === 0 ? <NodataFoundPage /> : currencyList.slice().sort((a, b) => a.currency_name.localeCompare(b.currency_name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] " key={region.currency_id}>
            {/* Region name display or input field */}
            
            
            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

  Currency

</div>


<div class=" font-normal text-sm  font-poppins">
<div style={{width:"70%"}}>
<div class=" basis-11/12 font-semibold">
{region.currency_name}
</div>
</div>
</div>

</div>
 <div className="flex justify-between w-[48rem]">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Operations

</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-2/6">
<CurrencyStatusToggle
editInd={region.editInd}
mandatoryInd={region.mandatoryInd}
currency_name={region.currency_name}
currency_id={region.currency_id}
/>  
</div>
</div>

</div>
                  <div className=" w-[21rem]">
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Sales
</div>




<div class=" font-normal text-sm  font-poppins">
<div class=" w-2/6">
<SalesCurrencyToggle
editInd={region.editInd}
salesInd={region.salesInd}
currency_name={region.currency_name}
currency_id={region.currency_id}
/>  
</div>
</div>

</div>
                  </div>
                  <div className=" w-[21rem]">
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Investor
</div>




<div class=" font-normal text-sm  font-poppins">
<div class=" w-2/6">
<InvestorCurrencyToggle
editInd={region.editInd}
investorInd={region.investorInd}
currency_name={region.currency_name}
currency_id={region.currency_id}
/>  
</div>
</div>

</div>
                  </div>
                 
                </div>
            {/* Action buttons */}
 

        </div>
        ))}
        </MainWrapper>
            </div>
      
  {/* <div class=" font-bold">Updated on {dayjs(props.documents && props.documents.length && props.documents[0].updationDate).format('YYYY-MM-DD')} by {props.documents && props.documents.length && props.documents[0].name}</div> */}
      </div>
    </>
  );
};

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















// import React, { Component,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { MainWrapper } from "../../../../Components/UI/Layout";
// import { getCurrencyList ,
//   allCurrencyMandatory,
//   getCurrencyCount,
//   searchCurrencyName,
//   ClearReducerDataOfCurrency
// } from "../Currency/CurrencyAction";
// import DownloadIcon from '@mui/icons-material/Download';
// import { Button,Input,Tooltip } from "antd";
// import { base_url } from "../../../../Config/Auth";
// import { BundleLoader } from "../../../../Components/Placeholder";
// const SingleCurrency = lazy(() =>
//   import("./SingleCurrency")
// );



// class Currency extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedTasks: [],
//       isTextInputOpen: false,
//       addingUnit: false,
//       currency_name: "",
//       type: "",
//       singleCurrency: "",
//       editInd: true,
//       currentData: "",
//       selected: localStorage.getItem('selected') === 'true',
//     };
  
//   }

//   handleSearch = () => {
//     if (this.state.currentData.trim() !== "") {
//       // Perform the search
//       this.props.searchCurrencyName(this.state.currentData);
//     } else {
//       console.error("Input is empty. Please provide a value.");
//     }
//   };
//   handleChangeDes = (e) => {
//     this.setState({ currentData: e.target.value });
  
//     if (e.target.value.trim() === "") {
//       this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
//       this.props.getCurrencyList();
//       this.props.ClearReducerDataOfCurrency();
//     }
//   };
//   handleClear = () => {
//     this.setState({ currentData: "" });
//     this.props.getCurrencyList();
//   };
//   setCurrentData = (value) => {
//     this.setState({ currentData: value });
//   };

//   handleSelectDeselect = () => {
//     const { selected } = this.state;
//     this.setState({ selected: !selected }, () => {
//       localStorage.setItem('selected', this.state.selected);
//        this.props.allCurrencyMandatory(this.state.selected);
//     });
//   };

//   handleSearchChange = (e) => {
//     this.setState({ currentData: e.target.value });
//   };
//   toggleInput = () =>
//     this.setState((prevState) => ({
//       isTextInputOpen: !prevState.isTextInputOpen,
//     }));
//   handleChange = ({ target: { name, value } }) =>
//     this.setState({ [name]: value });

//   componentDidMount() {
//     const { getCurrencyList,getCountryRecords,getCurrencyCount,orgId } = this.props;
//     console.log();
//     getCurrencyList(getCurrencyList);
//     getCurrencyCount(orgId);
   
//   }
//   render() {
//     console.log("selected",this.state.selected)
//     const {
//         fetchingCurrencyList,
//         currencyList,
//       translatedMenuItems,
//     } = this.props;
//     const { currency_name, singleCurrency } =
//       this.state;
//       if (this.props.fetchingCurrencyList) {
//         return <BundleLoader/>;
//       }

//     // if (fetchingUnitsError) return <p>We are unable to load data</p>;
//     return (
//       <>
//         <div class=" flex flex-nowrap" >
       
//           <div class="basis-full overflow-auto text-white"
//           >
       
           
        
         
 
//             <div class="flex flex-col">
//               <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
//               <div class=" flex flex-row">
//               <div class=" flex w-[18vw] " >
//             <Input
//          placeholder="Search by Currency"
//         style={{width:"100%",marginLeft:"0.5rem"}}
//             // suffix={suffix}
//             onPressEnter={this.handleSearch}  
//             onChange={this.handleChangeDes}
//             // value={currentData}
//           />
//             </div>
//             <div class=" flex">
//               <Button 
//   type="primary"
//   // style={{backgroundColor:this.state.selected ?"red" :"green"}}
//   onClick={this.handleSelectDeselect}
//   >
//           {this.state.selected ? "Clear All" : "Select All"}
//         </Button>
//         </div>
//         <div class=" ml-4">
//         <Tooltip placement="left" title="XL">

// <a href={`${base_url}/excel/export/currency/All`}>
// <DownloadIcon 
//    className=" !text-base cursor-pointer text-[green]"/>
// </a>

// </Tooltip>
// </div>
//         </div>
//         &nbsp;
//                  {/* {country.length &&
//                   country.map((country, i) => (
//                     <SingleCountry
//                       key={i}
//                       value={singleCountry}
//                       name="singleCountry"
//                       country={country}
//                       handleChange={this.handleChange}
//                     />
//                   ))}  */}

// {
//   currencyList.length ? (
//   [...currencyList] 
//     .sort((a, b) => a.currency_name.localeCompare(b.currency_name)) // Sort by the "name" property
//     .map((singleCurrency, i) => (
//       <SingleCurrency
//         key={i}
//         value={singleCurrency.name} 
//         name="singleCurrency"
//         currency={singleCurrency} 
//         handleChange={this.handleChange}
//       />
//     ))
//     ) : (
//       <p>None Available</p>
//     )}










//               </MainWrapper>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ currency, auth }) => ({
//     fetchingCurrencyList: currency.fetchingCurrencyList,
//   currencyList: currency.currencyList,
//   currencyCount:currency.currencyCount,
//   orgId: auth.userDetails.organizationId,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getCurrencyList,
//         getCurrencyCount,
//         searchCurrencyName,
//         ClearReducerDataOfCurrency,
//         allCurrencyMandatory,
     
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Currency);







