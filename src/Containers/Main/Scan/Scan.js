import React from 'react'
import PhoneScanner from './PhoneScanner/PhoneScanner'
// import ProductionScanner from './Production/ProductionScanner'

const Scan = (props) => {
    console.log(props.match.params)
    // console.log(props.match.params.manufactureId)
    // console.log(props.match.params.phoneId)
    return (
        <div>
            {/* {props.match.params.manufactureId === undefined ?
                <PhoneScanner />
                :
                <ProductionScanner />
            } */}
            <PhoneScanner />
        </div>
    )
}

export default Scan
