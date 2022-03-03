// initialisation des valeurs
const ToggleBtn = document.querySelector('.navbar__hidden');
const navbarSecond = document.querySelector('.navbar__second');
const navbarItems = document.querySelector('.navbar__container__links')
const NavbarBtn = document.querySelector('.navbar__container__btn');
const openNav = document.querySelector('#openNav');
const closeNav = document.querySelector('#closeNav');
closeNav.style.display="none";
ToggleBtn.addEventListener("click",() => {
    if(navbarSecond.style.display === "none"   ){
      navbarItems.style.display = "flex";
      navbarSecond.style.display ='flex';
      NavbarBtn.style.display="flex";
      openNav.style.display="none";
      closeNav.style.display="block";
    }else{
      navbarItems.style.display = "none";
      navbarSecond.style.display ='none';
      NavbarBtn.style.display="none";
      closeNav.style.display="none";
      openNav.style.display="block"; 
    }
})
