import json
import speedtest
from datetime import datetime
from threading import Timer

def internet():
  s = speedtest.Speedtest()
  data_atual =  datetime.now().strftime("%d/%m/%y")
  hora_atual =  datetime.now().strftime("%H:%M")
  velocidade = s.download(threads=None)*(10**-6)
  return data_atual, hora_atual,velocidade



def loadDatabase():
  data_atual, hora, velocidade = internet()
  data = {"registers":[]}
  with open('data.json', 'r') as fp:
      try:
        data = json.load(fp)
      except:
        print('Arquivo vazio')
      obj = {
        "data_hora":str(data_atual)+'-'+str(hora),"velocidade":velocidade
      }
      data["registers"].append(obj)

  with open('data.json', 'w') as fp:
      json.dump(data, fp)



  Timer(60, loadDatabase).start()

loadDatabase()

