const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {

   findAllPosts: (params) => {
    return new Promise ((resolve, reject) => {

      // Post.find(params)
      // .populate('user_id')
      // .exec((err, userDocs)  => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(userDocs)
      //   }
      // });

      User.find(params)
        .populate('posts')
        .exec((err, posts) => {
          if (err) {
            reject(err);
          } else {
            resolve(posts);
          }
        })

    

    })
   },
   createUser: (params) => {
    return new Promise((resolve, reject) => {
      let user = new User({
        email: params.email,
        username: params.username,
      });

      user
      .save()
      .then(user => {
        resolve(user)
      })
      .catch(err => {
        reject(err);
      })

    });
   },


   createPost: (params) => {

    return new Promise((resolve, reject) => {


      User.findById(params._id)
        .then(user => {
          

          let post = new Post({
            post: params.post,
            user_id: params._id
          })

          post
          .save()
          .then(post => {

            user.posts.push(post);
            user.save()
              .then(user => {
                resolve(post)
              })
              .catch(err => {
                reject(err)
              })

            
          })
          .catch(err => {
            reject(err);
          })


        })
        .catch(err => {
          reject(err)
        });


    })

   }
}
