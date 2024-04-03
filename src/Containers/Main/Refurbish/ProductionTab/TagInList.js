import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Button, Input, Select } from 'antd';
import { addTagInProcess } from "../RefurbishAction";
import { bindActionCreators } from 'redux';
import QRCodeList from "../QrCodeList";
import { getBuilderByProId } from "../../../Product/ProductAction";
import { connect } from 'react-redux';
import { BundleLoader } from '../../../../Components/Placeholder';

const TagInListTable = lazy(() => import('./TagInListTable'));

const { Option } = Select;

const TagInList = (props) => {
    useEffect(() => {
        props.getBuilderByProId(props.RowData.productId);
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
        props.addTagInProcess({
            productRepurbishId: props.RowData.productRepurbishId,
            productId: props.RowData.productId,
            suppliesId: partName,
            cartNo: data ? data : partNo,
            userId: props.userId
        }, props.RowData.productRepurbishId)
        setPartName("")
        setPartNo("")
    }

    const handleScan = async (result, error) => {
        try {
            if (result && result.text) {
                setData(result.text);
            } else if (result instanceof MediaStream) {
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
    return (
        <>
            <div class="m-[10px] flex justify-between">
                <div class="w-[40%]">
                    <label className="text-xs font-semibold m-[10px]">Part</label>
                    <Select

                        value={partName}
                        onChange={(value) => handlePartName(value)}
                    >
                        {props.builderbyProductId.map((a) => {
                            return <Option value={a.suppliesId}>{a.suppliesName}</Option>;
                        })}
                    </Select>
                </div>
                <div class="mt-[21px] ml-[12px]">
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
                <div class="w-[35%] ml-[10px]">
                    <label className="text-xs font-semibold m-[10px]">
                        Part No </label>
                    <Input
                        value={data ? data : partNo}

                        type='text' onChange={(value) => handlePartNo(value)} />
                </div>
                <div class="w-[20%] flex items-center">
                    <Button type='primary' onClick={handleClick}>Add</Button>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
                <TagInListTable RowData={props.RowData} />
            </Suspense>

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
            addTagInProcess,
            getBuilderByProId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TagInList);


