import React,{useState} from 'react';
import { Tabs,Form,Input,Button } from 'antd';
//import 'antd/dist/antd.css';  // Import Ant Design CSS

const { TabPane } = Tabs;

const data = {
  startDate: "27/03/2024",
  endDate: "27/03/2030"
};

const App = () => {


  const [formData, setFormData] = useState({
    partsChanged: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
  };
  // Function to calculate the years between startDate and endDate using native JS
  const calculateYears = (start, end) => {
    const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day);  // month is 0-indexed in JS Date
    };

    const startDate = parseDate(start);
    const endDate = parseDate(end);

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    console.log('Start Year:', startYear);  // Check values in the console
    console.log('End Year:', endYear);      // Check values in the console

    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };

  const years = calculateYears(data.startDate, data.endDate);

  return (
    <div style={{ padding: 20 }}>
      <Tabs defaultActiveKey="0">
        {years.map((year, index) => (
          <TabPane tab={`Year ${year}`} key={index}>

<Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Parts Changed">
        <Input
          name="partsChanged"
          value={formData.partsChanged}
          onChange={handleChange}
          placeholder="Enter Parts Changed"
        />
      </Form.Item>

      <Form.Item label="Stock">
        <Input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter Stock Quantity"
        />
      </Form.Item>

      <Form.Item label="Description">
        <Input.TextArea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          rows={4}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
            {/* <div>Content for the year {year}</div> */}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;