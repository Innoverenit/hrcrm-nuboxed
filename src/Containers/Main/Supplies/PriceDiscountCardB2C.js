import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Select,Tooltip } from "antd";
import {createMaterialDiscountB2C,getMaterialDiscountB2C,
    //createMaterialDiscountB2CUpdate
} from "./SuppliesAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { Option } = Select;

function PriceDiscountCardB2C(props) {

  const [editedFields, setEditedFields] = useState({});
  const [rows, setRows] = useState([]);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.getMaterialDiscountB2C(props.particularDiscountData.suppliesId,"B2C");
   // props.getInvestorCurrency()
  }, []);

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
    setData(props.materialDiscountB2C.map((item, index) => ({ ...item, key: String(index) })));
  }, [props.materialDiscountB2C]);

 
  const handleAddRow = () => {
    const newRow = {
      // key: String(data.length + 1),
      volume: '',
      allowedDiscount: '',
      date: null,
    };
    setRows([...rows, newRow]);
  };

  const handleChange = (index, key, value) => {
    if (key === 'allowedDiscount' || key === 'volume' || key === 'vat') {
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
        volume: 0,
        discountType: "B2C",
        allowedDiscount: row.allowedDiscount,
        suppliesId: props.particularDiscountData.suppliesId,
        startDate: row.startDate ? dayjs(row.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
        endDate: row.endDate ? dayjs(row.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
        userId: props.userId,
        orgId: props.orgId,

      };
      props.createMaterialDiscountB2C(result)
      setRows([{  allowedDiscount: '', volume: '', }]);
  };
  const handleEditClick = (suppliesId) => {
    setEditsuppliesId(suppliesId);
  };
  const handleCancelClick = (suppliesId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [suppliesId]: undefined }));
    setEditsuppliesId(null);
  };

  const { materialDiscountB2C } = props;
  let investorsShareId; // Declare investorsShareId outside
  
  if (materialDiscountB2C && materialDiscountB2C.length > 0) {
    const firstItem = materialDiscountB2C[0];
    investorsShareId = firstItem.investorsShareId;
    console.log(investorsShareId); // or use the investorsShareId as needed
  } else {
    console.error("materialDiscountB2C is undefined or empty");
  }

  function handleUpdate(key) {
    console.log('Submitting Row:', key);
    const updatedData = {
      // volume: key.volume,
      allowedDiscount: key.allowedDiscount,
      suppliesId: props.particularDiscountData.suppliesId,
      investorsShareId:investorsShareId,
      currency: key.currency_id,
      startDate: key.startDate ? dayjs(key.startDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      endDate: key.endDate ? dayjs(key.endDate).format('YYYY-MM-DDTHH:mm:ss[Z]') : null,
      userId: props.userId,
        orgId: props.orgId,
    };
    props.createMaterialDiscountB2C(updatedData,props.particularDiscountData.suppliesId);
    setEditsuppliesId(null);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      {rows.map((row, index) => (
          <div key={index} class="flex items-center justify-between">
            <div class="flex justify-around w-wk">
            {/* <div>
                <div class="font-bold text-xs font-poppins text-black">Currency</div>
                <div class="w-24">
                <Select
                style={{width:"5rem"}}
                      
                        value={row.currency_id}
                        onChange={(value) => handleChange(index, 'currency_id',value)}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>

                </div>
              </div> */}

              {/* <div>
                <div class="font-bold text-xs font-poppins text-black">Volume</div>
                <div ></div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.volume}
                        onChange={(e) => handleChange(index,'volume',e.target.value)}
                      />
                        {errors[`volume${index}`] && <span className="text-red-500">{errors[`volume${index}`]}</span>}
                      </div> */}
              <div>
                <div class="font-bold text-xs font-poppins text-black">Value </div>
                <div>
                <Input
                 inputMode="numeric"
                        className="w-32"
                        value={row.allowedDiscount}
                        onChange={(e) => handleChange(index,'allowedDiscount',e.target.value)}
                      />
                       {errors[`allowedDiscount${index}`] && <span className="text-red-500">{errors[`allowedDiscount${index}`]}</span>}
                      </div></div>
                      <div>
        <div class="font-bold text-xs font-poppins text-black">Start Date</div>
        <div >
          <DatePicker
            style={{width:"9rem"}}
            value={row.startDate ? dayjs(row.startDate) : null}
            onChange={(date, dateString) => handleChange(index, 'startDate', dateString)}
          />
        </div>
      </div>
      <div>
        <div class="font-bold text-xs font-poppins text-black">End Date</div>
        <div >
          <DatePicker
            style={{width:"9rem"}}
            value={row.endDate ? dayjs(row.endDate) : null}
            onChange={(date, dateString) => handleChange(index, 'endDate', dateString)}
          />
        </div>
      </div>
            </div>
            <div class="mt-4">
            <Button type="primary" onClick={() => handleSave(index)}>
              Submit
            </Button>
            </div>
            
          </div>
        ))}

      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 p-1 w-[99%] w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">                
            <div className=" md:w-[11.1rem]">Value</div>
            <div className=" md:w-[6.2rem] ">Start date</div>
            <div className=" md:w-[6.2rem] ">End date</div>
            <div className="w-12"></div>           
              </div>

          {data.length ? data.map((item) => {
            return (
              <div key={item.suppliesId}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                >

                 
 {/* <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                  {editsuppliesId === item.suppliesId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.volume}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'volume')}
                      />
                    </div>
                     ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.volume}</div>
                    </div>
                    )}
                  </div> */}
                 
                  {/* <div className=" flex font-medium items-end flex-col md:w-[9.1rem] max-sm:w-full  ">
                    <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                    {editsuppliesId === item.suppliesId ? (
                      <Select
                      style={{width:"5rem"}}
                        value={item.currency}
                        onChange={(value) => handleSelectChange(value, item.key, 'currency')}
                      >
                        {props.investorCurrencies.map((s) => (
                          <Option key={s.currency_id} value={s.currency_id}>
                            {s.currency_name}
                          </Option>
                        ))}
                      </Select>
                    ):(
                      <div className="font-normal text-sm  font-poppins">
                      <div> {item.currency}</div>
                    </div>
                  )}
                    </div>
                  </div> */}
                  <div className=" flex   md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                  {editsuppliesId === item.suppliesId ? (
                    <div class=" text-xs  font-poppins">
                      <Input
                        className="w-32"
                        value={item.allowedDiscount}
                        onChange={(e) => handleInputChange(e.target.value, item.key, 'allowedDiscount')}
                      />
                    </div>
 ):(
  <div className=" text-xs  font-poppins">
  <div> {item.allowedDiscount}</div>
</div>
)}
                  </div>            
                  {editsuppliesId === item.suppliesId ? (
  <DatePicker
  style={{width:"9rem"}}
    value={item.startDate ? dayjs(item.startDate) : null}
    onChange={(startDate) => handleInputChange(startDate, item.key, 'startDate')}
  />
) : (
  <div className=" text-xs font-poppins">
    <div>{dayjs(item.startDate).format('DD/MM/YY')}</div>
  </div>
)}

{editsuppliesId === item.suppliesId ? (
  <DatePicker
  style={{width:"9rem"}}
    value={item.endDate ? dayjs(item.endDate) : null}
    onChange={(endDate) => handleInputChange(endDate, item.key, 'endDate')}
  />
) : (
  <div className=" text-xs font-poppins">
    <div>{dayjs(item.endDate).format('DD/MM/YY')}</div>
  </div>
)}
                  <div class="flex md:items-center">

 {editsuppliesId === item.suppliesId ? (
                        <>
                      <Button 
                      type="primary"
                      onClick={() => handleUpdate(item)}>
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.suppliesId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-xl cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.suppliesId)}
                      />
                    )}
                  </div>

                </div>
              </div>
            );
          }) : !data.length && !props.fetchingMaterialDiscountB2C ? <NodataFoundPage /> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ investor, auth ,supplies}) => ({
  materialDiscountB2C: supplies.materialDiscountB2C,
  fetchingMaterialDiscountB2C: supplies.fetchingMaterialDiscountB2C,
  currencies: auth.currencies,
  userId: auth.userDetails.userId,
  fetchingSaleCurrency:auth.fetchingSaleCurrency,
  saleCurrencies:auth.saleCurrencies,
  investorCurrencies: auth.investorCurrencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getMaterialDiscountB2C,
       createMaterialDiscountB2C, 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PriceDiscountCardB2C);

