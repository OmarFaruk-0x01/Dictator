from email.mime import multipart
import smtplib
from email import encoders
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
import os


class EmailSender(smtplib.SMTP):
    def __init__(self, reciverEmail, senderMail, sender_password) -> None:
        self.port = 587
        self.host = 'smtp.gmail.com'
        super().__init__(self.host, self.port)

        self.ehlo()
        self.starttls()
        self.sender = senderMail
        self.reciver = reciverEmail
        self.sender_pass = sender_password
        try:
            self.login(self.sender, self.sender_pass)
        except Exception as e:
            print(e)
        print('Email Loged In')

    def GenerateMessageBody(self, userData):
        tmp = ''
        for key, value in userData.items():
            if (key == 'deviceInfo'):
                tmp2 = ''
                for k, v in value.items():
                    tmp2 += f'<b>{k.title()}</b>: <span>{v}</span><br/>'
                tmp += '<div style="padding-left: 20px">' + tmp2 + '</div>'
                continue
            tmp += f'<strong>{key.title()}</strong>: <span> {value}</span><br/><br/>'

        return tmp

    def attachementHandel(self, fileName):
        filePath = os.path.join(
            os.path.curdir, 'LogFiles', fileName)
        if not os.path.exists(filePath):
            return None
        fileData = open(filePath, 'rb')
        mpart = MIMEBase('application', 'octet-stream')
        mpart.set_payload(fileData.read())
        encoders.encode_base64(mpart)
        mpart.add_header('Content-Disposition', 'Attacment;filename='+fileName)
        return mpart

    def CreateMail(self, Subject, Message, attachmentFileName=''):
        MultiPart = MIMEMultipart()
        MultiPart['From'] = self.sender
        MultiPart['To'] = self.reciver
        MultiPart['Subject'] = Subject
        MultiPart.attach(MIMEText(Message, 'html'))
        if (attachmentFileName != ''):
            attachemnt = self.attachementHandel(fileName=attachmentFileName)
            if attachemnt is not None:
                MultiPart.attach(attachemnt)
        return MultiPart.as_string()

    def SendMail(self, UserData: dict):
        try:
            # self.close()
            # self.connect(self.host, self.port)
            MAIL = self.CreateMail('Feedback From {}'.format(
                UserData.get('userName')), self.GenerateMessageBody(UserData), UserData.get('logFileName'))
            resp = self.sendmail(self.sender, self.reciver, MAIL)
            print(resp)
            return {'ok': True}
        except Exception as e:
            print(e)
            return {'ok': False, 'error': str(e.args[-1])}


if __name__ == '__main__':
    pass
