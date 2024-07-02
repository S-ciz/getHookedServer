const generateID = require("./Utility");

const img1 =
  "https://img.freepik.com/premium-photo/plagued-melodies-enigmatic-kenku-bard-aboard-crimson-avenger_983420-173057.jpg?size=626&ext=jpg&ga=GA1.1.109111083.1672218237&semt=sph";
const img2 =
  "https://img.freepik.com/premium-photo/captivating-imagery-dynamic-army-avenger-exudes-authenticity-with-his-jetblack-hair-blue-toy-g_983420-172748.jpg?size=626&ext=jpg&ga=GA1.1.109111083.1672218237&semt=sph";
const img3 =
  "https://img.freepik.com/free-photo/male-boxer-boxing-punching-bag_155003-6125.jpg?size=626&ext=jpg&ga=GA1.1.109111083.1672218237&semt=sph";
const img4 =
  "https://img.freepik.com/free-photo/young-attractive-female-boxer-with-long-hair-boxing-gloves-is-ready-fight_613910-11583.jpg?size=626&ext=jpg&ga=GA1.1.109111083.1672218237&semt=sph";

let NewsFeeds =
[ 
  {
    id: generateID(),
    writer: "GetHooked Magazine",
    src: img1,
    timeStamp: "12 September 2022",
    text: "My life is a movie 🤣",
    comments: 34,
    likes: 9,
  },
  {
    id: generateID(),
    writer: "user1@example.com",
    src: img2,
    timeStamp: "12 September 2022",
    text: "another visual from John Doe 🤣",
    comments: 34,
    likes: 9,
    likes: 1223,
    comments: 223,
    commentsArr: [
      {
        id: 0,
        src: img3,
        name: "Andrew Hunger Thomsom",
        comment: "I love you 😍",
        timeStamp: "12:34",
      },
      {
        id: 1,
        src: img4,
        name: "Andrew Hunger Thomsom",
        comment: "I love you, you are my heroooo!!! 😍",
        timeStamp: "12:34",
      },
      {
        id: 2,
        src: img1,
        name: "Andrew Hunger Thomsom",
        comment: "😍",
        timeStamp: "12:34",
      },
    ],
  }

]

module.exports = NewsFeeds;