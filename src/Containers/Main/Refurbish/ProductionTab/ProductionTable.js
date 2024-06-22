import React, { useEffect, useState } from 'react'
import { getCatalogueByTechnician } from "../RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ButtonGroup from "antd/lib/button/button-group";
import { Button, Tooltip } from 'antd'
import { updateFarGlassInProduction, handleInTagDrawer } from "../RefurbishAction"
import TagInDrawer from './TagInDrawer';
import MoveInvenToggle from './MoveInvenToggle'
import { getAllProductList } from "../../Account/AccountAction"
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductionTable = (props) => {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        props.getCatalogueByTechnician(page)
        setPage(page + 1);
    }, []);
    const handleLoadMore = () => {
        const proPag = props.products && props.products.length && props.products[0].pageCount
        setTimeout(() => {
            if (props.products) {
                if (page < proPag) {
                    setPage(page + 1);
                    props.getCatalogueByTechnician(page)
                }
                if (page === proPag) {
                    setHasMore(false)
                }
            }
        }, 100);
    };

    useEffect(() => {
        props.getAllProductList()
        props.getCatalogueByTechnician(page)
    }, []);

    const [RowData, setRowData] = useState({});

    function handleSetRowData(item) {
        setRowData(item);
    }
    const [active, setActive] = useState("To Start")
    function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    ghost={status !== type}
                    style={{
                        padding: "6px",
                        borderColor: "transparent",
                        color: indStatus === type ? "orange" : "grey",
                        // color: status === type && id === phoneId ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }
    function handleInProgress(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            productRepurbishId: item.productRepurbishId,
            repurbishStartDate: props.startDate,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateFarGlassInProduction(data, item.productRepurbishId)
    }
    function handleCompleteglass(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            productRepurbishId: item.productRepurbishId,
            repurbishStartDate: item.repurbishStartDate,
            repurbishEndDate: props.endDate,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateFarGlassInProduction(data, item.productRepurbishId)
    }

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
                    <div className=" flex justify-between w-[75%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[6.1rem]">Name</div>
                        <div className=" md:w-[4.2rem] ">Category</div>
                        <div className="md:w-[5.8rem]">Sub Category</div>
                        <div className="md:w-[8.5rem]">Attribute</div>
                        <div className="md:w-[5.2rem]">Sub Attribute</div>
                        <div className="md:w-[5.2rem]">Units</div>
                        <div className="w-12"></div>
                    </div>
                    {/* <InfiniteScroll
        dataLength={props.catalogueByTechnician.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingCatalogueByTechnician?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}
                    <InfiniteScroll
                        dataLength={props.catalogueByTechnician.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        // loader={fetchingProducts ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
                    >
                        {props.catalogueByTechnician.map((item) => {
                            return (
                                <div>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                        <div class="flex">
                                            <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.name}
                                                </h4>
                                            </div>

                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-poppins">

                                                {item.categoryName}
                                            </h4>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.subCategoryName}
                                            </h4>
                                        </div>

                                        <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.attributeName}
                                            </h4>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.subAttributeName}
                                            </h4>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                                                {item.unit}
                                            </h4>
                                        </div>
                                        <div class="flex md:items-center">

                                            <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                <ButtonGroup>

                                                    <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        id={item.phoneId}
                                                        indStatus={item.repairStatus}
                                                        phoneId={RowData.phoneId}
                                                        status={active}
                                                        onClick={() => {
                                                            handleInProgress("In Progress", item);
                                                            handleSetRowData(item)
                                                        }}
                                                    />
                                                    <StatusIcon
                                                        type="Complete"
                                                        iconType="fa-hourglass"
                                                        tooltip="Complete"
                                                        status={active}
                                                        id={item.phoneId}
                                                        indStatus={item.repairStatus}
                                                        phoneId={RowData.phoneId}
                                                        onClick={() => {
                                                            handleCompleteglass("Complete", item);
                                                            handleSetRowData(item)
                                                        }}
                                                    />
                                                </ButtonGroup>
                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* {item.repurbishStartDate===null ?null: */}
                                                <Tooltip title="">
                                                    <Button
                                                        className="bg-[orange] text-[white]"
                                                        onClick={() => {
                                                            props.handleInTagDrawer(true)
                                                            handleSetRowData(item)
                                                        }}
                                                    >
                                                        Tag Parts
                                                    </Button>
                                                </Tooltip>
                                                {/* }  */}

                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {item.repurbishEndDate === null ? null :
                                                    <MoveInvenToggle
                                                        moveToLocationId={item.moveToLocationId}
                                                        productRepurbishId={item.productRepurbishId}
                                                        repurbishStartDate={item.repurbishStartDate}
                                                        repurbishEndDate={item.repurbishEndDate}
                                                    />}

                                            </div>
                                        </div>
                                        {/* <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[6%]">
                   <div>
                   <Tooltip title="Add Price">
                            <EuroIcon
                            style={{cursor:"pointer",fontSize:"1rem" }}
                                onClick={() => {
                                    props.handlePriceDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                   </div>
                   
                   <div>
                   <Tooltip title="Product Builder">
                            <ViewQuiltIcon
                            style={{cursor:"pointer",fontSize:"1rem" }}
                                onClick={() => {
                                    props.handleProductBuilderDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                        </div>
            </div>
<div className=" flex font-medium flex-col md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<h4 class=" text-xs text-cardBody font-poppins">
<Tooltip title="Edit">
                                        <EditOutlined
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            onClick={() => {
                                                props.setEditProducts(item);
                                                handleUpdateProductModal(true);
                                            }}
                                        />
                                    </Tooltip>
</h4>


</div> */}

                                    </div>
                                </div>
                            );
                        })}
                    </InfiniteScroll>
                </OnlyWrapCard>
            </div>
            <TagInDrawer
                RowData={RowData}
                clickTagInDrawr={props.clickTagInDrawr}
                handleInTagDrawer={props.handleInTagDrawer}
            />
        </>
    )
}

const mapStateToProps = ({ refurbish, auth, distributor }) => ({
    catalogueByTechnician: refurbish.catalogueByTechnician,
    userId: auth.userDetails.userId,
    clickTagInDrawr: refurbish.clickTagInDrawr,
    startDate: refurbish.startDate,
    endDate: refurbish.endDate,
    allProduct: distributor.allProduct,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getCatalogueByTechnician,
        updateFarGlassInProduction,
        handleInTagDrawer,
        getAllProductList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductionTable);


// import React, { useEffect, useState } from 'react'
// import { StyledTable } from '../../../../Components/UI/Antd'
// import { getCatalogueByTechnician } from "../RefurbishAction"
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import ButtonGroup from "antd/lib/button/button-group";
// import { Button, Tooltip } from 'antd'
// import { updateFarGlassInProduction,handleInTagDrawer } from "../RefurbishAction"
// import TagInDrawer from './TagInDrawer';
// import MoveInvenToggle from './MoveInvenToggle'

// const ProductionTable = (props) => {

//     useEffect(() => {
//         props.getCatalogueByTechnician(props.userId)
//     }, [])

//     const [RowData, setRowData] = useState({});
//     function handleSetRowData(item) {
//         setRowData(item);
//     }
//     const [active, setActive] = useState("To Start")
//     function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
//         const start = type;
//         console.log(start);
//         //////debugger;
//         if (status === type) {
//             size = "30px";
//         } else {
//             size = "16px";
//         }
//         return (
//             <Tooltip title={tooltip}>
//                 <Button
//                     ghost={status !== type}
//                     style={{
//                         padding: "6px",
//                         borderColor: "transparent",
//                         color: indStatus === type ? "orange" : "grey",
//                         // color: status === type && id === phoneId ? "orange" : "grey",
//                     }}
//                     onClick={onClick}
//                 >
//                     <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
//                 </Button>
//             </Tooltip>
//         );
//     }
//     function handleInProgress(type, item) {
//         setActive(type)
//         console.log(type)
//         console.log(item)
//         const data = {
//             repairStatus: type,
//             productRepurbishId:item.productRepurbishId,
//             repurbishStartDate:props.startDate,
//             phoneId: item.phoneId,
//             repairTechnicianId: props.userId,
//             qcInspectionInd: type === "Complete" ? 2 : 1
//         }
//         props.updateFarGlassInProduction(data, item.productRepurbishId)
//     }
//     function handleCompleteglass(type, item) {
//         setActive(type)
//         console.log(type)
//         console.log(item)
//         const data = {
//             repairStatus: type,
//             productRepurbishId:item.productRepurbishId,
//             repurbishStartDate:item.repurbishStartDate,
//             repurbishEndDate:props.endDate,
//             phoneId: item.phoneId,
//             repairTechnicianId: props.userId,
//             qcInspectionInd: type === "Complete" ? 2 : 1
//         }
//         props.updateFarGlassInProduction(data, item.productRepurbishId)
//     }
//     const column = [
//         {
//             title: "",
//             width: "1%"
//         },

//         {
//             title: "Name",
//             width: "15%",
//             dataIndex: 'name'
//         },

//         {
//             title: "Category",
//             width: "18%",
//             dataIndex: "categoryName"
//         },
//         {
//             title: "Sub Category",
//             width: "18%",
//             dataIndex: "subCategoryName"
//         },
//         {
//             title: "Attribute",
//             width: "10%",
//             dataIndex: "attributeName"
//         },
//         {
//             title: "Sub Attribute",
//             width: "10%",
//             dataIndex: "subAttributeName"
//         },
//         {
//             title: "Units",
//             width: "13%",
//             dataIndex: "unit",
//         },
//         {
//             render: (text, item) => {
//                 return (
//                     <>
//                         <ButtonGroup>

//                             <StatusIcon
//                                 type="In Progress"
//                                 iconType="fa-hourglass-half"
//                                 tooltip="In Progress"
//                                 id={item.phoneId}
//                                 indStatus={item.repairStatus}
//                                 phoneId={RowData.phoneId}
//                                 status={active}
//                                 onClick={() => {
//                                     handleInProgress("In Progress", item);
//                                     handleSetRowData(item)
//                                 }}
//                             />
//                             <StatusIcon
//                                 type="Complete"
//                                 iconType="fa-hourglass"
//                                 tooltip="Complete"
//                                 status={active}
//                                 id={item.phoneId}
//                                 indStatus={item.repairStatus}
//                                 phoneId={RowData.phoneId}
//                                 onClick={() => {
//                                     handleCompleteglass("Complete", item);
//                                     handleSetRowData(item)
//                                 }}
//                             />
//                         </ButtonGroup>
//                     </>
//                 )
//             }
//         },
//         {
//             width: "7%",
//             render: (text, item) => {
//                 return (
//                     <>
//                     {item.repurbishStartDate===null ?null:
//                         <Tooltip title="">
//                             <Button
//                                 style={{ backgroundColor: "orange", color: "white" }}
//                                 onClick={() => {
//                                     // handleShowBuilder()
//                                     props.handleInTagDrawer(true)
//                                     handleSetRowData(item)
//                                 }}
//                             >
//                                 Tag Parts
//                             </Button>
//                         </Tooltip>
//                         }

//                     </>
//                 )
//             }
//         },
//         {
//             width: "7%",
//             render: (text, item) => {
//                 return (
//                     <>
//                     {item.repurbishEndDate===null ? null:
//                    <MoveInvenToggle
//                    moveToLocationId={item.moveToLocationId}
//                    productRepurbishId={item.productRepurbishId}
//                    repurbishStartDate={item.repurbishStartDate}
//                    repurbishEndDate={item.repurbishEndDate}
//                    />}

//                     </>
//                 )
//             }
//         }

//     ];

//     return (
//         <>
//             <StyledTable
//                 dataSource={props.catalogueByTechnician}
//                 pagination={false}
//                 columns={column}
//             />
// <TagInDrawer
// RowData={RowData}
// clickTagInDrawr={props.clickTagInDrawr}
// handleInTagDrawer={props.handleInTagDrawer}
// />
//         </>
//     )
// }

// const mapStateToProps = ({ refurbish, auth }) => ({
//     catalogueByTechnician: refurbish.catalogueByTechnician,
//     userId: auth.userDetails.userId,
//     clickTagInDrawr:refurbish.clickTagInDrawr,
//     startDate:refurbish.startDate,
//     endDate:refurbish.endDate,
// });
// const mapDispatchToProps = dispatch =>
//     bindActionCreators({
//         getCatalogueByTechnician,
//         updateFarGlassInProduction,
//         handleInTagDrawer
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(ProductionTable);

