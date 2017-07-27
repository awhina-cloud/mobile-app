/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import dependencies.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, TouchableHighlight, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

/**
 * Import local dependencies.
 */
import styles from './styles';

/**
 * Import actions.
 */

/**
 * Create the container.
 */
class DealsScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.deals)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.deals)});
    }

    render() {
        let {onNavigateToOffersScreen, deals, orders} = this.props;
        let {dataSource} = this.state;
        return (
            <View style={styles.container}>
                <ListView style={styles.list} dataSource={dataSource} renderRow={deal => (
                    <TouchableHighlight onPress={() => onNavigateToOffersScreen(deal)}>
                        <View style={styles.row}>
                            <Image
                                style={styles.backdrop}
                                source={{uri: deal.image}}>
                                <View style={styles.backdropView}>
                                    <Text style={styles.title1}>{deal.title1}</Text>
                                    <Text style={styles.title2}>{deal.title2}</Text>
                                    <Text style={styles.title3}>{deal.title3}</Text>
                                    {!isNaN(deal.distance) &&
                                    <Text style={styles.distance}>{deal.distance > 1000 ? `${(deal.distance / 1000).toFixed(2)}km` : `${deal.distance}m`}</Text>
                                    }
                                </View>
                            </Image>
                        </View>
                    </TouchableHighlight>
                )}/>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        deals: app.deals,
        orders: app.buyer ? app.buyer.orders : []
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateToOffersScreen: (deal) => dispatch(NavigationActions.navigate({
            routeName: 'Offers',
            params: {deal}
        }))
    }
};

/**
 * Export the container component.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, {
        pure: false // https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
    }
)(DealsScreen);
