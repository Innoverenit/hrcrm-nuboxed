import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFutureNotifications } from '../NotificationAction';
import { List, Avatar, Spin } from 'antd';

class FutureNotification extends Component {
    componentDidMount() {
        this.props.getFutureNotifications();
    }
    render() {
        return (
            <div>
                <List
                    dataSource={this.props.futureNotifications.results}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                >
                    {this.props.isFetching && (
                        <div style={{ textAlign: 'center' }}>
                            <Spin />
                        </div>
                    )}
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ notification }) => {
    return {
        isFetching: notification.isFetching,
        futureNotifications: notification.futureNotifications,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getFutureNotifications
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FutureNotification);