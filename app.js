const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];
const http = require("http");
const server = http.createServer();

const httpRequestListener = function (request, response) {
  const { url, method } = request;

  if (method === "POST") {
    if (url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            message: "userCreated",
            users: users,
            // BUG "users": users, 왜 users 따옴표 없어지냐?
            // FIXED 원래 key 값 부분에는 안되는듯
          })
        );
      });
    } else if (url === "/posts") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            message: "postCreated",
            posts: posts,
          })
        );
      });
    }
  }
};

server.on("request", httpRequestListener);

const IP = "127.0.0.1";
const PORT = 8000;

server.listen(PORT, IP, function () {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`);
});

/* NOTE 유저 정보 테스트 입력 값
http -v POST 127.0.0.1:8000/users/signup id:=3 name="김테스트" email="test@gmail.com" password="test_password"
 */
/* 
NOTE 게시물 생성 테스트 입력 값
http -v POST 127.0.0.1:8000/posts id:=3 title="테스트 타이틀" content="테스트 내용" userId:=2            
 */
