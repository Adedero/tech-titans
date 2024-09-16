const User = require('../models/user.model')

const Controller = {
    getAllUsers : async (req, res) => {

        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: error.message})
        }
    },

    getSingleUser: async (req, res) => {
        const userId = req.params.id
        try {
            const user = await User.findById(userId)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ message: error.message})
        }
    },

    addDetails: async (req, res) => {
        try {
            const newUser = await User.create({
                imageURL: req.body.imageURL,
                fullName: req.body.fullName,
                regNumber: req.body.regNumber,
                nickname: req.body.nickname,
                birthday: req.body.birthday,
                hobbies: req.body.hobbies,
                relStatus: req.body.relStatus,
                faveQuote: req.body.faveQuote,
                faveCourse: req.body.faveCourse,
                faveLecturer: req.body.faveLecturer,
                mostStressfulLevel: req.body.mostStressfulLevel,
                classCrush: req.body.classCrush,
                whatNext: req.body.whatNext
            })

            return res.status(200).json(newUser)

        } catch (error) {
            return res.status(500).json({ message: error.message})
        }
        
    },

    editDetails: async(req, res) => {
        const userId = req.params.id
        const updatedData = req.body
        try {

            const existingUser = await User.findById(userId)

            if(!existingUser) {
                const newUser = await User.create({
                    imageURL: req.body.imageURL,
                    fullName: req.body.fullName,
                    regNumber: req.body.regNumber,
                    nickname: req.body.nickname,
                    birthday: req.body.birthday,
                    hobbies: req.body.hobbies,
                    relStatus: req.body.relStatus,
                    faveQuote: req.body.faveQuote,
                    faveCourse: req.body.faveCourse,
                    faveLecturer: req.body.faveLecturer,
                    mostStressfulLevel: req.body.mostStressfulLevel,
                    classCrush: req.body.classCrush,
                    whatNext: req.body.whatNext
                })
                return res.status(200).json(newUser)
            }

            const result = await User.findOneAndUpdate(
                {_id: userId},
                {$set: updatedData},
                {new: true}
            )

            if (!result) return res.status(404).json({ message: 'No user with this record found' })

            return res.status(200).json({ message:'Successfully updated', user: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
        
    },

    deleteUser: async(req, res) => {
        const userId = req.params.id
        try {
            const result = await User.findByIdAndDelete(userId)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

}

module.exports = Controller