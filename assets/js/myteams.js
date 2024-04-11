

function saveInfo() {

    let logininfo = localStorage.getItem('logininfo')
    let logins = JSON.parse(logininfo) || []
    for (let i = 0; i < logins.length; i++) {

       /*  const div = document.createElement('div')
        div.classList.add('boxes')
        let html = `
    <h2>${blogs[i].username} </h2>
    <p>${blogs[i].title}</p>
    <p>${blogs[i].content}</p>
`

        div.innerHTML = html
        main.appendChild(div) */
    }

}


saveInfo()
