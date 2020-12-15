const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let favorite = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) {
            favorite = blogs[i]
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let countMap = {}
    let maxAuthor = blogs[0].author
    let maxCount = 1
    for (let i = 0; i < blogs.length; i++) {
        const object = blogs[i]
        const author = object['author']
        if (!countMap[author]) {
            countMap[author] = 1
        } else {
            countMap[author]++
        }

        if (countMap[author] > maxCount)
        {
            maxAuthor = author
            maxCount = countMap[author]
        }
    }

    return {
        author: maxAuthor,
        blogs: maxCount
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let countMap = {}
    let maxAuthor = blogs[0].author
    let maxLikes = 0
    for (let i = 0; i < blogs.length; i++) {
        const object = blogs[i]
        const author = object['author']
        if (!countMap[author]) {
            countMap[author] = object.likes
        } else {
            countMap[author] += object.likes
        }

        if (countMap[author] > maxLikes)
        {
            maxAuthor = author
            maxLikes= countMap[author]
        }
    }

    return {
        author: maxAuthor,
        likes: maxLikes
    }


}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}