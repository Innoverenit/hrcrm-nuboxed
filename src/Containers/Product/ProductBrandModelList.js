import React, { useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Input } from "antd";
import { MainWrapper } from "../../Components/UI/Layout";
import { BundleLoader } from "../../Components/Placeholder";
import {
    getBrandModel,
    addBrandModel,
} from "../Settings/Category/Brand&Model/BrandModelAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import "./Product.scss";
import Tooltip from '@mui/material/Tooltip';
import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const ProductBrandModelList = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [brandModel, setBrandModelData] = useState(props.brandModel);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    
    const [newModelName, setModelName] = useState('');
    const [newBrandModelName, setBrandModelName] = useState('');

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
     
            
              "110",//Search by Name
             "264",//Brand
              "265",// Model
               
                "1078", // Save
                "1079",// Cancel
               "1612", // Add More
             "100", //  New
               "1611", // Updated on
             "1335", //  by
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
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
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 4, itemToScroll: 4 },
    { width: 1100, itemsToShow: 5, itemToScroll: 5 },
  ];

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
                            placeholder={translatedMenuItems[1]}
                            value={newBrandModelName} 
                            onChange={(e) => setBrandModelName(e.target.value)} 
                        />
                          <input 
                            placeholder={translatedMenuItems[2]}
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newModelName} 
                            onChange={(e) => setModelName(e.target.value)} 
                        />
                        <button 
                           loading={props.addingItemTask}
                        onClick={handleBrandModel}>{translatedMenuItems[3]}</button>
                        <button onClick={handleCancelAdd}>{translatedMenuItems[4]}</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddBrandModel}> {translatedMenuItems[5]}</button>
                )}
            </div>
            </div>

    
            

    
         
            <div class="h-[24rem] overflow-auto">

<CardWrapper>
<Carousel
    // ref={carouselRef}
    pagination={false}
    breakPoints={breakPoints}
    style={{ minHeight: "6em", justifyContent: "center" }}
    class="w-2/12 mt-8 ml-margin10"
    // onNextEnd={next}
    // onPrevEnd={previous}
                   >
              {brandModel.map((item, index) => {
                 const currentdate = dayjs().format("YYYY/MM/DD");
                 const date = dayjs(item.creationDate).format("YYYY/MM/DD");
                
                 return (
                  <CardElement >
                    <div  key={item.phoneMasterListId} className="card-element">
<div class=" h-[18rem] flex-col flex bg-[cornsilk] items-center scale-90 hover:scale-95 ease-in  duration-500 hover:shadow-lg  w-[18rem] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 object-cover object-center max-sm:w-48 flex-grow-3 md:flex-grow-0">
<div class="mt-1"> 
<Tooltip title={item.brand} placement="top" arrow>
                             
                             <Header>{item.brand || ""}</Header>
                           </Tooltip>
</div>
<div class="max-sm:mr-0 md:flex  my-2 h-hwk">
                              {/* <div class="object-cover object-center  flex items-center">
                                <div>
                            <img
                                        src={`${base_url}/image/${item.imageId}`} alt=""
                                        style={{ height: "7rem", width: "7rem" }}
                                    />
                                     <h3>{item.newProductNo} </h3>  
                                     </div>
                                                      </div>   */}
                                                                                                   
                                                      <div class="w-40  flex justify-between max-sm:flex items-center  flex-col">
                                                      {/* <div class=" flex justify-evenly place-items-baseline flex-col max-sm:w-48  flex-auto ">
                                                      <div className="add-minus-quantity">
      <span

      >
             <MinusOutlined onClick={() => handleDecrement(item.productId)}/>
      </span>
    
      <input type="number"  
       value={units[item.productId] || 1}
       onChange={(event) => handleQuantityChange(event, item.productId)}
      min="1" 
      step="1" 
      />
     
      <span

      >
       <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" onClick={() => handleIncrement(item.productId)} />
      </span>

    </div>
       
                      
                                                 
                                                            </div> */}
                                                      <h3 class=" mt-2 h-4 font-bold text-xs ">
                                                        {item.model} &nbsp;&nbsp;&nbsp;
                                                        {dayjs(item.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                         {translatedMenuItems[6]} {/* New */}
                                        </span> : null}
                                                      </h3>
                                                      <h3 class=" mt-2 h-4 font-bold text-xs ">
                                                        {item.subCategoryName}
                                                      </h3> 
                                                    </div>

                                                    </div>
                                                    
                                                    {/* <div class="flex justify-between m-2 w-wk max-sm:w-40 items-baseline md: " >
                                                        <Desc> {item.description === "null" ? "No Description" : `${item.description}`}</Desc>
                                                        {item.description === "<h3></h3>\n" ? null : (
                                                          <Tooltip
                                                            style={{ backgroundColor: "red" }}
                                                            title={
                                                              <Desc2>{item.description === "null" ? "No Description" : `${item.description}`}</Desc2>
                                                            }
                                                            placement="top"
                                                            arrow
                                                          >
                                                            <span
                                                              style={{
                                                                cursor: "pointer",
                                                              }}
                                                            >
                                                              <InfoCircleTwoTone class=" flex items-center"/>
                                                            </span>
                                                          </Tooltip>
                                                        )}
                                                      </div> */}
                                                      <div class="mt-px flex  justify-end w-wk m-1">
                   {/* <div className=" py-1 px-4 bg-slate-100 border-2 border-blue-300 hover:bg-ShopBlue cursor-pointer"
                                                            
                                      
                                                            onClick={() =>
                                                              handleAddToCart(
                                                                item.productId
                                                              )
                                                            }
                                                          >
                                                              <label class=" text-gray-700 font-light text-base  flex  justify-center items-center hover:text-white cursor-pointer">
                                                        Add +
                                                          </label>
                                                          </div> */}
</div>
                   </div>
                   </div>
                 </CardElement>
                );
              })}
              </Carousel>
              {/* {!hasMore && <p className="text-center text-red-500">End of the list.</p>} */}
        </CardWrapper>    

</div>
            </div>
   
   
         <div class=" font-bold">{translatedMenuItems[7]}{dayjs(props.brandModel && props.brandModel.length && props.brandModel[0].updationDate).format('YYYY-MM-DD')} {translatedMenuItems[8]} {props.brandModel && props.brandModel.length && props.brandModel[0].updatedBy}</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandModelList);

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media only screen and (max-width: 600px) {
    justify-content: center;
    flex-direction: column;
  }
`;
const CardElement = styled.div`

  /* border:2px solid orange */
   padding: 0 10px;
   margin-top: 2.5em;
  display: flex;
    justify-content: center;
  /* margin:0px 20px; */
  @media only screen and (max-width: 600px) {
    display: flex;
    padding:0;
    margin-top: 1rem;
    justify-content: center;
    width: 100%;
  }
`;
const Header = styled.div`
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1.3em;
  font-family: Poppins;
  font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%
text-align:center
  }
`;
const Desc = styled.p`
  height: 1.5em;
  overflow: hidden;
  padding: 1%;
  text-align: center;
`;
const Desc2 = styled.p`
  height: 60px;
  overflow: auto;
  color: white;
  padding: 3%;
  text-align: center;
`;