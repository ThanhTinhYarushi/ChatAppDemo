const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

// TODO: dùng dotenv để bảo mật cho url database nếu source code có lộ ra ngoài
const url = process.env.MONGO_URI;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Đã kết nối tới DATABASE"))
    .catch((e) => console.log("Lỗi", e));
