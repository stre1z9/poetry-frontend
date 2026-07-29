import { useEffect, useState } from "react";

import { getComments } from "../services/poemService";

function CommentList({ slug, refreshKey = 0 }) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        async function loadComments() {

            setLoading(true);
            setError(false);

            try {

                const data = await getComments(slug);

                setComments(data);

            } catch (error) {

                console.error(error);

                setError(true);

            } finally {

                setLoading(false);

            }

        }

        loadComments();

    }, [slug, refreshKey]);

    if (loading) {

        return (
            <div className="comment-list">
                <p className="text-muted">
                    Загрузка комментариев...
                </p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="comment-list">
                <p className="text-danger">
                    Не удалось загрузить комментарии.
                </p>
            </div>
        );

    }

    return (

        <div className="comment-list">

            <h2 className="section-title">
                Комментарии
            </h2>

            {comments.length === 0 ? (

                <p className="text-muted">
                    Пока нет комментариев.
                </p>

            ) : (

                <div className="d-flex flex-column gap-4">

                    {comments.map(comment => (

                        <article
                            key={comment.id}
                            className="comment"
                        >

                            <div className="d-flex justify-content-between align-items-baseline mb-2">

                                <strong>
                                    {comment.authorName}
                                </strong>

                                <time
                                    dateTime={comment.createdAt}
                                    className="text-muted small"
                                >
                                    {new Date(
                                        comment.createdAt
                                    ).toLocaleDateString("ru-RU")}
                                </time>

                            </div>

                            <p className="mb-0">
                                {comment.content}
                            </p>

                        </article>

                    ))}

                </div>

            )}

        </div>

    );


}

export default CommentList;
