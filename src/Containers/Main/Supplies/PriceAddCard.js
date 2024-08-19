
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input, Select,Tooltip,Switch, Popconfirm } from "antd";
import { getMaterialCurrency, createMaterialCurrency,materialPricetype
 } from "./SuppliesAction";
import {getSaleCurrency} from "../../Auth/AuthAction";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import MaterialPriceTypeToggle from "./MaterialPriceTypeToggle";

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

  useEffect(() => {
    props.getMaterialCurrency(props.particularDiscountData.suppliesId);
    props.getSaleCurrency()
  }, []);
  
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "Add Row",//0
          "Currency",//1
          "Price",//2
          "Type",
          "Submit",//3
             " Save",
             "Cancel"  
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


    };
    setRows([...rows, newRow]);
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
  const handleToggleChange = (checked) => {
    setIsBestSeller(checked);
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
        currency: row.currency_id,
        suppliesPrice: row.suppliesPrice,
        suppliesPriceB2C: row.suppliesPriceB2C,
        suppliesId: props.particularDiscountData.suppliesId,
        userId: props.userId,
        orgId: props.orgId,
      };
      props.createMaterialCurrency(result)
      setRows([{ currency: '', suppliesPrice: '', suppliesPriceB2C: '', vat: '' }]);
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
      type: isBestSeller ? "baseprice" : "mrp"
    };
    props.materialPricetype(updatedData);
    setEditsuppliesId(null);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
      {translatedMenuItems[0]} {/* Add Row */}
      </Button>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center">
            <div class="flex justify-around w-[30rem]">
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Currency */} {translatedMenuItems[1]}
                  </div>
                <div class="w-24">
                <Select
                        classNames="w-32"
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

              <div>
                <div class="font-bold text-xs font-poppins text-black"> {translatedMenuItems[2]}  (B2B)</div>
                <div class="w-24"></div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.suppliesPrice}
                        onChange={(e) => handleChange(index,'suppliesPrice',e.target.value)}
                      />
                        {errors[`suppliesPrice${index}`] && <span className="text-red-500">{errors[`suppliesPrice${index}`]}</span>}
                      </div>
              <div>
                <div class="font-bold text-xs font-poppins text-black">
                {translatedMenuItems[2]}{/* Price  */}(B2C)
                  </div>
                <div class="w-24">
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.suppliesPriceB2C}
                        onChange={(e) => handleChange(index,'suppliesPriceB2C',e.target.value)}
                      />
                       {errors[`suppliesPriceB2C${index}`] && <span className="text-red-500">{errors[`suppliesPriceB2C${index}`]}</span>}
                      </div>
                      </div>

                      <div>
                <div class="font-bold text-xs font-poppins text-black">
                  {/* Type */}  {translatedMenuItems[3]}
                  </div>
                <div class="w-24">
                
                       
                      </div>
                      </div>
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
              {/* Submit */} {translatedMenuItems[4]}
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex sticky z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">          <div className=""></div>
            <div className=" md:w-[7%]">  {translatedMenuItems[1]}</div>
            <div className=" md:w-[6.1rem]">  {translatedMenuItems[2]}(B2B)</div>
            <div className=" md:w-[4.2rem] ">  {translatedMenuItems[2]}(B2C)</div>
            <div className="md:w-[5.8rem]">  {translatedMenuItems[3]}</div>
            <div className="w-12"></div>         
            </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.id}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 "
                >

                  <div className=" flex items-end flex-col md:w-[9.1rem] max-sm:w-full  ">
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

                  <div className=" flex md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
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



                  <div className=" flex  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.id ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.suppliesPriceB2C}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'suppliesPriceB2C')}
                      />
                    </div>
                     ):(
                      <div className=" text-sm  font-poppins">
                      <div> {item.suppliesPriceB2C}</div>
                    </div>
                    )}
                  </div>
                  <div className=" flex md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                     <DeleteOutlined
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
          }) : !data.length && !props.fetchingMaterialCurrency ? <NodataFoundPage /> : null}

        </div>
      </div>

    </div>
  );


};

const mapStateToProps = ({ product, auth,supplies }) => ({
  materialCurrency: supplies.materialCurrency,
  fetchingMaterialCurrency: supplies.fetchingMaterialCurrency,
  addDiscountModal: product.addDiscountModal,
  addProductOfferModal: product.addProductOfferModal,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialCurrency,
      createMaterialCurrency,
      materialPricetype,
    //   handleOfferModal,
    //   getCurrency,
      getSaleCurrency,
    //   removeProductPrice
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PriceAddCard);

