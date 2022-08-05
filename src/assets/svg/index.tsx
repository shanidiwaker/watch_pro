import React from 'react';
import AddMedia from './add-media.svg';
import AddUser from './add-user.svg';
import CheckUser from './check-user.svg';
import Comment from './comment.svg';
import Gif from './gif.svg';
import ImageCloseDefault from './image-close-default.svg';
import ImageCloseHover from './image-close-hover.svg';
import Photo from './photo.svg';
import Repost from './repost.svg';
import SearchIcon from './search-icon.svg';
import Share from './share.svg';
import Smile from './smile.svg';
import Subscribe from './subscribe.svg';
import User from './user.svg';
import WalletRightSideIcon from './wallet-right-side-icon.svg';
import Gallery from './icon__gallery.svg';

export interface ISVGProps {
  fill?: string;
  width?: number;
  height?: number;
}
export function AddMediaIcon(props: ISVGProps) {
  return <AddMedia {...props} name="add-media" />
}
export function AddUserIcon(props: ISVGProps) {
  return <AddUser {...props} name="add-user" />
}
export function CheckUserIcon(props: ISVGProps) {
  return <CheckUser {...props} name="check-user" />
}
export function CommentIcon(props: ISVGProps) {
  return <Comment {...props} name="comment" />
}
export function GifIcon(props: ISVGProps) {
  return <Gif {...props} name="gif" />
}
export function ImageCloseDefaultIcon(props: ISVGProps) {
  return <ImageCloseDefault {...props} name="image-close-default" />
}
export function ImageCloseHoverIcon(props: ISVGProps) {
  return <ImageCloseHover {...props} name="image-close-hover" />
}
export function PhotoIcon(props: ISVGProps) {
  return <Photo {...props} name="photo" />
}
export function RepostIcon(props: ISVGProps) {
  return <Repost {...props} name="repost" />
}
export function SearchIconIcon(props: ISVGProps) {
  return <SearchIcon {...props} name="search-icon" />
}
export function ShareIcon(props: ISVGProps) {
  return <Share {...props} name="share" />
}
export function SmileIcon(props: ISVGProps) {
  return <Smile {...props} name="smile" />
}
export function SubscribeIcon(props: ISVGProps) {
  return <Subscribe {...props} name="subscribe" />
}
export function UserIcon(props: ISVGProps) {
  return <User {...props} name="user" />
}
export function WalletRightSideIconIcon(props: ISVGProps) {
  return <WalletRightSideIcon {...props} name="wallet-right-side-icon" />
}

export function GalleryIcon(props: ISVGProps) {
  return <Gallery {...props} name="gallery" />
}