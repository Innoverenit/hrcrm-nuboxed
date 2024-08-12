import React,{ useEffect, useState, lazy }  from 'react'
import { connect } from "react-redux";
import dayjs from "dayjs";
//import {getReportsProductivityData} from "../../ReportAction"
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import ManufactureListData from "../Child/ManufactureListData"
import InfiniteScroll from "react-infinite-scroll-component";
import {getManufactureLinkData,
    // emptyManufactureLink
} from "../ProductionAction"

function ProductionManufactureCard(props) {
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [row, setRow] = useState({})
    const [itemHistory, setItemHistory] = useState(false);
    useEffect(() => {
        
       props.getManufactureLinkData(props.productionProductId,page)
    //    props.emptyManufactureLink()
      }, []);
      const handleLoadMore = () => {
        setPage(page + 1);
        props.getManufactureLinkData(props.productionProductId,page)
    };



    const handleItemHistory = () => {
        setItemHistory(!itemHistory)
    }

    
    const handleItemClick = (item) => {
        setRow(item)
    }
    console.log(props.manufactureLinkData)
  return (
    <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.partname" defaultMessage="Part Name" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.partno" defaultMessage="Part No" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.user" defaultMessage="User" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.totalTimeTaken" defaultMessage="Time Taken" /></div> */}
                    
                    <div className=""></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.tag" defaultMessage="Tag" /></div> */}
                </div>
                <InfiniteScroll
                        dataLength={props.manufactureLinkData.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        //loader={props.fetchingGrnListOfAPo ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >

                {props.manufactureLinkData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm  font-semibold font-poppins">
                                        {item.suppliesName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div 
                                      onClick={() => {
                                        handleItemHistory()
                                        handleItemClick(item)
                                    }}
                                    className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.partNumber}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.createdBy}
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                        
                                        {`${dayjs(item.creationDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div>

                               
                            
                            </div>
                            <div>
                                        {itemHistory && (row.suppliesId === item.suppliesId)
                                            && <ManufactureListData
                                            row={row} 
                                            //inventory={props.inventory}
                                            />}
                                    </div>
                        </div>
                    );
                })}
                 </InfiniteScroll>
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
    manufactureLinkData:production.manufactureLinkData,
  
    //userId: auth.userDetails.userId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getManufactureLinkData,
        // emptyManufactureLink
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ProductionManufactureCard);