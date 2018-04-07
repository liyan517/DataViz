import pandas as pd
import json
from db_interactions import put_data
import requests
from bs4 import BeautifulSoup
import re

def fortune(index):
	cookies = ["The fortune you seek is in another cookie.",
		"A closed mouth gathers no feet.",
		"A conclusion is simply the place where you got tired of thinking.",
		"A cynic is only a frustrated optimist.",
		"A foolish man listens to his heart"]	
	return cookies[index % 5]

def get_json(url):
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	var_data = soup(text=re.compile('var data'))
	m = re.search(r"resource_id: '(.*?)'", str(var_data))
	return "https://data.gov.sg/api/action/datastore_search?resource_id=" + m.group(1)


class decision_tree():
    def __init__(self, predicate_pairs_list, desc_str):
        self.predicate_pairs_list = predicate_pairs_list
        self.desc_str = desc_str

    def decide(self, x):
        if not isinstance(x, pd.Series):
            raise TypeError("Expected a pandas data series")

        for predicate_pair in self.predicate_pairs_list:
            predicate = predicate_pair[0]
            predicate_result = predicate_pair[1]
            if predicate(x):
                if not isinstance(predicate_result, decision_tree):
                    # print("HIT")
                    return predicate_result

                else:
                    # print("HIT")
                    return predicate_result.decide(x)

    def describe(self, starting_space=""):
        print(starting_space + self.desc_str)
        for pair in self.predicate_pairs_list:
            if isinstance(pair[1], decision_tree):
                pair[1].describe(starting_space + "    ")
            else:
                print(starting_space + "    " + str(pair[1]))

def chart_mapping_to_json(mapping, measure, data_url):
    res = {}
    charts = {}
    res["measure"] = measure
    res["data"] = data_url
    charts_lst = []
    cols_lst = []
    for k,v in mapping.iteritems():
        charts_lst.append({"dim":k, "chart":v, "title": k + " against " + measure})
        cols_lst.append(k)
    charts_lst.append({"dim":cols_lst[0], "chart":"table", "columns":cols_lst})
    # print(json.dumps(res))
    print("THIS IS CHART MAPPING TO JSON")
    res["charts"] = charts_lst
    return res


def df_decider(data_set_url, measure = None):
    chart_mapping = {}
    predicted_measure = None

    resp = requests.get(data_set_url)
    first_rsrc = resp.json()["result"]["records"]
    df = pd.DataFrame(first_rsrc)
    df = df.apply(pd.to_numeric, errors='ignore')

    df_uploaded_format = {}
    lst_records = []
    # for i, record in enumerate(df.drop("_id",1).to_dict(orient="records")):
    #     df_uploaded_format[i] = record
    for i, record in enumerate(df.drop("_id",1).to_dict(orient="records")):
        lst_records.append(record)

    df_height = len(lst_records)
    df_width = len(df.columns)
    df_ratio = df_width/df_height

    df_uploaded_format["data"] = lst_records

    #put data into cloudant
    put_data(data_set_url, df_uploaded_format)

    for field_idx in resp.json()["result"]["fields"]:
        var_type = field_idx["type"]
        var_name = field_idx["id"]
        # print(df[var_name].unique())
        if var_name == "_id":
            continue

        if var_name in ["mth", "year", "month", "day", "quarter"]:
            chart_mapping[var_name] = "time"
        elif var_name in ["Town or Estate", "Town", "Estate"]:
            chart_mapping[var_name] = "geo"
        elif len(df[var_name].unique()) > len(df)/10 and var_type != "text":
            chart_mapping[var_name] = "real"
            predicted_measure = var_name
        elif var_type == "text":
            chart_type = cat_count_split.decide(df[var_name])
            chart_mapping[var_name] = chart_type
        else:
            chart_type = num_split.decide(df[var_name])
            chart_mapping[var_name] = chart_type

    if measure:
        del chart_mapping[measure]
        return chart_mapping_to_json(chart_mapping, measure, data_set_url)
    else:
        if predicted_measure:
            del chart_mapping[predicted_measure]
            return chart_mapping_to_json(chart_mapping, predicted_measure, data_set_url)
        else:
            raise TypeError("Did not find any measure (real valued number) for y-axis")
#

# pie_data = pd.Series([1,1,1,2,2,2])
# bar_data = pd.Series([1,2,2,2,2,2,2,2,2,2,2,2,2])
# treemap_data = pd.Series([1,2,3,4,5,6,7])
#
#
pie_bar_split = decision_tree([
                                (lambda x: x.value_counts().tolist()[-1]/float(len(x)) > 0.1, "pie"),
                               (lambda x: x.value_counts().tolist()[-1]/float(len(x)) <= 0.1, "bar")
                                ],
                               "Least frequent item at least 10% of the data set|Least frequent item is less than 10% of data set")

cat_count_split = decision_tree([
                                (lambda x: len(x.value_counts()) < 5, pie_bar_split),
                               (lambda x: len(x.value_counts()) >= 5 and len(x.value_counts()) <= 10 , "bar"),
                                (lambda x: len(x.value_counts()) > 10, "treeMap")
                                 ],
                               "Number of categories < 5 | between 5 and 10 | >10")

num_split = decision_tree([(lambda x: "year" in str(x.name) or "mth" in str(x.name) or "quarter" in str(x.name) or "mth" in str(x.name), "time"),
                               (lambda x: True, cat_count_split)],
                               "Has year or month in name|Does not have year or month in name")

num_text_split = decision_tree([(lambda x: "year" in str(x.name) or "mth" in str(x.name) or "quarter" in str(x.name) or "mth" in str(x.name), "time"),
                               (lambda x: True, cat_count_split)],
                               "Has year or month in name|Does not have year or month in name")

# num_split.describe()
#
# print("Deciding pie data: " + num_split.decide(pie_data))
# print("Deciding bar data:" + num_split.decide(bar_data))
#
# print(df_decider("https://data.gov.sg/api/action/datastore_search?resource_id=193c2acb-43cc-4b97-97e8-916b6aa9adc7"))
# print(df_decider("https://data.gov.sg/api/action/datastore_search?resource_id=9df79e72-a7ed-4df3-9a60-5fe434f38fe7"))
# print(df_decider("https://data.gov.sg/api/action/datastore_search?resource_id=f9dbfc75-a2dc-42af-9f50-425e4107ae84"))
