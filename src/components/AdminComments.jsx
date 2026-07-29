import { useEffect, useState } from "react";

import {
    getAdminComments,
    approveComment,
    deleteComment
} from "../../services/poemService";

function AdminComments() {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function loadComments() {

        try {

            setLoading(true);

            const data = await getAdminComments();

            setComments(data);

        } catch (error) {

            console.error(error);

            setError(true);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadComments();

    }, []);

    async function handleApprove(id) {

        try {

            const updatedComment = await approveComment(id);

            setComments(previous =>
                previous.map(comment =>
                    comment.id === id
                        ? updatedComment
                        : comment
                )
            );

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDelete(id) {

        try {

            await deleteComment(id);

            setComments(previous =>
                previous.filter(comment => comment.id !== id)
            );

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return <p>Загрузка комментариев...</p>;

    }

    if (error) {

        return (
            <p className="text-danger">
                Не удалось загрузить комментарии.
            </p>
        );

    }

    return (

        <section className="admin-comments">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="mb-0">
                    Комментарии
                </h2>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={loadComments}
                >
                    Обновить
                </button>

            </div>

            {comments.length === 0 ? (

                <p className="text-muted">
                    Комментариев пока нет.
                </p>

            ) : (

                <div className="admin-comments-list">

                    {comments.map(comment => (

                        <article
                            key={comment.id}
                            className="admin-comment"
                        >

                            <div className="admin-comment-header">

                                <div>

                                    <strong>
                                        {comment.authorName}
                                    </strong>

                                    <span className="text-muted ms-3">
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString("ru-RU")}
                                    </span>

                                </div>

                                <span
                                    className={
                                        comment.approved
                                            ? "text-success"
                                            : "text-warning"
                                    }
                                >
                                    {comment.approved
                                        ? "Опубликован"
                                        : "На модерации"}
                                </span>

                            </div>

                            <p className="admin-comment-content">
                                {comment.content}
                            </p>

                            <div className="d-flex gap-2">

                                {!comment.approved && (

                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={() =>
                                            handleApprove(comment.id)
                                        }
                                    >
                                        Одобрить
                                    </button>

                                )}

                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                        handleDelete(comment.id)
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

export default AdminComments;

