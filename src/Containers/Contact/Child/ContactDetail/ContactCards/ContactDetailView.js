import React, { Component } from "react";

class ContactDetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          "Company",//0
          "Department",//1
          "Designation",//2
          "Email",//3
          "Mobile",//4
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const {
      contact: {
        tagWithCompany,
        designation,
        department,
        mobileNumber,
        emailId,
      },
    } = this.props;
    return (
      <>
        <ContactItemRow //label="Company" 
        label= {this.state.translatedMenuItems[0]}
          value={tagWithCompany} />
        <ContactItemRow //label="Department" 
          label= {this.state.translatedMenuItems[1]}
          value={department} />
        <ContactItemRow //label="Designation" 
          label= {this.state.translatedMenuItems[2]}
          value={designation} />
        <ContactItemRow //label="Email" 
          label=  {this.state.translatedMenuItems[3]}
          value={emailId} />
        <ContactItemRow //label="Mobile #" 
          label=     {this.state.translatedMenuItems[4]}
          value={mobileNumber} />
      </>
    );
  }
}
export default ContactDetailView;

const ContactItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
    <div class=" text-[#444] font-semibold" >{label}</div>
    <div className="overflow-hidden truncate ml-8">
      
      {/* {elipsize(value, 27)} */}
      {value}
   
  </div>
   </div>
  );
};
