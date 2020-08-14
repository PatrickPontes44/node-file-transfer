const fileInput = document.querySelector("#upload-input-file");
const fileName = document.querySelector("#file-name");
const uploadBtn = document.querySelector("#upload-btn");
const uploadPopup = document.querySelector(".upload-popup");

fileInput.addEventListener("change", () => {
    fileName.innerText = fileInput.value; 
})

uploadBtn.addEventListener("click", ()=>{
    uploadPopup.classList.toggle("active")
})
