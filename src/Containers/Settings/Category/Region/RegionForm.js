



// import React, { useState } from 'react';

// const YearHeaderInput = () => {
//   const headers = ['Sales', 'Fulfillment', 'Investment'];
//   const currencyOptions = ['USD', 'EUR', 'GBP'];
//   const years=[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

//   const [selectedYear, setSelectedYear] = useState(null);
//   const [sales, setSales] = useState({ amount: '', currency: currencyOptions[0] });
//   const [fulfillment, setFulfillment] = useState({ amount: '', currency: currencyOptions[0] });
//   const [investment, setInvestment] = useState({ amount: '', currency: currencyOptions[0] });

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value));
//   };

//   const handleSalesInputChange = (field, value) => {
//     setSales(prevState => ({ ...prevState, [field]: value }));
//   };

//   const handleFulfillmentInputChange = (field, value) => {
//     setFulfillment(prevState => ({ ...prevState, [field]: value }));
//   };

//   const handleInvestmentInputChange = (field, value) => {
//     setInvestment(prevState => ({ ...prevState, [field]: value }));
//   };

//   return (
//     <div>
//       <select onChange={handleYearChange}>
//         <option value="">Select Year</option>
//         {years.map((year) => (
//           <option key={year} value={year}>{year}</option>
//         ))}
//       </select>
//       {selectedYear && (
//         <div>
//           {/* <h2>{selectedYear}</h2> */}
//           {headers.map(header => (
//             <div key={header} style={{marginTop:"23px"}}>
//               <h3>{header}</h3>
//               <div>
//                 <label>Target</label>
//                 <input
//                 style={{marginLeft:"12px"}}
//                   type="number"
//                   value={header === 'Sales' ? sales.amount : header === 'Fulfillment' ? fulfillment.amount : investment.amount}
//                   onChange={(e) => header === 'Sales' ? handleSalesInputChange('amount', e.target.value) : header === 'Fulfillment' ? handleFulfillmentInputChange('amount', e.target.value) : handleInvestmentInputChange('amount', e.target.value)}
//                 />
//                 <select
//                 style={{marginLeft:"21px"}}
//                   value={header === 'Sales' ? sales.currency : header === 'Fulfillment' ? fulfillment.currency : investment.currency}
//                   onChange={(e) => header === 'Sales' ? handleSalesInputChange('currency', e.target.value) : header === 'Fulfillment' ? handleFulfillmentInputChange('currency', e.target.value) : handleInvestmentInputChange('currency', e.target.value)}
//                 >
//                   {currencyOptions.map((currencyOption) => (
//                     <option key={currencyOption} value={currencyOption}>{currencyOption}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default YearHeaderInput;


import React, { useState ,useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    
    addTarget,
  
  } from "./RegionAction";
import { getSaleCurrency } from "../../../Auth/AuthAction";

const YearHeaderInput = (props) => {
  const headers = ['Sales', 'Fulfillment', 'Investment'];
  const currencyOptions = props.saleCurrencies;
  const years=[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

  const [selectedYear, setSelectedYear] = useState(null);
  const [sales, setSales] = useState({ amount: '', currency: "" });
  const [fulfillment, setFulfillment] = useState({ amount: '' });
  const [investment, setInvestment] = useState({ amount: '', currency: "" });

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleSalesInputChange = (field, value) => {
    setSales(prevState => ({ ...prevState, [field]: value }));
  };

  const handleFulfillmentInputChange = (value) => {
    setFulfillment({ amount: value });
  };

  const handleInvestmentInputChange = (field, value) => {
    setInvestment(prevState => ({ ...prevState, [field]: value }));
  };
  useEffect(() => {
    
    props.getSaleCurrency()
}, [])

//   const handleSubmit = () => {
//     console.log("Changes made:");
//     console.log("Sales:", sales);
//     console.log("Fulfillment:", fulfillment);
//     console.log("Investment:", investment);
//   };

const handleSubmit = () => {
    let data={
        sales: sales.amount,
      salesCurrency: sales.currency,
      fulfilment: fulfillment.amount,
      investment: investment.amount,
      investmentCurrency: investment.currency,
      year: selectedYear,
      regionId:props.currentregionId
    }
    props.addTarget(data)
    console.log({
      sales: sales.amount,
      salesCurrency: sales.currency,
      fulfilment: fulfillment.amount,
      investment: investment.amount,
      investmentCurrency: investment.currency,
      year: selectedYear
    });
  };
  

  return (
    <div>
      <select onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      {selectedYear && (
        <div>
         
          {headers.map(header => (
            <div key={header} style={{marginTop:"23px"}}>
              <h3>{header}</h3>
              <div>
                <label>Target</label>
                <input
                 style={{marginLeft:"12px"}}
                  type="number"
                  value={header === 'Sales' ? sales.amount : header === 'Fulfillment' ? fulfillment.amount : investment.amount}
                  onChange={(e) => header === 'Sales' ? handleSalesInputChange('amount', e.target.value) : header === 'Fulfillment' ? handleFulfillmentInputChange(e.target.value) : handleInvestmentInputChange('amount', e.target.value)}
                />
                {header !== 'Fulfillment' && (
                  <select
                  style={{marginLeft:"21px"}}
                    value={header === 'Sales' ? sales.currency : investment.currency}
                    onChange={(e) => header === 'Sales' ? handleSalesInputChange('currency', e.target.value) : handleInvestmentInputChange('currency', e.target.value)}
                  >
                    {currencyOptions.map((currencyOption) => (
                      <option key={currencyOption.currency_name} value={currencyOption.currency_name}>{currencyOption.currency_name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
          <button style={{float:"right",backgroundColor:"tomato"}}onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};


const mapStateToProps = ({ homeStepper, auth, distributor }) => ({
    
    saleCurrencies: auth.saleCurrencies,
   
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
       
            getSaleCurrency,
            addTarget
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(YearHeaderInput);




