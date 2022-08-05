/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import {
  View,
  Divider,
  Spinner,
  useColorModeValue,
  Actionsheet,
  useDisclose,
  Box,
  Text,
} from 'native-base';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  ListRenderItem,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ToggleSwitch from 'toggle-switch-react-native';
import {theme} from '../../theme';
import {Caption, SubTitle, Title} from '../../components/Typography';
import AppContainer from '../../components/AppContainer';
import {RootStackParamList} from '../../navigation';
import Error from '../../components/Error';
import {useFetchProductsByShop} from './Queries/useFetchProductsByShop';
import {RootNavigationType} from '../Home';
import {useProductOperations} from './Queries/useProductOperations';
import {useProductOperations as useProductOp} from '../ProductDetails/Queries/useProductOperations';
import {IResponseDataProduct} from '../Home/Queries/useProductOperations';
import {WatchItem} from '../../components/WatchItem';
import {IProducts} from '../Home/Queries/useFetchProducts';
import FieldComponent from '../EditProfile/FieldComponent';
import {BrandActionSheet} from '../Add';
import CustomButton from '../../components/CustomButton';
import SliderBar from '../../components/SliderBar';
import HeaderSimple from '../../components/HeaderSimple';

export type ShopdetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ShopDetail'
>;

function ShopDetail(props: ShopdetailsScreenProps) {
  const {route} = props;
  const {t} = useTranslation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    isOpen: isBrandOpen,
    onOpen: onBrandOpen,
    onClose: onBrandClose,
  } = useDisclose();
  const {
    isOpen: isSizeOpen,
    onOpen: onSizeOpen,
    onClose: onCloseSize,
  } = useDisclose();
  const {
    isOpen: isColorsOpen,
    onOpen: onColorsOpen,
    onClose: onCloseColors,
  } = useDisclose();
  const {
    isOpen: isMaterialOpen,
    onOpen: onMaterialOpen,
    onClose: onCloseMaterial,
  } = useDisclose();
  const {
    isOpen: isWarrantyOpen,
    onOpen: onWarrantyOpn,
    onClose: onCloseWarranty,
  } = useDisclose();
  const {
    isOpen: isPriceOpen,
    onOpen: onPriceOpen,
    onClose: onClosePrice,
  } = useDisclose();
  const [shopProducts, setShopProducts] = React.useState<IProducts[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [size, setSize] = React.useState('');
  const [color, setColor] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [warranty, setWarranty] = React.useState('');
  const [price, setPrice] = React.useState('');
  const navigation = useNavigation<RootNavigationType>();
  const [isCatLoading, setIsCatLoading] = React.useState(false);
  const [value, setValue] = React.useState(false);
  const inset = useSafeAreaInsets();

  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useFetchProductsByShop(
    route.params.id,
    {
      size,
      color,
      price,
      material,
      warranty,
      brand,
    },
    selectedIndex,
  );
  const {likeProduct, productsbyFilter} = useProductOperations();
  const {collectProduct} = useProductOp(route.params.id);

  React.useEffect(() => {
    if (products && products?.data?.length > 0) setShopProducts(products.data);
    else setShopProducts([]);
  }, [products]);

  if (error) {
    return <Error retry={refetch} />;
  }

  const handleLike = async (id: number) => {
    await likeProduct(id);
  };

  const handleCollect = async (id: number) => {
    await collectProduct(id);
  };

  const handleFilterChange = async (item: string, option = '') => {
    setIsCatLoading(true);
    onClose();
    try {
      const result: any = await productsbyFilter(item, route.params.id, option);
      if (result?.status === true) {
        setShopProducts(result?.data);
      } else {
        setShopProducts([]);
      }
      setIsCatLoading(false);

      return result;
    } catch (err) {
      setIsCatLoading(false);

      return err;
    }
  };

  const onToggle = () => {
    setValue(!value);
  };
  const handleBrand = (data: string) => {
    setBrand(data);
    onBrandClose();
  };
  const handleSize = (data: string) => {
    setSize(data);
    onCloseSize();
  };
  const handleColors = (data: string) => {
    setColor(data);
    onCloseColors();
  };
  const handleMaterial = (data: string) => {
    setMaterial(data);
    onCloseMaterial();
  };
  const handleWarranty = (data: string) => {
    setWarranty(data);
    onCloseWarranty();
  };
  const handlePrice = (data: string) => {
    setPrice(data);
    // onClosePrice();
  };
  const renderItem: ListRenderItem<IProducts> = ({item}) => (
    <WatchItem
      item={item}
      handleLike={handleCollect}
      handleCollect={handleCollect}
      width="48%"
      height={150}
      isCollected
      reel={0}
      isShop
    />
  );
  return (
    // <AppContainer
    //   shopName={route.params.shopName}
    //   isBack
    //   isShop
    //   isProfile
    //   isMenu={false}
    //   shopImage={route.params.shopImage}>
    <View
      style={{
        paddingTop: inset.top,
        height: '100%',
        backgroundColor: useColorModeValue(
          theme.colors.gray[100],
          theme.colors.black[200],
        ),
      }}>
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
      <View style={styles.SerachBg}>
        <View
          backgroundColor={useColorModeValue(
            theme.colors.gray[200],
            theme.colors.black[200],
          )}
          style={styles.searchContainer}>
          <View style={styles.inputView}>
            <Feather name="search" size={18} color={theme.colors.gray[400]} />
            <TextInput
              placeholder={t('common:search')}
              style={styles.input}
              placeholderTextColor={useColorModeValue(
                theme.colors.black[400],
                theme.colors.appWhite[600],
              )}
            />
            <View style={styles.filter}>
              <TouchableOpacity onPress={onOpen}>
                <View flexDirection="row">
                  <Caption>{t('common:filter')}</Caption>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color={useColorModeValue(
                      theme.colors.black[400],
                      theme.colors.appWhite[600],
                    )}
                  />
                </View>
              </TouchableOpacity>
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Title mb={2}>Filter</Title>
                  <Divider mb={3} />
                  <FieldComponent
                    title="BRAND"
                    value={brand || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onBrandOpen();
                    }}
                  />
                  <FieldComponent
                    title="COLOR"
                    value={color || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onColorsOpen();
                    }}
                  />
                  <FieldComponent
                    title="WARRANTY"
                    value={warranty || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onWarrantyOpn();
                    }}
                  />
                  <FieldComponent
                    title="MATERIAL"
                    value={material || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onMaterialOpen();
                    }}
                  />
                  <FieldComponent
                    title="SIZE"
                    value={size || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onSizeOpen();
                    }}
                  />
                  <FieldComponent
                    title="PRICE"
                    value={price || 'Show All'}
                    isEditable={false}
                    down
                    onPress={() => {
                      onPriceOpen();
                    }}
                  />
                  {/* <View
                    width="100%"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={4}
                    mb={2}
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: useColorModeValue(
                        theme.colors.gray[100],
                        theme.colors.black[200],
                      ),
                      borderColor: theme.colors.gray[400],
                    }}>
                    <View flexDirection="row" alignItems="center">
                      <Caption
                        pr={3}
                        color={useColorModeValue(
                          theme.colors.black[200],
                          theme.colors.appWhite[600],
                        )}>
                        {' '}
                        ON SALE
                      </Caption>
                    </View>

                    <ToggleSwitch
                      isOn={value}
                      onColor="green"
                      offColor={theme.colors.gray[400]}
                      labelStyle={styles.toggleStyle}
                      size="medium"
                      onToggle={onToggle}
                    />
                  </View> */}
                  <View flexDirection="row" alignItems="center">
                    <CustomButton
                      title="APPLY FILTER"
                      onPressHandler={() => {
                        setIsCatLoading(true);
                        refetch();
                        onClose();
                        setIsCatLoading(false);
                      }}
                    />
                  </View>
                  {/* 
                    <Actionsheet.Item
                      onPress={() => {
                        setSelectedIndex(0);
                        handleFilterChange('other', 'low-to-high');
                      }}>
                      {t('shop:lowtohigh')}
                    </Actionsheet.Item>
                    <Actionsheet.Item
                      onPress={() => {
                        setSelectedIndex(0);
                        handleFilterChange('other', 'high-to-low');
                      }}>
                      {t('shop:hightolow')}
                    </Actionsheet.Item>
                    <Actionsheet.Item
                      onPress={() => {
                        setSelectedIndex(1);
                        handleFilterChange(t('shop:byBrands'));
                      }}>
                      {t('shop:byBrands')}
                    </Actionsheet.Item>
                    <Actionsheet.Item
                      onPress={() => {
                        setSelectedIndex(2);
                        handleFilterChange(t('shop:alph'));
                      }}>
                      {t('shop:alph')}
                    </Actionsheet.Item> */}
                  <BrandActionSheet
                    handleBrand={handleBrand}
                    isOpen={isBrandOpen}
                    onClose={onBrandClose}
                    from="filter"
                  />
                  <SizeActionSheet
                    handleSelect={handleSize}
                    isOpen={isSizeOpen}
                    onClose={onCloseSize}
                    from="filter"
                  />
                  <ColorsActionSheet
                    handleSelect={handleColors}
                    isOpen={isColorsOpen}
                    onClose={onCloseColors}
                    from="filter"
                  />
                  <MaterialActionSheet
                    handleSelect={handleMaterial}
                    isOpen={isMaterialOpen}
                    onClose={onCloseMaterial}
                    from="filter"
                  />
                  <WarrantyActionSheet
                    handleSelect={handleWarranty}
                    isOpen={isWarrantyOpen}
                    onClose={onCloseWarranty}
                    from="filter"
                  />
                  <PriceActionSheet
                    handleSelect={handlePrice}
                    isOpen={isPriceOpen}
                    onClose={onClosePrice}
                    from="filter"
                  />
                </Actionsheet.Content>
              </Actionsheet>
            </View>
          </View>
        </View>
      </View>
      <View>
        {isLoading || isCatLoading ? (
          <Spinner mb={20} mt={20} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
            ListHeaderComponent={
              <View
                style={styles.TabView}
                flexDirection="row"
                bg={useColorModeValue(
                  theme.colors.gray[100],
                  theme.colors.black[2000],
                )}
                py={3}>
                {[t('shop:showAll'), t('shop:byBrands'), t('shop:alph')].map(
                  (item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setSelectedIndex(index);
                          handleFilterChange(item);
                        }}>
                        <View px={3}>
                          {selectedIndex === index ? (
                            <Caption
                              color={useColorModeValue(
                                theme.colors.black[400],
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
            }
            numColumns={2}
            data={shopProducts}
            renderItem={renderItem}
            ListEmptyComponent={
              <View justifyContent="center" alignItems="center" mt={10}>
                <Title
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  Product Not Found
                </Title>
              </View>
            }
          />
        )}
      </View>
    </View>
    // </AppContainer>
  );
}

export function SizeActionSheet(props: any) {
  const {isOpen, from, onClose, handleSelect} = props;
  const {getSizes} = useProductOperations();
  const [data, setData] = useState();
  React.useEffect(() => {
    handleSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSizes = async () => {
    const result = await getSizes();
    setData(result?.data);
    return result;
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select :
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleSelect('')}>
            Show All
          </Actionsheet.Item>
        )}
        {data &&
          data.map((item: any) => {
            return (
              <Actionsheet.Item
                py="3"
                onPress={() => handleSelect(item.name, item.id)}>
                {item.name}
              </Actionsheet.Item>
            );
          })}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export function WarrantyActionSheet(props: any) {
  const {isOpen, from, onClose, handleSelect} = props;
  const {getWarranty} = useProductOperations();
  const [data, setData] = useState();
  React.useEffect(() => {
    handleSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSizes = async () => {
    const result = await getWarranty();
    setData(result?.data);
    return result;
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select :
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleSelect('')}>
            Show All
          </Actionsheet.Item>
        )}
        {data &&
          data?.map((item: any) => {
            return (
              <Actionsheet.Item
                py="3"
                onPress={() => handleSelect(item.name, item.id)}>
                {item.name}
              </Actionsheet.Item>
            );
          })}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export function MaterialActionSheet(props: any) {
  const {isOpen, from, onClose, handleSelect} = props;
  const {getMaterial} = useProductOperations();
  const [data, setData] = useState();
  React.useEffect(() => {
    handleSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSizes = async () => {
    const result = await getMaterial();
    setData(result?.data);
    return result;
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select :
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleSelect('')}>
            Show All
          </Actionsheet.Item>
        )}
        {data &&
          data.map((item: any) => {
            return (
              <Actionsheet.Item
                py="3"
                onPress={() => handleSelect(item.name, item.id)}>
                {item.name}
              </Actionsheet.Item>
            );
          })}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export function PriceActionSheet(props: any) {
  const {isOpen, from, onClose, handleSelect} = props;

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select :
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleSelect('')}>
            Show All
          </Actionsheet.Item>
        )}
        <SliderBar
          placeholder="PRICE"
          onChangeText={(text: string) => {
            handleSelect(text);
          }}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export function ColorsActionSheet(props: any) {
  const {isOpen, from, onClose, handleSelect} = props;
  const {getColors} = useProductOperations();
  const [data, setData] = useState();
  React.useEffect(() => {
    handleSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSizes = async () => {
    const result = await getColors();
    setData(result?.data);
    console.log('result', result?.data);
    return result;
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box justifyContent="center" px={4} py="3" w="100%">
          <Text
            color={useColorModeValue(
              theme.colors.black[2000],
              theme.colors.appWhite[600],
            )}
            fontFamily="heading"
            fontSize="20">
            Please select :
          </Text>
        </Box>
        {from === 'filter' && (
          <Actionsheet.Item py="3" onPress={() => handleSelect('')}>
            Show All
          </Actionsheet.Item>
        )}

        {data &&
          data.map((item: any) => {
            return (
              <Actionsheet.Item
                py="3"
                onPress={() => handleSelect(item.name, item.id)}>
                {item.name}
              </Actionsheet.Item>
            );
          })}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default ShopDetail;
const styles = StyleSheet.create({
  SerachBg: {
    // backgroundColor:'red',
    // height: 80,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  toggleStyle: {color: theme.colors.black[200], fontWeight: '900'},
  searchContainer: {
    height: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    right: 30,
    borderRadius: 45,
    width: '85%',
    paddingLeft: 26,
  },
  input: {
    height: '100%',
    width: '90%',
    marginLeft: 5,
  },

  TabView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.colors.gray[300],
  },
  filter: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
});
