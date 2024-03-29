import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getPurchaseOrderDetailsList, updatePriceOfPoItem } from "../../../SuppliersAction"
import { BorderAllRounded, BorderColorOutlined } from "@mui/icons-material";
import { Button, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

function PoSupplierDetailsTable(props) {
    useEffect(() => {
        props.getPurchaseOrderDetailsList(props.poSupplierDetailsId);
    }, []);

    const [price, setPrice] = useState("")
    const [edit, setEdit] = useState(false)
    const [row, setRow] = useState({})

    const handleRowData = (item) => {
        setRow(item)
    }

    const handlePrice = () => {
        setEdit(!edit)
    }
    const handleInputPrice = (val) => {
        setPrice(val)
    }
    const handleCallback = () => {
        setEdit(false)
        setPrice("")
    }

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const handleLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[23.1rem]">
                            <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            /></div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.category"
                                defaultMessage="Category" />
                        </div>

                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute" />
                        </div>

                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.unit"
                                defaultMessage="Unit" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.price"
                                defaultMessage="Price/Unit" />
                        </div>

                    </div>
                    <InfiniteScroll
                        dataLength={props.poDetails.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingPoDetailsList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.poDetails.map((item) => {
                            return (
                                <>
                                    <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                    <span>
                                                        {item.suppliesFullName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                    <span>
                                                        {item.categoryName} {item.subCategoryName}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                    <span>
                                                        {item.attributeName} {item.subAttributeName}
                                                    </span>

                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                    <span>
                                                        {item.unit}
                                                    </span>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

                                                    {edit && row.suppliesId === item.suppliesId ?
                                                        <>
                                                            <Input
                                                                value={price}
                                                                type="text"
                                                                placeholder="Enter Price"
                                                                onChange={(e) => handleInputPrice(e.target.value)}
                                                            />
                                                            <Button
                                                                type="primary"
                                                                onClick={() => props.updatePriceOfPoItem({
                                                                    price: price,
                                                                    supplierId: props.supplierId,
                                                                    userId: props.userId,
                                                                    suppliesId: item.suppliesId,
                                                                    poSupplierDetailsId: props.poSupplierDetailsId
                                                                }, handleCallback())}
                                                            >Add</Button>
                                                            <Button onClick={handlePrice}>Cancel</Button>
                                                        </>
                                                        : <span>
                                                            {item.price}
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                    <BorderColorOutlined
                                                        onClick={() => {
                                                            handlePrice()
                                                            handleRowData(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </InfiniteScroll>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    poDetails: suppliers.poDetails,
    userId: auth.userDetails.userId,
    fetchingPoDetailsList: suppliers.fetchingPoDetailsList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseOrderDetailsList,
            updatePriceOfPoItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PoSupplierDetailsTable);