
import React from 'react';
import  { StyleSheet, TextInput, View } from 'react-native';
import * as Icon from '@expo/vector-icons';
    
export default class SearchInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {    
        let { setInput } = this.props;

        return (
            <View style={styles.searchWrapper}>
                <Icon.Ionicons name="ios-search" size={24} 
                    style={{paddingVertical:10, paddingLeft:10}} />
                <TextInput placeholderTextColor='#444'
                     autoCorrect={false} style={styles.search} 
                     placeholder="Type here..." 
                     onChangeText={(input) => setInput(input)} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    search: { 
       height: 40,
       padding: 10,
       alignSelf: 'stretch',
    },
    searchWrapper: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 2,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});