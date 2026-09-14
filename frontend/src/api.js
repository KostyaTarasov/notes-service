async function request(path, options = {}) {
    const response = await fetch(`/api${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        ...options,
    })

    if (response.status === 204) {
        return null
    }

    const body = await response.json()

    if (!response.ok) {
        const error = new Error(body.message ?? 'Не удалось выполнить запрос')
        error.errors = body.errors
        throw error
    }

    return body.data
}

export const fetchNotes = () => request('/notes')

export const createNote = (note) => request('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
})

export const updateNote = (id, note) => request(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
})

export const deleteNote = (id) => request(`/notes/${id}`, { method: 'DELETE' })
