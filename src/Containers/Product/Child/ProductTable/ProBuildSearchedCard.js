// import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import ProBuildSearchedToggle from "./ProBuildSearchedToggle";
// import { MultiAvatar } from "../../../../Components/UI/Elements";

// function ProBuildSearchedCard (props) {

// return (
//     <>
  
//   <div className=' flex justify-end sticky z-auto'> 
//   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
//          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
//          <div className=""></div>
//          <div className=" md:w-[7%]">Name</div>
//         {/* <div className=" md:w-[6.1rem]">Description</div> */}
//         <div className=" md:w-[4.2rem] ">Category</div>
//         <div className="md:w-[5.8rem]">Sub Category</div>
//         <div className=" md:w-[4.2rem] ">Unit</div>
//         <div className="w-12"></div>
//             </div>
      
//              {props.searchedBuilders.map((item) => {
//           return (
// <div>
// <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 "    >
// <div className=" flex font-medium flex-col w-[10rem]   max-sm:w-full">
//                     <div className="flex max-sm:w-full ">
//                       <div>
                       
//                          <MultiAvatar
//                             // primaryTitle={item.name}
//                             imageId={item.imageId}
//                             // imageURL={item.imageURL}
//                             imgWidth={"1.8rem"}
//                             imgHeight={"1.8rem"}
//                           />
                       
//                       </div>
//                       <div class="w-[4%]"></div>

//                       <div class="max-sm:w-full md:flex items-center">
                     
//                       <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:w-full  ">
//     <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
//                               {item.name}
//                             </div>
//     </div>
//                       </div>
//                     </div>
//                   </div>

//     <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
//     <div class=" text-xs text-cardBody font-poppins">
                      
//                       {item.categoryName}
//                     </div>
//     </div>
//     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
//         <div class=" text-xs text-cardBody font-semibold  font-poppins">
//                       {item.subCategoryName}
//                     </div>
//     </div>
//     <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
//       <div class=" text-xs text-cardBody font-semibold  font-poppins">  
//                        {item.quantity}
//                     </div>
//   </div>
//   <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
//       <ProBuildSearchedToggle item={item} productId={props.particularDiscountData.productId}/>
      
//   </div>
 
// </div>
// </div>
//           );
//         })}
             
//               </div>
//               </div>
 
//     </>
// );
// }

// const mapStateToProps = ({product }) => ({
//     searchedBuilders: product.searchedBuilders,
//     fetchingSearchedBuilders: product.fetchingSearchedBuilders
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
               
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);



import React, { useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Table, Input, Select, } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import {addProductBuilder} from "../../ProductAction";
import { BundleLoader } from "../../../../Components/Placeholder";

function ProBuildSearchedCard (props) {

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
              description:description
            };
      props.addProductBuilder(result,props.particularDiscountData.productId)
    }
  };

  if(props.fetchingSearchedBuilders) {
  return <BundleLoader/>
  }

  if (isMobile){
    return (
      <>
   <div className=' flex justify-end sticky z-auto'> 
   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         
          {data.map((item) => {
          return (
<div key={item.suppliesId}>
<div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
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
                              <div class="text-sm text-cardBody font-semibold font-poppins cursor-pointer w-28">
                              {item.suppliesName}
                                
                              </div>
                            </div>
                     
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-full ">
                    <div className=" flex font-medium f ">
                    
                      <div class=" text-xs text-cardBody font-poppins">
                      {item.categoryName}
                        
                      </div>
                    </div>
                    <div className=" flex font-medium ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                      {item.subCategoryName}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium flex-col w-16">
                     
                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
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
  
                    {/* <div className=" flex font-medium flex-col ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.sector}
                      </div>
                    </div> */}
                  </div>
                  {/* <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium   ">
                      
  
                      <div class=" text-xs text-cardBody font-poppins">
                      <div>
                      {item.assignedTo === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                          <MultiAvatar
                            primaryTitle={item.assignedTo}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        )}
                        </>
              )}
                      </div>
                      </div>
                    </div>
                    <div className=" flex font-medium  ">
                     
  
                      <span>
                        <MultiAvatar
                          primaryTitle={item.ownerName}
                          imageId={item.ownerImageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                      </span>
                    </div>
                  
                    <div className=" flex font-medium  ">
                     
  
                      <div class=" text-xs text-cardBody font-poppins"></div>
                      <div>
                      <Tooltip title="Qualify? Lead will move to Customer section!">
                          <ConnectWithoutContactIcon
                            onClick={() => {
                              handleRowData(item);
                              props.handleLeadsConfirmationModal(true);
                           
                            }}
                            className="!text-base cursor-pointer text-[blue]"
                          />
                        </Tooltip>
                        
                      </div>
                    </div>
                    
                      <div>
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            onClick={() => {
                              handleRowData(item);
                              handleLeadsNotesDrawerModal(true);
                           
                            }}
                            className=" !text-base cursor-pointer text-green-800"
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.activity"
                              defaultMessage="Activity"
                            />
                          }
                        >
                          <AddchartIcon
                            className="!text-base cursor-pointer text-blue-500"
                            onClick={() => {
                                  handleRowData(item);
                              props.handleCETmodal(true);
                          
                            }}
                          />
                        </Tooltip>
                      </div>
                    
  
                    
                      {user.leadsUpdateInd === true && user.crmInd === true && (
                        <div>
                          <Tooltip title="Edit">
                            <BorderColorIcon
                              className="!text-base cursor-pointer text-[tomato]"
                              onClick={() => {
                                props.setEditLeads(item);
                                handleUpdateLeadsModal(true);
                                handleSetCurrentLeadsId(item);
                              }}
                            />
                          </Tooltip>
                        </div>
                      )}
                      {user.leadsDeleteInd === true && user.crmInd === true && (
                        <div>
                          <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => deleteLeadsData(item.leadsId)}
                          >
                            
                            <DeleteOutlined
                              type="delete"
                              className=" !text-base cursor-pointer text-[red]"
                            />
                         
                          </StyledPopconfirm>
                        </div>
                      )}
                      <div></div>
                    
                   
                      <div>
                        <Tooltip
                          overlayStyle={{ maxWidth: "300px" }}
                          title={dataLoc}
                        >
                          <span class="cursor-pointer"
                           
                          >
                            <LocationOnIcon
                             className="!text-base cursor-pointer text-[#960a0a]"
                            />
                          </span>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title={item.email}>
                          <MailOutlineIcon
                            type="mail"
                            className="!text-base cursor-pointer text-green-400"
                            onClick={() => {
                              handleSetCurrentLeadsId(item);
                              props.handleLeadsEmailDrawerModal(true);
                            }}
                          />
                        </Tooltip>{" "}
                      </div>
                    
                   
                   
                  </div> */}
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
   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=""></div>
          <div className=" md:w-[3rem]]">HSN</div>
          <div className=" md:w-[7%]">Name</div>
         <div className=" md:w-[4.2rem] ">Category</div>
         <div className="md:w-[5.8rem]">Sub Category</div>
         <div className=" md:w-[4.2rem] ">Unit</div>
         <div className=" md:w-[4.2rem] ">Step</div>
         <div className=" md:w-[4.2rem] ">Description</div>
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
    <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                              {item.hsn}
                            </div>
    </div>
                      </div>
                    </div>
                  </div>
         
                     <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:w-full  ">
   <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                             {item.suppliesName}
                           </div>
   </div>
                   
    <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
    <div class=" text-xs text-cardBody font-poppins">
                      
                      {item.categoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
        <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.subCategoryName}
                    </div>
    </div>
    <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">  
                       {/* {item.quantity} */}
                       <Input
  style={{ width: "11em" }}
  value={item.quantity}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'quantity')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">  
                       {/* {item.quantity} */}
                       <Input
  style={{ width: "11em" }}
  value={item.steps}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'steps')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
      
      <div class=" text-xs text-cardBody font-semibold  font-poppins">  
                       <Input
  style={{ width: "11em" }}
  value={item.description}
  onChange={(e) => handleInputChange(e.target.value, item.key, 'description')}
/>
                    </div>
  </div>
  <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
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

const mapStateToProps = ({product }) => ({
    searchedBuilders: product.searchedBuilders,
    fetchingSearchedBuilders: product.fetchingSearchedBuilders
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          addProductBuilder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProBuildSearchedCard);
