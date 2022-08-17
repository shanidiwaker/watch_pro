import { IUserState } from './UserInterface';
import { UserTypes } from './UserTypes';

const initialState: IUserState = {
  loading: false,
  isLoggedIn: false,
  token: null,
  otp: '',
  status: false,
  // documentId: null,
  username: null,
  user: null,
  shop: null,
  // verifyingEmail: false,
  // isFirstLogin: false,
  refreshToken: null,
};

const userReducer = (state: IUserState = initialState, action: any) => {
  switch (action.type) {
    case UserTypes.LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.LOGIN_FULFILLED: {
      const { accessToken, user, shop } = action?.payload || {};
      return {
        ...state,
        token: accessToken,
        user,
        shop: shop && shop[0],
        loading: false,
        isLoggedIn: true,
      };
    }
    case UserTypes.LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };

    case UserTypes.APPLE_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.APPLE_LOGIN_FULFILLED: {
      const { accessToken, user, shop } = action?.payload || {};
      return {
        ...state,
        token: accessToken,
        user,
        shop: shop && shop[0],
        loading: false,
        isLoggedIn: true,
      };
    }
    case UserTypes.APPLE_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };

    case UserTypes.SOCIAL_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case UserTypes.SOCIAL_LOGIN_FULFILLED: {
      const { accessToken, user, shop } = action?.payload || {};
      return {
        ...state,
        token: accessToken,
        user,
        shop: shop && shop[0],
        loading: false,
        isLoggedIn: true,
      };
    }
    case UserTypes.SOCIAL_LOGIN_REJECTED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };

    case UserTypes.FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        loading: true,
        status: false,
      };
    case UserTypes.FORGOT_PASSWORD_FULFILLED: {
      const { accessToken } = action?.payload || {};
      return {
        ...state,
        token: accessToken,
        loading: false,
        otp: true,
        status: true,
      };
    }
    case UserTypes.FORGOT_PASSWORD_REJECTED:
      return {
        ...state,
        loading: false,
        status: false,
      };

    case UserTypes.SHOP_PENDING:
      return {
        ...state,
        loading: true,
        status: false,
      };
    case UserTypes.SHOP_FULFILLED: {
      const { shop } = action?.payload || {};
      return {
        ...state,
        shop,
      };
    }
    case UserTypes.REGISTER_FULFILLED: {
      const { user } = action?.payload || {};
      return {
        ...state,
        user,
      };
    }
    case UserTypes.SHOP_REJECTED:
      return {
        ...state,
        loading: false,
        status: false,
      };

    case UserTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        loading: false,
        documentId: null,
        username: null,
        verifyingEmail: false,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
