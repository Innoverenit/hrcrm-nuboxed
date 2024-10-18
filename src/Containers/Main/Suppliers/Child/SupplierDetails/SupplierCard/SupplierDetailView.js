import React, { Component } from "react";


class SupplierDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
  //     this.fetchMenuTranslations();
  //   }
  // }
  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
        "875",
        "140"
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }

  render() {
    const {
      supplier: { phoneNo, emailId, shipByName },
      toggleViewType,
    } = this.props;
    const {loading,translatedMenuItems } = this.state;
    return (
      <>
        <ShipperItemRow
          label={translatedMenuItems[0]}
            // <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
          
          value={phoneNo} />
        <ShipperItemRow
          label={translatedMenuItems[1]}
            // <FormattedMessage id="app.email" defaultMessage="Email" />
          
          value={emailId} />

      </>
    );
  }
}
export default SupplierDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class="flex items-center justify-end flex-nowrap m-1 text-sm max-xl:text-[0.65rem]">
      <div class="text-[#444] font-semibold w-[40%]">
        {label}
      </div>
      <div
        class="flex justify-end  whitespace-nowrap overflow-hidden text-ellipsis w-[61%] max-xl:text-[0.65rem]">
        {value}
      </div>
    </div>
  );
};
