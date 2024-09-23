import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { MainWrapper } from "../../../../Components/UI/Layout";
import { getCountry, getCountryCount, searchCountryName, allCountryMandatory, ClearReducerDataOfCountry } from "../Country/CountryAction";
import { Button, Input, Tooltip } from "antd";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import CountryFlag1 from "./CountryFlag1";
const CountrySalesToggle = lazy(() => import("../Country/CountrySalesToggle"));
const CountryStatusToggle = lazy(() => import("../Country/CountryStatusToggle"));


const Country = ({ fetchingCountry, country, getCountry, getCountryCount, searchCountryName, allCountryMandatory, ClearReducerDataOfCountry }) => {
  const [selected, setSelected] = useState(localStorage.getItem('selected') === 'true');
  const [currentData, setCurrentData] = useState("");
  
  const handleClear = () => {
    setCurrentData("");
    getCountry();
  };
  
  const handleSelectDeselect = () => {
    setSelected(!selected);
    localStorage.setItem('selected', !selected);
    allCountryMandatory(!selected);
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      searchCountryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);
  
    if (e.target.value.trim() === "") {
      getCountry();
      ClearReducerDataOfCountry();
    }
  };

  useEffect(() => {
    getCountry();
    getCountryCount();
  }, [getCountry, getCountryCount]);

  if (fetchingCountry) {
    return <BundleLoader />;
  }

  return (
    <>
   <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-7px mr-2"  >
    <Input
            placeholder="Search by country"
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
         
            <a href={`${base_url}/excel/export/country/All`}>
            <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
            </a>
        
        </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!fetchingCountry && country.length === 0 ? <NodataFoundPage /> : country.slice().sort((a, b) => a.country_name.localeCompare(b.country_name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.country_id}>
            {/* Region name display or input field */}
            
            
            <div className=" flex font-medium flex-col md:w-[20rem] max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm  font-medium font-poppins">

                      Name

                    </div>


                    <div class=" font-normal text-sm  font-poppins">
                    <div class=" w-[20rem]" >
  <div class=" basis-11/12 font-semibold">
  <CountryFlag1 countryCode={region.country_alpha2_code} />
  &nbsp;&nbsp;
    {region.country_name}
  </div>
  </div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-[12rem] max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

 Dial Code

</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-[7rem]" >
<div class=" font-semibold" >
+{region.country_dial_code}
</div>
</div>
</div>

</div>
<div className=" flex font-medium flex-col md:w-[15rem] max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Currency
</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-[15rem]" >
<div class=" font-semibold" >
{region.country_currency_name}
</div>
</div>
</div>

</div>
 <div className="flex justify-between w-[34rem]">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Operations

</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-2/6">
<CountryStatusToggle
editInd={region.editInd}
mandatoryInd={region.mandatoryInd}
country_name={region.country_name}
country_id={region.country_id}
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
<CountrySalesToggle
editInd={region.editInd}
salesInd={region.salesInd}
country_name={region.country_name}
country_id={region.country_id}
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

const mapStateToProps = ({ countrys, auth }) => ({
  fetchingCountry: countrys.fetchingCountry,
  country: countrys.country,
  countryCount: countrys.countryCount,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCountry,
  getCountryCount,
  searchCountryName,
  ClearReducerDataOfCountry,
  allCountryMandatory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Country);


















// import React, { Component,lazy } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { MainWrapper } from "../../../../Components/UI/Layout";
// import { getCountry,
//   getCountryCount,
//   searchCountryName,
//   allCountryMandatory,ClearReducerDataOfCountry} from "../Country/CountryAction";
// import { Button,Input,Tooltip } from "antd";
// import { base_url } from "../../../../Config/Auth";
// import DownloadIcon from '@mui/icons-material/Download';
// import { BundleLoader } from "../../../../Components/Placeholder";
// const SingleCountry = lazy(() =>
//   import("./SingleCountry")
// );



// class Country extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedTasks: [],
//       isTextInputOpen: false,
//       addingUnit: false,
//       country_name: "",
//       type: "",
//       singleCountry: "",
//       editInd: true,
//       currentData: "",
//       selected: localStorage.getItem('selected') === 'true',
//     };
  
//   }
//   handleClear = () => {
//     this.setState({ currentData: "" });
//     this.props.getCountry();
//   };
//   setCurrentData = (value) => {
//     this.setState({ currentData: value });
//   };

//   handleSelectDeselect = () => {
//     const { selected } = this.state;
//     this.setState({ selected: !selected }, () => {
//       localStorage.setItem('selected', this.state.selected);
//       this.props.allCountryMandatory(this.state.selected);
//     });
//   };

//     handleSearch = () => {
//     if (this.state.currentData.trim() !== "") {
//       // Perform the search
//       this.props.searchCountryName(this.state.currentData);
//     } else {
//       console.error("Input is empty. Please provide a value.");
//     }
//   };
//   handleChangeDes = (e) => {
//     this.setState({ currentData: e.target.value });
  
//     if (e.target.value.trim() === "") {
//       this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
//       this.props.getCountry();
//       this.props.ClearReducerDataOfCountry();
//     }
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
//     const { getCountry,getCountryRecords,
//       getCountryCount } = this.props;
//     console.log();
//     getCountry(getCountry);
//     getCountryCount(getCountryCount);
   
//   }
//   render() {
//     console.log("selected",this.state.selected)
//     const {
//       fetchingCountry,
//       country,
//       translatedMenuItems,
//     } = this.props;
//     const { country_name, singleCountry } =
//       this.state;
//       if (this.props.fetchingCountry) {
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
//           <div class=" flex flex-row">
//               <div class=" flex w-[18vw] " >
//             <Input
//          placeholder="Search by country"
//         style={{width:"100%",marginLeft:"0.5rem"}}
//             // suffix={suffix}
//             onPressEnter={this.handleSearch}  
//             onChange={this.handleChangeDes}
//             // value={currentData}
//           />
//             </div>
//             <div class=" flex">
//             <Button 
//   type="primary"
//   // style={{backgroundColor:this.state.selected ?"red" :"green"}}
//   onClick={this.handleSelectDeselect}
//   >
//           {this.state.selected ? "Clear All" : "Select All"}
//         </Button>
//         </div>
//         <div class=" ml-4">
//         <Tooltip placement="left" title="XL">

// <a href={`${base_url}/excel/export/country/All`}>
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
//   country.length ? (
//   [...country] 
//     .sort((a, b) => a.country_name.localeCompare(b.country_name)) // Sort by the "name" property
//     .map((singleCountry, i) => (
//       <SingleCountry
//         key={i}
//         value={singleCountry.name} 
//         name="singleCountry"
//         country={singleCountry} 
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

// const mapStateToProps = ({ countrys, auth }) => ({
//   fetchingCountry: countrys.fetchingCountry,
//   country: countrys.country,
//   countryCount:countrys.countryCount,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCountry,
//       getCountryCount,
//       searchCountryName,
//       ClearReducerDataOfCountry,
//         allCountryMandatory,
     
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Country);



