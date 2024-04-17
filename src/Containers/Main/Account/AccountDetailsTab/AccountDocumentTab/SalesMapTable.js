import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
    getDistributorTable,
} from "../../AccountAction";

const SalesMapTable = (props) => {
   
    useEffect(() => {
        props.getDistributorTable(props.distributorId);
      }, []);
    
        const {
            documentTable,
            fetchingDocumentsByTable,
            fetchingDocumentsByTableError,

        } = props;
       

        return (
            <>
                <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">Lob</div>
                        <div className=" md:w-[5.1rem]">Potential</div>
                       
              
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {props.documentTable.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                            {` ${dayjs(item.creationDate).format("YYYY-MM-DD")}`}

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.documentTitle}
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesMapTable);
