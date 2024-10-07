console.log("hello")
//fetch,load and show
//create Load
const loadcategories = ()=>{
//fetch data
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
// .then((res)=>console.log(res))
.then((res)=>res.json())
.then((data) => displayCat(data.categories))
.catch((error)=>console.log(error))
}
loadcategories()



const loadvideos = (searchtext= "")=>{
    //fetch data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    // .then((res)=>console.log(res))
    .then((res)=>res.json())
    .then((data)=>displayVid(data.videos))
    // .then((data) => displayCat(data.categories))
    .catch((error)=>console.log(error))
    }
    loadvideos()


/*
0
: 
{category_id: '1001', video_id: 'aaaa', thumbnail: 'https://i.ibb.co/L1b6xSq/shape.jpg', title: 'Shape of 


*/
// {category_id: '1001', category: 'Music'}
// category
// : 
// "Music"
// category_id
// : 
// "1001"
// [[Prototype]]
// : 
// Object
//create Display
const displayCat =(cats) =>{
    const catCont = document.getElementById("catgs");
    cats.forEach((item) => {
        console.log(item);
        // Create a Button
        const buttonCont = document.createElement("div");
        buttonCont.innerHTML = `
        <button id ="btn-${item.category_id}" onclick= "loadCatVideos(${item.category_id})" class ='btn category-btn'>
            ${item.category}
        </button>
        
        
        
        `;
        // const button = document.createElement("button");
        // button.classList ='btn';
        // button.innerText = item.category;
        
        catCont.append(buttonCont);
    });
}

// fetch videos from api
const displayVid =(videos) =>{
    const VidCont = document.getElementById("videos");
    VidCont.innerHTML="";
    if(videos.length==0){
        VidCont.classList.remove("grid")
        VidCont.innerHTML= 
        `
        <div class = "min-h-screen flex flex-col gap-5 justify-center items-center">
        <img src = "icon.png">

        </div>
        
        
        `;
        return

    }
    else{
        VidCont.classList.add("grid")

    }
    videos.forEach((item) => {
        console.log(item);
        const card = document.createElement("div")
        card.classList = "card card-compact";
        card.innerHTML =`
        <figure  class= "h-[200px]">
    <img class="h-full w-full object-cover"
      src=${item.thumbnail} />
      ${
        item.others.posted_date.length == 0 ? "":`<span class="absolute right-2 bottom-16 rounded p-1 text-white bg-black text-xs">${getTime(item.others.posted_date)
      } </span>`
    }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
 <div> <img class="w-10 rounded-full object-cover h-10" src = ${item.authors[0].profile_picture} /></div>
 <div>
 <h2 class="font-bold"> ${item.title} </h2>
 <div class="flex items-center gap-2">
 <p> ${item.authors[0].profile_name}       </p>
 ${item.authors[0].verified == true? ` <img class= "w-5" src ="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"> ` : ""}

 </div>

 <p> <button class= "btn"> Details  </button>      <p>
 </div>


    
  </div>
    `
        // Create a Button
      
      
        VidCont.append(card);
    });
}
function getTime(time){
    const hour = parseInt(time/3600);
    remainingSec = time % 3600;
    const min = parseInt(remainingSec/60);
    remainingSec = parseInt(remainingSec % 60);
    return `${hour} h ${min} m ${remainingSec} s ago`

}

const loadCatVideos = (id)=>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    
// .then((res)=>console.log(res))
    .then((res)=>res.json())
    .then((data) => {
        removeclass();
        const activatebtn = document.getElementById(`btn-${id}`);
        activatebtn.classList.add("active");    
        displayVid(data.category);
    });
    // .catch((error)=> console.log(error));

};

const removeclass = () =>{

    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){

       btn.classList.remove("active") 
    }


}

// search function
document.getElementById("search-ip").addEventListener("keyup",(e)=>{
    loadvideos(e.target.value);

});