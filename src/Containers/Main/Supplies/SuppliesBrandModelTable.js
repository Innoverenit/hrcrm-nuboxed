import React, { useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Input } from "antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import {
    getBrandModel,
    addBrandModel,
} from "../../Settings/Category/Brand&Model/BrandModelAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const SuppliesBrandModelList = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [brandModel, setBrandModelData] = useState(props.brandModel);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    
    const [newModelName, setModelName] = useState('');
    const [newBrandModelName, setBrandModelName] = useState('');

    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
       
          const itemsToTranslate = [
  
     "1238", // "Search by Name"', // 0
     "265",//"model" // 1
     "1078",// Save, // 2
     "1079",// Cancel, // 3
     "1612",// 'Add More', // 4
     "100",// '  New', // 5
    "1611",//  Updated on
   "1335", // by
   "264", // brand"

     
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
        props.getBrandModel(props.orgId); 
        // props.getShipByCount(props.orgId) 
    }, [])
  
    const editRegion = (phoneMasterListId, name) => {
      console.log(name)
      console.log(name)
        setEditingId(phoneMasterListId);
        setBrandModelName(name);
    };
  
  
  
    const handleAddBrandModel = () => {
        setAddingRegion(true);
        setBrandModelName("")
        setModelName("")
    };
  
    const handleUpdateBrandModel=(region)=>{
        console.log(region)
        let data={
            phoneMasterListId:region.phoneMasterListId,
          brand:newBrandModelName,
          model:newModelName,
         
        }
  props.updateShipBy(data,region.phoneMasterListId)
  setEditingId(null);
    }
  
    const handleBrandModel = () => {
        // if (newRegionName.trim() !== '') {
        //     console.log("New Region:", newRegionName);
        //     const newRegion = {
        //         id: Date.now(),
        //         item: newRegionName
        //     };
        //     setRegions([...regions, newRegion]);
        //     setNewRegionName('');
        //     setAddingRegion(false);
        // }
        let data={
          brand:newBrandModelName,
          model:newModelName,
          orgId:props.orgId,
        }
        props.addBrandModel(data,props.orgId)
        setAddingRegion(false)
    };
    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getShipByData(props.orgId);
        //   props.ClearReducerDataOfLoad()
        }
      };
  
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchShipByName(currentData);
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };
  
    const handleCancelAdd = () => {
        setBrandModelName('');
        setModelName("");
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        
        if (props.brandModel.length > 0) {
          
            setBrandModelData(props.brandModel);
        }
      }, [props.brandModel]);
  
  // console.log(regions)
  if (props.fetchingBrandModel) {
  return <div><BundleLoader/></div>;
  }
    return (
      <>
      <div class="" >
       
       <div class="flex flex-row justify-between">
             <div class=" flex w-[18vw]" >
            <Input
         placeholder={translatedMenuItems[0]}
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
            </div>
            <div className="add-region">
                {addingRegion ? (
                    <div>
                        <input 
                        style={{border:"2px solid black"}}
                            type="text" 
                            placeholder={translatedMenuItems[8]}
                            value={newBrandModelName} 
                            onChange={(e) => setBrandModelName(e.target.value)} 
                        />
                          <input 
                            placeholder={translatedMenuItems[1]} 
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newModelName} 
                            onChange={(e) => setModelName(e.target.value)} 
                        />
                        <button 
                           loading={props.addingItemTask}
                        onClick={handleBrandModel}>{translatedMenuItems[2]} </button>
                        <button onClick={handleCancelAdd}>{translatedMenuItems[3]} </button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddBrandModel}> {translatedMenuItems[4]} </button>
                )}
            </div>
            </div>

    
            

            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {!props.fetchingBrandModel && brandModel.length === 0 ? <NodataFoundPage /> : brandModel.map((region, index) => (
     
              <div className="flex rounded ml-1 font-bold  font-poppins text-xs shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.phoneMasterListId}>
              {/* Region name display or input field */}
              
              {editingId === region.phoneMasterListId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newBrandModelName}
                      onChange={(e) => setBrandModelName(e.target.value)}
                  />
              ) : (
                  <div >{region.brand}</div>
              )}
               {editingId === region.phoneMasterListId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newModelName}
                      onChange={(e) => setModelName(e.target.value)}
                  />
              ) : (
                  <div style={{width:"39rem"}}>{region.model}&nbsp;&nbsp;&nbsp;
                  {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                         {translatedMenuItems[5]}  {/* New */}
                                        </span> : null}</div>
              )}
  
             
          </div>
         ))}
</MainWrapper>
            </div>
   
        </div>
         <div class=" font-bold">{translatedMenuItems[6]} {dayjs(props.brandModel && props.brandModel.length && props.brandModel[0].updationDate).format('YYYY-MM-DD')} {translatedMenuItems[7]}  {props.brandModel && props.brandModel.length && props.brandModel[0].updatedBy}</div>
    </>
         );
  };



const mapStateToProps = ({ brandmodel, auth }) => ({
    addingBrandModel: brandmodel.addingBrandModel,
    addingBrandModelError: brandmodel.addingBrandModelError,
    brandModel: brandmodel.brandModel,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingBrandModel: brandmodel.fetchingBrandModel,
    fetchingBrandModelError: brandmodel.fetchingBrandModelError,
    updatingBrandModel: brandmodel.updatingBrandModel
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBrandModel,
            addBrandModel,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesBrandModelList);
