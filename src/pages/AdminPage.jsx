import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAdminPoems, deletePoem } from "../services/poemService";

function AdminPage() {

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPoems();
    }, []);

    async function loadPoems() {

        try {

            const data = await getAdminPoems();

            setPoems(data.content);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Удалить стихотворение?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deletePoem(id);

            loadPoems();

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {
        return <h3>Загрузка...</h3>;
    }

    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>Администрирование</h1>

                <Link
                    to="/admin/new"
                    className="btn btn-dark">

                    Новое стихотворение

                </Link>

            </div>

            {poems.length === 0 && (

                <p>Стихотворений пока нет.</p>

            )}

            <div className="d-flex flex-column gap-3">

                {poems.map(poem => (

                    <div
                        key={poem.id}
                        className="card">

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <h4>

                                        {poem.title}

                                    </h4>

                                    <p className="text-muted">

                                        {poem.description}

                                    </p>

                                    <small>

                                        {poem.published
                                            ? "🟢 Опубликовано"
                                            : "⚪ Черновик"}

                                    </small>

                                </div>

                                <div className="d-flex gap-2 align-items-start">
                                    <Link
                                        to="/admin/new"
                                        className="btn btn-dark"
                                    >
                                        Новое стихотворение
                                    </Link>
                                    <Link
                                        to={`/admin/edit/${poem.id}`}
                                        className="btn btn-outline-primary">

                                        Редактировать

                                    </Link>

                                    <button
                                        onClick={() => handleDelete(poem.id)}
                                        className="btn btn-outline-danger">

                                        Удалить

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );

}

export default AdminPage;
