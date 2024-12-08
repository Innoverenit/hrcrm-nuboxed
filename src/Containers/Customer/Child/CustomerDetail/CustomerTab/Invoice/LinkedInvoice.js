import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
class LinkedInvoice extends Component {
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
        
       "74", // "Date",//0
       "110", // "Name",//1
        "147",// "Description",//2
       "1207", // "Uploaded By",//3
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  
  render() {
    return (
      <>
          <div className=" flex justify-between font-bold font-poppins !text-lm  w-[100%]  p-1   sticky items-end z-10">
          
          <div className="w-[16.1rem] text-[#00A2E8] text-sm truncate md:w-[16.1rem]">
          <DateRangeIcon className='!text-icon  '  /> {this.state.translatedMenuItems[0]}</div>
          {/* Date */}
                  <div className="w-[16.2rem] truncate  md:w-[16.2rem]">
                  <ArticleIcon className='!text-icon text-[#a379c9] '  /> {this.state.translatedMenuItems[1]}</div>
                  {/* Name */}
          <div className="w-[13.13rem] truncate  md:w-[13.13rem]">
          <DescriptionIcon className='!text-icon text-[#9ad5ca] '  />  {this.state.translatedMenuItems[2]}</div>
         
          <div className="w-[15.1rem] truncate  md:w-[15.1rem]">
          <AccountCircleIcon className="!text-icon  text-[#f28482]"/>   {this.state.translatedMenuItems[3]}</div>

          
        </div>
      </>
    )
    // const columns = [
    //   {
    //     title: this.state.translatedMenuItems[0], // Directly using the translated menu item
    //     dataIndex: "creationDate",
    //   },    
    //   {
   
    //     title: this.state.translatedMenuItems[1],
    //     dataIndex: "documentTitle",
    //   },
    //   {
    //     title: (
    //       this.state.translatedMenuItems[2]
    //     ),
    //     dataIndex: "documentDescription",
    //     width: "20%", 
    //   },
    //   {
    //     title: (
    //       this.state.translatedMenuItems[3]
    //     ),
    //     dataIndex: "uploadedBy",
    //   },
    
    //   {
    //     title: "",
    //     width: "5%",
    //     render: (name, item, i) => {
    //       return (
            
    //         <a
    //           href={`${base_url}/document/${item.documentId}`}
    //         >
    //           <DownloadIcon className="cursor-pointer text-[1.35rem]"
    //             type="download"
             
    //           />
    //         </a>
    //       );
    //     },
    //   },
    //   {
    //     title: "",
    //    dataIndex: "documentId",
    //     width: "5%",
    //     render: (name, item, i) => {
    //       return (
    //         <StyledPopconfirm
    //           title="Do you want to delete?"
    //           />}
            
    //         >
    //          <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
    //         </StyledPopconfirm>
    //       );
    //     },
    //   },
    // ];

    // if (fetchingDocumentsByCustomerIdError) {
    //   return <APIFailed />;
    // }
    // if (fetchingCustomerOpportunity) return <BundleLoader/>;
    // const tab = document.querySelector(".ant-layout-sider-children");
    // const tableHeight = tab && tab.offsetHeight * 0.75;
    // return (
    //   <>
    //     {true && (
    //       <StyledTable
    //         pagination={false}
    //         scroll={{ y: tableHeight }}
    //         rowKey="CustomerId"
    //         // columns={columns}
    //       />
    //     )}
    //   </>
    // );
  }
}

const mapStateToProps = ({ customer }) => ({
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedInvoice);

