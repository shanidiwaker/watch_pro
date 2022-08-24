/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Image, Divider, useColorModeValue, FlatList } from 'native-base';
import Swipeout from 'react-native-swipeout';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Caption, SubTitle, Title } from '../../components/Typography';
import { useCartOperations } from '../Cart/Queries/useCartOperations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

import HeaderSimple from '../../components/HeaderSimple';
import { RootNavigationType } from '../Home';
export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ShopDetailSecond'
>;
// import {Link,useRoute} from '@react-navigation/native'
import moment from "moment";
import { Text } from 'react-native-svg';
function ShopDetailSecond(props: ProfileScreenProps) {
  const navigation = useNavigation<RootNavigationType>();
  const inset = useSafeAreaInsets();
  const { t } = useTranslation();
  const { route } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const data = [
    {
      "image": require("../.././assets/images/w1.png"),
      "name": "Rolex"
    }, {
      "image": require("../.././assets/images/w2.png"),
      "name": "Rolex CTX"
    }, {
      "image": require("../.././assets/images/w3.png"),
      "name": "Casio"
    }, {
      "image": require("../.././assets/images/w1.png"),
      "name": "Rolex GX"
    }
  ]

  const renderItem = ({ item, index }: { item: any, index: any }) => {

    return (
      <TouchableOpacity style={styles.mainCardView}>
        <Image source={item.image} style={{ height: '80%', width: '100%' }} />
        <Caption
          color={theme.colors.black[400]}
          fontWeight={700}
          mb={1}>
          {item.name}
        </Caption>
      </TouchableOpacity>
    )
  }

  return (
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
        <HeaderSimple
          title=""
          // isShare
          profile={{
            profilePic:
              route.params.shopImage ??
              'https://www.aphki.or.id//post/avatar.png',
            name: route.params.shopName ?? 'Shop Name',
            user_id: route.params.id,
          }}
        />
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
          <ScrollView horizontal>

            <View
              style={styles.TabView}
              flexDirection="row"
              bg={useColorModeValue(
                theme.colors.gray[100],
                theme.colors.black[2000],
              )}
              py={3}>
              {["Show All", "Top Brands", "Top Categories", "Popular", "Top Seller"].map(
                (item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        setSelectedIndex(index);
                      }}>
                      <View px={3}>
                        {selectedIndex === index ? (
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[700],
                              theme.colors.appWhite[600],
                            )}
                            fontWeight={700}
                            mb={2}>
                            {item}
                          </Caption>
                        ) : (
                          <Caption
                            color={useColorModeValue(
                              theme.colors.black[400],
                              theme.colors.appWhite[600],
                            )}
                            mb={2}>
                            {item}
                          </Caption>
                        )}

                        {selectedIndex === index && <Divider bg="#000" />}
                      </View>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          </ScrollView>
          <Caption
            color={useColorModeValue(
              theme.colors.black[700],
              theme.colors.appWhite[600],
            )}
            fontWeight={700}
            fontSize={18}
            marginTop={1}
            padding={2}
          >
            Top Models
          </Caption>
          <View style={{ marginTop: 10 }}>

            <FlatList
              data={data}
              renderItem={renderItem}
              horizontal
            />

          </View>

          <Caption
            color={useColorModeValue(
              theme.colors.black[700],
              theme.colors.appWhite[600],
            )}
            fontWeight={700}
            fontSize={18}
            marginTop={4}
            padding={2}
          >
            Top Brand
          </Caption>
          <View style={styles.textCardContainer}>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Rolex
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Zenith
              </Caption>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Oris
              </Caption>
            </TouchableOpacity>
          </View>

          <View style={styles.textCardContainer}>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Bulgari
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Cartier
              </Caption>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Omega
              </Caption>
            </TouchableOpacity>
          </View>

          <View style={styles.textCardContainer}>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Vincero
              </Caption>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Arnold
              </Caption>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textCardView}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[700],
                  theme.colors.appWhite[600],
                )}
                fontWeight={500}
                fontSize={14}
                marginTop={0}
                padding={0}
              >
                Seiko
              </Caption>
            </TouchableOpacity>
          </View>

          <Caption
            color={useColorModeValue(
              theme.colors.black[700],
              theme.colors.appWhite[600],
            )}
            fontWeight={700}
            fontSize={18}
            marginTop={4}
            padding={2}
          >
            Top Categories
          </Caption>
          <View style={{ marginTop: 10 }}>

            <FlatList
              data={data}
              renderItem={renderItem}
              horizontal
            />

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
  productimage: { height: 100, width: 100, borderRadius: 360, borderWidth: 1 },
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
  mainCardView: {
    height: 200,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    paddingLeft: 6,
    paddingRight: 4,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 6,
  },
  card: { marginTop: 20, width: "100%", backgroundColor: "#FFFFFF", padding: 20 },
  cardSubContainer: { marginTop: 20, width: "100%", backgroundColor: "#FFFFFF", padding: 10, alignItems: 'center', justifyContent: 'center' }
  ,
  textCardView: {
    height: 40,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    paddingLeft: 12,
    paddingRight: 10,
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 12,
    marginRight: 10,
  },
  textCardContainer: { marginTop: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  TabView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.colors.gray[300],
  }
});

export default ShopDetailSecond;
