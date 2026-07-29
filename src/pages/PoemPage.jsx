
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    getPoem,
    getComments,
    createComment
} from "../services/poemService";

function PoemPage() {

    const { slug } = useParams();

    const [poem, setPoem] = useState(null);
    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [authorName, setAuthorName] = useState("");
    const [content, setContent] = useState("");

    const [sending, setSending] = useState(false);
    const [commentError, setCommentError] = useState("");
    const [commentSuccess, setCommentSuccess] = useState(false);

    useEffect(() => {

        async function loadData() {

            try {

                const [poemData, commentsData] = await Promise.all([
                    getPoem(slug),
                    getComments(slug)
                ]);

                setPoem(poemData);
                setComments(commentsData);

            } catch (error) {

                console.error(error);

                setError(true);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, [slug]);

    async function handleCommentSubmit(event) {

        event.preventDefault();

        setCommentError("");
        setCommentSuccess(false);

        if (!authorName.trim() || !content.trim()) {

            setCommentError(
                "Заполните имя и текст комментария."
            );

            return;

        }

        try {

            setSending(true);

            await createComment(slug, {
                authorName: authorName.trim(),
                content: content.trim()
            });

            setAuthorName("");
            setContent("");

            setCommentSuccess(true);

        } catch (error) {

            console.error(error);

            setCommentError(
                "Не удалось отправить комментарий."
            );

        } finally {

            setSending(false);

        }

    }

    if (loading) {

        return <h3>Загрузка...</h3>;

    }

    if (error || !poem) {

        return (

            <div className="poem-not-found">

                <h1>404</h1>

                <p>
                    Стихотворение не найдено.
                </p>

            </div>

        );

    }

    return (

        <article className="poem">

            <Link
                to="/poems"
                className="back"
            >
                ← Назад
            </Link>

            <h1 className="poem-title">
                {poem.title}
            </h1>

            {poem.description && (

                <p className="poem-description">
                    {poem.description}
                </p>

            )}

            {poem.createdAt && (

                <p className="poem-date">
                    {new Date(
                        poem.createdAt
                    ).toLocaleDateString("ru-RU")}
                </p>

            )}

            {poem.tags && poem.tags.length > 0 && (

                <div className="poem-tags">

                    {poem.tags.map(tag => (

                        <Link
                            key={tag.id}
                            to={`/tag/${tag.slug}`}
                            className="poem-tag"
                        >
                            #{tag.name}
                        </Link>

                    ))}

                </div>

            )}

            <div className="poem-content">

                {poem.content}

            </div>

            <section className="comments">

                <h2 className="comments-title">
                    Комментарии
                </h2>

                {comments.length === 0 ? (

                    <p className="text-muted">
                        Пока нет комментариев.
                    </p>

                ) : (

                    <div className="comments-list">

                        {comments.map(comment => (

                            <article
                                key={comment.id}
                                className="comment"
                            >

                                <div className="comment-header">

                                    <strong>
                                        {comment.authorName}
                                    </strong>

                                    <span className="comment-date">
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString("ru-RU")}
                                    </span>

                                </div>

                                <p className="comment-content">
                                    {comment.content}
                                </p>

                            </article>

                        ))}

                    </div>

                )}

                <div className="comment-form">

                    <h3 className="comment-form-title">
                        Оставить комментарий
                    </h3>

                    <form onSubmit={handleCommentSubmit}>

                        <div className="mb-3">

                            <label
                                htmlFor="authorName"
                                className="form-label"
                            >
                                Имя
                            </label>

                            <input
                                id="authorName"
                                type="text"
                                className="form-control"
                                value={authorName}
                                onChange={event =>
                                    setAuthorName(event.target.value)
                                }
                                maxLength="100"
                                placeholder="Ваше имя"
                                disabled={sending}
                            />

                        </div>

                        <div className="mb-3">

                            <label
                                htmlFor="commentContent"
                                className="form-label"
                            >
                                Комментарий
                            </label>

                            <textarea
                                id="commentContent"
                                className="form-control"
                                rows="5"
                                value={content}
                                onChange={event =>
                                    setContent(event.target.value)
                                }
                                maxLength="5000"
                                placeholder="Напишите что-нибудь..."
                                disabled={sending}
                            />

                        </div>

                        {commentError && (

                            <div className="alert alert-danger">
                                {commentError}
                            </div>

                        )}

                        {commentSuccess && (

                            <div className="alert alert-success">
                                Комментарий отправлен на модерацию.
                            </div>

                        )}

                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={sending}
                        >
                            {sending
                                ? "Отправка..."
                                : "Отправить комментарий"}
                        </button>

                    </form>

                </div>

            </section>

        </article>

    );

}

export default PoemPage;

