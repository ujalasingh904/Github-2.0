import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import Repos from "../components/Repos";



const ExplorePage = () => {
	const [loading, setLoading] = useState(false)
	const [repos, setRepos] = useState([])
	const [selectedLanguage, setSelectedLanguage] = useState("")

	const exploreRepos = async (language) => {
		setLoading(true)
		try {
			const { data: repos } = await axios.get(`/api/explore/repos/${language}`,
				{withCredentials: true}
			)

			setRepos(repos.items)
			setSelectedLanguage(language)
		} catch (error) {
			toast.error(error.message)
		}
		finally {
			setLoading(false)
		}
	}
	return (
		<div className='px-4'>
			<div className='bg-glass max-w-xl mx-auto rounded-md p-4 flex flex-col items-center  justify-center'>
				<h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
				<div className='flex flex-wrap gap-2 my-2 justify-center'>
					<img
						onClick={() => exploreRepos('javascript')}
						src='/javascript.svg' alt='JavaScript' className='h-11 sm:h-20 cursor-pointer' />

					<img
						onClick={() => exploreRepos('typescript')}
						src='/typescript.svg' alt='TypeScript logo' className='h-11 sm:h-20 cursor-pointer' />

					<img
						onClick={() => exploreRepos('c++')}
						src='/c++.svg' alt='C++ logo' className='h-11 sm:h-20 cursor-pointer' />
					<img
						onClick={() => exploreRepos('python')}
						src='/python.svg' alt='Python logo' className='h-11 sm:h-20 cursor-pointer' />

					<img
						onClick={() => exploreRepos('java')}
						src='/java.svg' alt='Java logo' className='h-11 sm:h-20 cursor-pointer' />
				</div>
				{!loading && repos?.length > 0 &&
					<h2 className='text-lg font-bold text-center my-4 '>Popular
						<span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ml-2  ">
							{selectedLanguage.toUpperCase()}
						</span>
						Repositories
					</h2>
				}
				{!loading && repos?.length > 0 && <Repos repos={repos} alwaysFullWidth />}
				{loading && <Spinner />}

			</div>
		</div>
	);
};

export default ExplorePage;