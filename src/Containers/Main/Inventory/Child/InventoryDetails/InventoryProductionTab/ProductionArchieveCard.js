import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, Tooltip } from "antd";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { addCreateManufactureCardModal } from "../../../../../Production/ProductionAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { getArchieveProductionbyLocId } from "../../../InventoryAction";
import AddCreateManufactureModal from "../../../../../Production/Child/AddCreateManufactureModal";

function ProductionArchieveCard(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getArchieveProductionbyLocId(props.locationId, props.userId, page);
        setPage(page + 1);
    }, []);
    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };
    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }

    const handleLoadMore = () => {
        const proPag = props.archieveInProduction && props.archieveInProduction.length && props.archieveInProduction[0].pageCount
        setTimeout(() => {
            if (props.archieveInProduction) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getArchieveProductionbyLocId(props.locationId, props.userId, page);
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    const {
        fetchingArchieveProductionLocId,
        archieveInProduction,

    } = props;
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                    <div className="w-[11.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Manufacture ID</div>
                        <div className=" w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
                        <div className=" w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Category</div>
                        <div className=" w-[21.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Attribute</div>  
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={archieveInProduction.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={fetchingArchieveProductionLocId ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {archieveInProduction.map((item, index) => {
                            return (
                                <div>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 ">

                                    <div className=" flex font-medium   w-[11.12rem] max-sm:flex-row  max-sm:justify-between  ">

<div 
  onClick={() => {
    props.addCreateManufactureCardModal(true);
    handleParticularRowData(item)
    //handleRowData(item);
    //handleProductivityClick(date.isoDate,user.userId)
               
             
             
   }}
class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
    {item.manufactureId}
</div>

</div>

                                        <div className=" flex font-medium   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                {item.productName}
                                            </div>

                                        </div>



                                        <div className=" flex font-medium  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                                            {item.categoryName}  {item.subCategoryName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium  md:w-[16.2rem] max-sm:flex-row w-full max-sm:justify-between ">


                                            <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                            {item.attributeName}  {item.subAttributeName}
                                            </div>
                                        </div>

                                        {/* <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">

                                            <div class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.attributeName}
                                            </div>
                                        </div> */}
                                        <div className=" flex font-medium  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                <Tooltip title="Edit">
                                                    <BorderColorIcon
                                                        className="!text-icon cursor-pointer text-[tomato]"
                                                    // onClick={() => {
                                                    //     props.setEditProducts(item);
                                                    //     handleUpdateProductModal(true);
                                                    // }}
                                                    />
                                                </Tooltip>
                                            </div>


                                        </div>
                                        <div className=" flex font-medium   md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                                <Tooltip title="Print">

                                                    <ReactToPrint
                                                        trigger={() => <Button class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}>Print QR </Button>}
                                                        content={() => componentRefs.current[index]}
                                                    />
                                                </Tooltip>

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "none", textAlign: "center" }}>

                                        <div
                                            ref={(el) => (componentRefs.current[index] = el)}
                                            style={{
                                                fontSize: "16px",
                                                marginBottom: "20px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div class=" mt-8"><QRCode size={130} value={item.manufactureId} /></div>
                                            <div style={{ fontSize: "2rem", marginTop: "10px" }}> {item.manufactureId}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </div>
            </div>

            <AddCreateManufactureModal
productionProductId={particularDiscountData.productionProductId}
addCreateManufactureCard={props.addCreateManufactureCard}
addCreateManufactureCardModal={props.addCreateManufactureCardModal}
/>

        </>
    );
}


const mapStateToProps = ({ inventory, auth,production }) => ({
    archieveInProduction: inventory.archieveInProduction,
    fetchingArchieveProductionLocId: inventory.fetchingArchieveProductionLocId,
    locationId: auth.userDetails.locationId,
    userId: auth.userDetails.userId,
    addCreateManufactureCard:production.addCreateManufactureCard,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getArchieveProductionbyLocId,
            addCreateManufactureCardModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionArchieveCard);
