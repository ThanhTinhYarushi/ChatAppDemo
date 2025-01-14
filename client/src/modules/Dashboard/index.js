import { useEffect, useRef, useState } from "react";
// import Avatar from "../../assets/avatar.svg";
import Input from "../../components/Input";
import Img1 from "../../assets/img1.jpg";
import Img5 from "../../assets/img5.jpg";
// import Img6 from "../../assets/img6.jpg";
import admin_avatar from "../../assets/TheLiems.png";
import { io } from "socket.io-client";
import LogoutButton from "../../components/Logout";

const Dashboard = () => {
    // * khai báo
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user:detail"))
    );
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);
    console.log("user :>>", user);
    console.log("conversations :>>", conversations);
    console.log("messages :>>", messages);
    console.log("users :>>", users);
    console.log(setUser);

    // * hàm useeffect: setSocket port 8000
    useEffect(() => {
        setSocket(io("http://localhost:8080"));
    }, []);
    // * hàm useeffect: socket
    useEffect(() => {
        socket?.emit("addUser", user?.id);
        socket?.on("getUsers", (users) => {
            console.log("activeUsers :>> ", users);
        });
        socket?.on("getMessage", (data) => {
            setMessages((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    { user: data.user, message: data.message },
                ],
            }));
        });
    }, [socket]);
    // * hàm useeffect: scroll
    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages?.messages]);
    // * hàm useeffect: đăng nhập
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
        const fetchConversations = async () => {
            const res = await fetch(
                `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resData = await res.json();
            console.log("resData :>>", resData);
            setConversations(resData);
        };
        fetchConversations();
    }, []);
    // * hàm useeffect: fetchUser
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(
                `http://localhost:8000/api/users/${user?.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const resData = await res.json();
            setUsers(resData);
        };
        fetchUsers();
    }, []);

    // TODO: fetch message -> sử dụng http với port 8000
    const fetchMessages = async (conversationId, receiver) => {
        const res = await fetch(
            `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const resData = await res.json();
        setMessages({ messages: resData, receiver, conversationId });
    };

    // TODO: đăng xuất
    // import LogoutButton from "../../components/Logout";
    // TODO: UPDATE
    //!{
    // Hàm lấy tin nhắn từ conversationId
    // const fetchMessagesFromConversation = async (conversationId, receiver) => {
    //     const res = await fetch(
    //         `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    //     const resData = await res.json();
    //     setMessages({ messages: resData, receiver, conversationId });
    // };
    // // Hàm kiểm tra và lấy tin nhắn từ cuộc trò chuyện giữa user1 và user2
    // const fetchMessages = async (user1, user2) => {
    //     // Kiểm tra xem có cuộc trò chuyện giữa user1 và user2 chưa
    //     const existingConversation = await checkExistingConversation(
    //         user1,
    //         user2
    //     );

    //     let conversationId; // Khai báo conversationId ở đây

    //     if (!existingConversation) {
    //         // Nếu chưa có, tạo cuộc trò chuyện mới
    //         const newConversation = await createNewConversation(user1, user2);
    //         conversationId = newConversation.id; // Gán conversationId mới
    //     } else {
    //         // Nếu có rồi, dùng conversationId hiện tại
    //         conversationId = existingConversation.id;
    //     }

    //     // Lấy tin nhắn từ conversationId
    //     fetchMessagesFromConversation(conversationId, user2); // Sử dụng hàm fetchMessagesFromConversation
    // };
    // // Kiểm tra cuộc trò chuyện có tồn tại hay không
    // const checkExistingConversation = async (user1, user2) => {
    //     try {
    //         const response = await fetch(`/api/conversations/check`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ user1Id: user1.id, user2Id: user2.id }),
    //         });

    //         const data = await response.json();
    //         return data; // Trả về conversationId nếu có
    //     } catch (error) {
    //         console.error("Lỗi kiểm tra cuộc trò chuyện:", error);
    //         return null; // Không có cuộc trò chuyện
    //     }
    // };
    // // Tạo cuộc trò chuyện mới
    // const createNewConversation = async (user1, user2) => {
    //     try {
    //         const response = await fetch('/api/conversations', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 user1Id: user1.id,
    //                 user2Id: user2.id
    //             }),
    //         });

    //         // Kiểm tra nếu API trả về lỗi
    //         if (!response.ok) {
    //             throw new Error('Failed to create conversation');
    //         }

    //         const data = await response.json();
    //         if (data && data.id) {
    //             return data; // Trả về cuộc trò chuyện mới
    //         } else {
    //             throw new Error('No conversation id returned');
    //         }
    //     } catch (error) {
    //         console.error('Lỗi khi tạo cuộc trò chuyện mới:', error);
    //         return null; // Trả về null nếu có lỗi
    //     }
    // };
    //! }

    // TODO: gửi tin nhắn
    const sendMessage = async (e) => {
        setMessage("");
        socket?.emit("sendMessage", {
            senderId: user?.id,
            receiverId: messages?.receiver?.receiverId,
            message,
            conversationId: messages?.conversationId,
        });
        const res = await fetch(`http://localhost:8000/api/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                conversationId: messages?.conversationId,
                senderId: user?.id,
                message,
                receiverId: messages?.receiver?.receiverId,
            }),
        });
    };

    const logout = () => {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem("user");

        // Nếu dùng sessionStorage
        // sessionStorage.removeItem('user');

        // Ngắt kết nối socket (nếu đang sử dụng socket.io)
        socket?.emit("logout", { userId: user?.id });
        socket?.disconnect();

        // Định hướng lại trang đăng nhập
        window.location.href = "/login";
    };

    return (
        <div className="w-screen flex ">
            {/* TODO */}

            <div className="w-[25%]  h-screen bg-secondary overflow-scroll">
                <div className="flex items-center my-8 mx-14">
                    <div className="border border-primary p-[2px] rounded-full">
                        <img
                            src={admin_avatar}
                            width={75}
                            height={75}
                            alt="avatar ne hihi"
                            className="border border-primary p-[2px] rounded-full"
                        />
                    </div>
                    <div className="ml-8">
                        <h3 className="text-2xl">{user?.fullName}</h3>
                        <p className="text-lg font-light">My Account</p>
                    </div>
                </div>
                <hr />

                {/* TODO :Nút đăng xuất */}
                <div className="mx-14 mt-10">
                    <div className="mx-14 mt-10">
                        <LogoutButton />
                    </div>
                </div>
                <div className="mx-14 mt-10">
                    <div className="text-primary text-lg">Tin Nhắn</div>
                    {/* TODO: Conversation */}
                    <div>
                        {conversations.length > 0 ? (
                            conversations.map(({ conversationId, user }) => {
                                return (
                                    <div className="flex items-center py-8 border-b border-b-gray-300">
                                        <div
                                            className="cursor-pointer flex items-center"
                                            onClick={() =>
                                                // console.log("Hello")
                                                fetchMessages(
                                                    conversationId,
                                                    user
                                                )
                                            }>
                                            <div>
                                                <img
                                                    src={Img5}
                                                    className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                                                    alt="avatar ne"
                                                />
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-lg font-semibold">
                                                    {user?.fullName}
                                                </h3>
                                                <p className="text-sm font-light text-gray-600">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-lg font-semibold mt-24">
                                Không có ai nói chuyện hết..
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* TODO  MESSAGE */}
            <div className="w-[50%] h-screen bg-white flex flex-col items-center">
                {messages?.receiver?.fullName && (
                    <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2 shadow-lg">
                        <div className="cursor-pointer">
                            <img
                                src={Img1}
                                width={60}
                                height={60}
                                alt="avatar ne hihi"
                                className="rounded-full"
                            />
                        </div>
                        <div className="ml-6 mr-auto">
                            <h3 className="text-lg">
                                {messages?.receiver?.fullName}
                            </h3>
                            <p className="text-sm font-light text-gray-600">
                                {messages?.receiver?.email}
                            </p>
                        </div>
                        <div className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-phone-outgoing"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="black"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                <line x1="15" y1="9" x2="20" y2="4" />
                                <polyline points="16 4 20 4 20 8" />
                            </svg>
                        </div>
                    </div>
                )}
                <div className="h-[75%] border w-full overflow-scroll shadow-sm">
                    <div className=" p-14">
                        {messages?.messages?.length > 0 ? (
                            messages.messages.map(
                                ({ message, user: { id } = {} }) => {
                                    return (
                                        <>
                                            <div
                                                className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                                                    id === user?.id
                                                        ? "bg-primary text-white rounded-tl-xl ml-auto"
                                                        : "bg-secondary rounded-tr-xl"
                                                } `}>
                                                {message}
                                            </div>
                                            <div ref={messageRef}></div>
                                        </>
                                    );
                                }
                            )
                        ) : (
                            <div className="text-center text-lg font-semibold mt-24">
                                Không có tin nhắn hoặc cuộc hội thoại nào được
                                chọn!!
                            </div>
                        )}
                    </div>
                </div>
                {messages?.receiver?.fullName && (
                    <div className="p-14 w-full flex items-center">
                        <Input
                            placeholder="Gõ Tin Nhắn ở đây..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-[75%]"
                            inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
                        />
                        <div
                            className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                                !message && "pointer-events-none"
                            }`}
                            onClick={() => sendMessage()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-send"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <line x1="10" y1="14" x2="21" y2="3" />
                                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                        </div>
                        <div
                            className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                                !message && "pointer-events-none"
                            }`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-circle-plus"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <circle cx="12" cy="12" r="9" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* TODO PROPLE*/}

            <div className="w-[25%] h-screen bg-light px-8 py-16 overflow-scroll">
                <div className="text-primary text-lg">People</div>
                <div>
                    {users.length > 0 ? (
                        users.map(({ userId, user }) => {
                            return (
                                <div className="flex items-center py-8 border-b border-b-gray-300">
                                    <div
                                        className="cursor-pointer flex items-center"
                                        onClick={() =>
                                            fetchMessages("new", user)
                                        }>
                                        <div>
                                            <img
                                                src={Img1}
                                                className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="text-lg font-semibold">
                                                {user?.fullName}
                                            </h3>
                                            <p className="text-sm font-light text-gray-600">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-lg font-semibold mt-24">
                            No Conversations
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
