import axios from 'axios'
import User from '../models/user.model.js'


export const getUserProfileAndRepos = async (req, res) => {
    const { username } = req.params
    try {
        const { data: userProfile } = await axios.get(`https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_API_KEY}`
                }
            }
        )


        const { data: repos } = await axios.get(userProfile.repos_url,
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_API_KEY}`
                }
            }
        )
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.status(200).json({ userProfile, repos });

    } catch (error) {
        res.status(500).json(error.message)
    }

}

export const likeprofile = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findById(req.user._id.toString());
        const usertoLike = await User.findOne({ username })

        if (!usertoLike) {
            return res.status(404).json({ error: "User not found" })
        }

        if (user.likedProfiles.includes(usertoLike.username)) {
            return res.status(400).json({ error: "User already liked" })
        }

        usertoLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() })
        user.likedProfiles.push(usertoLike.username)

        await Promise.all([usertoLike.save(), user.save()]);

        res.status(200).json({ message: "User liked " })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getLikes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id.toString())
        
        res.status(200).json({likedBy: user.likedBy})
    } catch (error) {
        res.status(500).json(error.message)
    }
}