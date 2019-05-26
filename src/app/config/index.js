module.exports = {
  SERVER: {
    PORT: 3000,
  },
  PAGES: {
    GENERAL: 'GENERAL',
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
  }
}