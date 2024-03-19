



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
import axios from 'axios';
import {
    
    addTarget,
    getTarget,
  
  } from "./RegionAction";
  import { Tabs,Select } from 'antd';
import { getSaleCurrency } from "../../../Auth/AuthAction";


const { TabPane } = Tabs;
const { Option } = Select; 

const YearHeaderInput = (props) => {
  // const [activeTab, setActiveTab] = useState("");
  const tab=[
    "Q1","Q2","Q3","Q4"
  ]
  const headers = ['Sales', 'Fulfillment', 'Investment'];
  const currencyOptions = props.saleCurrencies;
  const handleTabClick = async(key) => {
    props.setActiveTab(key);
    try {
      const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/regions/target/${props.currentregionId}/${props.selectedYear}/${key}`, {
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      });
      const data = response.data;
      console.log(data);
  
      if (data !== null && data !== undefined) { // Change condition to handle 0 values
       
  
        props.setSales({ amount: data.sales !== null ? data.sales : null, currency: data.salesCurrency || null });
        props.setFulfillment({ amount: data.fulfilment !== null ? data.fulfilment : null });
        props.setInvestment({ amount: data.investment !== null ? data.investment : null, currency: data.investmentCurrency || null });
      } else {
        // If there's no data for the selected year, reset all fields to null
        props.setSales({ amount: null, currency: null });
        props.setFulfillment({ amount: null });
        props.setInvestment({ amount: null, currency: null });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };
 

  const handleSalesInputChange = (field, value) => {
    props.setSales(prevState => ({ ...prevState, [field]: value }));
  };

  const handleFulfillmentInputChange = (field,value) => {
    props.setFulfillment({ amount: value });
   
  };

  const handleInvestmentInputChange = (field, value) => {
    props.setInvestment(prevState => ({ ...prevState, [field]: value }));
  };
  useEffect(() => {
    
    props.getSaleCurrency()
    // props.getTarget(props.currentregionId,"2023")
}, [])

//   const handleSubmit = () => {
//     console.log("Changes made:");
//     console.log("Sales:", sales);
//     console.log("Fulfillment:", fulfillment);
//     console.log("Investment:", investment);
//   };


const handleYearChange = async (e) => {
  const year = parseInt(e.target.value);
  props.setSelectedYear(year);

 
};

console.log(props.sales)
console.log(props.investment.currency)
const handleSubmit = () => {
    let data={
        sales: props.sales.amount,
      salesCurrency: props.sales.currency,
      fulfilment: props.fulfillment.amount,
      investment: props.investment.amount,
      investmentCurrency: props.investment.currency,
      year: props.selectedYear,
      regionsId:props.currentregionId,
      quarter:props.activeTab
    }
    props.addTarget(data)
    // console.log({
    //   sales: sales.amount,
    //   salesCurrency: sales.currency,
    //   fulfilment: fulfillment.amount,
    //   investment: investment.amount,
    //   investmentCurrency: investment.currency,
    //   year: selectedYear
    // });
  };
  

  return (
    <div>
      <select 
      ref={props.yearSelectRef}
      onChange={handleYearChange}>
        <option value="">Select Year</option>
        {props.years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      {props.selectedYear && (
        <div>
           <Tabs type="card" 
           activeKey={props.activeTab} 
          onChange={handleTabClick}
           >
      {tab.map((tabs) => (
        <TabPane key={tabs} tab={tabs}>
       
       
       
        </TabPane>
      ))}
    </Tabs>
    {props.activeTab&&(
         <div>
          {headers.map(header => (
            <div key={header} style={{marginTop:"23px"}}>
              <h3>{header}</h3>
              <div>
                <label>Target</label>
                <input
                 style={{marginLeft:"12px"}}
                  type="number"
                  value={header === 'Sales' ? props.sales.amount : header === 'Fulfillment' ? props.fulfillment.amount : props.investment.amount}
                  onChange={(e) => header === 'Sales' ? handleSalesInputChange('amount', e.target.value) : header === 'Fulfillment' ? handleFulfillmentInputChange(e.target.value) : handleInvestmentInputChange('amount', e.target.value)}
                />
                {header !== 'Fulfillment' && (
                  <select
                  style={{marginLeft:"21px"}}
                  value={header === 'Sales' ? props.sales.currency : props.investment.currency}
                    //value={header === 'Sales' ? props.sales.currency : props.investment.currency}
                    onChange={(e) => header === 'Sales' ? handleSalesInputChange('currency', e.target.value) : handleInvestmentInputChange('currency', e.target.value)}
                  >
                    <option value="">Select</option>
                    {currencyOptions.map((currencyOption) => (
                      <option 
                       key={currencyOption.currency_id} 
                      value={currencyOption.currency_id}>{currencyOption.currency_name}</option>
                    ))}
                  </select>
              //     <Select
              //     style={{ marginLeft: "21px" }}
              //     value={headers === 'Sales' ? props.sales.currency : props.investment.currency}
              //     onChange={(value) => headers === 'Sales' ? handleSalesInputChange('currency', value) : handleInvestmentInputChange( value)}
              // >
              //     {currencyOptions.map((currencyOption) => (
              //         <Option key={currencyOption.currency_id} value={currencyOption.currency_id}>{currencyOption.currency_name}</Option>
              //     ))}
              // </Select>
                )}
              </div>
            </div>
          ))}
          <button style={{float:"right",backgroundColor:"tomato"}}onClick={handleSubmit}>Submit</button>
          </div>
          )}
        </div>
      )}
    </div>
  );
};


const mapStateToProps = ({ homeStepper, auth, distributor }) => ({
    
    saleCurrencies: auth.saleCurrencies,
    token: auth.token 
   
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
       
            getSaleCurrency,
            addTarget,
            getTarget
           
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(YearHeaderInput);




