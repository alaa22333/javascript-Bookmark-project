//variables
const addMarksContainer=document.querySelector(".add-bookmark"),
      closeBtn=document.querySelector(".nav i"),
      form=document.querySelector("form"),
      url=document.querySelector("#url"),
      websiteName=document.querySelector("#title"),
      saveBtn=document.querySelector(".save"),
      bookmarksCont=document.querySelector(".bookmarks"),
      addMarkBtn=document.querySelector(".add-bookmark-btn");
 let  websiteNameValue,urlValue;
 let  allItems=[]


let clearHideClass=(ele)=>{
ele.classList.remove("hide")
}
let addHideClass=(ele)=>{
ele.classList.add("hide")
}

//for form validation
function  formvalidation(urlValue){
  //regex for validate the form
  let expression =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  const regex=new RegExp(expression)
  //check if there is no value
    if(!urlValue || !websiteNameValue){
      alert("Please fill both required fields!!")
      return false
    }
 //check if url is valid
    if  (!urlValue.match(regex)){
      alert("please write right URL !!")
      return false
          }    
 return true
        } 

//add elements to document
function bookMarkElements(urlValue, websiteNameValue) {
    const bookmarkCon = document.createElement("div");
    bookmarkCon.className = "bookmark";
    const cancelEl = document.createElement("i");
    cancelEl.className="fa-solid fa-xmark"
    cancelEl.id="cancelBtn"
    cancelEl.addEventListener("click",clearBookMark)
    const link = document.createElement("a");
    const linkText=document.createTextNode(websiteNameValue)
    link.href = `${urlValue}`;
    const logo = document.createElement("img");
    logo.src=`https://www.google.com/s2/favicons?domain=${urlValue}&sz=256`
    console.log(urlValue);
    link.setAttribute("target","_blank")
    logo.id="logo"
    link.append(logo)
    link.append(linkText)
    bookmarkCon.append(cancelEl)
    bookmarkCon.append(link) 
    bookmarksCont.appendChild(bookmarkCon)
  }
//localstorage and update items
function addInfoToLocalStorage(){
//state of there are data in local storage
  if(localStorage.getItem("data")){
    allItems= JSON.parse( localStorage.getItem("data"))
      //updating data
      allItems.forEach((data,i) => {
      urlValue=`${data.url}`
      websiteNameValue=`${data.name}`
    bookMarkElements(urlValue,websiteNameValue)}
    );
  }
}

//clear bookmarks from window and local storage

function clearBookMark(e){
  let selectedUrl= e.target.parentElement.querySelector("a").href
      allItems=JSON.parse(localStorage.getItem("data"))
    
      //check if url  of slecteditem identical to url in local storage then delete it from local store and ui  
      allItems.map(item=>{ 
        if(`${item.url}/`===selectedUrl||item.url===selectedUrl){
          let i=allItems.indexOf(item)
        if (i > -1) {  
          e.target.parentElement.remove()
          allItems.splice(i,1)
          localStorage.setItem("data",JSON.stringify(allItems))  
        }
      }
  })   
}

//add Events
addInfoToLocalStorage()
addMarkBtn.addEventListener("click",()=>{addMarksContainer.classList.remove("hide")})  
closeBtn.addEventListener("click",()=>{addMarksContainer.classList.add("hide")})
form.addEventListener("submit",(e)=>{
  e.preventDefault()
   websiteNameValue= websiteName.value
   urlValue= url.value
//check if url doesnt contain http....
   if(!urlValue.includes("https://","http://")){
     urlValue =`https://${urlValue}`
  }  
   if(!formvalidation(urlValue,websiteNameValue)){
    return false
   } 
   //formvalidation works=true
  let  StoredData ={
    url:urlValue,
    name:websiteNameValue
  }
  allItems.push(StoredData)
  localStorage.setItem("data",JSON.stringify(allItems))
//add bookmarks
  bookMarkElements(urlValue, websiteNameValue);
  form.reset()
  websiteName.focus()
})
   
        
