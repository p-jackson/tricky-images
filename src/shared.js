// Bring these into the global namespace so we can pretend
// we've pulled in the libraries using npm.
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;
const takeEvery = typeof ReduxSaga !== "undefined" && ReduxSaga.takeEvery;
const takeLatest = typeof ReduxSaga !== "undefined" && ReduxSaga.takeLatest;
const createSagaMiddleware = typeof ReduxSaga !== "undefined" && ReduxSaga.default;
const isCancelError = typeof ReduxSaga !== "undefined" && ReduxSaga.isCancelError;
const put = typeof ReduxSaga !== "undefined" && ReduxSaga.effects.put;
const call = typeof ReduxSaga !== "undefined" && ReduxSaga.effects.call;

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

function setupDragging(dispatch, onDropEvent) {
   const image = document.getElementById("image");

   image.addEventListener("dragover", ev => ev.preventDefault());
   image.addEventListener("dragenter", () => dispatch({ type: "DRAG_OVER_IMAGE" }));
   image.addEventListener("dragleave", () => dispatch({ type: "DRAG_LEAVE_IMAGE" }));
   image.addEventListener("drop", onDropEvent);
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
         return Object.assign({}, state, { isUploading: true, isImageHovering: false });
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

// This is a copy of the redux-thunk middleware (@2.0.1)
// It's not available on npmcdn so just pasted it here's since it's tiny
function thunkMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}
