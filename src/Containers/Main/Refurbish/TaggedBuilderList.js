import React, { useEffect, useState } from 'react'
import BuilderWithPartIdTable from './BuilderWithPartIdTable'
import { Button, Input, Select } from 'antd';
import { addProductBuilderInProcess } from "./RefurbishAction"
import { bindActionCreators } from 'redux';
import QRCodeList from "./QrCodeList"
import { getBuilderByProId } from "../../Product/ProductAction";
import { connect } from 'react-redux';
const { Option } = Select;
const TaggedBuilderList = (props) => {
    useEffect(() => {
        props.getBuilderByProId(props.row.productId);
    }, []);

    const [partName, setPartName] = useState("")
    const [partNo, setPartNo] = useState("")
    const [data, setData] = useState('');
    const [scanning, setScanning] = useState(false);
    const [shouldRenderCamera, setShouldRenderCamera] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePartName = (value) => {
        setPartName(value)
    }
    const handlePartNo = (e) => {
        setPartNo(e.target.value)
        setData("")
    }
    const handleClick = () => {
        props.addProductBuilderInProcess({
            productManufacturingId: props.row.productManufacturingId,
            productId: props.row.productId,
            orderId: props.row.orderId,
            suppliesId: partName,
            cartNo: data?data:partNo,
            userId: props.userId
        }, props.row.productManufacturingId)
        setPartName("")
        setPartNo("")
    }

    const handleScan = async (result, error) => {
        try {
          if (result && result.text) {
            setData(result.text);
          } else if (result instanceof MediaStream) {
            // Do something with the MediaStream object if needed
          }
    
          if (error) {
            throw new Error(error);
          }
        } catch (error) {
          console.error('Error in QR code scanner:', error);
    
          // Additional handling based on the error, if needed
        
        }
      };
    
      const handleError = (error) => {
        console.error('Error with the QR scanner:', error);
        setScanning(false);
        setShouldRenderCamera(false);
        setModalVisible(false);
      };
    
      const startScanning = () => {
        setData('');
        setScanning(true);
        setShouldRenderCamera(true);
        setModalVisible(true);
      };
    
      const stopScanning = () => {
        setScanning(false);
        setShouldRenderCamera(false);
        setModalVisible(false);
      };
      console.log("Datex",data)
    return (
        <>
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <div style={{
                    width: "40%",
                }}>
                    <div style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Part</div>
                    <Select

                        value={partName}
                        onChange={(value) => handlePartName(value)}
                    >
                        {props.builderbyProductId.map((a) => {
                            return <Option value={a.suppliesId}>{a.suppliesName}</Option>;
                        })}
                    </Select>
                </div>
                <div style={{marginTop:"21px",marginLeft:"12px"}}>
                <QRCodeList
                handleScan={handleScan}
                stopScanning={stopScanning}
                startScanning={startScanning}
                handleError={handleError}
                modalVisible={modalVisible}
                scanning={scanning}
                data={data}
                shouldRenderCamera={shouldRenderCamera}
                />
                </div>
                <div style={{
                    width: "35%",
                    marginLeft:"10px"
                }}>
                    <div style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Part No</div>
                    <Input 
                    value={data?data:partNo}
                        // width={250}
                        type='text' onChange={(value) => handlePartNo(value)} />
                </div>
                <div style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Button type='primary' onClick={handleClick}>Add</Button>
                </div>
            </div>
            <BuilderWithPartIdTable row={props.row} />
        </>
    )
}

const mapStateToProps = ({ product, auth }) => ({
    builderbyProductId: product.builderbyProductId,
    userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addProductBuilderInProcess,
            getBuilderByProId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TaggedBuilderList);


