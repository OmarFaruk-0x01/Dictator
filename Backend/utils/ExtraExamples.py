from bs4 import BeautifulSoup
import requests as req


def getExample(word, offSet=0, limit=15):
    _url = f"https://sentence.yourdictionary.com/{word}"
    soup = BeautifulSoup(req.get(_url).content, 'html.parser')
    sentensesList = soup.select("div.sentence-item")
    return tuple(filter(lambda f: f != "", map(lambda i: i.text.strip() if i and i.text != None else "", sentensesList)))[offSet: offSet + limit]


def getExtraExamples(word):
    if isinstance(word, list) or isinstance(word, tuple):
        emptyData = []
        for w in word:
            emptyData.append({"word": w, "examples": getExample(w)})
        return emptyData
    return [{"word": word.lower(), "examples": getExample(word)}]


if __name__ == "__main__":
    a = getExtraExamples(['episodic'])

    print(a)
