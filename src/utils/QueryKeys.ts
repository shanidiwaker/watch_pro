/**
 * @format
 */
const QueryKeys = {
  homeProducts: 'homeProducts',
  productById: 'productById',
  shops: 'shops',
  categories: 'categories',
  brands: 'brands',
  userProfile: 'userProfile',
  shopDetails: 'shopDetails',
  cartItems: 'cartItems',
  address: 'address',
  trendings: 'trendings',
  chats: 'chats',
  messages: 'messages',
  myProducts: 'myProducts',
  sizes:'sizes',
  colors:'colors',
  warranty: 'warranty',
  material:'material',
  reels:"reels"
};

export type QueryKeysType = keyof typeof QueryKeys;

export {QueryKeys};
