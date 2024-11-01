import axios from 'axios'

export const explorePopularRepos = async (req,res)=>{
    const {language} = req.params
    try {
        const { data: repos } = await axios.get(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc$per_page=10`,
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_API_KEY}`
                }
            }
        )
        res.status(200).json(repos)
    } catch (error) {
        res.status(500).json(error.message)
    }
}