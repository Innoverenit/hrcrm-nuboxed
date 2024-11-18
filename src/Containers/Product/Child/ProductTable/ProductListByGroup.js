
import React, { useState, useEffect, useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrGenerate from "../ProductTable/QrGenerate"
import {
    getProducts,
    getProductByGroup,
    getAllProductCatagory,
    setEditProducts,
    handleUpdateProductModal,
    handleHistoryModal,
    handleCatalogueConfigureModal,
    deleteProductData,
    handleCatalogueWipModal,
    handleProductBuilderDrawer,
    handlePriceDrawer
} from "../../ProductAction";
import DistributorOfferHistory from "./DistributorOfferHistory";
import ProductPublishToggle from "./ProductPublishToggle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PriceDrawer from "./PriceDrawer";
import { StyledTable } from "../../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Tooltip, Button, Popconfirm } from "antd";
import WebhookIcon from '@mui/icons-material/Webhook';
import NetworkCellIcon from '@mui/icons-material/NetworkCell';
import InfiniteScroll from "react-infinite-scroll-component";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import EuroIcon from '@mui/icons-material/Euro';
import UpdateProductModal from "../../Child/UpdateProductModal";

const ProductBuilderDrawer =lazy(()=>import("./ProductBuilderDrawer"));

function ProductHistoryTable(props) {

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(page + 1);
        props.getProducts(page);
        // props.getProducts();
        // props.getAllProductCatagory();
    }, []);

    const [showHistory, setshowHistory] = useState(false);
    const [showDistributorHistory, setshowDistributorHistory] = useState(false);
    const [customerOfferHistory, setcustomerOfferHistory] = useState(false);
    const [distributorOfferHistory, setdistributorOfferHistory] = useState(false);
    const [productId, setproductId] = useState("");
    const [particularDiscountData, setParticularDiscountData] = useState({});

    function handleParticularRowData(item) {
        setParticularDiscountData(item);
    }
    function handleProductHistory(productId) {
        setshowHistory(true);
        setshowDistributorHistory(false);
        setcustomerOfferHistory(false);
        setdistributorOfferHistory(false);
        setproductId(productId);
    }

    function handleDistributorHistory(productId) {
        setshowDistributorHistory(true);
        setcustomerOfferHistory(false);
        setshowHistory(false);
        setdistributorOfferHistory(false);
        setproductId(productId);
    }

    function handleCustomerOfferHistory(productId) {
        setcustomerOfferHistory(true);
        setshowHistory(false);
        setdistributorOfferHistory(false);
        setshowDistributorHistory(false);
        setproductId(productId);
    }

    function handleDistributorOfferHistory(productId) {
        setdistributorOfferHistory(true);
        setshowHistory(false);
        setcustomerOfferHistory(false);
        setshowDistributorHistory(false);
        setproductId(productId);
    }
    const categoryNameOption = useMemo(() => {
        if (!props.allproducts) return [];
        return (
            props.allproducts.length &&
            props.allproducts.map((allproducts) => {
                return {
                    text: allproducts.categoryName || "",
                    value: allproducts.categoryName,
                };
            })
        );
    }, [props.allproducts]);

    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProducts(page);
    };

    const {
        fetchingProducts,
        products,
        handleUpdateProductModal,
        updateProductModal,
        user,
        handleHistoryModal,
        handleCatalogueConfigureModal,
        handleCatalogueWipModal,
        proBuilderDrawer,
        handleProductBuilderDrawer,
        handlePriceDrawer,
        priceOpenDrawer
    } = props;

    const columns = [
        {
            title: "",
            dataIndex: "imageId",
            width: "4%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {item.imageId ? (
                            <MultiAvatar
                                imageId={item.imageId ? item.imageId : ''}
                                imgHeight={"1.8em"}
                                imgWidth={"1.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                No Image
                            </span>
                        )}
                    </SubTitle>
                );
            },
        },

        {
            title: "Article #",
            dataIndex: "articleNo",
            width: "7%",
            render: (name, item, i) => {

                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.articleNo}</span>,
                };
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "7%",
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.categoryName}</span>,
                };
            },
            sorter: (a, b) => {
                var nameA = a.categoryName.toLowerCase(); // ignore upper and lowercase
                var nameB = b.categoryName.toLowerCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            },
            width: "8%",
            filters: categoryNameOption,

            onFilter: (value, record) => {
                return record.categoryName === value;
            },
        },
        {
            title: "Sub",
            dataIndex: "subCategoryName",
            width: "6%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {item.subCategoryName}</span>,
                };
            },
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "7%",
            render: (name, item, i) => {
                const data = `${item.attributeName || ""} ${item.subAttributeName ||
                    ""}`;
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: <span> {data}</span>,
                };
            },
        },
        // {
        //     title: "Gross Wt.",
        //     width: "6%",
        //     render: (text, item) => {
        //         return (
        //             <>{item.grossWeight} {item.grossUnit}</>
        //         )
        //     }
        // },
        // {
        //     title: "Net Wt.",
        //     width: "6%",
        //     render: (text, item) => {
        //         return (
        //             <>{item.netWeight} {item.netUnit}</>
        //         )
        //     }
        // },
        // {
        //     title: "Pallet",
        //     width: "6%",
        //     dataIndex: "palette",
        // },
        // {
        //     title: "GST%",
        //     dataIndex: "tax",
        //     width: "4%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: <span> {item.tax}</span>,
        //         };
        //     },
        // },

        // {
        //     title: "Margin(Max)",
        //     dataIndex: "distributorMaxMargin",
        //     width: "8%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     {item.marginType === "Amount" ? (
        //                         <CurrencySymbol currencyType={"INR"} />
        //                     ) : (
        //                         "%"
        //                     )}
        //                     &nbsp;
        //                     {item.distributorMaxMargin}
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "B2C Margin",
        //     width: "8%",
        //     dataIndex: "consumerMaxMargin",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     {item.consumerMarginType === "Amount" ? (
        //                         <CurrencySymbol currencyType={"INR"} />
        //                     ) : (
        //                         "%"
        //                     )}
        //                     &nbsp;
        //                     {item.consumerMaxMargin}
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "Add to Material",
        //     width: "8%",
        //     render: (text, item) => {
        //         return (
        //             <>
        //                 <AddToSuppliesToggle item={item} />

        //             </>
        //         )
        //     }
        // },

        {
            title: "",
            width: "8%",
            render: (text, item) => {
                return (
                    <>
                       <QrGenerate/>

                    </>
                )
            }
        },

        {
            title: "",
            width: "2%",
            render: (text, item) => {
                return (
                    <>
                        <Tooltip title="Add Price">
                            <EuroIcon
                            style={{cursor:"pointer" }}
                                onClick={() => {
                                    props.handlePriceDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "",
            width: "2%",
            render: (text, item) => {
                return (
                    <>
                        <Tooltip title="Product Builder">
                            <ViewQuiltIcon
                            style={{cursor:"pointer" }}
                                onClick={() => {
                                    props.handleProductBuilderDrawer(true);
                                    handleParticularRowData(item);
                                }}
                            />
                        </Tooltip>
                    </>
                )
            }
        },
        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {(user.userType === "USER" &&
                                user.functionName === "Production" &&
                                user.designation === "Manager") ||
                                (user.userType === "ADMIN" &&
                                    user.functionName === "Management" &&
                                    user.designation === "Manager") ? (
                                <Tooltip title="WIP">
                                    <span onClick={() => handleCatalogueWipModal(true)}>

                                  <WebhookIcon/>
                                    </span>
                                </Tooltip>
                            ) : null}
                        </span>
                    ),
                };
            },
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {(user.userType === "USER" &&
                                user.functionName === "Production" &&
                                user.designation === "Manager") ||
                                (user.userType === "ADMIN" &&
                                    user.functionName === "Management" &&
                                    user.designation === "Manager") ? (
                                <Tooltip title="Configure">
                                    <span onClick={() => handleCatalogueConfigureModal(true)}>
                                 <NetworkCellIcon/>
                                    </span>
                                </Tooltip>
                            ) : null}
                        </span>
                    ),
                };
            },
        },
        // {
        //     title: "",
        //     width: "7%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                           <Button
        //           type="primary"
        //           shape="round"
        //           style={{
        //             backgroundColor: "teal",
        //             // backgroundColor: "Yellow",
        //             fontSize: "11px",
        //           }}
        //           onClick={() => {
        //             handleDiscountModal(true);
        //             handleParticularRowData(item);
        //           }}
        //         >
        //           Discount
        //         </Button>
                            
        //                 </span>
        //             ),
        //         };
        //     },
        // },

        // {
        //     title: "",
        //     width: "2%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     <Tooltip title="Customer Discount History">
        //                         <span
        //                             onClick={() => handleProductHistory(item.productId)}
        //                             style={{
        //                                 color:
        //                                     showHistory && item.productId === productId
        //                                         ? "orange"
        //                                         : "black",
        //                                 cursor: "pointer",
        //                             }}
        //                         > <ContactMailIcon/>

        //                         </span>
        //                     </Tooltip>
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "",
        //     width: "2%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     <Tooltip title="Distributor Discount History">
        //                         <span
        //                             onClick={() => handleDistributorHistory(item.productId)}
        //                             style={{
        //                                 color:
        //                                     showDistributorHistory && item.productId === productId
        //                                         ? "orange"
        //                                         : "black",
        //                                 cursor: "pointer",
        //                             }}
        //                         ><ApartmentIcon/>

        //                         </span>
        //                     </Tooltip>
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "",
        //     width: "5%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     {user.designation === "Manager" &&
        //                         user.functionName === "Management" ? (
        //                         <Button
        //                             type="primary"
        //                             shape="round"
        //                             style={{
        //                                 backgroundColor: "Tomato",
        //                                 fontSize: "11px",
        //                             }}
        //                             onClick={() => {
        //                                 handleOfferModal(true);
        //                                 handleParticularRowData(item);
        //                             }}
        //                         >
        //                             Offer
        //                         </Button>
        //                     ) : (
        //                         <Button
        //                             type="primary"
        //                             shape="round"
        //                             disabled
        //                             style={{
        //                                 backgroundColor: "Tomato",
        //                                 color: "white",
        //                                 fontSize: "11px",
        //                             }}
        //                             onClick={() => {
        //                                 handleOfferModal(true);
        //                                 handleParticularRowData(item);
        //                             }}
        //                         >
        //                             Offer
        //                         </Button>
        //                     )}
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "",
        //     width: "2%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     <Tooltip title="Customer Offer History">
        //                         <span
        //                             onClick={() => handleCustomerOfferHistory(item.productId)}
        //                             style={{
        //                                 color:
        //                                     customerOfferHistory && item.productId === productId
        //                                         ? "orange"
        //                                         : "black",
        //                                 cursor: "pointer",
        //                             }}
        //                         ><ContactMailIcon/>

        //                         </span>
        //                     </Tooltip>
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        // {
        //     title: "",
        //     width: "2%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     <Tooltip title="Distributor Offer History">
        //                         <span
        //                             onClick={() => handleDistributorOfferHistory(item.productId)}
        //                             style={{
        //                                 color:
        //                                     distributorOfferHistory && item.productId === productId
        //                                         ? "orange"
        //                                         : "black",
        //                                 cursor: "pointer",
        //                             }}
        //                         ><ApartmentIcon/>

        //                         </span>
        //                     </Tooltip>
        //                 </span>
        //             ),
        //         };
        //     },
        // },
        {
            title: "Website",
            width: "9%",
            render: (name, item, i) => {
                return <ProductPublishToggle item={item} />
            },
        },

        // {
        //     title: "",
        //     width: "2%",
        //     render: (name, item, i) => {
        //         return {
        //             props: {
        //                 style: {
        //                     background:
        //                         (distributorOfferHistory ||
        //                             showHistory ||
        //                             showDistributorHistory ||
        //                             customerOfferHistory) &&
        //                             productId === item.productId
        //                             ? "rgb(158 183 223)"
        //                             : null,
        //                 },
        //             },
        //             children: (
        //                 <span>
        //                     <Tooltip title="Product History">
        //                         <HistoryOutlined
        //                             onClick={() => {
        //                                 handleHistoryModal(true);
        //                                 handleParticularRowData(item);
        //                             }}
        //                             style={
        //                                 {
        //                                     // color:
        //                                     //   showHis && item.orderId === orderId ? "orange" : "#1890ff",
        //                                     // cursor: "pointer",
        //                                 }
        //                             }
        //                         />
        //                     </Tooltip>
        //                 </span>
        //             ),
        //         };
        //     },
        // },

        {
            title: "",
            dataIndex: "documentId",
            width: "2%",
            render: (name, item, i) => {
                return (
                   
                                    <Tooltip title="Edit">
                                        <VisibilityIcon
                                    style={{ cursor: "pointer", fontSize: "12px" }}
                                            onClick={() => {
                                                props.setEditProducts(item);
                                                handleUpdateProductModal(true);
                                            }}
                                        />
                                    </Tooltip>
      );
                
            }
        },

        {
            title: "",
            width: "2%",
            render: (name, item, i) => {
                return {
                    props: {
                        style: {
                            background:
                                (distributorOfferHistory ||
                                    showHistory ||
                                    showDistributorHistory ||
                                    customerOfferHistory) &&
                                    productId === item.productId
                                    ? "rgb(158 183 223)"
                                    : null,
                        },
                    },
                    children: (
                        <span>
                            {user.designation === "Manager" &&
                                user.functionName === "Management" && (
                                    <Tooltip title="Delete">
                                        <Popconfirm
                                            title="Do you want to delete?"
                                            onConfirm={() => props.deleteProductData(item.productId)}
                                        >
                                            <DeleteOutlineIcon
                                                style={{ cursor: "pointer", color: "red" }}
                                            />
                                        </Popconfirm>
                                    </Tooltip>
                                )}
                        </span>
                    ),
                };
            },
        },
    ];

    return (
        <>
        <InfiniteScroll
        dataLength={products.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingProducts?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
            <StyledTable
                rowKey=""
                columns={columns}
                dataSource={products}
                // loading={
                //     fetchingProducts
                // }
                // scroll={{ y: 320 }}
                pagination={false}
                    // defaultPageSize: 30,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["25", "40", "50"],
                
            />
              </InfiniteScroll> 
              
              <UpdateProductModal
        updateProductModal={updateProductModal}
        handleUpdateProductModal={handleUpdateProductModal}
      />

            <ProductBuilderDrawer
            particularDiscountData={particularDiscountData}
            proBuilderDrawer={proBuilderDrawer}
            handleProductBuilderDrawer={handleProductBuilderDrawer}
            />
<PriceDrawer
handlePriceDrawer={handlePriceDrawer}
priceOpenDrawer={priceOpenDrawer}
/>
            
            {distributorOfferHistory && (
                <DistributorOfferHistory productId={productId} />
            )} 
        </>
    );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
    productByGroup: product.productByGroup,
    fetchingProductByGroup: product.fetchingProductByGroup,
    groupId: auth.userDetails.groupId,
    fetchingProducts: product.fetchingProducts,
    fetchingAllProducts: product.fetchingAllProducts,
    fetchingAllProductsError: product.fetchingAllProductsError,
    products: product.products,
    allproducts: product.allproducts,
    updateProductModal: product.updateProductModal,
    // addDiscountModal: product.addDiscountModal,
    // addProductOfferModal: product.addProductOfferModal,
    addHistoryModal: product.addHistoryModal,
    addCatalogueConfigureModal: product.addCatalogueConfigureModal,
    addCatalogueWipModal: product.addCatalogueWipModal,
    role: auth.userDetails.role,
    department: auth.userDetails.department,
    user: auth.userDetails,
    addCurrencyValue: supplies.addCurrencyValue,
    proBuilderDrawer:product.proBuilderDrawer,
    priceOpenDrawer:product.priceOpenDrawer,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductByGroup,
            setEditProducts,
            handleUpdateProductModal,
            // handleDiscountModal,
            handleHistoryModal,
            deleteProductData,
            handleCatalogueConfigureModal,
            getAllProductCatagory,
            // handleOfferModal,
            handleCatalogueWipModal,
            getProducts,
            handleProductBuilderDrawer,
            handlePriceDrawer
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductHistoryTable);
