import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Xóa token hoặc thông tin đăng nhập trong localStorage hoặc sessionStorage
        localStorage.removeItem("authToken"); // Hoặc sessionStorage tùy thuộc vào cách bạn lưu trữ token
        localStorage.removeItem("user:token");
        localStorage.removeItem("user:detail");

        // 2. Ngắt kết nối socket nếu có (nếu bạn sử dụng socket.io)
        // socket.emit('logout'); // Hoặc socket.disconnect()

        // 3. Điều hướng về trang login sau khi đăng xuất
        navigate("/users/sign_in");
        window.location.reload();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            {/* Icon SVG */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M15 12h-12l3 -3" />
                <path d="M6 15l-3 -3" />
            </svg>
            Đăng xuất
        </button>
    );
};

export default LogoutButton;
