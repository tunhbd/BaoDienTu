class Category{
  constructor(
      categoryId='',
      categoryName='',
      categoryParent='',
      children = []
  )
  {
    this.categoryId=categoryId;
    this.categoryName = categoryName;
    this.categoryParent=categoryParent;
    this.children=children;
  }
  get CategoryId(){return this.categoryId}
  set CategoryId(val){this.categoryId = val}

  get CategoryName(){return this.categoryName}
  set CategoryName(val){this.categoryName = val}

  get CategoryParent(){return this.categoryParent}
  set CategoryParent(val){this.categoryParent = val}

  get Children(){return this.children}
  set Children(val){this.children = val}
}

module.exports = Category
