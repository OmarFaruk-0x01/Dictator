import * as actions from './actions';

const dataReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCHING_LOADING_DEFINATION: {
      return {
        ...state,
        definations: {
          status: 'loading',
          data: [],
          maxSearched: action.payload.maxSearched,
          downloaded: action.payload.downloaded,
          error: {},
        },
      };
    }
    case actions.FETCHING_SUCCESS_DEFINATION: {
      return {
        ...state,
        definations: {
          status: 'success',
          data: action.payload.data,
          error: action.payload.error,
        },
      };
    }
    case actions.FETCHING_FAIL_DEFINATION: {
      return {
        ...state,
        definations: {
          status: 'fail',
          data: [],
          error: action.payload,
        },
      };
    }
    case actions.FETCHING_LOADING_EXAMPLES: {
      return {
        ...state,
        examples: {
          status: 'loading',
          data: [],
          maxSearched: action.payload.maxSearched,
          downloaded: action.payload.downloaded,
          error: {},
        },
      };
    }
    case actions.FETCHING_SUCCESS_EXAMPLES: {
      return {
        ...state,
        examples: {
          status: 'success',
          data: action.payload.data,
          error: action.payload.error,
        },
      };
    }
    case actions.FETCHING_FAIL_EXAMPLES: {
      return {
        ...state,
        examples: {
          status: 'fail',
          data: [],
          error: action.payload,
        },
      };
    }
    case actions.FETCHING_LOADING_SYNONIMS: {
      return {
        ...state,
        synonyms: {
          status: 'loading',
          data: [],
          maxSearched: action.payload.maxSearched,
          downloaded: action.payload.downloaded,
          error: {},
        },
      };
    }
    case actions.FETCHING_SUCCESS_SYNONIMS: {
      return {
        ...state,
        synonyms: {
          status: 'success',
          data: action.payload.data,
          error: action.payload.error,
        },
      };
    }
    case actions.FETCHING_FAIL_SYNONIMS: {
      return {
        ...state,
        synonyms: {
          status: 'fail',
          data: [],
          error: action.payload,
        },
      };
    }
    case actions.FETCHING_LOADING_ANTONYMS: {
      return {
        ...state,
        antonyms: {
          status: 'loading',
          data: [],
          maxSearched: action.payload.maxSearched,
          downloaded: action.payload.downloaded,
          error: {},
        },
      };
    }
    case actions.FETCHING_SUCCESS_ANTONYMS: {
      return {
        ...state,
        antonyms: {
          status: 'success',
          data: action.payload.data,
          error: action.payload.error,
        },
      };
    }
    case actions.FETCHING_FAIL_ANTONYMS: {
      return {
        ...state,
        antonyms: {
          status: 'fail',
          data: [],
          error: action.payload,
        },
      };
    }
  }
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case actions.NEW_ERROR_ADDING: {
      return {
        newError: state.newError + 1,
        totalError: state.errorList.length + 1,
        errorList: [...state.errorList, action.payload],
      };
    }
    case actions.RESET_NEW_ERROR_COUNT: {
      return {
        ...state,
        newError: 0,
      };
    }
    case actions.DELETE_ERROR_LIST: {
      return {
        totalError: 0,
        newError: 0,
        errorList: [],
      };
    }
    default: {
      return state;
    }
  }
};

const exportReducer = (state, action) => {
  switch (action.type) {
    case actions.MARK_AS_EXPORT: {
      const foundData = state.markedWords.find(item => item.word === action.payload.word)
      const filterData = state.markedWords.filter(item => item.word !== action.payload.word)
      if (foundData){
        foundData[action.payload.Key] = action.payload.data
        return {
          markedWords: [...filterData, foundData]
        }
      }
      return {
        markedWords: [...state.markedWords, {word: action.payload.word, [action.payload.Key]: action.payload.data}],
      };
    }
    case actions.UNMARK_AS_EXPORT: {
      const filteredMarked = state.markedWords.filter(
        (w) => w !== action.payload,
      );
      return {
        markedWords: filteredMarked,
      };
    }
    default:
      return state;
  }
};

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_ALL_FV_WORD: {
      return {
        fvWords: action.payload,
      };
    }
    case actions.ADD_WORD_TO_FAVOURITE: {
      return {
        fvWords: [...state.fvWords, action.payload],
      };
    }
    case actions.REMOVE_WORD_TO_FAVOURITE: {
      const n = state.fvWords.filter((w) => w.name !== action.payload);
      console.log(n, 'n');
      return {
        fvWords: n,
      };
    }
  }
};

const initialErrorState = {
  totalError: 0,
  newError: 0,
  errorList: [],
};

const initialState = {
  definations: {
    status: 'no-data',
    data: [],
    maxSearched: 0,
    downloaded: 0,
    error: {},
  },
  examples: {
    status: 'no-data',
    data: [],
    maxSearched: 0,
    downloaded: 0,
    error: {},
  },
  synonyms: {
    status: 'no-data',
    data: [],
    maxSearched: 0,
    downloaded: 0,
    error: {},
  },
  antonyms: {
    status: 'no-data',
    data: [],
    maxSearched: 0,
    downloaded: 0,
    error: {},
  },
};

const initialExportState = {
  markedWords: [],
};

const initialFavouriteState = {
  fvWords: [],
};

export {
  dataReducer,
  initialState,
  errorReducer,
  initialErrorState,
  exportReducer,
  initialExportState,
  favouriteReducer,
  initialFavouriteState,
};
