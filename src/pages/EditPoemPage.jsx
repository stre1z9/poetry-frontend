import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSlug } from "../utils/slug.js";

import {
    createPoem,
    getPoemById,
    updatePoem,
    getTags,
    createTag
} from "../services/poemService";

function EditPoemPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEdit = id !== undefined;

    const [loading, setLoading] = useState(isEdit);
    const [tags, setTags] = useState([]);

    const [newTagName, setNewTagName] = useState("");
    const [tagError, setTagError] = useState("");
    const [creatingTag, setCreatingTag] = useState(false);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        published: false,
        tags: []
    });

    useEffect(() => {

        async function loadData() {

            try {

                const availableTags = await getTags();

                setTags(availableTags);

                if (isEdit) {

                    const poem = await getPoemById(id);

                    setForm({
                        title: poem.title,
                        slug: poem.slug,
                        description: poem.description || "",
                        content: poem.content,
                        published: poem.published,
                        tags: poem.tags
                            ? poem.tags.map(tag => tag.slug)
                            : []
                    });

                }

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, [id, isEdit]);

    function handleChange(event) {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

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

    function handleTagChange(slug) {

        setForm(previous => {

            const selected = previous.tags.includes(slug);

            return {

                ...previous,

                tags: selected
                    ? previous.tags.filter(tag => tag !== slug)
                    : [...previous.tags, slug]

            };

        });

    }

    function handleNewTagChange(event) {

        setNewTagName(event.target.value);

        if (tagError) {

            setTagError("");

        }

    }

    async function handleCreateTag() {

        const name = newTagName.trim();

        if (!name) {

            setTagError("Введите название тега.");

            return;

        }

        const existingTag = tags.find(
            tag => tag.name.toLowerCase() === name.toLowerCase()
        );

        if (existingTag) {

            setTagError("Такой тег уже существует.");

            return;

        }

        setCreatingTag(true);
        setTagError("");

        try {

            const slug = createSlug(name);

            const createdTag = await createTag({
                name,
                slug
            });

            setTags(previous => [
                ...previous,
                createdTag
            ]);

            setForm(previous => ({
                ...previous,
                tags: [
                    ...previous.tags,
                    createdTag.slug
                ]
            }));

            setNewTagName("");

        } catch (error) {

            console.error(error);

            setTagError(
                "Не удалось создать тег."
            );

        } finally {

            setCreatingTag(false);

        }

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
                            className="form-label"
                        >
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
                            className="form-label"
                        >
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
                            className="form-label"
                        >
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
                            className="form-label"
                        >
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

                    <div className="mb-4">

                        <label className="form-label">
                            Теги
                        </label>

                        {tags.length === 0 ? (

                            <p className="text-muted">
                                Тегов пока нет.
                            </p>

                        ) : (

                            <div className="d-flex flex-column gap-2 mb-3">

                                {tags.map(tag => (

                                    <div
                                        key={tag.id}
                                        className="form-check"
                                    >

                                        <input
                                            id={`tag-${tag.id}`}
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={form.tags.includes(tag.slug)}
                                            onChange={() =>
                                                handleTagChange(tag.slug)
                                            }
                                        />

                                        <label
                                            htmlFor={`tag-${tag.id}`}
                                            className="form-check-label"
                                        >
                                            {tag.name}
                                        </label>

                                    </div>

                                ))}

                            </div>

                        )}

                        <div className="mt-3">

                            <label
                                htmlFor="newTag"
                                className="form-label"
                            >
                                Создать новый тег
                            </label>

                            <div className="d-flex gap-2">

                                <input
                                    id="newTag"
                                    type="text"
                                    className="form-control"
                                    value={newTagName}
                                    onChange={handleNewTagChange}
                                    placeholder="Например: Любовь"
                                    disabled={creatingTag}
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-dark"
                                    onClick={handleCreateTag}
                                    disabled={creatingTag}
                                >
                                    {creatingTag
                                        ? "Создание..."
                                        : "Создать"}
                                </button>

                            </div>

                            {tagError && (

                                <div className="text-danger mt-2">
                                    {tagError}
                                </div>

                            )}

                        </div>

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
                            className="form-check-label"
                        >
                            Опубликовать сразу
                        </label>

                    </div>

                    <div className="d-flex justify-content-end gap-3">

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            Отмена
                        </button>

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >
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

