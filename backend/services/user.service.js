const { error } = require('console');
const User = require('../models/user.modal');
const bcrypt = require('bcrypt')
const createuser = async (userdata , imagedata) => {
    try {
        const { email, password , name , username } = userdata;
        const userProfile = 'http://localhost:2121/images/' + imagedata ; 


        const isuserexist = await User.findOne({ email });
        if (isuserexist) {
            throw new Error("User already exists");
        }

        const isUsernameExist = await User.findOne({ username });
        if (isUsernameExist) {
            throw new Error("Username already exists");
        }

        const hashedpassword = await bcrypt.hash(password, 9);
        const user = await User.create({
            name , 
            username,
            email,
            password: hashedpassword,
            userProfile
        });
        await user.save();

        return user;
    } catch (error) {
        throw error;  
    }
};
const loginservice = async (userdata) => {
    try {
       
        const { identifier, password } = userdata;
        if (!identifier || !password) {
            throw new Error("Email and password are required");
        }


      const user = await User.findOne({ 
      $or: [
        { email: identifier },
        { username: identifier }
      ] 
    });

        if (!user) {
            throw new Error("User does not exist");
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Password is wrong");
        }
        return user;
    } catch (error) {
        console.error("Error in loginservice:", error);
        throw error; 
    }
}

const finduserbyId = async (userId) => {
    try {
        const user = await User.findById(userId).populate('savedpost').populate('posts').populate('follower').populate('following');;
        if(!user){
            throw new error("user not found invalid login")
        }
        return user;
    } catch (error) {
        return error
    }
}

const userdatabyname = async (userName) =>{
    try {
        const userData = await User.findOne({username:userName}).populate('posts').populate('savedpost').populate('follower').populate('following');
        if(!userData){
            throw new error("User does not exist");
        }
        return userData
    } catch (error) {
        return error
    }
}

const followUser = async (currentUserId, usernameToFollow) => {
    try {
        const userToFollow = await User.findOne({ username: usernameToFollow });
        if (!userToFollow) {
            throw new Error("User to follow does not exist");
        }

        if (userToFollow._id.equals(currentUserId)) {
            throw new Error("You cannot follow yourself");
        }

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            throw new Error("Current user not found");
        }

        if (!currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            userToFollow.follower.push(currentUser._id);

            await currentUser.save();
            await userToFollow.save();
        }

        return userToFollow;
    } catch (error) {
        throw error;
    }
};

const unfollowUser = async (currentUserId, usernameToUnfollow) => {
    try {
        const userToUnfollow = await User.findOne({ username: usernameToUnfollow });
        if (!userToUnfollow) {
            throw new Error("User to unfollow does not exist");
        }

        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            throw new Error("Current user not found");
        }

        if (currentUser.following.includes(userToUnfollow._id)) {
            currentUser.following.pull(userToUnfollow._id);
            userToUnfollow.follower.pull(currentUser._id);

            await currentUser.save();
            await userToUnfollow.save();
        }

        return userToUnfollow;
    } catch (error) {
        throw error;
    }
};

const updateProfile = async (userId, newData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, newData, { new: true });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createuser,
    loginservice,
    finduserbyId,
    userdatabyname,
    followUser,
    unfollowUser,
    updateProfile
}