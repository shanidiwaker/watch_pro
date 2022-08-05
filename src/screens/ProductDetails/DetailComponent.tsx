/* eslint-disable react-hooks/rules-of-hooks */
import {Divider, useColorModeValue, View} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Caption, Title} from '../../components/Typography';
import {theme} from '../../theme';

interface IDetails {
  brandName?: string;
  warranty?: string;
  size?: string;
  material?: string;
  brandMaterial?: string;
  isComplete?: boolean;
  detail?: string;
  title: string;
  sale_price?: string | number;
  color?: string;
  price?: string | number;
}
function DetailComponent(props: IDetails) {
  const {
    brandName,
    isComplete,
    detail,
    warranty,
    size,
    material,
    brandMaterial,
    title,
    color,
    price,
    sale_price,
  } = props;
  const [show, setShow] = useState(!isComplete);
  const {t} = useTranslation();

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShow(!show)}>
          <Title
            pl={color ? 0 : 5}
            pt={2}
            pb={2}
            fontSize={16}
            fontWeight="600"
            color={
              color ||
              useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )
            }>
            {title}
          </Title>
          <FeatherIcon
            style={styles.heartI}
            name={show ? 'minus' : 'chevron-down'}
            color={
              color ||
              useColorModeValue(
                theme.colors.black[2000],
                theme.colors.appWhite[600],
              )
            }
          />
        </TouchableOpacity>
        {show ? (
          !isComplete ? (
            <View px={5} pb={5}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:brand')}{' '}
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {brandName}
                </Caption>
              </Caption>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:warrenty')}{' '}
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {warranty ?? ' 1-year'}
                </Caption>
              </Caption>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:caseSize')}{' '}
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {size ?? '41mm'}
                </Caption>
              </Caption>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:caseMaterial')}{' '}
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {material ?? 'Platinium'}
                </Caption>
              </Caption>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {t('product:brandMaterial')}{' '}
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {' '}
                  {brandMaterial ?? 'Alligator'}
                </Caption>
              </Caption>
              {sale_price ? (
                <Caption
                  color={useColorModeValue(
                    theme.colors.black[2000],
                    theme.colors.appWhite[600],
                  )}>
                  Sale Price
                  <Caption
                    color={useColorModeValue(
                      theme.colors.gray[400],
                      theme.colors.appWhite[600],
                    )}>
                    {' '}
                    {sale_price}
                  </Caption>
                </Caption>
              ) : null}

              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                Price
                <Caption
                  color={useColorModeValue(
                    theme.colors.gray[400],
                    theme.colors.appWhite[600],
                  )}>
                  {' '}
                  {price}
                </Caption>
              </Caption>
            </View>
          ) : (
            <View px={5} pb={5}>
              <Caption
                color={useColorModeValue(
                  theme.colors.black[2000],
                  theme.colors.appWhite[600],
                )}>
                {detail}
              </Caption>
            </View>
          )
        ) : null}
      </View>
      <Divider bg={theme.colors.gray[400]} />
    </>
  );
}
DetailComponent.defaultProps = {
  isComplete: false,
  detail: '',
  brandName: '',
  warranty: '',
  size: '',
  material: '',
  brandMaterial: '',
  color: '',
  sale_price: '',
  price: '',
};
const styles = StyleSheet.create({
  heartI: {
    fontSize: 25,
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderTopWidth: 1,
    alignItems: 'center',
    paddingRight: 10,
    borderColor: theme.colors.gray[400],
  },
});
export default DetailComponent;
