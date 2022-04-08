`
    <div class="mainBody" style="margin: 0; padding: 10px 0px; border: 0">
      <div class="definationBox" style="margin: 0; padding: 0; border: 0">
        <p
          class="defHeader"
          style="
            margin: 0;
            padding: 5px 9px;
            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 20px;
            list-style: none;
            font-size: 19px;
          "
        >
          <li style="margin: 0; padding: 0; border: 0">
            <i
              style="
                margin: 0;
                padding: 0;
                border: 0;
                display: inline-block;
                width: 20px;
                height: 4px;
                background-color: #2CBC70;
                vertical-align: middle;
              "
            ></i>
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="notationDiv"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  display: flex;
                  align-items: center;
                  align-self: center;
                "
              >
                <span
                  class="notation"
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    color: #2CBC70;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >SKILLFULL</span
                >
                <i
                  class="dot"
                  style="
                    margin: 0 4px;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    background-color: #2CBC70;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    font-weight: 600;
                  "
                ></i>
                <span
                  class="notation"
                  style="
                    background-color: #2CBC70;
                    color: #fff;
                    padding: 3px 6px;
                    border-radius: 4px;
                    margin: 0;
                    border: 0;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >B1</span
                >
                <i
                  class="dot"
                  style="
                    margin: 0 4px;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    background-color: #2CBC70;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    font-weight: 600;
                  "
                ></i>
                <span
                  class="notation"
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    color: #2CBC70;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >Noun</span
                >
              </p>
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                This is bangla
              </p>
            </div>
            <div
              style="
                font-weight: bold;
                margin-top: 10px;
                color: #2CBC70;
                margin: 0;
                padding: 0;
                border: 0;
              "
            >
              Examples:
            </div>
            <ul
              class="defExamples"
              style="
                margin: 0;
                padding: 0;
                border: 0;
                margin-top: 5px;
                margin-left: 20px;
                list-style: none;
                font-size: 19px;
              "
            >
              <li style="margin: 0; padding: 0; border: 0">
                <i
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    width: 20px;
                    height: 4px;
                    background-color: #2CBC70;
                    vertical-align: middle;
                  "
                ></i>
                <p
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                  "
                >
                  This is a example
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>`;

const GHtml = (wordInfo, word) => {
  return new Promise((resolve, reject) => {
    console.log(wordInfo);
    var final = '';
    try {
        let HEAD = `<div
      class="headDiv"
      style="
        margin: 0;
        padding: 5px 0;
        border: 0;
        display: flex;
        align-items: center;
        align-content: center;
        border-bottom: 1px solid #2CBC70;
      "
    >
      <h1
        class="title"
        style="
          margin: 0px 10px;
          padding: 20px 14px;
          border: 0;
          color: #fff;
          line-height: 17px;
          background-color: #2CBC70;
          border-radius: 10px;
        "
      >
        ${word}
      </h1>
    </div>`;

        let BN = `<div class="definationBox" style="margin: 0; padding: 0; border: 0; margin-bottom: 10px;">
        <p
          class="defHeader"
          style="
            margin: 0;
            padding: 5px 9px;
            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          বাংলা
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
          "
        >
          <li style="margin: 0; padding: 0; border: 0">
            <i
              style="
                margin: 0;
                padding: 0;
                border: 0;
                display: inline-block;
                width: 20px;
                height: 4px;
                background-color: #2CBC70;
                vertical-align: middle;
              "
            ></i>
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ${wordInfo.translation?.bn}
              </p>
            </div>
          </li>
        </ul>
      </div>
    `;

        var tmp1 = '';
        wordInfo.engType.map((e) => {
          var tmp2 = '';
          e.part_of_speech.map((pos) => {
            for (const [key, value] of Object.entries(pos.info)) {
              value.map((v) => {
                var tmp3 = '';
                v.examples.map((ex) => {
                  tmp3 += `<li style="margin: 0; padding: 0; border: 0; margin-bottom: 6px;">
                <i
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    width: 20px;
                    height: 4px;
                    background-color: #2CBC70;
                    vertical-align: middle;
                  "
                ></i>
                <p
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                  "
                >
                 ${ex}
                </p>
              </li>`;
                });

                tmp2 += `
          <li style="margin: 0; padding: 0; border: 0; margin-bottom: 15px; border-left: 2px solid #2CBC70; padding-left: 5px;">
            
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="notationDiv"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  display: flex;
                  align-items: center;
                  align-self: center;
                "
              >
                <span
                  class="notation"
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    color: #2CBC70;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >${key}</span
                >
                <i
                  class="dot"
                  style="
                    margin: 0 4px;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    background-color: #2CBC70;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    font-weight: 600;
                  "
                ></i>
                <span
                  class="notation"
                  style="
                    background-color: #2CBC70;
                    color: #fff;
                    padding: 3px 6px;
                    border-radius: 4px;
                    margin: 0;
                    border: 0;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >${v.label}</span
                >
                <i
                  class="dot"
                  style="
                    margin: 0 4px;
                    padding: 0;
                    border: 0;
                    display: inline-block;
                    background-color: #2CBC70;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    font-weight: 600;
                  "
                ></i>
                <span
                  class="notation"
                  style="
                    margin: 0;
                    padding: 0;
                    border: 0;
                    color: #2CBC70;
                    font-size: 15px;
                    font-weight: 900;
                  "
                  >${pos.pos_type}</span
                >
              </p>
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ${v.defination}
              </p>
            </div>
            <div
              style="
                font-weight: bold;
                margin-top: 10px;
                color: #2CBC70;
                margin: 0;
                padding: 0;
                border: 0;
              "
            >
              Examples:
            </div>
            <ul
              class="defExamples"
              style="
                margin: 0;
                padding: 0;
                border: 0;
                margin-top: 5px;
                margin-left: 20px;
                list-style: none;
                font-size: 19px;
              "
            >${tmp3}</ul>
          </li>
        `;
              });
            }
          });
          tmp1 += `<div class="definationBox" style="margin: 0; padding: 0; border: 0;margin-bottom: 10px;">
        <p
          class="defHeader"
          style="
            margin: 0;
            padding: 5px 9px;
            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          ${e.type}
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
          "
        >${tmp2}</ul>
      </div>`;
        });

        final += `
    <div style="margin-bottom: 20px;">
        ${HEAD}
        <div class="mainBody" style="margin: 0; padding: 10px 0px; border: 0">
        ${BN}
        ${tmp1}
        </div>
    </div>
    `;
      resolve({
        html: final,
        status: 'ok',
        message: '',
      });
    } catch (err) {
      reject({
        html: '',
        status: 'error',
        message: err,
      });
    }
  });
};

const GExampleHtml = (exmpList, word) => {
  var exm = '';
  exmpList.map((ex) => {
    exm += `<li style="margin: 0; padding: 0; border: 0; margin-bottom: 10px;">
            <i
              style="
                margin: 0;
                padding: 0;
                border: 0;
                display: inline-block;
                width: 20px;
                height: 4px;
                background-color: #2CBC70;
                vertical-align: middle;
              "
            ></i>
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ${ex}
              </p>
            </div>
          </li>`;
  });

  let HEAD = `<div
      class="headDiv"
      style="
        margin: 0;
        padding: 5px 0;
        border: 0;
        display: flex;
        align-items: center;
        align-content: center;
        border-bottom: 1px solid #2CBC70;
      "
    >
      <h1
        class="title"
        style="
          margin: 0px 10px;
          padding: 20px 14px;
          border: 0;
          color: #fff;
          line-height: 17px;
          background-color: #2CBC70;
          border-radius: 10px;
        "
      >
        ${word}
      </h1>
    </div>`;

  let BN = `<div class="definationBox" style="margin: 0; padding: 0; border: 0; margin-bottom: 10px;">
        <p
          class="defHeader"
          style="
            margin: 0;
            padding: 5px 9px;
            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          Extra Examples
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
          "
        >
          ${exm}
        </ul>
      </div>
    `;

  return `<div>
      ${HEAD}
      ${BN}
    </div>`;
};

const GNyms = (dataList, nymsType) => {
  return new Promise((resolve, reject) => {
    const html = `<div
        class="headDiv"
        style="
          margin: 0;
          padding: 5px 0;
          border: 0;
          display: flex;
          align-items: center;
          align-content: center;
          border-bottom: 1px solid #2CBC70;
        "
      >
        <h1
          class="title"
          style="
            margin: 0px 10px;
            padding: 20px 14px;
            border: 0;
            color: #fff;
            line-height: 17px;
            background-color: #2CBC70;
            border-radius: 10px;
          "
        >
          test
        </h1>
      </div>
      <div
        class="definationBox"
        style="margin: 0; padding: 0; border: 0; margin-bottom: 10px"
      >
        <p
          class="defHeader"
          style="
            margin: 0 0;
            margin-top: 5px;
            margin-bottom: 10px;
            padding: 5px 9px;
            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          Definition
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
          "
        >
          <li style="margin: 0; padding: 0; border: 0">
            <i
              style="
                margin: 0;
                padding: 0;
                border: 0;
                display: inline-block;
                width: 20px;
                height: 4px;
                background-color: #2CBC70;
                vertical-align: middle;
              "
            ></i>
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ${dataList.definition}
              </p>
            </div>
          </li>
        </ul>
        <p
          class="defHeader"
          style="
            margin: 10px 0;
            padding: 5px 9px;

            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          Part of speech
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
          "
        >
          <li style="margin: 0; padding: 0; border: 0">
            <i
              style="
                margin: 0;
                padding: 0;
                border: 0;
                display: inline-block;
                width: 20px;
                height: 4px;
                background-color: #2CBC70;
                vertical-align: middle;
              "
            ></i>
            <div
              style="display: inline-block; margin: 0; padding: 0; border: 0"
            >
              <p
                class="def"
                style="
                  margin: 0;
                  padding: 0;
                  border: 0;
                  font-size: 20px;
                  font-weight: bold;
                "
              >
                ${dataList.part_of_speech}
              </p>
            </div>
          </li>
        </ul>
        <p
          class="defHeader"
          style="
            margin: 10px 0;
            padding: 5px 9px;

            border: 0;
            background-color: #2CBC70;
            color: #fff;
            width: fit-content;
            border-bottom-right-radius: 6px;
            border-top-right-radius: 6px;
          "
        >
          ${nymsType}
        </p>
        <ul
          class="defList"
          style="
            margin: 0;
            padding: 0;
            border: 0;
            margin-top: 5px;
            margin-left: 10px;
            list-style: none;
            font-size: 19px;
            display: flex;
          "
        >
          ${dataList.nyms.map(
            (nym) => `<li
            style="
              margin: 0;
              padding: 0;
              border: 0;
              background: #D6FFD7;
              padding: 7px 10px;
              font-size: 18px;
              border-radius: 40px;
              color: #2CBC70;
              margin: 2px 5px;
            "
          >
            ${nym}
          </li>`,
          )}  
        </ul>
      </div>`;
  });
};
export const GenaretHtml = GHtml;
export const GenaretExampleHtml = GExampleHtml;
export const GenaretNymsHtml = GNyms;
