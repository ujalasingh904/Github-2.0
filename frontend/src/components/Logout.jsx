import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";



export const Logout = () => {
	const {authUser, setAuthUser} = useAuthContext();

	const handleLogout = async () =>{
        try {
			const {data: res} = await axios.get('https://github-20-backend.vercel.app/api/auth/logout', {withCredentials: true});
			setAuthUser(null);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<>
			<img
				src={authUser?.avatarUrl}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>

			<div
				onClick={handleLogout}
				className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'>
				<MdLogout size={22} />
			</div>
		</>
	);
};
