import React, { useState, useEffect, Suspense, lazy,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliesList,
  deletePurchaseData,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  handleCurrencyPriceModal,
  handleBrandModel,
  handleMaterialBuilderDrawer,
  handleSuppliersListDrawer,
  handleMaterialInventory,
  handlePriceModal
} from "./SuppliesAction";
import EuroIcon from '@mui/icons-material/Euro';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
import { Tooltip, Popconfirm, Button } from "antd";
import {
  DeleteOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import CategoryIcon from '@mui/icons-material/Category'
import dayjs from "dayjs";
import InventoryIcon from '@mui/icons-material/Inventory';
import { BundleLoader } from "../../../Components/Placeholder";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import MaterialStatusToggle from "./MaterialStatusToggle";
import MaterialFeatureToggle from "./MaterialFeatureToggle";
import MaterialFifoToggle from "./MaterialFifoToggle";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { FormattedMessage } from "react-intl";
import PriceModal from "./PriceModal";

const MaterialInventoryDrawer = lazy(()=>import("./MaterialInventory/MaterialInventoryDrawer"));
const MaterialBuilderDrawer = lazy(() => import("./MaterialBuilder/MaterialBuilderDrawer"));
const UpdateSuppliesFormDrawer = lazy(() => import("./UpdateSuppliesFormDrawer"));
const TagBrandModel = lazy(() => import("./TagBrandModel"));
const SuppliersListDrawer = lazy(() => import("./SuppliesSupplierList/SuppliersListDrawer"));

function SuppliesTable(props) {

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const componentRefs = useRef([]);
  const handlePrint = () => {
    window.print();
};
  useEffect(() => {
    setPage(page + 1);
    props.getSuppliesList(page);

  }, []);

  const handleLoadMore = () => {
    const PageMapd = props.purchaseList && props.purchaseList.length && props.purchaseList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliesList,

        userId
      } = props;
      if (props.purchaseList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliesList(page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "HSN",//0
          "Supplies ID",//1
          "Name",//1
          "Category",//1
          "Sub Category",//1
          "Re-order level",//1
          "Created",//1
          "Process",//1
      
      
       
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const { updateSuppliesDrawer,
     handleUpdateSupplieDrawer,
      materialBuildrawer, 
      handleMaterialBuilderDrawer,
      handlePriceModal } = props;
  return (
    <>
      <div className=" flex justify-end sticky z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[1rem] max-xl:w-[2rem]"></div>
            <div className=" w-[2.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* HSN */}
              {translatedMenuItems[0]}
              </div>
            <div className="w-[6.15rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Supplies ID  */}
              {translatedMenuItems[1]}
              </div>
            <div className=" w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Name */}
              {translatedMenuItems[2]}
              </div>
            <div className=" w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Category */}
              {translatedMenuItems[3]}
              </div>
            <div className="w-[8.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Sub Category */}
              {translatedMenuItems[4]}
              </div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Attribute */}
              {translatedMenuItems[5]}
              </div>
            <div className="w-[8.14rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Re-order level */}
              {translatedMenuItems[6]}
              </div>
            
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Created */}
              {translatedMenuItems[7]}
              </div>
            {/* <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Unique ID</div> */}
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[11.8rem]">
              {/* Process */}
              {translatedMenuItems[8]}
              </div>
          </div>

          <InfiniteScroll
            dataLength={props.purchaseList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingPurchaseList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"79vh"}
          >
            {props.purchaseList.length ?
              <>
                {props.purchaseList.map((item,index) => {
                  const currentDate = dayjs().format("DD/MM/YYYY");
                  
                  return (
                    <>
                      <div className="flex rounded justify-center bg-white mt-1  h-8  p-1 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[14.91rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem]   max-sm:w-auto">
                              <div className="flex max-sm:w-wk max-sm:justify-between ">
                                <div className=" flex items-center w-[3rem]">
                                  {item.imageId && (
                                    <span>
                                      <MultiAvatar
                                        // primaryTitle={item.name}
                                        imageId={item.imageId}
                                        // imageURL={item.imageURL}
                                        imgWidth={"1.8rem"}
                                        imgHeight={"1.8rem"}
                                      />
                                    </span>
                                  )}
                                </div>
                                

                                <div class="max-sm:w-auto flex items-center">

                                  <div className=" flex font-medium flex-col w-[4rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                      {item.hsn} <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                        <span className="text-xs text-[tomato] font-bold">
                                          New
                                        </span>
                                      ) : null} </span> &nbsp;
                                    </div>
                                    
                                  </div>
                                  <div class="w-[3.2rem] max-sm:w-auto max-xl:w-[1.2rem] max-lg:w-[0.2rem]">
                                <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.modifiedAt ? "Updated" : null}
                                    {/* {item.modifiedAt ? dayjs(item.modifiedAt).format("DD/MM/YYYY") : null} */}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[6.45rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.newSuppliesNo}
                              </div>
                            </div>
                                </div>
                              </div>
                            </div>
                            <div className=" flex font-medium flex-col w-[8.12rem] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.suppliesName}
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.categoryName}
                              </div>
                            </div>

                            <div className=" flex font-medium flex-col w-[8.63rem] max-xl:w-[6.23rem] max-lg:w-[5.23rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.subCategoryName}
                              </div>
                            </div>
                            <div className=" flex font-medium flex-col w-[7.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.attributeName} {item.subAttributeName}
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.reorder}
                              </div>
                            </div>

                           
                            <div className=" flex font-medium flex-col w-[8.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MultiAvatar
                                  primaryTitle={item.userName}
                                  imageId={item.userImageId}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                {`${dayjs(item.creationDate).format("ll")}`}
                              </div>
                            </div>
                            <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialStatusToggle
                                  publishInd={item.publishInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>

                            <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFifoToggle
                                  fifoInd={item.fifoInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>
                            <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFeatureToggle
                                  fifoInd={item.fifoInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>

                          </div>

                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          {/* <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.Print"
                                                            defaultMessage="Print"
                                                        />}>
                                                            
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>Print <QrCodeIcon className="!text-icon"/></Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div> */}
                                                     <div>
                        <Tooltip title="Add Price">
                          <EuroIcon
                            className="!text-icon cursor-pointer text-[blue]"
                            onClick={() => {
                              props.handlePriceModal(true);
                              handleParticularRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                            <div>
                              <Tooltip title="Material Builder">
                                <ViewQuiltIcon
                                  className="cursor-pointer text-icon"
                                  onClick={() => {
                                    props.handleMaterialBuilderDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              {props.repairInd && <Tooltip title="Tag Brand">
                                <PhoneFilled
                                  onClick={() => {
                                    props.handleBrandModel(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-icon cursor-pointer text-[blue]"
                                />
                              </Tooltip>}
                            </div>


                            <div>
                              <Tooltip title="Suppliers">
                                <CategoryIcon
                                  onClick={() => {
                                    props.handleSuppliersListDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-icon cursor-pointer"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Tooltip title="Inventory">
                                <InventoryIcon className=" !text-icon cursor-pointer"  onClick={() => {
                                    props.handleMaterialInventory(true);
                                    handleParticularRowData(item);
                                  }}/>
                              </Tooltip>
                            </div>

                            {/* <div className=" flex font-medium ml-1  w-[4.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                   
                                                </div> */}
                                                {/* <div style={{ display: "none", textAlign: "center" }}>

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
    <div style={{ fontSize: "5rem", marginTop: "2rem" }}>
        <QRCode size={150} value={item.newSuppliesNo} />
    </div>
    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>ID:</span> {item.newSuppliesNo}</div>
</div>
</div> */}
                            <div>
                              <Tooltip title="Edit">
                                <BorderColorIcon
                                  onClick={() => {
                                    handleUpdateSupplieDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className=" !text-icon cursor-pointer text-[tomato]"
                                />
                              </Tooltip>
                            </div>
                            <div>
                              <Popconfirm
                                title="Do you want to delete?"
                                onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                              >

                                <DeleteOutlined className=" !text-icon cursor-pointer text-[red]" />
                              </Popconfirm>
                            </div>

                          </div>

                        </div>
                      </div>
                    </>
                  );
                })}
              </> :
              !props.purchaseList.length
                && !props.fetchingPurchaseList ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>

      <Suspense fallback={<BundleLoader />}>
        <TagBrandModel
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          addBrandModel={props.addBrandModel}
          handleBrandModel={props.handleBrandModel}
          particularDiscountData={particularDiscountData}
        />
        <UpdateSuppliesFormDrawer
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          updateSuppliesDrawer={updateSuppliesDrawer}
          handleUpdateSupplieDrawer={handleUpdateSupplieDrawer}
        />
        <MaterialBuilderDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          materialBuildrawer={materialBuildrawer}
          handleMaterialBuilderDrawer={handleMaterialBuilderDrawer}
        />
        <SuppliersListDrawer
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          suppliersListDrwr={props.suppliersListDrwr}
          handleSuppliersListDrawer={props.handleSuppliersListDrawer}
        />
        <MaterialInventoryDrawer
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={translatedMenuItems}
       particularDiscountData={particularDiscountData}
       materialInveDawer={props.materialInveDawer}
       handleMaterialInventory={props.handleMaterialInventory}
        />
        <PriceModal
          particularDiscountData={particularDiscountData}
          handlePriceModal={handlePriceModal}
          priceOpenModal={props.priceOpenModal}
        />
      </Suspense>

    </>
  );
}


const mapStateToProps = ({ supplies, auth }) => ({
  fetchingPurchaseList: supplies.fetchingPurchaseList,
  purchaseList: supplies.purchaseList,
  updateSuppliesDrawer: supplies.updateSuppliesDrawer,
  addCurrencyValue: supplies.addCurrencyValue,
  addBrandModel: supplies.addBrandModel,
  materialBuildrawer: supplies.materialBuildrawer,
  repairInd: auth.userDetails.repairInd,
  suppliersListDrwr: supplies.suppliersListDrwr,
  materialInveDawer:supplies.materialInveDawer,
  priceOpenModal: supplies.priceOpenModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliesList,
      deletePurchaseData,
      handleUpdateSupplieDrawer,
      setEditSupplies,
      handleCurrencyPriceModal,
      handleBrandModel,
      handleMaterialBuilderDrawer,
      handleSuppliersListDrawer,
      handleMaterialInventory,
      handlePriceModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTable);
