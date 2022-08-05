import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import Slideshow from '../SliderShow';

interface ISlider {
  image: string;
}
interface ISliderProps {
  slider: ISlider[];
  isProdiuct?: boolean;
}

function CustomImageSlider(props: ISliderProps) {
  const {slider} = props;

  const [images, setImages] = React.useState<{url: string}[]>([]);
  const [isAutoLpay, setAutoPlay] = React.useState(false);
  const imagesTemp = [
    {
      url: 'https://cdn.pixabay.com/photo/2014/12/08/14/23/pocket-watch-560937__480.jpg',
    },
    {
      url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {url: 'http://placeimg.com/640/480/any'},
  ];
  React.useEffect(() => {
    if (slider) {
      const temp = slider.map(item => {
        return {url: item.image};
      });
      setImages(temp);
    }
  }, [slider]);
  React.useEffect(() => {
    fetchAutoPlay();
  }, []);

  const fetchAutoPlay = async () => {
    const isAutoPlay = await AsyncStorage.getItem('autoPlay');
    if (isAutoPlay) {
      setAutoPlay(true);
      return true;
    }
    setAutoPlay(false);
    return false;
  };
  return (
    <Slideshow
      dataSource={images}
      arrowRight={<Feather name="chevron-right" color="#fff" size={24} />}
      arrowLeft={<Feather name="chevron-left" color="#fff" size={24} />}
      isAutoLpay={isAutoLpay}
    />
  );
}
CustomImageSlider.defaultProps = {
  isProdiuct: false,
};
export default CustomImageSlider;
