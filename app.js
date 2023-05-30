const arrow = document.getElementById("arrow")
const listContainer = document.getElementById("list-container")
const inputBox = document.getElementById("input-box")

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

addList()

arrow.addEventListener("click", (e) => {
    if (inputBox.value === '') {
        alert("You must write something!")
    } else {
        spaceBlock();
        let inputBoxValue = inputBox.value
        saveTasks({ value: inputBoxValue, checked: false })
        refreshList() // Clear the existing task list and add tasks again
    }

    inputBox.value = ""
});

function refreshList() {
    // Clear the existing task list
    listContainer.innerHTML = ''
    // Add tasks to the list
    addList()
}

function addList() {
    tasks.forEach(item => {

        const li = document.createElement("li")
        li.innerHTML = item.value
        listContainer.appendChild(li)
        li.classList.add("check")

        const span = document.createElement("span")
        span.innerHTML = "\u00d7"
        li.appendChild(span)

        span.addEventListener("click", () => {
            const index = tasks.indexOf(item)
            span.parentElement.remove()
            removeTask(index)
        });

        if (item.checked) {
            li.style.textDecoration = "line-through"
            li.classList.add('clicked')
        }

        li.addEventListener('click', function () {
            if (this.classList.contains('clicked')) {
                this.classList.remove('clicked')
                this.style.textDecoration = "none"
                item.checked = false
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {
                this.classList.add('clicked')
                this.style.textDecoration = "line-through"
                item.checked = true
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        })
    });
}

function removeTask(index) {
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function spaceBlock() {
    if (inputBox.selectionStart === 0 && window.event.code === "Space") {
        window.event.preventDefault()
    }
}

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        arrow.click()
    }
})

function saveTasks(todo) {
    tasks.push(todo)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
