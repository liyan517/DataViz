from cloudant.client import Cloudant
import os
from os.path import join, dirname
from dotenv import load_dotenv
import json

def put_data(data_url, data_itself):
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    serviceUsername = os.getenv("serviceUsername")
    servicePassword = os.getenv("servicePassword")
    serviceURL = os.getenv("serviceURL")

    client = Cloudant(serviceUsername, servicePassword, url=serviceURL)
    client.connect()
    session = client.session()

    # print('Username: {0}'.format(session['userCtx']['name']))
    # print('Databases: {0}'.format(client.all_dbs()))

    # data_url = "https://data.gov.sg/api/action/datastore_search?resource_id=193c2acb-43cc-4b97-97e8-916b6aa9adc7"
    # data_itself = {"_id" :data_url, "data": "PLACEHOLDER2", "charts": {"0": {"dim": "mth", "chart": "time"}}, "measure": "net_bal_amt"}
    data_itself["_id"] = data_url
    my_database = client['my_sample_db']

    # Delete data if it already exists.
    try:
        old_document = my_database[data_url]
        print("Document exist " + data_url)
        #old_document.delete()
        # print("DELETED OLD RECORD")
    except KeyError:
        print("WHAT GOES IN")
        print(data_itself)
        new_document = my_database.create_document(data_itself)
        print(new_document.exists())
        print(my_database[data_url])
    # Disconnect from the server
    client.disconnect()

    return True


def get_data(data_url):
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    serviceUsername = os.getenv("serviceUsername")
    servicePassword = os.getenv("servicePassword")
    serviceURL = os.getenv("serviceURL")

    client = Cloudant(serviceUsername, servicePassword, url=serviceURL)
    client.connect()
    session = client.session()
    my_database = client['my_sample_db']

    try:
        target_document = my_database[data_url]
    except KeyError:
        pass
    # Disconnect from the server
    client.disconnect()
    print("raw DOCUMENT")
    #print(target_document)

    del target_document["_id"]
    del target_document["_rev"]
    res = json.dumps(target_document)
    print("CONVERTED DOCUMENT")
    #print(res)
    return res

