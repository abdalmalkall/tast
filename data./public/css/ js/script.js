document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            alert("Post uploaded successfully!");
            loadPosts();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

async function loadPosts() {
    try {
        const response = await fetch("/api/auth/posts");
        const posts = await response.json();
        const postsDiv = document.getElementById("posts");

        postsDiv.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `
                <p><strong>Email:</strong> ${post.email}</p>
                <p>${post.text}</p>
                ${post.image ? `<img src="${post.image}" width="200">` : ""}
                <hr>
            `;
            postsDiv.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

loadPosts();
