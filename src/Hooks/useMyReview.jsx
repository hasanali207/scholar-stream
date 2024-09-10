
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxioxSecure';

const useMyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();

    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/review/user/${user.email}`);
            return res.data;
        }
    })  

    return [review, refetch]
}

export default useMyReview