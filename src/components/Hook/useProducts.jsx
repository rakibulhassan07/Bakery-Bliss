import React from 'react';
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
    const {
        isPending,
        data: product = [],
        refetch,
      } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
          const res = await fetch(
            "http://localhost/BackEnd/api/index.php/product",
          );
          return res.json();
        },
      });
      return [product, refetch, isPending];
};

export default useProducts;