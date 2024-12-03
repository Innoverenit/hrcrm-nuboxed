import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch } from 'antd'
import { setDarkTheme, setLightTheme } from "./ThemeAction";


export const lightTheme = {
    primaryColor: '#1890ff',
    applicationBackground: 'white',
    applicationColor: '#444',
    backgroundColor: '#fff',
    borderBoxBgColor: '#eee',
    color: '#444',
    borderColor: '#eee',
    inputBorderColor: '#eee',
    boxShadowColor: '#aaa',
    opacity: 1,
    titleColor: '#444',
    subTitleColor: '#777',
    textShadowColor: '#aaa',
    tableHoverColor: '#dde4f0',
    tableHoverFontColor: '#000',
}

export const darkTheme = {
    primaryColor: '#1890ff',
    applicationBackground: '#001529',
    applicationColor: '#fff',
    backgroundColor: 'rgba(121, 140, 173, 0.3)',
    borderBoxBgColor: '#001529',
    color: '#eeeeee',
    borderColor: '#5e85a3',
    inputBorderColor: 'rgba(121, 140, 173, 0.3)',
    boxShadowColor: '#001529',
    opacity: 0.3,
    titleColor: '#ddd',
    subTitleColor: '#aaa',
    textShadowColor: '#aaa',
    tableHoverColor: '#001529',
    tableHoverFontColor: '#fff',
}
class Theme extends Component {
    toggleTheme = (checked) => {
        if (checked === true) {
            this.props.setDarkTheme(darkTheme)
        } else {
            this.props.setLightTheme(lightTheme)
        }

    }
    render() {
        const { themeType } = this.props;
        return (
            <div>
                <Switch
                    checked={themeType === 'light' ? false : true}
                    onChange={this.toggleTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
        )
    }
}

const mapStateToProps = ({ theme }) => ({
    themeType: theme.themeType
})
const mapDispatchToProps = dispatch => bindActionCreators({
    setLightTheme,
    setDarkTheme
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Theme);