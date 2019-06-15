const { categoryBus, authBus } = require('../../business')

const getSearchResultsGetRequest = (req, res) => {
    res.render('searchPageContent', { results: [], searchInput: req.query.searchInput, layout: 'indexLayout' })
}

const homepageGetRequest = async (req, res) => {
    let signinedUser = authBus.getSigninedUser(req.cookies.signined_user)
    let listCategories = []
    await categoryBus
    .getCategories()
    .then(categories =>{
      listCategories=categories
    })

    let listParent = listCategories.filter(categ => categ.CategoryParent === null)
    let listChildren = listCategories.filter(categ => categ.CategoryParent !== null)

    listChildren.forEach(item => {
      console.log(item)
        listParent.filter(categ => categ.CategoryId === item.CategoryParent)[0].Children.push(item)
    })
    console.log(listParent[0].children);
    res.render('indexContent', { user: signinedUser, listParent, layout: 'indexLayout' })
}

const showPostsListByCategoryGetRequest = (req, res) => {
    res.render('listPostContent', { layout: 'indexLayout' })
}

const showPostsListByTagGetRequest = (req, res) => {
    res.render('listPostContent', { layout: 'indexLayout' })
}

const showPostDetailGetRequest = (req, res) => {
    let postId = req.params.postId
    res.render('postDetailContent', { layout: 'indexLayout' })
}



module.exports = {
    getSearchResultsGetRequest,
    homepageGetRequest,
    showPostsListByCategoryGetRequest,
    showPostsListByTagGetRequest,
    showPostDetailGetRequest,
}
