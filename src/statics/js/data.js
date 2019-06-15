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



