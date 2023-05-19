const arrow = document.getElementById("arrow")
const listContainer = document.getElementById("list-container")
const inputBox = document.getElementById("input-box")

arrow.addEventListener("click", () => {
    if (inputBox.value === '') {
        alert("You must write something!")
    } else {
        spaceBlock()

        const li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li)
        li.classList.add("check")
        const span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)

        span.addEventListener("click", () => {
            span.parentElement.remove()
        })

        li.addEventListener('click', function () {
            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked')
                this.style.textDecoration = "none"
            } else {
                this.classList.add('clicked')
                this.style.textDecoration = "line-through"
            }
        })
    }

    inputBox.value = ""
})

function spaceBlock() {
    if (inputBox.selectionStart === 0 && window.event.code === "Space") {
        window.event.preventDefault()
    }
}
 


