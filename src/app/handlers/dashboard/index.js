const business = require('../../business')
const mockData = require('../../mockData')
const config = require('../../config')

const getDashboardGetRequest = (req, res) => {
    let signinedUser = business.authBus.getSigninedUser(req.cookies.signined_user)

    if (signinedUser === undefined) {
        res.redirect('/sign-in')
    } else {
        if (signinedUser.rule === 'SUBSCRIBER') {
            res.redirect('/')
        } else {
            res.render('dashboard', { user: signinedUser, layout: false })
        }
    }
}

const getEditPostUIGetRequest = (req, res) => {
    res.render('templates/dashboard-uis/editPostUI', { categories: mockData.CATEGORIES_LIST, layout: false })
}

const getEditUserUIByRoleGetRequest = (req, res) => {
    res.render('templates/dashboard-uis/editUserUI', { userRole: req.params.userRole, categories: mockData.CATEGORIES_LIST, layout: false })
}

const getPageContentUIByPageIdGetRequest = (req, res) => {
    switch (req.params.pageId) {
        case config.PAGES.CREATE_POST:
            res.render('templates/dashboard-uis/createPostUI', { categories: mockData.CATEGORIES_LIST, layout: false })
            break;
        case config.PAGES.DRAFT:
            res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
            break;
        case config.PAGES.REJECT:
            res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
            break;
        case config.PAGES.WAITING:
            res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
            break;
        case config.PAGES.PUBLISHED:
            res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
            break;
        case config.PAGES.USER:
            res.render('templates/dashboard-uis/usersListUI', { layout: false })
            break;
        case config.PAGES.CATEGORY:
            res.render('templates/dashboard-uis/categoriesListUI', { layout: false })
            break;
        case config.PAGES.TAG:
            res.render('templates/dashboard-uis/tagsListUI', { layout: false })
            break;
        default:
            res.send('not found page')
    }
}

const getPostsListByPageIdGetRequest = (req, res) => {
    res.send(mockData.POSTS_LIST)
}

const getFullCategoriesListGetRequest = (req, res) => {
    res.send(mockData.CATEGORIES_LIST)
}

const getFullTagsListGetRequest = (req, res) => {
    business.tagBus
        .loadAllTags()
        .then(tags => {
            console.log(tags)
            res.send(tags)
        })
        .catch(err => {
            console.log('error', err)
            res.send('Sorry, have some error on server')
        })
}

const getFullUsersListGetRequest = (req, res) => {
    res.send(mockData.USERS_LIST)
}

module.exports = {
    getDashboardGetRequest,
    getEditPostUIGetRequest,
    getEditUserUIByRoleGetRequest,
    getPageContentUIByPageIdGetRequest,
    getPostsListByPageIdGetRequest,
    getFullCategoriesListGetRequest,
    getFullTagsListGetRequest,
    getFullUsersListGetRequest,
}