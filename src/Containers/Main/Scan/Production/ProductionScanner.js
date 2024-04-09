import React from 'react'

const ProductionScanner = () => {
    return (
        <div class=" bg-white overflow-y-auto max-sm:h-[68vh]">
            Production Details
            <div className=' mt-2 ml-3 max-sm:flex flex md:flex-col max-sm:justify-around'>
                    <div class="">
                        <div class=" flex mt-1">
                            <span className=' font-bold'>OEM :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>Model :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>IMEI :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>OS :</span> 
                        </div>
                    </div>
                    <div class="">
                        <div class=" flex mt-1">
                            <span className=' font-bold'>GB :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>Color :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>Condition :</span> 
                        </div>
                        <div class=" flex mt-1">
                            <span className=' font-bold'>Issue :</span> 
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ProductionScanner
