const CREATE_POST_UI =
  `<div style="padding: 20px;">
      <form>
      <div class=" d-flex justify-content-between">
          <div class="form-group position-relative wrap-input">
          <input type="text" class="form-control title-input" name="titlePost" placeholder="Title..." />
          <span class="w-input"></span>
          <span class="title-harsh">Title:</span>
          </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Category</span>
        </div>
        <div class="input-group select-category-container">
          <select class="custom-select h-100" id="categorySelection">
            <option selected value="none">Choose one category</option>
            <option value="CATEG01">Kinh te</option>
            <option value="CATEG02">Nong nghiep</option>
            <option value="CATEG03">Cong nghiep</option>
          </select>
        </div>
      </div>
      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Tags</span>
        </div>
        <div class="form-control tags h-auto" id="tags">
          <input type="text" class="labelinput">
          <input type="hidden" value="" name="tags">
        </div>
      </div>
      
      <!--<div class="form-group position-relative wrap-input">
          <input type="text" class="form-control tag-input" name="tags" placeholder="TAGS" />
          <span class="w-input"></span>
          <span class="tag-harsh">TAGS:</span>
      </div>-->
      <div class="form-group position-relative wrap-input">
          <input type="text" class="form-control summary-input" name="summary" placeholder="Summary" />
          <span class="w-input"></span>
          <span class="summary-harsh">Summary:</span>
      </div>
      <div class="form-group">
          <textarea name="create-post-editor"></textarea>
      </div>
      <div class="form-group">
          <button class="btn btn-primary w-button" type="submit">
          Done
          </button>
      </div>
      </form>
  </div>`

  const EDIT_POST_UI =
  `<div style="padding: 20px;">
      <form>
      <div class=" d-flex justify-content-between">
          <div class="form-group position-relative wrap-input">
          <input type="text" class="form-control title-input" name="titlePost" placeholder="Title..." />
          <span class="w-input"></span>
          <span class="title-harsh">Title:</span>
          </div> 
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Category</span>
        </div>
        <div class="input-group select-category-container">
          <select class="custom-select h-100" id="categorySelection">
            <option selected value="none">Choose one category</option>
            <option value="CATEG01">Kinh te</option>
            <option value="CATEG02">Nong nghiep</option>
            <option value="CATEG03">Cong nghiep</option>
          </select>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Tags</span>
        </div>
        <div class="form-control tags h-auto" id="tags">
          <input type="text" class="labelinput">
          <input type="hidden" value="" name="tags">
        </div>
      </div>
      <div class="form-group position-relative wrap-input">
          <input type="text" class="form-control summary-input" name="summary" placeholder="Summary" />
          <span class="w-input"></span>
          <span class="summary-harsh">Summary:</span>
      </div>
      <div class="form-group">
          <textarea name="edit-post-editor"></textarea>
      </div>
      </form>
  </div>`

const POSTS_LIST_NONE_STATUS_UI =
  `<div class="post-list-container">
    <div class="filters-container mb-2">
      <button type="button" class="btn btn-danger delete-rows font-weight-bold" disabled>Delete selected rows</button>
      <div class="input-group filter-item filter-category">
        <div class="input-group-prepend">
          <label class="input-group-text" for="filterCategory">Category</label>
        </div>
        <select class="custom-select" id="filterCategory">
          <option value="ALL" selected>All</option>
          <option value="CATEG01">Kinh te</option>
          <option value="CATEG02">Xe</option>
          <option value="CATEG03">Cong nghe</option>
        </select>
      </div>
      <div class="input-group filter-item filter-sort">
        <div class="input-group-prepend">
          <label class="input-group-text" for="filterSort"><i class="fas fa-filter"></i></label>
        </div>
        <select class="custom-select" id="filterSort">
          <option value="1">Increasing created date</option>
          <option value="2" selected>Decreasing created date</option>
        </select>
      </div>
    </div>
    
    <table class="post-list">
      <thead class="post-list__header">
        <tr class="post-list__row">
          <th class="post-list__cell"></th>
          <th class="post-list__cell">Title</th>
          <th class="post-list__cell">Category</th>
          <th class="post-list__cell">Author</th>
          <th class="post-list__cell">Created Date</th>
          <th class="post-list__cell"></th>
        </tr>
      </thead>
      <tbody class="post-list__content"></tbody>
    </table>
    <div class="pagination">
      <!--<ul class="">
        <li class="pagination__item pagination__item-control pagination__item-previous-button">
          <i class="pagination-icon pagination-icon-arrow-left"></i>
        </li>
        <li class="pagination__item pagination__item-control pagination__item-next-button">
          <i class="pagination-icon pagination-icon-arrow-right"></i>
        </li>
      </ul>-->
    </div>
  </div>`

const POSTS_LIST_STATUS_UI =
  `<div class="post-list-container">
    <div class="filters-container mb-2">
      <button type="button" class="btn btn-danger delete-rows font-weight-bold" disabled>Delete selected rows</button>
      <div class="input-group filter-item filter-category">
        <div class="input-group-prepend">
          <label class="input-group-text" for="filterCategory">Category</label>
        </div>
        <select class="custom-select" id="filterCategory">
          <option value="ALL" selected>All</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="input-group filter-item filter-sort">
        <div class="input-group-prepend">
          <label class="input-group-text" for="filterSort"><i class="fas fa-filter"></i></label>
        </div>
        <select class="custom-select" id="filterSort">
          <option value="1">Increasing created date</option>
          <option value="2" selected>Decreasing created date</option>
          <option value="3">Increasing published date</option>
          <option value="4">Decreasing published date</option>
        </select>
      </div>
    </div>
    <table class="post-list">
      <thead class="post-list__header">
        <tr class="post-list__row">
          <th class="post-list__cell"></th>
          <th class="post-list__cell">Title</th>
          <th class="post-list__cell">Category</th>
          <th class="post-list__cell">Author</th>
          <th class="post-list__cell">Created Date</th>
          <th class="post-list__cell">Published Date</th>
          <th class="post-list__cell"></th>
        </tr>
      </thead>
      <tbody class="post-list__content"></tbody>
    </table>
    <div class="pagination">
      <!--<ul class="">
        <li class="pagination__item pagination__item-control pagination__item-previous-button">
          <i class="pagination-icon pagination-icon-arrow-left"></i>
        </li>
        <li class="pagination__item pagination__item-control pagination__item-next-button">
          <i class="pagination-icon pagination-icon-arrow-right"></i>
        </li>
      </ul>-->
    </div>
  </div>`

const USER_LIST_UI = 
  `<div class="user-list-container">
    <table class="user-list">
      <thead class="user-list__header">
        <tr class="user-list__row">
          <th class="user-list__cell">User</th>
          <th class="user-list__cell">Account</th>
          <th class="user-list__cell">Birthday</th>
          <th class="user-list__cell">Rule</th>
          <th class="user-list__cell">Status</th>
          <th class="user-list__cell user-list__control-icon"></th>
        </tr>
      </thead>
      <tbody class="user-list__content">
      </tbody>
    </table>
    <div class="pagination">
      <!--<ul class="">
        <li class="pagination__item pagination__item-control pagination__item-previous-button">
          <i class="pagination-icon pagination-icon-arrow-left"></i>
        </li>
        <li class="pagination__item pagination__item-control pagination__item-next-button">
          <i class="pagination-icon pagination-icon-arrow-right"></i>
        </li>
      </ul>-->
    </div>
  </div>`

const TAGS_LIST_UI = 
  `<div style="padding: 20px;">
    <div class="w-table-wrapper">
      <div class="w-table-title mb-4">
        <button
          type="button"
          id="add-new"
          class=" btn btn-outline-primary"
        >
          <i class="fas fa-plus align-baseline"></i>&nbsp;Add new
        </button>
        <button
          type="button"
          class=" ml-2 btn btn-outline-secondary"
          disabled
          id="delete-all"
        >
          <i class="fas fa-times align-baseline"></i>&nbsp;Delete
        </button>
      </div>

      <div class="w-table-body">
        <div class="table-responsive-sm">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <td scope="col" style=" width: 1%;"></td>
                <td scope="col" style=" width: 20%;">Tag</td>
                <td
                  scope="col"
                  class="text-center"
                  style=" width: 10%;"
                >
                  Post count
                </td>
                <td
                  scope="col"
                  class="text-center"
                  style=" width: 10%;"
                >
                  Created date
                </td>
                <td scope="col" style=" width: 8%;"></td>
              </tr>
            </thead>
            <tbody id="data-container">
              <!-- list tags -->
            </tbody>
          </table>
          <div id="pagination-container"></div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="tag-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="tag-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tag-modal-label">/h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="tag-name" class="col-form-label">Tag:</label>
              <input type="text" class="form-control" id="tag-name" />
            </div>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="tag-status"
              />
              <label class="custom-control-label" for="tag-status"
                >Hiện hành</label
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Hủy
          </button>
          <button
            type="button"
            id="submit-modal-btn"
            class="btn btn-primary"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  </div>`

const CATEGORIES_LIST_UI = 
  `<div style="padding: 20px;">
    <div class="w-table-wrapper">
      <div class="w-table-title mb-4">
        <button
          type="button"
          id="add-new"
          class=" btn btn-outline-primary"
        >
          <i class="fas fa-plus align-baseline"></i>&nbsp;Add new
        </button>
        <button
          type="button"
          class=" ml-2 btn btn-outline-secondary"
          disabled
          id="delete-all"
        >
          <i class="fas fa-times align-baseline"></i>&nbsp;Delete
        </button>
      </div>

      <div class="w-table-body">
        <div class="table-responsive-sm">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <td scope="col" style=" width: 1%;"></td>
                <td scope="col" style=" width: 20%;">Category</td>
                <td scope="col" style=" width: 20%;">Category parent</td>
                <td
                  scope="col"
                  class="text-center"
                  style=" width: 10%;"
                >
                  Post count
                </td>
                <td
                  scope="col"
                  class="text-center"
                  style=" width: 10%;"
                >
                  Created date
                </td>
                <td scope="col" style=" width: 8%;"></td>
              </tr>
            </thead>
            <tbody id="data-container">
              <!-- list tags -->
            </tbody>
          </table>
          <div id="pagination-container"></div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="tag-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="tag-modal-label"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tag-modal-label">/h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="tag-name" class="col-form-label">Tag:</label>
              <input type="text" class="form-control" id="tag-name" />
            </div>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="tag-status"
              />
              <label class="custom-control-label" for="tag-status"
                >Hiện hành</label
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Hủy
          </button>
          <button
            type="button"
            id="submit-modal-btn"
            class="btn btn-primary"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  </div>`

const CATEGORIES = [
  {
    category_id: 'CATEG01',
    category_name: 'Kinh te',
    parent_category: null,
    post_num: 100,
    created_date: '',
  },
  {
    category_id: 'CATEG02',
    category_name: 'Xe',
    parent_category: {
      category_id: '',
      category_name: ''
    },
    post_num: 100,
    created_date: '',
  },
  {
    category_id: 'CATEG03',
    category_name: 'Cong nghe',
    parent_category: {
      category_id: '',
      category_name: ''
    },
    post_num: 100,
    created_date: '',
  },
  {
    category_id: 'CATEG04',
    category_name: 'The gioi',
    parent_category: {
      category_id: '',
      category_name: ''
    },
    post_num: 100,
    created_date: '',
  },
  {
    category_id: 'CATEG05',
    category_name: 'Xa hoi',
    parent_category: {
      category_id: '',
      category_name: ''
    },
    post_num: 100,
    created_date: '',
  }
]

const USERS_LIST = [
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhuut',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhuu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhuuu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhuu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenhtu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyehutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyenutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'nguyhuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'ngunhuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'ngenhuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'uyenhuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'guyenuutu',
    rule: 'Admin',
    status: 'Activing',
  },
  {
    fullname: 'Nguyen Huu Tu',
    avatar: '../../media/statics/images/avatar_sample.png',
    birthday: '11/12/2012',
    account: 'guyenhuuu',
    rule: 'Admin',
    status: 'Activing',
  },
]

const TAGS_LIST = [
  {
    tag_id: 'TAG01',
    tag_name: "Nhà nông",
    post_num: 322,
    created_date: "32/12/2019"
  },
  { 
    tag_id: 'TAG02',
    tag_name: "Học tập", 
    post_num: 322, 
    created_date: "32/12/2019" },
  {
    tag_id: 'TAG03',
    tag_name: "Con cái",
    post_num: 322,
    created_date: "32/12/2019"
  },
  {
    tag_id: 'TAG04' ,
    tag_name: "Ăn uống", 
    post_num: 322, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG05' ,
    tag_name: "Tình yêu",  
    post_num: 322, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG06' ,
    tag_name: "Hôn nhân",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG07' ,
    tag_name: "Tội phạm",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG08' ,
    tag_name: "Nhà đất",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG09' ,
    tag_name: "Giới tính",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG10' ,
    tag_name: "Chiến tranh",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG11' ,
    tag_name: "Giết người",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG12' ,
    tag_name: "Cưỡng dâm",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG13' ,
    tag_name: "Trộm cướp",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
  {
    tag_id: 'TAG14' ,
    tag_name: "Nhà cửa",  
    post_num: 100, 
    created_date: "32/12/2019" 
  },
];

const POSTS_LIST = [
  {
    id: '0',
    title: 'Post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'CATEG01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: 'chao ca nha',
    content: `<div class="nn-text-post">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td>
                  <img alt="1123101533" border="0" id="234821"
                    src="https://image.nongnghiep.vn/upload/2019/4/17/1123101533.JPG" title="1123101533"></td>
              </tr>
              <tr>
                <td class="nn-tt-img">
                  Hậu đang say sưa hát bài “Nếu tôi chết hãy chôn tôi với cây đàn guitar”</td>
              </tr>
            </tbody>
          </table>
          <p>
            Anh không chỉ đang hát, mà đang chìm vào âm nhạc, “cái phao” đã giúp đứa bé bị mù hẳn lúc mới 12 tuổi bởi
            căn bệnh “teo thần kinh thị giác” không bị chìm trong tuyệt vọng.</p>
          <p>
            Anh là Võ Minh Hậu (46 tuổi) ở phường Bình Định, TX An Nhơn ,Bình Định.
            &nbsp;</p>
          <h3>
            Tuổi thơ đen tối</h3>
          <p>
            Là con thứ 5 trong gia đình có 7 anh chị em ở phường Bình Định (TX An Nhơn, Bình Định). Từ thơ ấu, Hậu đã
            có cơ hội tiếp cận với âm nhạc mỗi ngày. Bởi 2 người anh của Hậu đều là nhạc công nức tiếng tài hoa ở địa
            phương.</p>
          <p>
            Anh Võ Minh Tuấn, cây guitar chủ đạo và anh Võ Minh Việt, tay trống không thể thay thế của phong trào văn
            nghệ quần chúng lúc bấy giờ.</p>
          <p>
            Mỗi ngày, những lúc 2 người anh luyện nhạc, Hậu cứ “đeo” theo 1 bên. Tiếng đàn, tiếng trống dần “ngấm” vào
            Hậu. Chẳng biết từ lúc nào, âm nhạc đã trở thành cuộc sống của đứa bé mới chỉ 7 – 8 tuổi.</p>
          <p>
            Cha mẹ, anh chị của Hậu thấy cậu bé “quấn quýt” với âm nhạc, ai cũng mong sau này Hậu sẽ trở thành 1 thành
            viên trong ban nhạc gia đình.</p>
          <p>
            Thế nhưng “đời không như là mơ”, anh trai của Hậu, tay trống Võ Minh Việt, bất ngờ phải vĩnh viễn giã từ
            niềm đam mê âm nhạc sau 1 tai nạn giao thông trong 1 lần đi chơi nhạc về ở cái tuổi 40.</p>
          <p>
            Từ khi căn nhà vắng tiếng trống của anh trai, Hậu buồn! Nhưng còn buồn hơn khi vừa lên 9 tuổi, đôi mắt của
            Hậu bỗng dưng không còn nhìn rõ sự vật, cha mẹ đưa Hậu đi khám thì mới biết cậu bé bị căn bệnh “teo thần
            kinh thị giác”. Hậu được gia đình đưa đi chữa trị khắp nơi, cả Đông Tây y, nhưng không có kết quả. Đến năm
            12 tuổi thì đôi mắt của Hậu mất ánh sáng hoàn toàn.</p>
          <p>
            “Đang bình thường bỗng trở thành trở thành đứa trẻ mù lòa, vô dụng, mọi đi đứng sinh hoạt đều phải nhờ đến
            cha mẹ, anh chị chăm sóc. Tuyệt vọng, đã nhiều lần tôi muốn tìm đến cái chết để được giải thoát, nhưng cha
            mẹ anh chị em luôn ở bên cạnh động viên. Khi ấy tôi lại nghĩ đến âm nhạc, dấn thân vào âm nhạc và chính âm
            nhạc đã vực dậy cuộc đời tôi”, Hậu tâm sự.</p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td>
                  <img alt="2123101751" border="0" id="234822"
                    src="https://image.nongnghiep.vn/upload/2019/4/17/2123101751.JPG" title="2123101751"></td>
              </tr>
              <tr>
                <td class="nn-tt-img">
                  Hậu sẽ đàn hát phục vụ khách du lịch khi có yêu cầu</td>
              </tr>
            </tbody>
          </table>
          <p>
            “Lúc chưa mù, tôi đã được anh Việt và anh Tuấn tập đánh trống và tập chơi đàn guitar. Sau khi mắt bị mù
            hẳn, vị trí chức năng từng cái trống trong giàn trống và vị trí những dây đàn trên cần đàn guitar vẫn còn
            in trong đầu, nhờ đó việc tập của tôi đỡ vất vả hơn những người bị mù bẩm sinh. Tuy nhiên, thời gian đầu
            tôi cũng gặp rất nhiều khó khăn, cặp dùi thi thoảng cứ gõ trật trống. Cầm đến cây guitar còn vất vả hơn
            nữa, vì 6 dây đàn đã nhỏ mà khoảng cách lại rất gần nhau, nên khi bấm dây này cứ lẫn dây kia, muốn bấm hợp
            âm này nhưng tay bấm nhầm nên tiếng đàn lạc điệu. Hơn nữa, vì không nhìn thấy được bài nhạc nên tôi phải
            “đọc” giai điệu, tiết tấu từng bài hát bằng trí nhớ và mày mò luyện tập cho đến khi thuộc”, Hậu kể.
            &nbsp;</p>
          <h3>
            Có công mài sắt…</h3>
          <p>
            Từ khi đôi mắt mất ánh sáng, Hậu rất ngại ra ngoài, cả ngày anh thui thủi ở nhà, phần nhiều thời gian dành
            cho âm nhạc, cho những loại nhạc cụ. Vậy nhưng, nếu đôi tay chỉ miệt mài mà trong người không có tố chất
            âm nhạc thì dẫu luyện tập chuyên cần đến mấy cũng khó thành công. Ngoài khổ luyện, năng khiếu âm nhạc
            chính là tố chất khiến chẳng bao lâu sau Hậu đạt được ước nguyện.</p>
          <p>
            Sau nhiều năm tháng miệt mài, nhạc cụ thành thạo đầu tiên của Hậu là trống. Về sau, 6 dây đàn guitar cũng
            không còn làm khó anh, ngón đàn của anh có thể “nhả” ra những giai điệu ngọt ngào chẳng thua người anh Võ
            Minh Tuấn.</p>
          <p>
            Tiếp đến, Hậu thử sức mình với cây đàn organ và anh cũng đã nhanh chóng làm chủ bàn phím. Đàn “chay” thôi
            cũng chán, Hậu bắt đầu luyện giọng hát. Chất giọng trầm ấm của anh được nội tâm tiếp sức, nên Hậu sở hữu
            được giọng hát rất truyền cảm, nhất là khi chuyển tải những tâm trạng buồn, những day dứt trong cuộc đời.
          </p>
          <p>
            Năm 18 tuổi, Hậu mong có 1 ngày được ôm đàn hát trên sân khấu. Giấc mơ ấy rồi cũng trở thành hiện thực.
            Trong 1 hội diễn văn nghệ quần chúng được tổ chức tại TP Quy Nhơn (Bình Định), Hậu được mời biểu diễn. Lần
            đầu lên sân khấu ấy đã tiếp thêm động lực cho Hậu bằng sự cổ vũ nhiệt thành của khán giả. Hậu đã chiếm
            được tình yêu của người yêu nghệ thuật.</p>
          <p>
            Năm 2006, Hậu trở thành “đứa con” trong “mái ấm” Trung tâm người khuyết tật Nguyễn Nga đóng trên địa bàn
            TP Quy Nhơn, trực thuộc Hội bảo trợ người khuyết tật và Bảo vệ quyền trẻ em tỉnh Bình Định. Tại đây, Hậu
            đã “truyền lửa” âm nhạc cho những đứa trẻ khuyết tật khác.</p>
          <p>
            Noi gương Hậu, những trẻ em khuyết tật tìm thấy được niềm vui và bước qua mặc cảm để hòa mình vào cuộc
            sống.</p>
          <p>
            Từ đó, Hậu tự tin góp mặt với nhiều chương trình văn nghệ. Những kỷ niệm đáng nhớ nhất với Hậu là vào năm
            2007, anh được vinh dự mời tham gia biểu diễn văn nghệ khắp cả nước trong gần 2 năm trời do Trung ương Hội
            bảo trợ Người tàn tật và Trẻ mồ côi tổ chức; tham gia cuộc thi Tiếng hát Karaoke năm 2009 do Liên đoàn lao
            động tỉnh Bình Định tổ chức và lọt vào Top 10; giải nhất đơn ca trong Hội trại Lý Công Uẩn do Câu lạc bộ
            Hoành Pháp Trẻ tổ chức tại khu du lịch Đại Nam (Bình Dương) năm 2010…</p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td>
                  <img alt="3123101877" border="0" id="234823"
                    src="https://image.nongnghiep.vn/upload/2019/4/17/3123101877.jpg" title="3123101877"></td>
              </tr>
              <tr>
                <td class="nn-tt-img">
                  2 tay Hậu “múa” trên bộ trống cổ truyền</td>
              </tr>
            </tbody>
          </table>
          <p>
            Hậu còn tích cực tham gia các hoạt động từ thiện, các hoạt động văn nghệ từ thiện ở chùa, các trung tâm
            trẻ mồ côi. Hậu không những là nhạc công, là giọng ca chính, mà anh còn phụ trách luôn phần tập những ca
            khúc cho cả nhóm. Thời gian gần đây, Hậu còn được nhiều quán cà phê nhạc sống mời về chơi guitar cho
            chương trình mỗi đêm, cả chơi nhạc đám cưới và phục vụ khách du lịch khi có yêu cầu.</p>
          <p>
            “Mỗi ngày được ôm đàn, được hát là hạnh phúc lắm rồi. Hơn nữa, những show chơi nhạc vừa được thỏa lòng đam
            mê, vừa cho tôi tiền để có thể tự chủ được phần nào cuộc sống của mình, không còn hoàn toàn lệ thuộc vào
            gia đình như trước đây”, Hậu bộc bạch.</p>
    
          <div class="nn-user-post">
            VŨ ĐÌNH THUNG
            <span></span>
          </div>
        </div>`
  },
  {
    id: '1',
    title: 'Post 02',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01.1',
      category_name: 'Nông nghiệp',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: 'Post 02',
  },
  {
    id: '2',
    title: 'Post 03',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01.2',
      category_name: 'Công nghiệp',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: 'Post 03'
  },
  {
    id: '3',
    title: 'Post 04',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ02',
      category_name: 'Xe',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/04/12',
    published_date: '2019/04/12',
    summary: '',
    content: '',
  },
  {
    id: '4',
    title: 'Post 05',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ03',
      category_name: 'Xã hội',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '5',
    title: 'Post 06',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ04',
      category_name: 'Pháp luật',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '6',
    title: 'Post 07',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ05',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '7',
    title: 'Post 08',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '8',
    title: 'Post 09',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '9',
    title: 'Post 10',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '10',
    title: 'Post 11',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '11',
    title: 'Post 12',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '12',
    title: 'Post 13',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '13',
    title: 'Post 14',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
  {
    id: '14',
    title: 'Post 15',
    author: {
      name: 'Nguyen Huu Tu',
      pseudonym: '',
    },
    category: {
      category_id: 'categ01',
      category_name: 'Kinh Tế',
    },
    tags: ['trong trot', 'chan nuoi'],
    created_date: '2019/05/12',
    published_date: '2019/05/12',
    summary: '',
    content: ''
  },
]