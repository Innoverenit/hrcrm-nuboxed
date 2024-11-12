import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { getShipperDocument } from "../../../ShipperAction";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactPageIcon from '@mui/icons-material/ContactPage'
import CategoryIcon from '@mui/icons-material/Category'
class ShipperDocumentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.props.getShipperDocument(this.props.shipperId);
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
       
       "74", // "Date",
       "110",// "Name",
       "147",// Description",
       "1207",  // "Uploaded By",
    
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
  render() {
    const {
      documentsByShipperId,
      fetchingDocumentsByShipperId,
      fetchingDocumentsByShipperIdError,
    } = this.props;
     if (fetchingDocumentsByShipperId) {
    return <BundleLoader />;
  }

    return (
      <>
        <div className="flex  sticky h-[80vh] z-auto">
          <div className="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className="flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs  sticky items-end z-10">
              <div className="md:w-[0.5rem]"></div>
              <div className="text-[#00A2E8]  text-xs w-[7.4rem] max-md:w-[7.4rem]">
              <DateRangeIcon className='!text-icon  '  />  {this.state.translatedMenuItems[0]}
              </div>
              <div className=" w-[5.1rem] max-md:w-[5.1rem]">
              <CategoryIcon className='!text-base  text-[#e4eb2f]'/> {this.state.translatedMenuItems[1]}
              </div>
              <div className="w-[8.8rem] max-md:w-[8.8rem]">
              <DescriptionIcon className='!text-icon  '  />  {this.state.translatedMenuItems[2]}
              </div>
              <div className="w-[8.8rem] max-md:w-[8.8rem]">
              <ContactPageIcon className='!text-icon text-[#ffb400]  '  />  {this.state.translatedMenuItems[3]}
              </div>
            </div>
            <div className="overflow-x-auto h-[72vh]">
              {documentsByShipperId.length > 0 ? (
                documentsByShipperId.map((item) => (
                  <div key={item.id}>
                    <div className="flex rounded mt-1 bg-white h-8 items-center  max-sm:h-[7rem] max-sm:flex-col">
                      <div className="flex w-3/4">
                        <div className="flex font-medium flex-col border-l-2 border-green-500 bg-[#eef2f9] max-md:w-[1.56rem] max-sm:w-full">
                          {dayjs(item.creationDate).format("ll")}
                        </div>
                        <div className="flex font-medium flex-col max-md:w-[7.4rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.contactDocumentName}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col max-md:w-[6.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex font-medium flex-col max-md:w-[6.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                          <div className="text-xs  font-poppins text-center">
                            {item.uploadedBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-5">
                  <NodataFoundPage />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  shipper: shipper.shipper,
  fetchingDocumentsByShipperId: shipper.fetchingDocumentsByShipperId,
  fetchingDocumentsByShipperIdError: shipper.fetchingDocumentsByShipperIdError,
  documentsByShipperId: shipper.documentsByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDocumentTable);



