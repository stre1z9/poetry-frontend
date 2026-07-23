import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createPoem,
    getPoemById,
    updatePoem
} from "../services/poemService";

function EditPoemPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = id !== undefined;

    const [loading, setLoading] = useState(isEdit);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false
    });

    useEffect(() => {

        if (!isEdit) {
            return;
        }

        loadPoem();

    }, []);

    async function loadPoem() {

        try {

            const poem = await getPoemById(id);

            setForm({
                title: poem.title,
                slug: poem.slug,
                description: poem.description,
                content: poem.content,
                published: poem.published
            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }
    function createSlug(text) {

        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

    }
    function handleChange(event) {

        const { name, value, type, checked } = event.target;

        setForm(previous => {

            const updated = {

                ...previous,

                [name]: type === "checkbox"
                    ? checked
                    : value

            };

            if (name === "title") {

                updated.slug = createSlug(value);

            }

            return updated;

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            if (isEdit) {

                await updatePoem(id, form);

            } else {

                await createPoem(form);

            }

            navigate("/admin");

        } catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return <h2>Загрузка...</h2>;

    }

    return (

        <div className="container py-5">

            <div className="editor">

                <h1 className="editor-title">

                    {isEdit
                        ? "Редактирование стихотворения"
                        : "Новое стихотворение"}

                </h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label
                            htmlFor="title"
                            className="form-label">

                            Название

                        </label>

                        <input
                            id="title"
                            type="text"
                            name="title"
                            className="form-control"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Например: Осень"
                        />

                    </div>

                    <div className="mb-4">

                        <label
                            htmlFor="slug"
                            className="form-label">

                            Slug

                        </label>

                        <input
                            id="slug"
                            type="text"
                            name="slug"
                            className="form-control"
                            value={form.slug}
                            onChange={handleChange}
                            placeholder="osen"
                        />

                        <div className="form-text">

                            Используется в адресе страницы.

                        </div>

                    </div>

                    <div className="mb-4">

                        <label
                            htmlFor="description"
                            className="form-label">

                            Краткое описание

                        </label>

                        <textarea
                            id="description"
                            rows="3"
                            name="description"
                            className="form-control"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Несколько слов о стихотворении..."
                        />

                    </div>

                    <div className="mb-4">

                        <label
                            htmlFor="content"
                            className="form-label">

                            Текст стихотворения

                        </label>

                        <textarea
                            id="content"
                            rows="18"
                            name="content"
                            className="form-control"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Введите текст стихотворения..."
                        />

                    </div>

                    <div className="form-check mb-5">

                        <input
                            id="published"
                            type="checkbox"
                            name="published"
                            className="form-check-input"
                            checked={form.published}
                            onChange={handleChange}
                        />

                        <label
                            htmlFor="published"
                            className="form-check-label">

                            Опубликовать сразу

                        </label>

                    </div>

                    <div className="d-flex justify-content-end gap-3">

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/admin")}>

                            Отмена

                        </button>

                        <button
                            type="submit"
                            className="btn btn-dark">

                            {isEdit
                                ? "Сохранить изменения"
                                : "Создать стихотворение"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditPoemPage;