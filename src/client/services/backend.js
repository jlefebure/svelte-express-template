/**
 * Get hello world
 */
export function getHelloWorld() {
    return fetch(`%SVELTE_EXTERNAL_URL%%SVELTE_API_BASE_URL%/hello`, {
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
}