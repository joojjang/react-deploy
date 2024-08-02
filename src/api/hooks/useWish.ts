import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

type WishRequestParams = {
  productId: number;
};

// type WishResponseParams = null;

// type WishResponseData = WishResponseParams;

// export const getProductsPath = ({ categoryId, pageToken, maxResults }: RequestParams) => {
//   const params = new URLSearchParams();

//   params.append('categoryId', categoryId);
//   params.append('sort', 'name,asc');
//   if (pageToken) params.append('page', pageToken);
//   if (maxResults) params.append('size', maxResults.toString());

//   return `${BASE_URL}/api/products?${params.toString()}`;
// };

const token = authSessionStorage.get();

const postWish = async (params: WishRequestParams) => {
  try {
    const response = await fetchInstance.post(`/api/wishes`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('wish posted!');
    } else {
      console.log('성공은 했는데 200은 아닌: ', response.status);
    }

    return null;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // 서버 응답이 있는 경우
      console.log('Error status:', axiosError.response.status);
      console.log('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      console.log('No response received:', axiosError.request);
    } else {
      // 요청 설정 중에 발생한 에러
      console.log('Error message:', axiosError.message);
    }
    throw error;
  }
};

export const usePostWish = (): UseMutationResult<null, Error, WishRequestParams> => {
  return useMutation({
    mutationFn: (params: WishRequestParams) => postWish(params),
  });
};

const deleteWish = async (wishId: number) => {
  try {
    const response = await fetchInstance.delete(`/api/wishes/${wishId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('wish deleted!');
    } else {
      console.log('성공은 했는데 200은 아닌: ', response.status);
    }

    return null;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // 서버 응답이 있는 경우
      console.log('Error status:', axiosError.response.status);
      console.log('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      console.log('No response received:', axiosError.request);
    } else {
      // 요청 설정 중에 발생한 에러
      console.log('Error message:', axiosError.message);
    }
    throw error;
  }
};

export const useDeleteWish = (): UseMutationResult<null, Error, number> => {
  return useMutation({
    mutationFn: (wishId: number) => deleteWish(wishId),
  });
};
