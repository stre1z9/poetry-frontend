import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAdminComments,
    approveComment,
    deleteComment
} from "../services/poemService";

function AdminCommentsPage() {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadComments();

    }, []);

    async function loadComments() {

        try {

            const data = await getAdminComments();

            setComments(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function handleApprove(id) {

        const confirmed = window.confirm(
            "Опубликовать этот комментарий?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await approveComment(id);

            setComments(
                currentComments =>
                    currentComments.filter(
                        comment => comment.id !== id
                    )
            );

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Вы действительно хотите удалить этот комментарий?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteComment(id);

            setComments(
                currentComments =>
                    currentComments.filter(
                        comment => comment.id !== id
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
                        Комментарии
                    </h1>

                    <p className="admin-description">
                        Здесь находятся комментарии,
                        ожидающие модерации.
                    </p>

                </div>

                <Link
                    to="/admin"
                    className="btn btn-outline-dark"
                >
                    ← Стихотворения
                </Link>

            </div>

            <div className="admin-divider" />

            {comments.length === 0 ? (

                <div className="admin-empty">

                    <h3>
                        Новых комментариев нет
                    </h3>

                    <p>
                        Все комментарии обработаны.
                    </p>

                </div>

            ) : (

                <div className="admin-comments">

                    {comments.map(comment => (

                        <article
                            key={comment.id}
                            className="admin-comment"
                        >

                            <div className="admin-comment-header">

                                <div>

                                    <h2 className="admin-comment-author">
                                        {comment.authorName}
                                    </h2>

                                    <span className="admin-comment-date">
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString(
                                            "ru-RU",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            }
                                        )}
                                    </span>

                                </div>

                                <span className="admin-comment-status">
                                    На модерации
                                </span>

                            </div>

                            <p className="admin-comment-content">
                                {comment.content}
                            </p>

                            <div className="admin-comment-actions">

                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() =>
                                        handleApprove(
                                            comment.id
                                        )
                                    }
                                >
                                    Одобрить
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                        handleDelete(
                                            comment.id
                                        )
                                    }
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

export default AdminCommentsPage;

