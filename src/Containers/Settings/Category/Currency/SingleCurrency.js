import React, { Component,lazy } from "react";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import InvestorCurrencyToggle from "./InvestorCurrencyToggle";
import SalesCurrencyToggle from "./SalesCurrencyToggle";

  const CurrencyStatusToggle = lazy(() => import("./CurrencyStatusToggle"));



class SingleCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currency_name: "",
    
      
    };
  }
  render() {
    const {
        currency: { currency_name,editInd,mandatoryInd, currency_id },
      handleChange,
      name,
      value,
      documents,
    } = this.props;
    return (
      <div class=" w-full cursor-pointer">
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
                  <div className="flex justify-between mt-2 "
             
              >
                <div class=" flex flex-row justify-evenly  max-sm:flex-col">
                <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Sales
</div>




<div class=" font-normal text-sm text-cardBody font-poppins">
<div class=" w-2/6">
<SalesCurrencyToggle
editInd={editInd}
mandatoryInd={mandatoryInd}
currency_name={currency_name}
currency_id={currency_id}
/>  
</div>
</div>

</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Investor
</div>




<div class=" font-normal text-sm text-cardBody font-poppins">
<div class=" w-2/6">
<InvestorCurrencyToggle
editInd={editInd}
mandatoryInd={mandatoryInd}
currency_name={currency_name}
currency_id={currency_id}
/>  
</div>
</div>

</div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Currency

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
                    <div style={{width:"70%"}}>
  <div class=" basis-11/12 font-semibold">
    {currency_name}
  </div>
  </div>
                    </div>

                  </div>
                  {/* <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                     Dial Code

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
                    <div style={{width:"20%"}}>
<CountryName >
+{country_dial_code}
</CountryName>
</div>
                    </div>

                  </div> */}
                  {/* <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Currency
</div>


<div class=" font-normal text-sm text-cardBody font-poppins">
<div style={{width:"70%"}}>
<CountryName >
{country_currency_name}
</CountryName>
</div>
</div>

</div> */}
                 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                 Operations

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
                    <div class=" w-2/6">
    <CurrencyStatusToggle
  editInd={editInd}
  mandatoryInd={mandatoryInd}
      currency_name={currency_name}
      currency_id={currency_id}
    />  
    </div>
                    </div>

                  </div>
                  {/* <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Sales
</div>


<div class=" font-normal text-sm text-cardBody font-poppins">
<div class=" w-2/6">
<CountrySalesToggle
editInd={editInd}
salesInd={salesInd}
currency_name={currency_name}
country_id={country_id}
/>  
</div>
</div>

</div> */}

                
                
                
           
               

                </div>




              </div>
              </div>
            ) : (
              <div>
                <TextInput
                  name={name}
                  defaultValue={currency_name}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
              </div>
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default SingleCurrency;










