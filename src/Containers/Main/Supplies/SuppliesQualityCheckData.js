import React from "react";
import { Table } from "antd";

const data = {
  quality: ["A11", "A12"],
  specs: ["BRET", "CRET"]
};



const QualitySpecsTable = (props) => {
    // Create a dataSource by mapping each item in quality and specs to a row
const dataSource = props.currentCategory.qualityList.map((item, index) => ({
    key: index,
    quality: item,
    specs: props.currentCategory.specsList[index]
  }));
  
  // Define columns for the table
  const columns = [
    {
      title: "Quality",
      dataIndex: "quality",
      key: "quality"
    },
    {
      title: "Specs",
      dataIndex: "specs",
      key: "specs"
    }
  ];
    
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};

export default QualitySpecsTable;
