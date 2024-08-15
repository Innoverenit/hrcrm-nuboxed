import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
    getDistributorTable,
} from "../../AccountAction";

class DistributorDocumentTable extends Component {
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
            
              
             
            "Date","Name","Descroption"
            
            
          ];
    
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations });
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
    componentDidMount() {
        this.props.getDistributorTable(this.props.distributorId);
    }
    render() {
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = this.props;
       

        return (
            <>
                <div className=' flex  sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">{this.props.translatedMenuItems[0]}</div>
                        <div className=" md:w-[5.1rem]">{this.props.translatedMenuItems[1]}</div>
                        <div className=" md:w-[8.8rem] ">{this.props.translatedMenuItems[2]}</div>
              
                     


                    </div>
                    <div class="overflow-x-auto h-[69vh]">
                        {this.props.documentTable.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                                        <div class="flex w-3/4">
                                            <div className=" flex  md:w-[1.56rem] max-sm:w-full  ">


                                            {` ${dayjs(item.creationDate).format("YYYY-MM-DD")}`}

                                            </div>

                                            <div className=" flex   md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins text-center">
                                                    {item.documentTitle}
                                                </div>
                                            </div>

                                            <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
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