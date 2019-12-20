from django.http import HttpResponse
from django.shortcuts import render
import pandas_gbq
from google.oauth2 import service_account
from collections import defaultdict

# Make sure you have installed pandas-gbq at first;
# You can use the other way to query BigQuery.
# please have a look at
# https://cloud.google.com/bigquery/docs/reference/libraries#client-libraries-install-nodejs
# To get your credential

credentials = service_account.Credentials.from_service_account_file('/c/Users/ShiHongzhi/Dropbox/Columbia/EECS6893/eecs6893_final/web/EECE6893-c202218b2ba7.json')


def hello(request):
    context = {}
    context['content1'] = 'Hello World!'
    return render(request, 'helloworld.html', context)


def dashboard(request):
    pandas_gbq.context.credentials = credentials
    pandas_gbq.context.project = "leafy-oxide-252603"

    SQL = "select * from final.all_types_aggregate order by time,type"
    df = pandas_gbq.read_gbq(SQL)
    #get a map from type to a list of records
    #reach record has attributes like 'time','trips','vehicles'
    data = []
    for _, row in df.iterrows():
        record = {'type':row['type'],'time':row['time'], 'trips':row['trips'], 'vehicles':row['vehicles']}
        '''
        if row['type'] not in data:
            data[row['type']] = []
        data[row['type']].append(record)
        '''
        data.append(record)
    print(data)
    return render(request, 'dashboard.html', {'data':data})