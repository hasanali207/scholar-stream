
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxioxSecure';

const useItems = () => {
    const axiosSecure = useAxiosSecure();
    

    const { refetch, data: items = [] } = useQuery({
        queryKey: ['items'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/items`);
            return res.data;
        }
    })

    return [items, refetch]
}

export default useItems;