
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxioxSecure';

const useScholarItems = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();

    const { refetch, data: scholaritems = [] } = useQuery({
        queryKey: ['scholaritems', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/scholaritems?email=${user.email}`);
            return res.data;
        }
    })

    return [scholaritems, refetch]
}

export default useScholarItems