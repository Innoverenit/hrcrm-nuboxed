import React,{ useEffect, useState, lazy }  from 'react'

import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {getManufactureDetailsData} from "../ProductionAction"

function ManufactureListData(props) {
  const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    useEffect(() => {
        // props.emptyManufactureLink()
       props.getManufactureDetailsData(props.row.supplierSuppliesUniqueNumberId,)
      }, []);
    //   const handleLoadMore = () => {
    //     setPage(page + 1);
    //     props.getManufactureDetailsData(props.row.suppliesId,props.row.productionProductId,page)
    // };
  return (
    <div className='flex justify-end sticky z-auto'>
    <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>
            <div className="md:w-[22.12rem]"><FormattedMessage id="app.suppliername" defaultMessage="Supplier Name" /></div>
            <div className="md:w-[15.5rem]"><FormattedMessage id="app.suppliercontactname" defaultMessage="Supplier Contact Name" /></div>
            <div className="md:w-[15.5rem]"><FormattedMessage id="app.ponumber" defaultMessage="Po Number" /></div>
            <div className="md:w-[15.5rem]"><FormattedMessage id="app.pocreation" defaultMessage="Po Creation" /></div>
            <div className="md:w-[15.5rem]"><FormattedMessage id="app.createdby" defaultMessage="Created By" /></div>
            {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.totalTimeTaken" defaultMessage="Time Taken" /></div> */}
            
            <div className=""></div>
            {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.tag" defaultMessage="Tag" /></div> */}
        </div>
      

       
                <div >
                    <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                        <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                            <div className="flex justify-between text-sm  font-semibold font-poppins">
                                {props.manufactureDetailsData.supplierName}
                            </div>
                        </div>

                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                            <div 
                            
                            className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                              
                                {/* {props.manufactureDetailsData.supplierName} */}
                            </div>
                        </div>

                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                            <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                            {props.manufactureDetailsData.newPoNumber}
                            </div>
                        </div>
                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                            <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                
                                {`${dayjs(props.manufactureDetailsData.poCreationDate).format("YYYY/MM/DD")}`}
                            </div>
                        </div>


                        <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                            <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                
                            {props.manufactureDetailsData.pouserName}
                            </div>
                        </div>

                       
                    
                    </div>
                  
                </div>
     
        
    </div>
</div>
  )
}



const mapStateToProps = ({
    auth,
    customer,
    sector,
    opportunity,
    employee,
    report,
    production
  }) => ({
 
    // viewType: customer.viewType,
   // manufactureLinkData:production.manufactureLinkData,
  
    //userId: auth.userDetails.userId,
    manufactureDetailsData:production.manufactureDetailsData,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getManufactureDetailsData
        // getManufactureLinkData
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ManufactureListData);

