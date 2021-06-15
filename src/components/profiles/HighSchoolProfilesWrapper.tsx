import type { GetHighSchoolProfilesQuery } from "src/apollo/schema";
import { Profile } from "src/components/profiles/Profile";

type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};
export const HighSchoolProfilesWrapper: React.VFC<
  PropsGetAllProfilesQuery<GetHighSchoolProfilesQuery>
> = (props) => {
  if (props.profilesData === undefined) return <div>undefined</div>;
  return (
    <ul className="md:flex md:flex-wrap">
      {props.profilesData.highSchoolProfiles &&
        props.profilesData.highSchoolProfiles.edges.map((profile) => {
          return (
            <Profile
              key={profile?.node?.id}
              profileId={profile?.node?.id ? profile.node.id : ""}
              profileName={profile?.node?.profileName ? profile.node.profileName : ""}
              profileText={profile?.node?.profileText ? profile.node.profileText : ""}
              profileImage={profile?.node?.profileImage ? profile.node.profileImage : ""}
              schoolName={profile?.node?.schoolName ? profile.node.schoolName : ""}
              age={profile?.node?.age ? profile.node.age : 0}
              undergraduate={profile?.node?.undergraduate ? profile.node.undergraduate : ""}
              department={profile?.node?.department ? profile.node.department : ""}
              clubActivities={profile?.node?.clubActivities ? profile.node.clubActivities : ""}
              admissionFormat={profile?.node?.admissionFormat ? profile.node.admissionFormat : ""}
              favoriteSubject={profile?.node?.favoriteSubject ? profile.node.favoriteSubject : ""}
              // tags={profile?.node?.tags ? profile.node.tags : []}
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
