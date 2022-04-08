
from .ExtraExamples import getExtraExamples
from typing import Dict, Text
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator
import requests as req
"""
[
    {
        "word": "Coding"
        "engType":[
            {
                "type": "British English",
                "part_of_speech": {
                    "noun": {
                        "meanings":[],
                        "examples":[]
                    },
                    "verb": {
                        "meanings": [],
                        "examples": []
                    }
                }
            },
            {
                "type": "American English",
                "part_of_speech": {
                    "noun": {
                        "meanings":[],
                        "examples":[]
                    },
                    "verb": {
                        "meanings": [],
                        "examples": []
                    }
                }
            },
            
        ] 
    }
]

"""


class Cambridge:
    def __init__(self, wordList) -> None:
        self.__url = "https://dictionary.cambridge.org/dictionary/english/"
        self.wordList = wordList
        self.finalResult = []
        self.translator = GoogleTranslator('en', "bn")

    def getSoup(self, word: str) -> BeautifulSoup:
        resp = req.get(self.__url+word, headers={
                       "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36"})

        return BeautifulSoup(resp.content, "html.parser")

    def getDictionaryTypes(self, word: str) -> dict:
        """
            Return {"engtype": soup}
        """
        dictTypes = {}
        soup = self.getSoup(word)
        types = soup.find_all(
            "div", {"class": "pr dictionary", "data-type": "sorted"})
        for _type in types:
            heading = _type.find("div", {"class": "di-head"})
            if heading == None:
                dictTypes["British"] = _type
            else:
                tmp = heading.text.split(' ')
                if len(tmp) > 2 and tmp[-2].lower() != "business":

                    dictTypes[tmp[-2]] = _type

        return dictTypes

    def getBaseWord(self) -> str:
        return "Test"

    def getPartOfSpeech(self,  soup: BeautifulSoup) -> dict:
        resutls = soup.find_all("div", {"class": "pr entry-body__el"})
        PoSDict: dict = {}
        if None in resutls:
            resutls.remove(None)

        for posDiv in resutls:
            pos = posDiv.find("div", {"class": "posgram dpos-g hdib lmr-5"})
            if pos != None:
                PoSDict[pos.text] = posDiv.find("div", {"class": "pos-body"})

        return PoSDict

    def getPOS_Meaning(self,  soup: BeautifulSoup) -> list:
        # results = soup.find_all("div", {"class": "pr dsense"})
        results = soup.select("div.pr.dsense")

        means = []
        for meanDiv in results:
            meanBody = meanDiv.select_one(
                "div.sense-body>.pr.phrase-block")
            if meanBody != None:
                continue
            meanBody = meanDiv.select_one(
                "div.sense-body")
            mean = meanBody.find("div", {"class": "def ddef_d db"})
            if mean != None:
                means.append(mean.text)
            # if crname != 'noun':
            #     print(crname, mean.text)
        return means

    def getWord_Notation(self,  soup: BeautifulSoup) -> dict:
        # results = soup.find_all("div", {"class": "pr dsense"})

        results = soup.select("div.pr.dsense")

        means = {}
        for meanDiv in results:
            meanBody = meanDiv.select_one(
                "div.sense-body>.pr.phrase-block")
            if meanBody != None:
                continue
            meanBody = meanDiv.select_one(
                "div.sense-body")
            meanType = meanDiv.select_one("h3.dsense_h")

            if meanType is not None:
                meanType = meanType.select_one(
                    "span.guideword.dsense_gw > span")
                if meanType.text.upper() not in means.keys():
                    means[meanType.text.upper()] = []

            for senseBlock in meanBody.select(".def-block.ddef_block"):
                blockInfo = {
                    "label": "",
                    "defination": "",
                    "examples": []
                }

                if meanType is None:
                    meanType = senseBlock.select_one(
                        ".ddef_h > .def-info > .domain")
                    if meanType is not None:
                        means[meanType.text.upper()] = []
                    else:
                        means["Unknown".upper()] = []

                blockLabel = senseBlock.select_one('.epp-xref.dxref')
                if blockLabel is not None:
                    blockInfo['label'] = blockLabel.text.strip()

                blockDefination = senseBlock.select_one('.def.ddef_d.db')
                if blockDefination is not None:
                    blockInfo['defination'] = blockDefination.text.strip()

                blockExamples = senseBlock.select(
                    ".def-body.ddef_b > .examp")
                for example in blockExamples:
                    if example is not None:
                        blockInfo['examples'].append(example.text.strip())
                if meanType is not None:
                    means[meanType.text.upper()].append(blockInfo)
                else:
                    means["Unknown".upper()].append(blockInfo)
                # mean = meanBody.find("div", {"class": "def ddef_d db"})
                # if mean != None:
                #     means.append(mean.text)
                # # if crname != 'noun':
                # #     print(crname, mean.text)

        return means

    def getMeaning(self) -> list:
        for word in self.wordList:
            dictTypes: dict = self.getDictionaryTypes(word)
            wordInfo: dict = {
                "word": word.lower(),
                "engType": [],
                "translation": {
                    'bn': self.translator.translate(word + " " if len(word) == 1 else word)
                }
            }
            for _type, soup in dictTypes.items():
                dictInfo: dict = {
                    "type": _type,
                    "part_of_speech": []
                }
                PartOfSpeech: dict = self.getPartOfSpeech(soup)
                # print(PartOfSpeech.keys())
                for pos, pos_soup in PartOfSpeech.items():
                    # print([pos, pos_soup] if pos != 'noun' else '')
                    dictInfo['part_of_speech'].append({
                        "pos_type": pos,
                        "info": self.getWord_Notation(
                            pos_soup)
                    })

                wordInfo['engType'].append(dictInfo)
            self.finalResult.append(wordInfo)
        return self.finalResult


if __name__ == "__main__":
    # test = Cambridge(["Coding"])
    # print()
    # # from test import html, html2
    # # soup = BeautifulSoup(html2, 'html.parser')
    # # test.getWord_Notation(soup)
    # a = test.getMeaning()
    # print(a)
    pass
