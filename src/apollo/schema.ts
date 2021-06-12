import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type AddressNode = Node & {
  __typename?: 'AddressNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  addressName: Scalars['String'];
  selectedAddress: ProfileNodeConnection;
};


export type AddressNodeSelectedAddressArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  profileText?: Maybe<Scalars['String']>;
  profileText_Icontains?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  schoolName_Icontains?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  undergraduate_Icontains?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  department_Icontains?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  clubActivities_Icontains?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  admissionFormat_Icontains?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  favoriteSubject_Icontains?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  wantHear_Icontains?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  problem_Icontains?: Maybe<Scalars['String']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  selectedGender?: Maybe<Scalars['ID']>;
};

export type AddressNodeConnection = {
  __typename?: 'AddressNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AddressNodeEdge>>;
};

/** A Relay edge containing a `AddressNode` and its cursor. */
export type AddressNodeEdge = {
  __typename?: 'AddressNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<AddressNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type CreateMessageMutationInput = {
  talkingRoomId: Scalars['ID'];
  text: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMessageMutationPayload = {
  __typename?: 'CreateMessageMutationPayload';
  message?: Maybe<MessageNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePostMutationInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  postImage?: Maybe<Scalars['Upload']>;
  isPublished: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePostMutationPayload = {
  __typename?: 'CreatePostMutationPayload';
  post?: Maybe<PostNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateProfileMutationInput = {
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  telephoneNumber: Scalars['String'];
  wantHear?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateProfileMutationPayload = {
  __typename?: 'CreateProfileMutationPayload';
  profile?: Maybe<ProfileNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateReviewMutationInput = {
  provider: Scalars['ID'];
  reviewText: Scalars['String'];
  stars: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateReviewMutationPayload = {
  __typename?: 'CreateReviewMutationPayload';
  review?: Maybe<ReviewNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTalkRoomMutationInput = {
  talkRoomDescription?: Maybe<Scalars['String']>;
  joinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTalkRoomMutationPayload = {
  __typename?: 'CreateTalkRoomMutationPayload';
  talkRoom?: Maybe<TalkRoomNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserMutationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserMutationPayload = {
  __typename?: 'CreateUserMutationPayload';
  user?: Maybe<UserNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type DeletePostMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeletePostMutationPayload = {
  __typename?: 'DeletePostMutationPayload';
  post?: Maybe<PostNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GenderNode = Node & {
  __typename?: 'GenderNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  genderName: Scalars['String'];
  selectedGender: ProfileNodeConnection;
};


export type GenderNodeSelectedGenderArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  profileText?: Maybe<Scalars['String']>;
  profileText_Icontains?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  schoolName_Icontains?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  undergraduate_Icontains?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  department_Icontains?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  clubActivities_Icontains?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  admissionFormat_Icontains?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  favoriteSubject_Icontains?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  wantHear_Icontains?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  problem_Icontains?: Maybe<Scalars['String']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  selectedGender?: Maybe<Scalars['ID']>;
};

export type GenderNodeConnection = {
  __typename?: 'GenderNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GenderNodeEdge>>;
};

/** A Relay edge containing a `GenderNode` and its cursor. */
export type GenderNodeEdge = {
  __typename?: 'GenderNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<GenderNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};


export type MessageNode = Node & {
  __typename?: 'MessageNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  talkingRoom: TalkRoomNode;
  sender: UserNode;
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type MessageNodeConnection = {
  __typename?: 'MessageNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MessageNodeEdge>>;
};

/** A Relay edge containing a `MessageNode` and its cursor. */
export type MessageNodeEdge = {
  __typename?: 'MessageNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<MessageNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserMutationPayload>;
  createProfile?: Maybe<CreateProfileMutationPayload>;
  updateProfile?: Maybe<UpdateProfileMutationPayload>;
  createPost?: Maybe<CreatePostMutationPayload>;
  updatePost?: Maybe<UpdatePostMutationPayload>;
  deletePost?: Maybe<DeletePostMutationPayload>;
  createTalkRoom?: Maybe<CreateTalkRoomMutationPayload>;
  createMessage?: Maybe<CreateMessageMutationPayload>;
  createReview?: Maybe<CreateReviewMutationPayload>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
};


export type MutationCreateUserArgs = {
  input: CreateUserMutationInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileMutationInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileMutationInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostMutationInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostMutationInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostMutationInput;
};


export type MutationCreateTalkRoomArgs = {
  input: CreateTalkRoomMutationInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageMutationInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewMutationInput;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationRevokeTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type PostNode = Node & {
  __typename?: 'PostNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  postedUser: UserNode;
  title: Scalars['String'];
  content: Scalars['String'];
  postImage?: Maybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  publishedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type PostNodeConnection = {
  __typename?: 'PostNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PostNodeEdge>>;
};

/** A Relay edge containing a `PostNode` and its cursor. */
export type PostNodeEdge = {
  __typename?: 'PostNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<PostNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ProfileNode = Node & {
  __typename?: 'ProfileNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  targetUser: UserNode;
  telephoneNumber: Scalars['String'];
  profileName: Scalars['String'];
  profileText: Scalars['String'];
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  profileImage?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  undergraduate?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  followingUsers: UserNodeConnection;
  selectedAddress: AddressNode;
  selectedGender: GenderNode;
  tags: TagNodeConnection;
};


export type ProfileNodeFollowingUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
};


export type ProfileNodeTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  tagName?: Maybe<Scalars['String']>;
  tagName_Icontains?: Maybe<Scalars['String']>;
};

export type ProfileNodeConnection = {
  __typename?: 'ProfileNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProfileNodeEdge>>;
};

/** A Relay edge containing a `ProfileNode` and its cursor. */
export type ProfileNodeEdge = {
  __typename?: 'ProfileNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ProfileNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  loginUser?: Maybe<UserNode>;
  user?: Maybe<UserNode>;
  allUsers?: Maybe<UserNodeConnection>;
  profile?: Maybe<ProfileNode>;
  allProfiles?: Maybe<ProfileNodeConnection>;
  post?: Maybe<PostNode>;
  allPosts?: Maybe<PostNodeConnection>;
  tag?: Maybe<TagNode>;
  allTags?: Maybe<TagNodeConnection>;
  review?: Maybe<ReviewNode>;
  allReviews?: Maybe<ReviewNodeConnection>;
  gender?: Maybe<GenderNode>;
  allGenders?: Maybe<GenderNodeConnection>;
  address?: Maybe<AddressNode>;
  allAddresses?: Maybe<AddressNodeConnection>;
  talkRoom?: Maybe<TalkRoomNode>;
  allTalkRooms?: Maybe<TalkRoomNodeConnection>;
  message?: Maybe<MessageNode>;
  allMessages?: Maybe<MessageNodeConnection>;
  loginUserMessages?: Maybe<MessageNodeConnection>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryAllUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryAllProfilesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  profileText?: Maybe<Scalars['String']>;
  profileText_Icontains?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  schoolName_Icontains?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  undergraduate_Icontains?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  department_Icontains?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  clubActivities_Icontains?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  admissionFormat_Icontains?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  favoriteSubject_Icontains?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  wantHear_Icontains?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  problem_Icontains?: Maybe<Scalars['String']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  selectedGender?: Maybe<Scalars['ID']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryAllPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};


export type QueryAllTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  tagName?: Maybe<Scalars['String']>;
  tagName_Icontains?: Maybe<Scalars['String']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};


export type QueryAllReviewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
  reviewText?: Maybe<Scalars['String']>;
  reviewText_Icontains?: Maybe<Scalars['String']>;
};


export type QueryGenderArgs = {
  id: Scalars['ID'];
};


export type QueryAllGendersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  genderName?: Maybe<Scalars['String']>;
  genderName_Icontains?: Maybe<Scalars['String']>;
};


export type QueryAddressArgs = {
  id: Scalars['ID'];
};


export type QueryAllAddressesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  addressName?: Maybe<Scalars['String']>;
  addressName_Icontains?: Maybe<Scalars['String']>;
};


export type QueryTalkRoomArgs = {
  id: Scalars['ID'];
};


export type QueryAllTalkRoomsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  joinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  joinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryAllMessagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  talkingRoom_JoinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  talkingRoom_JoinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type QueryLoginUserMessagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  talkingRoom_JoinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  talkingRoom_JoinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type ReviewNode = Node & {
  __typename?: 'ReviewNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  provider: UserNode;
  customer: UserNode;
  reviewText: Scalars['String'];
  stars: Scalars['Int'];
};

export type ReviewNodeConnection = {
  __typename?: 'ReviewNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ReviewNodeEdge>>;
};

/** A Relay edge containing a `ReviewNode` and its cursor. */
export type ReviewNodeEdge = {
  __typename?: 'ReviewNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<ReviewNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type Revoke = {
  __typename?: 'Revoke';
  revoked: Scalars['Int'];
};

export type TagNode = Node & {
  __typename?: 'TagNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  tagName: Scalars['String'];
  tags: ProfileNodeConnection;
};


export type TagNodeTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  profileText?: Maybe<Scalars['String']>;
  profileText_Icontains?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  schoolName_Icontains?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  undergraduate_Icontains?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  department_Icontains?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  clubActivities_Icontains?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  admissionFormat_Icontains?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  favoriteSubject_Icontains?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  wantHear_Icontains?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  problem_Icontains?: Maybe<Scalars['String']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  selectedGender?: Maybe<Scalars['ID']>;
};

export type TagNodeConnection = {
  __typename?: 'TagNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TagNodeEdge>>;
};

/** A Relay edge containing a `TagNode` and its cursor. */
export type TagNodeEdge = {
  __typename?: 'TagNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TagNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type TalkRoomNode = Node & {
  __typename?: 'TalkRoomNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  talkRoomDescription?: Maybe<Scalars['String']>;
  joinUsers: UserNodeConnection;
  talkingRoom: MessageNodeConnection;
};


export type TalkRoomNodeJoinUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
};


export type TalkRoomNodeTalkingRoomArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  talkingRoom_JoinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  talkingRoom_JoinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TalkRoomNodeConnection = {
  __typename?: 'TalkRoomNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TalkRoomNodeEdge>>;
};

/** A Relay edge containing a `TalkRoomNode` and its cursor. */
export type TalkRoomNodeEdge = {
  __typename?: 'TalkRoomNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TalkRoomNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UpdatePostMutationInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  postImage?: Maybe<Scalars['Upload']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePostMutationPayload = {
  __typename?: 'UpdatePostMutationPayload';
  post?: Maybe<PostNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutationInput = {
  id: Scalars['ID'];
  profileName: Scalars['String'];
  profileText: Scalars['String'];
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age: Scalars['Int'];
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  telephoneNumber: Scalars['String'];
  wantHear: Scalars['String'];
  problem: Scalars['String'];
  followingUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>;
  undergraduate: Scalars['String'];
  department: Scalars['String'];
  clubActivities: Scalars['String'];
  admissionFormat: Scalars['String'];
  favoriteSubject: Scalars['String'];
  profileImage?: Maybe<Scalars['Upload']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutationPayload = {
  __typename?: 'UpdateProfileMutationPayload';
  profile?: Maybe<ProfileNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** 全ての権限を持っているとみなされます。 */
  isSuperuser: Scalars['Boolean'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  joinUsers: TalkRoomNodeConnection;
  sender: MessageNodeConnection;
  targetUser?: Maybe<ProfileNode>;
  followingUsers: ProfileNodeConnection;
  postedUser: PostNodeConnection;
  provider: ReviewNodeConnection;
  customer: ReviewNodeConnection;
};


export type UserNodeJoinUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  joinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  joinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type UserNodeSenderArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
  talkingRoom_JoinUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  talkingRoom_JoinUsers_Icontains?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type UserNodeFollowingUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  profileName?: Maybe<Scalars['String']>;
  profileName_Icontains?: Maybe<Scalars['String']>;
  profileText?: Maybe<Scalars['String']>;
  profileText_Icontains?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  schoolName_Icontains?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  undergraduate_Icontains?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  department_Icontains?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  clubActivities_Icontains?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  admissionFormat_Icontains?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  favoriteSubject_Icontains?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  wantHear_Icontains?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  problem_Icontains?: Maybe<Scalars['String']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  selectedGender?: Maybe<Scalars['ID']>;
};


export type UserNodePostedUserArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeProviderArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
  reviewText?: Maybe<Scalars['String']>;
  reviewText_Icontains?: Maybe<Scalars['String']>;
};


export type UserNodeCustomerArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
  reviewText?: Maybe<Scalars['String']>;
  reviewText_Icontains?: Maybe<Scalars['String']>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type CreateMessageMutationVariables = Exact<{
  talkingRoomId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage?: Maybe<(
    { __typename?: 'CreateMessageMutationPayload' }
    & { message?: Maybe<(
      { __typename?: 'MessageNode' }
      & Pick<MessageNode, 'text' | 'createdAt'>
    )> }
  )> }
);

export type CreateProfileMutationVariables = Exact<{
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  telephoneNumber: Scalars['String'];
  wantHear?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  undergraduate?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['Upload']>;
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile?: Maybe<(
    { __typename?: 'CreateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'profileName' | 'profileText' | 'isCollegeStudent' | 'schoolName' | 'telephoneNumber' | 'createdAt' | 'profileImage' | 'age' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
      & { selectedGender: (
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'genderName'>
      ), selectedAddress: (
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'addressName'>
      ) }
    )> }
  )> }
);

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'CreateUserMutationPayload' }
    & { user?: Maybe<(
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id' | 'email'>
    )> }
  )> }
);

export type GetTokensMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type GetTokensMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth?: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & Pick<ObtainJsonWebToken, 'payload' | 'token' | 'refreshExpiresIn' | 'refreshToken'>
  )> }
);

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokensMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken?: Maybe<(
    { __typename?: 'Refresh' }
    & Pick<Refresh, 'token' | 'payload' | 'refreshToken' | 'refreshExpiresIn'>
  )> }
);

export type RevokeRefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RevokeRefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { revokeToken?: Maybe<(
    { __typename?: 'Revoke' }
    & Pick<Revoke, 'revoked'>
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['ID'];
  profileName: Scalars['String'];
  profileText: Scalars['String'];
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age: Scalars['Int'];
  telephoneNumber: Scalars['String'];
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  undergraduate: Scalars['String'];
  department: Scalars['String'];
  clubActivities: Scalars['String'];
  admissionFormat: Scalars['String'];
  favoriteSubject: Scalars['String'];
  wantHear: Scalars['String'];
  problem: Scalars['String'];
  profileImage?: Maybe<Scalars['Upload']>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'UpdateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'profileName' | 'profileText'>
    )> }
  )> }
);

export type GetAllAdressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdressesQuery = (
  { __typename?: 'Query' }
  & { allAddresses?: Maybe<(
    { __typename?: 'AddressNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'AddressNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'id' | 'addressName'>
      )> }
    )>> }
  )> }
);

export type GetAllGendersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllGendersQuery = (
  { __typename?: 'Query' }
  & { allGenders?: Maybe<(
    { __typename?: 'GenderNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'GenderNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'id' | 'genderName'>
      )> }
    )>> }
  )> }
);

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = (
  { __typename?: 'Query' }
  & { loginUser?: Maybe<(
    { __typename?: 'UserNode' }
    & Pick<UserNode, 'id' | 'email'>
    & { joinUsers: (
      { __typename?: 'TalkRoomNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'TalkRoomNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'TalkRoomNode' }
          & Pick<TalkRoomNode, 'id'>
        )> }
      )>> }
    ), targetUser?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'profileImage' | 'telephoneNumber' | 'isCollegeStudent' | 'schoolName' | 'age' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem' | 'createdAt'>
      & { followingUsers: (
        { __typename?: 'UserNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'UserNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'UserNode' }
            & Pick<UserNode, 'id' | 'email'>
            & { targetUser?: Maybe<(
              { __typename?: 'ProfileNode' }
              & Pick<ProfileNode, 'profileName' | 'profileImage'>
            )> }
          )> }
        )>> }
      ), selectedGender: (
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'id' | 'genderName'>
      ), selectedAddress: (
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'id' | 'addressName'>
      ), tags: (
        { __typename?: 'TagNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'TagNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'TagNode' }
            & Pick<TagNode, 'tagName'>
          )> }
        )>> }
      ) }
    )> }
  )> }
);

export type GetAllProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProfilesQuery = (
  { __typename?: 'Query' }
  & { allProfiles?: Maybe<(
    { __typename?: 'ProfileNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProfileNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'telephoneNumber' | 'isCollegeStudent' | 'schoolName' | 'age' | 'profileImage' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
        & { targetUser: (
          { __typename?: 'UserNode' }
          & { provider: (
            { __typename?: 'ReviewNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'ReviewNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'ReviewNode' }
                & Pick<ReviewNode, 'stars'>
              )> }
            )>> }
          ) }
        ), selectedGender: (
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'genderName'>
        ), selectedAddress: (
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'addressName'>
        ) }
      )> }
    )>> }
  )> }
);

export type GetProfileQueryVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'ProfileNode' }
    & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'profileImage' | 'isCollegeStudent' | 'schoolName' | 'age' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
    & { targetUser: (
      { __typename?: 'UserNode' }
      & { joinUsers: (
        { __typename?: 'TalkRoomNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'TalkRoomNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'TalkRoomNode' }
            & Pick<TalkRoomNode, 'id'>
            & { joinUsers: (
              { __typename?: 'UserNodeConnection' }
              & { edges: Array<Maybe<(
                { __typename?: 'UserNodeEdge' }
                & { node?: Maybe<(
                  { __typename?: 'UserNode' }
                  & Pick<UserNode, 'id' | 'email'>
                )> }
              )>> }
            ) }
          )> }
        )>> }
      ), provider: (
        { __typename?: 'ReviewNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'ReviewNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'ReviewNode' }
            & Pick<ReviewNode, 'id' | 'reviewText' | 'stars'>
            & { customer: (
              { __typename?: 'UserNode' }
              & Pick<UserNode, 'id' | 'email'>
            ) }
          )> }
        )>> }
      ) }
    ), selectedGender: (
      { __typename?: 'GenderNode' }
      & Pick<GenderNode, 'id' | 'genderName'>
    ), selectedAddress: (
      { __typename?: 'AddressNode' }
      & Pick<AddressNode, 'id' | 'addressName'>
    ) }
  )> }
);

export type SearchProfilesQueryVariables = Exact<{
  inputProfileName?: Maybe<Scalars['String']>;
  inputProfileText?: Maybe<Scalars['String']>;
  inputSchoolName?: Maybe<Scalars['String']>;
  inputClubActivities?: Maybe<Scalars['String']>;
}>;


export type SearchProfilesQuery = (
  { __typename?: 'Query' }
  & { allProfiles?: Maybe<(
    { __typename?: 'ProfileNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProfileNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'telephoneNumber' | 'isCollegeStudent' | 'schoolName' | 'age' | 'profileImage' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
        & { targetUser: (
          { __typename?: 'UserNode' }
          & { provider: (
            { __typename?: 'ReviewNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'ReviewNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'ReviewNode' }
                & Pick<ReviewNode, 'stars'>
              )> }
            )>> }
          ) }
        ), selectedGender: (
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'genderName'>
        ), selectedAddress: (
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'addressName'>
        ) }
      )> }
    )>> }
  )> }
);

export type GetJoinRoomMessagesQueryVariables = Exact<{
  joinUserId: Scalars['ID'];
}>;


export type GetJoinRoomMessagesQuery = (
  { __typename?: 'Query' }
  & { allMessages?: Maybe<(
    { __typename?: 'MessageNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'MessageNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'MessageNode' }
        & Pick<MessageNode, 'id' | 'text' | 'createdAt'>
        & { talkingRoom: (
          { __typename?: 'TalkRoomNode' }
          & Pick<TalkRoomNode, 'id'>
          & { joinUsers: (
            { __typename?: 'UserNodeConnection' }
            & { edges: Array<Maybe<(
              { __typename?: 'UserNodeEdge' }
              & { node?: Maybe<(
                { __typename?: 'UserNode' }
                & Pick<UserNode, 'id' | 'email'>
                & { targetUser?: Maybe<(
                  { __typename?: 'ProfileNode' }
                  & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage'>
                )> }
              )> }
            )>> }
          ) }
        ) }
      )> }
    )>> }
  )> }
);

export type GetLoginUserJoinTalkRoomQueryVariables = Exact<{
  loginUserId: Scalars['ID'];
}>;


export type GetLoginUserJoinTalkRoomQuery = (
  { __typename?: 'Query' }
  & { allTalkRooms?: Maybe<(
    { __typename?: 'TalkRoomNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'TalkRoomNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TalkRoomNode' }
        & Pick<TalkRoomNode, 'id' | 'talkRoomDescription'>
        & { joinUsers: (
          { __typename?: 'UserNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'UserNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'UserNode' }
              & Pick<UserNode, 'id' | 'email'>
              & { targetUser?: Maybe<(
                { __typename?: 'ProfileNode' }
                & Pick<ProfileNode, 'profileName' | 'profileImage' | 'schoolName'>
              )> }
            )> }
          )>> }
        ), talkingRoom: (
          { __typename?: 'MessageNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'MessageNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'MessageNode' }
              & Pick<MessageNode, 'id' | 'text' | 'createdAt'>
              & { sender: (
                { __typename?: 'UserNode' }
                & Pick<UserNode, 'id' | 'email'>
              ) }
            )> }
          )>> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetTalkRoomQueryVariables = Exact<{
  talkRoomId: Scalars['ID'];
}>;


export type GetTalkRoomQuery = (
  { __typename?: 'Query' }
  & { talkRoom?: Maybe<(
    { __typename?: 'TalkRoomNode' }
    & Pick<TalkRoomNode, 'id' | 'talkRoomDescription'>
    & { talkingRoom: (
      { __typename?: 'MessageNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'MessageNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'MessageNode' }
          & Pick<MessageNode, 'id' | 'text' | 'createdAt'>
          & { sender: (
            { __typename?: 'UserNode' }
            & Pick<UserNode, 'id' | 'email'>
          ) }
        )> }
      )>> }
    ) }
  )> }
);


export const CreateMessageDocument = gql`
    mutation CreateMessage($talkingRoomId: ID!, $text: String!) {
  createMessage(input: {talkingRoomId: $talkingRoomId, text: $text}) {
    message {
      text
      createdAt
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      talkingRoomId: // value for 'talkingRoomId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($profileName: String!, $profileText: String, $isCollegeStudent: Boolean!, $schoolName: String!, $age: Int, $selectedGender: ID!, $selectedAddress: ID!, $telephoneNumber: String!, $wantHear: String, $problem: String, $undergraduate: String, $department: String, $clubActivities: String, $admissionFormat: String, $favoriteSubject: String, $profileImage: Upload) {
  createProfile(
    input: {profileName: $profileName, profileText: $profileText, isCollegeStudent: $isCollegeStudent, schoolName: $schoolName, age: $age, selectedGender: $selectedGender, selectedAddress: $selectedAddress, telephoneNumber: $telephoneNumber, wantHear: $wantHear, problem: $problem, undergraduate: $undergraduate, department: $department, clubActivities: $clubActivities, admissionFormat: $admissionFormat, favoriteSubject: $favoriteSubject, profileImage: $profileImage}
  ) {
    profile {
      profileName
      profileText
      isCollegeStudent
      schoolName
      telephoneNumber
      createdAt
      profileImage
      age
      undergraduate
      department
      clubActivities
      admissionFormat
      favoriteSubject
      wantHear
      problem
      selectedGender {
        genderName
      }
      selectedAddress {
        addressName
      }
    }
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      profileName: // value for 'profileName'
 *      profileText: // value for 'profileText'
 *      isCollegeStudent: // value for 'isCollegeStudent'
 *      schoolName: // value for 'schoolName'
 *      age: // value for 'age'
 *      selectedGender: // value for 'selectedGender'
 *      selectedAddress: // value for 'selectedAddress'
 *      telephoneNumber: // value for 'telephoneNumber'
 *      wantHear: // value for 'wantHear'
 *      problem: // value for 'problem'
 *      undergraduate: // value for 'undergraduate'
 *      department: // value for 'department'
 *      clubActivities: // value for 'clubActivities'
 *      admissionFormat: // value for 'admissionFormat'
 *      favoriteSubject: // value for 'favoriteSubject'
 *      profileImage: // value for 'profileImage'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!) {
  createUser(input: {email: $email, password: $password}) {
    user {
      id
      email
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetTokensDocument = gql`
    mutation GetTokens($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    payload
    token
    refreshExpiresIn
    refreshToken
  }
}
    `;
export type GetTokensMutationFn = Apollo.MutationFunction<GetTokensMutation, GetTokensMutationVariables>;

/**
 * __useGetTokensMutation__
 *
 * To run a mutation, you first call `useGetTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getTokensMutation, { data, loading, error }] = useGetTokensMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetTokensMutation(baseOptions?: Apollo.MutationHookOptions<GetTokensMutation, GetTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetTokensMutation, GetTokensMutationVariables>(GetTokensDocument, options);
      }
export type GetTokensMutationHookResult = ReturnType<typeof useGetTokensMutation>;
export type GetTokensMutationResult = Apollo.MutationResult<GetTokensMutation>;
export type GetTokensMutationOptions = Apollo.BaseMutationOptions<GetTokensMutation, GetTokensMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type RefreshTokensMutationFn = Apollo.MutationFunction<RefreshTokensMutation, RefreshTokensMutationVariables>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
      }
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RevokeRefreshTokenDocument = gql`
    mutation RevokeRefreshToken($refreshToken: String!) {
  revokeToken(refreshToken: $refreshToken) {
    revoked
  }
}
    `;
export type RevokeRefreshTokenMutationFn = Apollo.MutationFunction<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>;

/**
 * __useRevokeRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRevokeRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeRefreshTokenMutation, { data, loading, error }] = useRevokeRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRevokeRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>(RevokeRefreshTokenDocument, options);
      }
export type RevokeRefreshTokenMutationHookResult = ReturnType<typeof useRevokeRefreshTokenMutation>;
export type RevokeRefreshTokenMutationResult = Apollo.MutationResult<RevokeRefreshTokenMutation>;
export type RevokeRefreshTokenMutationOptions = Apollo.BaseMutationOptions<RevokeRefreshTokenMutation, RevokeRefreshTokenMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: ID!, $profileName: String!, $profileText: String!, $isCollegeStudent: Boolean!, $schoolName: String!, $age: Int!, $telephoneNumber: String!, $selectedGender: ID!, $selectedAddress: ID!, $undergraduate: String!, $department: String!, $clubActivities: String!, $admissionFormat: String!, $favoriteSubject: String!, $wantHear: String!, $problem: String!, $profileImage: Upload) {
  updateProfile(
    input: {id: $id, profileName: $profileName, profileText: $profileText, isCollegeStudent: $isCollegeStudent, schoolName: $schoolName, age: $age, telephoneNumber: $telephoneNumber, selectedGender: $selectedGender, selectedAddress: $selectedAddress, undergraduate: $undergraduate, department: $department, clubActivities: $clubActivities, admissionFormat: $admissionFormat, favoriteSubject: $favoriteSubject, wantHear: $wantHear, problem: $problem, profileImage: $profileImage}
  ) {
    profile {
      profileName
      profileText
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      profileName: // value for 'profileName'
 *      profileText: // value for 'profileText'
 *      isCollegeStudent: // value for 'isCollegeStudent'
 *      schoolName: // value for 'schoolName'
 *      age: // value for 'age'
 *      telephoneNumber: // value for 'telephoneNumber'
 *      selectedGender: // value for 'selectedGender'
 *      selectedAddress: // value for 'selectedAddress'
 *      undergraduate: // value for 'undergraduate'
 *      department: // value for 'department'
 *      clubActivities: // value for 'clubActivities'
 *      admissionFormat: // value for 'admissionFormat'
 *      favoriteSubject: // value for 'favoriteSubject'
 *      wantHear: // value for 'wantHear'
 *      problem: // value for 'problem'
 *      profileImage: // value for 'profileImage'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetAllAdressesDocument = gql`
    query GetAllAdresses {
  allAddresses {
    edges {
      node {
        id
        addressName
      }
    }
  }
}
    `;

/**
 * __useGetAllAdressesQuery__
 *
 * To run a query within a React component, call `useGetAllAdressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdressesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdressesQuery, GetAllAdressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdressesQuery, GetAllAdressesQueryVariables>(GetAllAdressesDocument, options);
      }
export function useGetAllAdressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdressesQuery, GetAllAdressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdressesQuery, GetAllAdressesQueryVariables>(GetAllAdressesDocument, options);
        }
export type GetAllAdressesQueryHookResult = ReturnType<typeof useGetAllAdressesQuery>;
export type GetAllAdressesLazyQueryHookResult = ReturnType<typeof useGetAllAdressesLazyQuery>;
export type GetAllAdressesQueryResult = Apollo.QueryResult<GetAllAdressesQuery, GetAllAdressesQueryVariables>;
export const GetAllGendersDocument = gql`
    query GetAllGenders {
  allGenders {
    edges {
      node {
        id
        genderName
      }
    }
  }
}
    `;

/**
 * __useGetAllGendersQuery__
 *
 * To run a query within a React component, call `useGetAllGendersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGendersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGendersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGendersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllGendersQuery, GetAllGendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGendersQuery, GetAllGendersQueryVariables>(GetAllGendersDocument, options);
      }
export function useGetAllGendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGendersQuery, GetAllGendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGendersQuery, GetAllGendersQueryVariables>(GetAllGendersDocument, options);
        }
export type GetAllGendersQueryHookResult = ReturnType<typeof useGetAllGendersQuery>;
export type GetAllGendersLazyQueryHookResult = ReturnType<typeof useGetAllGendersLazyQuery>;
export type GetAllGendersQueryResult = Apollo.QueryResult<GetAllGendersQuery, GetAllGendersQueryVariables>;
export const GetLoginUserDocument = gql`
    query GetLoginUser {
  loginUser {
    id
    email
    joinUsers {
      edges {
        node {
          id
        }
      }
    }
    targetUser {
      id
      profileName
      profileText
      profileImage
      telephoneNumber
      isCollegeStudent
      schoolName
      age
      undergraduate
      department
      clubActivities
      admissionFormat
      favoriteSubject
      wantHear
      problem
      createdAt
      followingUsers {
        edges {
          node {
            id
            email
            targetUser {
              profileName
              profileImage
            }
          }
        }
      }
      selectedGender {
        id
        genderName
      }
      selectedAddress {
        id
        addressName
      }
      tags {
        edges {
          node {
            tagName
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserQuery__
 *
 * To run a query within a React component, call `useGetLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
      }
export function useGetLoginUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
        }
export type GetLoginUserQueryHookResult = ReturnType<typeof useGetLoginUserQuery>;
export type GetLoginUserLazyQueryHookResult = ReturnType<typeof useGetLoginUserLazyQuery>;
export type GetLoginUserQueryResult = Apollo.QueryResult<GetLoginUserQuery, GetLoginUserQueryVariables>;
export const GetAllProfilesDocument = gql`
    query GetAllProfiles {
  allProfiles {
    edges {
      node {
        id
        profileName
        profileText
        telephoneNumber
        isCollegeStudent
        schoolName
        age
        profileImage
        undergraduate
        department
        clubActivities
        admissionFormat
        favoriteSubject
        wantHear
        problem
        targetUser {
          provider {
            edges {
              node {
                stars
              }
            }
          }
        }
        selectedGender {
          genderName
        }
        selectedAddress {
          addressName
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllProfilesQuery__
 *
 * To run a query within a React component, call `useGetAllProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProfilesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProfilesQuery, GetAllProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProfilesQuery, GetAllProfilesQueryVariables>(GetAllProfilesDocument, options);
      }
export function useGetAllProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProfilesQuery, GetAllProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProfilesQuery, GetAllProfilesQueryVariables>(GetAllProfilesDocument, options);
        }
export type GetAllProfilesQueryHookResult = ReturnType<typeof useGetAllProfilesQuery>;
export type GetAllProfilesLazyQueryHookResult = ReturnType<typeof useGetAllProfilesLazyQuery>;
export type GetAllProfilesQueryResult = Apollo.QueryResult<GetAllProfilesQuery, GetAllProfilesQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($profileId: ID!) {
  profile(id: $profileId) {
    id
    profileName
    profileText
    profileImage
    isCollegeStudent
    schoolName
    age
    undergraduate
    department
    clubActivities
    admissionFormat
    favoriteSubject
    wantHear
    problem
    targetUser {
      joinUsers {
        edges {
          node {
            id
            joinUsers {
              edges {
                node {
                  id
                  email
                }
              }
            }
          }
        }
      }
      provider {
        edges {
          node {
            id
            reviewText
            stars
            customer {
              id
              email
            }
          }
        }
      }
    }
    selectedGender {
      id
      genderName
    }
    selectedAddress {
      id
      addressName
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const SearchProfilesDocument = gql`
    query SearchProfiles($inputProfileName: String, $inputProfileText: String, $inputSchoolName: String, $inputClubActivities: String) {
  allProfiles(
    profileName_Icontains: $inputProfileName
    profileText_Icontains: $inputProfileText
    schoolName_Icontains: $inputSchoolName
    clubActivities_Icontains: $inputClubActivities
  ) {
    edges {
      node {
        id
        profileName
        profileText
        telephoneNumber
        isCollegeStudent
        schoolName
        age
        profileImage
        undergraduate
        department
        clubActivities
        admissionFormat
        favoriteSubject
        wantHear
        problem
        targetUser {
          provider {
            edges {
              node {
                stars
              }
            }
          }
        }
        selectedGender {
          genderName
        }
        selectedAddress {
          addressName
        }
      }
    }
  }
}
    `;

/**
 * __useSearchProfilesQuery__
 *
 * To run a query within a React component, call `useSearchProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProfilesQuery({
 *   variables: {
 *      inputProfileName: // value for 'inputProfileName'
 *      inputProfileText: // value for 'inputProfileText'
 *      inputSchoolName: // value for 'inputSchoolName'
 *      inputClubActivities: // value for 'inputClubActivities'
 *   },
 * });
 */
export function useSearchProfilesQuery(baseOptions?: Apollo.QueryHookOptions<SearchProfilesQuery, SearchProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProfilesQuery, SearchProfilesQueryVariables>(SearchProfilesDocument, options);
      }
export function useSearchProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProfilesQuery, SearchProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProfilesQuery, SearchProfilesQueryVariables>(SearchProfilesDocument, options);
        }
export type SearchProfilesQueryHookResult = ReturnType<typeof useSearchProfilesQuery>;
export type SearchProfilesLazyQueryHookResult = ReturnType<typeof useSearchProfilesLazyQuery>;
export type SearchProfilesQueryResult = Apollo.QueryResult<SearchProfilesQuery, SearchProfilesQueryVariables>;
export const GetJoinRoomMessagesDocument = gql`
    query GetJoinRoomMessages($joinUserId: ID!) {
  allMessages(talkingRoom_JoinUsers: [$joinUserId]) {
    edges {
      node {
        id
        text
        createdAt
        talkingRoom {
          id
          joinUsers {
            edges {
              node {
                id
                email
                targetUser {
                  id
                  profileName
                  profileImage
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetJoinRoomMessagesQuery__
 *
 * To run a query within a React component, call `useGetJoinRoomMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJoinRoomMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJoinRoomMessagesQuery({
 *   variables: {
 *      joinUserId: // value for 'joinUserId'
 *   },
 * });
 */
export function useGetJoinRoomMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetJoinRoomMessagesQuery, GetJoinRoomMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJoinRoomMessagesQuery, GetJoinRoomMessagesQueryVariables>(GetJoinRoomMessagesDocument, options);
      }
export function useGetJoinRoomMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJoinRoomMessagesQuery, GetJoinRoomMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJoinRoomMessagesQuery, GetJoinRoomMessagesQueryVariables>(GetJoinRoomMessagesDocument, options);
        }
export type GetJoinRoomMessagesQueryHookResult = ReturnType<typeof useGetJoinRoomMessagesQuery>;
export type GetJoinRoomMessagesLazyQueryHookResult = ReturnType<typeof useGetJoinRoomMessagesLazyQuery>;
export type GetJoinRoomMessagesQueryResult = Apollo.QueryResult<GetJoinRoomMessagesQuery, GetJoinRoomMessagesQueryVariables>;
export const GetLoginUserJoinTalkRoomDocument = gql`
    query GetLoginUserJoinTalkRoom($loginUserId: ID!) {
  allTalkRooms(joinUsers: [$loginUserId]) {
    edges {
      node {
        id
        talkRoomDescription
        joinUsers {
          edges {
            node {
              id
              email
              targetUser {
                profileName
                profileImage
                schoolName
              }
            }
          }
        }
        talkingRoom {
          edges {
            node {
              id
              text
              createdAt
              sender {
                id
                email
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserJoinTalkRoomQuery__
 *
 * To run a query within a React component, call `useGetLoginUserJoinTalkRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserJoinTalkRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserJoinTalkRoomQuery({
 *   variables: {
 *      loginUserId: // value for 'loginUserId'
 *   },
 * });
 */
export function useGetLoginUserJoinTalkRoomQuery(baseOptions: Apollo.QueryHookOptions<GetLoginUserJoinTalkRoomQuery, GetLoginUserJoinTalkRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserJoinTalkRoomQuery, GetLoginUserJoinTalkRoomQueryVariables>(GetLoginUserJoinTalkRoomDocument, options);
      }
export function useGetLoginUserJoinTalkRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserJoinTalkRoomQuery, GetLoginUserJoinTalkRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserJoinTalkRoomQuery, GetLoginUserJoinTalkRoomQueryVariables>(GetLoginUserJoinTalkRoomDocument, options);
        }
export type GetLoginUserJoinTalkRoomQueryHookResult = ReturnType<typeof useGetLoginUserJoinTalkRoomQuery>;
export type GetLoginUserJoinTalkRoomLazyQueryHookResult = ReturnType<typeof useGetLoginUserJoinTalkRoomLazyQuery>;
export type GetLoginUserJoinTalkRoomQueryResult = Apollo.QueryResult<GetLoginUserJoinTalkRoomQuery, GetLoginUserJoinTalkRoomQueryVariables>;
export const GetTalkRoomDocument = gql`
    query GetTalkRoom($talkRoomId: ID!) {
  talkRoom(id: $talkRoomId) {
    id
    talkRoomDescription
    talkingRoom {
      edges {
        node {
          id
          text
          createdAt
          sender {
            id
            email
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetTalkRoomQuery__
 *
 * To run a query within a React component, call `useGetTalkRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTalkRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTalkRoomQuery({
 *   variables: {
 *      talkRoomId: // value for 'talkRoomId'
 *   },
 * });
 */
export function useGetTalkRoomQuery(baseOptions: Apollo.QueryHookOptions<GetTalkRoomQuery, GetTalkRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTalkRoomQuery, GetTalkRoomQueryVariables>(GetTalkRoomDocument, options);
      }
export function useGetTalkRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTalkRoomQuery, GetTalkRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTalkRoomQuery, GetTalkRoomQueryVariables>(GetTalkRoomDocument, options);
        }
export type GetTalkRoomQueryHookResult = ReturnType<typeof useGetTalkRoomQuery>;
export type GetTalkRoomLazyQueryHookResult = ReturnType<typeof useGetTalkRoomLazyQuery>;
export type GetTalkRoomQueryResult = Apollo.QueryResult<GetTalkRoomQuery, GetTalkRoomQueryVariables>;