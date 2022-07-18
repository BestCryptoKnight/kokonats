import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

const pixelRatio = PixelRatio.get();
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 1125;

const wScale = size => (width / guidelineBaseWidth) * size;
const hScale = size => (height / guidelineBaseHeight) * size;
const hScaleRatio = size => (width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) => size + (wScale(size) - size) * factor;
const normalizeSize = size => {
  switch (true) {
    case pixelRatio < 1.4:
      return size * 0.8;
    case pixelRatio < 2.4:
      return size * 1.15;
    case pixelRatio < 3.4:
      return size * 1.35;
    default:
      return size * 1.5;
  }
};

export { width, height, wScale, hScale, hScaleRatio, moderateScale, normalizeSize };
