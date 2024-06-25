import React, { Component,lazy } from "react";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import CountryFlag1 from "./CountryFlag1";
const CountrySalesToggle = lazy(() => import("../Country/CountrySalesToggle"));
const CountryStatusToggle = lazy(() => import("../Country/CountryStatusToggle"));



class SingleCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
        country_name: "",
    
      
    };
  }
  render() {
    const {
      country: { country_name,editInd,country_dial_code,country_alpha2_code,country_flag,country_currency_name
,        mandatoryInd,salesInd, country_id },
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
                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm  font-medium font-poppins">

                      Name

                    </div>


                    <div class=" font-normal text-sm  font-poppins">
                    <div style={{width:"70%"}}>
  <div class=" basis-11/12 font-semibold">
  <CountryFlag1 countryCode={country_alpha2_code} />
  &nbsp;&nbsp;
    {country_name}
  </div>
  </div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm  font-medium font-poppins">

                     Dial Code

                    </div>


                    <div class=" font-normal text-sm  font-poppins">
                    <div class=" w-[20%]" >
                    <div class=" font-semibold" >
+{country_dial_code}
</div>
</div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Currency
</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-[70%]" >
<div class=" font-semibold" >
{country_currency_name}
</div>
</div>
</div>

</div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm  font-medium font-poppins">

                 Operations

                    </div>


                    <div class=" font-normal text-sm  font-poppins">
                    <div class=" w-2/6">
    <CountryStatusToggle
  editInd={editInd}
      mandatoryInd={mandatoryInd}
      country_name={country_name}
      country_id={country_id}
    />  
    </div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm  font-medium font-poppins">

Sales
</div>


<div class=" font-normal text-sm  font-poppins">
<div class=" w-2/6">
<CountrySalesToggle
editInd={editInd}
salesInd={salesInd}
country_name={country_name}
country_id={country_id}
/>  
</div>
</div>

</div>

                
                
                
           
               

                </div>




              </div>
              </div>
            ) : (
              <div>
                <TextInput
                  name={name}
                  defaultValue={country_name}
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

export default SingleCountry;










