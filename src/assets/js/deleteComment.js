import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) -1;
    //commentNumber가 들어있는 게 String이라서 parseInt로 숫자로 바꿔줌
  }

const deleteComment = async (id, aTag) => {
    // response = 4.
    const response = await axios({ // 1. 클라이언트 요청보냄
        url: `/api/${id}/comment/delete`,
        method: 'POST',
        data: {
            commentId: id
        }
    });
    if(response.status === 200){
        const commentLi = aTag.parentElement.parentElement;
        console.log(commentLi);
        commentLi.remove();
    }
    decreaseNumber();
//     //위에랑 아래랑 똑같은코드
//     // axios({ // 1. 클라이언트 요청보냄
//     //     url: `/api/${id}/comment/delete`,
//     //     method: 'POST',
//     //     data: {
//     //         commentId: id
//     //     }
//     // }).then(response => { // 4
//     //     if(response.status === 200){
//     //         console.log('deleted!a');
//     //         delete aTag.parentElement.parentElement;
//     //     }
//     // });
   
}
const handleDelete = event => {
    event.preventDefault();
    const id = event.target.dataset.commentId;
    const deleteButton = event.target;
    if(deleteButton.nodeName !== 'A') return;
    console.log(deleteButton)
    deleteComment(id, deleteButton);
};

function init() {
    commentList.addEventListener("click", handleDelete);
}

if (addCommentForm) {
    init();
}