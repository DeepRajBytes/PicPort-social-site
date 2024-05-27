const userservice = require('../services/user.service')
const JWTServices = require('../config/jwtprovide')
const path = require('path');
const fs = require('fs');
const resgister = async (req, res) => {
    try {
        const data = req.body;
        const imagedata  = req.file.filename;
        const user = await userservice.createuser(data , imagedata);
        res.status(200).send(user);
    } catch (error) {
        if (error.message === "User already exists"  || error.message === "Username already exists") {
            return res.status(400).send({ message: error.message });
        }
        return res.status(500).send({ message:error.message });
    }
};
const loginuser = async(req, res) => {
    try {

        const data = req.body; 
        const user = await userservice.loginservice(data);
        const jwttoken = await JWTServices.generatetoken(user._id)
        res.status(200).send({ jwttoken, message: "Successful login" });

    } catch (error) {

        console.error("Error in loginuser:", error); 
        return res.status(400).send({ error: error.message });

    }
}

const getProfile = async (req ,res) =>{
    try {
        const user = req.user ;
        const userId = user._id;
        const userProfile = await userservice.finduserbyId(userId)
        res.status(200).send(userProfile);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const userProfile = async (req, res) =>{
    try {
        const userName = req.params.id;
        const userNameProfile = await userservice.userdatabyname(userName);
        res.status(200).send(userNameProfile)
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const followUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const { username } = req.body;
        // console.log(username);
        const user = await userservice.followUser(currentUserId, username);
        res.status(200).send({ message: `You are now following ${user.username}` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const usernameToUnfollow = req.body.username;
        const user = await userservice.unfollowUser(currentUserId, usernameToUnfollow);
        res.status(200).send({ message: `You have unfollowed ${user.username}` });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const editProfile = async (req, res) => {
    try {
        
        const { name, username, bio , email } = req.body;

       
        if (req.file) {
           
            await deletePreviousProfilePicture(req.user);

            req.user.userProfile = 'http://localhost:2121/images/' + req.file.filename;
        }

        
        req.user.name = name;
        req.user.username = username;
        req.user.bio = bio;
        req.user.email = email;
       
        await userservice.updateProfile(req.user._id, req.user);

        res.status(200).send({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deletePreviousProfilePicture = async (user) => {
    if (user.userProfile) {
        try {
            const filename = user.userProfile.split('/').pop();
            const previousProfilePicturePath = path.join('images', filename);
            await fs.promises.unlink(previousProfilePicturePath);
        } catch (error) {
            console.error("Error deleting previous profile picture:", error);
        }
    }
};

module.exports = {resgister , loginuser , getProfile , userProfile, followUser , unfollowUser , editProfile}