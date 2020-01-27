import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import {DataService} from '../services/data-service';

let service = new DataService();

class MyListItem extends React.Component{
    render() {
        let { addFavorite, data } = this.props;
        let favorite = (data.favorite) ? data.favorite : false;
        return(
            <TouchableOpacity style={{flex:1}}>
                <View style={styles.listRow}>
                    <View style={styles.listCol}>
                        <View style={styles.listMainCol}>
                            <Text style={styles.listTitleHead}>{data.name}</Text>
                        </View>
                        <View style={styles.listSubCol}>
                            <Text>{data.status}</Text>
                        </View>
                        <TouchableOpacity style={styles.iconCol}
                            onPress={() => addFavorite(data.name, !favorite) }>
                            {
                                (favorite) ? 
                                <Icon name="favorite" size={16} color="red" /> :
                                <Icon name="favorite-border" size={16} color="blue" />
                            }
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}
var setFavorite = null
export  class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this._renderItem = this._renderItem.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        let restaurants = service.load();
        this.setState({restaurants});
    }
    _renderItem = ({item, index, separators}) => (
        <MyListItem
            data={item}
            addFavorite={setFavorite}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
        />
    );

    _keyExtractor = (item, index) => index.toString();
    render() {
        let {state, displaySort, addFavorite} = this.props;
        setFavorite = addFavorite;
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.h2}>{state.restaurants.length} Restaurants </Text>
                    <View style={{flex:1}}>
                        <Text style={styles.sort} onPress={() => displaySort()}>
                            SORT BY
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={state.restaurants}
                    renderItem={this._renderItem}
                    extraData={state}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    sort:{
        textAlign: 'right', 
        color: 'blue',
        fontSize: 14,
        paddingVertical: 18
    },
    listTitleHead: {
        marginLeft: 5,
        fontSize: 14, 
        fontWeight: 'bold'
    },
    listRow: {
        flex: 1,
        flexDirection: 'column',
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    listCol:{
        flex:1,
        flexDirection: 'row',
        padding: 5
    },
    listMainCol: {
        flex:2,
    },
    listSubCol: {
        flex:1,
        flexDirection: 'row'
    },
    iconCol: {
        flex:0.2,
        zIndex:100
    }
});
