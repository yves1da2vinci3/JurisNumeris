const btnPrint = document.querySelector(".btn--login");


btnPrint.addEventListener('click',()=>{
    btnPrint.style.display = "none"
    window.print();
    setInterval(()=>{
        window.close();
    },6000)
    
})