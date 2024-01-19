
const user = "github"


var total_repo_page

var page_no = 1
fetch(`https://api.github.com/users/${user}`)
.then((data)=>data.json())
.then((data)=>{
    document.getElementsByClassName("pfp")[0].src=`${data.avatar_url}`
    document.getElementsByClassName("name")[0].innerHTML = data.name
    document.getElementsByClassName("bio")[0].innerHTML = data.bio
    document.getElementsByClassName("location")[0].innerHTML = data.location
    if(data.twitter_username){
        document.getElementsByClassName("twitter")[0].href = `https://twitter.com/${data.twitter_username}`
        document.getElementsByClassName("twitter")[0].innerHTML = `Twitter: https://twitter.com/${data.twitter_username}`
    }
    document.getElementsByClassName("link")[0].href = `https://github.com/${user}`
    document.getElementsByClassName("link")[0].innerHTML = `https://github.com/${user}`
})

fetch(`https://api.github.com/users/${user}/repos?per_page=100&page=1`)
.then((data)=>data.json())
.then((data)=>{
    const len = data.length
    total_repo_page = Math.ceil(len/10)
    const pagetab = document.getElementsByClassName("pagetab")[0]
    
    let firstpage = document.createElement("a")
    firstpage.classList.add("page")
    firstpage.innerHTML = "<<"
    pagetab.append(firstpage)
    firstpage.addEventListener("click",()=>{
        if(page_no!=1){
            const lastpage =  document.getElementsByClassName("onpage")[0]
            lastpage.classList.remove("onpage")

            const first = document.getElementsByClassName("page")[1]
            first.classList.add("onpage")    
            page_no = 1
            fetchRepos()
        }
    })
    
    for(let i=0;i<total_repo_page;i++){
        const page = document.createElement("a")
        page.classList.add("page")
        page.innerHTML = i+1
        pagetab.append(page)
        if(i+1===page_no){
            page.classList.add("onpage")
        }
        page.addEventListener("click",()=>{
            const lastpage =  document.getElementsByClassName("onpage")[0]
            lastpage.classList.remove("onpage")

            page_no = page.innerHTML
            page.classList.add("onpage")
            fetchRepos()

        })
    }

    let lastpage = document.createElement("a")
    lastpage.classList.add("page")
    lastpage.innerHTML = ">>"
    pagetab.append(lastpage)
    lastpage.addEventListener("click",()=>{
        if(page_no!=total_repo_page){
            const lastpage =  document.getElementsByClassName("onpage")[0]
            lastpage.classList.remove("onpage")
            
            const last = document.getElementsByClassName("page")[total_repo_page]
            last.classList.add("onpage")
            page_no=total_repo_page
            fetchRepos()
        }
    })
})

fetch(`https://api.github.com/users/${user}/repos?per_page=10&page=1`)
.then((data)=>data.json())
.then((data)=>{
    data.map((repo)=>{
        const repotab = document.createElement("div")
        repotab.classList.add('repotab')

        const name = document.createElement("div")
        name.className = "reponame"
        name.innerHTML = repo.name
        repotab.append(name)
        
        const desc = document.createElement("div")
        desc.className = "repodesc"
        desc.innerHTML = repo.description
        repotab.append(desc)
        if(repo.language){

            const lang = document.createElement("div")
            lang.className = "repolang"
            lang.innerHTML = repo.language
            repotab.append(lang)
        }

        document.getElementsByClassName("repos")[0].append(repotab)
    })
})

const fetchRepos = ()=> {
    fetch(`https://api.github.com/users/${user}/repos?per_page=10&page=${page_no}`)
    .then((data)=>data.json())
    .then((data)=>{
        const a = document.getElementsByClassName("repos")[0]
        a.innerHTML = ' '
        data.map((repo)=>{
            const repotab = document.createElement("div")
            repotab.classList.add('repotab')
            
            const name = document.createElement("div")
            name.className = "reponame"
            name.innerHTML = repo.name
            repotab.append(name)
            
            const desc = document.createElement("div")
            desc.className = "repodesc"
            desc.innerHTML = repo.description
            repotab.append(desc)
            if(repo.language!=null){
                const lang = document.createElement("div")
                lang.className = "repolang"
                lang.innerHTML = repo.language
                repotab.append(lang)
            }

            document.getElementsByClassName("repos")[0].append(repotab)
        })
    })
}


window.onload = function(){
    const next =document.getElementsByClassName("nextbutton")[0]
    next.onclick = ()=>{
        if(page_no<total_repo_page){
            page_no += 1
            fetchRepos() 
        }
    }
    const prev =document.getElementsByClassName("prevbutton")[0]
    prev.onclick = ()=>{
        if(page_no>1){
            page_no -= 1
            fetchRepos() 
        }
    }
}