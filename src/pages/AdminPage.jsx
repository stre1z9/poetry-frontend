import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAdminPoems,
    deletePoem
} from "../services/poemService";

function AdminPage() {

    const [poems, setPoems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPoems();

    }, []);

    async function loadPoems() {

        try {

            const data = await getAdminPoems();

            setPoems(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Вы действительно хотите удалить это стихотворение?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deletePoem(id);

            setPoems(
                currentPoems =>
                    currentPoems.filter(
                        poem => poem.id !== id
                    )
            );

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return (
            <div className="admin-loading">
                Загрузка...
            </div>
        );

    }

    return (

        <section className="admin-page">

            <div className="admin-header">

                <div>

                    <p className="admin-eyebrow">
                        Панель управления
                    </p>

                    <h1 className="admin-title">
                        Администрирование
                    </h1>

                    <p className="admin-description">
                        Управление стихотворениями и комментариями.
                    </p>

                </div>

                <div className="admin-actions">

                    <Link
                        to="/admin/comments"
                        className="btn btn-outline-dark"
                    >
                        Комментарии
                    </Link>

                    <Link
                        to="/admin/new"
                        className="btn btn-dark"
                    >
                        Новое стихотворение
                    </Link>

                </div>

            </div>

            <div className="admin-divider" />

            {poems.length === 0 ? (

                <div className="admin-empty">

                    <h3>
                        Стихотворений пока нет
                    </h3>

                    <p>
                        Создайте первое стихотворение,
                        чтобы оно появилось здесь.
                    </p>

                    <Link
                        to="/admin/new"
                        className="btn btn-dark"
                    >
                        Создать стихотворение
                    </Link>

                </div>

            ) : (

                <div className="admin-poems">

                    {poems.map(poem => (

                        <article
                            key={poem.id}
                            className="admin-poem"
                        >

                            <div className="admin-poem-main">

                                <div className="admin-poem-meta">

                                    <span className={
                                        poem.published
                                            ? "admin-status published"
                                            : "admin-status draft"
                                    }>

                                        <span className="admin-status-dot" />

                                        {poem.published
                                            ? "Опубликовано"
                                            : "Черновик"}

                                    </span>

                                    {poem.createdAt && (

                                        <span className="admin-poem-date">

                                            {new Date(
                                                poem.createdAt
                                            ).toLocaleDateString(
                                                "ru-RU"
                                            )}

                                        </span>

                                    )}

                                </div>

                                <h2 className="admin-poem-title">
                                    {poem.title}
                                </h2>

                                {poem.description && (

                                    <p className="admin-poem-description">
                                        {poem.description}
                                    </p>

                                )}

                                {poem.tags &&
                                    poem.tags.length > 0 && (

                                    <div className="admin-poem-tags">

                                        {poem.tags.map(tag => (

                                            <span
                                                key={tag.id}
                                                className="admin-poem-tag"
                                            >
                                                #{tag.name}
                                            </span>

                                        ))}

                                    </div>

                                )}

                            </div>

                            <div className="admin-poem-actions">

                                <Link
                                    to={`/admin/edit/${poem.id}`}
                                    className="btn btn-outline-dark"
                                >
                                    Редактировать
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(poem.id)
                                    }
                                    className="btn btn-outline-danger"
                                >
                                    Удалить
                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}

export default AdminPage;

