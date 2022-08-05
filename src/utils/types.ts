/**
 * @format
 */

export type MemberShipStatus = 'all' | 'accepted' | 'pending' | 'blocked' | '';
export type ActionRequest = 'approve' | 'reject' | 'accepted';
export type FollowType = 'following' | 'followed';
export type ActionBlockUnblock =
  | 'block'
  | 'blocked'
  | 'unblock'
  | 'accepted'
  | 'approve'
  | 'reject';
