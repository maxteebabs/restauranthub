const axios = require('axios');
const SampleData = require('../sample');
import {AsyncStorage} from 'react-native';

export class DataService {
    load() {
        try {
            // AsyncStorage.removeItem('sample-data');
            return AsyncStorage.getItem('sample-data')
                .then((res) => {
                if(res) {
                    let data = JSON.parse(res);
                    data = this.sortDataByPriority(data);
                    return data;
                }
                this.saveData(SampleData);
                return SampleData;
            });
        }catch(err) {
            console.log(err);
        }
    }
    sortDataByPriority(data) {
        data = this.sortByOpeningState(data);
        data = this.sortByFavorites(data);
        return data;
    }
    sortByFavorites(data) {
        data.restaurants.sort((a, b) => {
            return (b.favorite === true) - (a.favorite === true)
        });
        return data;
    }
    sortByOpeningState(data) {
        let open = [];
        let others = [];
        let order_ahead = [];
        data.restaurants.forEach(rest => {
            if(rest.status === 'open') {
                open.push(rest);
            }else if(rest.status === 'order ahead') {
                order_ahead.push(rest);
            }else{
                others.push(rest);
            }
        });
        let newData = open.concat(order_ahead, others);
        return {"restaurants" : newData};
    }
    saveData(data) {
        try {
            AsyncStorage.setItem('sample-data', JSON.stringify(data));
        }catch(err) {
            console.log(err);
        }
    }
    searchData(text) {
        return this.load().then((res) => {
            let data = res.restaurants.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            data = this.sortDataByPriority({"restaurants": data});
            return data;
        });    
    }
    saveFavorite(name, val) {
        return this.load().then((res) => {
            if(res.restaurants) {
                let newData = res.restaurants.map((rest, index) => {
                    if(rest.name === name) {
                        rest.favorite = val;
                        return rest;
                    }else{
                        return rest;
                    }
                });
                this.saveData({"restaurants": newData });
            }
        });
    }
    async sortData(param) {
        return this.load().then((res) =>{
            if(res.restaurants) {
                if(param === 'topRestaurants'){
                    res.restaurants.sort((a, b) => {
                        let rest1 = a.sortingValues;
                        let rest2 = b.sortingValues;
                        restCalc1 = (rest1.distance * rest1.popularity) + rest1.ratingAverage;
                        restCalc2 = (rest2.distance * rest2.popularity) + rest2.ratingAverage;
                        return restCalc1 - restCalc2;
                    });
                }else{
                    res.restaurants.sort((a, b) => {
                        let rest1 = a.sortingValues[param];
                        let rest2 = b.sortingValues[param];
                        return rest1 - rest2;
                    });
                }
                return res;
            }
        });
        
    }
}