import { useGetAllProfilesQuery } from "src/apollo/schema";
import { Profile } from "src/components/posts/Profile";

export const ProfilesWrapper: React.VFC = () => {
  const { data, loading: isLoading, error } = useGetAllProfilesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> {error.message} </div>;
  return (
    <div className="md:flex md:flex-wrap">
      {data?.allProfiles?.edges &&
        data.allProfiles.edges.map((profile) => {
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
