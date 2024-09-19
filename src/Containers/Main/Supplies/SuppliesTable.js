import React, { useState, useEffect,Suspense, lazy,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import QrCodeIcon from '@mui/icons-material/QrCode';
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
import { Tooltip, Popconfirm,Button } from "antd";
import {
  DeleteOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import CategoryIcon from '@mui/icons-material/Category';
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
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MaterialRecommendToggle from "./MaterialRecommendToggle";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MaterialComplementaryDrawer from "./MaterialComplementaryDrawer";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";
const PriceModal = lazy(() => import("./PriceModal"));
const MaterialInventoryDrawer = lazy(()=>import("./MaterialInventory/MaterialInventoryDrawer"));
const MaterialBuilderDrawer = lazy(() => import("./MaterialBuilder/MaterialBuilderDrawer"));
const UpdateSuppliesFormDrawer = lazy(() => import("./UpdateSuppliesFormDrawer"));
const TagBrandModel = lazy(() => import("./TagBrandModel"));
const SuppliersListDrawer = lazy(() => import("./SuppliesSupplierList/SuppliersListDrawer"));
const MaterialDetailsDrawer=lazy(() => import("./MaterialById/MaterialDetailsDrawer"));

function SuppliesTable(props) {
  
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openComplementary,setopenComplementary] = useState(false);
  const [openStatus,setopenStatus] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
         "799",//0
          "800",//1
          "110",//2
          "14",//3
          "1154",//4
          "259",//5
          "815",//6
          "679",//7
          "1068",//8
          "1174",//9
          "1173",//10
          "742",//11
          "824",//12
          "880",//13
          "170",//14
          "264",  // Brand15
          "265",// model16
         "100", // New17
        "",//  Updated18
       "1247", // Material Builder19
       "" , //  Tag Brand20
       "1259" , //  "Do you want to delete?"21
       "" , //  Complimentry22
       "1252" , //  "Print"23
       "880" ,// Supplies Id24
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
      <div className=" flex sticky z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[1rem] max-xl:w-[2rem]"></div>
            <div className="font-bold font-poppins text-xs w-[7.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* HSN */}
              {translatedMenuItems[0]} / {translatedMenuItems[24]}ID
              </div>
            {/* <div className="w-[6.15rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              Supplies ID 
              {translatedMenuItems[1]}
              </div> */}
            <div className="font-bold font-poppins text-xs w-[12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Name */}
              {translatedMenuItems[2]}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Category */}
              {translatedMenuItems[3]}
              </div>
            {/* <div className="font-bold font-poppins text-xs w-[7.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> */}
              {/* Sub Category */}
              {/* {translatedMenuItems[4]}
              </div> */}
              <div className="font-bold font-poppins text-xs w-[4.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Brand*/}
              {translatedMenuItems[15]}
              </div>
              <div className="font-bold font-poppins text-xs w-[4.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Model*/}
              {translatedMenuItems[16]}
              </div>
            <div className="font-bold font-poppins text-xs w-[5.0rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Attribute */}
              {translatedMenuItems[5]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.14rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Re-order level */}
              {translatedMenuItems[6]}
              </div>
            
            <div className="font-bold font-poppins text-xs w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Created */}
              {translatedMenuItems[7]}
              </div>
            {/* <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Unique ID</div> */}
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="font-bold font-poppins text-xs w-[8.8rem]">
              {/* Process */}
              {translatedMenuItems[8]}
              </div>
              <div className="font-bold font-poppins text-xs w-[5rem]">
              {/* recommend */}
              {translatedMenuItems[9]}
              
              </div>
              <div className="font-bold font-poppins text-xs w-[5rem]">
                {/* Featured */}
              {translatedMenuItems[10]}
              
              </div>
          </div>

          <InfiniteScroll
            dataLength={props.purchaseList.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingPurchaseList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"80vh"}
            style={{ scrollbarWidth:"thin" }}
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
                            <div className=" flex  w-[7rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem]   max-sm:w-auto">
                              <div className="flex max-sm:w-wk max-sm:justify-between ">
                                <div className=" flex items-center w-[3rem]">
                                  {item.imageId && (
                                    <span>
                                      <MultiAvatar
                                        imageId={item.imageId}
                                        imgWidth={"1.8rem"}
                                        imgHeight={"1.8rem"}
                                      />
                                    </span>
                                  )}
                                </div>
                                

                                <div class="max-sm:w-auto flex justify-start items-center flex-col w-[8rem]">

                                  <div className=" flex  w-[6rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                    <div class=" text-[0.65rem] max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                      {item.hsn} 
                                    </div>
                                    
                                  </div><span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                        <span className="text-[0.55rem] text-[tomato] font-bold">
                                          {translatedMenuItems[17]}  {/* New */}
                                        </span>
                                      ) : null} </span>
                                  {/* <div class=" max-sm:w-auto max-xl:w-[1.2rem] max-lg:w-[0.2rem]">
                                <div class="  text-green-700 text-[0.55rem] max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.modifiedAt ? "Updated" : null}
                                    {item.modifiedAt ? dayjs(item.modifiedAt).format("DD/MM/YYYY") : null}
                                    </div>
                                </div> */}
                                <div className=" flex  flex-row w-[10rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" w-[5.8rem] text-[0.65rem] max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.newSuppliesNo}
                              </div>
                            <div>  <span className="text-[0.5rem] text-green-700 font-bold font-poppins">
                                {item.modifiedAt ? translatedMenuItems[18] : null}
                                        </span></div>
                            </div>
                          
                                </div>
                              </div>
                            </div>
                            <div className=" flex  w-[10rem] max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.suppliesName}
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex  w-[11.1rem] max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs truncate max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.categoryName} / {item.subCategoryName}
                              </div>
                            </div>

                            
                            <div className=" flex  w-[7.12rem] max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.attributeName} / {item.subAttributeName}
                              </div>
                            </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                {item.reorder}
                              </div>
                            </div>

                           
                            <div className=" flex  w-[7.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MultiAvatar
                                  primaryTitle={item.userName}
                                  imageId={item.userImageId}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                {`${dayjs(item.creationDate).format("ll")}`}
                              </div>
                            </div>
                            <div className=" flex  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialStatusToggle
                                  publishInd={item.publishInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>
                            <div className=" flex  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between ml-2 max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialRecommendToggle
                                  recomendInd={item.recomendInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>
                            <div className=" flex  w-[3.8rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFifoToggle
                                  fifoInd={item.fifoInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>
                            <div className=" flex w-[3.8rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <MaterialFeatureToggle
                                  featureInd={item.featureInd}
                                  suppliesId={item.suppliesId}
                                />
                              </div>
                            </div>

                          </div>

                     <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       <div>
                        <Tooltip title={translatedMenuItems[11]}>
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
                              <Tooltip title={translatedMenuItems[19]}>
                                <ViewQuiltIcon
                                  className="cursor-pointer !text-icon"
                                  onClick={() => {
                                    props.handleMaterialBuilderDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div>
                              {props.repairInd && <Tooltip title={translatedMenuItems[20]}>
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
                              <Tooltip title={translatedMenuItems[12]}>
                                <CategoryIcon
                                  onClick={() => {
                                    props.handleSuppliersListDrawer(true);
                                    handleParticularRowData(item);
                                  }}
                                  className="!text-icon cursor-pointer"
                                />
                              </Tooltip>
                            </div>

                            <div>
                              <Tooltip title={translatedMenuItems[13]}>
                                <InventoryIcon className=" !text-icon cursor-pointer"  onClick={() => {
                                    props.handleMaterialInventory(true);
                                    handleParticularRowData(item);
                                  }}/>
                              </Tooltip>
                            </div>
                          <div class=" text-xs  font-poppins">
                        <Tooltip>
                        <ContactSupportIcon className="!text-icon cursor-pointer"
                        onClick={() => {
                          openModal();
                          handleParticularRowData(item);
                        }}
                        />
                        </Tooltip>
                      </div>
                           
                            <div>
                              <Tooltip title={translatedMenuItems[14]}>
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
                                title={translatedMenuItems[21]}
                                onConfirm={() => props.deletePurchaseData(item.suppliesId)}
                              >

                                <DeleteOutlined className=" !text-icon cursor-pointer text-[red]" />
                              </Popconfirm>
                            </div>
                            <Tooltip title={translatedMenuItems[22]}>
                            <div>
                             <FactCheckIcon
                             className="!text-icon cursor-pointer text-[pink]"
                              onClick={()=>{
                                setopenComplementary(true);
                                handleParticularRowData(item);
                              }}
                                
                             />
                              </div>
                              </Tooltip>

                              <div className=" flex ml-1  w-[4.01rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        <Tooltip title={translatedMenuItems[23]}
                                                        // {<FormattedMessage
                                                        //     id="app.Print"
                                                        //     defaultMessage="Print"
                                                        // />}\
                                                        >
                                                            {/* <PrintOutlined
                                                                            // onClick={handlePrint}
                                                                            className="!text-base cursor-pointer"
                                                                        /> */}
                                                            <ReactToPrint
                                                              trigger={() => <Button style={{cursor:"pointer", width:"-webkit-fill-available" }} onClick={handlePrint}>
                                                            {translatedMenuItems[23]}   {/* Print  */}
                                                                <QrCodeIcon className="!text-icon"/></Button>}
                                                                content={() => componentRefs.current[index]}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>

                                                <div style={{ display: "none", textAlign: "center" }}>

<div className=" flex flex-col mt-5 text-sm items-center"
    ref={(el) => (componentRefs.current[index] = el)}>
   
    <div   className=" text-5xl mt-8">
        <QRCode size={150} value={`material/${item.suppliesId}`} />
    </div>
    <div style={{ fontSize: "1.5rem" }}><span style={{ fontWeight: "bold" }}>{translatedMenuItems[24]}:</span> {item.suppliesId}</div>
</div>
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
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData}
          handlePriceModal={handlePriceModal}
          priceOpenModal={props.priceOpenModal}
        />
         <MaterialDetailsDrawer
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        particularDiscountData={particularDiscountData}
         modalVisible={modalVisible}
       closeModal={closeModal}
        />
 <MaterialComplementaryDrawer
  translateText={props.translateText}
  selectedLanguage={props.selectedLanguage}
   particularDiscountData={particularDiscountData}
      openComplementary={openComplementary}
      setopenComplementary={setopenComplementary}
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
