import { useGetAllProfilesLazyQuery } from "src/apollo/schema";

export const useGetMoreAllProfiles = () => {
  const [getAllProfilesLazyQuery, { data, loading: isLoading }] = useGetAllProfilesLazyQuery();

  const getMoreAllProfiles = () => {
    getAllProfilesLazyQuery({
      variables: {
        offset: 5,
        first: 5,
      },
    });
  };

  return {
    getMoreAllProfiles,
    data,
    isLoading,
  };
};
