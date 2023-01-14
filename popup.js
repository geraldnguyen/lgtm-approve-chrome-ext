const COMMENT_TEXT_STORAGE_KEY = "lgtm-comment-text";
const COMMENT_BTN_LABEL_STORAGE_KEY = "lgtm-comment-btn-label";

function loadFromStorage() {
  const commentText = window.localStorage.getItem(COMMENT_TEXT_STORAGE_KEY) || "LGTM";
  document.getElementById("comment-text").value = commentText;
  
  const commentBtnLabel = window.localStorage.getItem(COMMENT_BTN_LABEL_STORAGE_KEY) || "Look Good to Me!";
  document.getElementById("comment-btn-label").value = commentBtnLabel;
}

function saveToStorage() {
  const commentText = document.getElementById("comment-text").value;
  const commentBtnLabel = document.getElementById("comment-btn-label").value;
  if (!commentText || !commentBtnLabel) {
    alert("Both comment text and comment button's label are required");
    return;
  }

  window.localStorage.setItem(COMMENT_TEXT_STORAGE_KEY, commentText);
  window.localStorage.setItem(COMMENT_BTN_LABEL_STORAGE_KEY, commentBtnLabel);
}

document.getElementById("reset-btn").addEventListener('click', loadFromStorage);
document.getElementById("save-btn").addEventListener('click', saveToStorage);

loadFromStorage();