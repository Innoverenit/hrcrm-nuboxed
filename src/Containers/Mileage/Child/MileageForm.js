import { Button, DatePicker, message } from "antd";
import React, { useState, useEffect } from "react";
import { TextInput } from "../../../Components/UI/Elements";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { addMileage, getMileageByUserId } from "../MileageAction";
import { getCurrency } from "../../Auth/AuthAction";
import dayjs from "dayjs";
import * as Yup from "yup";
import { Select } from "antd";

const { Option } = Select;

const MileageSchema = Yup.object().shape({
  dateString: Yup.string().required("Input Required"),
  // emailId: Yup.string().email("Enter a valid Email"),
  // firstName: Yup.string().required("Input needed!"),
  // phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  // mobileNo: Yup.string()
  //   // .required("Input needed!")
  //   .matches(phoneRegExp, "Enter a valid Mobile No"),
});
function MileageForm(props) {
  const [row, setRows] = useState([
    {
      mileageDate: "",
      clientName: "",
      fromLocation: "",
      toLocation: "",
      distances: "",
      remark: "",
      mileageRate: "",
      currency: "",
      id: 1,
      userId:props.userId,
    },
  ]);

  useEffect(() => {
    props.getCurrency();
  }, []);
  console.log("currenctjudfljd;regf", props.currencies);
  const [id, setId] = useState(1);
  function onChangeDatePicker(date, dateString, id) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}date` === id) {
          console.log(dateString);
          return { ...data, mileageDate: dayjs(dateString).toISOString() };
        } else {
          return data;
        }
      });
    });
  }
  function handleCurrencyChange(currency, id) {
    console.log(id);
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}curr` === id) {
          return { ...data, currency: currency };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangeattribute(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}attribute`);
        console.log(e.target.name);

        if (`${d.id}attribute` === e.target.name) {
          return { ...d, clientName: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangefromLocation(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}fromLocation`);
        console.log(e.target.name);

        if (`${d.id}fromLocation` === e.target.name) {
          return { ...d, fromLocation: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChange(id, billType) {
    setRows((value) => {
      console.log(value);
      return value.map((data) => {
        if (`${data.id}select` === id) {
          return { ...data, billType: billType };
        } else {
          return data;
        }
      });
    });
  }
  function handleChangetoLocation(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}toLocation`);
        console.log(e.target.name);

        if (`${d.id}toLocation` === e.target.name) {
          return { ...d, toLocation: e.target.value };
        } else {
          return d;
        }
      });
    });
  }

  function handleChangedistances(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}distances`);
        console.log(e.target.name);

        if (`${d.id}distances` === e.target.name) {
          return { ...d, distances: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleChangeremark(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}remark`);
        console.log(e.target.name);

        if (`${d.id}remark` === e.target.name) {
          return { ...d, remark: e.target.value };
        } else {
          return d;
        }
      });
    });
  }

  function handleChangemileageRate(e) {
    e.persist();
    setRows((v) => {
      console.log(v);
      return v.map((d) => {
        console.log(`${d.id}mileageRate`);
        console.log(e.target.name);

        if (`${d.id}mileageRate` === e.target.name) {
          return { ...d, mileageRate: e.target.value };
        } else {
          return d;
        }
      });
    });
  }
  function handleAddRowClick() {
    setId((v) => v + 1);
    setRows((v) => [
      ...v,
      {
        date: "",
        clientName: "",
        fromLocation: "",
        toLocation: "",
        distances: "",
        remark: "",
        mileageRate: "",
        currency: "",
        // userId: props.userId,
        id: id + 1,
      },
    ]);
  }
  function handleDelete(row) {
    setRows((v) => v.filter((d) => d.id !== row.id));
  }

  function handleCallBack(status) {
    if (status === "Success") {
      props.getMileageByUserId(props.userId);
    } else {
      message.error("Something went wrong! Occourd");
    }
  }
  function handleSubmit() {
    // validateYupSchema={MileageSchema}
    console.log(row);
    // console.log(row["attribute"]);
    if (row) {
      row.map((item) => {
        if (
          !item.date &&
          !item.clientName &&
          !item.fromLocation &&
          !item.toLocation &&
          !item.distances &&
          !item.remark &&
          !item.mileageRate &&
          !item.currency
        ) {
          alert("All Fields Required");
        } 
        // else {
        //   props.addMileage(row, handleCallBack);
        // } 
      });
      props.addMileage(row, handleCallBack);
    } 

   
  }
  const { addingMileage } = props;
  return (
    <div>
      <table>
        <th>Date</th>
        <th>Cost Code</th>
        <th>From</th>
        <th>To</th>
        <th>Distance</th> 
        <th>Remarks</th>
   
        {row.map((item) => {
          return (
            <tr>
              <td style={{ width: "15%" }}>
                <DatePicker
                  style={{ width: "93%" }}
                  onChange={(date, dateString) =>
                    onChangeDatePicker(date, dateString, `${item.id}date`)
                  }
                />
              </td>
              <td style={{ width: "16%" }}>
                <TextInput
                  style={{ width: "95%" }}
                  name={`${item.id}attribute`}
                  value={`${item.clientName}`}
                  onChange={handleChangeattribute}
                />
              </td>

              <td style={{ width: "16%" }}>
                <TextInput
                  name={`${item.id}fromLocation`}
                  value={`${item.fromLocation}`}
                  onChange={handleChangefromLocation}
                  style={{ width: "96%" }}
                />
              </td>

              <td style={{ width: "17%" }}>
                <TextInput
                  name={`${item.id}toLocation`}
                  value={`${item.toLocation}`}
                  onChange={handleChangetoLocation}
                  style={{ width: "96%" }}
                />
              </td>

              <td style={{ width: "10%" }}>
                <TextInput
                  name={`${item.id}distances`}
                  value={`${item.distances}`}
                  onChange={handleChangedistances}
                  style={{ width: "80%" }}
                  isRequired
                />
              </td>       
              <td>
                <TextInput
                  style={{ width: "100%" }}
                  name={`${item.id}remark`}
                  value={`${item.remark}`}
                  onChange={handleChangeremark}
                />
              </td>        

              {row.length > 1 && (
                <DeleteOutlined
                  style={{
                    color: "red",
                    fontSize: "1.125em",
            
                  }}
                  type="delete"
                  onClick={() => handleDelete(item)}
                />
              )}
            </tr>
          );
        })}
      </table>

      <div class=" mt-3">
        <div class=" mr-2">
      <Button
        style={{ float: "right" }}
        type="primary"
        onClick={handleSubmit}
        Loading={addingMileage}
      >
        Submit
      </Button>
      </div>
<div class=" ml-3 mr-2">
      <Button
        style={{ float: "right"}}
        type="primary"
        onClick={handleAddRowClick}
        loading={addingMileage}
      >
        Add more
      </Button>
      </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ mileage, auth }) => ({
  addingMileage: mileage.addingMileage,
  userId: auth.userDetails.userId,
  currencies: auth.currencies,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addMileage,
      getMileageByUserId,
      getCurrency,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageForm);
