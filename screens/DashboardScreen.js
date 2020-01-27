import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet, Text,
  View,
} from 'react-native';
import {DataService} from '../services/data-service';
import { RestaurantList } from '../components/RestaurantList';
import SearchInput from '../components/searchInput';
import SortView from '../components/SortView';
import { Header, Left, Right, Body, Title, Container } from 'native-base';
import {appConfig} from '../config';

let service = new DataService();

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants:[],
            loading: false,
            modalVisible: false,
            selectedSort: null,
        }
        this.loadData = this.loadData.bind(this);
        this._search = this._search.bind(this);
        this.displaySort = this.displaySort.bind(this);
        this.hideSort = this.hideSort.bind(this);
        this.applySort = this.applySort.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        let restaurants = await service.load();
        if(restaurants.restaurants) {
            this.setState({restaurants: restaurants.restaurants});
        }     
    }
    async _search(text) { 
        if(text.length === 0) {
            this.loadData();
        }else{
            let data = await service.searchData(text);
            if(data.restaurants) {
                this.setState({restaurants: data.restaurants});
            } 
        }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    displaySort() {
        this.setState({modalVisible: true});
    }
    hideSort() {
        this.setState({modalVisible: false});
    }
    async addFavorite(name, status) {
        let _this = this;
        await service.saveFavorite(name, status).then((res) =>{
            _this.loadData();
        });
    }
    async applySort(value) {
        //sort this value
        let selectedSort = appConfig.sortParams.find((item, index) => {
            return item.value === value;
        });
        this.setState({selectedSort: selectedSort});
        let restaurants = await service.sortData(value);
        if(restaurants.restaurants) {
            this.setState({restaurants: restaurants.restaurants});
        }  
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.wrapper}>
                    <SearchInput setInput={this._search} />
                    <View style={{flexDirection: 'row'}}>
                        {
                            (this.state.selectedSort) ?
                                <>
                                    <Text>Sorted By: {this.state.selectedSort.label}</Text>
                                    <Text style={{marginLeft: 10}}>val: 
                                        {this.state.selectedSort.value}</Text>
                                </> : null
                        }
                    </View>
                    <RestaurantList state={this.state} 
                        addFavorite={this.addFavorite}
                        navigation={this.props.navigation}
                        displaySort={this.displaySort} />
                </View>

                <SortView hideSort={this.hideSort} 
                    modalVisible={this.state.modalVisible}
                    applySort = {this.applySort} />
            </Container>
        );
    }
}
DashboardScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'flex-start',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 10,
        flex:1,
    },
});
