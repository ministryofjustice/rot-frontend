#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
airtable client
"""
import json
import urllib.parse

import requests

BASE_URL = 'https://api.airtable.com/v0'


class Client:

    def __init__(self, sheet_id, api_key):
        self.base_url = BASE_URL + '/' + sheet_id
        self.session = requests.Session()
        self.session.headers.update(
            {
                'Authorization': 'Bearer {}'.format(api_key),
                'Content-type': 'application/json'
            }
        )

    def list(self, table):
        records = []
        offset = ''
        while True:
            url = self.base_url + '/' + table
            if offset:
                qs = urllib.parse.urlencode([('offset', offset)])
                url += '?' + qs
            #  print(url)
            rsp = self.session.get(url)
            data = rsp.json()
            records.extend(data['records'])
            offset = data.get('offset')
            if not offset:
                break
        return records

    def get(self, table, id):
        url = self.base_url + '/' + table + '/' + id
        rsp = self.session.get(url)
        return rsp.json()

    def create(self, table, data):
        url = self.base_url + '/' + table
        rsp = self.session.post(
            url, data=json.dumps({'fields': data}))
        return rsp.json()
