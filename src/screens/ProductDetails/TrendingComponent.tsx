/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {useColorModeValue, View} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Caption, SubTitle} from '../../components/Typography';
import {theme} from '../../theme';
import {RootNavigationType} from '../Home';

interface ITrending {
  item: any;
  handleProductLike: (id: number) => void;
}

function TrendingComponent(props: ITrending) {
  const {item, handleProductLike} = props;
  const navigation = useNavigation<RootNavigationType>();

  return (
    <TouchableOpacity
      style={[
        styles.nextImg,
        {
          backgroundColor: useColorModeValue(
            theme.colors.gray[200],
            theme.colors.black[2000],
          ),
        },
      ]}
      onPress={() => {
        navigation.navigate('ProductDetails', {id: item.id});
      }}>
      <View>
        <Image
          source={{
            uri:
              item.images.length > 0
                ? item.images
                : 'https://cdn.pixabay.com/photo/2014/12/08/14/23/pocket-watch-560937__480.jpg',
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.watchImg, {height: 150}]}
          resizeMode="cover"
        />
        <View style={styles.GrandView}>
          <View>
            <SubTitle
              fontWeight={600}
              color={useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )}>
              {item.name}
            </SubTitle>
          </View>
          <View>
            <TouchableOpacity onPress={() => handleProductLike(item.id)}>
              {item.liked ? (
                <FontAwesome
                  name="heart"
                  size={18}
                  style={{color: theme.colors.red[900]}}
                />
              ) : (
                <Feather
                  name="heart"
                  size={18}
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Caption
          style={styles.AEDText}
          color={useColorModeValue(
            theme.colors.gray[400],
            theme.colors.appWhite[600],
          )}>
          AED {item.sale_price}
        </Caption>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  watchImg: {
    width: '100%',
    height: 175,
    alignSelf: 'stretch',
  },
  nextImg1: {
    width: '100%',
  },
  nextImg: {
    margin: 10,
    padding: 10,
    width: 150,
    backgroundColor: theme.colors.gray[100],
  },
  GrandView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 5,
    marginHorizontal: 5,
    // padding: 10,
  },

  AEDText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
});
export default TrendingComponent;
