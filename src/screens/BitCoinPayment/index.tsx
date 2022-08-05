/* eslint-disable */
// @ts-nocheck

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
const amountInBTC = 0.0015;
const transactionId = 0.00000001;

const APIKEY = 'caf7-d44f-5d0a-35f2';
const getAddressesEndpoint =
  'https://block.io/api/v2/get_my_addresses/?api_key=846a-d593-23b5-5a09&page=1';
const getBalanceInWalletEndpoint =
  'https://block.io/api/v2/get_address_balance/?api_key=' +
  APIKEY +
  '&addresses=';

export default class Bpayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: '',
      amount: 0,
      isLoading: true,
      status: 0, // unknown status
    };
  }
  componentWillMount() {
    const _this = this;
    const URL = getAddressesEndpoint;
    fetch(URL, {
      method: 'get',
      mode: 'no-cors',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log('json', json);
        const amount = amountInBTC + transactionId;
        _this.oldBalance = json.data.addresses[0].available_balance;
        _this.setState({
          wallet: json.data.addresses[0].address,
          isLoading: false,
          amount,
        });
      });
  }
  _onPressBack() {
    const {goBack} = this.props.navigation;
    goBack();
  }
  _confirmPayment() {
    const _this = this;
    const URL = getBalanceInWalletEndpoint + this.state.wallet;
    fetch(URL, {
      method: 'get',
      mode: 'no-cors',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const newBlance = json.data.available_balance;

        const newBlanceWithAmount =
          parseFloat(_this.oldBalance) + _this.state.amount;

        if (newBlance == newBlanceWithAmount)
          _this.setState({status: 1}); // success
        else _this.setState({status: 2}); // error
      });
  }
  renderPayment() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.status ? (
          this.state.status == 1 ? (
            <Text style={styles.success}>
              Bitcoins received, payment successful
            </Text>
          ) : (
            <Text style={styles.error}>
              Bitcoins not received, contact admin for assistance or try after
              few mins.
            </Text>
          )
        ) : (
          <View />
        )}

        <Text style={styles.info}>Amount : {this.state.amount} BTC</Text>
        <QRCode value={this.state.wallet} />
     
        <Text style={styles.info}>{this.state.wallet}</Text>
        <Button
          onPress={() => this._confirmPayment()}
          title="Confirm Payment"
          color="#81c04d"
        />
        <Text style={{marginTop: 10}}>
          Press the button after making payment
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this._onPressBack()}>
            <Text style={styles.toolbarButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Make Payment</Text>
          <Text style={styles.toolbarButton}></Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.state.isLoading ? (
            <ActivityIndicator styleAttr="Large" />
          ) : (
            this.renderPayment()
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  success: {
    fontSize: 11,
    textAlign: 'center',
    color: 'green',
  },
  error: {
    fontSize: 11,
    textAlign: 'center',
    color: 'red',
  },
  info: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 17,
    flexWrap: 'wrap',
    width: '80%',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
});
