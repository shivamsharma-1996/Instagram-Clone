// server/server.js

let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");

let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);

    
    //Maps id to User object
    let userslist = {
        a: {
          id: "a",
          nickname: "Shivam Sharma",
          avatar: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"
        },
        b: {
          id: "b",
          nickname: "George",
          avatar: "https://bit.ly/2HfU2bw"
        },
        c: {
          id: "c",
          nickname: "Marsh",
          avatar: "https://www.laravelnigeria.com/img/chris.jpg"
        }
      };

      let postslist = {
        a: {
          a: {
            id: "a",
            user: userslist["a"],
            caption: "Moving the community!",
            image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
          },
          b: {
            id: "b",
            user: userslist["a"],
            caption: "Angular Book :)",
            image:
              "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
          },
          c: {
            id: "c",
            user: userslist["a"],
            caption: "Me at Frontstack.io",
            image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
          },
          d: {
            id: "d",
            user: userslist["a"],
            caption: "Moving the community!",
            image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
          }
        }
      };
      

      // The root provides a resolver function for each API endpoint
    let root = {
        user: function({ id }) {
          return userslist[id];
        },
        post: function({ user_id , post_id }) {
          return postslist[user_id][post_id];
        },
        posts: function({ user_id }){
          return Object.values(postslist[user_id]);
        }
      };


      let app = express();
    app.use(cors());
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );
    // set application port
    app.listen(4000);



    //pusher code for server
    let pusher = new Pusher({
      appId: '729642',
      key: '9a2d3db463c263565cc3',
      secret: '7c9a48f45fc7b596a1d5',
      cluster: 'ap2',
      encrypted: true
    }); 


    /*Creating the endpoint for storing new posts*/
    // add Middleware
    let multipartMiddleware = new Multipart();

    // trigger add a new post 
    app.post('/newpost', multipartMiddleware, (req,res) => {
      // create a sample post
      let post = {
        user : {
          nickname : req.body.name,
          avatar : req.body.avatar
        },
        image : req.body.image,
        caption : req.body.caption
      }

      // trigger pusher event 
      pusher.trigger("posts-channel", "new-post", { 
        post 
      });

      return res.json({status : "Post created"});
    });
