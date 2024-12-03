import React, { useEffect } from 'react'
import { getTagInProcess } from "../RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OnlyWrapCard } from '../../../../Components/UI/Layout';

const TagInListTable = (props) => {

    useEffect(() => {
        props.getTagInProcess(props.RowData.phoneId)
    }, [])


    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "white" }}>
                    <div className=" flex justify-between w-[50%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[10rem]">Part Name</div>
                        <div className=" md:w-[6.1rem]">Part Number</div>

                    </div>

                    {props.tagInPros.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 ">
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col md:w-[20.1rem] max-sm:w-full  ">
                                            <h4 class="text-sm  font-semibold  font-poppins cursor-pointer">
                                                {item.suppliesName}
                                            </h4>
                                        </div>

                                        <div className=" flex font-medium flex-col  md:w-[9.1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <h4 class=" text-xs  font-poppins">
                                                {item.cartNo}
                                            </h4>
                                        </div>

                                    </div>

                                    <div class="flex md:items-center">
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </OnlyWrapCard>
            </div>
        </>
    );
}
const mapStateToProps = ({ refurbish, auth }) => ({
    tagInPros: refurbish.tagInPros
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTagInProcess
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(TagInListTable);

