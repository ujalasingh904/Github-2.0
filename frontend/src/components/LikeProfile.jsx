import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const LikeProfile = ({ userProfile }) => {
    const { authUser } = useAuthContext()
    const ownProfile = authUser?.username === userProfile.login;

    const handleLikeprofile = async () => {
        try {

            const { data: res } = await axios.post(`/api/users/like/${userProfile.login}`,
                { withCredentials: true }
            )

            if (res.error) {
                throw new Error(res.error)
            }

            toast.success(res.message)

        } catch (error) {
            toast.error(error.response.data.error)
        }
    }

    if (!authUser || ownProfile) return null;

    return (
        <button className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
            onClick={handleLikeprofile}
        >
            <FaHeart size={16} /> Like profile
        </button>
    )
}

export default LikeProfile