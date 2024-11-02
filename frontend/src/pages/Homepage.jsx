import ProfileInfo from "../components/ProfileInfo";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
	const [userProfile, setUserProfile] = useState(null)
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [sortType, setSortType] = useState("recent")

	const getUserprofileAndRepos = async (username = "ujalasingh904") => {
		setLoading(true)
		try {
			const { data: { userProfile, repos } } = await axios.get(`https://github-backend.netlify.app/api/users/profile/${username}`)
			setUserProfile(userProfile)
			setRepos(repos)


		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getUserprofileAndRepos()
	}, []);

	const onSearch = async (e, username) => {
		e.preventDefault()
		setLoading(true)
		try {
			setRepos([])
			setUserProfile(null)
			getUserprofileAndRepos(username)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
		setSortType("recent")
	}

	const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
		} else if (sortType === "forks") {
			repos.sort((a, b) => b.forks_count - a.forks_count);
		}

		setSortType(sortType);
		setRepos([...repos]);
	}

	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{repos?.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{loading ? <Spinner /> : <Repos repos={repos} />}
			</div>
		</div>
	);
};

export default HomePage;