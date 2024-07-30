import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import { Button, Tooltip,Input } from "antd";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getSuppliesCategory } from "./SuppliesAction";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditUpload from "../../../Components/Forms/Edit/EditUpload";

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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleSuppliesCategoryModal = () => {
    openModal(); 
  };


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
          
            "Category",//0
           
            

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
    const fetchData = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`${base_url2}/supplies/allSuppliesCatagory`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              }); 
            if (response.drb.length === 0) {
                setHasMore(false); 
            }
            setDrb(prevData => [...prevData, ...response.drb]); 
        } catch (error) {
            setError(error); 
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
        }
    };

    fetchData();
}, []);


  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const [editedFields, setEditedFields] = useState({});
    const [editsuppliesId, setEditsuppliesId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(drb);
    }, [drb]);

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

      const handleSave = async (item) => {
        console.log(item)
        const updatedItem = {
            categoryId:item.categoryId,
            // orderId:props.particularRowData.orderId,
            categoryName: item.categoryName, 
            imageId: newimageId
        }; 
     console.log("resd",updatedItem);  
     try {

      const response = await axios.put(`${base_url2}/supplies/suppliescatagory/${item.categoryId}`, updatedItem, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
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

  return (
    <>

      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 h-[85vh] max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky  z-10">          
            <div className=" w-[6.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.5rem] max-lg:w-[6.7rem]">
            {translatedMenuItems[0]}   {/* Category */}
              </div>
            <div className=" w-[4.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.11rem] max-lg:w-[4.11rem]"></div>
            <div className=" flex font-medium flex-col w-[1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Add">
                          <AddCircleIcon
                            className="!text-icon cursor-pointer text-[tomato]"
                            onClick={handleSuppliesCategoryModal}
                          />
                        </Tooltip>
                      </div>


                    </div>
          </div>
          
            {data.map((item) => {
              return (
                <div>
                  <div key={item.categoryId} className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    

                      <div className=" flex font-medium flex-col  w-[7.1rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

                        <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {editsuppliesId === item.categoryId ? (
                            <Input
                            style={{ width: "3rem" }}
                            value={item.categoryName}
                            onChange={(e) => handleInputChange(e.target.value, item.categoryId, 'categoryName')}
                          />
                      
                       
                    ) : (
                      <div className="font-normal text-sm  font-poppins">
                        <div>  {item.categoryName}</div>
                      </div>
                    )}
                         
                        </div>

                      </div>
      
                    </div>
                    <div className=" flex font-medium flex-col  w-[7.21rem] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{editsuppliesId === item.categoryId ? (
    
    <EditUpload
    imageId={item.imageId}
    imgWidth={100}
    imgHeight={100}
    getImage={handleSetImage}
  />
                       
                    ) : (
                      <div className="font-normal text-sm  font-poppins">
                        <div> 
                            {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8em"}
                              imgWidth={"1.8em"}
                              imgRadius={20}
                            />
                          ) : (
                            <div class="font-bold text-xs" >
                              No Image
                            </div>
                          )}
                          </div>
                      </div>
                    )}
                          {/* {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8em"}
                              imgWidth={"1.8em"}
                              imgRadius={20}
                            />
                          ) : (
                            <div class="font-bold text-xs" >
                              No Image
                            </div>
                          )} */}
                      
</div>

</div>
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                     
                     
                    
                   <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                      className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.categoryId)}
                      />
                    )}
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
           modalVisible={modalVisible}
           closeModal={closeModal}
           handleSuppliesCategoryModal={handleSuppliesCategoryModal}
        />
      </Suspense>
    </>
  );
}


const mapStateToProps = ({ product, auth, supplies }) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  categoryProducts:product.categoryProducts
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // handleCategoryModal,
        // getCategory
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliesCategoryCard);
