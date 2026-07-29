import { useState } from "react";

import { createComment } from "../services/poemService";

function CommentForm({ slug, onCommentCreated }) {

const [authorName, setAuthorName] = useState("");
const [content, setContent] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

async function handleSubmit(event) {

    event.preventDefault();

    setError("");
    setSuccess(false);

    setLoading(true);

    try {

        await createComment(slug, {
            authorName,
            content
        });

        setAuthorName("");
        setContent("");

        setSuccess(true);

        if (onCommentCreated) {
            onCommentCreated();
        }

    } catch (error) {

        console.error(error);

        setError(
            "Не удалось отправить комментарий. Попробуйте ещё раз."
        );

    } finally {

        setLoading(false);

    }

}

    return (

        <div className="comment-form">

            <h2 className="section-title">
                Оставить комментарий
            </h2>

            <form onSubmit={handleSubmit}>

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
                        required
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
                        required
                    />

                </div>

                {error && (

                    <div className="text-danger mb-3">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="text-success mb-3">
                        Комментарий отправлен и ожидает модерации.
                    </div>

                )}

                <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={loading}
                >
                    {loading
                        ? "Отправка..."
                        : "Отправить комментарий"}
                </button>

            </form>

        </div>

    );

}

export default CommentForm;
