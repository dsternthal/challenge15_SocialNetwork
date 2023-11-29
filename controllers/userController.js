const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = (await User.find()
      .populate("thoughts")
      .populate("friends"));
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ username: req.body.username });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // async deleteUser(req, res){
  //   try {
  //     const thought = await Thought.findOneaAndRemoe({username: req.body .username});
  //     if (!thought) {
  //       return res.status(404).json({message: "No thoughts with this username"});
  //     }

  //     const user = await User.findOneAndRemove(
  //       { _id: req.params.userId},
  //       { new:true }
  //     );
        // if (!user){
        //   return res
        //   .status(404)
        //   .json({message: "Thought created bu no user with this username"})
        // }
  //   }
  // }
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this ID!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res){
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Friend added created, but found no user with that ID',
        })
      }

      res.json('Friend Added! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res){
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Friend created but no user with this id!',
        });
      }

      res.json({ message: 'Friend successfully removed!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }

};
