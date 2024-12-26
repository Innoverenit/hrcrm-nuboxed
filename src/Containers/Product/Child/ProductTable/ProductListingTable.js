import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import ApartmentIcon from '@mui/icons-material/Apartment';
import {
  getProducts,
  getAllProductCatagory,
  emptyProductList,
  setEditProducts,
  handleUpdateProductModal,
  handleDiscountModal,
  handleOfferModal,
  handleHistoryModal,
  handleCatalogueConfigureModal,
  deleteProductData,
  handleCatalogueWipModal,
} from "../../ProductAction";
import { handleCurrencyPriceModal } from "../../../Main/Supplies/SuppliesAction";
import { CurrencySymbol } from "../../../../Components/Common";
import { Tooltip, Button, Popconfirm,  } from "antd";
import PriceChangeIcon from '@mui/icons-material/PriceChange'; 
import HistoryIcon from '@mui/icons-material/History';  
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  MultiAvatar,
} from "../../../../Components/UI/Elements";
import ProductPublishToggle from "./ProductPublishToggle";
import dayjs from "dayjs";
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function ProductListingTable(props) {
  useEffect(() => {
    props.emptyProductList()
    props.getProducts();
   
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
  // const categoryNameOption =
  //         props.categoryName.length &&
  //         props.categoryName.map((product) => {
  //             return {
  //                 text: `${product.categoryName}  ` || "",
  //                 value: product.categoryName || "",
  //             };
  //         })
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

  const {
    fetchingProducts,
    fetchingProductsError,
    fetchingAllProductsError,
    products,
    updateProductModal,
    handleUpdateProductModal,
    handleDiscountModal,
    addDiscountModal,
    user,
    handleHistoryModal,
    addProductOfferModal,
    handleOfferModal,
    addHistoryModal,
    addCatalogueConfigureModal,
    handleCatalogueConfigureModal,
    addCatalogueWipModal,
    handleCatalogueWipModal,
  } = props;
  const columns = [
    {
      title: "",
      dataIndex: "imageId",
      width: "4%",
      render: (name, item, i) => {
        return (
          <div>
            {item.imageId ? (
              <MultiAvatar
                imageId={item.imageId ? item.imageId : ''}
                imgHeight={"1.8em"}
                imgWidth={"1.8em"}
                imgRadius={20}
              />
            ) : (
              <span className=" font bold text-[0.6rem]">
                No Image
              </span>
            )}
          </div>
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
    {
      title: "Gross Wt.",
      width: "6%",
      render: (text, item) => {
        return (
          <>{item.grossWeight} {item.grossUnit}</>
        )
      }
    },
    {
      title: "Net Wt.",
      width: "6%",
      render: (text, item) => {
        return (
          <>{item.netWeight} {item.netUnit}</>
        )
      }
    },
    {
      title: "Pallet",
      width: "6%",
      dataIndex: "palette",
    },
    {
      title: "Manufacture Date",
      width: "10%",
      dataIndex: "dateOfManufacture",
      render: (text, item) => {
        return (
          <>
            {dayjs(item.dateOfManufacture).format("DD-MM-YY")}
          </>
        )
      }
    },
    {
      title: "Created",
      width: "7%",
      dataIndex: "transfer",
      render: (text, item) => {
        return (
          <>
            <b>{item.transfer}</b>
          </>
        )
      }
    },
    {
      title: "GST%",
      dataIndex: "tax",
      width: "4%",
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
          children: <span> {item.tax}</span>,
        };
      },
    },

    {
      title: "Margin(Max)",
      dataIndex: "distributorMaxMargin",
      width: "5%",
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
              {item.marginType === "Amount" ? (
                <CurrencySymbol currencyType={"INR"} />
              ) : (
                "%"
              )}
              &nbsp;
              {item.distributorMaxMargin}
            </span>
          ),
        };
      },
    },
    {
      title: "B2C Margin",
      width: "8%",
      dataIndex: "consumerMaxMargin",
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
              {item.consumerMarginType === "Amount" ? (
                <CurrencySymbol currencyType={"INR"} />
              ) : (
                "%"
              )}
              &nbsp;
              {item.consumerMaxMargin}
            </span>
          ),
        };
      },
    },
    {
      title: "",
      width: "2%",
      render: (text, item) => {
        return (
          <>
            <Tooltip title="Add price">
              <PriceChangeIcon
                onClick={() => {
                  props.handleCurrencyPriceModal(true);
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
      width: "3%",
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
                    <i class="fas fa-server"></i>
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
      width: "3%",
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
                    <i class="fas fa-network-wired"></i>
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
          children: (
            <span>
              {user.designation === "Manager" &&
                user.functionName === "Management" ? (
                <Button
                  type="primary"
                  shape="round"
                  style={{
                    backgroundColor: "teal",
                    // backgroundColor: "Yellow",
                    fontSize: "11px",
                  }}
                  onClick={() => {
                    handleDiscountModal(true);
                    handleParticularRowData(item);
                  }}
                >
                  Discount
                </Button>
              ) : (
                <Button
                  disabled
                  type="primary"
                  shape="round"
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    fontSize: "11px",
                  }}
                  onClick={() => {
                    handleDiscountModal(true);
                    handleParticularRowData(item);
                  }}
                >
                  Discount
                </Button>
              )}
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
              <Tooltip title="Customer Discount History">
                <span
                  onClick={() => handleProductHistory(item.productId)}
                  style={{
                    color:
                      showHistory && item.productId === productId
                        ? "orange"
                        : "black",
                    cursor: "pointer",
                  }}
                >
                  <i class="far fa-address-card"></i>
                </span>
              </Tooltip>
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
              <Tooltip title="Distributor Discount History">
                <span
                  onClick={() => handleDistributorHistory(item.productId)}
                  style={{
                    color:
                      showDistributorHistory && item.productId === productId
                        ? "orange"
                        : "black",
                    cursor: "pointer",
                  }}
                >
            <ApartmentIcon className="!text-tab text-[#f0386b]"/>
                </span>
              </Tooltip>
            </span>
          ),
        };
      },
    },
    {
      title: "",
      width: "5%",
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
                user.functionName === "Management" ? (
                <Button
                  type="primary"
                  shape="round"
                  style={{
                    backgroundColor: "Tomato",
                    fontSize: "11px",
                  }}
                  onClick={() => {
                    handleOfferModal(true);
                    handleParticularRowData(item);
                  }}
                >
                  Offer
                </Button>
              ) : (
                <Button
                  type="primary"
                  shape="round"
                  disabled
                  style={{
                    backgroundColor: "Tomato",
                    color: "white",
                    fontSize: "11px",
                  }}
                  onClick={() => {
                    handleOfferModal(true);
                    handleParticularRowData(item);
                  }}
                >
                  Offer
                </Button>
              )}
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
              <Tooltip title="Customer Offer History">
                <span
                  onClick={() => handleCustomerOfferHistory(item.productId)}
                  style={{
                    color:
                      customerOfferHistory && item.productId === productId
                        ? "orange"
                        : "black",
                    cursor: "pointer",
                  }}
                >
                  <i class="far fa-address-card"></i>
                </span>
              </Tooltip>
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
              <Tooltip title="Distributor Offer History">
                <span
                  onClick={() => handleDistributorOfferHistory(item.productId)}
                  style={{
                    color:
                      distributorOfferHistory && item.productId === productId
                        ? "orange"
                        : "black",
                    cursor: "pointer",
                  }}
                >
               <ApartmentIcon className="!text-tab text-[#f0386b]"/>
                </span>
              </Tooltip>
            </span>
          ),
        };
      },
    },
    {
      title: "Website",
      width: "9%",
      render: (name, item, i) => {
        return <ProductPublishToggle
          productId={item.productId}
          publishInd={item.publishInd} />
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
              <Tooltip title="Product History">
                <HistoryIcon
                  onClick={() => {
                    handleHistoryModal(true);
                    handleParticularRowData(item);
                  }}
                  style={
                    {
                      // color:
                      //   showHis && item.orderId === orderId ? "orange" : "#1890ff",
                      // cursor: "pointer",
                    }
                  }
                />
              </Tooltip>
            </span>
          ),
        };
      },
    },

    {
      title: "",
      dataIndex: "documentId",
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
                (user.functionName !== "Sales" ||
                  user.designation !== "Manager") && (
                  <Tooltip title="Edit">
                    <VisibilityIcon
                      style={{ cursor: "pointer", fontSize: "12px" }}
                      onClick={() => {
                        props.setEditProducts(item);
                        handleUpdateProductModal(true);
                        // handleSetCurrentLeadsId(item.leadsId);
                      }}
                    />
                  </Tooltip>
                )}
            </span>
          ),
        };
      },
    },

    {
      title: "",
      width: "3%",
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

  // if (props.fetchingProductsError) {
  //   return <APIFailed />;
  // }

  // const tab = document.querySelector(".ant-layout-sider-children");
  // const tableHeight = tab && tab.offsetHeight - 200;
  return (
    <>
      {true && (
        <StyledTable
          // rowSelection={rowSelection}
          rowKey=""
          columns={columns}
          // loading={fetchingProducts || fetchingProductsError}
          dataSource={products}
          onChange={console.log("contact onChangeHere...")}
          scroll={{ y: 400 }}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <>
                  <p style={{ margin: 0 }}></p>
                  <div>{record.description || ""} </div>
                </>
              );
            },
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
      )}
     
    </>
  );
}

const mapStateToProps = ({ product, auth, supplies }) => ({
  fetchingProducts: product.fetchingProducts,
  fetchingProductsError: product.fetchingProductsError,
  fetchingAllProducts: product.fetchingAllProducts,
  fetchingAllProductsError: product.fetchingAllProductsError,
  products: product.products,
  allproducts: product.allproducts,
  updateProductModal: product.updateProductModal,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  addHistoryModal: product.addHistoryModal,
  addCatalogueConfigureModal: product.addCatalogueConfigureModal,
  addCatalogueWipModal: product.addCatalogueWipModal,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  addCurrencyValue: supplies.addCurrencyValue
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProducts,
      setEditProducts,
      emptyProductList,
      handleUpdateProductModal,
      handleDiscountModal,
      handleHistoryModal,
      deleteProductData,
      handleCatalogueConfigureModal,
      getAllProductCatagory,
      handleOfferModal,
      handleCatalogueWipModal,
      handleCurrencyPriceModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingTable);
