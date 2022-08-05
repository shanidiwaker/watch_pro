/* eslint-disable global-require */
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Image} from 'react-native';
import {ScrollView, useColorModeValue, View} from 'native-base';
import {useTranslation} from 'react-i18next';
import HeaderSimple from '../../components/HeaderSimple';
import images from '../../assets/images';
import {theme} from '../../theme';
import {Caption, SubTitle} from '../../components/Typography';

function About() {
  const {t} = useTranslation();
  const inset = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.fullScreen,
        {
          paddingTop: inset.top,
          backgroundColor: useColorModeValue(
            theme.colors.gray[100],
            theme.colors.black[2000],
          ),
        },
      ]}>
      <View style={styles.root}>
        <ScrollView>
          <HeaderSimple title={t('about:about')} bg="transparent" />
          <View width="100%" justifyContent="center" alignItems="center" p={10}>
            <Image source={images.LOGO} style={styles.img} />
            <Caption
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[100],
              )}
              pt={2}>
              Version 1.0
            </Caption>
          </View>
          <View mb={5}>
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.appWhite[600],
              )}
              fontWeight="600">
              Terms & Conditions
            </SubTitle>
            <Caption
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[400],
              )}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              blandit euismod netus ornare. Gravida elit egestas in hendrerit
              non integer. Commodo eget lorem arcu eu vitae. Erat a, non nibh
              potenti.
            </Caption>
          </View>
          <View mb={5}>
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.appWhite[600],
              )}
              fontWeight="600">
              Lorem ipsum dolor.
            </SubTitle>
            <Caption
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[400],
              )}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              blandit euismod netus ornare. Gravida elit egestas in hendrerit
              non integer. Commodo eget lorem arcu eu vitae. Erat a, non nibh
              potenti.
            </Caption>
          </View>
          <View>
            <SubTitle
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.appWhite[600],
              )}
              fontWeight="600">
              Privacy Policy
            </SubTitle>
            <Caption
              color={useColorModeValue(
                theme.colors.black[200],
                theme.colors.gray[400],
              )}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              blandit euismod netus ornare. Gravida elit egestas in hendrerit
              non integer. Commodo eget lorem arcu eu vitae. Erat a, non nibh
              potenti.
            </Caption>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default About;

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.black[150],
  },
  root: {height: '100%', paddingBottom: 35},
  img: {width: 175, height: 155, resizeMode: 'contain'},
});
