
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxioxSecure';

const useAllScholarItems = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();

    const { refetch, data: allscholaritems = [] } = useQuery({
        queryKey: ['allscholaritems', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allscholaritems`);
            return res.data;
        }
    })

    return [allscholaritems, refetch]
}

export default useAllScholarItems