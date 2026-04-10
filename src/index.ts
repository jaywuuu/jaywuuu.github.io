interface Post {
    id: string;
    title: string;
    content: string;
    date: string;
}

declare const marked: any;

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('posts.json');
    return await response.json();
}

function renderPostList(posts: Post[]) {
    const container = document.getElementById('content');
    if (!container) return;

    container.innerHTML = `
        <h1 class="display-4 text-center my-5">Blog Posts</h1>
        <div class="list-group">
            ${posts.map(post => `
                <a href="#/post/${post.id}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${post.title}</h5>
                        <small>${new Date(post.date).toLocaleDateString()}</small>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}

function renderPost(post: Post) {
    const container = document.getElementById('content');
    if (!container) return;

    const htmlContent = marked.parse(post.content);
    container.innerHTML = `
        <div class="mt-5">
            <a href="#/" class="btn btn-outline-secondary mb-4">← Back to Posts</a>
            <div class="blog-post">
                <small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
                <div class="mt-3">
                    ${htmlContent}
                </div>
            </div>
        </div>
    `;
}

async function handleRouting() {
    const posts = await fetchPosts();
    const hash = window.location.hash;

    if (hash.startsWith('#/post/')) {
        const postId = hash.replace('#/post/', '');
        const post = posts.find(p => p.id === postId);
        if (post) {
            renderPost(post);
        } else {
            window.location.hash = '#/';
        }
    } else {
        renderPostList(posts);
    }
}

window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);
