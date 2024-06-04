const commentsContainer = document.querySelector(".comments-container");
const commentInp = document.getElementById("commentInp");
const submitBtn = document.getElementById("submitBtn");

let comments = [

]

const createChild = (elements, level) => {
    if (!elements || elements.length === 0) return null;

    const div = document.createElement("div");

    elements?.forEach((element) => {
        if (!element.childs || element.childs.length == 0) {
            let commentBox = document.createElement('div');
            commentBox.setAttribute("id", element.id);
            commentBox.setAttribute("class", "comment-box")
            commentBox.setAttribute("style", `margin-left: ${3 * level}rem; margin-top:2rem`)
            commentBox.innerHTML = `
            <p>${element?.comment}</p>
            <div class="comment-actions">
            <button onclick="handleReplyBtnClick(${element?.id})">Reply</button>
            <button>Edit</button>
            <button onclick="deleteComment(${element?.id})">Delete</button>
            </div>
            <div class="reply-box" id="replyBox${element?.id}">
            <input type="text" id="replyInp${element?.id}" placeholder="Reply to the comment" >
            <div class="reply-btns">
                <button onclick="handleReply(${element?.id})">Reply</button>
                <button onclick="handleReplyCancelBtnClick(${element?.id})">Cancel</button>
            </div>
        </div>
                                `;
            div.appendChild(commentBox);
        }
        else {
            let commentBox = document.createElement('div');
            commentBox.setAttribute("id", element.id);
            commentBox.setAttribute("class", "comment-box")
            commentBox.setAttribute("style", `margin-left: ${3 * level}rem; margin-top:2rem`)
            commentBox.innerHTML = `
            <p>${element?.comment}</p>
            <div class="comment-actions">
            <button onclick="handleReplyBtnClick(${element?.id})">Reply</button>
            <button>Edit</button>
            <button onclick="deleteComment(${element?.id})">Delete</button>
            </div>
            <div class="reply-box" id="replyBox${element?.id}">
            <input type="text" id="replyInp${element?.id}" placeholder="Reply to the comment" >
            <div class="reply-btns">
                <button onclick="handleReply(${element?.id})">Reply</button>
                <button onclick="handleReplyCancelBtnClick(${element?.id})">Cancel</button>
            </div>
        </div>
                            `;
            commentBox.appendChild(createChild(element.childs, level + 1));
            div.appendChild(commentBox);

        }
    })

    return div;
}

// Populate all the comments
const displayComments = () => {
    commentsContainer.innerHTML = "";

    comments.map((comment) => {
        let commentBox = document.createElement('li');
        commentBox.setAttribute("id", comment?.id);
        commentBox.setAttribute("class", "comment-box")
        commentBox.innerHTML = `
                                <p>${comment?.comment}</p>
                                <div class="comment-actions">
                                <button onclick="handleReplyBtnClick(${comment?.id})">Reply</button>
                                <button>Edit</button>
                                <button onclick="deleteComment(${comment?.id})">Delete</button>
                                </div>
                                <div class="reply-box" id="replyBox${comment?.id}">
                                    <input type="text" id="replyInp${comment?.id}" placeholder="Reply to the comment" >
                                    <div class="reply-btns">
                                        <button onclick="handleReply(${comment?.id})">Reply</button>
                                        <button onclick="handleReplyCancelBtnClick(${comment?.id})">Cancel</button>
                                    </div>
                                </div>
                            `;

        const child = createChild(comment?.childs, 1);
        if (child)
            commentBox.appendChild(child);
        commentsContainer.appendChild(commentBox);
    })
}

displayComments();

// Add a comment to the top level.
const submitHandler = (e) => {
    e.preventDefault();
    const comment = commentInp.value;
    if (!comment || comment.length === 0) return;

    comments.push({
        id: Date.now(),
        comment,
        childs: []
    })

    commentInp.value = "";
    displayComments();
}

submitBtn.addEventListener("click", submitHandler);


// Delete a comment
const deleteComment = (id) => {

    comments = comments.filter((comment) => {
        console.log(comment.id, id);
        return comment.id !== id
    });
    displayComments();
}


const handleReplyBtnClick = (id) => {
    const replyBox = document.getElementById(`replyBox${id}`);
    replyBox.classList.add("active-reply-box");
}

const handleReplyCancelBtnClick = (id) => {
    const replyBox = document.getElementById(`replyBox${id}`);
    replyBox.classList.remove("active-reply-box");
}

// Reply handler
const handleReply = (id) => {
    const replyInp = document.getElementById(`replyInp${id}`);
    console.log("Clicked");
    if (replyInp?.value.length === 0) return;

    comments.forEach((comment) => {
        if (comment?.id === id) {
            comment.childs.push({
                id: Date.now(),
                comment: replyInp?.value,
                childs: []
            })
        }
    })

    console.log(comments);


    displayComments()
}