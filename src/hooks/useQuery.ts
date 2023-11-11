import React from "react";

const useQuery = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const query = async <T>(call: () => Promise<T>) => {
    setLoading(true);

    const data = await call();

    setLoading(false);

    return data;
  };

  return { query, loading };
};

export default useQuery;
