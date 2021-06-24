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

export type CreateNotificationMutationInput = {
  receiver: Scalars['ID'];
  notificationType: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateNotificationMutationPayload = {
  __typename?: 'CreateNotificationMutationPayload';
  notification?: Maybe<NotificationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePlanMutationInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  planImage?: Maybe<Scalars['Upload']>;
  isPublished: Scalars['Boolean'];
  price: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePlanMutationPayload = {
  __typename?: 'CreatePlanMutationPayload';
  plan?: Maybe<PlanNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateProfileMutationInput = {
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  selectedGender?: Maybe<Scalars['ID']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  telephoneNumber?: Maybe<Scalars['String']>;
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
  selectedPlan: Scalars['ID'];
  opponentUser: Scalars['ID'];
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


export type DeletePlanMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeletePlanMutationPayload = {
  __typename?: 'DeletePlanMutationPayload';
  plan?: Maybe<PlanNode>;
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
  createPlan?: Maybe<CreatePlanMutationPayload>;
  updatePlan?: Maybe<UpdatePlanMutationPayload>;
  deletePlan?: Maybe<DeletePlanMutationPayload>;
  createTalkRoom?: Maybe<CreateTalkRoomMutationPayload>;
  createMessage?: Maybe<CreateMessageMutationPayload>;
  createReview?: Maybe<CreateReviewMutationPayload>;
  createNotification?: Maybe<CreateNotificationMutationPayload>;
  updateNotifications?: Maybe<UpdateNotificationsMutationPayload>;
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


export type MutationCreatePlanArgs = {
  input: CreatePlanMutationInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanMutationInput;
};


export type MutationDeletePlanArgs = {
  input: DeletePlanMutationInput;
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


export type MutationCreateNotificationArgs = {
  input: CreateNotificationMutationInput;
};


export type MutationUpdateNotificationsArgs = {
  input: UpdateNotificationsMutationInput;
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

export type NotificationNode = Node & {
  __typename?: 'NotificationNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  isChecked: Scalars['Boolean'];
  notificator: UserNode;
  receiver: UserNode;
  notificationType: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type NotificationNodeConnection = {
  __typename?: 'NotificationNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NotificationNodeEdge>>;
};

/** A Relay edge containing a `NotificationNode` and its cursor. */
export type NotificationNodeEdge = {
  __typename?: 'NotificationNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<NotificationNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
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

export type PlanNode = Node & {
  __typename?: 'PlanNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  planAuthor: UserNode;
  title: Scalars['String'];
  content: Scalars['String'];
  planImage?: Maybe<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  publishedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  price: Scalars['Int'];
  selectedPlan: TalkRoomNodeConnection;
};


export type PlanNodeSelectedPlanArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  selectedPlan?: Maybe<Scalars['ID']>;
};

export type PlanNodeConnection = {
  __typename?: 'PlanNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PlanNodeEdge>>;
};

/** A Relay edge containing a `PlanNode` and its cursor. */
export type PlanNodeEdge = {
  __typename?: 'PlanNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<PlanNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type ProfileNode = Node & {
  __typename?: 'ProfileNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  targetUser: UserNode;
  telephoneNumber?: Maybe<Scalars['String']>;
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent: Scalars['Boolean'];
  schoolName?: Maybe<Scalars['String']>;
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
  selectedAddress?: Maybe<AddressNode>;
  selectedGender?: Maybe<GenderNode>;
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
  highSchoolProfiles?: Maybe<ProfileNodeConnection>;
  collegeProfiles?: Maybe<ProfileNodeConnection>;
  plan?: Maybe<PlanNode>;
  allPlans?: Maybe<PlanNodeConnection>;
  loginUserPlans?: Maybe<PlanNodeConnection>;
  tag?: Maybe<TagNode>;
  allTags?: Maybe<TagNodeConnection>;
  review?: Maybe<ReviewNode>;
  allReviews?: Maybe<ReviewNodeConnection>;
  loginUserReviews?: Maybe<ReviewNodeConnection>;
  gender?: Maybe<GenderNode>;
  allGenders?: Maybe<GenderNodeConnection>;
  address?: Maybe<AddressNode>;
  allAddresses?: Maybe<AddressNodeConnection>;
  talkRoom?: Maybe<TalkRoomNode>;
  allTalkRooms?: Maybe<TalkRoomNodeConnection>;
  loginUserTalkRooms?: Maybe<TalkRoomNodeConnection>;
  message?: Maybe<MessageNode>;
  allMessages?: Maybe<MessageNodeConnection>;
  loginUserMessages?: Maybe<MessageNodeConnection>;
  notification?: Maybe<NotificationNode>;
  loginUserNotifications?: Maybe<NotificationNodeConnection>;
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


export type QueryHighSchoolProfilesArgs = {
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


export type QueryCollegeProfilesArgs = {
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


export type QueryPlanArgs = {
  id: Scalars['ID'];
};


export type QueryAllPlansArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
};


export type QueryLoginUserPlansArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
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
  customerId?: Maybe<Scalars['ID']>;
};


export type QueryLoginUserReviewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
  reviewText?: Maybe<Scalars['String']>;
  reviewText_Icontains?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['ID']>;
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
  selectedPlan?: Maybe<Scalars['ID']>;
};


export type QueryLoginUserTalkRoomsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  selectedPlan?: Maybe<Scalars['ID']>;
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
};


export type QueryLoginUserMessagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID'];
};


export type QueryLoginUserNotificationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  receiver?: Maybe<Scalars['ID']>;
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
  selectedPlan?: Maybe<PlanNode>;
  opponentUser?: Maybe<UserNode>;
  talkingRoom: MessageNodeConnection;
};


export type TalkRoomNodeTalkingRoomArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
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

export type UpdateNotificationsMutationInput = {
  notificationIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateNotificationsMutationPayload = {
  __typename?: 'UpdateNotificationsMutationPayload';
  notification?: Maybe<NotificationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePlanMutationInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  planImage?: Maybe<Scalars['Upload']>;
  price: Scalars['Int'];
  isPublished?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePlanMutationPayload = {
  __typename?: 'UpdatePlanMutationPayload';
  plan?: Maybe<PlanNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutationInput = {
  id: Scalars['ID'];
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  telephoneNumber?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  followingUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>;
  undergraduate?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
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
  targetUser?: Maybe<ProfileNode>;
  followingUsers: ProfileNodeConnection;
  planAuthor: PlanNodeConnection;
  provider: ReviewNodeConnection;
  customer: ReviewNodeConnection;
  notificator: NotificationNodeConnection;
  receiver: NotificationNodeConnection;
  opponentUser: TalkRoomNodeConnection;
  sender: MessageNodeConnection;
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


export type UserNodePlanAuthorArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  content_Icontains?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
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
  customerId?: Maybe<Scalars['ID']>;
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
  customerId?: Maybe<Scalars['ID']>;
};


export type UserNodeNotificatorArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  receiver?: Maybe<Scalars['ID']>;
};


export type UserNodeReceiverArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  isChecked?: Maybe<Scalars['Boolean']>;
  receiver?: Maybe<Scalars['ID']>;
};


export type UserNodeOpponentUserArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  selectedPlan?: Maybe<Scalars['ID']>;
};


export type UserNodeSenderArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  text_Icontains?: Maybe<Scalars['String']>;
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

export type CreateNotificationMutationVariables = Exact<{
  recieverId: Scalars['ID'];
  notificationType: Scalars['String'];
}>;


export type CreateNotificationMutation = (
  { __typename?: 'Mutation' }
  & { createNotification?: Maybe<(
    { __typename?: 'CreateNotificationMutationPayload' }
    & { notification?: Maybe<(
      { __typename?: 'NotificationNode' }
      & Pick<NotificationNode, 'id' | 'isChecked' | 'notificationType'>
      & { notificator: (
        { __typename?: 'UserNode' }
        & Pick<UserNode, 'id'>
        & { targetUser?: Maybe<(
          { __typename?: 'ProfileNode' }
          & Pick<ProfileNode, 'profileName'>
        )> }
      ) }
    )> }
  )> }
);

export type CreatePlanMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  price: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  planImage?: Maybe<Scalars['Upload']>;
}>;


export type CreatePlanMutation = (
  { __typename?: 'Mutation' }
  & { createPlan?: Maybe<(
    { __typename?: 'CreatePlanMutationPayload' }
    & { plan?: Maybe<(
      { __typename?: 'PlanNode' }
      & Pick<PlanNode, 'id' | 'title' | 'content' | 'price'>
    )> }
  )> }
);

export type CreateProfileMutationVariables = Exact<{
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent: Scalars['Boolean'];
  schoolName: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  selectedGender?: Maybe<Scalars['ID']>;
  selectedAddress?: Maybe<Scalars['ID']>;
  telephoneNumber?: Maybe<Scalars['String']>;
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
      & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'isCollegeStudent' | 'schoolName' | 'telephoneNumber' | 'createdAt' | 'profileImage' | 'age' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
      & { selectedGender?: Maybe<(
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'id' | 'genderName'>
      )>, selectedAddress?: Maybe<(
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'id' | 'addressName'>
      )> }
    )> }
  )> }
);

export type CreateReviewMutationVariables = Exact<{
  providerId: Scalars['ID'];
  reviewText: Scalars['String'];
  stars: Scalars['Int'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview?: Maybe<(
    { __typename?: 'CreateReviewMutationPayload' }
    & { review?: Maybe<(
      { __typename?: 'ReviewNode' }
      & Pick<ReviewNode, 'id' | 'reviewText' | 'stars'>
    )> }
  )> }
);

export type CreateTalkRoomMutationVariables = Exact<{
  opponentUserId: Scalars['ID'];
  selectedPlanId: Scalars['ID'];
  talkRoomDescription?: Maybe<Scalars['String']>;
}>;


export type CreateTalkRoomMutation = (
  { __typename?: 'Mutation' }
  & { createTalkRoom?: Maybe<(
    { __typename?: 'CreateTalkRoomMutationPayload' }
    & { talkRoom?: Maybe<(
      { __typename?: 'TalkRoomNode' }
      & Pick<TalkRoomNode, 'id' | 'talkRoomDescription'>
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

export type UpdateNotificationsMutationVariables = Exact<{
  notificationIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type UpdateNotificationsMutation = (
  { __typename?: 'Mutation' }
  & { updateNotifications?: Maybe<(
    { __typename?: 'UpdateNotificationsMutationPayload' }
    & { notification?: Maybe<(
      { __typename?: 'NotificationNode' }
      & Pick<NotificationNode, 'id'>
    )> }
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['ID'];
  profileName: Scalars['String'];
  profileText?: Maybe<Scalars['String']>;
  isCollegeStudent?: Maybe<Scalars['Boolean']>;
  schoolName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  telephoneNumber?: Maybe<Scalars['String']>;
  selectedGender: Scalars['ID'];
  selectedAddress: Scalars['ID'];
  undergraduate?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  clubActivities?: Maybe<Scalars['String']>;
  admissionFormat?: Maybe<Scalars['String']>;
  favoriteSubject?: Maybe<Scalars['String']>;
  wantHear?: Maybe<Scalars['String']>;
  problem?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['Upload']>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'UpdateProfileMutationPayload' }
    & { profile?: Maybe<(
      { __typename?: 'ProfileNode' }
      & Pick<ProfileNode, 'profileName' | 'profileText' | 'schoolName' | 'age' | 'telephoneNumber' | 'isCollegeStudent' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem' | 'profileImage'>
      & { selectedGender?: Maybe<(
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'id' | 'genderName'>
      )>, selectedAddress?: Maybe<(
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'id' | 'addressName'>
      )> }
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
    & { provider: (
      { __typename?: 'ReviewNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'ReviewNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'ReviewNode' }
          & Pick<ReviewNode, 'stars'>
        )> }
      )>> }
    ), planAuthor: (
      { __typename?: 'PlanNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'PlanNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'PlanNode' }
          & Pick<PlanNode, 'id' | 'title' | 'content' | 'price'>
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
      ), selectedGender?: Maybe<(
        { __typename?: 'GenderNode' }
        & Pick<GenderNode, 'id' | 'genderName'>
      )>, selectedAddress?: Maybe<(
        { __typename?: 'AddressNode' }
        & Pick<AddressNode, 'id' | 'addressName'>
      )>, tags: (
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

export type GetLoginUserNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserNotificationQuery = (
  { __typename?: 'Query' }
  & { loginUserNotifications?: Maybe<(
    { __typename?: 'NotificationNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'NotificationNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'NotificationNode' }
        & Pick<NotificationNode, 'id' | 'notificationType' | 'isChecked' | 'createdAt'>
        & { notificator: (
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id'>
          & { targetUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'profileName' | 'profileImage'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetLoginUserPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserPlansQuery = (
  { __typename?: 'Query' }
  & { loginUserPlans?: Maybe<(
    { __typename?: 'PlanNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'PlanNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'PlanNode' }
        & Pick<PlanNode, 'id' | 'title' | 'content' | 'price' | 'planImage' | 'isPublished' | 'publishedAt' | 'createdAt'>
      )> }
    )>> }
  )> }
);

export type GetLoginUserReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserReviewsQuery = (
  { __typename?: 'Query' }
  & { loginUserReviews?: Maybe<(
    { __typename?: 'ReviewNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ReviewNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ReviewNode' }
        & Pick<ReviewNode, 'id' | 'reviewText' | 'stars'>
        & { customer: (
          { __typename?: 'UserNode' }
          & { targetUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'profileName' | 'profileImage'>
          )> }
        ) }
      )> }
    )>> }
  )> }
);

export type GetPlanQueryVariables = Exact<{
  planId: Scalars['ID'];
}>;


export type GetPlanQuery = (
  { __typename?: 'Query' }
  & { plan?: Maybe<(
    { __typename?: 'PlanNode' }
    & Pick<PlanNode, 'id' | 'title' | 'content' | 'price' | 'planImage' | 'isPublished' | 'createdAt' | 'publishedAt'>
    & { planAuthor: (
      { __typename?: 'UserNode' }
      & Pick<UserNode, 'id'>
      & { targetUser?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'profileName' | 'profileImage' | 'isCollegeStudent'>
      )> }
    ) }
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
        ), selectedGender?: Maybe<(
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'genderName'>
        )>, selectedAddress?: Maybe<(
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'addressName'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetCollegeProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollegeProfilesQuery = (
  { __typename?: 'Query' }
  & { collegeProfiles?: Maybe<(
    { __typename?: 'ProfileNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProfileNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'telephoneNumber' | 'isCollegeStudent' | 'schoolName' | 'age' | 'createdAt' | 'profileImage' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
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
        ), selectedGender?: Maybe<(
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'id' | 'genderName'>
        )>, selectedAddress?: Maybe<(
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'id' | 'addressName'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetHighSchoolProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHighSchoolProfilesQuery = (
  { __typename?: 'Query' }
  & { highSchoolProfiles?: Maybe<(
    { __typename?: 'ProfileNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProfileNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProfileNode' }
        & Pick<ProfileNode, 'id' | 'profileName' | 'profileText' | 'telephoneNumber' | 'isCollegeStudent' | 'schoolName' | 'age' | 'createdAt' | 'profileImage' | 'undergraduate' | 'department' | 'clubActivities' | 'admissionFormat' | 'favoriteSubject' | 'wantHear' | 'problem'>
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
        ), selectedGender?: Maybe<(
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'id' | 'genderName'>
        )>, selectedAddress?: Maybe<(
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'id' | 'addressName'>
        )> }
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
      & Pick<UserNode, 'id'>
      & { planAuthor: (
        { __typename?: 'PlanNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'PlanNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'PlanNode' }
            & Pick<PlanNode, 'id' | 'title' | 'content' | 'isPublished' | 'price' | 'publishedAt' | 'createdAt' | 'planImage'>
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
              & { targetUser?: Maybe<(
                { __typename?: 'ProfileNode' }
                & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage'>
              )> }
            ) }
          )> }
        )>> }
      ) }
    ), selectedGender?: Maybe<(
      { __typename?: 'GenderNode' }
      & Pick<GenderNode, 'genderName'>
    )>, selectedAddress?: Maybe<(
      { __typename?: 'AddressNode' }
      & Pick<AddressNode, 'addressName'>
    )> }
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
        ), selectedGender?: Maybe<(
          { __typename?: 'GenderNode' }
          & Pick<GenderNode, 'genderName'>
        )>, selectedAddress?: Maybe<(
          { __typename?: 'AddressNode' }
          & Pick<AddressNode, 'addressName'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetAllTalkRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTalkRoomsQuery = (
  { __typename?: 'Query' }
  & { allTalkRooms?: Maybe<(
    { __typename?: 'TalkRoomNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'TalkRoomNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TalkRoomNode' }
        & Pick<TalkRoomNode, 'id' | 'talkRoomDescription'>
        & { selectedPlan?: Maybe<(
          { __typename?: 'PlanNode' }
          & Pick<PlanNode, 'id' | 'title' | 'content'>
        )>, talkingRoom: (
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

export type GetLoginUserTalkRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserTalkRoomsQuery = (
  { __typename?: 'Query' }
  & { loginUserTalkRooms?: Maybe<(
    { __typename?: 'TalkRoomNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'TalkRoomNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'TalkRoomNode' }
        & Pick<TalkRoomNode, 'id'>
        & { selectedPlan?: Maybe<(
          { __typename?: 'PlanNode' }
          & Pick<PlanNode, 'id' | 'title' | 'content' | 'price'>
          & { planAuthor: (
            { __typename?: 'UserNode' }
            & Pick<UserNode, 'id'>
            & { targetUser?: Maybe<(
              { __typename?: 'ProfileNode' }
              & Pick<ProfileNode, 'profileName'>
            )> }
          ) }
        )>, talkingRoom: (
          { __typename?: 'MessageNodeConnection' }
          & { edges: Array<Maybe<(
            { __typename?: 'MessageNodeEdge' }
            & { node?: Maybe<(
              { __typename?: 'MessageNode' }
              & Pick<MessageNode, 'id' | 'text' | 'createdAt'>
              & { sender: (
                { __typename?: 'UserNode' }
                & Pick<UserNode, 'id'>
              ) }
            )> }
          )>> }
        ), opponentUser?: Maybe<(
          { __typename?: 'UserNode' }
          & Pick<UserNode, 'id' | 'email'>
          & { targetUser?: Maybe<(
            { __typename?: 'ProfileNode' }
            & Pick<ProfileNode, 'id' | 'profileName' | 'profileImage' | 'schoolName'>
          )> }
        )> }
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
export const CreateNotificationDocument = gql`
    mutation CreateNotification($recieverId: ID!, $notificationType: String!) {
  createNotification(
    input: {receiver: $recieverId, notificationType: $notificationType}
  ) {
    notification {
      id
      isChecked
      notificator {
        id
        targetUser {
          profileName
        }
      }
      notificationType
    }
  }
}
    `;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      recieverId: // value for 'recieverId'
 *      notificationType: // value for 'notificationType'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const CreatePlanDocument = gql`
    mutation CreatePlan($title: String!, $content: String!, $price: Int!, $isPublished: Boolean!, $planImage: Upload) {
  createPlan(
    input: {title: $title, content: $content, price: $price, isPublished: $isPublished, planImage: $planImage}
  ) {
    plan {
      id
      title
      content
      price
    }
  }
}
    `;
export type CreatePlanMutationFn = Apollo.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;

/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      price: // value for 'price'
 *      isPublished: // value for 'isPublished'
 *      planImage: // value for 'planImage'
 *   },
 * });
 */
export function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlanMutation, CreatePlanMutationVariables>(CreatePlanDocument, options);
      }
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<CreatePlanMutation, CreatePlanMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($profileName: String!, $profileText: String, $isCollegeStudent: Boolean!, $schoolName: String!, $age: Int, $selectedGender: ID, $selectedAddress: ID, $telephoneNumber: String, $wantHear: String, $problem: String, $undergraduate: String, $department: String, $clubActivities: String, $admissionFormat: String, $favoriteSubject: String, $profileImage: Upload) {
  createProfile(
    input: {profileName: $profileName, profileText: $profileText, isCollegeStudent: $isCollegeStudent, schoolName: $schoolName, age: $age, selectedGender: $selectedGender, selectedAddress: $selectedAddress, telephoneNumber: $telephoneNumber, wantHear: $wantHear, problem: $problem, undergraduate: $undergraduate, department: $department, clubActivities: $clubActivities, admissionFormat: $admissionFormat, favoriteSubject: $favoriteSubject, profileImage: $profileImage}
  ) {
    profile {
      id
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
        id
        genderName
      }
      selectedAddress {
        id
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
export const CreateReviewDocument = gql`
    mutation CreateReview($providerId: ID!, $reviewText: String!, $stars: Int!) {
  createReview(
    input: {provider: $providerId, reviewText: $reviewText, stars: $stars}
  ) {
    review {
      id
      reviewText
      stars
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      providerId: // value for 'providerId'
 *      reviewText: // value for 'reviewText'
 *      stars: // value for 'stars'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateTalkRoomDocument = gql`
    mutation CreateTalkRoom($opponentUserId: ID!, $selectedPlanId: ID!, $talkRoomDescription: String) {
  createTalkRoom(
    input: {opponentUser: $opponentUserId, selectedPlan: $selectedPlanId, talkRoomDescription: $talkRoomDescription}
  ) {
    talkRoom {
      id
      talkRoomDescription
    }
  }
}
    `;
export type CreateTalkRoomMutationFn = Apollo.MutationFunction<CreateTalkRoomMutation, CreateTalkRoomMutationVariables>;

/**
 * __useCreateTalkRoomMutation__
 *
 * To run a mutation, you first call `useCreateTalkRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTalkRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTalkRoomMutation, { data, loading, error }] = useCreateTalkRoomMutation({
 *   variables: {
 *      opponentUserId: // value for 'opponentUserId'
 *      selectedPlanId: // value for 'selectedPlanId'
 *      talkRoomDescription: // value for 'talkRoomDescription'
 *   },
 * });
 */
export function useCreateTalkRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateTalkRoomMutation, CreateTalkRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTalkRoomMutation, CreateTalkRoomMutationVariables>(CreateTalkRoomDocument, options);
      }
export type CreateTalkRoomMutationHookResult = ReturnType<typeof useCreateTalkRoomMutation>;
export type CreateTalkRoomMutationResult = Apollo.MutationResult<CreateTalkRoomMutation>;
export type CreateTalkRoomMutationOptions = Apollo.BaseMutationOptions<CreateTalkRoomMutation, CreateTalkRoomMutationVariables>;
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
export const UpdateNotificationsDocument = gql`
    mutation UpdateNotifications($notificationIds: [ID!]) {
  updateNotifications(input: {notificationIds: $notificationIds}) {
    notification {
      id
    }
  }
}
    `;
export type UpdateNotificationsMutationFn = Apollo.MutationFunction<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>;

/**
 * __useUpdateNotificationsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationsMutation, { data, loading, error }] = useUpdateNotificationsMutation({
 *   variables: {
 *      notificationIds: // value for 'notificationIds'
 *   },
 * });
 */
export function useUpdateNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>(UpdateNotificationsDocument, options);
      }
export type UpdateNotificationsMutationHookResult = ReturnType<typeof useUpdateNotificationsMutation>;
export type UpdateNotificationsMutationResult = Apollo.MutationResult<UpdateNotificationsMutation>;
export type UpdateNotificationsMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: ID!, $profileName: String!, $profileText: String, $isCollegeStudent: Boolean, $schoolName: String, $age: Int, $telephoneNumber: String, $selectedGender: ID!, $selectedAddress: ID!, $undergraduate: String, $department: String, $clubActivities: String, $admissionFormat: String, $favoriteSubject: String, $wantHear: String, $problem: String, $profileImage: Upload) {
  updateProfile(
    input: {id: $id, profileName: $profileName, profileText: $profileText, isCollegeStudent: $isCollegeStudent, schoolName: $schoolName, age: $age, telephoneNumber: $telephoneNumber, selectedGender: $selectedGender, selectedAddress: $selectedAddress, undergraduate: $undergraduate, department: $department, clubActivities: $clubActivities, admissionFormat: $admissionFormat, favoriteSubject: $favoriteSubject, wantHear: $wantHear, problem: $problem, profileImage: $profileImage}
  ) {
    profile {
      profileName
      profileText
      schoolName
      age
      telephoneNumber
      isCollegeStudent
      schoolName
      selectedGender {
        id
        genderName
      }
      selectedAddress {
        id
        addressName
      }
      undergraduate
      department
      clubActivities
      admissionFormat
      favoriteSubject
      wantHear
      problem
      profileImage
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
    provider {
      edges {
        node {
          stars
        }
      }
    }
    planAuthor {
      edges {
        node {
          id
          title
          content
          price
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
export const GetLoginUserNotificationDocument = gql`
    query GetLoginUserNotification {
  loginUserNotifications(isChecked: false) {
    edges {
      node {
        id
        notificationType
        isChecked
        createdAt
        notificator {
          id
          targetUser {
            profileName
            profileImage
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserNotificationQuery__
 *
 * To run a query within a React component, call `useGetLoginUserNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserNotificationQuery, GetLoginUserNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserNotificationQuery, GetLoginUserNotificationQueryVariables>(GetLoginUserNotificationDocument, options);
      }
export function useGetLoginUserNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserNotificationQuery, GetLoginUserNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserNotificationQuery, GetLoginUserNotificationQueryVariables>(GetLoginUserNotificationDocument, options);
        }
export type GetLoginUserNotificationQueryHookResult = ReturnType<typeof useGetLoginUserNotificationQuery>;
export type GetLoginUserNotificationLazyQueryHookResult = ReturnType<typeof useGetLoginUserNotificationLazyQuery>;
export type GetLoginUserNotificationQueryResult = Apollo.QueryResult<GetLoginUserNotificationQuery, GetLoginUserNotificationQueryVariables>;
export const GetLoginUserPlansDocument = gql`
    query GetLoginUserPlans {
  loginUserPlans {
    edges {
      node {
        id
        title
        content
        price
        planImage
        isPublished
        publishedAt
        createdAt
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserPlansQuery__
 *
 * To run a query within a React component, call `useGetLoginUserPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserPlansQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserPlansQuery, GetLoginUserPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserPlansQuery, GetLoginUserPlansQueryVariables>(GetLoginUserPlansDocument, options);
      }
export function useGetLoginUserPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserPlansQuery, GetLoginUserPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserPlansQuery, GetLoginUserPlansQueryVariables>(GetLoginUserPlansDocument, options);
        }
export type GetLoginUserPlansQueryHookResult = ReturnType<typeof useGetLoginUserPlansQuery>;
export type GetLoginUserPlansLazyQueryHookResult = ReturnType<typeof useGetLoginUserPlansLazyQuery>;
export type GetLoginUserPlansQueryResult = Apollo.QueryResult<GetLoginUserPlansQuery, GetLoginUserPlansQueryVariables>;
export const GetLoginUserReviewsDocument = gql`
    query GetLoginUserReviews {
  loginUserReviews {
    edges {
      node {
        id
        reviewText
        stars
        customer {
          targetUser {
            profileName
            profileImage
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserReviewsQuery__
 *
 * To run a query within a React component, call `useGetLoginUserReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserReviewsQuery, GetLoginUserReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserReviewsQuery, GetLoginUserReviewsQueryVariables>(GetLoginUserReviewsDocument, options);
      }
export function useGetLoginUserReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserReviewsQuery, GetLoginUserReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserReviewsQuery, GetLoginUserReviewsQueryVariables>(GetLoginUserReviewsDocument, options);
        }
export type GetLoginUserReviewsQueryHookResult = ReturnType<typeof useGetLoginUserReviewsQuery>;
export type GetLoginUserReviewsLazyQueryHookResult = ReturnType<typeof useGetLoginUserReviewsLazyQuery>;
export type GetLoginUserReviewsQueryResult = Apollo.QueryResult<GetLoginUserReviewsQuery, GetLoginUserReviewsQueryVariables>;
export const GetPlanDocument = gql`
    query GetPlan($planId: ID!) {
  plan(id: $planId) {
    id
    title
    content
    price
    planImage
    isPublished
    createdAt
    publishedAt
    planAuthor {
      id
      targetUser {
        profileName
        profileImage
        isCollegeStudent
      }
    }
  }
}
    `;

/**
 * __useGetPlanQuery__
 *
 * To run a query within a React component, call `useGetPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanQuery({
 *   variables: {
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useGetPlanQuery(baseOptions: Apollo.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
      }
export function useGetPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
        }
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanQueryResult = Apollo.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
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
export const GetCollegeProfilesDocument = gql`
    query GetCollegeProfiles {
  collegeProfiles {
    edges {
      node {
        id
        profileName
        profileText
        telephoneNumber
        isCollegeStudent
        schoolName
        age
        createdAt
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
          id
          genderName
        }
        selectedAddress {
          id
          addressName
        }
      }
    }
  }
}
    `;

/**
 * __useGetCollegeProfilesQuery__
 *
 * To run a query within a React component, call `useGetCollegeProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollegeProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollegeProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCollegeProfilesQuery(baseOptions?: Apollo.QueryHookOptions<GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables>(GetCollegeProfilesDocument, options);
      }
export function useGetCollegeProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables>(GetCollegeProfilesDocument, options);
        }
export type GetCollegeProfilesQueryHookResult = ReturnType<typeof useGetCollegeProfilesQuery>;
export type GetCollegeProfilesLazyQueryHookResult = ReturnType<typeof useGetCollegeProfilesLazyQuery>;
export type GetCollegeProfilesQueryResult = Apollo.QueryResult<GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables>;
export const GetHighSchoolProfilesDocument = gql`
    query GetHighSchoolProfiles {
  highSchoolProfiles {
    edges {
      node {
        id
        profileName
        profileText
        telephoneNumber
        isCollegeStudent
        schoolName
        age
        createdAt
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
          id
          genderName
        }
        selectedAddress {
          id
          addressName
        }
      }
    }
  }
}
    `;

/**
 * __useGetHighSchoolProfilesQuery__
 *
 * To run a query within a React component, call `useGetHighSchoolProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHighSchoolProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHighSchoolProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHighSchoolProfilesQuery(baseOptions?: Apollo.QueryHookOptions<GetHighSchoolProfilesQuery, GetHighSchoolProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHighSchoolProfilesQuery, GetHighSchoolProfilesQueryVariables>(GetHighSchoolProfilesDocument, options);
      }
export function useGetHighSchoolProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHighSchoolProfilesQuery, GetHighSchoolProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHighSchoolProfilesQuery, GetHighSchoolProfilesQueryVariables>(GetHighSchoolProfilesDocument, options);
        }
export type GetHighSchoolProfilesQueryHookResult = ReturnType<typeof useGetHighSchoolProfilesQuery>;
export type GetHighSchoolProfilesLazyQueryHookResult = ReturnType<typeof useGetHighSchoolProfilesLazyQuery>;
export type GetHighSchoolProfilesQueryResult = Apollo.QueryResult<GetHighSchoolProfilesQuery, GetHighSchoolProfilesQueryVariables>;
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
      id
      planAuthor {
        edges {
          node {
            id
            title
            content
            isPublished
            price
            publishedAt
            createdAt
            planImage
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
    selectedGender {
      genderName
    }
    selectedAddress {
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
export const GetAllTalkRoomsDocument = gql`
    query GetAllTalkRooms {
  allTalkRooms {
    edges {
      node {
        id
        talkRoomDescription
        selectedPlan {
          id
          title
          content
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
 * __useGetAllTalkRoomsQuery__
 *
 * To run a query within a React component, call `useGetAllTalkRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTalkRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTalkRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTalkRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTalkRoomsQuery, GetAllTalkRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTalkRoomsQuery, GetAllTalkRoomsQueryVariables>(GetAllTalkRoomsDocument, options);
      }
export function useGetAllTalkRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTalkRoomsQuery, GetAllTalkRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTalkRoomsQuery, GetAllTalkRoomsQueryVariables>(GetAllTalkRoomsDocument, options);
        }
export type GetAllTalkRoomsQueryHookResult = ReturnType<typeof useGetAllTalkRoomsQuery>;
export type GetAllTalkRoomsLazyQueryHookResult = ReturnType<typeof useGetAllTalkRoomsLazyQuery>;
export type GetAllTalkRoomsQueryResult = Apollo.QueryResult<GetAllTalkRoomsQuery, GetAllTalkRoomsQueryVariables>;
export const GetLoginUserTalkRoomsDocument = gql`
    query GetLoginUserTalkRooms {
  loginUserTalkRooms {
    edges {
      node {
        id
        selectedPlan {
          id
          title
          content
          price
          planAuthor {
            id
            targetUser {
              profileName
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
              }
            }
          }
        }
        opponentUser {
          id
          email
          targetUser {
            id
            profileName
            profileImage
            schoolName
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetLoginUserTalkRoomsQuery__
 *
 * To run a query within a React component, call `useGetLoginUserTalkRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserTalkRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserTalkRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserTalkRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserTalkRoomsQuery, GetLoginUserTalkRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserTalkRoomsQuery, GetLoginUserTalkRoomsQueryVariables>(GetLoginUserTalkRoomsDocument, options);
      }
export function useGetLoginUserTalkRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserTalkRoomsQuery, GetLoginUserTalkRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserTalkRoomsQuery, GetLoginUserTalkRoomsQueryVariables>(GetLoginUserTalkRoomsDocument, options);
        }
export type GetLoginUserTalkRoomsQueryHookResult = ReturnType<typeof useGetLoginUserTalkRoomsQuery>;
export type GetLoginUserTalkRoomsLazyQueryHookResult = ReturnType<typeof useGetLoginUserTalkRoomsLazyQuery>;
export type GetLoginUserTalkRoomsQueryResult = Apollo.QueryResult<GetLoginUserTalkRoomsQuery, GetLoginUserTalkRoomsQueryVariables>;
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