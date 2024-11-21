
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCategory,
} from "../../Settings/Category/CategoryList/CategoryListAction";
import axios from "axios";
import { Button, Input, Select,Switch, Popconfirm,message } from "antd";
import { getMaterialCurrency, createMaterialCurrency,materialPricetype,getPriceFactor
 } from "./SuppliesAction";
import {getSaleCurrency} from "../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import EmptyPage from "../EmptyPage";
import { base_url2 } from "../../../Config/Auth";


const { Option } = Select;

function PriceAddCard(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [isBestSeller, setIsBestSeller] = useState(false); 
  const [rowToggleStates, setRowToggleStates] = useState({});
  const [inputValue, setInputValue] = useState(props.packingNo || '');
  const [inputValue2, setInputValue2] = useState(props.packingNo || '');
  const [inputValue3, setInputValue3] = useState(props.packingNo || '');
  useEffect(() => {
    props.getMaterialCurrency(props.particularDiscountData.suppliesId);
    props.getSaleCurrency()
  }, []);

  useEffect(() => {
    props.getCategory(props.orgId); 
   props.getPriceFactor(props.particularDiscountData.suppliesId)
}, [])

 
  
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
     "85",   //  "Add ",//0
       "241", //   "Currency",//1
      "657",  //   "Price",//2
      "71",  //   "Type",
       "154", //   "Submit",//3
       "1078", //      " Save",
       "1079", //      "Cancel"  
     "14", //  Catagory
     "110", //name
      "771",//Final

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setData(props.materialCurrency.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.materialCurrency]);

  const handleAddRow = () => {
    const newRow = {
      currencyId: '',
      suppliesPrice: '',
      suppliesPriceB2C: '',
      vat: '',
      catagoryId:"",


    };
    setRows([...rows, newRow]);
  };
  const sendInputPutRequest =  async (item) => {
    
    try {
        const response = await axios.put(`${base_url2}/supplies/suppliesFactor`,item, {  
          headers: {
              Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
       });
      
       if (response.data === 'Successfully !!!!') {
      } else {
        console.log(response.data);
      }
      } catch (error) {
        console.error("Error updating item:", error);
      }
  };

  const handleInputBlur = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue(value);
    sendInputPutRequest({ p1: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId

     });
  };

  const handleInputBlur2 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue2(value);
    sendInputPutRequest({ p2: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };
  const handleInputBlur3 = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value; 
    setInputValue3(value);
    sendInputPutRequest({ p3: value,
userId:props.userId,
orgId:props.orgId,
suppliesId:props.particularDiscountData.suppliesId
     });
  };





  const handleChange = (index, key, value) => {
    if (key === 'suppliesPrice' || key === 'suppliesPriceB2C' || key === 'vat') {
      if (!isNaN(value)) {
        const updatedRows = [...rows];
        updatedRows[index][key] = value;
        setRows(updatedRows);
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: '' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [`${key}${index}`]: 'Must be a number' }));
      }
    } else {
      const updatedRows = [...rows];
      updatedRows[index][key] = value;
      setRows(updatedRows);
    }
  };

  const handleSelectChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value, currency_id: value } : row
    );
    setData(updatedData);
  };

  function cancelType(){
    if (isBestSeller) {
      setIsBestSeller(true);
    } else {
      setIsBestSeller(false);
    }
  }
  // const handleToggleChange = (checked) => {
  //   setIsBestSeller(checked);
  // };
  
  const handleInputChange = (value, key, dataIndex) => {
    const updatedData = data.map((row) =>
      row.key === key ? { ...row, [dataIndex]: value } : row
    );
    setData(updatedData);
  };

  const handleSave = (index) => {
    const row = rows[index];
    // const targetRow = data.find((row) => row.key === key);
    // if (targetRow) {
      console.log('Submitting Row:', row);
      const result = {
        currency: row.currency_id,
        suppliesPrice: row.suppliesPrice,
        suppliesPriceB2C: row.suppliesPriceB2C,
        suppliesId: props.particularDiscountData.suppliesId,
        userId: props.userId,
        orgId: props.orgId,
        sCategory:row.catagoryId,
         type:"mrp"
      };
      props.createMaterialCurrency(result)
      setRows([{ currency: '', suppliesPrice: '', suppliesPriceB2C: '', vat: '',catagoryId:"" }]);
  };
  const handleEditClick = (id) => {
    setEditsuppliesId(id);
  };
  const handleCancelClick = (id) => {
    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditsuppliesId(null);
  };
  function handleUpdate(key,index) {
    console.log('Submitting Row:', key);
    const row = rows[index];
    const updatedData = {
        // currency:row.currency_id ? row.currency_id: key.currency,
        currency:key.currency,
      suppliesPrice: key.suppliesPrice,
      suppliesPriceB2C: key.suppliesPriceB2C,
      suppliesId: props.particularDiscountData.suppliesId,
      userId: props.userId,
      orgId: props.orgId,
      //  type: isBestSeller ? "baseprice" : "mrp"
     
    };
    props.materialPricetype(updatedData);
    setEditsuppliesId(null);
  };
  const handleToggleChange = (key, confirm) => {
    if (confirm) {
      setRowToggleStates((prevState) => ({
        ...prevState,
        [key]: !prevState[key], // Toggle the specific row
      }));
      const newType = !rowToggleStates[key] ? "baseprice" : "mrp"; 
      props.materialPricetype({
        type: newType, 
      });
    } else {
      message.info("Toggle action cancelled");
    }
  };
  
  return (
    <div>
      <div class="flex mb-8 flex-start ">
        <div className="flex w-[5rem] items-center">
     <Button  type="primary" onClick={handleAddRow} >
      {translatedMenuItems[0]} {/* Add */}
      </Button>
      </div>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between w-[30rem]">
                   
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Currency */} {translatedMenuItems[1]}
                  </div>
                <div class="w-16">
                <Select                   
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div>

              <div class="w-24">
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[2]}  (B2B)</div>
              
                <Input 
                 inputMode="numeric"
                    
                        value={row.suppliesPrice}
                        onChange={(e) => handleChange(index,'suppliesPrice',e.target.value)}
                      />
                        {errors[`suppliesPrice${index}`] && <span className="text-red-500">{errors[`suppliesPrice${index}`]}</span>}
                      </div>
           

                      <div>           
                <div class="w-28">
                <div>        
                  <div class="font-bold text-xs font-poppins text-black">
               {/* Catagory */}{translatedMenuItems[7]}
                  
                  </div>
          
                <Select
                      
                      value={row.catagoryId}
                      onChange={(value) => handleChange(index, 'catagoryId',value)}
                      >
                        {props.categoryListData.map((s) => (
                          <Option key={s.categoryId} value={s.categoryId}>
                            {s.name}
                          </Option>
                        ))}
                      </Select>              
              </div>
                       
                      </div>
                      </div>
                  <div class="flex items-center">    
            <Button class="flex items-center"type="primary" onClick={() => handleSave(index)}>
              {/* Submit */} {translatedMenuItems[4]}
            </Button>
            </div>
          
           
            
          </div>

        ))}
</div>
      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">      
            <div className="font-poppins font-bold text-xs md:w-[7rem]">  {translatedMenuItems[1]}</div>
            <div className="font-poppins font-bold text-xs md:w-[6.1rem]">  {translatedMenuItems[2]}(B2B)</div>
            <div className="md:w-[5.8rem] font-poppins font-bold text-xs">  {translatedMenuItems[9]}</div>
            <div className="font-poppins font-bold text-xs md:w-[7.2rem] "> {translatedMenuItems[7]}
              {/* Catagory name */}
              </div>
            <div className="md:w-[5.8rem] font-poppins font-bold text-xs">  {translatedMenuItems[3]}</div>
           
            <div className="w-12"></div>         
            </div>
            <div className="h-[23vh] overflow-x-auto">
          {data.length ? data.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "
                >

                  <div className=" flex font-poppins flex-col md:w-[2.1rem] max-sm:w-full  ">
                    <div class="text-xs font-semibold  font-poppins cursor-pointer">
                    {/* {editsuppliesId === item.id ? (
                      <Select
                        classNames="w-32"
                        value={item.currencyName}
                        onChange={(value) => handleSelectChange(value, item.key, 'currencyName')}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className=" text-xs  font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                  )} */}
                  <div className=" text-xs  font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                    </div>
                  </div>

                  <div className=" flex md:w-[3.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.id ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.suppliesPrice}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'suppliesPrice')}
                      />
                    </div>
 ):(
  <div className=" text-xs font-poppins">
  <div> {item.suppliesPrice}</div>
</div>
)}
                  </div>

                  <div className=" text-xs  font-poppins">
                      <div> {item.sCategoryName}</div>
                    </div>
                    
                  
                  {/* <div className=" flex md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <Popconfirm
        title="Are you sure you want to change status ?"
        // onConfirm={handleToggleChange}
       onCancel={cancelType}
        okText="Yes"
        cancelText="No"
      >
        <Switch
         className="toggle-clr"
         checked={isBestSeller}
         onChange={handleToggleChange}
          checkedChildren="Base price"
          unCheckedChildren="MRP"
        />
      </Popconfirm>
                  </div> */}
                   <div className="flex items-center ml-4">
                   <Popconfirm
  title="Are you sure to change the toggle state?"
  onConfirm={() => handleToggleChange(item.key, true)}
  onCancel={() => handleToggleChange(item.key, false)}
  okText="Yes"
  cancelText="No"
>
  <Switch
    checked={rowToggleStates[item.key] || false}
    className="toggle-checkbox"
    checkedChildren="Base price"
    unCheckedChildren="MRP"
  />
</Popconfirm>

        </div>

                  <div class="flex md:items-center">
       
 {editsuppliesId === item.id ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        {translatedMenuItems[5]}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.id)} className="ml-[0.5rem]">
                        {translatedMenuItems[6]}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.id)}
                      />
                    )}
 <div>
      {/* <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.removeProductPrice(item.Id)}

                          >
                     <Tooltip title="Delete">
                     <DeleteOutlineIcon
                      style={{ color: 'red' }}
                          className="!text-xl cursor-pointer  flex justify-center items-center mt-1 ml-1"
                          />
                       </Tooltip>
                       </StyledPopconfirm> */}
                       </div>
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingMaterialCurrency ? <EmptyPage /> : null}
          </div>

        </div>
      </div>
<div>
  <div className="flex justify-between mt-2">
  <div class="text-base font-semibold w-40 ">P-1</div>
  <div class="text-base font-semibold w-40 ">P-2</div>
  <div class="text-base font-semibold w-40 ">P-3</div>
  </div>
  <div className="flex justify-between mt-1">
<div className="w-36" >
                                           <input
            id="p1"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue}
            onBlur={(e) => handleInputBlur(e)}
            onChange={(e) => setInputValue(e.target.value)}
           placeholder="Enter number of P-1"
          />
          </div> 
          <div className="w-36" >
                                           <input
            id="p2"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue2}
            onBlur={(e) => handleInputBlur2(e)}
            onChange={(e) => setInputValue2(e.target.value)}
           placeholder="Enter number of P-2"
          />
          </div> 
          <div className="w-36" >
                                           <input
            id="p3"
            type="text"
            className="w-[7rem] h-[1.5rem] px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            defaultValue={inputValue3}
            onBlur={(e) => handleInputBlur3(e)}
            onChange={(e) => setInputValue3(e.target.value)}
           placeholder="Enter number of P-3"
          />
          </div> 
          </div>
</div>
    </div>
  );


};

const mapStateToProps = ({ product,categoryList, auth,supplies }) => ({
  materialCurrency: supplies.materialCurrency,
  fetchingMaterialCurrency: supplies.fetchingMaterialCurrency,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  currencies: auth.currencies,
  categoryListData: categoryList.categoryListData,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  orgId: auth.userDetails.organizationId,
  priceFactorData:supplies.priceFactorData
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialCurrency,
      createMaterialCurrency,
      materialPricetype,
      getCategory,
    //   handleOfferModal,
    //   getCurrency,
      getSaleCurrency,
      getPriceFactor
     
    //   removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PriceAddCard);

