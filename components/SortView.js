
import React from 'react';
import  { StyleSheet, TouchableHighlight, Text, View, Modal } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} 
    from 'react-native-simple-radio-button';
import {appConfig} from '../config';
import { Button } from 'native-base';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {    
        let { hideSort, modalVisible, applySort } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    hideSort()
                    // Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View style={styles.wrapper}>
                        <RadioForm
                            radio_props={appConfig.sortParams}
                            initial={0}
                            onPress={(value) => applySort(value)}
                        />
                        <Button primary onPress={() => {
                            hideSort();
                            }} style={{justifyContent: 'center', }}>
                            <Text style={{color:'#fff'}}>
                                 Apply </Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    wrapper:{
        padding:18
    }
});