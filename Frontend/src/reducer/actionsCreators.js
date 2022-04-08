import * as actions from '../reducer/actions';
import {env} from '../helpers/environment';
import {LOG, ReadAllWords, RemoveWord, WriteWord} from '../helpers/config';
const BaseURL = __DEV__ ? env.d.BaseURL : env.p.BaseURL;
// const APIKEY = env.mode != 'prod' ? env.d.APIKEY : env.p.APIKEY;
import axios from 'axios';
import {ToastAndroid} from 'react-native';

const GetDefinitions = (dataDispatch, payload, errorDispatch) => {
  LOG.info('Search for Definition ' + payload);

  const tmpData = [];
  const tmpErrorWord = [];
  const wordArray = payload
    .split(',')
    .filter((e) => e !== '');
   
  dataDispatch({
    type: actions.FETCHING_LOADING_DEFINATION,
    payload: {maxSearched: wordArray.length, downloaded: tmpData.length},
  });

  wordArray.forEach((word) => {
    axios({
      method: 'post',
      url: BaseURL + 'dictionary',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token-key': 'Allahis1',
      },

      data: JSON.stringify({word: word.trim()}),
    })
      .then((e) => {
        if (e.data.status == 200) {
          tmpData.push(e.data.data[0]);
          dataDispatch({
            type: actions.FETCHING_LOADING_DEFINATION,
            payload: {
              maxSearched: wordArray.length,
              downloaded: tmpData.length,
            },
          });
        }
        if (e.data.status != 200) {
          LOG.error(`Definition | ${word} | ${JSON.stringify(e.data)}`);

          tmpErrorWord.push(word);
          errorDispatch({
            type: actions.NEW_ERROR_ADDING,
            payload: {
              fieldName: 'Definition',
              title: 'Failed',
              message: e.data.message,
              args: e.data.error,
              status: e.data.status,
            },
          });
        }

        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_DEFINATION,
            payload: {data: tmpData, error: {}},
          });
        }
      })
      .catch((e) => {
        LOG.error(`Definition | ${word} | ${e}`);
        tmpErrorWord.push(word);
        errorDispatch({
          type: actions.NEW_ERROR_ADDING,
          payload: {
            fieldName: 'Definition',
            title: e.message === 'Network Error' ? 'Network' : e.name,
            status: e.message === 'Network Error' ? 400 : 500,
            message:
              e.message === 'Network Error'
                ? 'Check Your Internet Connction'
                : e.message,
          },
        });
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_DEFINATION,
            payload: {data: tmpData, error: {}},
          });
        }
      });
  });
};
const GetExamples = (dataDispatch, payload, errorDispatch) => {
  LOG.info('Search for Examples ' + payload);

  const tmpData = [];
  const tmpErrorWord = [];
  const wordArray = payload
  .split(',')
  .filter((e) => e !== '');
  dataDispatch({
    type: actions.FETCHING_LOADING_EXAMPLES,
    payload: {maxSearched: wordArray.length, downloaded: tmpData.length},
  });

  wordArray.forEach((word) => {
    axios({
      method: 'post',
      url: BaseURL + 'examples',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: word.trim()}),
    })
      .then((e) => {
        if (e.data.status == 200) {
          if (e.data.data.length > 0){
            
            tmpData.push(e.data.data[0]);
            dataDispatch({
              type: actions.FETCHING_LOADING_EXAMPLES,
              payload: {
                maxSearched: wordArray.length,
                downloaded: tmpData.length,
              },
            });
          }
        }
        if (e.data.status != 200) {
          LOG.error(`Examples | ${word} | ${JSON.stringify(e.data)}`);

          tmpErrorWord.push(word);
          errorDispatch({
            type: actions.NEW_ERROR_ADDING,
            payload: {
              fieldName: 'Examples',
              title: 'Failed',
              message: e.data.message,
              args: e.data.error,
              status: e.data.status,
            },
          });
        }

        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_EXAMPLES,
            payload: {data: tmpData, error: {}},
          });
        }
      })
      .catch((e) => {
        LOG.error(`Examples | ${word} | ${e}`);
        tmpErrorWord.push(word);
        errorDispatch({
          type: actions.NEW_ERROR_ADDING,
          payload: {
            fieldName: 'Examples',
            title: e.message === 'Network Error' ? 'Network' : e.name,
            status: e.message === 'Network Error' ? 400 : 500,
            message:
              e.message === 'Network Error'
                ? 'Check Your Internet Connction'
                : e.message,
          },
        });
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_EXAMPLES,
            payload: {data: tmpData, error: {}},
          });
        }
      });
  });
};
const GetSynonyms = (dataDispatch, payload, errorDispatch) => {
  LOG.info('Search for Synonyms ' + payload);
  const tmpData = [];
  const tmpErrorWord = [];
  const wordArray = payload
    .split('\n')
    .join(' ')
    .split(' ')
    .filter((e) => e !== '');
  dataDispatch({
    type: actions.FETCHING_LOADING_SYNONIMS,
    payload: {maxSearched: wordArray.length, downloaded: tmpData.length},
  });

  wordArray.forEach((word) => {
    axios({
      method: 'post',
      url: BaseURL + 'synonyms',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: word}),
    })
      .then((e) => {
        if (e.data.status == 200) {
          tmpData.push(e.data.data[0]);
          dataDispatch({
            type: actions.FETCHING_LOADING_SYNONIMS,
            payload: {
              maxSearched: wordArray.length,
              downloaded: tmpData.length,
            },
          });
        }
        if (e.data.status != 200) {
          LOG.error(`Synonyms | ${word} | ${JSON.stringify(e.data)}`);

          tmpErrorWord.push(word);
          errorDispatch({
            type: actions.NEW_ERROR_ADDING,
            payload: {
              fieldName: 'Synonyms',
              title: 'Failed',
              message: e.data.message,
              args: e.data.error,
              status: e.data.status,
            },
          });
        }
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_SYNONIMS,
            payload: {data: tmpData, error: {}},
          });
        }
      })
      .catch((e) => {
        LOG.error(`Synonyms | ${word} | ${e}`);
        tmpErrorWord.push(word);
        errorDispatch({
          type: actions.NEW_ERROR_ADDING,
          payload: {
            fieldName: 'Synonyms',
            title: e.message === 'Network Error' ? 'Network' : e.name,
            status: e.message === 'Network Error' ? 400 : 500,
            message:
              e.message === 'Network Error'
                ? 'Check Your Internet Connction'
                : e.message,
          },
        });
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_SYNONIMS,
            payload: {data: tmpData, error: {}},
          });
        }
      });
  });
};
const GetAntonyms = (dataDispatch, payload, errorDispatch) => {
  LOG.info('Search for Antonyms ' + payload);
  const tmpData = [];
  const tmpErrorWord = [];
  const wordArray = payload
    .split('\n')
    .join(' ')
    .split(' ')
    .filter((e) => e !== '');
  dataDispatch({
    type: actions.FETCHING_LOADING_ANTONYMS,
    payload: {maxSearched: wordArray.length, downloaded: tmpData.length},
  });

  wordArray.forEach((word) => {
    axios({
      method: 'post',
      url: BaseURL + 'antonyms',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: word}),
    })
      .then((e) => {
        if (e.data.status == 200) {
          tmpData.push(e.data.data[0]);
          dataDispatch({
            type: actions.FETCHING_LOADING_ANTONYMS,
            payload: {
              maxSearched: wordArray.length,
              downloaded: tmpData.length,
            },
          });
        }
        if (e.data.status != 200) {
          LOG.error(`Antonyms | ${word} | ${JSON.stringify(e.data)}`);
          tmpErrorWord.push(word);
          errorDispatch({
            type: actions.NEW_ERROR_ADDING,
            payload: {
              fieldName: 'Antonyms',
              title: 'Failed',
              message: e.data.message,
              args: e.data.error,
              status: e.data.status,
            },
          });
        }
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_ANTONYMS,
            payload: {data: tmpData, error: {}},
          });
        }
      })
      .catch((e) => {
        LOG.error(`Antonyms | ${word} | ${e}`);
        tmpErrorWord.push(word);
        errorDispatch({
          type: actions.NEW_ERROR_ADDING,
          payload: {
            fieldName: 'Antonyms',
            status: e.message === 'Network Error' ? 400 : 500,
            title: e.message === 'Network Error' ? 'Network' : e.name,
            message:
              e.message === 'Network Error'
                ? 'Check Your Internet Connction'
                : e.message,
          },
        });
        if (tmpData.length + tmpErrorWord.length === wordArray.length) {
          dataDispatch({
            type: actions.FETCHING_SUCCESS_ANTONYMS,
            payload: {data: tmpData, error: {}},
          });
        }
      });
  });
};

const GetFavAllWords = (fvDispatch) => {
  ReadAllWords().then((data) => {
    fvDispatch({type: actions.ADD_ALL_FV_WORD, payload: data});
  });
};
const RemoveFvWord = (fvDispatch, word) => {
  RemoveWord(word);

  fvDispatch({type: actions.REMOVE_WORD_TO_FAVOURITE, payload: word});
};

const GetExamples_FV = async (payload, errorDispatch) => {
  LOG.info('Search for FV-Examples ' + payload);
  try {
    const wordResp = await axios({
      method: 'post',
      url: BaseURL + 'examples',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: payload}),
    });

    if (wordResp.data.status == 200) {
      await WriteWord(payload, wordResp.data.data[0].examples, 'examples');
      return {ok: true};
    }
    if (wordResp.data.status != 200) {
      LOG.error(`Examples | ${payload} | ${JSON.stringify(wordResp.data)}`);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to get ',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        100,
      );
      errorDispatch({
        type: actions.NEW_ERROR_ADDING,
        payload: {
          fieldName: 'Examples',
          title: 'Failed',
          message: wordResp.data.message,
          args: wordResp.data.error,
          status: wordResp.data.status,
        },
      });
      return {ok: false};
    }
  } catch (e) {
    LOG.error(`Examples | ${payload} | ${e}`);
    ToastAndroid.showWithGravityAndOffset(
      'Failed to get ',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
    errorDispatch({
      type: actions.NEW_ERROR_ADDING,
      payload: {
        fieldName: 'Examples',
        title: e.message === 'Network Error' ? 'Network' : e.name,
        status: e.message === 'Network Error' ? 400 : 500,
        message:
          e.message === 'Network Error'
            ? 'Check Your Internet Connction'
            : e.message,
      },
    });
    return {ok: false};
  }
};
const GetDefinition_FV = async (payload, errorDispatch) => {
  LOG.info('Search for FV-Definition ' + payload);
  try {
    const wordResp = await axios({
      method: 'post',
      url: BaseURL + 'dictionary',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token-key': 'Allahis1',
      },

      data: JSON.stringify({word: payload}),
    });

    if (wordResp.data.status == 200) {
      await WriteWord(payload, wordResp.data.data[0], 'definition');
      return {ok: true};
    }
    if (wordResp.data.status != 200) {
      LOG.error(`Definition | ${payload} | ${JSON.stringify(wordResp.data)}`);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to get ',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        100,
      );
      errorDispatch({
        type: actions.NEW_ERROR_ADDING,
        payload: {
          fieldName: 'Definition',
          title: 'Failed',
          message: wordResp.data.message,
          args: wordResp.data.error,
          status: wordResp.data.status,
        },
      });
      return {ok: false};
    }
  } catch (e) {
    LOG.error(`Definition | ${payload} | ${e}`);
    ToastAndroid.showWithGravityAndOffset(
      'Failed to get ',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
    errorDispatch({
      type: actions.NEW_ERROR_ADDING,
      payload: {
        fieldName: 'Definition',
        title: e.message === 'Network Error' ? 'Network' : e.name,
        status: e.message === 'Network Error' ? 400 : 500,
        message:
          e.message === 'Network Error'
            ? 'Check Your Internet Connction'
            : e.message,
      },
    });
    return {ok: false};
  }
};
const GetSynonyms_FV = async (payload, errorDispatch) => {
  LOG.info('Search for FV-Synonyms ' + payload);
  try {
    const wordResp = await axios({
      method: 'post',
      url: BaseURL + 'synonyms',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: payload}),
    });

    if (wordResp.data.status == 200) {
      await WriteWord(payload, wordResp.data.data[0].nyms, 'synonyms');
      return {ok: true};
    }
    if (wordResp.data.status != 200) {
      LOG.error(`Synonyms | ${payload} | ${JSON.stringify(wordResp.data)}`);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to get ',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        100,
      );
      errorDispatch({
        type: actions.NEW_ERROR_ADDING,
        payload: {
          fieldName: 'Synonyms',
          title: 'Failed',
          message: wordResp.data.message,
          args: wordResp.data.error,
          status: wordResp.data.status,
        },
      });
      return {ok: false};
    }
  } catch (e) {
    LOG.error(`Synonyms | ${payload} | ${e}`);
    ToastAndroid.showWithGravityAndOffset(
      'Failed to get ',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
    errorDispatch({
      type: actions.NEW_ERROR_ADDING,
      payload: {
        fieldName: 'Synonyms',
        title: e.message === 'Network Error' ? 'Network' : e.name,
        status: e.message === 'Network Error' ? 400 : 500,
        message:
          e.message === 'Network Error'
            ? 'Check Your Internet Connction'
            : e.message,
      },
    });
    return {ok: false};
  }
};
const GetAntonyms_FV = async (payload, errorDispatch) => {
  LOG.info('Search for FV-Synonyms ' + payload);
  try {
    const wordResp = await axios({
      method: 'post',
      url: BaseURL + 'antonyms',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({word: payload}),
    });

    if (wordResp.data.status == 200) {
      await WriteWord(payload, wordResp.data.data[0].nyms, 'antonyms');
      return {ok: true};
    }
    if (wordResp.data.status != 200) {
      LOG.error(`Synonyms | ${payload} | ${JSON.stringify(wordResp.data)}`);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to get ',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        100,
      );
      errorDispatch({
        type: actions.NEW_ERROR_ADDING,
        payload: {
          fieldName: 'Synonyms',
          title: 'Failed',
          message: wordResp.data.message,
          args: wordResp.data.error,
          status: wordResp.data.status,
        },
      });
      return {ok: false};
    }
  } catch (e) {
    LOG.error(`Synonyms | ${payload} | ${e}`);
    ToastAndroid.showWithGravityAndOffset(
      'Failed to get ',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
    errorDispatch({
      type: actions.NEW_ERROR_ADDING,
      payload: {
        fieldName: 'Synonyms',
        title: e.message === 'Network Error' ? 'Network' : e.name,
        status: e.message === 'Network Error' ? 400 : 500,
        message:
          e.message === 'Network Error'
            ? 'Check Your Internet Connction'
            : e.message,
      },
    });
    return {ok: false};
  }
};

const GetAntonyms_EX = async (exDispatch) => {
  
}

export {
  GetDefinition_FV,
  GetDefinitions,
  GetExamples_FV,
  GetExamples,
  GetSynonyms_FV,
  GetSynonyms,
  GetAntonyms_FV,
  GetAntonyms,
  GetFavAllWords,
  RemoveFvWord,
};
