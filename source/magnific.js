import './addons/jquery.magnific-popup';

export const showMagnificGallery=(item,data)=>{
    $.extend(true, $.magnificPopup.defaults, {
        gallery: {
           tCounter: '%curr%/%total%' // Markup for "1 of 7" counter
        }
     });
     item.magnificPopup({...data});
}