import type { GetAllProfilesQuery } from "src/apollo/schema";
import { Profile } from "src/components/posts/Profile";

type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};
export const ProfilesWrapper: React.VFC<PropsGetAllProfilesQuery<GetAllProfilesQuery>> = (
  props,
) => {
  if (props.profilesData === undefined) return <div>undefined</div>;
  return (
    <ul className="md:flex md:flex-wrap">
      {props.profilesData.allProfiles &&
        props.profilesData.allProfiles.edges.map((profile) => {
          return (
            <Profile
              key={profile?.node?.id}
              profileName={profile?.node?.profileName ? profile.node.profileName : ""}
              profileText={profile?.node?.profileText ? profile.node.profileText : ""}
              profileImage={profile?.node?.profileImage ? profile.node.profileImage : ""}
              schoolName={profile?.node?.schoolName ? profile.node.schoolName : ""}
              age={profile?.node?.age ? profile.node.age : 0}
              tags={profile?.node?.tags ? profile.node.tags : []}
              stars={
                profile?.node?.targetUser
                  ? profile.node.targetUser.provider.edges.map((review) => {
                      return review?.node?.stars;
                    })
                  : [0]
              }
            />
          );
        })}
    </ul>
  );
};
