import React, { useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input, Select } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import {addProductBuilder} from "../../ProductAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import {getEquipment} from "../../../Settings/Category/Equipment/EquipmentAction";

const { Option } = Select;

function ProBuildSearchedCard (props) {

  useEffect(()=>{
    props.getEquipment();
  },[]);

  const [selectedEquipValues, setSelectedEquipValues] = useState([]);
 
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    setData(props.searchedBuilders.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.searchedBuilders]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };
  const handleSave = (key) => {
    console.log(key)
    const targetRow = data.find((row) => row.key === key);
    if (targetRow) {
      const { suppliesName,categoryName, subCategoryName, quantity,hsn,attributeName,imageId,suppliesId, productId,subAttributeName,steps,description} = targetRow;
     
      const result = {
        hsn: hsn,
        suppliesName:suppliesName,
        attributeName:attributeName,
        subAttributeName:subAttributeName,
              categoryName: categoryName,
              subCategoryName: subCategoryName,
              quantity:quantity,
              productId:props.particularDiscountData.productId,
              suppliesId:suppliesId,
              imageId:imageId,
              steps:steps,
              description:description,
              equipmentIds:selectedEquipValues,
            };
      props.addProductBuilder(result,props.particularDiscountData.productId)
    }
  };

  const handleSelectChange = (values) => {
    setSelectedEquipValues(values); 
  };

  if(props.fetchingSearchedBuilders) {
  return <BundleLoader/>
  }

  if (isMobile){
    return (
      <>
   <div className=' flex justify-end sticky z-auto'> 
   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         
          {data.map((item) => {
          return (
<div key={item.suppliesId}>
<div
                  className="flex flex-col rounded justify-between bg-white mt-1 h-8 items-center p-1"
                >
                  <div class="flex items-center w-wk ">
                    <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
                      <div className="flex max-sm:w-full ">
                        <div class="w-8">
                         
                        <MultiAvatar
                            imageId={item.imageId}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                         
                        </div>
                        <div class="w-[4%]"></div>
  
                        <div class="w-full flex items-center">
                          
                            <div class="max-sm:w-full justify-between flex md:flex-col">
                              <div class="text-sm  font-semibold font-poppins cursor-pointer w-28">
                              {item.suppliesName}
                                
                              </div>
                            </div>
                     
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-full ">
                    <div className=" flex font-medium f ">
                    
                      <div class=" text-xs  font-poppins">
                      {item.categoryName}
                        
                      </div>
                    </div>
                    <div className=" flex font-medium ">
                     
                      <div class=" text-xs  font-poppins">
                      {item.subCategoryName}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium flex-col w-16">
                     
                      <div class=" text-xs  font-semibold  font-poppins">
                      <Input
className="w-16"
  value={item.quantity}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'quantity')}
/>
                      </div>
                    </div>
                    <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    <Button type="primary" onClick={() => handleSave(item.key)}>
          Save
        </Button>
                    </div>
  
                  
                  </div>
                
                     
                   
                </div>
</div>
          );
        })}
             
              </div>
              </div>
      </>
    );
    }

return (
    <>
   <div>
   <div className=' flex justify-end sticky z-auto'> 
   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=""></div>
          <div className="md:w-[7rem]">HSN</div>
          <div className="md:w-[8rem]">Name</div>
         <div className=" md:w-[4.2rem]">Category</div>
         <div className="md:w-[5.8rem]">Attribute</div>
         <div className="md:w-[5.8rem]">Equipment</div>
         <div className=" md:w-[4.2rem]">Unit</div>
         <div className=" md:w-[4.2rem]">Step</div>
         <div className=" md:w-[4.2rem]">Description</div>
      <div className="w-12"></div>
             </div>
                    {data.map((item) => {
          return (
<div key={item.suppliesId}>
<div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
<div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
                    <div className="flex max-sm:w-full ">
                      <div>
                       
                         <MultiAvatar
                            imageId={item.imageId}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
      
                      <div class="max-sm:w-full md:flex items-center">
                     
                      <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:w-full  ">
    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                              {item.hsn}
                            </div>
    </div>
                      </div>
                    </div>
                  </div>
         
                     <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:w-full  ">
   <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                             {item.suppliesName}
                           </div>
   </div>
                   
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs  font-poppins">
                      
                      {item.categoryName}  {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs  font-semibold  font-poppins">
                      {item.attributeName}  {item.subAttributeName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">
      <Select
                        classNames="w-32"
                        showSearch
                        placeholder="Search or select include"
                        optionFilterProp="children"
                        // value={item.currencyName}
                        onChange={handleSelectChange}
                        mode="multiple" 
                      >
                       {props.equipmentListData.map((d) => (
                          <Option key={d.equipmentId} value={d.equipmentId}>
                            {d.name}
                          </Option>
                        ))} 
                      </Select>
                  </div>
  </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">  
                       <Input
  style={{ width: "4rem" }}
  value={item.quantity}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'quantity')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">  
                    
                       <Input
  style={{ width: "4rem" }}
  value={item.steps}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'steps')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs  font-semibold  font-poppins">  
                       <Input
  style={{ width: "4rem" }}
  value={item.description}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'description')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
  <Button type="primary" onClick={() => handleSave(item.key)}>
          Save
        </Button>
      
  </div>
 
</div>
</div>
          );
        })}
             
              </div>
              </div>
 
 

    </div>
    </>
);
}

const mapStateToProps = ({product,equipment }) => ({
    searchedBuilders: product.searchedBuilders,
    fetchingSearchedBuilders: product.fetchingSearchedBuilders,
    equipmentListData:equipment.equipmentListData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          addProductBuilder,
          getEquipment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);
