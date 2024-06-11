import React from 'react'
import { connect } from 'react-redux'

export const Quality = (props) => {
  return (
    <div>
       Welcome to Quality
        </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Quality)