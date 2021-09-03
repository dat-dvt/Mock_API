var courseApi = 'http://localhost:3000/courses';


function start() {
    getCourses(renderCourses);

    handleCreateForm();
}


start();



//Functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function createCourses(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                courseItem.remove();
                
            }
        })
}



function updateCourses(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(callback)
}

function handlePatchCourse(id) {
    var name = document.querySelector('input[name="name"]');
    var description = document.querySelector('input[name="description"]');
    var courseItem = document.querySelector('.course-item-' + id);
    var getName = courseItem.querySelector('h4').innerText;
    var getDescription = courseItem.querySelector('p').innerText;

    description.value = getDescription;
    name.value = getName;

    var updateArea = document.getElementById('update');
    updateArea.innerHTML = `<button id="update-btn">Lưu</button>`
    var updateBtn = document.getElementById('update-btn')

    updateBtn.onclick = function() {
        var newName = name.value;
        var newDescription = description.value;

        var formData = {
            name: newName,
            description: newDescription
        };
        updateCourses(id, formData, function() {
            getCourses(renderCourses);
            updateArea.innerHTML = `<button id="create">Create</button>`;
            handleCreateForm()
        })
        
    }

}


function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handlePatchCourse(${course.id})">Sửa</button>
            </li>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join('');
}


function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    console.log(createBtn)

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };

        createCourses(formData, function() {
            getCourses(renderCourses);
        });
    }
}

