

export const rewriteTraksFromSave = (trackMemory)=>{



     let counts = {}
     for(let el in trackMemory){
        if(!counts[el.split('/')[0]] && counts[el.split('/')[0]]!==1 ){
            counts[el.split('/')[0]]=1
    
        }else{
            counts[el.split('/')[0]]+=1
        }
    }
    const countSubTracks = document.getElementsByClassName('subTrack').length;
    for( let i = 0; i<countSubTracks; i++){
        let currentNode =  document.getElementsByClassName('subTrack')[0];
        currentNode.parentElement.removeChild(currentNode)
        debugger
    }
    
    for( let i = 0; i<document.getElementsByClassName('track').length; i++){
        let countsTrack = counts[document.getElementsByClassName('track')[i].childNodes[0].textContent]
        console.log(countsTrack)
          for(let j=0; j<countsTrack; j++){
            let subTrack = document.createElement('div');
                subTrack.className='subTrack'
            document.getElementsByClassName('track')[i].appendChild(subTrack)
          }
      }

}