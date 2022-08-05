/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView, Spinner, useColorModeValue, View} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import HeaderSimple from '../../components/HeaderSimple';
import {theme} from '../../theme';
import {Caption, Title} from '../../components/Typography';
import DetailComponent from '../ProductDetails/DetailComponent';
import {RootNavigationType} from '../Home';
import {useSupportFaqs} from './Queries/useSupportFaqs';
import Error from '../../components/Error';

function Support() {
  const {t} = useTranslation();
  const navigation = useNavigation<RootNavigationType>();
  const {data: faqs, error, isLoading, refetch} = useSupportFaqs();
  const inset = useSafeAreaInsets();

  const handleSupport = () => {
    navigation.navigate('SupportForm');
  };

  if (error) {
    return <Error retry={refetch} />;
  }
  if (isLoading) {
    return (
      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        flex={1}>
        <Spinner mb={20} mt={50} />
      </View>
    );
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
      <View style={styles.root}>
        <HeaderSimple
          title={t('support:support')}
          bg="transparent"
          // color={theme.colors.appWhite[600]}
        />
        <ScrollView style={{height: '85%', paddingHorizontal: 15}}>
          <View mb={5}>
            <Caption
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[100],
              )}>
              How can we help you? Please check the faq below as you may find
              your question from the list.
            </Caption>
          </View>
          {faqs &&
            faqs.data.map((item: any) => {
              return (
                <View mb={5}>
                  <DetailComponent
                    isComplete
                    color={useColorModeValue(
                      theme.colors.black[200],
                      theme.colors.gray[100],
                    )}
                    title={item?.question}
                    detail={item?.answer}
                  />
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.Topcus}>
          <View style={styles.contact}>
            <TouchableOpacity
              onPress={handleSupport}
              style={[
                styles.Outcont,
                {
                  borderWidth: 1,
                  borderColor: useColorModeValue(
                    theme.colors.black[200],
                    theme.colors.gray[100],
                  ),
                },
              ]}>
              <Title
                style={styles.customer}
                color={useColorModeValue(
                  theme.colors.black[200],
                  theme.colors.gray[100],
                )}>
                CONTACT CUSTOMER SUPPORT
              </Title>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default Support;

const styles = StyleSheet.create({
  root: {height: '100%', paddingBottom: 35},
  Topcus: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    width: '100%',
  },
  contact: {
    width: '100%',
  },
  Outcont: {
    borderRadius: 5,
    borderWidth: 2,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  customer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
