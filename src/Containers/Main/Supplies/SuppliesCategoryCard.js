import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { Button, Tooltip,Input,Popconfirm } from "antd";
import SuppliesQualityCheckModal from "./SuppliesQualityCheckModal"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getMaterialCategory } from "./SuppliesAction";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import CableIcon from '@mui/icons-material/Cable';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SuppliesCategoryPUnblishToggle from "./SuppliesCategoryPUnblishToggle";
import SuppliesAddQualityCheckModal from "./SuppliesAddQualityCheckModal"
import WidgetsIcon from '@mui/icons-material/Widgets';
const SuppliesCategoryModal = lazy(() => import("./SuppliesCategoryModal"));


function SuppliesCategoryCard(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [drb, setDrb] = useState([]);
  const [error, setError] = useState(null)

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };




  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };



  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };
  const handleSuppliesCategoryModal = () => {
    openModal(); 
  };


  const handleSuppliesQualityModal = () => {
    openModal1(); 
  };


  function handleSetCurrentCategory(item) {
    setCurrentCategory(item);
    // console.log("opp",item);
  }


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
            "14",//0
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

//   useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true); 
//         try {
//             const response = await axios.get(`${base_url2}/supplies/allSuppliesCatagory`,{
//                 headers: {
//                   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//                 },
//               }); 
//               console.log('API Response:', response.data);
//               const data = response.data;
//               if (data.length === 0) {
//                 setHasMore(false);
//               }
//               setDrb(prevData => [...prevData, ...data]);
//             } catch (error) {
//               setError(error);
//               console.error('Error fetching data:', error);
//             } finally {
//               setLoading(false);
//             }
//           };

//     fetchData();
// }, []);

useEffect(()=>{props.getMaterialCategory()},[]);
useEffect(() => {
  setData(props.materialCategorys);
}, [props.materialCategorys]);



  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [data, setData] = useState([]);

  
    const handleInputChange = (value, key, dataIndex) => {
        const updatedData = data.map((item) =>
            item.categoryId === key ? { ...item, [dataIndex]: value } : item
        );
        setData(updatedData);
    };
    const [newimageId, setnewimageId] = useState("");
    function handleSetImage(imageId) {
      setnewimageId(imageId);
    }

    const handleEditClick = (categoryId) => {
        setEditsuppliesId(categoryId);
      };
      const handleCancelClick = (categoryId) => {
        setEditedFields((prevFields) => ({ ...prevFields, [categoryId]: undefined }));
        setEditsuppliesId(null);
      };

  
      const handleSuppliesEditQualityModal = () => {
        openModal2(); 
      };

      const handleSave = async (item) => {
        console.log(item)
        const updatedItem = {
            // orderId:props.particularRowData.orderId,
            categoryName: item.categoryName, 
            imageId: newimageId
        }; 
     console.log("resd",updatedItem);  
     try {

      const response = await axios.put(`${base_url2}/supplies/suppliescatagory/${item.categoryId}`, updatedItem);
      console.log("API Response:", response.data);
      setDrb(prevData => 
        prevData.map(cat =>
          cat.categoryId === item.categoryId ? response.data : cat
        )
      );
  
      setEditsuppliesId(null);
  
    } catch (error) {
      // Handle errors
      console.error("Error updating item:", error);
      setEditsuppliesId(null);
    }
  };
console.log("drb2",data)
  return (
    <>

      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 h-[87vh] max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end z-10"> 
            <div class="w-[6rem]"></div>         
            <div className=" text-[#00A2E8] text-sm w-[48.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.5rem] max-lg:w-[6.7rem]">
            <WidgetsIcon className='!text-icon    text-[#42858c]' />   {translatedMenuItems[0]}   {/* Category */}
              </div>
            {/* <div className=" w-[4.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[4.11rem]"></div> */}

            <div className="  w-[25.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[4.11rem]">Alert</div>  {/*{translatedMenuItems[1]} */}
            <div className=" w-[4.11rem]  max-xl:w-[5.11rem] max-lg:w-[4.11rem]">Alert</div>
            <div className=" flex  w-[9rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Add">
                          <Button type="primary"
                            className="!text-sm cursor-pointer text-[tomato]"
                            onClick={handleSuppliesCategoryModal}>+ Add Category</Button>
                        
                        </Tooltip>
                      </div>


                    </div>
          </div>
          
            {data.map((item) => {
              return (
                <div>
                  <div key={item.categoryId} className="flex rounded justify-between mt-1 bg-white  items-center py-ygap max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                 
                    <div className=" flex border-l-2 border-green-500 bg-[#eef2f9] h-8  w-[5.21rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                <div class=" text-xs flex items-center max-sm:text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                {editsuppliesId === item.categoryId ? (
                    
                    <EditUpload
                    imageId={item.imageId}
                    imgWidth={100}
                    imgHeight={100}
                    getImage={handleSetImage}
                  />
                       
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <div> 
                            {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                             
                            />
                          ) : (
                            <div class="font-bold ml-gap flex text-xs" >
                              No Image
                            </div>
                          )}
                          </div>
                      </div>
                    )}                                    
</div>
     </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex  w-[43.1rem] items-center h-8 ml-gap bg-[#eef2f9]   max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-[0.65rem]  cursor-pointer max-sm:text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {editsuppliesId === item.categoryId ? (
                            <Input
                            style={{ width: "3rem" }}
                            value={item.categoryName}
                            onChange={(e) => handleInputChange(e.target.value, item.categoryId, 'categoryName')}
                          />
    
                    ) : (
                      <div className=" text-xs ml-gap font-poppins">
                        <div>  {item.categoryName}</div>
                      </div>
                    )}
              </div>
                      </div>
      
                    </div>

     <div className=" flex  w-[11.02rem] h-8 ml-gap bg-[#eef2f9] justify-center  items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" flex items-center text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuppliesCategoryPUnblishToggle
                                
                                  publishInd={item.publishInd}
                                  categoryId={item.categoryId}
                                />
                              </div>
                            </div>


                            <div className=" flex  w-[10.03rem] h-8 ml-gap bg-[#eef2f9] justify-center    items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" flex items-center text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              <CircleNotificationsIcon
                               onClick={() => {
                                handleSuppliesEditQualityModal();
                                handleSetCurrentCategory(item);
                              }}
                              
                              />
                              </div>
                            </div>

                            <div className=" flex  w-[10.04rem] h-8 ml-gap bg-[#eef2f9] justify-center    items-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center  text-xs max-sm:text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              <CableIcon
                               onClick={() => {
                                handleSuppliesQualityModal();
                                handleSetCurrentCategory(item);
                              }}
                              
                              />
                              </div>
                            </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                     
                     
                    
                   <div className=" flex font-medium h-8 ml-gap bg-[#eef2f9] justify-center   items-center md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.categoryId ? (
                        <>
                      <Button 
                      type="primary"
                    //   loading={props.updatingOrdrSuplrItems}
                      onClick={() => handleSave(item)}
                      >
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.categoryId)} className="ml-[0.5rem]"
                        >
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center h-8 ml-gap bg-[#eef2f9] "
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.categoryId)}
                      />
                    )}
   
    {item.categoryCount===1 &&
    <div className=" flex bg-[#eef2f9] justify-center   items-center">
                              <Popconfirm
                                title="Do you want to delete?"
                                // onConfirm={() => DeleteOnClick(item)}
                              >

                                <DeleteOutlineIcon className=" !text-icon cursor-pointer text-[red]" />
                              </Popconfirm>
                            </div>}
                    </div>
                    </div>
                  </div>
                </div>
               );
            })} 
          
        </div>
      </div>
      <Suspense fallback={"Loading"}>
      <SuppliesCategoryModal
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
           modalVisible={modalVisible}
           closeModal={closeModal}
           handleSuppliesCategoryModal={handleSuppliesCategoryModal}
        />
          <SuppliesQualityCheckModal
      translateText={props.translateText}
      currentCategory={currentCategory}
      selectedLanguage={props.selectedLanguage}
          modalVisible1={modalVisible1}
          closeModal1={closeModal1}
          handleSuppliesQualityModal={handleSuppliesQualityModal}
        />



<SuppliesAddQualityCheckModal

      translateText={props.translateText}
      currentCategory={currentCategory}
      selectedLanguage={props.selectedLanguage}
          modalVisible2={modalVisible2}
          closeModal2={closeModal2}
          handleSuppliesEditQualityModal={handleSuppliesEditQualityModal}
        />
      </Suspense>
    </>
  );
}


const mapStateToProps = ({ supplies, auth }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  materialCategorys:supplies.materialCategorys
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialCategory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliesCategoryCard);
