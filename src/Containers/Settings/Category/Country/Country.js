import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import SingleCountry from "./SingleCountry";
import { getCountry ,
  allCountryMandatory} from "../Country/CountryAction";
import { Button,  } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";


class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      country_name: "",
      type: "",
      singleCountry: "",
      editInd: true,
      currentData: "",
      selected: localStorage.getItem('selected') === 'true',
    };
  
  }
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getCountry();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSelectDeselect = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected }, () => {
      localStorage.setItem('selected', this.state.selected);
      this.props.allCountryMandatory(this.state.selected);
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
    const { getCountry,getCountryRecords } = this.props;
    console.log();
    getCountry(getCountry);
   
  }
  render() {
    console.log("selected",this.state.selected)
    const {
      fetchingCountry,
      country,
      translatedMenuItems,
    } = this.props;
    const { country_name, singleCountry } =
      this.state;
      if (this.props.fetchingCountry) {
        return <BundleLoader/>;
      }

    // if (fetchingUnitsError) return <p>We are unable to load data</p>;
    return (
      <>
        <div class=" flex flex-nowrap" >
       
          <div class="basis-full overflow-auto text-white"
          >
             {/* <div style={ {width: "18vw",display:"flex"}} >
          <Input
            placeholder={translatedMenuItems[12]}
          
       style={{width:"100%",marginLeft:"0.5rem"}}
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           
           <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.props.searchCountryName(this.state.currentData);

          }}
        >
            {translatedMenuItems[13]}
       
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
            {translatedMenuItems[14]}
      
      
        </Button>
        </div> */}
 
            <div class="flex flex-col">
              <MainWrapper style={{ height: "38em", marginTop: "0.625em" }}>
              <Button 
  type="primary"
  // style={{backgroundColor:this.state.selected ?"red" :"green"}}
  onClick={this.handleSelectDeselect}
  >
          {this.state.selected ? "Clear All" : "Select All"}
        </Button>
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
  country.length &&
  [...country] 
    .sort((a, b) => a.country_name.localeCompare(b.country_name)) // Sort by the "name" property
    .map((singleCountry, i) => (
      <SingleCountry
        key={i}
        value={singleCountry.name} 
        name="singleCountry"
        country={singleCountry} 
        handleChange={this.handleChange}
      />
    ))
}










              </MainWrapper>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ countrys, auth }) => ({
  fetchingCountry: countrys.fetchingCountry,
  country: countrys.country,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCountry,
  
        allCountryMandatory,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Country);







// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import moment from "moment";
// import { MainWrapper } from "../../../../Components/UI/Layout";
// import { getCountry,allCountryMandatory } from "../Country/CountryAction";
// import SingleCountry from "./SingleCountry";
// import { Button } from "antd";

// class Country extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       linkedTasks: [],
//       isTextInputOpen: false,
//       addingUnit: false,
//       countryName: "",
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
//     const { getCountry } = this.props;
//     console.log();
//     getCountry(getCountry);
//   }
//   render() {
//     const {
//       fetchingCountry,
//       country,
//     } = this.props;
//     const { countryName, singleCountry } =
//       this.state;
//     if (fetchingCountry) return <p>Loading ...</p>;
//     // if (fetchingUnitsError) return <p>We are unable to load data</p>;
//     return (
//       <>
//         <div class=" flex flex-nowrap" >
//           <div class="basis-full overflow-auto text-white"
//           >
//             <div class="flex flex-col">
//               <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
//               <Button 
//   type="primary"
//   // style={{backgroundColor:this.state.selected ?"red" :"green"}}
//   onClick={this.handleSelectDeselect}
//   >
//           {this.state.selected ? "Clear All" : "Select All"}
//         </Button>
//         &nbsp;
//                 {country.length &&
//                   country.map((country, i) => (
//                     <SingleCountry
//                       key={i}
//                       value={singleCountry}
//                       name="singleCountry"
//                       country={country}
//                       handleChange={this.handleChange}
//                     />
//                   ))}
//               </MainWrapper>
//             </div>
//           </div>
//         </div>
//         <h4>Updated on {moment(this.props.country && this.props.country.length && this.props.country[0].updationDate).format("ll")} by {this.props.country && this.props.country.length && this.props.country[0].name}</h4>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ countrys, auth }) => ({
//   fetchingCountry: countrys.fetchingCountry,
//   country: countrys.country,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getCountry,
//       allCountryMandatory,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(Country);
