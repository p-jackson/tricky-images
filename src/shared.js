// Bring these into the global namespace so we can pretend
// we've pulled in the libraries using npm.
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;
const takeEvery = ReduxSaga.takeEvery;
const takeLatest = ReduxSaga.takeLatest;
const createSagaMiddleware = ReduxSaga.default;
const isCancelError = ReduxSaga.isCancelError;
const put = ReduxSaga.effects.put;
const call = ReduxSaga.effects.call;

function readAsDataURL(file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(file);
   });
}

function renderAll(props) {
   const uploadingMessage = document.getElementById("uploadingMessage");
   if (props.isUploading)
      uploadingMessage.classList.remove("isHidden");
   else
      uploadingMessage.classList.add("isHidden");

   const image = document.getElementById("image");
   if (props.isImageHovering)
      image.classList.add("isImageHovering");
   else
      image.classList.remove("isImageHovering");
   if (props.imageUrl) {
      image.classList.remove("isEmpty");
      image.style.backgroundImage = `url(${props.imageUrl})`;
   }
   else {
      image.classList.add("isEmpty");
      image.style.backgroundImage = null;
   }
}

function setupDragging(dispatch) {
   const image = document.getElementById("image");

   image.addEventListener("dragover", ev => ev.preventDefault());
   image.addEventListener("dragenter", () => dispatch({ type: "DRAG_OVER_IMAGE" }));
   image.addEventListener("dragleave", () => dispatch({ type: "DRAG_LEAVE_IMAGE" }));

   image.addEventListener("drop", ev => {
      ev.preventDefault();
      dispatch({ type: "DROP_IMAGE", file: getFileFromEvent(ev) })
   });
}

// From the MDN example, but returns after finding the first file
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
function getFileFromEvent(ev) {
   var dt = ev.dataTransfer;
   if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i=0; i < dt.items.length; i++) {
         if (dt.items[i].kind == "file") {
            return dt.items[i].getAsFile();
         }
      }
   }
   else {
      // Use DataTransfer interface to access the file(s)
      if (dt.files.length)
         return dt.files[0];
   }
}

const defaultState = {
   imageUrl: null,
   isUploading: false,
   isImageHovering: false
}

function reducer(state, action) {
   state = state || defaultState;

   switch (action.type) {
      case "DRAG_OVER_IMAGE":
         return Object.assign({}, state, { isImageHovering: true });
      case "DRAG_LEAVE_IMAGE":
      case "DROP_IMAGE":
         return Object.assign({}, state, { isImageHovering: false });
      case "START_UPLOADING":
         return Object.assign({}, state, { isUploading: true });
      case "STOP_UPLOADING":
         return Object.assign({}, state, { isUploading: false });
      case "CANCEL_UPLOADING":
         return Object.assign({}, state, { isUploading: false, imageUrl: null });
      case "SET_IMAGE":
         return Object.assign({}, state, { imageUrl: action.url });
      case "REMOVE_IMAGE":
         return Object.assign({}, state, { imageUrl: null });
      default:
         return state;
   }
}
