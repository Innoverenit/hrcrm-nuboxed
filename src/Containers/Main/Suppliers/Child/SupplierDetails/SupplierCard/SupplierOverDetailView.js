import React, { Component } from "react";

class SupplierOverDetailView extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     translatedMenuItems: [],
  //   };
  // }

  // componentDidMount() {
  //   this.fetchMenuTranslations();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
  //     this.fetchMenuTranslations();
  //   }
  // }

  // fetchMenuTranslations = async () => {
  //   try {
  //     const itemsToTranslate = [
       
  //     "188",  // "City",
  //      "1261",   // "State",
  //     "1236",   // "Pincode",
  //     "1109",  // "Country",
  //     "186",   // "Street" 
  //           ];

  //     const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
  //     this.setState({ translatedMenuItems: translations });
  //   } catch (error) {
  //     console.error('Error translating menu items:', error);
  //   }
  // };
  render() {
    console.log(this.props.supplier);
    const {
        supplier: { addresses },
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
        <ShipperItemRow
            label={this.props.translatedMenuItems[2]}
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow 
           label={this.props.translatedMenuItems[3]}
          
        value={addresses && addresses[0].city} />
        <ShipperItemRow
   
         label={this.props.translatedMenuItems[4]}
          value={addresses && addresses[0].state} />
      
      </>
    );
  }
}
export default SupplierOverDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class="flex items-center flex-nowrap m-1 text-sm max-xl:text-[0.65rem]">
      <div class="text-[#444] font-semibold w-[40%]">
        {label}
      </div>
      <div
      class=" whitespace-nowrap overflow-hidden text-ellipsis w-[61%] max-xl:text-[0.65rem]">
        {value}
      </div>
    </div>
  );
};
