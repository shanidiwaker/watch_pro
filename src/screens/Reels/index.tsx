import React, {useState, useRef, useContext} from 'react';
import {View, Animated, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FeedRow} from '../../components/FeedRow';
import {AppContext} from '../../Context';
import CommonStyle from '../../Theme/CommonStyle';
import {height, isIOS} from '../../constants';
import {data} from '../../utils/data';
import {useReels} from './Query/useFetchReels';
import {RootStackParamList} from '../../navigation';
import {useProductOperations} from '../Home/Queries/useProductOperations';
import {useProfileOperations} from '../UserProfile/Queries/useProfileOperations';
import HeaderSimple from '../../components/HeaderSimple';
import {theme} from '../../theme';
import {useColorModeValue} from 'native-base';

export type ReelsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Reels'
>;

function Reels(props: ReelsScreenProps) {
  const {route, navigation} = props;
  const {displayHeight, setDisplayHeight} = useContext(AppContext);
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const {likePeoduct, productsbyCategory} = useProductOperations();
  const {followUser} = useProfileOperations();
  const inset = useSafeAreaInsets();

  const {feedList, isLoading, refetch, isFetchingNextPage, onEndReached} =
    useReels(route?.params?.id, route?.params?.reel);
  // console.log('feedList', JSON.stringify(feedList, null, 2));
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};
  const onViewableItemsChanged = useRef(viewableItems => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });
  const handleLike = async (id: number) => {
    console.log('id', id);
    await likePeoduct(id);
  };
  const handleFollow = async (id: number) => {
    console.log('id', id);
    await followUser(id);
  };

  const transitionAnimation = index => {
    const rowHeight = displayHeight * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + displayHeight / 2,
          rowHeight + displayHeight,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: displayHeight,
    offset: displayHeight * index,
    index,
  });

  const onLayout = ({nativeEvent}) => {
    setDisplayHeight(
      (!isIOS && nativeEvent.layout.height - inset.top) || height - inset.top,
    );
  };

  // const onEndReached = () => {
  //   // make api call here
  // };

  const keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  const renderItem = ({item, index}) => {
    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        index={index}
        handleLike={handleLike}
        handleFollow={handleFollow}
        navigation={navigation}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        isVisible={scrollIndex === index}
      />
    );
  };

  return (
    <View style={CommonStyle.flexContainer} onLayout={onLayout}>
      <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
        />
      <View
        style={{
          position: 'absolute',
          top: inset.top,
          left: 0,
          zIndex: 9999,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
         
        }}>
        <HeaderSimple
          title="Reels"
          bg="transparent"
          color={theme.colors.appWhite[600]}
        />
      </View>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        data={feedList}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={20}
        onEndReached={onEndReached}
        removeClippedSubviews
      />
    </View>
  );
}

export default Reels;
