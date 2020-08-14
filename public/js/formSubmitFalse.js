
function goToFolder(ev){
    const cmdBox = document.querySelector("#command-box");
    const enterBtn = document.querySelector("#enter");
    
    if(ev.target.getAttribute("data-type") == "folder"){
        cmdBox.value = ev.target.name;
        enterBtn.click();
        return
    }
    else{
        window.open(`${window.location.href}download/${ev.target.getAttribute("data-path")}`, '_blank');
    }
}