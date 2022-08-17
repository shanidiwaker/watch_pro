/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Image, Divider, useColorModeValue} from 'native-base';
import Swipeout from 'react-native-swipeout';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import {useCartOperations} from '../Cart/Queries/useCartOperations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {
  IMyOrderItems,
  useFetchMyOrderItems,
} from './Queries/useFetchMyOrderItems';
import HeaderSimple from '../../components/HeaderSimple';
import {RootNavigationType} from '../Home';
export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MyOrderDetail'
>;
// import {Link,useRoute} from '@react-navigation/native'
import moment from "moment";
import { Text } from 'react-native-svg';
function MyOrderDetail(props: ProfileScreenProps) {
    const navigation = useNavigation<RootNavigationType>();
    const inset = useSafeAreaInsets();
    const {t} = useTranslation();
    const {route} = props;
    const data = route.params.data
    const address = data.address
    const product = data.product
    console.log('props',product)
    return(
    <View
    style={{
      height: '100%',
      width: '100%',
      paddingTop: inset.top,
      backgroundColor: useColorModeValue(
        theme.colors.appWhite[600],
        theme.colors.black[200],
      ),
    }}>
    <>
      <HeaderSimple title={t('MyOrder:MyOrder')} />
      <ScrollView
        style={{
          height: '100%',
        }}
        contentContainerStyle={[
          styles.root,
          {
            backgroundColor: useColorModeValue(
              theme.colors.gray[100],
              theme.colors.black[2000],
            ),
            paddingBottom: 50,
          },
        ]}>
              <View
            bg={useColorModeValue(
              "#008080",
              theme.colors.appWhite[600],
            )}
            height={60}
            justifyContent="center"
            alignItems="center">
                <Image source={require("../.././assets/images/box.png")}  style={{height:22,width:22}}/>
            <SubTitle
              color={useColorModeValue(
                theme.colors.appWhite[600],
                theme.colors.black[2000],
              )}
              fontWeight="400">
              Pending
            </SubTitle>
          </View>
          <View style={styles.cardSubContainer}>
            {product.map((item:any[])=>{
              console.log('itemasds',item)
              return(
                <View style={styles.cardSubContainer}>
                <Image source={{uri:item.images}} style={{height:130,width:130}} />
                <Title
               color={useColorModeValue(
                 theme.colors.black[600],
                 theme.colors.black[2000],
               )}
               marginTop={1}
               marginBottom={0}
               fontSize={16}
               fontWeight="400">
               {item.name}
             </Title>
             <Caption
               color={useColorModeValue(
                 theme.colors.black[600],
                 theme.colors.black[2000],
               )}
               marginTop={0}
               
               fontWeight="400">
              Size:{item.size}
             </Caption>
             <SubTitle
               color={useColorModeValue(
                 theme.colors.black[600],
                 theme.colors.black[2000],
               )}
               marginTop={0}
               
               fontWeight="400">
               AED {item.price}
             </SubTitle>
            </View>
              )
             
            }) }
           
          </View>

          <View style={styles.card}>
      
           <Title
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={1}
              marginBottom={1}
              fontWeight="400">
              Address Details
            </Title>

            <View style={{height:0.2,width:"100%",backgroundColor:'#000'}} />
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={2}
              
              fontWeight="400">
             {address.username}
            </SubTitle>
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={1}
              
              fontWeight="400">
             {address.phone_no}
            </SubTitle>
            <Caption
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={1}
              
              fontWeight="400">
             {address.full_address}
            </Caption>
            <Caption
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              
              marginBottom={1}
              fontWeight="400">
             {address.state}
            </Caption>

            <Caption
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              
              marginBottom={1}
              fontWeight="400">
             {address.city}
            </Caption>
            <Caption
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              
              marginBottom={1}
              fontWeight="400">
             {address.pincode}
            </Caption>
          </View>

          <View style={styles.card}>
          <Title
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={1}
              marginBottom={1}
              fontWeight="400">
              Total Price
            </Title>

            <View style={{height:0.3,width:"100%",backgroundColor:'#000'}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[600],
                theme.colors.black[2000],
              )}
              marginTop={1}
              
              fontWeight="400">
             Total 
            </SubTitle>
            <SubTitle
              color={useColorModeValue(
                "#008080",
                theme.colors.black[2000],
              )}
              marginTop={1}
              
              fontWeight="400">
            AED {data.amount}
            </SubTitle>
            </View>
           
          </View>

        </ScrollView>
      </>
    </View>
    )
}
const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gray[100],
  },
  root: {
    width: '100%',
    // height: '100%',
    flexGrow: 1,
  },
  productimage: {height: 100, width: 100, borderRadius: 360, borderWidth: 1},

  Outcont: {
    borderRadius: 5,
    width: 340,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  customertwo: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  card:{marginTop:20,width:"100%",backgroundColor:"#FFFFFF",padding:20},
  cardSubContainer:{marginTop:20,width:"100%",backgroundColor:"#FFFFFF",padding:10,alignItems:'center',justifyContent:'center'}
  
});

export default MyOrderDetail;
