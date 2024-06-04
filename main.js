const commentsContainer = document.querySelector(".comments-container");
const commentInp = document.getElementById("commentInp");
const submitBtn = document.getElementById("submitBtn");

const createCommentBox = (commentValue, id, level = 0) => {
    let commentBox = document.createElement('li');
    commentBox.setAttribute("id", id);
    commentBox.setAttribute("class", "comment-box");
    commentBox.setAttribute("style", `margin-top:1rem; margin-left: ${3 * level}rem`);
    commentBox.setAttribute('level', level);
    commentBox.innerHTML = `
                            <div class="commentValueBox">
                                <input value="${commentValue}" id="commentInp${id}" disabled></input>
                                <div class="commentValueActions">
                                    <button onclick="handleSave(${id})">Save Changes</button>
                                </div>
                            </div>
                            <div class="comment-actions">
                                <button onclick="handleReplyBtnClick(${id})">Reply</button>
                                <button onclick="editHandler(${id})">Edit</button>
                                <button onclick="deleteComment(${id})">Delete</button>
                            </div>
                            <div class="reply-box" id="replyBox${id}">
                                <input type="text" id="replyInp${id}" placeholder="Reply to the comment" >
                                <div class="reply-btns">
                                    <button onclick="handleReply(${id})">Reply</button>
                                    <button onclick="handleReplyCancelBtnClick(${id})">Cancel</button>
                                </div>
                            </div>
                        `;
    return commentBox;
}

// Add a comment to the top level.
const submitHandler = (e) => {
    e.preventDefault();
    const commentValue = commentInp.value;
    if (!commentValue || commentValue.length === 0) return;

    commentsContainer.appendChild(createCommentBox(commentValue, Date.now()));
    commentInp.value = "";
}

submitBtn.addEventListener("click", submitHandler);


// Function to show reply box.
const handleReplyBtnClick = (id) => {
    const replyBox = document.getElementById(`replyBox${id}`);
    replyBox.classList.add("active-reply-box");
}

// Function to hide reply box.
const handleReplyCancelBtnClick = (id) => {
    let replyInp = document.getElementById(`replyInp${id}`);
    replyInp.value = "";
    const replyBox = document.getElementById(`replyBox${id}`);
    replyBox.classList.remove("active-reply-box");
}

// Reply handler
const handleReply = (id) => {
    let replyInp = document.getElementById(`replyInp${id}`); // reply input box
    const mainComment = document.getElementById(id); // Parent node whose reply btn is clicked
    const currLevel = parseInt(mainComment.getAttribute("level")); // Parent node's level

    let ul;
    Array.from(mainComment.childNodes).forEach((node) => {
        if (node.nodeName === "UL") {
            ul = node;
            return;
        }
    })

    if (!ul) {
        ul = document.createElement('ul');
    }

    let uid = Date.now();
    let commentBox = createCommentBox(replyInp?.value, uid, currLevel + 1);
    ul.appendChild(commentBox);
    mainComment.appendChild(ul);
    handleReplyCancelBtnClick(id);
}

// Edit handler
const editHandler = (id) => {
    const mainComment = document.getElementById(id);
    mainComment.childNodes[1].childNodes[3].style.display = "flex";
    const inputElem = mainComment.childNodes[1].childNodes[1];
    inputElem.removeAttribute("disabled");
    inputElem.focus();
}

// Handle save changes
const handleSave = (id) => {
    const commentInp = document.getElementById(`commentInp${id}`);
    if (commentInp.value.length === 0) {
        alert("Comment value cannot be empty.")
        return;
    }

    commentInp.setAttribute("disabled", true);
    const mainComment = document.getElementById(id);
    mainComment.childNodes[1].childNodes[3].style.display = "none";
}

// Delete the comment
const deleteComment = (id) => {
    document.getElementById(id).remove();
}