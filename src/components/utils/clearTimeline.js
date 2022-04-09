
export const clearTimeline = ()=>{
    var allItems  = document.getElementsByClassName('Timelineblocks__cells')
    for(let i =0; i<allItems.length; i++){
      if(allItems[i].classList.contains('active'))
         {
        allItems[i].classList.remove('active')
         }
    }
  }