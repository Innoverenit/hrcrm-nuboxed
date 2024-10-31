import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import {
    getDistributorTable,
} from "../../AccountAction";

class DistributorDocumentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translatedMenuItems: [],
            loading: true
        };
      }
    
      componentDidMount() {
        this.fetchMenuTranslations();
        this.props.getDistributorTable(this.props.distributorId);
      }
    

    
      fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
            
              
            "110", // "Name",
           "74", // "Date",
           "71", // "Type",
           "147", // "Description"
            
            
          ];
    
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations,loading: false });
        } catch (error) {
            this.setState({ loading: false });
          console.error('Error translating menu items:', error);
        }
      };
    render() {
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = this.props;
        const {loading,translatedMenuItems } = this.state;

        return (
            <>
                <div className=' flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className="text-[#00A2E8] text-base md:w-[7.4rem]">
                        <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]}</div>
                        <div className=" md:w-[5.1rem]">
                        <DateRangeIcon className='!text-icon  '  /> {translatedMenuItems[1]}</div>
                        <div className=" md:w-[8.8rem] ">
                        < MergeTypeIcon className='!text-icon text-[#c42847] '  />{translatedMenuItems[2]}</div>
                        <div className=" md:w-[8.8rem] ">
                            {translatedMenuItems[3]}</div>
                     


                    </div>
                    <div class="overflow-x-auto h-[73vh]">
                        {this.props.documentTable.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex w-3/4">
                                        <div className=" flex border-l-2 border-green-500 bg-[#eef2f9]  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                <div class=" text-xs  font-poppins text-center">
                                                          {item.documentTitle}
                                                  </div>
                                                </div>
                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8 md:w-[1.56rem] max-sm:w-full text-xs  ">

                                                      {` ${dayjs(item.creationDate).format("YYYY-MM-DD")}`}

                                            </div>

                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[1.56rem] max-sm:w-full text-xs  ">
                                            {item.documentTitle}
                            
                                               </div>

                                            <div className=" flex items-center justify-center ml-gap bg-[#eef2f9] h-8  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.Description}
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
     
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = ({ distributor }) => ({
    distributor: distributor.distributor,
    documentTable:distributor.documentTable,
    fetchingDocumentsByTable: distributor.fetchingDocumentsByTable,
    fetchingDocumentsByTableError:
        distributor.fetchingDocumentsByTableError,
    documentsByDistributorId: distributor.documentsByDistributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDistributorTable,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DistributorDocumentTable);