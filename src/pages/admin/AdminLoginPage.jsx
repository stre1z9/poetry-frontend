import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminLoginPage() {

    const navigate = useNavigate();


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");



    async function handleSubmit(e) {

        e.preventDefault();

        setError("");


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        login,
                        password
                    })
                }
            );


            if(!response.ok) {

                throw new Error("Неверный логин или пароль");

            }


            const data = await response.json();

            console.log("LOGIN RESPONSE:", data);

            localStorage.setItem(
                "adminToken",
                data.token
            );


            navigate("/admin");


        } catch(error) {

            setError(error.message);

        }

    }



    return (

        <div className="admin-login">


            <h1>
                Вход администратора
            </h1>


            <form onSubmit={handleSubmit}>


                <input

                    type="text"

                    placeholder="Логин"

                    value={login}

                    onChange={
                        e => setLogin(e.target.value)
                    }

                />


                <input

                    type="password"

                    placeholder="Пароль"

                    value={password}

                    onChange={
                        e => setPassword(e.target.value)
                    }

                />


                <button type="submit">
                    Войти
                </button>


                {
                    error &&
                    <p>
                        {error}
                    </p>
                }


            </form>


        </div>

    );

}


export default AdminLoginPage;