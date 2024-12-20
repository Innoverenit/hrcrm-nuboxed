import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Tabs,Spin,Input } from "antd";
import dayjs from "dayjs";
import { MultiAvatar, Select } from "../../../../Components/UI/Elements";
import{
  // getAlLoCell,
  getCatalogueCell,
  getcellCardList,
  addLocationCell
} from "../../../Event/Child/Location/LocationAction";
import ProductCellToggle from "./ProductCellToggle";
import { BundleLoader } from "../../../../Components/Placeholder";

const { Option } = Select;

const { TabPane } = Tabs;


const ProductCellCard = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  
  console.log(activeTab)
    useEffect(()=>{
     
        props.getCatalogueCell(props.orgId)
    },[]);

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
   
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
        "744",  //  "Cell",//0
         "1622", //   "Tag Production",//1
         "1623", //   "Target Units/day",//2
          "154",//   "Submit"
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);





    useEffect(() => {
      if (activeTab) {
        props.getcellCardList(activeTab,props.particularDiscountData.productId)
      }
    }, [activeTab]);
    // const initialInputs = {};
    // props.cellCardList.forEach(item => {
    //   initialInputs[item.cellChamberLinkId] = item.unitPerDay || "0"
    // });
  
    const [inputs, setInputs] = useState({});
    useEffect(() => {
      const updatedInputs = {};
      props.cellCardList.forEach((item) => {
        updatedInputs[item.cellChamberLinkId] = item.unitPerDay || "0"; // Default to "0" if unitPerDay is null/undefined
      });
      setInputs(updatedInputs);
    }, [props.cellCardList]);
  
    const handleInputChange = (cellChamberLinkId, value) => {
      setInputs({ ...inputs, [cellChamberLinkId]: value });
    };



    const handleSubmit = (cellChamberLinkId) => {
      const inputValue = inputs[cellChamberLinkId] || '0';
      const cellChhamberValue = props.cellCardList.find(item => item.cellChamberLinkId === cellChamberLinkId)?.locationDetailsId || '';
  
      console.log('Cell ID:', cellChamberLinkId, 'User Input:', inputValue, 'Cell Chamber:', cellChhamberValue);
      let data={
        LocationDetailsId:cellChhamberValue,
        productId:props.particularDiscountData.productId,
        unitPerDay:inputValue,
        cellChamberLinkId:cellChamberLinkId,

      }
      props.addLocationCell(data)
  
      // const updatedData = data.map(item => {
      //   if (item.cellId === cellId) {
      //     return { ...item, amount: inputValue };
      //   }
      //   return item;
      // });
  
      // Update the state to reflect the new data with updated amount
      // setData(updatedData); // Assuming you have a way to update the state with updatedData
    };



    const handleTabClick = (key) => {
      setActiveTab(key)
      //props.getcellCardList(key,props.particularDiscountData.productId);
      //props.getMatrixdata(key,props.particularDiscountData.productId);
    };



    useEffect(() => {
      if (props.catalogueCell.length > 0) {
        setActiveTab(props.catalogueCell[0]?.locationDetailsId);
      }
    }, [props.catalogueCell]);

if(props.fetchingCatalogueCell){
  return <BundleLoader/>;
}

    return (
      <>
       <Tabs type="card" 
      // activeKey={activeTab} 
      defaultActiveKey={activeTab}
     onChange={handleTabClick}
       >
      {props.catalogueCell.map(item => (
        <TabPane 
        key={item.locationDetailsId} 
        tab={item.locationName}>
         {props.fetchingCellCardList ? (
             <div class=" flex justify-center items-center h-[60vh]" >
             <BundleLoader/>
           </div>
          ) : (
            <div className=' flex sticky z-auto'>
            <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
              <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">      
                <div className=""></div>
                <div className=" md:w-[6rem]">#{translatedMenuItems[0]}</div>
                <div className="md:w-[7.2rem] ">
                {translatedMenuItems[1]}
                {/* Tag Production */}
                </div>
                <div className="w-[7rem]">
                {translatedMenuItems[2]} {/* Target Units/day */}
                  </div>    </div>
                
    
               {props.cellCardList .sort((a, b) => b.usedInd - a.usedInd)
  .map((item) => {
                return (
                  <div >
                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1">
    
                      <div className=" flex   md:w-[9.1rem] max-sm:w-full  ">
                        <div class="text-xs  font-bold  font-poppins cursor-pointer h-8  shadow-[#a3abb980] bg-[white]">
                          <div className="font-poppins ">
                            <div> {item.cellChamber}</div>
                          </div>
                        </div>
                      </div>
    
                      <div className=" flex    md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  h-8 shadow-[#a3abb980] bg-[white] ">
    
                        <div class=" text-xs  font-poppins">
                        
                          <div className="   font-poppins">
                            <ProductCellToggle 
                            cellId={item.cellId}
                            usedInd={item.usedInd}
                            cellChamberLinkId={item.cellChamberLinkId}
                            item={item}  
                            particularDiscountData={props.particularDiscountData}/>
                          </div>
                    
                        </div>
    
                      </div>
                      <div className="flex   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between">
              <div className="text-xs  font-poppins">
                <div className="   font-poppins" style={{display:"flex",width:"14em"}}>
                  {item.usedInd ? (
                    <>
                      <Input
                       value={inputs[item.cellChamberLinkId]}
                       onChange={(e) => handleInputChange(item.cellChamberLinkId, e.target.value)}
                        //value={productionInput}
                        //onChange={(e) => setProductionInput(e.target.value)}
                        className="mr-2"
                        placeholder="Enter units"
                      />
                      <Button
                      style={{ marginLeft:"0.5rem"}}
                        type="primary"
                        onClick={() => handleSubmit(item.cellChamberLinkId)}
                      >
                        {translatedMenuItems[3]}{/* Submit */}
                      </Button>
                    </>
                   ) : null} 
                </div>
              </div>
            </div>



            <div className="flex   md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="  text-[0.85rem]  font-poppins" style={{ marginLeft: "9em" }}>
                                      {item.updatedBy!=null&&
                                    <MultiAvatar
                                                                    primaryTitle={item.updatedBy}
                                                                    imgWidth={"1.8rem"}
                                                                    imgHeight={"1.8rem"}
                                                                />

                                      }
                                        {item.updatedBy!=null&&
                                        <>
                                      {`  ${dayjs(item.creationDate).format("DD-MM-YYYY")}`}
                                      </>
                                        }
                                    </div>
                                </div>
                     
                     
    
                  
    
                    </div>
                  </div>
                );
              })} 
    
            </div>
          </div> 
        
          )}
        </TabPane>
   ))}
    </Tabs>


      </>
    );
   }

const mapStateToProps = ({ auth,location,distributor, departments, }) => ({
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    locationId:auth.userDetails.locationId,
    allLoCell:location.allLoCell,
    catalogueCell:location.catalogueCell,
    cellCardList:location.cellCardList,
    fetchingCellCardList:location.fetchingCellCardList,
    fetchingCatalogueCell:location.fetchingCatalogueCell,
    fetchingCellCardList:location.fetchingCellCardList

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getAlLoCell,
            getCatalogueCell,
            getcellCardList,
            addLocationCell
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCellCard);
