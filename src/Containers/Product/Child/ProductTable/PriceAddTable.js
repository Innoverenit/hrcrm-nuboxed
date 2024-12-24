import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { getCurrency } from "../../../Auth/AuthAction";
import { Button, Input, Select,Tooltip } from "antd";
import { getProductCurrency, createProductCurrency,
   handleDiscountModal, handleOfferModal,removeProductPrice } from "../../ProductAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import {getSaleCurrency} from "../../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const { Option } = Select;

function ProductbuilderTable(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [dtouched, setDTouched] = useState(false);

  useEffect(() => {
    props.getProductCurrency(props.particularDiscountData.productId);
   
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
      "1370",  //  "Add Row",//0
       "241",  //   "Currency",//1
      "657",   //   "Price",//2
     "306",    //   "VAT",
     "154",    //   "Submit",//4
      "1078",   //      " Save",
      "1079",   //      "Cancel"  
      "170",   // "Edit"
      "1259",   // Do you want to delete?"
      "84",   // "Delete"
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
    setData(props.ProductCurrency.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.ProductCurrency]);

  // useEffect(() => {
  //   if (data.length === 0) {
  //     setShowNoDataAlert(true);
  //   } else {
  //     setShowNoDataAlert(false);
  //   }
  // }, [data]);



  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      currencyId: '',
      price: '',
      priceB2C: '',
      vat: '',


    };
    setRows([...rows, newRow]);
  };
  // const handleChange = (index, key, value) => {
  //   const updatedRows = [...rows];
  //   updatedRows[index][key] = value;
  //   setRows(updatedRows);
  // };

  // const handleChange = (index, key, value) => {
  //   if (key === 'price' || key === 'priceB2C' || key === 'vat') {
  //     if (!isNaN(value) && value.trim() !== '') {
  //       const updatedRows = [...rows];
  //       updatedRows[index][key] = value;
  //       setRows(updatedRows);
  //     }
  //   } else {
  //     const updatedRows = [...rows];
  //     updatedRows[index][key] = value;
  //     setRows(updatedRows);
  //   }
  // };
  const handleChange = (index, key, value) => {
    if (key === 'price' || key === 'priceB2C' || key === 'vat') {
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
        currencyId: row.currency_id,
        price: row.price,
        priceB2C: row.priceB2C,
        vat: row.vat,
        skillLevelLinkId: row.skillLevelLinkId,
        productId: props.particularDiscountData.productId,
        userId: props.userId
      };
      props.createProductCurrency(result)
      setRows([{ currencyId: '', price: '', priceB2C: '', vat: '' }]);
  };
  const handleEditClick = (productCurrencyId) => {
    setEditsuppliesId(productCurrencyId);
  };
  const handleCancelClick = (productCurrencyId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [productCurrencyId]: undefined }));
    setEditsuppliesId(null);
  };
  function handleUpdate(key) {
    console.log('Submitting Row:', key);
    const updatedData = {
      currencyId: key.currency_id,
      price: key.price,
      priceB2C: key.priceB2C,
      vat: key.vat,
      skillLevelLinkId: key.skillLevelLinkId,
      productId: props.particularDiscountData.productId,
      userId: props.userId
    };
    props.createProductCurrency(updatedData);
    setEditsuppliesId(null);
  };
  const handleSelectDepartmentFocus = () => {
    if (!dtouched) {
      props.getSaleCurrency()
      setDTouched(true);
    }
  };
  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
      {translatedMenuItems[0]}  {/* Add Row */}
      </Button>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center">
            <div class="flex justify-around w-[30rem]">
              <div>
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[1]} </div>
                <div class="w-24">
                <Select
                        classNames="w-32"
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                        onFocus={handleSelectDepartmentFocus}
                      >
                        {props.saleCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div>

              <div>
                <div class="font-bold text-xs font-poppins text-black">{translatedMenuItems[2]}  (B2B)</div>
                <div class="w-24"></div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.price}
                        onChange={(e) => handleChange(index,'price',e.target.value)}
                      />
                        {errors[`price${index}`] && <span className="text-red-500">{errors[`price${index}`]}</span>}
                      </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[2]}  (B2C)</div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.priceB2C}
                        onChange={(e) => handleChange(index,'priceB2C',e.target.value)}
                      />
                       {errors[`priceB2C${index}`] && <span className="text-red-500">{errors[`priceB2C${index}`]}</span>}
                      </div></div>
              <div>
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[3]}
                   {/* VAT  */}
                   (in %)</div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.vat}
                        onChange={(e) => handleChange(index,'vat',e.target.value)}
                      />
                        {errors[`vat${index}`] && <span className="text-red-500">{errors[`vat${index}`]}</span>}
                </div>
              </div>
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
            {translatedMenuItems[4]}  {/* Submit */}
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">        
              <div className=""></div>
            <div className=" md:w-[7%]"> {translatedMenuItems[1]} </div>
            <div className=" md:w-[6.1rem]"> {translatedMenuItems[2]}(B2B)</div>
            <div className=" md:w-[4.2rem] "> {translatedMenuItems[2]}(B2C)</div>
            <div className="md:w-[5.8rem]"> {translatedMenuItems[3]}(%)</div>
            <div className="w-12"></div>             </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.productCurrencyId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "
                >

                  <div className=" flex  items-end  md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-xs  font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.productCurrencyId ? (
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
                      <div className="font-normal text-xs  font-poppins">
                      <div> {item.currencyName}</div>
                    </div>
                  )}
                    </div>
                  </div>

                  <div className=" flex    md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.productCurrencyId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.price}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'price')}
                      />
                    </div>
 ):(
  <div className="font-normal text-xs  font-poppins">
  <div> {item.price}</div>
</div>
)}
                  </div>



                  <div className=" flex   md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.productCurrencyId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.priceB2C}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'priceB2C')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-xs  font-poppins">
                      <div> {item.priceB2C}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex   md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.productCurrencyId ? (

                    <div class=" text-xs  font-semibold  font-poppins">
                      <Input
                        className="w-32"
                        value={item.vat}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'vat')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-xs  font-poppins">
                      <div> {item.vat}</div>
                    </div>
                    )}
                  </div>

                  <div class="flex md:items-center">


                    {/* <div class="flex  w-20 max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Button type="primary" onClick={() => handleSave(item.key)}>
                          Save
                        </Button>
                      </div>

                    </div> */}
 {editsuppliesId === item.productCurrencyId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                       {translatedMenuItems[5]} {/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.productCurrencyId)} className="ml-[0.5rem]">
                       {translatedMenuItems[6]} {/* Cancel */}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle= {translatedMenuItems[7]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.productCurrencyId)}
                      />
                    )}
 <div>
      <StyledPopconfirm
                          title={translatedMenuItems[8]}
                          onConfirm={() => props.removeProductPrice(item.productCurrencyId)}

                          >
                     <Tooltip title={translatedMenuItems[9]}>
                  
                       </Tooltip>
                       </StyledPopconfirm>
                       </div>
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingProductCurrency ? <NodataFoundPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ product, auth }) => ({
  ProductCurrency: product.ProductCurrency,
  fetchingProductCurrency: product.fetchingProductCurrency,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingProductCurrency: product.fetchingProductCurrency,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductCurrency,
      createProductCurrency,
      handleDiscountModal,
      handleOfferModal,
      getCurrency,
      getSaleCurrency,
      removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);

