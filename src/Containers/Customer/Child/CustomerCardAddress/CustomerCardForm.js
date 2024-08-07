import React, { Component } from "react";
import { SubTitle } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class CustomerCardForm extends Component {
  render() {
    console.log(this.props.customer);
    const {
      customer: { url, phoneNumber, vatNo,countryDialCode,sector, businessRegistration, address },
    } = this.props;

  
    return (
      <>
        <CustomerItemRow // label="URL"
          label={<FormattedMessage id="app.url" defaultMessage="URL" />}
          value={url}
        />
    
        <CustomerItemRow 
        
        
        label="Phone #" value={`${countryDialCode || ""} ${phoneNumber || ""}`}/>
        
        
        

        <CustomerItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Registration #"
            />
          }
          value={vatNo}
        />

        <CustomerItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.registrationNumber"
              defaultMessage="Tax Registration #"
            />
          }
          value={businessRegistration}
        />

<CustomerItemRow //label="Phone Number"
          label={
            <FormattedMessage
            id="app.sector"
            defaultMessage="Sector"
          />
          }
          value={sector}
        />
      </>
    );
  }
}
export default CustomerCardForm;

const CustomerItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto m-[0.4rem] "> 
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle
      >
        {value}
      </SubTitle>
    </div>
  );
};
