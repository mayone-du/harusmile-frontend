import { Profile } from "src/components/posts/Profile";

export const ProfilesWrapper: React.VFC<any> = (props) => {
  if (props.profilesData === undefined) return <div>undefined</div>;
  return (
    <div className="md:flex md:flex-wrap">
      {props?.profilesData?.allProfiles.edges &&
        props.profilesData.allProfiles.edges.map((profile: any) => {
          return (
            <Profile
              key={profile?.node?.id}
              profileName={profile?.node?.profileName ? profile.node.profileName : ""}
              profileText={profile?.node?.profileText ? profile.node.profileText : ""}
              profileImage={profile?.node?.profileImage ? profile.node.profileImage : ""}
            />
          );
        })}
    </div>
  );
};
