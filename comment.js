var users = [
    {
        id: 1,
        name: 'Kien Dam'
    },
    {
        id: 2,
        name: 'Son Dang'
    },
    {
        id: 3,
        name: 'Dat Dang'
    }
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Sơn chưa ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vừa ra xong em ơi'
    },
    {
        id: 3,
        user_id: 3,
        content: 'Hay quá anh ơi'
    }
];

var commentBlock = document.getElementById('comment');

function getComments() {
    return new Promise(function(resolve) {
        setTimeout(resolve(comments), 1000)
    })
}

getComments()
    .then(function(comments) {
        var userIds = comments.map(function(comment) {
            return comment.user_id;
        })
        return getUsersByIds(userIds)
            .then(function(users) {
                return {
                    users: users,
                    comments: comments
                }
            })
    })
    .then(function(list) {
        var htmls = '';
        list.users.forEach(function(user) {
            var comment = list.comments.find(function(comment) {
                return comment.user_id === user.id;
            })

            htmls += `
            <li>${user.name}: ${comment.content}</li>
            `;
        })
        
        commentBlock.innerHTML = htmls;
    })


function getUsersByIds(userIds) {
    return new Promise(function(resolve) {
        var listUsers = users.filter(function(user) {
            return userIds.includes(user.id)
        })
        setTimeout(resolve(listUsers), 1000);
    })
}


// Test function getUserByIds
// getUsersByIds([1, 2, 3])
//     .then(function(listUsers) {
//         console.log(listUsers)
//     })