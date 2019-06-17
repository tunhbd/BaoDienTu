module.exports = {
  SERVER: {
    PORT: 3000,
  },
  PAGES: {
    DASHBOARD: 'DASHBOARD',
    CREATE_POST: 'CREATE_POST',
    DRAFT: 'DRAFT',
    WAITING: 'WAITING',
    REJECT: 'REJECT',
    PUBLISHED: 'PUBLISHED',
    USER: 'USER',
    CATEGORY: 'CATEGORY',
    TAG: 'TAG',
  },
  USER_ROLES: {
    SUBSCRIBER: 'SUBSCRIBER',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
  },
  FILTER: {
    INCREASE_CREATED_DATE: 'increase-created-date',
    DECREASE_CREATED_DATE: 'decrease-created-date',
    INCREASE_PUBLISHED_DATE: 'increase-published-date',
    DECREASE_PUBLISHED_DATE: 'decrease-published-date',
  },
  DATABASE: {
    MAIN: {
      HOST: 'mysql-1472-0.cloudclusters.net',
      PORT: '10003',
      USER: 'admin',
      PASSWORD: 'baodientu2019',
      DATABASE_NAME: 'baodientu'
    },
    OTHER: {
      HOST: 'db4free.net',
      PORT: '3306',
      USER: 'tth2019',
      PASSWORD: 'baodientu2019',
      DATABASE_NAME: 'baodientu'
    }
  },
  LIMIT_POSTS: 2,
  LIMIT_USERS: 15,
  LIMIT_TAGS: 10,
  SENDGRID_API_KEY: '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',
}