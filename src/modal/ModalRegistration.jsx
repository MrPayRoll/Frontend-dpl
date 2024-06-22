import React, { useState } from "react";
import axios from "axios";
import './Registration.css';

const Modal = ({ active, setActive }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const handleSubmit = async () => {
        if (!agreeTerms) {
            alert("Please agree to terms and privacy policy");
            return;
        }
    
        try {
            const response = await axios.post('https://04d3-94-141-125-64.ngrok-free.app/api/user/registration', formData);
            console.log(response.data);
            setActive(false);
        } catch (error) {
            if (error.response) {
                console.error("Server responded with error:", error.response.status, error.response.data);
                alert("Failed to register. Please try again later.");
            } else if (error.request) {
                console.error("Request error:", error.request);
                alert("Failed to connect to the server. Please try again later.");
            } else {
                console.error("Request setup error:", error.message);
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };
    

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Введите имя"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                />
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={agreeTerms}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="termsCheckbox">
                        <span>Я соглашаюсь с<a href="/privacy" target="_blank">политикой конфиденциальности</a></span>
                    </label>
                </div>
                <button onClick={handleSubmit}>Регистрация</button>
            </div>
        </div>
    );
};

export default Modal;
