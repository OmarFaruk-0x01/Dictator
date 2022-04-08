from bs4 import BeautifulSoup
import requests as req
import time


def parseString(str):
    str = str.strip()
    return " ".join(filter(lambda s: s != '', str.replace('\n', '').split(' ')))


def getWordTitle(soup: BeautifulSoup, _type):
    try:
        if (_type == 'S'):
            subTitle = soup.find('p')
            pos = subTitle.strong.text
            defination = subTitle.text.replace(pos,"").strip().strip()
            returnData = {'part_of_speech': pos.strip(), 'definition': defination.strip()}
            return returnData
        else:
            subTitle = soup.select('div.word-title.full-width > h6')
            returnData = {'part_of_speech': '', 'definition': ''}
            if len(subTitle) > 0:
                pos = subTitle[0].find('span', {'class': 'part-of-speech'})
                definition = subTitle[0].find('span', {'class': 'definition'})
                if pos:
                    returnData['part_of_speech'] = parseString(pos.text)
                if definition:
                    returnData['definition'] = parseString(definition.text)
            return returnData
    except AttributeError:
        return None

def getNyms(cardsoup, _type):
    if (_type == 'S'):
        nymsList = cardsoup.select('ul>li')
        return list(map(lambda nym: nym.text.strip(), nymsList))
    else:
        nymsList = cardsoup.select('.card-content>.chip.mdc-chip')
        return list(map(lambda nym: nym.text.strip(), nymsList))


def getSynonyms(word):
    _url = f"https://www.synonym.com/synonyms/{word.lower()}"
    soup = BeautifulSoup(req.get(_url).content, 'html.parser')
    container = soup.find("div", {"class": 'main-column'})
    cardList = container.find_all('div', {'class': 'section'})
    nyms = []
    for card in cardList:
        
        wordTitle = getWordTitle(card, 'S')
        synonymsContainereList = card.find(
            'div', {'data-section': 'synonyms', 'class':'section-list-wrapper'})
        
        if (synonymsContainereList is None or wordTitle is None): continue
        
        synonyms = getNyms(synonymsContainereList.find('ul', {'class': "section-list"}), 'S')

        nyms.append({
            'wordInfo': wordTitle,
            'all_nyms': synonyms,
        })
    return nyms


def getAntonyms(word):
    _url = f"https://www.antonym.com/antonyms/{word}"
    soup = BeautifulSoup(req.get(_url).content, 'html.parser')
    cardList = soup.findAll("div", {"class": 'result-group-container'})
    nyms = []
    for card in cardList:
        wordTitle = getWordTitle(card, "A")
        print(wordTitle)
        cardInfo = card.find(
            'div', {'class': 'card full-width mdc-card type-antonym'})
        if cardInfo == None:
            continue

        antonyms = getNyms(cardInfo, 'A')
        nyms.append({
            'wordInfo': wordTitle,
            'all_nyms': antonyms,
        })

    return nyms


if __name__ == '__main__':
    pass
    # t1 = time.time()
    # for word in ['stay', 'alert', 'result', 'programming', 'never']:
    #     # print('\n'*4)
    #     getSynonyms(word)
    #     # print('\n'*4)
    # t2 = time.time()
    # print(f'\n\n\nCalled in {t2-t1} sec')
